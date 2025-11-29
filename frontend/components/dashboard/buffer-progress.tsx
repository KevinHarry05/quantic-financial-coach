export function BufferProgress() {
  const currentBuffer = 45000
  const targetBuffer = 60000
  const expenses = 25000
  const daysCovered = (currentBuffer / expenses).toFixed(1)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-muted-foreground">Current Buffer</p>
          <p className="text-2xl font-bold text-primary">₹{currentBuffer.toLocaleString()}</p>
        </div>
        <p className="text-xs text-success font-medium">↑ ₹5,000 this month</p>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>Progress to 60 days of expenses</span>
        <span>{Math.round((currentBuffer / targetBuffer) * 100)}%</span>
      </div>

      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-success rounded-full transition-all"
          style={{ width: `${(currentBuffer / targetBuffer) * 100}%` }}
        />
      </div>

      <div className="pt-2 space-y-2 text-xs">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">{daysCovered} days</span> of expenses covered
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">₹{(targetBuffer - currentBuffer).toLocaleString()}</span> more
          to goal
        </p>
      </div>
    </div>
  )
}
