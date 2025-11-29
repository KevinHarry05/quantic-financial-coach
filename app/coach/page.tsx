"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { ChatMessage } from "@/components/coach/chat-message"
import { ChatInput } from "@/components/coach/chat-input"
import { MentorHeader } from "@/components/coach/mentor-header"
import { ContextPanel } from "@/components/coach/context-panel"

interface Message {
  id: string
  role: "user" | "coach"
  content: string
  recommendation?: string
  why?: string[]
  ifFollow?: string
  ifIgnore?: string
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "coach",
      content:
        "Hi Amit! I'm your financial coach. I'm here to help you understand your income patterns, make smarter spending decisions, and build financial confidence. What would you like to talk about today?",
      recommendation: "Start by understanding your baseline",
      why: [
        "Knowing your typical income and expenses is the foundation",
        "It helps predict future patterns and opportunities",
        "Creates a baseline to measure progress",
      ],
      ifFollow: "You'll have clarity on your financial position and can plan with confidence.",
      ifIgnore: "You may make decisions without understanding their real impact on your buffer and stability.",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickSuggestions = [
    "Can I afford a week off?",
    "How much should my buffer be?",
    "What's my income trend?",
    "Tips to increase earnings?",
  ]

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API call and bot response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const coachResponses: Record<string, Omit<Message, "id">> = {
      "Can I afford a week off?": {
        role: "coach",
        content: "Let me analyze your income patterns and buffer situation for a week off.",
        recommendation: "You can take a week off, but plan it strategically for low-income seasons.",
        why: [
          "Your current buffer covers ~45 days of expenses",
          "A week off typically means losing ₹8,000–₹9,000 in income",
          "Best taken after a high-earning month (like festival seasons)",
        ],
        ifFollow: "You'll maintain a healthy buffer and return refreshed with better earning focus.",
        ifIgnore: "Your buffer could drop below safe levels, creating financial stress.",
      },
      "How much should my buffer be?": {
        role: "coach",
        content: "A good emergency buffer depends on your expenses and income variability.",
        recommendation: "Target 60 days of expenses as your buffer goal.",
        why: [
          "You have high income variability, so more buffer = more security",
          "60 days = ~2 months of expenses, enough for most emergencies",
          "Gives you time to find new income if current source drops",
        ],
        ifFollow: "You'll handle emergencies without panic or taking bad loans.",
        ifIgnore: "A sudden loss of income could force you into debt or crisis mode.",
      },
      default: {
        role: "coach",
        content: "That's a great question! Based on your financial profile, here's what I think...",
        recommendation: "Break this into smaller action steps.",
        why: [
          "Clearer action steps are easier to follow",
          "Small wins build momentum and confidence",
          "Progress is measurable and motivating",
        ],
        ifFollow: "You'll make steady progress and feel in control of your finances.",
        ifIgnore: "Big goals can feel overwhelming and you might not take action.",
      },
    }

    const response = coachResponses[text] || coachResponses.default

    const coachMessage: Message = {
      id: (Date.now() + 1).toString(),
      ...response,
    }

    setMessages((prev) => [...prev, coachMessage])
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Mentor Header */}
          <MentorHeader />

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex justify-center items-center py-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 sm:px-6 lg:px-8 py-4 border-t border-border bg-muted/40">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Quick questions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-left text-sm px-3 py-2 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="border-t border-border bg-card px-4 sm:px-6 lg:px-8 py-4">
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={() => handleSendMessage(inputValue)}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Context Panel - Sidebar */}
        <ContextPanel />
      </div>
    </div>
  )
}
