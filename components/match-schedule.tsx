"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Tv } from "lucide-react"

// Mock data for matches
const matches = [
  {
    id: 1,
    date: "2025-03-15",
    time: "10:00",
    phase: "Group Stage",
    group: "Group A",
    team1: "Team Alpha",
    team2: "Team Beta",
    map: "de_dust2",
    server: "BRUSS Server #1",
    status: "scheduled",
    stream: true,
  },
  {
    id: 2,
    date: "2025-03-15",
    time: "11:30",
    phase: "Group Stage",
    group: "Group A",
    team1: "Team Gamma",
    team2: "Team Delta",
    map: "de_inferno",
    server: "BRUSS Server #2",
    status: "scheduled",
    stream: false,
  },
  {
    id: 3,
    date: "2025-03-15",
    time: "13:00",
    phase: "Group Stage",
    group: "Group B",
    team1: "Team Echo",
    team2: "Team Foxtrot",
    map: "de_mirage",
    server: "BRUSS Server #1",
    status: "scheduled",
    stream: true,
  },
  {
    id: 4,
    date: "2025-03-15",
    time: "14:30",
    phase: "Group Stage",
    group: "Group B",
    team1: "Team Golf",
    team2: "Team Hotel",
    map: "de_nuke",
    server: "BRUSS Server #2",
    status: "scheduled",
    stream: false,
  },
  {
    id: 5,
    date: "2025-03-16",
    time: "10:00",
    phase: "Group Stage",
    group: "Group C",
    team1: "Team India",
    team2: "Team Juliet",
    map: "de_train",
    server: "BRUSS Server #1",
    status: "scheduled",
    stream: true,
  },
  {
    id: 6,
    date: "2025-03-20",
    time: "18:00",
    phase: "Semifinals",
    group: "Playoff",
    team1: "TBD",
    team2: "TBD",
    map: "TBD",
    server: "BRUSS Server #1",
    status: "pending",
    stream: true,
  },
  {
    id: 7,
    date: "2025-03-22",
    time: "19:00",
    phase: "Final",
    group: "Championship",
    team1: "TBD",
    team2: "TBD",
    map: "TBD",
    server: "BRUSS Server #1",
    status: "pending",
    stream: true,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "text-primary bg-primary/10 border-primary/20"
    case "live":
      return "text-red-400 bg-red-400/10 border-red-400/20"
    case "completed":
      return "text-green-400 bg-green-400/10 border-green-400/20"
    case "pending":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    default:
      return "text-muted-foreground bg-muted/10 border-border"
  }
}

const getPhaseColor = (phase: string) => {
  switch (phase) {
    case "Group Stage":
      return "text-primary bg-primary/10 border-primary/20"
    case "Semifinals":
      return "text-secondary bg-secondary/10 border-secondary/20"
    case "Final":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    default:
      return "text-muted-foreground bg-muted/10 border-border"
  }
}

export function MatchSchedule() {
  const [selectedDate, setSelectedDate] = useState<string>("all")
  const [selectedPhase, setSelectedPhase] = useState<string>("all")

  const filteredMatches = matches.filter((match) => {
    const dateMatch = selectedDate === "all" || match.date === selectedDate
    const phaseMatch = selectedPhase === "all" || match.phase === selectedPhase
    return dateMatch && phaseMatch
  })

  const uniqueDates = [...new Set(matches.map((match) => match.date))].sort()
  const uniquePhases = [...new Set(matches.map((match) => match.phase))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Filter Matches</CardTitle>
          <CardDescription>Filter matches by date and tournament phase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phase</label>
              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Phases</SelectItem>
                  {uniquePhases.map((phase) => (
                    <SelectItem key={phase} value={phase}>
                      {phase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match List */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No matches found for the selected filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredMatches.map((match) => (
            <Card key={match.id} className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Match Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getPhaseColor(match.phase)}>{match.phase}</Badge>
                      {match.group && <Badge variant="outline">{match.group}</Badge>}
                      <Badge className={getStatusColor(match.status)}>
                        {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                      </Badge>
                      {match.stream && (
                        <Badge className="text-red-400 bg-red-400/10 border-red-400/20">
                          <Tv className="h-3 w-3 mr-1" />
                          Live Stream
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          {new Date(match.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span className="text-sm">{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{match.map}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="text-sm">{match.server}</span>
                      </div>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="flex items-center gap-4 lg:min-w-[300px]">
                    <div className="text-center flex-1">
                      <div className="font-medium text-primary">{match.team1}</div>
                    </div>
                    <div className="text-muted-foreground font-bold">VS</div>
                    <div className="text-center flex-1">
                      <div className="font-medium text-secondary">{match.team2}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {match.stream && (
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Tv className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
                    )}
                    {match.status === "completed" && (
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Results
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Schedule Notes */}
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="text-secondary">Schedule Information</CardTitle>
          <CardDescription>Important notes about match scheduling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Time Zone</h4>
              <p className="text-sm text-muted-foreground">
                All times are displayed in UTC. Please convert to your local time zone.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Match Duration</h4>
              <p className="text-sm text-muted-foreground">Each match is allocated 90 minutes including setup time.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Rescheduling</h4>
              <p className="text-sm text-muted-foreground">
                Match rescheduling requires approval from both teams and admins.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Live Updates</h4>
              <p className="text-sm text-muted-foreground">
                This schedule is updated in real-time as the tournament progresses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
