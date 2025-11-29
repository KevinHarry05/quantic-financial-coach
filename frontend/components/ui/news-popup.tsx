"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsItem {
  title: string
  source: string
  summary: string
  category: string
  url?: string | null
  image?: string | null
  publishedAt?: string | null
}

export function NewsPopup() {
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState<NewsItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch news when popup opens
    if (!isOpen) return

    setLoading(true)
    // Use MarketAux query params to return India-focused finance news by default
    // We use 'q=finance' to focus results on finance, and set `countries=in` and `filter_entities=true`.
    fetch('/api/news?limit=5&q=finance&countries=in&filter_entities=true')
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          // Display a helpful message when the server env is misconfigured
          const err = data.error || 'Failed to fetch news'
          if (err.includes('Missing NEWS_API_KEY')) {
            setError('Server is missing a news API key (set NEWS_API_KEY on the server).')
          } else {
            setError(err)
          }
          setLoading(false)
          return
        }
        setNews(data.data)
        setError(null)
        setLoading(false)
      })
      .catch((e) => {
        setError(String(e))
        setLoading(false)
      })
  }, [isOpen])

  const latestNews = news ?? [
    {
      title: "RBI cuts repo rate – EMI relief for gig workers",
      source: "RBI Official",
      summary:
        "The Reserve Bank of India has reduced the repo rate by 0.25%, which should result in lower EMI rates for gig workers and informal sector workers.",
      category: "Policy",
    },
    {
      title: "Fuel prices drop 3% – delivery earnings up ₹800/week",
      source: "Fuel News India",
      summary:
        "Petrol and diesel prices have declined by 3% this week, reducing operational costs for delivery and rideshare workers by an average of ₹800 per week.",
      category: "Fuel",
    },
    {
      title: "New PM-SYM scheme for informal workers",
      source: "Ministry of Labour",
      summary:
        "Government launches new Pradhan Mantri Scheme for informal workers with subsidized pension plans and welfare benefits.",
      category: "Policy",
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Latest Financial News</h2>
            <p className="text-sm text-muted-foreground mt-1">What's happening in Indian finance today</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* News Cards */}
        <div className="space-y-4 mb-6">
          {loading && (
            <div className="text-sm text-muted-foreground" aria-live="polite">Loading latest financial news…</div>
          )}
          {error && (
            <div className="text-sm text-destructive">Error loading news: {error}</div>
          )}
          {!loading && !error && latestNews.length === 0 && (
            <div className="text-sm text-muted-foreground">No news available right now.</div>
          )}
          {latestNews.map((news, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-border bg-muted/40 hover:border-primary/50 transition"
            >
              {news.image && (
                <div className="mb-2">
                  {/* Image from the source (if any) */}
                  <img className="w-full h-36 object-cover rounded-md" src={news.image} alt={news.title} />
                </div>
              )}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{news.title}</h3>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary whitespace-nowrap">
                  {news.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{news.source} • {news.publishedAt ? new Date(news.publishedAt).toLocaleString() : ''}</p>
              <p className="text-sm text-foreground/80">{news.summary}</p>
              {news.url && (
                <a href={news.url} target="_blank" rel="noreferrer" className="text-xs text-primary mt-2 inline-block underline">
                  Read full article
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button onClick={() => setIsOpen(false)} className="w-full bg-primary hover:bg-primary/90">
          Got it! Explore the News section
        </Button>
      </div>
    </div>
  )
}
