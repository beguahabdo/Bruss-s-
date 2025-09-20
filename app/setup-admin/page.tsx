"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function SetupAdminPage() {
  const [email, setEmail] = useState("bank.dz07@gmail.com")
  const [password, setPassword] = useState("142536abdoobda")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
        },
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: adminError } = await supabase.from("admin_users").insert({
          id: authData.user.id,
          email: email,
          role: "super_admin",
        })

        if (adminError) {
          // If admin user already exists, that's okay
          if (!adminError.message.includes("duplicate key")) {
            throw adminError
          }
        }

        setSuccess(true)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="bg-slate-800/50 border-green-500/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <CardTitle className="text-2xl text-white">Admin Account Created!</CardTitle>
              <CardDescription className="text-slate-300">Check your email to confirm your account</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-slate-300">
                An admin account has been created for <strong>{email}</strong>
              </p>
              <p className="text-slate-400 text-sm">
                Please check your email and click the confirmation link, then you can log in at{" "}
                <a href="/admin/login" className="text-blue-400 hover:underline">
                  /admin/login
                </a>
              </p>
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded p-3 mt-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <p className="text-yellow-400 text-sm font-medium">Production Warning</p>
                </div>
                <p className="text-yellow-300 text-xs mt-1">
                  Remember to change or remove this default admin account before deploying to production!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Setup Admin Account</CardTitle>
            <CardDescription className="text-slate-300">
              Create the default admin account for local development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Admin Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded p-3">
                <p className="text-blue-300 text-sm">
                  This will create a super admin account that can access all admin features. The password will be
                  securely hashed by Supabase Auth.
                </p>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-500/20">{error}</div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Creating Admin Account..." : "Create Admin Account"}
              </Button>
            </form>

            <div className="mt-6 p-3 bg-yellow-900/20 border border-yellow-500/20 rounded">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <p className="text-yellow-400 text-sm font-medium">Production Warning</p>
              </div>
              <p className="text-yellow-300 text-xs">
                This creates a default admin account for local development only. Make sure to change or remove this
                account before deploying to production!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
