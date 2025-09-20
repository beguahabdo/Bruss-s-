import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Gamepad2, Tv } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Tournament Information
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">About BRUSS Cup 2025</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              The premier Counter-Strike: Source tournament hosted by the BRUSS community
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tournament Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  BRUSS Cup 2025 is an exciting Counter-Strike: Source tournament hosted on the official BRUSS servers.
                  This tournament brings together the best CS:S players and teams from our community for an epic
                  competitive experience.
                </p>
                <p className="text-muted-foreground">
                  The tournament is designed as an extension of the main BRUSS server community website (
                  <a
                    href="http://bruss.org.ru"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    bruss.org.ru
                  </a>
                  ) and serves as a celebration of our vibrant gaming community.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-secondary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Participation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maximum Teams:</span>
                    <span className="font-medium">16 Teams</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Players:</span>
                    <span className="font-medium">80 Players</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size:</span>
                    <span className="font-medium">5 Players per Team</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registration:</span>
                    <span className="font-medium text-primary">Individual or Team</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    Tournament Format
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">Group Stage</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-4">Teams compete in groups to advance to playoffs</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="font-medium">Playoffs</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-4">Elimination rounds leading to the final</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">Final</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-4">Championship match between top 2 teams</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Tv className="h-5 w-5" />
                  Live Streaming & Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  All matches will be streamed live for the community to enjoy. Special emphasis will be placed on
                  semifinals and finals with enhanced production quality and commentary.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">All Matches</div>
                    <div className="text-sm text-muted-foreground">Live Streamed</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary">Semifinals</div>
                    <div className="text-sm text-muted-foreground">Enhanced Coverage</div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">Finals</div>
                    <div className="text-sm text-muted-foreground">Premium Production</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary">Community Initiative</CardTitle>
                <CardDescription>Supporting the BRUSS Gaming Community</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This website and tournament are created as a proposal to support and enhance the BRUSS community
                  gaming experience. We aim to bring players together, foster competitive spirit, and celebrate the
                  skill and dedication of Counter-Strike: Source players in our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
