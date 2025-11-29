"use client"
import { AlertCircle, TrendingUp, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AlertCardProps {
  type: "risk" | "opportunity" | "info"
  title: string
  description: string
  action?: string
  onAction?: () => void
}

export function AlertCard({ type, title, description, action, onAction }: AlertCardProps) {
  const icons = {
    risk: <AlertCircle className="w-5 h-5" />,
    opportunity: <TrendingUp className="w-5 h-5" />,
    info: <Zap className="w-5 h-5" />,
  }

  const colors = {
    risk: "bg-destructive/10 border-destructive/30 text-destructive",
    opportunity: "bg-success/10 border-success/30 text-success",
    info: "bg-primary/10 border-primary/30 text-primary",
  }

  return (
    <div className={cn("rounded-lg border p-4", colors[type])}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icons[type]}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs mt-1 opacity-90">{description}</p>
          {action && (
            <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs" onClick={onAction}>
              {action}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
