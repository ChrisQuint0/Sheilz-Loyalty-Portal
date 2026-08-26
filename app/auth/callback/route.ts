// Supabase email-link callback.
//
// When the user clicks the link in a confirmation or password-reset email,
// Supabase redirects them here with a `code` query param. We exchange that
// code for a session (which sets the auth cookies) and then forward the
// user to the `next` path supplied by the originating action.

import { NextResponse, type NextRequest } from "next/server"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"
  const type = searchParams.get("type") // "recovery" for password reset, "signup" for confirm, etc.

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // For password recovery, the Supabase client sets a special recovery
      // session. Forward the user to the reset-password UI where they can
      // update their password (the auth state of the session is what
      // `updateUser` reads to set the new password).
      const target = type === "recovery" ? "/login?recovery=1" : next || "/profile"
      return NextResponse.redirect(new URL(target, origin))
    }
  }

  // Something went wrong exchanging the code. Send the user back to login
  // with an error flag so the UI can surface a friendly message.
  return NextResponse.redirect(
    new URL("/login?error=verification_failed", origin),
  )
}
