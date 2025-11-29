import { Brain } from "lucide-react"

export function MentorHeader() {
  return (
    <div className="border-b border-border bg-card px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-semibold text-foreground">Your Financial Coach</h1>
          <p className="text-xs text-muted-foreground">Personalized guidance for your financial journey</p>
        </div>
      </div>
    </div>
  )
}
