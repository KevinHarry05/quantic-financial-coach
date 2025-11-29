# Pixil Financial Coach — Frontend

This repository is a Next.js 16 (app router) TypeScript project with Tailwind CSS and some small client-side components.

## Running locally

1. Install dependencies

```cmd
pnpm install
```

2. Create a `.env.local` based on `.env.local.example` and add the `NEWS_API_KEY` for your chosen news provider (e.g., NewsAPI.org):

Important: This project targets Node 18. Netlify and other CI systems should use Node 18 for builds; we've included an `.nvmrc`.

```
NEWS_API_KEY=your_api_key_here
NEWS_API_URL=https://newsapi.org/v2/top-headlines
NEWS_API_COUNTRY=in
```

3. Start dev server

```cmd
pnpm dev
```

Open http://localhost:3000 (or the port that Next selects).

## News integration

- There's a server-side API route: `/api/news` which proxies requests to the configured news provider.
- Use `NEWS_API_URL` and `NEWS_API_KEY` environment variables to configure the provider.
- The `NewsPopup` UI fetches data client-side from `/api/news` (no API key stored in the client).
 - The default configuration uses MarketAux (https://marketaux.com). To query MarketAux specifically, the News API uses query parameters like `q=finance`, `countries=in`, `filter_entities=true`, and `limit=5`.
	 Example call: `/api/news?q=finance&countries=in&filter_entities=true&limit=5`.

## Notes

- This repo includes a Chatbase loader that dynamically injects Chatbase embed script on the client.
- The app uses `suppressHydrationWarning` to reduce hydration console noise during dev (e.g. browser extensions).
- Animations and route transitions are implemented using CSS and a small client component. To respect accessibility, animations are disabled if `prefers-reduced-motion` is set.

## Optional

- If you plan to deploy this app, set environment variables directly in your deployment provider (Vercel, Netlify, etc.) and **do not** commit `.env.local` to source control.
- Replace placeholder course images in `public/` with your own assets for production use.

### Netlify
- We've added a `netlify.toml` to help Netlify runs the correct build. It runs `pnpm install && pnpm build` and publishes `.next`.
 - `netlify.toml` also includes a `dev` command for local testing.

## Testing your MarketAux integration

1. Copy `.env.local.example` to `.env.local` and set `NEWS_API_KEY` to your MarketAux API token.
2. Start the dev server:
```cmd
pnpm dev
```
3. Test the API route locally (replace port if Next selects a different one):
```cmd
curl "http://127.0.0.1:3000/api/news?q=finance&countries=in&filter_entities=true&limit=3"
```
This returns JSON with normalized `data` articles for the UI.

If you'd like, I can also add a small caching layer using Redis for the news route, or add a News section page that lists more articles and pagination.
