import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TournamentBracket } from "@/components/tournament-bracket"
import { MatchSchedule } from "@/components/match-schedule"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Trophy } from "lucide-react"

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Tournament Schedule
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">Schedule & Brackets</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Tournament brackets, match schedule, and live results
            </p>
          </div>

          {/* Tournament Status */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Tournament Status
              </CardTitle>
              <CardDescription>Current tournament phase and upcoming matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">Registration</div>
                  <div className="text-sm text-muted-foreground">Currently Open</div>
                </div>
                <div className="text-center p-4 bg-muted/5 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-muted-foreground">Group Stage</div>
                  <div className="text-sm text-muted-foreground">Starts March 15</div>
                </div>
                <div className="text-center p-4 bg-muted/5 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-muted-foreground">Finals</div>
                  <div className="text-sm text-muted-foreground">March 22</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Schedule and Brackets */}
          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Match Schedule
              </TabsTrigger>
              <TabsTrigger value="brackets" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Tournament Bracket
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule">
              <MatchSchedule />
            </TabsContent>

            <TabsContent value="brackets">
              <TournamentBracket />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
