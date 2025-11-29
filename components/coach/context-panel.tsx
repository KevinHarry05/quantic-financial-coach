import { AlertCircle, TrendingUp } from "lucide-react"

export function ContextPanel() {
  return (
    <div className="hidden lg:flex lg:w-80 border-l border-border bg-muted/40 flex-col">
      <div className="p-6 space-y-6">
        {/* Your Stats */}
        <div>
          <h3 className="font-bold text-foreground mb-4">Your Financial Stats</h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-card border border-border p-3">
              <p className="text-xs text-muted-foreground">Current Buffer</p>
              <p className="text-lg font-bold text-primary">₹45,000</p>
              <p className="text-xs text-success mt-1">+₹5,000 this month</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <p className="text-xs text-muted-foreground">Next EMI Due</p>
              <p className="text-lg font-bold text-foreground">₹8,500</p>
              <p className="text-xs text-muted-foreground mt-1">in 4 days</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <p className="text-xs text-muted-foreground">Stability Score</p>
              <p className="text-lg font-bold text-foreground">58/100</p>
              <p className="text-xs text-warning mt-1">Medium risk</p>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <h3 className="font-bold text-foreground mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-destructive">Acceptance Rate Low</p>
                  <p className="text-xs text-foreground mt-1">Your acceptance rate dropped to 82%. Aim for 85%+.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-success/5 border border-success/20 p-3">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-success">Weekend Surge</p>
                  <p className="text-xs text-foreground mt-1">35% higher earnings expected this weekend.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
