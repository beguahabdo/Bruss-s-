"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, ExternalLink } from "lucide-react"

interface AdminHeaderProps {
  user: {
    id: string
    email?: string
  }
  adminUser: {
    id: string
    email: string
    role: string
  }
}

export default function AdminHeader({ user, adminUser }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <header className="bg-slate-800/30 backdrop-blur-sm border-b border-blue-500/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tournament Administration</h1>
          <p className="text-slate-400 text-sm">Manage BRUSS Cup 2025</p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            <a href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Site
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="border-red-500/30 text-red-400 hover:bg-red-900/20 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
