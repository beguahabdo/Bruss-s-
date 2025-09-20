import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Wifi, Users, Settings } from "lucide-react"

const servers = [
  {
    name: "BRUSS Tournament Server #1",
    ip: "bruss.org.ru:27015",
    location: "Primary Location",
    slots: 32,
    status: "Active",
    ping: "< 50ms",
  },
  {
    name: "BRUSS Tournament Server #2",
    ip: "bruss.org.ru:27016",
    location: "Primary Location",
    slots: 32,
    status: "Active",
    ping: "< 50ms",
  },
  {
    name: "BRUSS Tournament Server #3",
    ip: "bruss.org.ru:27017",
    location: "Backup Location",
    slots: 32,
    status: "Standby",
    ping: "< 75ms",
  },
  {
    name: "BRUSS Tournament Server #4",
    ip: "bruss.org.ru:27018",
    location: "Backup Location",
    slots: 32,
    status: "Standby",
    ping: "< 75ms",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-400 bg-green-400/10 border-green-400/20"
    case "Standby":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    case "Offline":
      return "text-red-400 bg-red-400/10 border-red-400/20"
    default:
      return "text-muted-foreground bg-muted/10 border-border"
  }
}

export default function ServersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Tournament Infrastructure
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">BRUSS Servers</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Dedicated Counter-Strike: Source servers for tournament matches
            </p>
          </div>

          {/* Server Overview */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Server className="h-5 w-5" />
                Server Infrastructure
              </CardTitle>
              <CardDescription>High-performance dedicated servers for competitive play</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                All BRUSS Cup 2025 tournament matches will be played exclusively on official BRUSS servers. These
                dedicated servers are optimized for competitive Counter-Strike: Source gameplay with low latency and
                high reliability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Server className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">4 Servers</div>
                  <div className="text-sm text-muted-foreground">Dedicated tournament servers</div>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-medium">32 Slots</div>
                  <div className="text-sm text-muted-foreground">Per server capacity</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Wifi className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Low Latency</div>
                  <div className="text-sm text-muted-foreground">Optimized for competition</div>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <Settings className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-medium">24/7 Monitoring</div>
                  <div className="text-sm text-muted-foreground">Continuous oversight</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Server List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {servers.map((server, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-primary text-lg">{server.name}</CardTitle>
                    <Badge className={getStatusColor(server.status)}>{server.status}</Badge>
                  </div>
                  <CardDescription className="font-mono text-sm">{server.ip}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">{server.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Slots</div>
                      <div className="font-medium">{server.slots} players</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      <span className="text-sm">Ping: {server.ping}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Server #{index + 1}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Server Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary">Server Specifications</CardTitle>
                <CardDescription>Technical details and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Game Version:</span>
                    <span className="font-medium">Counter-Strike: Source</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tickrate:</span>
                    <span className="font-medium">100 tick</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Anti-Cheat:</span>
                    <span className="font-medium">VAC + Custom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RCON Access:</span>
                    <span className="font-medium">Admin Only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recording:</span>
                    <span className="font-medium">Auto-demo</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Connection Information</CardTitle>
                <CardDescription>How to connect to tournament servers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2">Server Assignment</h4>
                  <p className="text-muted-foreground text-sm">
                    Tournament participants will receive server connection details from administrators before each
                    scheduled match. Do not attempt to connect to servers without authorization.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Connection Requirements</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Valid Steam account with CS:S</li>
                    <li>• Stable internet connection</li>
                    <li>• Updated game client</li>
                    <li>• Tournament password (provided)</li>
                  </ul>
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
