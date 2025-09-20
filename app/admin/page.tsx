import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, Megaphone } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dashboard statistics
  const [{ count: teamsCount }, { count: playersCount }, { count: matchesCount }, { count: announcementsCount }] =
    await Promise.all([
      supabase.from("teams").select("*", { count: "exact", head: true }),
      supabase.from("players").select("*", { count: "exact", head: true }),
      supabase.from("matches").select("*", { count: "exact", head: true }),
      supabase.from("announcements").select("*", { count: "exact", head: true }),
    ])

  // Fetch recent teams
  const { data: recentTeams } = await supabase
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch upcoming matches
  const { data: upcomingMatches } = await supabase
    .from("matches")
    .select(`
      *,
      team1:team1_id(name, tag),
      team2:team2_id(name, tag)
    `)
    .eq("status", "scheduled")
    .order("scheduled_at", { ascending: true })
    .limit(5)

  const stats = [
    {
      title: "Total Teams",
      value: teamsCount || 0,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Players",
      value: playersCount || 0,
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Matches",
      value: matchesCount || 0,
      icon: Trophy,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Announcements",
      value: announcementsCount || 0,
      icon: Megaphone,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-slate-400">Welcome to the BRUSS Cup 2025 administration panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
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
        {/* Recent Teams */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Team Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTeams?.map((team) => (
                <div key={team.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{team.name}</p>
                    <p className="text-slate-400 text-sm">[{team.tag}]</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      team.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : team.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {team.status}
                  </span>
                </div>
              )) || <p className="text-slate-400 text-center py-4">No teams registered yet</p>}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Matches */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMatches?.map((match) => (
                <div key={match.id} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-white font-medium">
                        {match.team1?.name} vs {match.team2?.name}
                      </p>
                      <p className="text-slate-400">
                        {match.map} • {match.round_type}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      {match.scheduled_at ? new Date(match.scheduled_at).toLocaleDateString() : "TBD"}
                    </div>
                  </div>
                </div>
              )) || <p className="text-slate-400 text-center py-4">No matches scheduled yet</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
