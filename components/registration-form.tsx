"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, Users, CheckCircle } from "lucide-react"

export function RegistrationForm() {
  const [registrationType, setRegistrationType] = useState<"individual" | "team" | "">("")
  const [formData, setFormData] = useState({
    // Individual fields
    playerName: "",
    steamId: "",
    email: "",
    discordTag: "",
    experience: "",
    preferredRole: "",

    // Team fields
    teamName: "",
    captainName: "",
    captainEmail: "",
    captainDiscord: "",
    player1: "",
    player1Steam: "",
    player2: "",
    player2Steam: "",
    player3: "",
    player3Steam: "",
    player4: "",
    player4Steam: "",
    player5: "",
    player5Steam: "",

    // Common fields
    agreeToRules: false,
    agreeToSchedule: false,
    additionalInfo: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Registration submitted:", { type: registrationType, data: formData })
    alert("Registration submitted successfully! You will receive a confirmation email shortly.")
  }

  return (
    <div className="space-y-8">
      {/* Registration Type Selection */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Choose Registration Type</CardTitle>
          <CardDescription>Select how you want to participate in the tournament</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={registrationType}
            onValueChange={(value) => setRegistrationType(value as "individual" | "team")}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 p-4 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors">
              <RadioGroupItem value="individual" id="individual" />
              <div className="flex-1">
                <Label htmlFor="individual" className="flex items-center gap-2 cursor-pointer">
                  <UserPlus className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">Individual Registration</div>
                    <div className="text-sm text-muted-foreground">Join as a solo player</div>
                  </div>
                </Label>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-4 border border-secondary/20 rounded-lg hover:border-secondary/40 transition-colors">
              <RadioGroupItem value="team" id="team" />
              <div className="flex-1">
                <Label htmlFor="team" className="flex items-center gap-2 cursor-pointer">
                  <Users className="h-4 w-4 text-secondary" />
                  <div>
                    <div className="font-medium">Team Registration</div>
                    <div className="text-sm text-muted-foreground">Register complete 5-player team</div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Registration Form */}
      {registrationType && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {registrationType === "individual" && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Individual Player Information
                </CardTitle>
                <CardDescription>Provide your player details for team matching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="playerName">Player Name *</Label>
                    <Input
                      id="playerName"
                      value={formData.playerName}
                      onChange={(e) => handleInputChange("playerName", e.target.value)}
                      placeholder="Your in-game name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="steamId">Steam ID *</Label>
                    <Input
                      id="steamId"
                      value={formData.steamId}
                      onChange={(e) => handleInputChange("steamId", e.target.value)}
                      placeholder="STEAM_0:X:XXXXXXXX"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discordTag">Discord Tag</Label>
                    <Input
                      id="discordTag"
                      value={formData.discordTag}
                      onChange={(e) => handleInputChange("discordTag", e.target.value)}
                      placeholder="username#1234"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                        <SelectItem value="expert">Expert (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredRole">Preferred Role</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredRole", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Fragger</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="awp">AWP</SelectItem>
                        <SelectItem value="igl">In-Game Leader</SelectItem>
                        <SelectItem value="lurker">Lurker</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {registrationType === "team" && (
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Information
                </CardTitle>
                <CardDescription>Register your complete 5-player team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Team Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-secondary">Team Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input
                        id="teamName"
                        value={formData.teamName}
                        onChange={(e) => handleInputChange("teamName", e.target.value)}
                        placeholder="Your team name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Captain Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-secondary">Team Captain</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="captainName">Captain Name *</Label>
                      <Input
                        id="captainName"
                        value={formData.captainName}
                        onChange={(e) => handleInputChange("captainName", e.target.value)}
                        placeholder="Captain's in-game name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="captainEmail">Captain Email *</Label>
                      <Input
                        id="captainEmail"
                        type="email"
                        value={formData.captainEmail}
                        onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                        placeholder="captain@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captainDiscord">Captain Discord</Label>
                    <Input
                      id="captainDiscord"
                      value={formData.captainDiscord}
                      onChange={(e) => handleInputChange("captainDiscord", e.target.value)}
                      placeholder="captain#1234"
                    />
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-4">
                  <h4 className="font-medium text-secondary">Team Members (5 players total including captain)</h4>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20"
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`player${num}`}>Player {num} Name *</Label>
                        <Input
                          id={`player${num}`}
                          value={formData[`player${num}` as keyof typeof formData] as string}
                          onChange={(e) => handleInputChange(`player${num}`, e.target.value)}
                          placeholder={`Player ${num} in-game name`}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`player${num}Steam`}>Player {num} Steam ID *</Label>
                        <Input
                          id={`player${num}Steam`}
                          value={formData[`player${num}Steam` as keyof typeof formData] as string}
                          onChange={(e) => handleInputChange(`player${num}Steam`, e.target.value)}
                          placeholder="STEAM_0:X:XXXXXXXX"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Additional Information</CardTitle>
              <CardDescription>Optional details and agreements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Comments</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Any additional information, special requests, or comments..."
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToRules"
                    checked={formData.agreeToRules}
                    onCheckedChange={(checked) => handleInputChange("agreeToRules", checked as boolean)}
                  />
                  <Label htmlFor="agreeToRules" className="text-sm">
                    I agree to the tournament rules and regulations *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToSchedule"
                    checked={formData.agreeToSchedule}
                    onCheckedChange={(checked) => handleInputChange("agreeToSchedule", checked as boolean)}
                  />
                  <Label htmlFor="agreeToSchedule" className="text-sm">
                    I understand that matches must be played at scheduled times *
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="border-secondary/20">
            <CardContent className="pt-6">
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  By submitting this form, you confirm that all information provided is accurate and you agree to
                  participate in the BRUSS Cup 2025 tournament under the specified rules and conditions.
                </AlertDescription>
              </Alert>
              <Button
                type="submit"
                size="lg"
                className="w-full neon-glow"
                disabled={!formData.agreeToRules || !formData.agreeToSchedule}
              >
                Submit Registration
              </Button>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  )
}
