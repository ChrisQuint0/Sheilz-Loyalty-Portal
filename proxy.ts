// Next.js 16 Proxy (formerly middleware).
//
// Responsibilities:
//   1. Refresh the Supabase auth session on every request so tokens stay
//      fresh and RLS-using Server Components see a valid user.
//   2. Send unauthenticated visitors away from protected routes.
//   3. Send already-authenticated visitors away from auth routes.
//
// Auth decisions are duplicated at the page level via requireUser() /
// redirectIfAuthenticated() as a defence-in-depth fallback in case the
// proxy is bypassed (static export, edge caching, etc.).

import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/env"

const PROTECTED_PREFIXES = ["/dashboard", "/card", "/history", "/profile", "/rewards"]
const AUTH_PREFIXES = ["/login", "/register", "/forgot-password"]

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
}

function isAuthPage(pathname: string) {
  return AUTH_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // 1) Refresh the Supabase session by reading + writing cookies on the
  //    request/response pair. The cookie adapter writes through both sides
  //    so refreshed tokens ride along on the response.
  let response = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthed = Boolean(user)

  // 2) Unauthenticated visitors hitting protected pages → /login.
  if (!isAuthed && isProtected(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirectTo", pathname + search)
    return NextResponse.redirect(url)
  }

  // 3) Already-authenticated visitors hitting auth pages → /dashboard.
  if (isAuthed && isAuthPage(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // Run on every path except Next.js internals and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|sheilz_logo.png|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
}
