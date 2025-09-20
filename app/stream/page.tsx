import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tv, Users, Calendar, ExternalLink } from "lucide-react"

export default function StreamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Live Coverage
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">Live Streaming</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Watch BRUSS Cup 2025 matches live with professional commentary
            </p>
          </div>

          {/* Stream Status */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Tv className="h-5 w-5" />
                Stream Status
              </CardTitle>
              <CardDescription>Current streaming information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/5 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-muted-foreground">Offline</div>
                  <div className="text-sm text-muted-foreground">Tournament starts March 15</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">All Matches</div>
                  <div className="text-sm text-muted-foreground">Will be streamed live</div>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary">Enhanced</div>
                  <div className="text-sm text-muted-foreground">Semifinals & Finals</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Stream Embed */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-primary">Main Tournament Stream</CardTitle>
              <CardDescription>Primary coverage of BRUSS Cup 2025 matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-card/50 rounded-lg border border-border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Tv className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">Stream Offline</h3>
                    <p className="text-muted-foreground">
                      Live streaming will begin when the tournament starts on March 15, 2025
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button variant="outline" className="bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Twitch
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in YouTube
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stream Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Streams
                </CardTitle>
                <CardDescription>Next scheduled live broadcasts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                    <div>
                      <div className="font-medium">Group Stage Day 1</div>
                      <div className="text-sm text-muted-foreground">March 15, 2025 - 10:00 UTC</div>
                    </div>
                    <Badge className="text-secondary bg-secondary/10 border-secondary/20">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <div className="font-medium">Group Stage Day 2</div>
                      <div className="text-sm text-muted-foreground">March 16, 2025 - 10:00 UTC</div>
                    </div>
                    <Badge className="text-primary bg-primary/10 border-primary/20">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-400/5 rounded-lg border border-yellow-400/20">
                    <div>
                      <div className="font-medium">Semifinals</div>
                      <div className="text-sm text-muted-foreground">March 20, 2025 - 18:00 UTC</div>
                    </div>
                    <Badge className="text-yellow-400 bg-yellow-400/10 border-yellow-400/20">Enhanced</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-400/5 rounded-lg border border-yellow-400/20">
                    <div>
                      <div className="font-medium">Championship Final</div>
                      <div className="text-sm text-muted-foreground">March 22, 2025 - 19:00 UTC</div>
                    </div>
                    <Badge className="text-yellow-400 bg-yellow-400/10 border-yellow-400/20">Premium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Stream Features
                </CardTitle>
                <CardDescription>What to expect from our live coverage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Professional Commentary</h4>
                      <p className="text-sm text-muted-foreground">Expert analysis and play-by-play commentary</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Multiple Camera Angles</h4>
                      <p className="text-sm text-muted-foreground">Player perspectives and tactical overviews</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Live Statistics</h4>
                      <p className="text-sm text-muted-foreground">Real-time player stats and match data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Interactive Chat</h4>
                      <p className="text-sm text-muted-foreground">Engage with the community during matches</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stream Information */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Streaming Information</CardTitle>
              <CardDescription>Important details about tournament broadcasts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-secondary">Coverage Details</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• All tournament matches will be streamed live</li>
                    <li>• Semifinals and finals feature enhanced production</li>
                    <li>• Multiple language commentary options available</li>
                    <li>• VODs available after each match</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-primary">Technical Specifications</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 1080p HD video quality</li>
                    <li>• 60 FPS for smooth gameplay viewing</li>
                    <li>• Low latency streaming technology</li>
                    <li>• Mobile-friendly viewing experience</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Stream links and embed codes will be activated when the tournament begins.
                  Follow our social media channels for live updates and notifications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
