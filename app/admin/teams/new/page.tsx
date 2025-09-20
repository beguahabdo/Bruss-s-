"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Player {
  steam_id: string
  nickname: string
  discord_tag: string
  role: "captain" | "player"
}

export default function NewTeamPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [teamData, setTeamData] = useState({
    name: "",
    tag: "",
    logo_url: "",
    captain_steam_id: "",
    captain_name: "",
    status: "approved",
  })
  const [players, setPlayers] = useState<Player[]>([{ steam_id: "", nickname: "", discord_tag: "", role: "captain" }])
  const router = useRouter()
  const supabase = createClient()

  const addPlayer = () => {
    setPlayers([...players, { steam_id: "", nickname: "", discord_tag: "", role: "player" }])
  }

  const removePlayer = (index: number) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index))
    }
  }

  const updatePlayer = (index: number, field: keyof Player, value: string) => {
    const updatedPlayers = [...players]
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value }
    setPlayers(updatedPlayers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create team
      const { data: team, error: teamError } = await supabase
        .from("teams")
        .insert({
          ...teamData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (teamError) throw teamError

      // Create players
      const playersData = players
        .filter((player) => player.steam_id && player.nickname)
        .map((player) => ({
          ...player,
          team_id: team.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))

      if (playersData.length > 0) {
        const { error: playersError } = await supabase.from("players").insert(playersData)
        if (playersError) throw playersError
      }

      router.push("/admin/teams")
    } catch (error) {
      console.error("Error creating team:", error)
    } finally {
      setIsLoading(false)
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
          <h2 className="text-3xl font-bold text-white">Add New Team</h2>
          <p className="text-slate-400">Create a new team registration</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Information */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Team Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">
                  Team Name *
                </Label>
                <Input
                  id="name"
                  required
                  value={teamData.name}
                  onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tag" className="text-slate-200">
                  Team Tag *
                </Label>
                <Input
                  id="tag"
                  required
                  value={teamData.tag}
                  onChange={(e) => setTeamData({ ...teamData, tag: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo_url" className="text-slate-200">
                  Logo URL
                </Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={teamData.logo_url}
                  onChange={(e) => setTeamData({ ...teamData, logo_url: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captain_name" className="text-slate-200">
                  Captain Name
                </Label>
                <Input
                  id="captain_name"
                  value={teamData.captain_name}
                  onChange={(e) => setTeamData({ ...teamData, captain_name: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captain_steam_id" className="text-slate-200">
                  Captain Steam ID
                </Label>
                <Input
                  id="captain_steam_id"
                  value={teamData.captain_steam_id}
                  onChange={(e) => setTeamData({ ...teamData, captain_steam_id: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-slate-200">
                  Status
                </Label>
                <Select value={teamData.status} onValueChange={(value) => setTeamData({ ...teamData, status: value })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Players */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Players</CardTitle>
                <Button type="button" onClick={addPlayer} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Player
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {players.map((player, index) => (
                <div key={index} className="p-4 bg-slate-700/30 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Player {index + 1}</h4>
                    {players.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removePlayer(index)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-slate-200 text-sm">Steam ID *</Label>
                      <Input
                        required
                        value={player.steam_id}
                        onChange={(e) => updatePlayer(index, "steam_id", e.target.value)}
                        className="bg-slate-600/50 border-slate-500 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-200 text-sm">Nickname *</Label>
                      <Input
                        required
                        value={player.nickname}
                        onChange={(e) => updatePlayer(index, "nickname", e.target.value)}
                        className="bg-slate-600/50 border-slate-500 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-200 text-sm">Discord Tag</Label>
                      <Input
                        value={player.discord_tag}
                        onChange={(e) => updatePlayer(index, "discord_tag", e.target.value)}
                        className="bg-slate-600/50 border-slate-500 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-200 text-sm">Role</Label>
                      <Select
                        value={player.role}
                        onValueChange={(value) => updatePlayer(index, "role", value as "captain" | "player")}
                      >
                        <SelectTrigger className="bg-slate-600/50 border-slate-500 text-white text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="captain">Captain</SelectItem>
                          <SelectItem value="player">Player</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" asChild className="border-slate-600 text-slate-300 bg-transparent">
            <Link href="/admin/teams">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Creating..." : "Create Team"}
          </Button>
        </div>
      </form>
    </div>
  )
}
