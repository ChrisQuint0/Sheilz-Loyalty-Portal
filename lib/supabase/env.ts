// Centralized, validated access to Supabase environment variables.
// Throws a clear error during boot if anything is missing.

function readEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Add it to your .env.local file.`,
    )
  }
  return value
}

export const SUPABASE_URL = readEnv("NEXT_PUBLIC_SUPABASE_URL")
export const SUPABASE_ANON_KEY = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
export const SUPABASE_SERVICE_ROLE_KEY = readEnv("SUPABASE_SERVICE_ROLE_KEY")
