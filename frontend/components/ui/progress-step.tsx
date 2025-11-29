import { cn } from "@/lib/utils"

interface ProgressStepProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function ProgressStep({ steps, currentStep, className }: ProgressStepProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                index < currentStep
                  ? "bg-success text-success-foreground"
                  : index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span
              className={cn(
                "text-xs mt-2 text-center",
                index <= currentStep ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-full h-1 mx-2 mt-5 transition-colors",
                  index < currentStep ? "bg-success" : "bg-border",
                )}
                style={{ margin: "20px 8px 0" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
