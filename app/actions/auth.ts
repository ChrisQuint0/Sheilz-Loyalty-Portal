"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { provisionLoyaltyAccount } from "@/lib/auth"
import { sendEmail, generateVerificationEmail, generatePasswordResetEmail } from "@/lib/email/mailjet"
import { generateVerificationLink } from "@/lib/auth/verification"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export type ActionResult<T = undefined> = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string[]>
  data?: T
}

function flattenZodErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const path = issue.path.join(".") || "_"
    if (!fieldErrors[path]) fieldErrors[path] = []
    fieldErrors[path].push(issue.message)
  }
  return fieldErrors
}

async function getOrigin(): Promise<string> {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "http"
  return host ? `${proto}://${host}` : ""
}

// ---------- Login ----------

export async function loginAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  })

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: flattenZodErrors(parsed.error),
    }
  }

  const { email, password, rememberMe } = parsed.data
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      ok: false,
      message: "Invalid email or password. Please try again.",
    }
  }

  if (rememberMe) {
    const { cookies } = await import("next/headers")
    const jar = await cookies()
    jar.set("rememberMe", "1", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })
  } else {
    const { cookies } = await import("next/headers")
    const jar = await cookies()
    jar.set("rememberMe", "0", { path: "/", sameSite: "lax", maxAge: 0 })
  }

  redirect("/dashboard")
}

// ---------- Register ----------

export async function registerAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: flattenZodErrors(parsed.error),
    }
  }

  const { firstName, lastName, email, phone, password } = parsed.data
  const supabase = await createSupabaseServerClient()

  // Create the user with email confirmation disabled (we'll handle it manually)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Don't auto-send email confirmation
      emailRedirectTo: undefined,
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        email_confirmed: false,
      },
    },
  })

  if (error) {
    return {
      ok: false,
      message: error.message || "We couldn't create your account.",
    }
  }

  if (!data.user) {
    return {
      ok: false,
      message: "We couldn't create your account.",
    }
  }

  // Generate and send verification email via Mailjet
  try {
    const origin = await getOrigin()
    const verificationLink = await generateVerificationLink({
      email,
      type: 'signup',
      origin,
      password,
    })

    if (verificationLink) {
      const emailContent = generateVerificationEmail(verificationLink)
      await sendEmail({
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      })
    }

    // Auto-provision profile + loyalty card
    try {
      await provisionLoyaltyAccount({
        userId: data.user.id,
        firstName,
        lastName,
        phone: phone || null,
      })
    } catch (err) {
      console.error("Loyalty account provisioning failed:", err)
    }

    // Redirect back to login with a success query so the UI can show the
    // email verification instruction without hitting a non-existent /auth route.
    redirect(`/login?email=${encodeURIComponent(email)}&verification=sent`)
  } catch (err) {
    console.error("Failed to send verification email:", err)
    return {
      ok: false,
      message: "Account created but we couldn't send the verification email. Please try resending it.",
    }
  }
}

// ---------- Forgot password ----------

export async function forgotPasswordAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  })

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fieldErrors: flattenZodErrors(parsed.error),
    }
  }

  const supabase = await createSupabaseServerClient()
  const email = parsed.data.email

  try {
    const origin = await getOrigin()
    const resetLink = await generateVerificationLink({
      email,
      type: 'reset',
      origin,
    })

    if (resetLink) {
      const emailContent = generatePasswordResetEmail(resetLink)
      await sendEmail({
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      })
    }

    return {
      ok: true,
      message: "If that email is registered, a reset link is on its way.",
    }
  } catch (error) {
    console.error("Failed to send reset email:", error)
    return {
      ok: false,
      message: "We couldn't send the reset email. Please try again.",
    }
  }
}

// ---------- Resend verification ----------

export async function resendVerificationAction(
  email: string
): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()
  const origin = await getOrigin()

  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${origin}/login`,
      },
    })

    if (error) {
      return {
        ok: false,
        message: error.message || "Failed to resend verification email.",
      }
    }

    return {
      ok: true,
      message: "Verification email sent successfully.",
    }
  } catch (error) {
    console.error("Failed to resend verification email:", error)
    return {
      ok: false,
      message: "Failed to resend verification email.",
    }
  }
}

// ---------- Logout ----------

export async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()

  const { cookies } = await import("next/headers")
  const jar = await cookies()
  jar.set("rememberMe", "0", { path: "/", sameSite: "lax", maxAge: 0 })

  redirect("/login")
}