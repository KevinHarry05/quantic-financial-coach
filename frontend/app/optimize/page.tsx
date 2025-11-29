"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts"
import { AlertCircle, TrendingUp, Target, ArrowRight, Zap } from "lucide-react"

type Tier = 0 | 1 | 2

interface TierInfo {
  level: Tier
  label: string
  target: number
  description: string
  color: string
}

const TIER_INFO: Record<Tier, TierInfo> = {
  0: {
    level: 0,
    label: "Survival",
    target: 45000,
    description: "Income covers essential expenses only. Focus on increasing earnings.",
    color: "destructive",
  },
  1: {
    level: 1,
    label: "Comfort",
    target: 55000,
    description: "Income covers essentials and some discretionary spending. Build buffer.",
    color: "warning",
  },
  2: {
    level: 2,
    label: "Growth",
    target: 65000,
    description: "Income exceeds needs. Focus on savings and investments.",
    color: "success",
  },
}

type WeeklyAction = {
  week: string
  title: string
  detail: string
  earnings: string
  days: string
}

type PeakData = {
  hour: string
  day: string
  earnings: number
}

export default function OptimizePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any | null>(null)
  const [currentMonthlyIncome, setCurrentMonthlyIncome] = useState<number>(38000)
  const [essentialExpenses, setEssentialExpenses] = useState<number>(35000)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("quanticOnboarding")
      if (raw) {
        const data = JSON.parse(raw)
        setProfile(data)
        // Calculate monthly income from onboarding data
        const monthlyRange = data?.monthlyRange || "15000-30000"
        const [min, max] = monthlyRange.split("-").map((v: string) => parseInt(v.replace(/\D/g, "")))
        const avg = (min + max) / 2
        setCurrentMonthlyIncome(avg || 38000)

        // Calculate essential expenses
        const rent = parseInt(data?.rent?.replace(/\D/g, "") || "12000")
        const emi = parseInt(data?.emi?.replace(/\D/g, "") || "8000")
        const loans = parseInt(data?.loans?.replace(/\D/g, "") || "3000")
        const food = 8000 // estimated
        const transport = 3000 // estimated
        const other = 4000 // estimated
        setEssentialExpenses(rent + emi + loans + food + transport + other)
      }
    }
  }, [])

  // Tier detection: compare income vs essentials
  const tier: Tier = useMemo(() => {
    const ratio = currentMonthlyIncome / essentialExpenses
    if (ratio < 1.05) return 0 // Less than 5% above essentials = Tier 0
    if (ratio < 1.3) return 1 // 5-30% above = Tier 1
    return 2 // More than 30% above = Tier 2
  }, [currentMonthlyIncome, essentialExpenses])

  const tierData = TIER_INFO[tier]
  const gapToNextTier = useMemo(() => {
    const nextTier = tier < 2 ? TIER_INFO[(tier + 1) as Tier] : null
    if (!nextTier) return null
    return Math.max(0, nextTier.target - currentMonthlyIncome)
  }, [tier, currentMonthlyIncome])

  // Weekly action cards
  const weeklyActions: WeeklyAction[] = [
    {
      week: "This week",
      title: "Mon–Wed Uber: 12 rides",
      detail: "Focus on peak hours (7-10 AM, 6-9 PM) for surge pricing",
      earnings: "₹12,000",
      days: "Mon-Wed",
    },
    {
      week: "Next week",
      title: "Thu–Sat Zomato: 15 deliveries",
      detail: "Work dinner rush (6-10 PM) when order volume is highest",
      earnings: "₹9,000",
      days: "Thu-Sat",
    },
    {
      week: "Week 3",
      title: "Sunday double-shift",
      detail: "Uber morning + Zomato evening for maximum weekend earnings",
      earnings: "₹6,500",
      days: "Sunday",
    },
  ]

  // Peak heatmap data (hourly earnings by day)
  const peakHeatmapData: PeakData[] = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    const data: PeakData[] = []

    days.forEach((day) => {
      hours.forEach((hour) => {
        const hourNum = parseInt(hour.split(":")[0])
        // Peak hours: 7-10 AM, 12-2 PM, 6-10 PM
        let earnings = 200 + Math.random() * 300
        if (
          (hourNum >= 7 && hourNum <= 10) ||
          (hourNum >= 12 && hourNum <= 14) ||
          (hourNum >= 18 && hourNum <= 22)
        ) {
          earnings = 600 + Math.random() * 800 // Peak earnings
        }
        if (day === "Sat" || day === "Sun") {
          earnings *= 1.4 // Weekend boost
        }
        data.push({ hour, day, earnings: Math.round(earnings) })
      })
    })
    return data
  }, [])

  // Aggregate heatmap for display (avg earnings per hour across days)
  const hourlyPeaks = useMemo(() => {
    const hourlyMap = new Map<number, number[]>()
    peakHeatmapData.forEach((d) => {
      const hour = parseInt(d.hour.split(":")[0])
      if (!hourlyMap.has(hour)) {
        hourlyMap.set(hour, [])
      }
      hourlyMap.get(hour)!.push(d.earnings)
    })

    const result = Array.from({ length: 24 }, (_, hour) => {
      const earnings = hourlyMap.get(hour) || [0]
      const avg = earnings.reduce((a, b) => a + b, 0) / earnings.length
      return {
        hour: `${hour}:00`,
        earnings: Math.round(avg),
      }
    })

    const maxEarnings = Math.max(...result.map((r) => r.earnings))
    return result.map((r) => ({
      ...r,
      intensity: r.earnings / maxEarnings,
    }))
  }, [peakHeatmapData])

  const maxHourlyEarnings = Math.max(...hourlyPeaks.map((h) => h.earnings))

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              Income Optimization
              <TrendingUp className="w-5 h-5 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-1 max-w-xl">
              Optimize your earning schedule to hit your financial tier targets. Work smarter, not harder.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-transparent" onClick={() => router.push("/diversify")}>
              Back to Diversify
            </Button>
          </div>
        </div>

        {/* Tier Detection Card */}
        <Card
          className="p-6 space-y-4 border-2"
          style={{
            borderColor:
              tier === 0
                ? "hsl(var(--destructive))"
                : tier === 1
                  ? "hsl(var(--warning))"
                  : "hsl(var(--success))",
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
                    tier === 0
                      ? "bg-destructive/10 text-destructive"
                      : tier === 1
                        ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"
                  }`}
                >
                  {tier}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Tier {tier}: {tierData.label}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{tierData.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Current Monthly Income</p>
                  <p className="text-lg font-semibold text-foreground mt-1">₹{currentMonthlyIncome.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Essential Expenses</p>
                  <p className="text-lg font-semibold text-foreground mt-1">₹{essentialExpenses.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Tier {tier} Target</p>
                  <p className="text-lg font-semibold text-foreground mt-1">₹{tierData.target.toLocaleString()}</p>
                </div>
              </div>

              {gapToNextTier !== null && gapToNextTier > 0 && (
                <div className="mt-4 rounded-lg border border-primary/40 bg-primary/5 p-3 flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-primary">₹{gapToNextTier.toLocaleString()} to reach Tier {tier + 1}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Increase monthly income by ₹{gapToNextTier.toLocaleString()} to unlock {TIER_INFO[(tier + 1) as Tier].label}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Layout: charts + actions */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Peak Heatmap */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Peak Earnings Heatmap</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Average hourly earnings throughout the day. Darker = higher earnings potential.
                </p>
              </div>

              <ChartContainer
                className="h-80"
                config={{
                  earnings: { label: "Avg Earnings", color: "hsl(var(--chart-1))" },
                }}
              >
                <BarChart data={hourlyPeaks} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="hour"
                    stroke="var(--muted-foreground)"
                    tick={{ fontSize: 10 }}
                    interval={2}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                      />
                    }
                  />
                  <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                    {hourlyPeaks.map((entry, index) => {
                      const intensity = entry.intensity
                      const color = intensity > 0.7 ? "hsl(var(--chart-1))" : intensity > 0.4 ? "hsl(var(--chart-2))" : "hsl(var(--chart-3))"
                      return <Cell key={`cell-${index}`} fill={color} />
                    })}
                  </Bar>
                </BarChart>
              </ChartContainer>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <span>Peak hours: 7-10 AM, 12-2 PM, 6-10 PM</span>
                <span>Max: ₹{maxHourlyEarnings.toLocaleString()}/hr</span>
              </div>
            </Card>
          </div>

          {/* Right: Weekly Actions */}
          <div className="space-y-4">
            <Card className="p-5 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Weekly Action Plan</h2>
              <p className="text-xs text-muted-foreground">
                Specific, actionable steps to optimize your earnings this month.
              </p>

              <div className="space-y-3">
                {weeklyActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border bg-muted/40 p-4 space-y-2 card-animate"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-primary">{action.week}</p>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-success/10 text-success font-semibold">
                        {action.earnings}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.detail}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Zap className="w-3 h-3 text-warning" />
                      <span className="text-xs text-muted-foreground">{action.days}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

