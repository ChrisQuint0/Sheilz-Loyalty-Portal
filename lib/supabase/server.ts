// Server-side Supabase client wired to Next.js cookies.
// Use this inside Server Components, Server Actions, and Route Handlers
// where you need a request-scoped, user-aware Supabase client.

import "server-only"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env"

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // The `setAll` method may be called from a Server Component, which
          // cannot mutate cookies. Safe to ignore — the proxy refreshes the
          // session on the next request.
        }
      },
    },
  })
}
