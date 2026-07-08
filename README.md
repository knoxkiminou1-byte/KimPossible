# Kiminou Knox — Personal Site

My personal site and brand hub — press/bio, a photo/image sitemap, a "speaking" page with a radio-dial UI for tuning into different podcast streams (including a KimYaps station and a live 97.3 FM stream), a blog, and a sports section.

## Status

- Live: deployed on Vercel
- Stack: pnpm workspace monorepo, Express 5 API, PostgreSQL + Drizzle ORM, React 19 + Vite frontend, Tailwind CSS
- Built iteratively with a Replit AI agent, then hardened and redeployed through Vercel

## Repo layout

```
artifacts/
  kiminou/         the frontend app (Vite + React + Tailwind)
  api-server/      the Express API used in local/dev
  mockup-sandbox/  scratch/experiments
lib/
  api-client-react/  generated API hooks (Orval, from OpenAPI spec)
  api-spec/          OpenAPI spec source of truth
  api-zod/           Zod schemas shared across client/server
  db/                Drizzle schema + migrations
api/
  contact.js         serverless contact-form handler (Vercel function)
scripts/
  generate-seo.mjs   builds sitemap.xml / meta tags before build
  prerender-seo.mjs  prerenders routes for crawlers after build
```

## Notable pieces

- **SEO pipeline**: `pnpm run build` runs `generate:seo` → typecheck → Vite build → `prerender:seo`, so sitemap and per-route meta tags are generated and static HTML is prerendered for crawlers on every deploy.
- **Contact form**: a Vercel serverless function (`api/contact.js`) backed by Nodemailer, validated with Zod.
- **API contracts**: the OpenAPI spec in `lib/api-spec` is the source of truth; `lib/api-client-react` (typed hooks) and `lib/api-zod` (validation schemas) are code-generated from it via Orval rather than hand-maintained.
- **Legacy URL redirects**: `vercel.json` preserves old links (`/podcast` → `/speaking`, `/kimyaps` → `/speaking`, `/basketball` → `/sports`, an old blog slug redirect, etc.) so nothing breaks when pages get renamed.

## Local development

Requires Node 24+, pnpm 10, and a Postgres database.

```bash
pnpm install
pnpm --filter @workspace/kiminou run dev   # frontend, via root `dev` script
pnpm run typecheck                          # typecheck across all packages
pnpm run build                              # generate SEO assets + typecheck + build + prerender
```

Environment variables (see `lib/db` for schema):

```bash
DATABASE_URL=
```

## Deployment

Deploys to Vercel. Build command is `pnpm run build`, output directory is `artifacts/kiminou/dist/public` (see `vercel.json`).

## License

Personal project — all rights reserved.
