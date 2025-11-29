"use client"

import Link from "next/link"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { ArrowRight, TrendingUp, Brain, Target, Zap } from "lucide-react"
import HeroWorkers from "@/components/landing/hero-workers"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />

      {/* Hero Section */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6 card-animate">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Your Autonomous Financial Coach
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Built for gig workers, informal sector workers, and everyday earners with irregular income. Understand
                your money. Learn finance. Make smarter decisions—proactively.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-border hover:bg-muted bg-transparent"
                  >
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Graphic with animated gig worker benefits */}
            <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-border flex items-center justify-center card-animate hero-delay">
              <HeroWorkers />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-muted/40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Pixil?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed for the unique financial challenges of irregular income earners
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="rounded-lg border border-border bg-card p-8 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Understands Your Income Rhythm</h3>
              <p className="text-muted-foreground">
                Analyzes your earnings patterns and learns what affects your income—seasons, days, market conditions—to
                predict with accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-border bg-card p-8 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Predicts Consequences Before You Spend</h3>
              <p className="text-muted-foreground">
                See the real impact of your financial decisions. What happens to your buffer? Can you handle an
                emergency?
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-border bg-card p-8 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Teaches Finance in Your Language</h3>
              <p className="text-muted-foreground">
                Learn budgeting, interest, EMIs, and investment—no jargon, no assumptions. Built for someone new to
                formal finance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-lg border border-border bg-card p-8 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Helps Build Multiple Income Streams</h3>
              <p className="text-muted-foreground">
                Get personalized suggestions for new opportunities aligned with your skills and schedule—reduce income
                risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Built with real financial principles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Pixil combines behavioral finance, income forecasting, and personalized coaching to help irregular earners
            build financial confidence.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/40 px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-primary mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-xs text-primary-foreground">
                  P
                </div>
                Pixil
              </div>
              <p className="text-sm text-muted-foreground">Financial coach for irregular earners</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Coach
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Learn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Pixil. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
