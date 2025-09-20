import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Crown, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import TeamStatusActions from "@/components/admin/team-status-actions"

interface TeamDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TeamDetailPage({ params }: TeamDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch team with players
  const { data: team } = await supabase
    .from("teams")
    .select(`
      *,
      players:players(*)
    `)
    .eq("id", id)
    .single()

  if (!team) {
    notFound()
  }

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
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
          <Link href="/admin/teams">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teams
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white">{team.name}</h2>
          <p className="text-slate-400">[{team.tag}]</p>
        </div>
        <Badge className={getStatusColor(team.status)}>{team.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Team Name</p>
                  <p className="text-white font-medium">{team.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Team Tag</p>
                  <p className="text-white font-medium">[{team.tag}]</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Captain</p>
                  <p className="text-white font-medium">{team.captain_name || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Captain Steam ID</p>
                  <p className="text-white font-medium">{team.captain_steam_id || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Registration Date</p>
                  <p className="text-white font-medium">{new Date(team.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Players Count</p>
                  <p className="text-white font-medium">{team.players?.length || 0}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Players List */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Team Roster</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {team.players?.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {player.role === "captain" ? (
                        <Crown className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <User className="w-5 h-5 text-slate-400" />
                      )}
                      <div>
                        <p className="text-white font-medium">{player.nickname}</p>
                        <p className="text-slate-400 text-sm">{player.steam_id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm capitalize">{player.role}</p>
                      {player.discord_tag && <p className="text-slate-500 text-xs">{player.discord_tag}</p>}
                    </div>
                  </div>
                )) || <p className="text-slate-400 text-center py-4">No players registered</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TeamStatusActions team={team} />
            </CardContent>
          </Card>

          {team.logo_url && (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Team Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={team.logo_url || "/placeholder.svg"}
                  alt={`${team.name} logo`}
                  className="w-full h-32 object-contain rounded-lg"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
