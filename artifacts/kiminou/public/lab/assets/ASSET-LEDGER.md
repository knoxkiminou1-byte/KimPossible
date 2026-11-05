# ASSET LEDGER — Original Interactive Instruments

Section: **ORIGINAL INSTRUMENTS** (`#instruments`), between GAME BREAK and BOOKS in `index.html`.
Built 2026-09-29 for Kiminou's order: *"create your own assets that make sense with the thing but they have to be fully functional"* (moving pictures, puzzle-piece separation, layered depth — award-site energy).

## Provenance

All artwork below is **original and procedurally generated** for this site — no borrowed imagery, no stock, no AI-image-service output.

- 2026-09-29 ~04:20 UTC: four image-generation requests were attempted through the media service; the service was overloaded and every request failed. Those exact requests were not repeated or rerouted.
- Fallback: a deterministic procedural generator was authored instead —
  `assets/instruments/generate_art.py` (Pillow + NumPy, no borrowed image material).
- The script is kept in-repo so any layer can be regenerated or iterated.

## Files

| File | Size | What it is |
|---|---|---|
| `assets/instruments/puzzle-hero.jpg` | 1600×1000 | Basketball whose seams unwind into book-page lines (near-black / gold / cream) |
| `assets/instruments/depth-bg.jpg` | 1600×900 | Dark atmospheric gold wash (opaque base layer) |
| `assets/instruments/depth-mid.png` | 1600×900, RGBA | Court-line diagram, black keyed to true transparency |
| `assets/instruments/depth-fg.png` | 1600×900, RGBA | Gold/cream book-spine bars, ribbon arcs, trophy-like symbols; black keyed to transparency |
| `assets/instruments/fan-static.jpg` | 1089×642 | Screenshot of the fanned fan — `<noscript>` fallback only |
| `assets/instruments/generate_art.py` | — | Procedural generator (kept for regeneration/iteration) |

Transparency note: `depth-mid.png` / `depth-fg.png` first rendered with pure-black RGB backgrounds; they were converted to true alpha via luminosity-keyed alpha (black → transparent, line brightness preserved), edges inspected over magenta on 2026-09-29 — clean, no halos, no leftover box.

## The four instruments

### 1 · SEAMS / PAGES — puzzle-piece hero (`#inst-puzzle`)
- One 1600×1000 source image sliced into a 6×4 grid of tiles on a single canvas-2D surface (no WebGL — the site keeps its one existing WebGL context untouched).
- Fast scrolling past the piece scatters tiles with spring physics (velocity impulse → damped spring back to 0). Tap/click bursts them. A SCATTER/REFORM button gives keyboard and touch users the same control; tiles settle with gold edge flashes while displaced.
- rAF loop runs only while tiles are unsettled; IntersectionObserver gates scroll-velocity input to the viewport.

### 2 · THREE DEEP — parallax depth (`#inst-depth`)
- Three original layers: wash (opaque JPG), court lines + symbols (transparent PNGs, `mix-blend-mode: screen`).
- Fine pointers: layers follow the pointer, lerped — max 4px / 8px / 12px from back to front.
- Coarse pointers (mobile): scroll progress through the piece shifts layers instead.
- Decorative images (`alt=""`, `aria-hidden`); meaning carried by the article's text.

### 3 · THE FAN — interactive book fan (`#inst-fan`)
- Ten spines built **from the real `.book` catalog elements** — no duplicated records. The Spirit of Solomon's spine carries its real cover; the other nine keep their honest house-style title cards (same claim as the catalog: real published books, covers in preparation).
- Scroll into view fans the spines out with stagger; hover (fine pointer) widens the fan; PREV/NEXT buttons and ←/→ arrow keys flip the active spine; Enter/Space or click opens the book — by calling `.click()` on the matching original `.book` element, so the existing modal, focus trap, and data all run unchanged.
- Active spine is announced via `aria-live` caption ("03 / 10 — HOPELESS ROMANTIC").

### 4 · COURT / BOOK — animated SVG (`#inst-courtlines`)
- Hand-authored line drawing: half-court boundary, key, free-throw circle, backboard, rim, corner threes and arc — two gold "morph" curves flow the court lines into an open book's pages, text lines, spine, and bookmark.
- Every path uses `pathLength="1"` with dash-draw animation staggered on scroll into view; a REPLAY DRAW button restarts it. `role="img"` with a full `aria-label`.

## Fallbacks

| Condition | Puzzle | Depth | Fan | Court SVG |
|---|---|---|---|---|
| No JavaScript | Static `<img>` (plain HTML) | Static 3-layer stack | `<noscript>`: fan screenshot + full ten-title list | Inline SVG ships `class="drawn"` — fully drawn |
| Reduced motion | Static `<img>`; scatter button hidden | No parallax (static stack) | Static arc, still clickable/keyboard-operable | Fully drawn; replay hidden |
| Image 404 | — | — | — | n/a (inline) |

- Global reduced-motion CSS also forces transitions/animations to ~0s as a backstop.
- No instrument depends on hover alone: puzzle has the button, fan has buttons + keys, depth is decorative-reactive on mobile via scroll.

## Performance

- Puzzle: single canvas-2D, 24 tiles, rAF only while moving; scroll handler is passive and viewport-gated.
- Depth: rAF only while lerping toward a new target; transforms are compositor-friendly `translate3d`.
- Fan: pure CSS transitions on transform; no per-frame JS.
- SVG: CSS stroke transitions; no JS per-frame cost.
- No new WebGL contexts, no WebGPU, no libraries added (vanilla JS; GSAP/Lenis optional enhancements untouched).

## Verification (2026-09-29)

- `node --check js/assets.js` — clean.
- Headless Chromium (CDP) checks, desktop 1440×900 / mobile 390×844 / reduced-motion / JS-disabled — screenshots `previews/kk5-*`.
- Zero console/page errors on full load and scroll (`window.__errs` empty).
- Puzzle: canvas initializes on image load; SCATTER button flips label to REFORM synchronously and tiles burst (24 tiles, gold outlines); springs reform the image and the label returns to SCATTER. Scroll-velocity scatter confirmed. No canvas under reduced motion (static `<img>` stays).
- Depth: three `.depth-layer` elements; fine-pointer parallax capped at 4/8/12px; static stack under reduced motion.
- Fan: 10 spines built from the existing `.book` elements; caption `01 / 10 — THE SPIRIT OF SOLOMON`; arrow keys move 01→02 (`OUR FATHER?`); PREV/NEXT buttons step the caption; clicking a spine opens the existing book modal through the source `.book` (verified: 3rd spine → "Poems from a Black Boy", close control dismisses). No-JS: interactive shell hidden (`display:none` computed), `<noscript>` static fallback image shown.
- Court SVG: 17 paths; `drawn` class present after scroll into view; replay re-triggers the draw; fully drawn with replay hidden under reduced motion; fully drawn with no JS.
- WebGL audit: `grep getContext js/*.js` — the only WebGL call is the pre-existing `motion.js` displacement canvas (`#kk-disp`); instruments use canvas-2D only. Headless reports no fine pointer, so `#kk-disp` does not instantiate there (by design); at most one WebGL context exists in a real desktop browser, unchanged from before this work.
- `assets/instruments/fan-static.jpg` (1089×642) is a cropped capture of the rendered fan, used only in `<noscript>`.

## THE LAB (2026-09-29) — eight-asset interactive toybox

- **Page:** `lab.html` (local only, never pushed/deployed) — linked from the
  index fullscreen menu (`The Lab`) and the footer index; own nav keeps the
  index's transparent-at-top → solid-blur-bar-after-48px contract.
- **Files:** `css/lab.css`, `js/lab.js`; data in `assets/lab/`:
  - `avatar-full.png` — 492×1274 RGBA, transparent bg — Kiminou's full-body
    pixel character, head to boots, exactly like his picture. Cropped from his
    uploaded full-body art (letterbox bars removed, white keyed out); teeth
    verified clean in this source, no repaint. Drives the HERO particle
    animation (hero assembles the full character, not just the face).
  - `face.png` — 480×480 RGBA portrait, transparent bg, 125,566 opaque pixels
    (bbox x52–367, y0–479); the portrait source for the Lab's face toys only
    (hero no longer uses it).
  - `face-data.json` (262 KB) / `face-data.js` — 7,000 sampled colored face
    points + 1,313 occupied 48×48 voxel cells, generated locally with Pillow.
  - `face-uri.js` (213 KB) / `covers-uri.js` (289 KB) — data-URI embeddings
    of the portrait and the 10 real covers (titles + verified store URLs), so
    WebGL snapshots (`preserveDrawingBuffer`) stay untainted.
- **Engine:** three.js r160 via pinned jsdelivr import map (no build step,
  no npm). The 3D import failure path was never reachable in this sandbox's
  headless Chromium (localhost blocked, CDN unreachable) — verification ran
  against a local `three.module.js` via a file:// test mirror; the shipped
  import map still points at the pinned CDN.
- **Behavior contracts:**
  - Lazy per-card init via IntersectionObserver (rootMargin 400px); render
    only while a card is visible; animation loop is single and page-global.
  - Max 6 live WebGL contexts; the oldest offscreen card is disposed when a
    7th initializes and re-initializes cleanly on scroll-back (verified).
  - Pixel ratio capped at 2; particle counts halve on small screens.
  - Reduced motion: face spawns already assembled, no idle spin, no auto
    animation; drag/zoom/ripple/glitch controls still work.
  - No-JS: titles, descriptions, and a static per-card preview stay readable;
    JS fallbacks carry `hidden`, `<noscript>` variants carry the art.
  - Every card has a SNAPSHOT button downloading a real PNG data URL.
- **The eight toys:** (1) FACE ASSEMBLY — 7,000 colored particles scatter and
  assemble into the portrait; drag/touch rotates, wheel/pinch zooms,
  SCATTER/ASSEMBLE reversible mid-flight, spread/speed/size sliders.
  (2) VOXEL HEAD — 48×48 sampled cubes; click explodes, springs reform.
  (3) PARTICLE NAME — gold-dust "KIMINOU"; pointer repels, springs return.
  (4) BOOK TOWER — all 10 real covers as 3D books; drag orbits, click pulls a
  book forward with caption, double-click opens its verified store URL.
  (5) RIPPLE PORTRAIT — touch/click sends vertex ripples through the face.
  (6) GLITCH PORTRAIT — RGB split + slice glitch on button or portrait click.
  (7) GOLD COURT — 3D court-line drawing with gold particle halo.
  (8) ORBIT RINGS — procedural basketball-textured sphere, 3 tilted gold rings.
- **Bugs found and fixed during verification:**
  - `.lab-fallback` CSS `display:flex` overrode the `hidden` attribute —
    overlays showed on every card and blocked canvas input; fixed with
    `.lab-fallback[hidden]{display:none!important}`.
  - Context GC keyed renderers by HTML card id (`lab-face`) instead of the
    asset id (`face`) — `cards[id]` was undefined and threw on the 7th
    context, which tripped the 3D fallback; init functions now take the
    asset id as a parameter.
  - SCATTER/ASSEMBLE buttons were disabled mid-flight; now always live and
    reverse from current particle positions.

## Lab verification (2026-09-29)

- `node --check js/lab.js` — clean (the file's IIFE close was missing once,
  caught and fixed before any browser run).
- Headless Chromium (CDP) on a file:// test mirror with local three.js:
  - Face reaches `assembled`; real CDP mouse-drag rotates it (y 2.460→3.059);
    SCATTER/ASSEMBLE flip states including mid-flight reversal; snapshot
    returns a 67 KB PNG data URL.
  - All 8 cards initialize; 10 books present; book select shows caption
    `03 — POEMS FROM A BLACK BOY`; voxel explode, ripple splash, glitch,
    court, rings, name-repel all exercised.
  - Full 8-card tour: zero console/page errors (`window.__errs` empty);
    GC disposes the oldest offscreen context at 7 and re-inits on scroll-back.
  - Reduced motion: starts assembled; no-JS: exactly one static fallback
    visible per card; mobile 390×844: cards stack, controls tappable.
- Screenshots `previews/kk7-*`: facecard, scatter, face-assembled, books,
  voxel, name, ripple, glitch, court, rings, mobile-lab, nojs.

## Hero face — particle portrait (2026-09-29)

- `js/hero-face.js` + hero section in `index.html`: the Lab's Face Assembly
  reimagined as the site hero, built on 2D canvas (deliberate: keeps the
  site's single-WebGL-context rule intact — zero new GL contexts).
- Choreography: thousands of particles fly in and build his face
  ("watch it build me") → the face waves hi (traveling sine sweep) →
  freezes at the wave peak → "touch it — go on": tap cycles
  explode / vortex / wave; drag spins the face in 3D (projected);
  replay-intro button re-runs the sequence.
- Reduced motion: fully assembled static face; tap gives a gentle tilt
  pulse only. No-JS: static `assets/lab/face.png` with the name.
- Sampler uses `imageSmoothingEnabled = false` (nearest-neighbor) so the
  pixel art keeps hard edges when downscaled to the particle grid.
- Source portrait restoration: the AI-generated avatar carried a garbled
  brown smudge across the teeth. Cleaned to white in `assets/lab/face.png`;
  the untouched original is preserved at `assets/lab/face-original.png`.
- Verified: CDP screenshots at 1440×900 and 390×844; phase hints cycle
  correctly; tap triggers explode; replay works; zero console errors.
