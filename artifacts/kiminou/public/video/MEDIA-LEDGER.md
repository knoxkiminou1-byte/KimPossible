# Media ledger — kiminou-knox-site

All media is stored locally under `assets/`. Nothing is hotlinked.
Verification: every image opened with PIL (format + dimensions confirmed);
every video probed with ffprobe and frame-checked.

## Real book covers (verified)

| File | Title | Source | Verification |
|---|---|---|---|
| `covers/the-spirit-of-solomon.jpg` | The Spirit of Solomon — Kiminou Knox | Books-A-Million product image (`covers4.booksamillion.com`, ISBN 9798316662975), found via public search 2026-09-29 | PIL JPEG 250×375; visually confirmed title + author on cover |

Nine more covers were hunted (Google Books API, Open Library, Books-A-Million,
Bookshop.org, image search, his Instagram, his YouTube, Wikimedia Commons) —
no other verifiable real covers found. Google Books holds no cover art for
these self-published editions. The books grid uses the one real cover plus
honest typographic title cards for the other nine real titles.

## Stock video (Coverr — free commercial license, no attribution required)

| File | Coverr page | Length | Info |
|---|---|---|---|
| `video/court-empty.mp4` | "Empty basketball court" — panning shot of an empty court | 19.1s | 1920×1080, 10.4 MB |
| `video/courts-aerial.mp4` | "Basketball courts in Mexico City" — aerial | 15.0s | 1920×1080, 8.4 MB |
| `video/city-bokeh.mp4` | "Blurry lights at night" — city bokeh | 13.3s | 1920×1080, 7.5 MB |

Posters (official Coverr thumbnails, 1600×900, PIL-verified JPEG):
`img/poster-court-empty.jpg`, `img/poster-courts-aerial.jpg`, `img/poster-city-bokeh.jpg`.

## Stock photography (Wikimedia Commons — see license column)

| File | Commons file | License | Info |
|---|---|---|---|
| `img/arena-1.jpg` … `img/arena-8.jpg` | AIS Arena interior series (Jan 2026); "Basketball arena.jpg" | CC BY-SA 4.0 (arena series) / CC BY 2.0 | JPEG 1920×1440 |
| `img/court-1.jpg` … `img/court-6.jpg` | Outdoor public basketball courts (Marsiling Rise, Kai Chuen, Hurst Park, Emerald Playground, sanatorium park) | CC BY-SA 4.0 / CC BY 2.0 | JPEG 1920×1252–1440 |
| `img/nola-1.jpg` … `img/nola-6.jpg` | Canal St / Bourbon St / Euterpe St / Poeyfarre St, New Orleans, night | CC BY 2.0 | JPEG 1920×1440–2560 |
| `img/typewriter-1.jpg` … `img/typewriter-4.jpg` | Vintage typewriter close-ups (hands, keyslugs, keys) | CC0 / CC BY-SA | JPEG 1920×1277–1623 |

File pages (attribution): search `commons.wikimedia.org` for the titles above.
Rejected during curation (not in repo): pro-player dunk photos (identifiable
athletes — wrong for a personal brand), band stage photos (identifiable
musicians), "fire basket" and street-scene clips (mislabeled), a political
speech clip (title keyword false-positive).

## Pre-existing assets (kept)

- 10 Pexels-licensed stock photos in `assets/` root (basketball-action,
  author-desk, basketball-arena-dark, basketball-texture, book-pages,
  city-night, court-lines, crowd-lights, podcast-mic, training-dark).
- 4 generated atmospheric textures (`atmosphere-arena.webp`,
  `court-spotlight.webp`, `gold-stroke.webp`, `paper-grain.webp`).
- `assets/kiminou-portrait.jpg` — Kiminou's own portrait (150×150).

## Licensing caveats

- Wikimedia Commons files are CC-licensed; the CC BY / CC BY-SA files used
  here legally require attribution. Per-photo source + license credit lines
  were added under each scrapbook still (2026-09-29, kk4 pass); the footer
  line remains as fallback. Individual photographer names could not be
  verified for these files — they stay owed before any public launch.
- Coverr footage: free for commercial use, no attribution required.
- Pexels license: free use, no attribution required.
- No broadcast or copyrighted footage is used anywhere on the site.

## Site integration (2026-09-29)

- Books section now uses the 10 exact bible titles; `assets/covers/the-spirit-of-solomon.jpg`
  is the only real published cover shown. The other nine volumes render as editorial
  house-style title cards, with a books-note stating that plainly. No invented covers.
- Scrapbook expanded 4 → 8 frames using the curated Commons photos
  (arena-3, court-2, nola-3, typewriter-1, arena-8, court-5, nola-1; podcast-mic kept).
- GAME section: `court-empty.mp4` autoplays muted behind the headline with
  `poster-court-empty.jpg` as poster and `atmosphere-arena.webp` as the static fallback
  (also the reduced-motion / video-error / no-JS state).
- New REEL section: `courts-aerial.mp4` and `city-bokeh.mp4` with user PLAY/PAUSE
  toggles (never autoplay), posters shown until played, offscreen auto-pause.
- Footer carries the imagery credit line; per-photo source+license lines were added
  under each scrapbook still in the kk4 pass. Individual photographer names
  remain unverified and stay owed before public launch.

## Photographer attribution research — 2026-09-29

All 7 scrapbook Commons stills were matched to their exact Wikimedia Commons
file pages via the Commons API (search + file metadata) and confirmed with
perceptual-hash (dHash) comparison of the local 1920px crops against 960px
Commons thumbnails (hamming distances 0–4; all other candidates 85+).

| Site file | Commons file | Photographer | License | File page |
|---|---|---|---|---|
| `img/arena-3.jpg` | AIS Arena interior, January 2026 03.jpg | DaHuzyBru | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:AIS_Arena_interior,_January_2026_03.jpg |
| `img/court-2.jpg` | Covered public basketball court at Marsiling Rise, Singapore.jpg | Wzhkevin | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Covered_public_basketball_court_at_Marsiling_Rise,_Singapore.jpg |
| `img/nola-3.jpg` | Night on Bourbon Street, New Orleans, 17 July 2016 - 10.jpg | Infrogmation | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Night_on_Bourbon_Street,New_Orleans,_,_17_July_2016_-_10.jpg |
| `img/typewriter-1.jpg` | A man adjusting an old typewriter closeup.jpg | Shixart1985 | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:A_man_adjusting_an_old_typewriter_closeup.jpg |
| `img/arena-8.jpg` | Basketball arena.jpg | Orrling | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Basketball_arena.jpg |
| `img/court-5.jpg` | Outdoor basketball court, Hurst Park, Molesey, Surrey 01.jpg | Mertbiol | CC0 | https://commons.wikimedia.org/wiki/File:Outdoor_basketball_court,_Hurst_Park,_Molesey,_Surrey_01.jpg |
| `img/nola-1.jpg` | Canal Street Walgreens, night view, New Orleans April 2023.jpg | edenpictures | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Canal_Street_Walgreens,_night_view,_New_Orleans_April_2023.jpg |

Notes:
- Content IDs: arena-3 = AIS Arena, Canberra (Canberra Capitals WNBL setup);
  arena-8 = Romema Arena, Haifa, Israel ("Yellow galleries at Romema… game
  against the Green locals" — exact 1.7× downscale of the Commons original).
- Discrepancies vs the site's current per-photo credit lines (index.html,
  NOT yet corrected — HTML untouched per research-task scope): nola-3 is
  CC BY-SA 4.0, not "CC BY 2.0"; typewriter-1 is CC BY 2.0, not "CC0 / CC BY-SA";
  arena-8 is CC BY-SA 3.0, not "CC BY-SA 4.0 / CC BY 2.0"; arena-3 is CC BY-SA 4.0
  exactly. Correct the credit lines before any public launch.
- court-5 is CC0 (no attribution legally required); the other six require
  photographer + license attribution, which the table above now supplies.

## Book cover research — 2026-09-28 (Kiminou Knox personal-brand site)

Verified per-title research. ISBNs/discovery lead: his official site's book data at
https://github.com/knoxkiminou1-byte/kimpossible (`artifacts/kiminou/src/content/books.json`,
deployed at kiminouknox.com) plus live product listings on Google Play Books, Amazon, Bookshop.org,
and Books-A-Million. Covers below are real JPEGs downloaded via curl from each listing's own
og:image (downloaded with the `=w800` size variant of the same Play Books frontcover URL, verified
with `file` + PIL; all 674–800px wide).

1. Our Father? — ISBN 9798316682850 (author's site data). Product: https://www.amazon.com/dp/B0F3VBVWCM
   (from his official site; direct fetch of the Amazon page was 403-blocked during research).
   Listing/description source: https://play.google.com/store/books/details?id=PbFNEQAAQBAJ
   (Google Play Books, verified live). Cover image URL (og:image):
   https://play.google.com/books/publisher/content/images/frontcover/PbFNEQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/our-father.jpg (800x1273).
2. Poems from a Black Boy — ISBN NOT FOUND (no ISBN on author's site data or any listing).
   Product: https://www.amazon.com/dp/B0FT25WKWP (from his official site; fetch blocked 403).
   Listing/description source: https://play.google.com/store/books/details?id=0HuKEQAAQBAJ (verified live).
   Cover: https://play.google.com/books/publisher/content/images/frontcover/0HuKEQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/poems-from-a-black-boy.jpg (800x1277).
3. Black Boy Poems — ISBN 9798267606912 (Bookshop.org listing URL ?ean= param + search result).
   Product: https://bookshop.org/p/books/black-boy-poems-kiminou-knox/aaa3d62740820b18?ean=9798267606912&next=t&
   (verified live; description captured). Cover image: NOT obtainable — Bookshop.org serves
   Cloudflare 403 to direct fetches, so the listing's cover image URL could not be extracted;
   cover_file left null. (His own site carries only a generated SVG placeholder for this title.)
4. Hopeless Romantic — ISBN 9798291608128 (author's site data). Product: https://www.amazon.com/dp/B0FH1YWJJB
   (official site; fetch blocked 403). Listing/description source:
   https://play.google.com/store/books/details?id=AdZrEQAAQBAJ (verified live).
   Cover: https://play.google.com/books/publisher/content/images/frontcover/AdZrEQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/hopeless-romantic.jpg (674x1000).
5. Boys Raised in Silence — ISBN 9798316735821 (author's site data).
   Product: https://www.amazon.com/dp/B0FT23RMGT (official site; fetch blocked 403).
   Listing/description source: https://play.google.com/store/books/details?id=pHuKEQAAQBAJ (verified live).
   Cover: https://play.google.com/books/publisher/content/images/frontcover/pHuKEQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/boys-raised-in-silence.jpg (788x1013).
   SECOND listing verified: Bookshop.org "Boys Raised In Silence" carries a different ISBN
   9798267592383 — https://bookshop.org/p/books/boys-raised-in-silence-for-the-things-we-were-never-alowed-to-feel-kiminou-knox/b6ba8ad5a1506843?ean=9798267592383&next=t&
   (verified live; likely a separate edition/print run). Not used as the primary ISBN.
6. The Adventures of Kiminou the Great and Chua the Wise — ISBN 9798316591204 (author's site data).
   No Amazon listing per his official site data. Product/listing:
   https://play.google.com/store/books/details/Kiminou_Knox_The_Adventures_of_Kiminou_the_Great_a?id=CHyKEQAAQBAJ
   (verified live; co-author Matsoua Malonga). Cover:
   https://play.google.com/books/publisher/content/images/frontcover/CHyKEQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/kiminou-the-great-and-chua-the-wise.jpg (800x1028).
7. Kiminou's World of Imagination: The Basics — ISBN NOT FOUND. No Amazon listing per his official site.
   Product/listing: https://play.google.com/store/books/details?id=KArCEQAAQBAJ (verified live).
   Cover: https://play.google.com/books/publisher/content/images/frontcover/KArCEQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/kiminous-world-of-imagination.jpg (800x800).
8. WHY DID YOU GHOST ME — ISBN NOT FOUND. Product: https://www.amazon.com/dp/B0H8XZ7N6K
   (official site; fetch blocked 403). Listing/description source:
   https://play.google.com/store/books/details?id=zB_1EQAAQBAJ (verified live).
   Cover: https://play.google.com/books/publisher/content/images/frontcover/zB_1EQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/why-did-you-ghost-me.jpg (800x1200).
9. 7.16.74: An Ode to Rashida — ISBN NOT FOUND. Product: https://www.amazon.com/dp/B0H92Q6PM2
   (official site; fetch blocked 403). Listing/description source:
   https://play.google.com/store/books/details?id=MTv1EQAAQBAJ (verified live).
   Cover: https://play.google.com/books/publisher/content/images/frontcover/MTv1EQAAQBAJ?fife
   -> saved ~/workspace/kiminou-knox-site/assets/covers/7-16-74-an-ode-to-rashida.jpg (800x1067).

REJECTIONS / NOTES:
- Amazon product pages (all five dp/ URLs above) returned HTTP 403 to both browser fetch and
  direct requests; page contents (ISBN on listing, description) could not be re-verified there.
  The URLs themselves are real — taken from the buyLinks in his official site's published books.json.
  Google Play Books listings were verified live for all 8 titles that have them.
- Google Books API: shared-key quota exhausted (429); not usable for ISBN confirmation.
- Open Library: no records for "Kiminou Knox" (0 hits).
- ThriftBooks / Goodreads / Barnes & Noble: no Kiminou Knox author page or listings found.
- BAM (Books-A-Million): only "The Spirit of Solomon" (9798316662975, already verified) is indexed;
  none of the 9 titles surfaced in site:booksamillion.com searches.
- "Poems from a Black Boy" and "Black Boy Poems" are kept as two separate records: Play Books
  ebook (no ISBN) vs Bookshop.org paperback (ISBN 9798267606912).
- The Play Books author-bio for Boys Raised In Silence mentions personal stats; per research rules
  that attribute was not recorded.

## 2026-09-29 — Black Boy Poems cover recovered
- Cover for "Black Boy Poems" (ISBN 9798267606912) extracted from the live Bookshop.org listing via the managed browser (direct fetches were Cloudflare-403-blocked). Image URL read from the listing's <img> element and opened directly to confirm it renders the real cover: https://images-us.bookshop.org/ingram/9798267606912.jpg — saved as assets/covers/black-boy-poems.jpg (600×750 JPEG, verified image bytes).
- NOTE: the cover artwork itself reads "Poems From a Black Boy" (title on cover) while the listing title is "Black Boy Poems" — both titles appear in Kiminou's catalog; do not merge or rename either without his word. Manifest updated; all 9 covers now present.
