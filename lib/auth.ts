// High-level authentication helpers built on top of Supabase.
// These read the current user/session and guard routes on the server.

import "server-only"
import { redirect } from "next/navigation"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"

export type AppUser = {
  id: string
  email: string | null
}

/**
 * Returns the currently authenticated user (if any) by validating the session
 * cookies with Supabase. Safe to call from Server Components, Route Handlers,
 * and Server Actions.
 */
export async function getCurrentUser(): Promise<AppUser | null> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return {
    id: user.id,
    email: user.email ?? null,
  }
}

/**
 * Redirect helper for protected pages. If the visitor is not authenticated,
 * send them to the login page. Otherwise return the user.
 */
export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

/**
 * Redirect helper for auth pages (login/register/forgot-password). If the
 * visitor is already authenticated, send them straight to the dashboard.
 */
export async function redirectIfAuthenticated() {
  const user = await getCurrentUser()
  if (user) {
    redirect("/dashboard")
  }
}

/**
 * Sign out the current user, clearing their Supabase session cookies.
 * Use from a Server Action only (it mutates cookies).
 */
export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
}

// ----- Account provisioning -----

function generateCardNumber(): string {
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const serial = Math.floor(100000000 + Math.random() * 900000000)
    .toString()
    .padStart(9, "0")
  return `${dateStamp}-${serial}`
}

function generateQrToken(cardNumber: string): string {
  // Stable per card. The POS scans this to credit purchases.
  return `SHEILZ:${cardNumber.replace(/\s+/g, "")}`
}

/**
 * Idempotently provision the public-side records for a newly registered
 * Supabase auth user: a row in `profiles` and a row in `loyalty_cards`.
 *
 * Uses the service-role client because:
 *  - RLS may not yet have policies for `profiles`/`loyalty_cards` for the
 *    brand-new user (this runs immediately after signUp).
 *  - We deliberately want to bypass RLS for trusted server code.
 */
export async function provisionLoyaltyAccount(input: {
  userId: string
  email: string
  firstName: string
  lastName: string
  phone?: string | null
}): Promise<{ cardNumber: string; qrToken: string }> {
  const admin = createSupabaseAdminClient()

  // Store the customer name in Supabase auth metadata instead of assuming the
  // project has a `profiles` table with `first_name`/`last_name` columns.
  const { error: authMetadataError } = await admin.auth.admin.updateUserById(
    input.userId,
    {
      user_metadata: {
        first_name: input.firstName,
        last_name: input.lastName,
        phone: input.phone ?? null,
        full_name: `${input.firstName} ${input.lastName}`.trim(),
      },
    },
  )

  if (authMetadataError) {
    throw new Error(`Failed to sync auth profile metadata: ${authMetadataError.message}`)
  }

  // 2. Customer loyalty record used by the dashboard and POS flows.
  const cardNumber = generateCardNumber()
  const now = new Date().toISOString()

  const { error: customerError } = await admin.from("customers").upsert(
    {
      email_address: input.email.toLowerCase(),
      loyalty_progress: 0,
      membership_date: now,
      card_status: true,
      First_name: input.firstName,
      last_name: input.lastName,
      redeem_count: 0,
      card_number: cardNumber,
    },
    { onConflict: "email_address" },
  )

  if (customerError) {
    throw new Error(`Failed to create customer record: ${customerError.message}`)
  }

  // 3. Loyalty card.
  const qrToken = generateQrToken(cardNumber)

  const { error: cardError } = await admin.from("loyalty_cards").insert({
    user_id: input.userId,
    card_number: cardNumber,
    qr_token: qrToken,
    status: "active",
    member_since: now,
    stamps: 0,
    target_stamps: 10,
  })

  if (cardError) {
    // If a card already exists for this user (e.g. re-run), just look it up.
    if (cardError.code !== "23505") {
      throw new Error(`Failed to create loyalty card: ${cardError.message}`)
    }
  }

  return { cardNumber, qrToken }
}
