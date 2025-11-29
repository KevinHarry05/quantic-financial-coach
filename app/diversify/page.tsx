"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { AlertCircle, Sparkles, ArrowRight } from "lucide-react"

const RISK_COLORS = ["#1e3a8a", "#f59e0b"]

type IncomeSource = {
  name: string
  value: number
}

type PlanStep = {
  month: string
  title: string
  detail: string
  delta: string
}

export default function DiversifyPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any | null>(null)
  const [planGenerated, setPlanGenerated] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("quanticOnboarding")
      if (raw) {
        setProfile(JSON.parse(raw))
      }
    }
  }, [])

  const incomeSources: IncomeSource[] = useMemo(() => {
    // Simple mock from profile: assume heavy concentration on primaryIncome
    const primary = profile?.primaryIncome || "Uber"
    return [
      { name: primary || "Uber", value: 90 },
      { name: "Zomato", value: 10 },
    ]
  }, [profile])

  const maxSource = incomeSources.reduce((max, src) => (src.value > max.value ? src : max), incomeSources[0])
  const isHighlyConcentrated = maxSource.value >= 80

  const plan: PlanStep[] = [
    {
      month: "Month 1",
      title: "Shift 3 days to Zomato",
      detail: "Work Zomato Mon–Wed evenings while keeping Uber peaks on weekends.",
      delta: "+₹8,000 buffer",
    },
    {
      month: "Month 2",
      title: "Add Fiverr evening gigs",
      detail: "2–3 Fiverr design or support gigs per week to reduce platform risk.",
      delta: "+₹5,000 buffer",
    },
    {
      month: "Month 3",
      title: "Start ₹500 SIP",
      detail: "Automate a small SIP from the extra earnings into a low-cost index fund.",
      delta: "₹500/month invested",
    },
  ]

  const riskTimeline = [
    { label: "Now", risk: 5 },
    { label: "Month 1", risk: 4 },
    { label: "Month 2", risk: 3 },
    { label: "Month 3", risk: 2 },
  ]

  useEffect(() => {
    // Auto-open the plan section when risk is very high (single platform > 80%)
    if (isHighlyConcentrated) {
      setPlanGenerated(true)
    }
  }, [isHighlyConcentrated])

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              Diversify Your Income
              <Sparkles className="w-5 h-5 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-1 max-w-xl">
              Reduce your risk by spreading work across platforms and adding small, high-leverage habits over the next 90 days.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => router.push("/simulate")}
            >
              Back to Simulator
            </Button>
          </div>
        </div>

        {/* Risk Alert */}
        {isHighlyConcentrated && (
          <div className="rounded-lg border border-warning/40 bg-warning/5 p-4 flex items-start gap-3 card-animate">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-warning">High concentration risk</p>
              <p className="text-xs text-muted-foreground mt-1">
                {maxSource.name} currently makes up {maxSource.value}% of your income. Pixil recommends diversifying over the next 90 days.
              </p>
            </div>
          </div>
        )}

        {/* Layout: charts + actions */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: charts */}
          <div className="space-y-6 lg:col-span-2">
            {/* Income source pie */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Current Income Mix</h2>
                  <p className="text-xs text-muted-foreground">How your monthly income is split across platforms.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Platform risk</p>
                  <p className="font-semibold text-warning text-sm">⭐⭐⭐⭐⭐</p>
                </div>
              </div>

              <ChartContainer
                className="h-64"
                config={{
                  uber: { label: "Uber", color: "hsl(var(--chart-1))" },
                  zomato: { label: "Zomato", color: "hsl(var(--chart-2))" },
                }}
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={incomeSources}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {incomeSources.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={index === 0 ? "var(--color-uber)" : "var(--color-zomato)"}
                      />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </Card>

            {/* Risk timeline */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">90-Day Risk Trajectory</h2>
                  <p className="text-xs text-muted-foreground">
                    If you follow this plan, your platform risk should step down each month.
                  </p>
                </div>
              </div>

              <ChartContainer
                className="h-64"
                config={{
                  risk: { label: "Risk Level", color: RISK_COLORS[0] },
                }}
              >
                <LineChart data={riskTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="label" stroke="var(--muted-foreground)" />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke={RISK_COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>

          {/* Right: 90-day plan + weekly actions */}
          <div className="space-y-4">
            <Card className="p-5 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">AI 90-Day Diversification Plan</h2>
              <p className="text-xs text-muted-foreground">
                Generated from your profile and current income pattern. Use this as a starting point and adjust to your reality.
              </p>

              <Button
                size="sm"
                className="w-full gap-2"
                onClick={() => setPlanGenerated(true)}
              >
                Generate 90-Day Plan
                <ArrowRight className="w-4 h-4" />
              </Button>

              {planGenerated && (
                <div className="space-y-3 pt-2 card-animate">
                  {plan.map((step) => (
                    <div
                      key={step.month}
                      className="rounded-lg border border-border bg-muted/40 p-3 space-y-1"
                    >
                      <p className="text-xs font-semibold text-primary">{step.month}</p>
                      <p className="text-sm font-medium text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.detail}</p>
                      <p className="text-xs font-semibold text-success mt-1">{step.delta}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-5 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Weekly Actions</h3>
              <p className="text-xs text-muted-foreground">
                Small, concrete tasks Pixil will nudge you about each week.
              </p>

              <div className="space-y-2">
                <div className="rounded-md border border-border bg-card/80 p-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-foreground">This week</p>
                    <p className="text-xs text-muted-foreground">
                      Complete 3 Zomato shifts and record earnings separately.
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">Notification on</span>
                </div>

                <div className="rounded-md border border-border bg-card/80 p-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Next week</p>
                    <p className="text-xs text-muted-foreground">
                      Set up a Fiverr profile and apply to 2 gigs.
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">Scheduled</span>
                </div>

                <div className="rounded-md border border-border bg-card/80 p-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-foreground">In 3 weeks</p>
                    <p className="text-xs text-muted-foreground">
                      Open SIP with ₹500/month from extra income.
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">Scheduled</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


