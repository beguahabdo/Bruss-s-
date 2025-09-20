"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface MatchEditPageProps {
  params: Promise<{ id: string }>
}

export default function MatchEditPage({ params }: MatchEditPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [match, setMatch] = useState<any>(null)
  const [teams, setTeams] = useState<any[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params

      // Fetch match
      const { data: matchData } = await supabase
        .from("matches")
        .select(`
          *,
          team1:team1_id(id, name, tag),
          team2:team2_id(name, tag),
          winner:winner_id(name, tag)
        `)
        .eq("id", id)
        .single()

      // Fetch teams
      const { data: teamsData } = await supabase
        .from("teams")
        .select("id, name, tag")
        .eq("status", "approved")
        .order("name")

      setMatch(matchData)
      setTeams(teamsData || [])
    }

    fetchData()
  }, [params, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!match) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("matches")
        .update({
          team1_id: match.team1_id,
          team2_id: match.team2_id,
          map: match.map,
          server_id: match.server_id,
          scheduled_at: match.scheduled_at,
          status: match.status,
          score_team1: match.score_team1,
          score_team2: match.score_team2,
          winner_id: match.winner_id,
          round_type: match.round_type,
          updated_at: new Date().toISOString(),
        })
        .eq("id", match.id)

      if (error) throw error
      router.push("/admin/matches")
    } catch (error) {
      console.error("Error updating match:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!match) {
    return <div className="text-white">Loading...</div>
  }

  const maps = ["de_dust2", "de_inferno", "de_nuke", "de_train", "de_mirage", "de_cbble"]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
          <Link href="/admin/matches">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Matches
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white">Edit Match</h2>
          <p className="text-slate-400">Update match details and results</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Match Details */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Match Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Team 1</Label>
                  <Select
                    value={match.team1_id || ""}
                    onValueChange={(value) => setMatch({ ...match, team1_id: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name} [{team.tag}]
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Team 2</Label>
                  <Select
                    value={match.team2_id || ""}
                    onValueChange={(value) => setMatch({ ...match, team2_id: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name} [{team.tag}]
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Map</Label>
                <Select value={match.map} onValueChange={(value) => setMatch({ ...match, map: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {maps.map((map) => (
                      <SelectItem key={map} value={map}>
                        {map}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Round Type</Label>
                <Select value={match.round_type} onValueChange={(value) => setMatch({ ...match, round_type: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">Group Stage</SelectItem>
                    <SelectItem value="quarterfinal">Quarterfinal</SelectItem>
                    <SelectItem value="semifinal">Semifinal</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Server ID</Label>
                <Input
                  value={match.server_id || ""}
                  onChange={(e) => setMatch({ ...match, server_id: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="e.g., BRUSS-01"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Scheduled Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={match.scheduled_at ? new Date(match.scheduled_at).toISOString().slice(0, 16) : ""}
                  onChange={(e) => setMatch({ ...match, scheduled_at: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Match Results */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Match Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-200">Status</Label>
                <Select value={match.status} onValueChange={(value) => setMatch({ ...match, status: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Team 1 Score</Label>
                  <Input
                    type="number"
                    min="0"
                    value={match.score_team1}
                    onChange={(e) => setMatch({ ...match, score_team1: Number.parseInt(e.target.value) || 0 })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Team 2 Score</Label>
                  <Input
                    type="number"
                    min="0"
                    value={match.score_team2}
                    onChange={(e) => setMatch({ ...match, score_team2: Number.parseInt(e.target.value) || 0 })}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              {match.status === "completed" && (
                <div className="space-y-2">
                  <Label className="text-slate-200">Winner</Label>
                  <Select
                    value={match.winner_id || ""}
                    onValueChange={(value) => setMatch({ ...match, winner_id: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select winner" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams
                        .filter((team) => team.id === match.team1_id || team.id === match.team2_id)
                        .map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name} [{team.tag}]
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" asChild className="border-slate-600 text-slate-300 bg-transparent">
            <Link href="/admin/matches">Cancel</Link>
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
