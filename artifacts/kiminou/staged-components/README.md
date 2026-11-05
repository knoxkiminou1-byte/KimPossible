# Staged components — parked from Copy A (NOT wired in)

Folded in 2026-11-05 from Copy A (`knoxkiminou1-byte/kiminou-knox-website`,
`artifacts/kiminou/src/components/`) as faithful, dormant copies. These are
design-system pieces of Copy A's rebuild. They are **not imported by any page,
route, or build step** in KimPossible, and they sit outside `src/` so they
cannot affect the production build or typecheck.

| File | Origin (Copy A path) | Status |
|---|---|---|
| SiteHeader.tsx | src/components/SiteHeader.tsx | STAGED — Copy A's header; KimPossible keeps its own Header.tsx |
| SiteFooter.tsx | src/components/SiteFooter.tsx | STAGED — Copy A's footer; KimPossible keeps its own Footer.tsx |
| ProfessionalAtmosphere.tsx | src/components/ProfessionalAtmosphere.tsx | STAGED — ambient design layer of the A rebuild |
| HomeSections.tsx | src/components/HomeSections.tsx | STAGED — Copy A's home sections; tied to the held hero/home design call |

Why staged, not installed: adopting any of these replaces live KimPossible
chrome/home structure — a design adoption step that stays with the owner's
pending hero/design call (the particle hero "isn't necessarily done yet").
The general `--kk-*` design tokens these components use WERE installed
(appended to `src/index.css`), because the tokens are hero-independent and
the installed /work page needs them.

To install later: move a file into `src/components/`, verify its imports
resolve (framer-motion, wouter, `@/lib/seo`, `@/components/SignatureAnimation`,
`../pages/Speaking`'s `talks` export), and wire it into `src/App.tsx` — only
on the owner's design go.
