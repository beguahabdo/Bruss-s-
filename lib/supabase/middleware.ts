import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getUser() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

 // Check if user is trying to access admin routes
if (
  request.nextUrl.pathname.startsWith("/admin") &&
  request.nextUrl.pathname !== "/admin/login" &&
  request.nextUrl.pathname !== "/admin/unauthorized"
) {
  if (!user) {
    // Redirect to admin login if not authenticated
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!adminUser) {
    // Redirect to unauthorized page if not an admin
    const url = request.nextUrl.clone()
    url.pathname = "/admin/unauthorized"
    return NextResponse.redirect(url)
  }
}

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}
