# Kiminou Knox — Official Website

Official personal website of Kiminou Knox: Author, Athlete, and Entrepreneur. Creator of the Black Boy Lie universe. Built as a luxury, editorial-quality web presence with multi-theme support.

## Run & Operate

- `pnpm --filter @workspace/kiminou run dev` — run the frontend (port set by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port set by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + wouter routing
- API: Express 5 (artifact: `api-server`)
- DB: PostgreSQL + Drizzle ORM (provisioned separately)
- Styling: Tailwind v4, Cormorant Garamond + Inter fonts, multi-theme CSS variables
- Animation: Framer Motion, custom luxury effects

## Where things live

- `artifacts/kiminou/src/pages/` — page components (Home, About, Books, Blog, Contact, etc.)
- `artifacts/kiminou/src/components/` — shared UI components + LuxuryFX effects
- `artifacts/kiminou/src/lib/` — queryClient, schema types, utils
- `artifacts/kiminou/public/` — static assets (photos, book covers, favicon, poems.json, books.json)
- `attached_assets/` — AI-generated images and stock images referenced via `@assets` alias
- `artifacts/api-server/src/routes/` — Express routes (health, blog, contact)
- `lib/api-spec/openapi.yaml` — API spec (health endpoint only; blog uses in-memory store)

## Architecture decisions

- Blog posts stored in-memory on api-server (no DB required for initial launch). Data persists per server process.
- Contact form sends email via Gmail SMTP if `GMAIL_APP_PASSWORD` env var is set; otherwise silently accepts submissions.
- Multi-theme support via `[data-theme="noir|editorial|street"]` CSS attributes on root.
- `@assets` Vite alias points to `../../attached_assets` from the artifact root for AI-generated images.
- Tailwind v4 `@theme inline` block maps CSS custom properties to Tailwind color tokens.

## Product

- Home page: animated hero with particle effects, cursor, scroll progress bar, welcome video overlay
- Books: 7 published works with covers, poems, and buy links
- Blog: read-only public blog + admin panel (protected by admin key in sessionStorage)
- About, Author, Works, Sports, Speaking, Press, Portfolio pages
- Contact form with inquiry type routing (speaking, press, book, basketball, other)
- Splash page for direct entry

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `GMAIL_APP_PASSWORD` must be set as a secret for the contact form to actually send emails (uses `knoxkiminou1@gmail.com` as sender/recipient by default)
- Blog data is in-memory — restarts the server will clear all blog posts. Add a DB if persistence is needed.
- `attached_assets/` must exist at the workspace root for `@assets` imports to resolve. The Vite alias points there.
- Tailwind v4 does not support `@apply border-border` directly; the CSS uses explicit `border-color: var(--border)` in the base layer instead.
- `react-helmet` has a peer dep warning with React 19 but works fine at runtime.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
