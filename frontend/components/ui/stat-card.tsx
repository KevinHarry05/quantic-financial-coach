import type React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ label, value, unit, trend, trendLabel, icon, className }: StatCardProps) {
  const isTrendPositive = trend && trend > 0

  return (
    <div className={cn("card-animate rounded-lg border border-border bg-card p-4", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend !== undefined && (
            <div className={cn("text-xs font-medium mt-2", isTrendPositive ? "text-success" : "text-destructive")}>
              {isTrendPositive ? "↑" : "↓"} {Math.abs(trend)}% {trendLabel}
            </div>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  )
}
