"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar } from "lucide-react"

// Mock bracket data
const bracketData = {
  groupStage: {
    groupA: [
      { name: "Team Alpha", wins: 0, losses: 0 },
      { name: "Team Beta", wins: 0, losses: 0 },
      { name: "Team Gamma", wins: 0, losses: 0 },
      { name: "Team Delta", wins: 0, losses: 0 },
    ],
    groupB: [
      { name: "Team Echo", wins: 0, losses: 0 },
      { name: "Team Foxtrot", wins: 0, losses: 0 },
      { name: "Team Golf", wins: 0, losses: 0 },
      { name: "Team Hotel", wins: 0, losses: 0 },
    ],
    groupC: [
      { name: "Team India", wins: 0, losses: 0 },
      { name: "Team Juliet", wins: 0, losses: 0 },
      { name: "Team Kilo", wins: 0, losses: 0 },
      { name: "Team Lima", wins: 0, losses: 0 },
    ],
    groupD: [
      { name: "Team Mike", wins: 0, losses: 0 },
      { name: "Team November", wins: 0, losses: 0 },
      { name: "Team Oscar", wins: 0, losses: 0 },
      { name: "Team Papa", wins: 0, losses: 0 },
    ],
  },
  playoffs: {
    quarterfinals: [
      { team1: "TBD", team2: "TBD", winner: null },
      { team1: "TBD", team2: "TBD", winner: null },
      { team1: "TBD", team2: "TBD", winner: null },
      { team1: "TBD", team2: "TBD", winner: null },
    ],
    semifinals: [
      { team1: "TBD", team2: "TBD", winner: null },
      { team1: "TBD", team2: "TBD", winner: null },
    ],
    final: { team1: "TBD", team2: "TBD", winner: null },
  },
}

export function TournamentBracket() {
  return (
    <div className="space-y-8">
      {/* Tournament Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Tournament Format
          </CardTitle>
          <CardDescription>16 teams competing in a structured elimination format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium">Group Stage</div>
              <div className="text-sm text-muted-foreground">4 groups of 4 teams</div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="font-medium">Playoffs</div>
              <div className="text-sm text-muted-foreground">Top 2 from each group</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium">Single Elimination</div>
              <div className="text-sm text-muted-foreground">Best of 3 matches</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group Stage */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Group Stage</h2>
          <p className="text-muted-foreground">Round-robin format within each group</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(bracketData.groupStage).map(([groupName, teams]) => (
            <Card key={groupName} className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary text-center">
                  {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {teams.map((team, index) => (
                  <div
                    key={team.name}
                    className="flex items-center justify-between p-2 bg-card/50 rounded border border-border"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">{team.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {team.wins}-{team.losses}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Playoffs Bracket */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary mb-2">Playoff Bracket</h2>
          <p className="text-muted-foreground">Single elimination tournament</p>
        </div>

        {/* Bracket Visualization */}
        <div className="space-y-8">
          {/* Quarterfinals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">Quarterfinals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bracketData.playoffs.quarterfinals.map((match, index) => (
                <Card key={index} className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="text-center text-sm text-muted-foreground mb-2">QF {index + 1}</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 bg-primary/5 rounded border border-primary/20">
                          <span className="text-sm">{match.team1}</span>
                          <Badge variant="outline" className="text-xs">
                            TBD
                          </Badge>
                        </div>
                        <div className="text-center text-xs text-muted-foreground">vs</div>
                        <div className="flex items-center justify-between p-2 bg-secondary/5 rounded border border-secondary/20">
                          <span className="text-sm">{match.team2}</span>
                          <Badge variant="outline" className="text-xs">
                            TBD
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Semifinals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-secondary">Semifinals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {bracketData.playoffs.semifinals.map((match, index) => (
                <Card key={index} className="border-secondary/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="text-center text-sm text-muted-foreground mb-2">SF {index + 1}</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 bg-primary/5 rounded border border-primary/20">
                          <span className="text-sm">{match.team1}</span>
                          <Badge variant="outline" className="text-xs">
                            TBD
                          </Badge>
                        </div>
                        <div className="text-center text-xs text-muted-foreground">vs</div>
                        <div className="flex items-center justify-between p-2 bg-secondary/5 rounded border border-secondary/20">
                          <span className="text-sm">{match.team2}</span>
                          <Badge variant="outline" className="text-xs">
                            TBD
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-yellow-400">Championship Final</h3>
            <div className="max-w-md mx-auto">
              <Card className="border-yellow-400/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">BRUSS Cup 2025 Final</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-primary/5 rounded border border-primary/20">
                        <span className="font-medium">{bracketData.playoffs.final.team1}</span>
                        <Badge variant="outline">TBD</Badge>
                      </div>
                      <div className="text-center text-sm text-muted-foreground font-bold">VS</div>
                      <div className="flex items-center justify-between p-3 bg-secondary/5 rounded border border-secondary/20">
                        <span className="font-medium">{bracketData.playoffs.final.team2}</span>
                        <Badge variant="outline">TBD</Badge>
                      </div>
                    </div>
                    <div className="text-center pt-2">
                      <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
                        March 22, 2025 - 19:00 UTC
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bracket Information */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Bracket Information</CardTitle>
          <CardDescription>Tournament progression and advancement rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-secondary">Group Stage Rules</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Round-robin format within each group</li>
                <li>• Each team plays every other team in their group</li>
                <li>• Top 2 teams from each group advance to playoffs</li>
                <li>• Tiebreakers: head-to-head, round difference, total rounds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-primary">Playoff Rules</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Single elimination format</li>
                <li>• Best of 3 matches (BO3)</li>
                <li>• Map veto system for map selection</li>
                <li>• Final match may be Best of 5 (BO5)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
