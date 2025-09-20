import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, Users, CheckCircle, AlertCircle } from "lucide-react"

export default function ParticipatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Registration Guide
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">How to Participate</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Simple steps to join the BRUSS Cup 2025 tournament
            </p>
          </div>

          <div className="space-y-8">
            {/* Registration Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      1
                    </div>
                  </div>
                  <CardTitle className="text-primary">Register</CardTitle>
                  <CardDescription>Individual or Team Registration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Register individually or as a complete team of 5 players through our registration form.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <UserPlus className="h-4 w-4 text-primary" />
                      <span>Individual Registration</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-secondary" />
                      <span>Full Team Registration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                      2
                    </div>
                  </div>
                  <CardTitle className="text-secondary">Confirm Team</CardTitle>
                  <CardDescription>Team Formation & Confirmation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Confirm your team composition through the registration form. Teams must have exactly 5 players.
                  </p>
                  <div className="flex items-center gap-2 text-sm justify-center">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span>5 Players Required</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      3
                    </div>
                  </div>
                  <CardTitle className="text-primary">Wait for Brackets</CardTitle>
                  <CardDescription>Tournament Bracket Announcement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Wait for the official tournament bracket announcement and match schedule.
                  </p>
                  <div className="flex items-center gap-2 text-sm justify-center">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Check Schedule Page</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Individual Registration
                  </CardTitle>
                  <CardDescription>Join as a solo player and get matched with a team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">How it works:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Register with your player information</li>
                      <li>• Specify your preferred role/position</li>
                      <li>• Get matched with other solo players</li>
                      <li>• Team formation handled by admins</li>
                    </ul>
                  </div>
                  <Button className="w-full neon-glow">Register as Individual</Button>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-secondary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Registration
                  </CardTitle>
                  <CardDescription>Register your complete 5-player team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Requirements:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Exactly 5 confirmed players</li>
                      <li>• Team name and captain designation</li>
                      <li>• All players must confirm participation</li>
                      <li>• Contact information for team captain</li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Register as Team
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Entry Fee Information */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Entry Fee Information</CardTitle>
                <CardDescription>Optional symbolic entry fee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary mb-2">Entry Fee Policy</h4>
                      <p className="text-muted-foreground text-sm">
                        The tournament may include an optional symbolic entry fee, which will be decided by the
                        tournament administrators. This fee, if implemented, will be minimal and used to support
                        tournament operations and prizes. All participants will be notified in advance if an entry fee
                        is required.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-secondary/20 text-center">
              <CardHeader>
                <CardTitle className="text-secondary">Ready to Join?</CardTitle>
                <CardDescription>Start your registration now and secure your spot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="neon-glow">
                    Start Registration
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent">
                    View Tournament Rules
                  </Button>
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
