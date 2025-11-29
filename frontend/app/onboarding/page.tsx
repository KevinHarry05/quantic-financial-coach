"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { ProgressStep } from "@/components/ui/progress-step"
import { Button } from "@/components/ui/button"
import LoadingOverlay from "@/components/ui/loading-overlay"
import { ArrowRight, ArrowLeft } from "lucide-react"

const steps = ["Profile", "Income", "Expenses", "Quiz", "Goals"]

interface AssessmentData {
  // Profile
  name: string
  ageRange: string
  city: string
  occupationType: string

  // Income
  primaryIncome: string
  monthlyRange: string
  incomeVariability: string

  // Expenses
  rent: string
  emi: string
  loans: string
  emergencyBuffer: string
  bufferAmount: string

  // Quiz answers
  quizAnswers: (string | null)[]

  // Goals
  goals: string[]
}

export default function OnboardingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<AssessmentData>({
    name: "",
    ageRange: "",
    city: "",
    occupationType: "",
    primaryIncome: "",
    monthlyRange: "",
    incomeVariability: "",
    rent: "",
    emi: "",
    loans: "",
    emergencyBuffer: "",
    bufferAmount: "",
    quizAnswers: [null, null, null, null, null, null],
    goals: [],
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quanticOnboarding", JSON.stringify(data))
      // Flag so dashboard can show today's financial news once right after assessment
      localStorage.setItem("showDashboardNewsOnce_v1", "true")
    }
    // Mock API call
    console.log("Assessment Data:", data)
    setIsSubmitting(true)
    // Small simulated delay for UX to show a loading screen
    await new Promise((r) => setTimeout(r, 1200))
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return data.name && data.ageRange && data.city && data.occupationType
      case 1:
        return data.primaryIncome && data.monthlyRange && data.incomeVariability
      case 2:
        return data.rent && data.emi && data.loans && (data.emergencyBuffer === "no" || data.bufferAmount)
      case 3:
        return data.quizAnswers.every((answer) => answer !== null)
      case 4:
        return data.goals.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      {isSubmitting && <LoadingOverlay />}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <ProgressStep steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          {/* Step 1: Profile */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Let's get to know you</h2>
                <p className="text-muted-foreground">Tell us about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Age Range</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={data.ageRange}
                      onChange={(e) => setData({ ...data, ageRange: e.target.value })}
                    >
                      <option value="">Select range</option>
                      <option value="18-25">18–25</option>
                      <option value="26-35">26–35</option>
                      <option value="36-50">36–50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Your city"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Occupation Type</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.occupationType}
                    onChange={(e) => setData({ ...data, occupationType: e.target.value })}
                  >
                    <option value="">Select type</option>
                    <option value="gig">Gig worker (rideshare, delivery, etc.)</option>
                    <option value="informal">Informal sector (shop, trade, etc.)</option>
                    <option value="freelance">Freelancer</option>
                    <option value="salaried">Salaried employee</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Income */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Income</h2>
                <p className="text-muted-foreground">Help us understand your earning patterns</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Income Source</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.primaryIncome}
                    onChange={(e) => setData({ ...data, primaryIncome: e.target.value })}
                  >
                    <option value="">Select source</option>
                    <option value="rideshare">Rideshare (Uber, Lyft, etc.)</option>
                    <option value="delivery">Food/package delivery</option>
                    <option value="freelance">Freelance work</option>
                    <option value="shopowner">Shop owner</option>
                    <option value="trading">Trading/commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Typical Monthly Income Range</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.monthlyRange}
                    onChange={(e) => setData({ ...data, monthlyRange: e.target.value })}
                  >
                    <option value="">Select range</option>
                    <option value="5000-15000">₹5,000–₹15,000</option>
                    <option value="15000-30000">₹15,000–₹30,000</option>
                    <option value="30000-50000">₹30,000–₹50,000</option>
                    <option value="50000+">₹50,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Income Variability</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["low", "medium", "high"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setData({ ...data, incomeVariability: option })}
                        className={`p-3 rounded-lg border-2 transition font-medium ${
                          data.incomeVariability === option
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Expenses & Obligations */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Expenses & Obligations</h2>
                <p className="text-muted-foreground">This helps us understand your financial commitments</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Rent / Housing</label>
                  <input
                    type="text"
                    placeholder="₹0"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.rent}
                    onChange={(e) => setData({ ...data, rent: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">EMI / Loan Payments</label>
                  <input
                    type="text"
                    placeholder="₹0"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.emi}
                    onChange={(e) => setData({ ...data, emi: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Other Major Loans / Debts</label>
                  <input
                    type="text"
                    placeholder="₹0"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={data.loans}
                    onChange={(e) => setData({ ...data, loans: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Do you have an emergency buffer?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["yes", "no"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setData({ ...data, emergencyBuffer: option })}
                        className={`p-3 rounded-lg border-2 transition font-medium ${
                          data.emergencyBuffer === option
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {data.emergencyBuffer === "yes" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Buffer Amount</label>
                    <input
                      type="text"
                      placeholder="₹0"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={data.bufferAmount}
                      onChange={(e) => setData({ ...data, bufferAmount: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Financial Literacy Quiz */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Financial Basics Quiz</h2>
                <p className="text-muted-foreground">Help us understand your financial knowledge</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    q: "What does EMI stand for?",
                    options: [
                      "Equated Monthly Income",
                      "Equated Monthly Instalment",
                      "Emergency Monthly Interest",
                      "Employee Mutual Insurance",
                    ],
                  },
                  {
                    q: "What is compound interest?",
                    options: [
                      "Interest paid only on the original amount",
                      "Interest on interest plus principal",
                      "Interest that never changes",
                      "Interest paid only once a year",
                    ],
                  },
                  {
                    q: "How long should your emergency buffer ideally cover?",
                    options: ["1 week", "1 month", "3-6 months", "2 years"],
                  },
                  {
                    q: "What is the best way to build wealth over time?",
                    options: [
                      "Keep money in cash",
                      "Invest regularly and diversify",
                      "Only save lump sums",
                      "Avoid all investments",
                    ],
                  },
                  {
                    q: 'What does it mean to "diversify" income?',
                    options: [
                      "Put all eggs in one basket",
                      "Have multiple income sources",
                      "Only focus on one job",
                      "Change jobs frequently",
                    ],
                  },
                  {
                    q: "What is the most important first step in financial planning?",
                    options: [
                      "Buy expensive investments",
                      "Track and understand spending",
                      "Take loans for growth",
                      "Ignore budgeting",
                    ],
                  },
                ].map((question, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium mb-3">{question.q}</label>
                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const newAnswers = [...data.quizAnswers]
                            newAnswers[idx] = option
                            setData({ ...data, quizAnswers: newAnswers })
                          }}
                          className={`w-full p-3 rounded-lg border-2 text-left transition ${
                            data.quizAnswers[idx] === option
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Financial Goals</h2>
                <p className="text-muted-foreground">What matters most to you? (Select at least one)</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "stability", label: "Income Stability", icon: "📊" },
                  { id: "debt-free", label: "Become Debt-Free", icon: "💳" },
                  { id: "purchase", label: "Make a Major Purchase", icon: "🏠" },
                  { id: "wealth", label: "Build Long-Term Wealth", icon: "💎" },
                  { id: "education", label: "Fund Education", icon: "📚" },
                  { id: "security", label: "Financial Security", icon: "🛡️" },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      const newGoals = data.goals.includes(goal.id)
                        ? data.goals.filter((g) => g !== goal.id)
                        : [...data.goals, goal.id]
                      setData({ ...data, goals: newGoals })
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition flex items-center gap-3 ${
                      data.goals.includes(goal.id)
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={data.goals.includes(goal.id)}
                      readOnly
                      className="w-5 h-5 rounded accent-primary"
                    />
                    <span className="flex-1 font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>

            <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Summary Sidebar for larger screens */}
        <div className="hidden lg:block absolute right-8 top-32 w-72 space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Your Profile</h3>
            <div className="space-y-3 text-sm">
              {data.name && (
                <div>
                  <span className="text-muted-foreground">Name:</span> {data.name}
                </div>
              )}
              {data.ageRange && (
                <div>
                  <span className="text-muted-foreground">Age:</span> {data.ageRange}
                </div>
              )}
              {data.occupationType && (
                <div>
                  <span className="text-muted-foreground">Work:</span> {data.occupationType}
                </div>
              )}
              {data.monthlyRange && (
                <div>
                  <span className="text-muted-foreground">Income:</span> {data.monthlyRange}
                </div>
              )}
              {data.incomeVariability && (
                <div>
                  <span className="text-muted-foreground">Variability:</span> {data.incomeVariability}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
