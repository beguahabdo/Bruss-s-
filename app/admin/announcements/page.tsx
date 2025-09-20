import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import AnnouncementActions from "@/components/admin/announcement-actions"

export default async function AnnouncementsPage() {
  const supabase = await createClient()

  // Fetch announcements with creator info
  const { data: announcements } = await supabase
    .from("announcements")
    .select(`
      *,
      creator:created_by(email)
    `)
    .order("created_at", { ascending: false })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Announcements</h2>
          <p className="text-slate-400">Manage tournament announcements and news</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/announcements/new">
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </Link>
        </Button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements?.map((announcement) => (
          <Card key={announcement.id} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{announcement.title}</h3>
                    <Badge className={getTypeColor(announcement.type)}>{announcement.type}</Badge>
                    <div className="flex items-center space-x-1">
                      {announcement.published ? (
                        <Eye className="w-4 h-4 text-green-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-400">{announcement.published ? "Published" : "Draft"}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4 line-clamp-3">{announcement.content}</p>

                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span>Created: {new Date(announcement.created_at).toLocaleDateString()}</span>
                    {announcement.creator && <span>By: {announcement.creator.email}</span>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 bg-transparent"
                  >
                    <Link href={`/admin/announcements/${announcement.id}`}>Edit</Link>
                  </Button>
                  <AnnouncementActions announcement={announcement} />
                </div>
              </div>
            </CardContent>
          </Card>
        )) || (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="text-center py-12">
              <Megaphone className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No announcements created yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
