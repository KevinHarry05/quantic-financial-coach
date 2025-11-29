export function EarningsHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const earnings = [8000, 7200, 6800, 9500, 12000, 14500, 11200]
  const maxEarnings = Math.max(...earnings)

  return (
    <div className="flex gap-2 items-end justify-between">
      {days.map((day, idx) => (
        <div key={day} className="flex-1 text-center">
          <div
            className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
            style={{
              height: `${(earnings[idx] / maxEarnings) * 120}px`,
              backgroundColor: `hsl(140, ${60 - idx * 5}%, ${45 + idx * 3}%)`,
            }}
            title={`₹${earnings[idx].toLocaleString()}`}
          />
          <p className="text-xs font-medium mt-2 text-foreground">{day}</p>
          <p className="text-xs text-muted-foreground">₹{(earnings[idx] / 1000).toFixed(1)}k</p>
        </div>
      ))}
    </div>
  )
}
