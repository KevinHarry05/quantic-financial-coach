"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, AlertCircle } from "lucide-react"

interface NewsCardProps {
  item: {
    id: string
    title: string
    source: string
    summary: string
    category: string
    date: string
    image?: string | null
    url?: string | null
  }
  isSelected: boolean
  onClick: () => void
}

export function NewsCard({ item, isSelected, onClick }: NewsCardProps) {
  const categoryIcons: Record<string, JSX.Element> = {
    Fuel: <Zap className="w-4 h-4" />,
    Policy: <AlertCircle className="w-4 h-4" />,
    Market: <TrendingUp className="w-4 h-4" />,
    Tech: <Zap className="w-4 h-4" />,
    Economy: <TrendingUp className="w-4 h-4" />,
  }

  const categoryColors: Record<string, string> = {
    Fuel: "bg-warning/10 text-warning border-warning/20",
    Policy: "bg-primary/10 text-primary border-primary/20",
    Market: "bg-success/10 text-success border-success/20",
    Tech: "bg-primary/10 text-primary border-primary/20",
    Economy: "bg-primary/10 text-primary border-primary/20",
    // Default fallback
    default: "bg-primary/10 text-primary border-primary/20",
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-4 cursor-pointer transition ${
        isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {item.source} • {item.date}
          </p>
        </div>
        <Badge
          className={`${categoryColors[item.category] ?? categoryColors.default} border flex items-center gap-1`}
        >
          {categoryIcons[item.category] ?? categoryIcons.default}
          {item.category}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
    </div>
  )
}
