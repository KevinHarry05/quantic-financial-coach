"use client"

import { useState, useEffect } from "react"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { NewsCard } from "@/components/ui/news-card"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsItem {
  id: string
  title: string
  source: string
  summary: string
  category: "Fuel" | "Policy" | "Market" | "Tech" | "Economy"
  date: string
  impact: string
  action: string
  image?: string
}

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/news?q=finance&countries=in&filter_entities=true&limit=12')
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.error || 'Failed to fetch news')
          setLoading(false)
          return
        }
        // Convert the normalized data to our page's NewsItem format
        const converted = (data.data || []).map((a: any, idx: number) => ({
          id: `news-${idx}`,
          title: a.title || '',
          source: a.source || '',
          summary: a.summary || '',
          category: a.category || 'Market',
          date: a.publishedAt ? new Date(a.publishedAt).toLocaleString() : 'Just now',
          impact: '',
          action: '',
          image: a.image || null,
          url: a.url || null,
        }))
        setNewsItems(converted)
        setLoading(false)
      })
      .catch((e) => {
        setError(String(e))
        setLoading(false)
      })
  }, [])

  // If we fetched news, use that list; otherwise fall back to defaults.
  const fallbackNews: NewsItem[] = [
    {
      id: "1",
      title: "RBI cuts repo rate – EMI relief for gig workers",
      source: "RBI Official",
      summary:
        "The Reserve Bank of India has reduced the repo rate by 0.25%, signaling monetary easing. This should translate to lower home loan and vehicle EMI rates.",
      category: "Policy",
      date: "Today",
      impact:
        "Your EMI payments could decrease by ₹200-500 per month depending on your loan amount. Refinance if you have floating rate loans.",
      action: "Check with your bank about rate revisions and refinancing options.",
    },
    {
      id: "2",
      title: "Fuel prices drop 3% – delivery earnings up ₹800/week",
      source: "Fuel News India",
      summary:
        "Petrol and diesel prices have declined by 3% this week following global crude price stabilization, benefiting delivery and rideshare workers.",
      category: "Fuel",
      date: "2 days ago",
      impact:
        "Your operational costs will reduce by approximately 10-15%. This means better margins on every trip or delivery order.",
      action: "Lock in higher profits this week before fuel prices potentially rise again.",
    },
    {
      id: "3",
      title: "New PM-SYM scheme for informal workers launched",
      source: "Ministry of Labour",
      summary:
        "Government introduces Pradhan Mantri Scheme for informal sector with subsidized pension contributions (₹60/month) and welfare benefits.",
      category: "Policy",
      date: "1 week ago",
      impact:
        "You can now secure a pension for just ₹60/month. This is excellent for long-term financial security and retirement planning.",
      action: "Register for PM-SYM and secure your pension with minimal monthly commitment.",
    },
    {
      id: "4",
      title: "Digital payment adoption reaches 65% in India",
      source: "NITI Aayog Report",
      summary:
        "India's digital payment adoption has crossed 65%, with UPI accounting for 80% of all transactions, reducing cash dependency significantly.",
      category: "Tech",
      date: "3 days ago",
      impact:
        "More customers prefer digital payments, reducing your cash collection risks. Accept all payment modes to maximize orders.",
      action: "Enable UPI, debit card, and contactless payments across all your income channels.",
    },
    {
      id: "5",
      title: "Sensex rallies on RBI policy signals",
      source: "BSE India",
      summary:
        "The BSE Sensex jumped 2.3% following RBI's monetary policy announcement, driven by banking and auto stocks benefiting from rate cuts.",
      category: "Market",
      date: "1 day ago",
      impact:
        "If you have mutual funds or stocks, this is positive. Defensive stocks are performing well, but growth stocks showing strength.",
      action: "Review your investment portfolio and consider SIPs in balanced funds.",
    },
    {
      id: "6",
      title: "Festival season earnings spike: 40-50% higher for gig workers",
      source: "Pixil Insights",
      summary:
        "Historical data shows 40-50% earnings increase for rideshare, delivery, and gig workers during upcoming festival season (next 2 weeks).",
      category: "Economy",
      date: "Today",
      impact:
        "This is your best opportunity to earn extra and boost your emergency buffer. Plan to work maximum hours during peak demand.",
      action: "Schedule extra shifts, prepare your vehicle/equipment, and maximize earnings during the surge.",
    },
  ]

  const displayedNews = newsItems.length > 0 ? newsItems : fallbackNews

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* News List - Left Column */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-foreground mb-2">Financial News & Updates</h1>
            <p className="text-muted-foreground mb-8">Contextual news for your financial decisions</p>

            <div className="space-y-4">
              {loading && <div className="text-sm text-muted-foreground">Loading news…</div>}
              {error && <div className="text-sm text-destructive">Error: {error}</div>}
              {displayedNews.map((item, idx) => (
                <div key={item.id}>
                  <NewsCard
                    item={item}
                    isSelected={selectedNews?.id === item.id}
                    onClick={() => setSelectedNews(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Impact Panel - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {selectedNews ? (
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-bold text-foreground mb-4">Impact on You</h3>

                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-primary mb-3">What this means for you:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedNews.impact}</p>
                  </div>

                  <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-2">Suggested Action:</p>
                    <p className="text-xs text-foreground">{selectedNews.action}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      Ask Mentorship
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-muted/40 p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Select a news item to see how it impacts your finances
                  </p>
                </div>
              )}

              {/* Category Filter */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h4 className="font-semibold text-foreground mb-3">Categories</h4>
                <div className="space-y-2">
                  {["Fuel", "Policy", "Market", "Tech", "Economy"].map((cat) => (
                    <button
                      key={cat}
                      className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:bg-muted transition text-muted-foreground hover:text-foreground"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
