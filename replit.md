# Kiminou Knox

Official website for Kiminou Knox — Bay Area poet, NCAA basketball athlete, 8-time published author, speaker, and host of the KimYaps podcast.

## Run & Operate

- `pnpm --filter @workspace/kiminou run dev` — run the frontend (Vite + React)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Optional env: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` — for contact form emails
- Optional env: `ADMIN_SECRET` — key for the blog admin panel at `/admin/blog`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React 19, wouter (routing), Tailwind CSS v4, framer-motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod
- Build: esbuild (CJS bundle for API)

## Where things live

- `artifacts/kiminou/` — main frontend (Vite + React)
  - `src/pages/` — all route pages (Home, About, Books, Blog, Speaking, Contact, etc.)
  - `src/components/` — UI components including luxury FX (cursor, trails, transitions)
  - `src/lib/schema.ts` — shared TypeScript interfaces and Zod schemas
  - `src/lib/seo.ts` — SEO helpers and structured data
  - `src/lib/kiminouMedia.ts` — photo/media catalog
- `artifacts/api-server/` — Express API server
  - `src/routes/blog.ts` — blog posts and categories CRUD (admin-protected)
  - `src/routes/contact.ts` — contact form submission (sends email via Gmail)
  - `src/routes/health.ts` — health check
- `lib/db/src/schema/blog.ts` — Drizzle schema for blog_posts and blog_categories
- `attached_assets/` — Kiminou's photos and stock images (served via `@assets` alias)
- `artifacts/kiminou/public/` — static assets (books.json, covers, favicons, etc.)

## Architecture decisions

- Frontend is purely client-rendered (Vite SPA), no SSR. SEO is handled via react-helmet and a pre-render script.
- Routing uses wouter (already in scaffold). `BASE_URL` env var is the router base.
- Blog admin at `/admin/blog` is protected by a session key stored in sessionStorage; the API checks `x-admin-key` header against `ADMIN_SECRET` env var.
- Contact form sends email via Gmail SMTP (nodemailer) when `GMAIL_APP_PASSWORD` is set; gracefully falls back to logging when not configured.
- Images outside the artifact root (in `attached_assets/`) are accessible via the `@assets` Vite alias; `fs.strict: false` in vite.config.ts enables this.

## Product

- **Home**: Luxury animated hero with poem fragments, book previews, testimonials, stats
- **About**: Bio with photos, timeline, philosophy
- **Books**: All 8 published poetry collections with covers, excerpts, purchase links
- **Speaking**: Booking info, past talks, speaker kit
- **Blog**: Medium RSS feed + local admin-managed posts
- **Sports**: NCAA basketball page
- **Press**: Press coverage and kit
- **Contact**: Multi-type inquiry form (speaking, press, book, basketball, other)
- **Podcast**: KimYaps episode listing
- **Admin**: Password-protected blog post/category manager

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do NOT run `pnpm dev` at workspace root — use `restart_workflow` or the artifact-specific filter command.
- The `attached_assets/` directory lives at the workspace root (not inside the artifact). `vite.config.ts` has `fs.strict: false` and an `@assets` alias to serve it.
- react-helmet has a peer dep warning for React 19 (expected — it still works).
- Blog admin uses `x-admin-key` header with the `ADMIN_SECRET` env var. Set this secret before using the blog admin panel.
- Contact form email is silent (logs only) when `GMAIL_APP_PASSWORD` is not set — not an error.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
