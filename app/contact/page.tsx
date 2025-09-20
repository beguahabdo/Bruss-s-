import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, ExternalLink } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Support & Contact
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">Contact & Support</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Get in touch with tournament administrators and support team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Tournament Staff
                  </CardTitle>
                  <CardDescription>Get help from our dedicated team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Tournament Administrators</h4>
                    <p className="text-sm text-muted-foreground">
                      Our admin team handles registrations, disputes, and tournament operations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Technical Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Server issues, connection problems, and technical assistance.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Community Managers</h4>
                    <p className="text-sm text-muted-foreground">
                      General questions, community guidelines, and event information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-secondary flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Quick Support
                  </CardTitle>
                  <CardDescription>Common questions and resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Frequently Asked Questions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Registration process</li>
                      <li>• Tournament format</li>
                      <li>• Server connection</li>
                      <li>• Rules and regulations</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Response Time</h4>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all inquiries within 24 hours during tournament period.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    BRUSS Community
                  </CardTitle>
                  <CardDescription>Main community website and resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Main Website</h4>
                    <a
                      href="http://bruss.org.ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      bruss.org.ru
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Community Note</h4>
                    <p className="text-sm text-muted-foreground">
                      This tournament website is created as a proposal to support the BRUSS community gaming experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
