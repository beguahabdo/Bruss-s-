"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, Trophy, Calendar, Settings, Megaphone, BarChart3, Shield, Home } from "lucide-react"

interface AdminSidebarProps {
  adminUser: {
    id: string
    email: string
    role: string
  }
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Teams & Players", href: "/admin/teams", icon: Users },
  { name: "Matches", href: "/admin/matches", icon: Trophy },
  { name: "Schedule", href: "/admin/schedule", icon: Calendar },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { name: "Statistics", href: "/admin/stats", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const superAdminNavigation = [{ name: "Admin Users", href: "/admin/users", icon: Shield }]

export default function AdminSidebar({ adminUser }: AdminSidebarProps) {
  const pathname = usePathname()

  const allNavigation = adminUser.role === "super_admin" ? [...navigation, ...superAdminNavigation] : navigation

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-blue-500/20 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">BRUSS Cup</h2>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1">
        {allNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
          <p className="text-slate-300 text-xs">Logged in as</p>
          <p className="text-white text-sm font-medium truncate">{adminUser.email}</p>
          <p className="text-blue-400 text-xs capitalize">{adminUser.role.replace("_", " ")}</p>
        </div>
      </div>
    </div>
  )
}
