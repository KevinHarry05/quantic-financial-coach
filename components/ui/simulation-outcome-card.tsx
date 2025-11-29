import { CheckCircle, AlertCircle, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimelineEvent {
  label: string
  event: string
  bufferAmount: number
  riskLevel: string
}

interface SimulationResultProps {
  result: {
    scenario: string
    summary: string
    risk: "Good" | "Medium" | "Risky"
    timeline: TimelineEvent[]
    suggestion: string
  }
}

export function SimulationOutcomeCard({ result }: SimulationResultProps) {
  const riskColors = {
    Good: "bg-success/10 border-success/30 text-success",
    Medium: "bg-warning/10 border-warning/30 text-warning",
    Risky: "bg-destructive/10 border-destructive/30 text-destructive",
  }

  const riskIcons = {
    Good: <CheckCircle className="w-5 h-5" />,
    Medium: <AlertCircle className="w-5 h-5" />,
    Risky: <TrendingDown className="w-5 h-5" />,
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{result.scenario}</h3>
          <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${riskColors[result.risk]}`}>
          {riskIcons[result.risk]}
          <span className="text-sm font-semibold">{result.risk}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6 space-y-3">
        {result.timeline.map((event, idx) => (
          <div key={idx} className="flex gap-4">
            {/* Timeline marker */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
              {idx < result.timeline.length - 1 && <div className="w-0.5 h-12 bg-border mt-1" />}
            </div>

            {/* Event content */}
            <div className="flex-1 pb-3">
              <p className="text-xs font-semibold text-primary mb-1">{event.label}</p>
              <p className="text-sm text-foreground mb-2">{event.event}</p>
              <div className="flex items-center justify-between bg-muted/40 rounded p-2">
                <span className="text-xs text-muted-foreground">Buffer</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">₹{event.bufferAmount.toLocaleString()}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      event.riskLevel === "Low"
                        ? "bg-success/20 text-success"
                        : event.riskLevel === "Medium"
                          ? "bg-warning/20 text-warning"
                          : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {event.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestion */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 mb-4">
        <p className="text-xs font-semibold text-primary mb-1">Coach's Suggestion:</p>
        <p className="text-sm text-foreground">{result.suggestion}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
          Send to Coach
        </Button>
        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
          Save Scenario
        </Button>
      </div>
    </div>
  )
}
