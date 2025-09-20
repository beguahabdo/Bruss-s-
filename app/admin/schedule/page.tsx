import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

export default async function SchedulePage() {
  const supabase = await createClient()

  // Fetch matches grouped by date
  const { data: matches } = await supabase
    .from("matches")
    .select(`
      *,
      team1:team1_id(name, tag),
      team2:team2_id(name, tag)
    `)
    .not("scheduled_at", "is", null)
    .order("scheduled_at", { ascending: true })

  // Group matches by date
  const matchesByDate =
    matches?.reduce((acc: any, match) => {
      const date = new Date(match.scheduled_at).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(match)
      return acc
    }, {}) || {}

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
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Tournament Schedule</h2>
        <p className="text-slate-400">View all scheduled matches by date</p>
      </div>

      {Object.keys(matchesByDate).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(matchesByDate).map(([date, dayMatches]: [string, any]) => (
            <div key={date}>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">{date}</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {dayMatches.map((match: any) => (
                  <Card key={match.id} className="bg-slate-800/50 border-slate-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(match.status)}>{match.status}</Badge>
                          <Badge className={getRoundColor(match.round_type)}>{match.round_type}</Badge>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(match.scheduled_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-center">
                          <p className="text-white font-medium">{match.team1?.name || "TBD"}</p>
                          <p className="text-slate-400 text-sm">[{match.team1?.tag || "---"}]</p>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {match.score_team1} - {match.score_team2}
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-white font-medium">{match.team2?.name || "TBD"}</p>
                          <p className="text-slate-400 text-sm">[{match.team2?.tag || "---"}]</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{match.map}</span>
                        </div>
                        {match.server_id && <span>Server: {match.server_id}</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No matches scheduled yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
