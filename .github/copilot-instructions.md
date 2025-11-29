# Copilot Instructions — Quantic Financial Coach (Frontend)

Goal: Provide concise, actionable instructions so an AI coding agent can make effective edits to the repository and be productive quickly.

## Big picture
- This is a Next.js 16 app-router TypeScript frontend using Tailwind CSS (two global styles: `app/globals.css` and `styles/globals.css`).
- The UI is componentized under `components/` (layout, coach, dashboard, ui, etc.).
- Pages live under `app/` with the app router (client/server components). `app/layout.tsx` contains global layout and loads the Chatbase client widget.
- API endpoints (server-side) are under `app/api/` (e.g. `app/api/news/route.ts` proxies MarketAux/NewsAPI).

## Project-specific conventions
- Client components must include `"use client"` at the top (see `components/ui/*` and `app/*.tsx` where needed).
- Global CSS and CSS utilities live in `app/globals.css`; Tailwind is used via PostCSS and `@tailwindcss/postcss` in `postcss.config.mjs`.
- Many components use shadcn/ui patterns (e.g., `components/ui/...` + cva-based `buttonVariants`) and `lucide-react` icons.
- Local state & caching:
  - Onboarding stores values in `localStorage` under `quanticOnboarding`; the dashboard reads it.
  - News API uses a simple in-memory cache (`app/api/news/route.ts`) — for production, prefer Redis or CDN.
- External scripts are loaded client-side only — e.g., Chatbase (`components/chatbot/chatbase-loader.tsx`) using a safe `-window`-guard and a proxy queue.

## How to run & debug locally
- Install: `pnpm install` (project includes `pnpm-lock.yaml`).
- Dev server: `pnpm dev` (Next selects a free port if 3000 is used; Next 16 uses Turbopack by default).
- Build: `pnpm build` then `pnpm start`.
- Troubleshooting:
  - If you need webpack dev instead of Turbopack: `pnpm dev -- --webpack` or edit `package.json` to include `next dev --webpack`.
  - If Next says multiple lockfiles found, `next.config.mjs` includes `turbopack.root` to silence that warning.
  - Node fetch to `http://127.0.0.1:PORT` (use `127.0.0.1` to avoid IPv6 ::1 connection issues) when testing server endpoints.
- TypeScript changes: Next may auto-update tsconfig for dev. Add `.d.ts` files to `include` in `tsconfig.json` if you create global declarations.

## Important file references (examples)
- `app/layout.tsx` — Root document layout; `metadata` vs `viewport` export difference in Next 16; uses `suppressHydrationWarning` to reduce dev noise.
- `next.config.mjs` — ESM config; `turbopack.root` is set; `webpack` isn't removed, so we intentionally keep a small tweak (`cache=false`) for deterministic builds.
- `app/api/news/route.ts` — Server proxy to MarketAux/NewsAPI, normalizes responses and enforces `NEWS_API_KEY`.
- `components/ui/news-popup.tsx` & `app/news/page.tsx` — Client-side news UI which fetches from `/api/news`.
- `components/layout/route-transition.tsx` & `app/globals.css` — Route transition animations & global animation classes like `.page-transition` and `.card-animate`.
- `components/chatbot/chatbase-loader.tsx` — Safe client-side embedding of Chatbase.
- `components/ui/loading-overlay.tsx` — Full-screen loading overlay used on onboarding submit.
- `app/onboarding/page.tsx` — Multi-step assessment flow, uses `localStorage` and triggers a simulated loading overlay before redirect to `/dashboard`.
- `components/ui/course-card.tsx` / `app/learn/page.tsx` — Course UI with thumbnail & optional video support; lesson progress UI.

## Coding/architecture rules and patterns
- Always add `"use client"` at the top of files requiring browser APIs or React `useState`/`useEffect`.
- Avoid reading `window` on server components. Place runtime-only code in client components or wrap windows checks (`if (typeof window !== 'undefined')`).
- Server-side secrets MUST live in env variables (`.env.local`) and be used only on API routes; never expose them in client code.
- Metadata: Next 16 requires `export const viewport = { ... }` and `export const metadata = { ... }` separated if used.
- If you add new CSS behaviors, add keyframes to `app/globals.css` and provide `prefers-reduced-motion` fallbacks.
- Use `router.push('/dashboard')` to navigate; if a pre-navigation spinner is desired, set client state (e.g., `isSubmitting`) and show `LoadingOverlay` before navigation.

## Testing & verification patterns
- API: curl `http://127.0.0.1:3001/api/news?q=finance&countries=in&filter_entities=true&limit=3` to verify the news proxy route.
- UI: The landing hero is in `app/page.tsx` and uses `HeroWorkers` for animation. Navigate across pages to confirm the `RouteTransition` transition.
- Onboarding: Fill the assessment, hit ‘Complete’ — verify `LoadingOverlay` appears, the assessment is saved to `localStorage`, and `/dashboard` is reached.
- News: Open `NewsPopup` (on first visit or via layout script) and confirm it fetches news and displays images and `Read full article` links.

## Common fixes and gotchas
- Hydration mismatch: If React complains about HTML mismatch, check for client-only attributes injected by extensions or code that runs differently server vs client. Use `suppressHydrationWarning` sparingly (layout currently uses it).
- Fonts failing to download in dev: If Google Fonts fail, Next falls back to system fonts; this is not fatal but affects visuals.
- TypeScript: Next may set `jsx` and other settings automatically for the app router — keep `tsconfig.json` in repo-root defaults if changed.

## Adding features & where to place them
- New client UI components: add under `components/ui/` and import into pages under `app/` as client components with `use client`.
- New server endpoints: add under `app/api/<name>/route.ts` and keep secret usage server-only.
- New animation utilities: add CSS to `app/globals.css` and create a simple helper component (e.g., `components/ui/animated-card.tsx`) that wraps `card-animate` class.

## PR & Code style guidance
- Use `pnpm lint` (ESLint) if present. If missing, the repo uses Tailwind + TypeScript + shadcn components — keep code readable and align with existing patterns.
- When adding external libraries (e.g., framer-motion), evaluate whether to add to `dependencies` and update `README.md` with instructions.

---

If anything above is incomplete or unclear, tell me which area (e.g., onboarding flow, news API handling, or animations) to expand and I’ll update the file accordingly.