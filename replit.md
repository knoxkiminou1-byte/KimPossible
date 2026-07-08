# Kiminou Knox — Personal Site

Personal site and brand hub for Kiminou Knox (author, athlete, speaker, podcast host): published books, press/bio, speaking, sports, and blog.

## Run & Operate

- `pnpm run dev` — run the frontend dev server (the only thing actually deployed)
- `pnpm run typecheck` — typecheck the frontend
- `pnpm run check:assets` — fail fast on any missing local asset reference (image/PDF/etc.)
- `pnpm run build` — generate:seo (incl. book data) → typecheck → build → prerender
- `pnpm run validate` — the full pre-deploy gate: check:assets + typecheck + build
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from `lib/api-spec/openapi.yaml`
- No required env vars to run locally — see `.env.example` for what the contact form and optional Turnstile protection read

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Deployed: React 19 + Vite frontend, Tailwind CSS, one Vercel serverless function (`api/contact.js`, Nodemailer + Zod)
- Present but not deployed: `artifacts/api-server` (Express 5) and `lib/db` (Drizzle ORM, schema currently empty) — see README.md's Status section before assuming either is live
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `artifacts/kiminou/src/content/books.json` — the canonical source for all book data; `scripts/generate-books.mjs` regenerates the public JSON files from it on every build
- `artifacts/kiminou/src/pages/` — one file per route
- `lib/api-spec/openapi.yaml` — source of truth for API contracts; `lib/api-client-react` and `lib/api-zod` are generated from it, not hand-written
- `scripts/check-assets.mjs` — scans source + public JSON for local asset references and fails if any target file is missing

## Architecture decisions

- Book data lives in one canonical JSON file, not three hand-maintained ones — the site previously had `src/content/books.json`, `public/books.json`, and `public/books-full.json` drift out of sync (one book missing from the two public files).
- `/admin/blog` was removed rather than fixed in place: it had no real server-side auth, and the API routes it called don't exist in what's actually deployed. A real ADMIN_SECRET-protected implementation exists in `.migration-backup/artifacts/api-server/src/routes/blog.ts` but depends on Drizzle tables that were never added to `lib/db`'s schema — reviving it needs a provisioned Postgres DB and a decision on how to deploy the Express server, not just a code change.

## Gotchas

- Don't add `DATABASE_URL` expecting it to do anything for the deployed site — nothing reads it. `lib/db`'s schema file is an unfilled template.
- Always run `pnpm run validate` before considering a change done — it's the same gate CI runs.
- If you add/change a book, edit `src/content/books.json` only; `public/books.json` and `public/books-full.json` are generated and will be overwritten on the next build.
