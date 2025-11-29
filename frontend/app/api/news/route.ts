import { NextResponse } from 'next/server'

// Simple in-memory cache for dev usage only. For production, use a proper cache store (Redis or CDN)
let cache: any = null
let lastFetch = 0
const TTL = 60 * 1000 // 1 minute

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') ?? 'finance'
  const limit = parseInt(searchParams.get('limit') ?? '5')

  // Serve cached result if recent
  if (cache && Date.now() - lastFetch < TTL) {
    return NextResponse.json({ ok: true, fromCache: true, data: cache })
  }

  // NEWS_API_URL and NEWS_API_KEY should be provided in `.env.local` or environment
  // Default to MarketAux API (as requested) — but allow override via env variable.
  const NEWS_API_URL = process.env.NEWS_API_URL || 'https://api.marketaux.com/v1/news/all'
  const NEWS_API_KEY = process.env.NEWS_API_KEY

  if (!NEWS_API_KEY) {
    return NextResponse.json({ ok: false, error: 'Missing NEWS_API_KEY server env variable' }, { status: 500 })
  }

  try {
    // Build URL for NewsAPI.org by default, but allow a fully custom URL via NEWS_API_URL.
    const url = new URL(NEWS_API_URL)
    // If the configured URL is the News API default, use known params
    if (url.hostname.includes('newsapi.org')) {
      url.searchParams.set('apiKey', NEWS_API_KEY)
      url.searchParams.set('q', query)
      url.searchParams.set('category', 'business')
      url.searchParams.set('language', 'en')
      url.searchParams.set('pageSize', String(limit))
      // If the user set region/country or other params via env, keep them
      if (process.env.NEWS_API_COUNTRY) {
        url.searchParams.set('country', process.env.NEWS_API_COUNTRY)
      }
    } else if (url.hostname.includes('marketaux.com')) {
      // MarketAux: API expects api_token, countries, filter_entities, language, limit
      url.searchParams.set('api_token', NEWS_API_KEY)
      url.searchParams.set('q', query)
      // Allow client to pass `countries` or fallback to env variable
      const countries = searchParams.get('countries') || process.env.NEWS_API_COUNTRY || 'in'
      url.searchParams.set('countries', countries)
      url.searchParams.set('filter_entities', process.env.NEWS_API_FILTER_ENTITIES ?? 'true')
      url.searchParams.set('language', process.env.NEWS_API_LANGUAGE ?? 'en')
      url.searchParams.set('limit', String(limit))
    } else {
      // Otherwise assume the custom endpoint expects `apiKey` and `q` params
      url.searchParams.set('apiKey', NEWS_API_KEY)
      url.searchParams.set('q', query)
    }

    const res = await fetch(url.toString(), {
      method: 'GET',
    })

    if (!res.ok) {
      const txt = await res.text()
      return NextResponse.json({ ok: false, error: `News provider returned ${res.status}: ${txt}` }, { status: 502 })
    }

    const json = await res.json()

    // Normalize the result to a small schema the client expects
    let items: Array<any> = []

    if (json.articles && Array.isArray(json.articles)) {
      items = json.articles.slice(0, limit).map((a: any) => ({
        title: a.title || '',
        source: (a.source && a.source.name) || a.source || '',
        summary: a.description || a.content || '',
        category: a.category || 'Finance',
        url: a.url || null,
        image: a.urlToImage || null,
        publishedAt: a.publishedAt || null,
      }))
    } else if (json.data && Array.isArray(json.data)) {
      // Another common format
      items = json.data.slice(0, limit).map((a: any) => ({
        title: a.title || a.headline || '',
        source: (a.source && a.source.name) || a.source || '',
        summary: a.summary || a.description || a.description || '',
        category: a.category || 'Finance',
        url: a.url || a.link || null,
        image: a.image || a.image_url || null,
        publishedAt: a.publishedAt || a.published_at || a.pubDate || null,
      }))
    }

    cache = items
    lastFetch = Date.now()

    return NextResponse.json({ ok: true, fromCache: false, data: items })
  } catch (err) {
    console.error('news api fetch error', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
