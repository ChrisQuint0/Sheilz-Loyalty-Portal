// Server-only Supabase client with service-role privileges.
// Bypasses RLS — only use from trusted server-side code (e.g. account provisioning).

import "server-only"
import { createClient } from "@supabase/supabase-js"

import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "./env"

export function createSupabaseAdminClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
