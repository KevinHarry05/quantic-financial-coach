import { CheckCircle } from "lucide-react"

interface MessageProps {
  message: {
    role: "user" | "coach"
    content: string
    recommendation?: string
    why?: string[]
    ifFollow?: string
    ifIgnore?: string
  }
}

export function ChatMessage({ message }: MessageProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs sm:max-w-md rounded-2xl rounded-tr-none bg-primary text-primary-foreground px-4 py-3">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl space-y-4">
        {/* Main Response */}
        <div className="rounded-2xl rounded-tl-none bg-muted/40 border border-border px-4 py-3">
          <p className="text-sm text-foreground">{message.content}</p>
        </div>

        {/* Structured Response */}
        {message.recommendation && (
          <div className="space-y-3 ml-4">
            {/* Recommendation */}
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <h4 className="font-semibold text-sm text-success">Recommendation</h4>
              </div>
              <p className="text-sm text-foreground ml-6">{message.recommendation}</p>
            </div>

            {/* Why */}
            {message.why && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h4 className="font-semibold text-sm text-primary mb-2">Why this matters:</h4>
                <ul className="space-y-2">
                  {message.why.map((point, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-primary font-medium">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Consequences */}
            <div className="grid sm:grid-cols-2 gap-3">
              {message.ifFollow && (
                <div className="rounded-lg border border-success/20 bg-success/5 p-3">
                  <p className="text-xs font-semibold text-success mb-1">If you follow this:</p>
                  <p className="text-xs text-foreground">{message.ifFollow}</p>
                </div>
              )}
              {message.ifIgnore && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">If you ignore this:</p>
                  <p className="text-xs text-foreground">{message.ifIgnore}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
