import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  const currentPath = "/admin" // بما أن هذا layout يخص /admin فقط

  // ✅ لو المستخدم غير مسجل نرجع للـ login لكن نتحقق من عدم كونها صفحة login أو unauthorized
  if ((error || !user) && currentPath !== "/admin/login" && currentPath !== "/admin/unauthorized") {
    redirect("/admin/login")
  }

  // ✅ تحقق إذا المستخدم مش admin فقط لو هو مسجل
  if (user) {
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!adminUser && currentPath !== "/admin/unauthorized") {
      redirect("/admin/unauthorized")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        <AdminSidebar adminUser={user} />
        <div className="flex-1 flex flex-col">
          <AdminHeader user={user} adminUser={user} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
