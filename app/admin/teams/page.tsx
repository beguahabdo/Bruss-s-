import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Eye, Plus } from "lucide-react"
import Link from "next/link"
import TeamActions from "@/components/admin/team-actions"

export default async function TeamsPage() {
  const supabase = await createClient()

  // Fetch teams with player count
  const { data: teams } = await supabase
    .from("teams")
    .select(`
      *,
      players:players(count)
    `)
    .order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Teams Management</h2>
          <p className="text-slate-400">Manage team registrations and approvals</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/teams/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Team
          </Link>
        </Button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams?.map((team) => (
          <Card key={team.id} className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{team.name}</CardTitle>
                  <p className="text-slate-400 text-sm">[{team.tag}]</p>
                </div>
                <Badge className={getStatusColor(team.status)}>{team.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>{team.players?.[0]?.count || 0}/5 players</span>
                </div>
              </div>

              {team.captain_name && (
                <div className="text-sm">
                  <p className="text-slate-400">Captain:</p>
                  <p className="text-white">{team.captain_name}</p>
                </div>
              )}

              <div className="text-xs text-slate-500">Registered: {new Date(team.created_at).toLocaleDateString()}</div>

              <div className="flex items-center space-x-2 pt-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 bg-transparent"
                >
                  <Link href={`/admin/teams/${team.id}`}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                </Button>
                <TeamActions team={team} />
              </div>
            </CardContent>
          </Card>
        )) || (
          <div className="col-span-full">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No teams registered yet</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
