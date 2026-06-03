# Kiminou Knox

A luxury personal website for Kiminou Knox — author, basketball player, speaker, and entrepreneur.

## Run & Operate

- `pnpm --filter @workspace/kiminou run dev` — run the frontend (Vite, uses PORT env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (uses PORT env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v3 + wouter routing
- API: Express 5 + in-memory storage (MemStorage)
- Styling: Cormorant Garamond + Inter fonts, luxury dark theme

## Where things live

- `artifacts/kiminou/src/` — React frontend (pages, components, hooks)
- `artifacts/kiminou/src/lib/schema.ts` — shared frontend types (BlogPost, BlogCategory, ContactForm)
- `artifacts/api-server/src/storage.ts` — in-memory blog/user storage
- `artifacts/api-server/src/routes/blog.ts` — blog categories + posts API
- `artifacts/api-server/src/routes/contact.ts` — contact form + SEO data API
- `attached_assets/` — images and media assets used by the frontend
- `artifacts/kiminou/tailwind.config.ts` — Tailwind v3 config with luxury theme tokens

## Architecture decisions

- Frontend uses Tailwind v3 (not v4) via postcss — the project was imported with Tailwind v3 patterns.
- Blog data is stored in-memory (MemStorage) — no database needed for current functionality.
- CSS theme variables follow the original luxury design: Maison (default), Noir, Editorial, Street themes via `data-theme` attribute.
- `@shared/schema` types from the original Vercel project are now inlined in `src/lib/schema.ts` on the frontend.
- Contact form sends email via nodemailer + Gmail SMTP when `GMAIL_APP_PASSWORD` env var is set.

## Product

- Home page with hero artwork, poem of the day, featured book promos, testimonials
- Books page with all 7 published books + PDF modals
- Sports/Basketball page with athlete profile
- Speaking, Press, Author, Portfolio, Blog, and Contact pages
- Blog CMS at `/admin/blog` for managing posts and categories

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do NOT run `pnpm dev` at workspace root — apps run via workflows with PORT/BASE_PATH env vars.
- Tailwind is v3 in this project (not v4). The `@tailwind` directives in index.css and postcss.config.js are correct.
- The `GMAIL_APP_PASSWORD` secret is needed for the contact form to actually send emails.
- `attached_assets/` lives at the workspace root and is aliased as `@assets` in the Vite config.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
