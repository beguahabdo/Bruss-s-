"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewAnnouncementPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    content: "",
    type: "info",
    published: false,
  })
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase.from("announcements").insert({
        ...announcementData,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      router.push("/admin/announcements")
    } catch (error) {
      console.error("Error creating announcement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
          <Link href="/admin/announcements">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Announcements
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white">New Announcement</h2>
          <p className="text-slate-400">Create a new tournament announcement</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Announcement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">
                Title *
              </Label>
              <Input
                id="title"
                required
                value={announcementData.title}
                onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter announcement title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-200">
                Content *
              </Label>
              <Textarea
                id="content"
                required
                rows={6}
                value={announcementData.content}
                onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white resize-none"
                placeholder="Enter announcement content"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Type</Label>
              <Select
                value={announcementData.type}
                onValueChange={(value) => setAnnouncementData({ ...announcementData, type: value })}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={announcementData.published}
                onCheckedChange={(checked) =>
                  setAnnouncementData({ ...announcementData, published: checked as boolean })
                }
              />
              <Label htmlFor="published" className="text-slate-200">
                Publish immediately
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" asChild className="border-slate-600 text-slate-300 bg-transparent">
            <Link href="/admin/announcements">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Creating..." : "Create Announcement"}
          </Button>
        </div>
      </form>
    </div>
  )
}
