import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CountdownTimer } from "@/components/countdown-timer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-10"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <Badge className="mb-6 neon-glow" variant="secondary">
              Counter-Strike: Source Tournament
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text text-balance">BRUSS Cup 2025</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Join the ultimate Counter-Strike: Source tournament hosted by the BRUSS community. 16 teams, epic battles,
              and glory awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="neon-glow text-lg px-8 py-3">
                <Trophy className="mr-2 h-5 w-5" />
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                <Calendar className="mr-2 h-5 w-5" />
                View Schedule
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Tournament Starts In:</h2>
              <CountdownTimer targetDate="2025-03-15T10:00:00Z" />
            </div>
          </div>
        </section>

        {/* Tournament Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Tournament Overview</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the thrill of competitive Counter-Strike: Source in our premier tournament
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary">16 Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Maximum 80 players, 5 per team</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-secondary">3-Stage Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Group Stage → Playoffs → Final</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Live Streaming</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">All matches streamed live</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-secondary">BRUSS Servers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Official dedicated servers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Tournament Details</CardTitle>
                  <CardDescription>Key information about BRUSS Cup 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">March 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registration:</span>
                    <span className="font-medium text-primary">Open Now</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium">Optional (Admin Decision)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform:</span>
                    <span className="font-medium">Counter-Strike: Source</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-secondary">How to Join</CardTitle>
                  <CardDescription>Simple steps to participate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      1
                    </div>
                    <p className="text-sm">Register individually or as a full team</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      2
                    </div>
                    <p className="text-sm">Confirm your team through registration form</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      3
                    </div>
                    <p className="text-sm">Wait for bracket announcement</p>
                  </div>
                  <Button className="w-full mt-4 neon-glow">Start Registration</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
