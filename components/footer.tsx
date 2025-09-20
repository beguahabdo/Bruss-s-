import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
                <span className="text-primary-foreground font-bold text-sm">BC</span>
              </div>
              <span className="text-xl font-bold neon-text">BRUSS Cup 2025</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Official Counter-Strike: Source tournament hosted by the BRUSS community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Tournament
              </Link>
              <Link href="/rules" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Rules & Regulations
              </Link>
              <Link
                href="/schedule"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Schedule & Brackets
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">Community</h3>
            <div className="space-y-2">
              <a
                href="http://bruss.org.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                BRUSS Main Website
              </a>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 BRUSS Cup Tournament. Created as a proposal to support the BRUSS community.
          </p>
        </div>
      </div>
    </footer>
  )
}
