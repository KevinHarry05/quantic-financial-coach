"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface Expert {
  id: string
  name: string
  title: string
  expertise: string
  bio: string
  specialties: string[]
  photo: string
}

interface ChatSession {
  expertId: string
  expertName: string
  isOpen: boolean
}

export default function MentorshipPage() {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<Array<{ role: "user" | "expert"; text: string }>>([])

  const experts: Expert[] = [
    {
      id: "1",
      name: "Dr. Ravi Sharma",
      title: "RBI Economist",
      expertise: "Monetary Policy & Economic Trends",
      bio: "Former RBI advisor with 20+ years in economic policy. Specializes in irregular income patterns.",
      specialties: ["Interest Rates", "Economic Trends", "Policy Impact", "Buffer Planning"],
      photo: "👨‍💼",
    },
    {
      id: "2",
      name: "Priya Mehta",
      title: "Gig Finance Specialist",
      expertise: "Gig Worker Income Optimization",
      bio: "Works with 10,000+ gig workers. Expert in earnings optimization and seasonal planning.",
      specialties: ["Income Growth", "Seasonal Planning", "Earnings Optimization", "Surge Timing"],
      photo: "👩‍💼",
    },
    {
      id: "3",
      name: "Anil Gupta",
      title: "Debt Restructuring Expert",
      expertise: "Loan & EMI Management",
      bio: "Helped thousands restructure debt. Specializes in EMI optimization for irregular earners.",
      specialties: ["EMI Planning", "Loan Restructuring", "Interest Negotiation", "Debt Freedom"],
      photo: "👨‍💻",
    },
    {
      id: "4",
      name: "Meera Singh",
      title: "Investment Coach",
      expertise: "Investment & Wealth Building",
      bio: "Demystifies investing for everyday earners. Builds investment portfolios for small budgets.",
      specialties: ["Mutual Funds", "SIPs", "Savings Plans", "Long-term Wealth"],
      photo: "👩‍🏫",
    },
    {
      id: "5",
      name: "Vikram Rao",
      title: "Risk Management",
      expertise: "Financial Risk & Insurance",
      bio: "Expert in identifying financial risks. Recommends insurance & safety nets for irregular earners.",
      specialties: ["Risk Assessment", "Insurance", "Emergency Fund", "Crisis Planning"],
      photo: "🧑‍💼",
    },
    {
      id: "6",
      name: "Sunita Desai",
      title: "Financial Literacy Educator",
      expertise: "Money Basics & Financial Education",
      bio: "Makes finance simple. Breaks down complex concepts for gig workers and informal sector.",
      specialties: ["Money Basics", "Financial Jargon", "Budgeting", "Financial Planning"],
      photo: "👩‍🏫",
    },
  ]

  const handleTextNow = (expert: Expert) => {
    setChatSession({
      expertId: expert.id,
      expertName: expert.name,
      isOpen: true,
    })
    setMessages([
      {
        role: "expert",
        text: `Hi! I'm ${expert.name}. ${expert.expertise}. How can I help you today?`,
      },
    ])
  }

  const handleSendMessage = (text: string) => {
    if (!chatSession || !text.trim()) return

    setMessages((prev) => [...prev, { role: "user", text }])

    // Simulate expert response
    setTimeout(() => {
      const responses = {
        "1": "That's a great question about your financial planning. Based on your recent income data...",
        "2": "I've analyzed your earning patterns. Here's what I recommend for maximizing your income...",
        "3": "Your EMI situation looks manageable. Let me suggest a restructuring plan...",
        "4": "For wealth building with irregular income, SIPs are your best friend...",
        "5": "Your buffer is critical. Let me help you create a comprehensive risk plan...",
        "6": "Let me explain this concept in simple terms...",
      }
      const response =
        responses[chatSession.expertId as keyof typeof responses] || "Thanks for that. Here's what I think..."
      setMessages((prev) => [...prev, { role: "expert", text: response }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Financial Mentorship</h1>
          <p className="text-muted-foreground">
            Connect with financial experts who understand your challenges. Get personalized advice tailored to your
            situation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card
              key={expert.id}
              className="flex flex-col p-6 hover:shadow-lg transition border-border hover:border-primary/50"
            >
              <div className="text-5xl mb-4">{expert.photo}</div>
              <h3 className="font-bold text-lg text-foreground mb-1">{expert.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{expert.title}</p>
              <p className="text-xs text-muted-foreground mb-4 flex-1">{expert.bio}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-foreground mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {expert.specialties.map((spec) => (
                    <span key={spec} className="inline-block text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <Button onClick={() => handleTextNow(expert)} className="w-full gap-2 bg-primary hover:bg-primary/90">
                <MessageCircle className="w-4 h-4" />
                Text Now
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {chatSession?.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full h-96 flex flex-col shadow-xl">
            {/* Chat Header */}
            <div className="border-b border-border p-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-foreground">{chatSession.expertName}</h2>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
              <button onClick={() => setChatSession(null)} className="p-2 hover:bg-muted rounded-lg transition">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    handleSendMessage(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                onClick={(e) => {
                  const input = (e.currentTarget.parentElement?.querySelector("input") as HTMLInputElement) || {
                    value: "",
                  }
                  handleSendMessage(input.value)
                  input.value = ""
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
