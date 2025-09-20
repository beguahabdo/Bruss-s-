import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // ⛔ استثناء صفحات login و unauthorized
  if (path === "/admin/login" || path === "/admin/unauthorized") {
    return supabaseResponse
  }

  // 🔐 تحقق فقط من المسارات التي تبدأ بـ /admin
  if (path.startsWith("/admin")) {
    if (!user) {
      // 🛑 لو المستخدم مش مسجل، رجعه لصفحة login
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }

    // ✅ تحقق إذا المستخدم Admin
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!adminUser) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/unauthorized"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
