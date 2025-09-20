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
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function NewMatchPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [teams, setTeams] = useState<any[]>([])
  const [matchData, setMatchData] = useState({
    team1_id: "",
    team2_id: "",
    map: "de_dust2",
    server_id: "",
    scheduled_at: "",
    status: "scheduled",
    score_team1: 0,
    score_team2: 0,
    round_type: "group",
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await supabase.from("teams").select("id, name, tag").eq("status", "approved").order("name")
      setTeams(data || [])
    }
    fetchTeams()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("matches").insert({
        ...matchData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      router.push("/admin/matches")
    } catch (error) {
      console.error("Error creating match:", error)
    } finally {
      setIsLoading(false)
    }
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
          <h2 className="text-3xl font-bold text-white">Create New Match</h2>
          <p className="text-slate-400">Schedule a new tournament match</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Match Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-200">Team 1 *</Label>
                <Select
                  value={matchData.team1_id}
                  onValueChange={(value) => setMatchData({ ...matchData, team1_id: value })}
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
                <Label className="text-slate-200">Team 2 *</Label>
                <Select
                  value={matchData.team2_id}
                  onValueChange={(value) => setMatchData({ ...matchData, team2_id: value })}
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
              <Label className="text-slate-200">Map *</Label>
              <Select value={matchData.map} onValueChange={(value) => setMatchData({ ...matchData, map: value })}>
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
              <Label className="text-slate-200">Round Type *</Label>
              <Select
                value={matchData.round_type}
                onValueChange={(value) => setMatchData({ ...matchData, round_type: value })}
              >
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
                value={matchData.server_id}
                onChange={(e) => setMatchData({ ...matchData, server_id: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="e.g., BRUSS-01"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Scheduled Date & Time</Label>
              <Input
                type="datetime-local"
                value={matchData.scheduled_at}
                onChange={(e) => setMatchData({ ...matchData, scheduled_at: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" asChild className="border-slate-600 text-slate-300 bg-transparent">
            <Link href="/admin/matches">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !matchData.team1_id || !matchData.team2_id}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isLoading ? "Creating..." : "Create Match"}
          </Button>
        </div>
      </form>
    </div>
  )
}
