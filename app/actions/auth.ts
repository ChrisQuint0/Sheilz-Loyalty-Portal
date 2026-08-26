"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { provisionLoyaltyAccount } from "@/lib/auth"

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
  const origin = await getOrigin()

  // Temporary debug log: capture the computed origin and the email redirect
  // destination so we can confirm the exact URL supplied to Supabase.
  try {
    console.log('[auth] registerAction: origin=', origin)
    console.log('[auth] registerAction: emailRedirectTo=', `${origin}/auth/callback?next=/dashboard`)
  } catch {
    // swallow logging errors — don't interrupt the flow
  }

  // Supabase handles the confirmation email itself (via the SMTP provider
  // configured in the Supabase dashboard — Mailjet in this project). When the
  // user clicks the link in the email, Supabase redirects back here:
  //   /auth/callback?code=...&next=/dashboard
  // which exchanges the code for a session and forwards the user.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/profile")}`,
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
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

  // Auto-provision profile + loyalty card. We do this before redirecting so
  // the user lands in the dashboard with a real card already on file.
  try {
    await provisionLoyaltyAccount({
      userId: data.user.id,
      email,
      firstName,
      lastName,
      phone: phone || null,
    })
  } catch (err) {
    console.error("Loyalty account provisioning failed:", err)
  }

  // If Supabase already has an active session (e.g. email confirmation is
  // disabled in the dashboard), head straight to the dashboard. Otherwise
  // bounce the user to the login screen with a hint that a confirmation
  // email is on the way.
  if (data.session) {
    redirect("/dashboard")
  }

  redirect(`/login?email=${encodeURIComponent(email)}&verification=sent`)
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

  const { email } = parsed.data
  const supabase = await createSupabaseServerClient()
  const origin = await getOrigin()

  // Temporary debug log: capture the computed origin, next URL and the
  // callback URL supplied to Supabase for the reset email.
  try {
    const nextUrl = `${origin}/login?recovery=1`
    const callbackUrl = `${origin}/auth/callback?type=recovery&next=${encodeURIComponent(nextUrl)}`
    console.log('[auth] forgotPasswordAction: origin=', origin)
    console.log('[auth] forgotPasswordAction: nextUrl=', nextUrl)
    console.log('[auth] forgotPasswordAction: callbackUrl=', callbackUrl)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: callbackUrl,
    })

    if (error) {
      console.error("Failed to send reset email:", error)
      return {
        ok: false,
        message: "We couldn't send the reset email. Please try again.",
      }
    }

    return {
      ok: true,
      message: "If that email is registered, a reset link is on its way.",
    }
  } catch (e) {
    console.error('[auth] forgotPasswordAction: logging/callback build failed', e)
    // Fallback: attempt to call reset without the debug wrapper.
    const nextUrl = `${origin}/login?recovery=1`
    const callbackUrl = `${origin}/auth/callback?type=recovery&next=${encodeURIComponent(nextUrl)}`
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: callbackUrl,
    })

    if (error) {
      console.error("Failed to send reset email:", error)
      return {
        ok: false,
        message: "We couldn't send the reset email. Please try again.",
      }
    }

    return {
      ok: true,
      message: "If that email is registered, a reset link is on its way.",
    }
  }
}

// ---------- Update password (recovery) ----------

export async function updatePasswordAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const zPassword = z
    .object({
      password: z.string().min(8, "Password must be at least 8 characters."),
      confirmPassword: z.string().min(1, "Please confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    })

  const parsed = zPassword.safeParse({
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

  const { password } = parsed.data
  const supabase = await createSupabaseServerClient()

  // The recovery session created by the callback route allows this call to
  // set the new password for the user. On success, send them to login.
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    console.error("Failed to update password:", error)
    return {
      ok: false,
      message: error.message ?? "Failed to update password. Please try again.",
    }
  }

  return {
    ok: true,
    message: "Password updated successfully.",
  }
}

export async function updateProfileAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
  })

  const parsed = profileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  })

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: flattenZodErrors(parsed.error),
    }
  }

  const { firstName, lastName } = parsed.data
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return {
      ok: false,
      message: "Your session expired. Please sign in again.",
    }
  }

  const email = user.email?.toLowerCase()
  if (!email) {
    return {
      ok: false,
      message: "We could not determine your email address.",
    }
  }

  const { error: authProfileError } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`.trim(),
    },
  })

  if (authProfileError) {
    console.error("Failed to update auth profile metadata:", authProfileError)
    return {
      ok: false,
      message: "We couldn't update your profile. Please try again.",
    }
  }

  const { error: customerError } = await supabase
    .from("customers")
    .upsert(
      {
        email_address: email,
        First_name: firstName,
        last_name: lastName,
      },
      { onConflict: "email_address" },
    )

  if (customerError) {
    console.error("Failed to update customer record:", customerError)
    return {
      ok: false,
      message: "We couldn't update your profile. Please try again.",
    }
  }

  return {
    ok: true,
    message: "Profile updated successfully.",
  }
}

export async function requestPasswordResetAction(): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user?.email) {
    return {
      ok: false,
      message: "Your session expired. Please sign in again.",
    }
  }

  const origin = await getOrigin()
  const nextUrl = `${origin}/login?recovery=1`
  const callbackUrl = `${origin}/auth/callback?type=recovery&next=${encodeURIComponent(nextUrl)}`

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: callbackUrl,
  })

  if (error) {
    console.error("Failed to send password reset email:", error)
    return {
      ok: false,
      message: "We couldn't send the password reset email. Please try again.",
    }
  }

  return {
    ok: true,
    message: "Password reset email sent. Check your inbox for the secure link.",
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