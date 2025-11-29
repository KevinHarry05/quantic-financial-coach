"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { SimulationOutcomeCard } from "@/components/ui/simulation-outcome-card"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"

type ScenarioType = "purchase" | "week-off" | "income-drop" | "new-gig"

interface Scenario {
  id: ScenarioType
  label: string
  description: string
}

interface SimulationResult {
  scenario: string
  summary: string
  risk: "Good" | "Medium" | "Risky"
  timeline: Array<{
    label: string
    event: string
    bufferAmount: number
    riskLevel: string
  }>
  suggestion: string
}

export default function SimulatePage() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("purchase")
  const [results, setResults] = useState<SimulationResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Configuration inputs
  const [config, setConfig] = useState({
    amount: 30000,
    timing: "immediate",
    weeks: 1,
    type: "rideshare",
    hours: 20,
  })

  const scenarios: Scenario[] = [
    { id: "purchase", label: "Big Purchase", description: "Plan a large expense" },
    { id: "week-off", label: "Take Week Off", description: "Plan a break from work" },
    { id: "income-drop", label: "Income Drop", description: "Prepare for reduced income" },
    { id: "new-gig", label: "Add New Gig", description: "Add a secondary income source" },
  ]

  const handleSimulate = async () => {
    setIsLoading(true)

    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate results based on scenario
    const mockResults: Record<ScenarioType, SimulationResult[]> = {
      purchase: [
        {
          scenario: "Do it fully",
          summary: "Purchase ₹30,000 immediately",
          risk: "Risky",
          timeline: [
            {
              label: "Day 1",
              event: "Purchase made. Buffer drops to ₹15,000",
              bufferAmount: 15000,
              riskLevel: "High",
            },
            {
              label: "Week 1",
              event: "Income ₹12,000. Buffer recovers to ₹27,000",
              bufferAmount: 27000,
              riskLevel: "Medium",
            },
            {
              label: "Month 1",
              event: "Buffer rebuilt to ₹40,000. Manageable but stretched.",
              bufferAmount: 40000,
              riskLevel: "Medium",
            },
          ],
          suggestion: "Not ideal. Your buffer will be critically low immediately.",
        },
        {
          scenario: "Wait & partial",
          summary: "Wait 2 weeks, purchase ₹20,000",
          risk: "Medium",
          timeline: [
            {
              label: "Week 1-2",
              event: "Save extra ₹5,000. Buffer grows to ₹50,000",
              bufferAmount: 50000,
              riskLevel: "Low",
            },
            {
              label: "Week 3",
              event: "Purchase ₹20,000. Buffer at ₹30,000",
              bufferAmount: 30000,
              riskLevel: "Medium",
            },
            {
              label: "Month 1",
              event: "Steady recovery. Buffer at ₹42,000",
              bufferAmount: 42000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Good balance. You save extra and keep a comfortable buffer.",
        },
        {
          scenario: "Safe compromise",
          summary: "Save ₹5,000/month for 6 months",
          risk: "Good",
          timeline: [
            {
              label: "Month 1-3",
              event: "Save ₹5,000 each month. Buffer grows.",
              bufferAmount: 60000,
              riskLevel: "Low",
            },
            {
              label: "Month 4-6",
              event: "Continue saving. Buffer reaches ₹75,000",
              bufferAmount: 75000,
              riskLevel: "Low",
            },
            {
              label: "Month 7",
              event: "Purchase ₹30,000 from buffer. Still have ₹45,000",
              bufferAmount: 45000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Excellent! No risk. Build your buffer first, then purchase worry-free.",
        },
      ],
      "week-off": [
        {
          scenario: "Do it immediately",
          summary: "Take a week off next week",
          risk: "Medium",
          timeline: [
            {
              label: "Week 1 (Off)",
              event: "No income. Buffer drops ₹8,500 (daily expenses)",
              bufferAmount: 36500,
              riskLevel: "Medium",
            },
            {
              label: "Week 2",
              event: "Return to work. Income ₹12,000. Recovered.",
              bufferAmount: 48500,
              riskLevel: "Low",
            },
            {
              label: "Week 3-4",
              event: "Buffer stabilizes. Recovered fully.",
              bufferAmount: 50000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Manageable. You can afford it, but not ideal for long-term buffer goals.",
        },
        {
          scenario: "Wait for high-earning week",
          summary: "Take off after festival surge",
          risk: "Good",
          timeline: [
            {
              label: "Week 1-2",
              event: "Work during festival. Income +40% = ₹16,800/week",
              bufferAmount: 62000,
              riskLevel: "Low",
            },
            {
              label: "Week 3 (Off)",
              event: "Rest after hard work. Buffer still strong at ₹53,500",
              bufferAmount: 53500,
              riskLevel: "Low",
            },
            {
              label: "Week 4+",
              event: "Buffer remains healthy. Fresh & stable.",
              bufferAmount: 55000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Perfect! Earn extra first, then take a guilt-free break.",
        },
        {
          scenario: "Combine with income growth",
          summary: "Add part-time gig, then take off",
          risk: "Good",
          timeline: [
            {
              label: "Week 1-4",
              event: "Add weekend freelance. Extra ₹4,000/week",
              bufferAmount: 66000,
              riskLevel: "Low",
            },
            {
              label: "Week 5 (Off)",
              event: "Take break with higher baseline income",
              bufferAmount: 57500,
              riskLevel: "Low",
            },
            {
              label: "Week 6+",
              event: "Return energized with diversified income",
              bufferAmount: 61500,
              riskLevel: "Low",
            },
          ],
          suggestion: "Best option. Build backup income while boosting buffer.",
        },
      ],
      "income-drop": [
        {
          scenario: "20% drop for 2 months",
          summary: "Income falls to ₹8,000/month",
          risk: "Medium",
          timeline: [
            {
              label: "Month 1",
              event: "Income drops to ₹8,000. Expenses ₹25,000. Deficit ₹17,000",
              bufferAmount: 28000,
              riskLevel: "High",
            },
            {
              label: "Month 2",
              event: "Buffer depleted to ₹11,000. Critical situation.",
              bufferAmount: 11000,
              riskLevel: "High",
            },
            {
              label: "Month 3",
              event: "Recovery begins. Income back to normal.",
              bufferAmount: 23000,
              riskLevel: "Medium",
            },
          ],
          suggestion: "Very risky without buffer. You would need immediate action.",
        },
        {
          scenario: "Adapt spending + diversify",
          summary: "Reduce expenses by 20%, add secondary income",
          risk: "Medium",
          timeline: [
            {
              label: "Month 1",
              event: "Cut costs to ₹20,000. Start side gig earning ₹5,000.",
              bufferAmount: 30000,
              riskLevel: "Low",
            },
            {
              label: "Month 2",
              event: "Side gig stabilizes. Total income ₹13,000. Buffer stable.",
              bufferAmount: 31000,
              riskLevel: "Low",
            },
            {
              label: "Month 3+",
              event: "New income stream secure. Buffer growing again.",
              bufferAmount: 37000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Best response. Build resilience through diversification.",
        },
        {
          scenario: "Full income recovery plan",
          summary: "Use buffer strategically, then recover",
          risk: "Good",
          timeline: [
            {
              label: "Week 1-2",
              event: "Analyze what caused drop. Implement fixes immediately.",
              bufferAmount: 40000,
              riskLevel: "Medium",
            },
            {
              label: "Week 3-4",
              event: "Changes working. Income recovering. ₹10,000/month",
              bufferAmount: 38000,
              riskLevel: "Low",
            },
            {
              label: "Month 2+",
              event: "Fully recovered. Income back to ₹12,000.",
              bufferAmount: 45000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Strategic approach. Identify root cause and fix it quickly.",
        },
      ],
      "new-gig": [
        {
          scenario: "Add 20 hrs/week of freelance work",
          summary: "Earn additional ₹4,000/month",
          risk: "Good",
          timeline: [
            {
              label: "Week 1-2",
              event: "Start freelance work. Getting established.",
              bufferAmount: 45000,
              riskLevel: "Low",
            },
            {
              label: "Week 3-4",
              event: "First income received. ₹4,000 added to buffer.",
              bufferAmount: 49000,
              riskLevel: "Low",
            },
            {
              label: "Month 2+",
              event: "Total income now ₹16,000/month. Buffer growth accelerates.",
              bufferAmount: 57000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Excellent! Diversify income and accelerate buffer growth.",
        },
        {
          scenario: "Replace primary with new gig",
          summary: "Shift to full-time remote work at ₹15,000/month",
          risk: "Risky",
          timeline: [
            {
              label: "Month 1",
              event: "Transition period. Only ₹7,500 income from new gig.",
              bufferAmount: 32500,
              riskLevel: "High",
            },
            {
              label: "Month 2",
              event: "New gig stabilizes but still ramping up.",
              bufferAmount: 30000,
              riskLevel: "High",
            },
            {
              label: "Month 3+",
              event: "Income reaches ₹15,000. Stable but not higher than before.",
              bufferAmount: 35000,
              riskLevel: "Medium",
            },
          ],
          suggestion: "Risky transition. Keep primary income while growing new one.",
        },
        {
          scenario: "Parallel setup: maintain + add",
          summary: "Keep primary job, build new income slowly",
          risk: "Good",
          timeline: [
            {
              label: "Month 1",
              event: "Spend 10 hrs/week on new gig. Earn ₹2,000.",
              bufferAmount: 47000,
              riskLevel: "Low",
            },
            {
              label: "Month 2-3",
              event: "Increase to 20 hrs/week. New income now ₹4,000/month.",
              bufferAmount: 53000,
              riskLevel: "Low",
            },
            {
              label: "Month 4+",
              event: "Total income ₹16,000. Buffer growing. Diversified & secure.",
              bufferAmount: 61000,
              riskLevel: "Low",
            },
          ],
          suggestion: "Best approach. Low risk, builds both buffer and backup income.",
        },
      ],
    }

    setResults(mockResults[selectedScenario])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Future Consequences Simulator</h1>
          <p className="text-muted-foreground">
            See what happens before you make big financial decisions. Explore scenarios and compare outcomes.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Choose a Scenario</h2>
          <div className="grid md:grid-cols-4 gap-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenario(scenario.id)
                  setResults(null)
                }}
                className={`p-4 rounded-lg border-2 text-center transition ${
                  selectedScenario === scenario.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <h3 className="font-semibold text-foreground">{scenario.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="rounded-lg border border-border bg-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Configure Your Scenario</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {selectedScenario === "purchase" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Purchase Amount (₹)</label>
                  <input
                    type="number"
                    value={config.amount}
                    onChange={(e) => setConfig({ ...config, amount: Number.parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">When?</label>
                  <select
                    value={config.timing}
                    onChange={(e) => setConfig({ ...config, timing: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="immediate">Immediately</option>
                    <option value="1week">1 Week</option>
                    <option value="2weeks">2 Weeks</option>
                    <option value="1month">1 Month</option>
                  </select>
                </div>
              </>
            )}

            {selectedScenario === "week-off" && (
              <div>
                <label className="block text-sm font-medium mb-2">How many weeks off?</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={config.weeks}
                  onChange={(e) => setConfig({ ...config, weeks: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            {selectedScenario === "new-gig" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Type of Work</label>
                  <select
                    value={config.type}
                    onChange={(e) => setConfig({ ...config, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="rideshare">Rideshare (part-time)</option>
                    <option value="freelance">Freelance</option>
                    <option value="delivery">Delivery (part-time)</option>
                    <option value="tutoring">Tutoring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hours per Week</label>
                  <input
                    type="number"
                    min="5"
                    max="40"
                    value={config.hours}
                    onChange={(e) => setConfig({ ...config, hours: Number.parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleSimulate} disabled={isLoading} className="gap-2">
              <Play className="w-4 h-4" />
              {isLoading ? "Simulating..." : "Simulate"}
            </Button>
            <Button variant="outline" onClick={() => setResults(null)} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Simulation Results</h2>
            <div className="grid gap-6">
              {results.map((result, idx) => (
                <SimulationOutcomeCard key={idx} result={result} />
              ))}
            </div>
          </div>
        )}

        {!results && !isLoading && (
          <div className="text-center py-12 rounded-lg border border-border bg-muted/40">
            <p className="text-muted-foreground">
              Configure your scenario and click "Simulate" to see possible outcomes.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
