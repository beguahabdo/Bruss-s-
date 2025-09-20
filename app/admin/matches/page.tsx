import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Plus, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import MatchActions from "@/components/admin/match-actions"

export default async function MatchesPage() {
  const supabase = await createClient()

  // Fetch matches with team information
  const { data: matches } = await supabase
    .from("matches")
    .select(`
      *,
      team1:team1_id(name, tag),
      team2:team2_id(name, tag),
      winner:winner_id(name, tag)
    `)
    .order("scheduled_at", { ascending: true })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "live":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getRoundColor = (round: string) => {
    switch (round) {
      case "final":
        return "bg-yellow-500/20 text-yellow-400"
      case "semifinal":
        return "bg-orange-500/20 text-orange-400"
      case "quarterfinal":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Matches Management</h2>
          <p className="text-slate-400">Manage tournament matches and results</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/matches/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Match
          </Link>
        </Button>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches?.map((match) => (
          <Card key={match.id} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                    <Badge className={getRoundColor(match.round_type)}>{match.round_type}</Badge>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-white font-medium">{match.team1?.name || "TBD"}</p>
                      <p className="text-slate-400 text-sm">[{match.team1?.tag || "---"}]</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {match.score_team1} - {match.score_team2}
                        </div>
                        {match.winner && <p className="text-green-400 text-sm">Winner: {match.winner.name}</p>}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-white font-medium">{match.team2?.name || "TBD"}</p>
                      <p className="text-slate-400 text-sm">[{match.team2?.tag || "---"}]</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mt-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{match.map}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {match.scheduled_at ? new Date(match.scheduled_at).toLocaleString() : "Not scheduled"}
                      </span>
                    </div>
                    {match.server_id && (
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>Server: {match.server_id}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 bg-transparent"
                  >
                    <Link href={`/admin/matches/${match.id}`}>Edit</Link>
                  </Button>
                  <MatchActions match={match} />
                </div>
              </div>
            </CardContent>
          </Card>
        )) || (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="text-center py-12">
              <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No matches created yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
