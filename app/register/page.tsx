import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegistrationForm } from "@/components/registration-form"
import { Badge } from "@/components/ui/badge"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 neon-glow" variant="secondary">
              Tournament Registration
            </Badge>
            <h1 className="text-4xl font-bold mb-4 neon-text">Register for BRUSS Cup 2025</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Join the ultimate Counter-Strike: Source tournament experience
            </p>
          </div>

          <RegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
