import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Trophy, TrendingUp, Calendar } from "lucide-react"

export default async function StatsPage() {
  const supabase = await createClient()

  // Fetch comprehensive statistics
  const [
    { count: totalTeams },
    { count: approvedTeams },
    { count: pendingTeams },
    { count: totalPlayers },
    { count: totalMatches },
    { count: completedMatches },
    { count: liveMatches },
    { count: publishedAnnouncements },
  ] = await Promise.all([
    supabase.from("teams").select("*", { count: "exact", head: true }),
    supabase.from("teams").select("*", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("teams").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("players").select("*", { count: "exact", head: true }),
    supabase.from("matches").select("*", { count: "exact", head: true }),
    supabase.from("matches").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("matches").select("*", { count: "exact", head: true }).eq("status", "live"),
    supabase.from("announcements").select("*", { count: "exact", head: true }).eq("published", true),
  ])

  // Fetch recent registrations (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const { count: recentRegistrations } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString())

  // Fetch top teams by wins
  const { data: topTeams } = await supabase
    .from("matches")
    .select(`
      winner_id,
      winner:winner_id(name, tag)
    `)
    .eq("status", "completed")
    .not("winner_id", "is", null)

  // Count wins per team
  const teamWins = topTeams?.reduce((acc: Record<string, any>, match) => {
    if (match.winner_id && match.winner) {
      if (!acc[match.winner_id]) {
        acc[match.winner_id] = {
          team: match.winner,
          wins: 0,
        }
      }
      acc[match.winner_id].wins++
    }
    return acc
  }, {})

  const topTeamsList = Object.values(teamWins || {})
    .sort((a: any, b: any) => b.wins - a.wins)
    .slice(0, 5)

  const stats = [
    {
      title: "Total Teams",
      value: totalTeams || 0,
      subtitle: `${approvedTeams || 0} approved, ${pendingTeams || 0} pending`,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Players",
      value: totalPlayers || 0,
      subtitle: "Registered players",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Matches",
      value: totalMatches || 0,
      subtitle: `${completedMatches || 0} completed, ${liveMatches || 0} live`,
      icon: Trophy,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Recent Registrations",
      value: recentRegistrations || 0,
      subtitle: "Last 7 days",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Tournament Statistics</h2>
        <p className="text-slate-400">Overview of tournament performance and metrics</p>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-1">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Teams */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Top Teams by Wins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTeamsList.length > 0 ? (
                topTeamsList.map((teamData: any, index) => (
                  <div
                    key={teamData.team.name}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{teamData.team.name}</p>
                        <p className="text-slate-400 text-sm">[{teamData.team.tag}]</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{teamData.wins}</p>
                      <p className="text-slate-400 text-xs">wins</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-4">No completed matches yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Tournament Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Team Approval Rate</span>
                <span className="text-white font-medium">
                  {totalTeams ? Math.round(((approvedTeams || 0) / totalTeams) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${totalTeams ? ((approvedTeams || 0) / totalTeams) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Match Completion</span>
                <span className="text-white font-medium">
                  {totalMatches ? Math.round(((completedMatches || 0) / totalMatches) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${totalMatches ? ((completedMatches || 0) / totalMatches) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
