// lib/auth/verification.ts
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

interface GenerateLinkParams {
  userId?: string
  email: string
  type: 'signup' | 'reset'
  origin: string
  password?: string
}

export async function generateVerificationLink({
  email,
  type,
  origin,
  password,
}: GenerateLinkParams) {
  const supabase = createSupabaseAdminClient()

  const redirectTo = `${origin}/login`

  let result

  if (type === 'signup') {
    if (!password) {
      throw new Error('A signup verification link requires the user password.')
    }

    result = await supabase.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
      options: { redirectTo },
    })
  } else {
    result = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo },
    })
  }

  if (result.error) {
    throw result.error
  }

  return result.data?.properties?.action_link ?? null
}