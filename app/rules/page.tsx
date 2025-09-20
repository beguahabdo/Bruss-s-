import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Clock, Server, Gavel, AlertTriangle } from "lucide-react"

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Tournament Rules
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">Rules & Regulations</h1>
            <p className="text-xl text-muted-foreground text-pretty">Official rules for BRUSS Cup 2025 tournament</p>
          </div>

          <div className="space-y-8">
            {/* Important Notice */}
            <Alert className="border-secondary/20 bg-secondary/5">
              <AlertTriangle className="h-4 w-4 text-secondary" />
              <AlertDescription className="text-secondary">
                <strong>Important:</strong> All participants must read and agree to these rules before registration.
                Violation of any rule may result in disqualification from the tournament.
              </AlertDescription>
            </Alert>

            {/* Fair Play Rules */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Fair Play & Conduct
                </CardTitle>
                <CardDescription>Maintaining integrity and sportsmanship</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">No Cheating or Hacking</h4>
                      <p className="text-sm text-muted-foreground">
                        Use of any cheats, hacks, exploits, or third-party software that provides unfair advantage is
                        strictly prohibited.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">No Scripts or Macros</h4>
                      <p className="text-sm text-muted-foreground">
                        Automated scripts, macros, or any form of automated gameplay assistance is forbidden.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Respectful Behavior</h4>
                      <p className="text-sm text-muted-foreground">
                        Maintain respectful communication with opponents, teammates, and tournament staff at all times.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">No Toxic Behavior</h4>
                      <p className="text-sm text-muted-foreground">
                        Harassment, toxic behavior, or unsportsmanlike conduct will result in immediate
                        disqualification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Match Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-secondary flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Match Timing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Punctuality Required</h4>
                    <p className="text-sm text-muted-foreground">
                      Players must show up on time for their scheduled matches. Late arrivals may result in forfeit.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Grace Period</h4>
                    <p className="text-sm text-muted-foreground">
                      Maximum 15-minute grace period for late players. After this, the match may be forfeited.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Rescheduling</h4>
                    <p className="text-sm text-muted-foreground">
                      Match rescheduling requires approval from tournament admins and both teams.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Server Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Official BRUSS Servers Only</h4>
                    <p className="text-sm text-muted-foreground">
                      All tournament matches must be played exclusively on official BRUSS servers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Server Assignment</h4>
                    <p className="text-sm text-muted-foreground">
                      Server assignments will be provided by tournament admins before each match.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Technical Issues</h4>
                    <p className="text-sm text-muted-foreground">
                      Report any server-related technical issues immediately to tournament staff.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Authority */}
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Administrative Authority
                </CardTitle>
                <CardDescription>Final decisions and dispute resolution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                  <h4 className="font-medium text-secondary mb-2">Admin Final Say</h4>
                  <p className="text-muted-foreground text-sm">
                    Tournament administrators have the final say in all disputes, rule interpretations, and disciplinary
                    actions. Their decisions are binding and final.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Dispute Resolution</h4>
                      <p className="text-sm text-muted-foreground">
                        All disputes must be reported to admins immediately. Provide evidence when possible.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Rule Modifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Admins reserve the right to modify rules if necessary for tournament integrity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Disciplinary Actions</h4>
                      <p className="text-sm text-muted-foreground">
                        Penalties range from warnings to temporary suspension to permanent disqualification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Rules */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Additional Regulations</CardTitle>
                <CardDescription>Important supplementary rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Team Substitutions</h4>
                    <p className="text-sm text-muted-foreground">
                      Team roster changes require admin approval and must be submitted before tournament start.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Match Recording</h4>
                    <p className="text-sm text-muted-foreground">
                      All matches may be recorded for review purposes and dispute resolution.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Communication</h4>
                    <p className="text-sm text-muted-foreground">
                      Official tournament communication will be through designated channels only.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Prize Distribution</h4>
                    <p className="text-sm text-muted-foreground">
                      Prize distribution details will be announced separately by tournament organizers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
