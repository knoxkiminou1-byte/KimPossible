# Kiminou Knox — Personal Site

My personal site and brand hub — books, press/bio, a photo/image sitemap, a "speaking" page with a radio-dial UI for tuning into different podcast streams (including a KimYaps station and a live 97.3 FM stream), a blog, and a sports section.

## Status

- Live: deployed on Vercel
- Stack (active/deployed): pnpm workspace monorepo, React 19 + Vite frontend, Tailwind CSS, a single Vercel serverless function for the contact form (`api/contact.js`)
- Built iteratively with a Replit AI agent, then hardened and redeployed through Vercel

**Not currently deployed**, present in the repo for future work: `artifacts/api-server` (an Express 5 API) and `lib/db` (Drizzle ORM). `lib/db`'s schema is still an empty template — nothing reads or writes to Postgres today. Vercel only deploys `api/*.js`; the Express server isn't wired into `vercel.json` at all. Don't provision a database or set `DATABASE_URL` to run the site locally — it isn't needed.

## Repo layout

```
artifacts/
  kiminou/         the frontend app (Vite + React + Tailwind) — this is what's deployed
  api-server/      an Express API, not currently deployed (see Status above)
  mockup-sandbox/  scratch/experiments
lib/
  api-client-react/  generated API hooks (Orval, from OpenAPI spec)
  api-spec/          OpenAPI spec source of truth
  api-zod/           Zod schemas shared across client/server
  db/                Drizzle schema (currently empty) + migrations
api/
  contact.js         serverless contact-form handler (Vercel function) — the only backend code that actually runs in production
scripts/
  generate-books.mjs  regenerates public/books.json + books-full.json from src/content/books.json (the canonical source)
  generate-seo.mjs     builds sitemap.xml / meta tags before build
  prerender-seo.mjs    prerenders routes for crawlers after build
  check-assets.mjs     fails the build if any local asset reference (image/PDF/etc.) points at a file that doesn't exist
```

## Notable pieces

- **Book data**: `artifacts/kiminou/src/content/books.json` is the single canonical source for all books. `pnpm run generate:seo` (part of `build`) regenerates the public JSON files from it, so they can't drift out of sync the way they used to.
- **SEO pipeline**: `pnpm run build` runs `generate:seo` (which itself runs `generate:books` first) → typecheck → Vite build → `prerender:seo`, so book data, sitemap, and per-route meta tags are generated and static HTML is prerendered for crawlers on every deploy.
- **Contact form**: a Vercel serverless function (`api/contact.js`) backed by Nodemailer, validated with Zod, with a honeypot field, IP-based rate limiting, and optional Cloudflare Turnstile (inert unless both `TURNSTILE_SECRET_KEY` and `VITE_TURNSTILE_SITE_KEY` are set — see `.env.example`).
- **API contracts**: the OpenAPI spec in `lib/api-spec` is the source of truth; `lib/api-client-react` (typed hooks) and `lib/api-zod` (validation schemas) are code-generated from it via Orval rather than hand-maintained. Regenerate with `pnpm --filter @workspace/api-spec run codegen` after editing `lib/api-spec/openapi.yaml`.
- **Legacy URL redirects**: `vercel.json` preserves old links (`/podcast` → `/speaking`, `/kimyaps` → `/speaking`, `/basketball` → `/sports`, an old blog slug redirect, etc.) so nothing breaks when pages get renamed.

## Local development

Requires Node 24+ and pnpm 10. No database needed.

```bash
pnpm install
pnpm run dev                                # frontend dev server
pnpm run check:assets                       # fail fast on any missing local asset reference
pnpm run typecheck                          # typecheck the frontend
pnpm run build                              # generate SEO assets + typecheck + build + prerender
pnpm run validate                           # check:assets + typecheck + build, the full pre-deploy gate
```

Environment variables — see `.env.example`. None are required to run the frontend locally; `GMAIL_APP_PASSWORD` is only needed for the contact form to actually send email (without it, it returns a fallback email address instead of failing).

## Deployment

Deploys to Vercel. Build command is `pnpm run build`, output directory is `artifacts/kiminou/dist/public` (see `vercel.json`).

## License

Personal project — all rights reserved.
