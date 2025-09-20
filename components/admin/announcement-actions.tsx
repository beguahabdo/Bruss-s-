"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AnnouncementActionsProps {
  announcement: {
    id: string
    published: boolean
  }
}

export default function AnnouncementActions({ announcement }: AnnouncementActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const togglePublished = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("announcements")
        .update({
          published: !announcement.published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", announcement.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error updating announcement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAnnouncement = async () => {
    if (!confirm("Are you sure you want to delete this announcement?")) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("announcements").delete().eq("id", announcement.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting announcement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex space-x-1">
      <Button
        size="sm"
        variant="outline"
        onClick={togglePublished}
        disabled={isLoading}
        className={
          announcement.published
            ? "border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/20"
            : "border-green-500/30 text-green-400 hover:bg-green-900/20"
        }
      >
        {announcement.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={deleteAnnouncement}
        disabled={isLoading}
        className="border-red-500/30 text-red-400 hover:bg-red-900/20 bg-transparent"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
