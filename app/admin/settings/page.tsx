"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Settings } from "lucide-react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})
  const supabase = createClient()

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("tournament_settings").select("*")
      const settingsMap = data?.reduce((acc: Record<string, string>, setting) => {
        acc[setting.key] = setting.value
        return acc
      }, {})
      setSettings(settingsMap || {})
    }
    fetchSettings()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from("tournament_settings")
          .upsert({
            key,
            value,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
          })
          .eq("key", key)
      }

      alert("Settings updated successfully!")
    } catch (error) {
      console.error("Error updating settings:", error)
      alert("Error updating settings")
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Tournament Settings</h2>
        <p className="text-slate-400">Configure tournament parameters and information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Settings */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-200">Tournament Name</Label>
                <Input
                  value={settings.tournament_name || ""}
                  onChange={(e) => updateSetting("tournament_name", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Start Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={
                    settings.tournament_start_date
                      ? new Date(settings.tournament_start_date).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => updateSetting("tournament_start_date", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Registration Deadline</Label>
                <Input
                  type="datetime-local"
                  value={
                    settings.registration_deadline
                      ? new Date(settings.registration_deadline).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => updateSetting("registration_deadline", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Maximum Teams</Label>
                <Input
                  type="number"
                  min="1"
                  max="32"
                  value={settings.max_teams || ""}
                  onChange={(e) => updateSetting("max_teams", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Entry Fee (0 for free)</Label>
                <Input
                  type="number"
                  min="0"
                  value={settings.entry_fee || ""}
                  onChange={(e) => updateSetting("entry_fee", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* External Links */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">External Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-200">Stream URL</Label>
                <Input
                  type="url"
                  value={settings.stream_url || ""}
                  onChange={(e) => updateSetting("stream_url", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="https://twitch.tv/bruss_esports"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Discord URL</Label>
                <Input
                  type="url"
                  value={settings.discord_url || ""}
                  onChange={(e) => updateSetting("discord_url", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="https://discord.gg/bruss"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Rules Version</Label>
                <Input
                  value={settings.rules_version || ""}
                  onChange={(e) => updateSetting("rules_version", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="1.0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
