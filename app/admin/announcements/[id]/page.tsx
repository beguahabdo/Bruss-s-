"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface AnnouncementEditPageProps {
  params: Promise<{ id: string }>
}

export default function AnnouncementEditPage({ params }: AnnouncementEditPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [announcement, setAnnouncement] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { id } = await params
      const { data } = await supabase.from("announcements").select("*").eq("id", id).single()
      setAnnouncement(data)
    }
    fetchAnnouncement()
  }, [params, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!announcement) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("announcements")
        .update({
          title: announcement.title,
          content: announcement.content,
          type: announcement.type,
          published: announcement.published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", announcement.id)

      if (error) throw error
      router.push("/admin/announcements")
    } catch (error) {
      console.error("Error updating announcement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!announcement) {
    return <div className="text-white">Loading...</div>
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
          <h2 className="text-3xl font-bold text-white">Edit Announcement</h2>
          <p className="text-slate-400">Update announcement details</p>
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
                value={announcement.title}
                onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
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
                value={announcement.content}
                onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Type</Label>
              <Select
                value={announcement.type}
                onValueChange={(value) => setAnnouncement({ ...announcement, type: value })}
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
                checked={announcement.published}
                onCheckedChange={(checked) => setAnnouncement({ ...announcement, published: checked as boolean })}
              />
              <Label htmlFor="published" className="text-slate-200">
                Published
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
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
