import { StatCard } from "@/components/ui/stat-card"

export function ProgressMetrics() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard label="Buffer Change" value={5000} unit="₹" trend={12} trendLabel="increase" />
      <StatCard label="Days to Crisis" value="14" trend={-2} trendLabel="vs last month" />
      <StatCard label="Learning Modules" value="3" unit="completed" trend={1} trendLabel="new" />
      <StatCard label="Income Growth" value="8.5" unit="%" trend={3} trendLabel="vs avg" />
    </div>
  )
}
