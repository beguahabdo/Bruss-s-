import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Target } from "lucide-react"

const maps = [
  {
    name: "de_dust2",
    description: "The most iconic Counter-Strike map featuring desert terrain and classic bomb sites.",
    type: "Bomb Defusal",
    difficulty: "Beginner",
    image: "/counter-strike-dust2-map-desert.jpg",
  },
  {
    name: "de_inferno",
    description: "Italian-themed map with narrow corridors and strategic chokepoints.",
    type: "Bomb Defusal",
    difficulty: "Intermediate",
    image: "/counter-strike-inferno-map-italian.jpg",
  },
  {
    name: "de_nuke",
    description: "Nuclear facility with unique vertical gameplay and tactical complexity.",
    type: "Bomb Defusal",
    difficulty: "Advanced",
    image: "/counter-strike-nuke-map-nuclear-facility.jpg",
  },
  {
    name: "de_train",
    description: "Industrial train yard with long sightlines and strategic positioning.",
    type: "Bomb Defusal",
    difficulty: "Intermediate",
    image: "/counter-strike-train-map-industrial.jpg",
  },
  {
    name: "de_mirage",
    description: "Middle Eastern setting with balanced gameplay and multiple routes.",
    type: "Bomb Defusal",
    difficulty: "Intermediate",
    image: "/counter-strike-mirage-map-middle-eastern.jpg",
  },
  {
    name: "de_cbble",
    description: "Medieval castle setting with unique architecture and tactical opportunities.",
    type: "Bomb Defusal",
    difficulty: "Advanced",
    image: "/counter-strike-cobblestone-map-medieval-castle.jpg",
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "text-green-400"
    case "Intermediate":
      return "text-yellow-400"
    case "Advanced":
      return "text-red-400"
    default:
      return "text-muted-foreground"
  }
}

export default function MapsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Tournament Maps
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">Official Map Pool</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Six carefully selected Counter-Strike: Source maps for competitive play
            </p>
          </div>

          {/* Map Overview */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Map Selection Process
              </CardTitle>
              <CardDescription>How maps are chosen for tournament matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The BRUSS Cup 2025 features six classic Counter-Strike: Source maps that provide diverse tactical
                challenges and exciting gameplay. Maps are selected through a structured process to ensure fair and
                competitive matches.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Team Bans</div>
                  <div className="text-sm text-muted-foreground">Teams ban unwanted maps</div>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <Target className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="font-medium">Map Picks</div>
                  <div className="text-sm text-muted-foreground">Teams select preferred maps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Final Selection</div>
                  <div className="text-sm text-muted-foreground">Remaining maps played</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maps.map((map) => (
              <Card
                key={map.name}
                className="border-primary/20 hover:border-primary/40 transition-colors overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={map.image || "/placeholder.svg"} alt={map.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                      {map.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-primary font-mono">{map.name}</CardTitle>
                    <Badge variant="outline" className={getDifficultyColor(map.difficulty)}>
                      {map.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{map.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map Rotation Info */}
          <Card className="border-secondary/20 mt-8">
            <CardHeader>
              <CardTitle className="text-secondary">Map Rotation & Strategy</CardTitle>
              <CardDescription>Understanding the competitive map pool</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-primary">Classic Maps</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">de_dust2</span>
                      <span className="text-green-400">Beginner Friendly</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">de_inferno</span>
                      <span className="text-yellow-400">Tactical Focus</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">de_mirage</span>
                      <span className="text-yellow-400">Balanced Play</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-secondary">Advanced Maps</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">de_nuke</span>
                      <span className="text-red-400">Vertical Gameplay</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">de_train</span>
                      <span className="text-yellow-400">Long Range</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">de_cbble</span>
                      <span className="text-red-400">Complex Layout</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
