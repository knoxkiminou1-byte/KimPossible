# KimPossible — 3D Playbook & Prompts

The 3D on this site follows two open-source philosophies:

- **[`luukalleman/clone-study`](https://github.com/luukalleman/clone-study)** — architectural framework: pick the right page structure, ship a cinematic (not pixelated) canvas.
- **[`pulkitxm/claude-directory`](https://github.com/pulkitxm/claude-directory)** — ship the exact prompt beside the code.

## Where the 3D lives

| Piece | File | Model |
|---|---|---|
| Site-wide ambient backdrop (all pages) | `src/components/LuxuryFX/GlobalScene3D.tsx` | **Vertical narrative** — fixed `z-index:-1` canvas behind real HTML |
| Sports-page locker room | `src/components/LuxuryFX/LockerRoom3D.tsx` | **Vertical narrative** — full-bleed scene behind page content |
| On/off control + store | `Scene3DToggle.tsx`, `src/hooks/use3D.ts` | — |

## 1. Narrative-model detection (choose structure first)

- **Vertical narrative** (what this site uses): text/section-heavy, SEO-critical, 3D is *ambient*. Real HTML in normal flow; 3D in a fixed canvas behind it. Keeps content crawlable.
- **Scroll-pinned 3D timeline**: use only when the 3D IS the story (one continuous camera move across pinned scenes). Reach for drei `<ScrollControls>` — but never on a text-heavy, SEO-critical route.

Because KimPossible is an author/athlete site where SEO matters, **every** route stays vertical-narrative and the 3D never captures scroll.

## 2. Cinematic post-processing preset (no cheap canvas)

Both scenes run the premium stack via `@react-three/postprocessing`:

- **SMAA** with the composer's `multisampling={0}` — SMAA owns anti-aliasing so edges never read pixelated. *(This is the clone-study fix.)*
- **Bloom** (mipmap) — lifts the locker strip-lights, gold trim, and backdrop motes.
- **SSAO** (locker room) — contact grounding in corners.
- **ACES ToneMapping** (locker room) with the renderer set to `NoToneMapping` so the post pass owns tone mapping (no double pass).
- **Vignette** everywhere; **ChromaticAberration** on the locker room.

## 3. Asset substitution (no locked premium assets)

- **HDRI** → built from drei `<Lightformer>` rectangles inside `<Environment>` — zero external `.hdr`, no license risk. Both scenes do this.
- **Models** → procedural geometry (instanced primitives, icosahedra, the hand-built locker units).

## 4. Eye-safety + performance (baked in)

- Floating **on/off toggle**, persisted to `localStorage` (`use3D.ts`).
- Auto-off on `prefers-reduced-motion` and coarse-pointer (touch) via `useShouldReduceEffects`.
- Render loop **paused when the tab is hidden**.
- `dpr` capped + drei `<AdaptiveDpr>`.
- Backdrop mounted only **after idle** (`DeferredChrome` + `useIdleReady`) so Three.js never blocks first paint / LCP.
- Full-page shells become a translucent scrim (`<html class="threed-on">`) so text contrast is always protected.

## Prompts (reproduce / remix)

**Global backdrop**
```text
A persistent, route-aware 3D backdrop behind ALL pages of a dark literary
author site. Fixed z-index:-1 canvas, pointer-events none, text stays HTML.
Deep-ink background; a large slow MeshDistortMaterial aura + ~160 GPU-instanced
emissive gold motes drifting gently; procedural <Environment> from
<Lightformer>s. Accent hue eases per route (books=gold, sports=blue,
speaking=violet...). Gentle pointer parallax + scroll dolly (damped). Post:
Bloom + Vignette + SMAA (multisampling off). Eye-safe: on/off toggle persisted
to localStorage, auto-off on reduced-motion/touch, pause render when tab hidden,
dpr [1,1.5], mount after idle. Reveal by turning full-page shells translucent
via an <html class="threed-on"> CSS rule — no per-page edits.
```

**Locker room upgrade**
```text
Upgrade an existing R3F locker-room scene: add procedural HDRI via
<Environment>/<Lightformer> so the metal lockers get real reflections; add an
EffectComposer with SSAO, mipmap Bloom (strip lights + gold trim glow),
ChromaticAberration, ACES ToneMapping, Vignette, and SMAA (multisampling off).
Set the renderer to NoToneMapping so the post pass owns tone mapping.
```
