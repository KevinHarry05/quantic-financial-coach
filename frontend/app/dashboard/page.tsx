"use client"

import { useState, useEffect } from "react"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { StatCard } from "@/components/ui/stat-card"
import { AlertCard } from "@/components/ui/alert-card"
import { IncomeChart } from "@/components/dashboard/income-chart"
import { EarningsHeatmap } from "@/components/dashboard/earnings-heatmap"
import { BufferProgress } from "@/components/dashboard/buffer-progress"
import { ProgressMetrics } from "@/components/dashboard/progress-metrics"
import { NewsPopup } from "@/components/ui/news-popup"
import { TrendingUp, AlertCircle, Target, MapPin, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [onboardingData, setOnboardingData] = useState<any>(null)
  const [showNewsPopup, setShowNewsPopup] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("quanticOnboarding")
      if (data) {
        setOnboardingData(JSON.parse(data))
      }

      // Show today's financial news only once immediately after completing assessment
      const shouldShowNews = localStorage.getItem("showDashboardNewsOnce_v1")
      if (shouldShowNews === "true") {
        setShowNewsPopup(true)
        localStorage.removeItem("showDashboardNewsOnce_v1")
      }
    }
  }, [])

  // Tier 0 auto-trigger detection
  const isTier0 = useMemo(() => {
    if (!onboardingData) return false
    const monthlyRange = onboardingData?.monthlyRange || "15000-30000"
    const [min, max] = monthlyRange.split("-").map((v: string) => parseInt(v.replace(/\D/g, "")))
    const avgIncome = (min + max) / 2 || 38000

    const rent = parseInt(onboardingData?.rent?.replace(/\D/g, "") || "12000")
    const emi = parseInt(onboardingData?.emi?.replace(/\D/g, "") || "8000")
    const loans = parseInt(onboardingData?.loans?.replace(/\D/g, "") || "3000")
    const essentials = rent + emi + loans + 8000 + 3000 + 4000 // food, transport, other

    const ratio = avgIncome / essentials
    return ratio < 1.05 // Less than 5% above essentials = Tier 0
  }, [onboardingData])

  // Mock data with fallback
  const userName = onboardingData?.name || "Amit"
  const occupationType = onboardingData?.occupationType || "gig"
  const city = onboardingData?.city || "Mumbai"
  const financialScore = 72
  const stabilityScore = 58
  const riskLevel = "Medium"

  const alerts = [
    ...(isTier0
      ? [
          {
            type: "risk" as const,
            title: "Tier 0: Income Below Survival Level",
            description:
              "Your income only covers essential expenses. Optimize your schedule to increase earnings and reach Tier 1.",
            action: "Optimize Income",
            onAction: () => router.push("/optimize"),
          },
        ]
      : []),
    {
      type: "risk" as const,
      title: "Acceptance Rate Dropped",
      description:
        "Your acceptance rate fell to 82%. This could affect your income. Focus on longer trips to boost it.",
      action: "View Tips",
      onAction: () => console.log("View tips for acceptance rate"),
    },
    {
      type: "opportunity" as const,
      title: "Weekend Surge Coming",
      description: "Festival weekend shows 35% higher earnings. Plan to work extra shifts for maximum income.",
      action: "View Mentorship",
      onAction: () => console.log("View in mentorship"),
    },
    {
      type: "info" as const,
      title: "New Course Available",
      description: "EMI Planning 101 is now available in your learning path.",
      action: "Start Course",
      onAction: () => console.log("Start course"),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {showNewsPopup && <NewsPopup />}
      <NavigationBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, <span className="text-primary">{userName}</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span className="capitalize">{occupationType} Worker</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{city}</span>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Financial Capability Score"
              value={financialScore}
              unit="/100"
              trend={5}
              trendLabel="vs last month"
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <StatCard
              label="Income Stability Score"
              value={stabilityScore}
              unit="/100"
              trend={-2}
              trendLabel="vs last month"
              icon={<Target className="w-5 h-5" />}
            />
            <StatCard
              label="Risk Level"
              value={riskLevel}
              className={
                riskLevel === "High" ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"
              }
              icon={<AlertCircle className="w-5 h-5 text-warning" />}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Income Chart */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Income & Variability</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Your income varies 65% between best and worst weeks. Focus on high-earning days.
                </p>
              </div>
              <IncomeChart />
            </div>

            {/* Earnings Heatmap */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Earnings by Day of Week</h2>
              <EarningsHeatmap />
            </div>
          </div>

          {/* Right Column - Alerts & Buffer */}
          <div className="space-y-6">
            {/* Buffer Card */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-4">Emergency Buffer</h3>
              <BufferProgress />
            </div>

            {/* Alerts Section */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Alerts & Opportunities</h3>
              <div className="space-y-3">
                {alerts.map((alert, idx) => (
                  <AlertCard key={idx} {...alert} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Progress This Month</h2>
          <ProgressMetrics />
        </div>
      </div>
    </div>
  )
}
