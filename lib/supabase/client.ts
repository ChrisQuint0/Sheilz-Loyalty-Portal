// Browser Supabase client. Use this in Client Components only.

"use client"

import { createClient } from "@supabase/supabase-js"

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env"

let browserClient: ReturnType<typeof createClient> | undefined

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return browserClient
}
