import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Builds the derived files for owner-approved photos in kiminouImages.json:
// responsive WebP widths for srcset, and a 1200x630 social share card each.
// Originals under /photos/kiminou-knox/ are never rewritten. sharp drops
// EXIF/GPS from derivatives by default.

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "artifacts", "kiminou");
const publicRoot = path.join(siteRoot, "public");
const catalogPath = path.join(siteRoot, "src", "content", "kiminouImages.json");

// Keep in sync with RESPONSIVE_WIDTHS in src/lib/kiminouMedia.ts.
const RESPONSIVE_WIDTHS = [480, 960, 1600];
const WEBP_QUALITY = 80;
const SOCIAL_CARD = { width: 1200, height: 630 };

function variantPath(src, width) {
  const dir = path.posix.dirname(src);
  const base = path.posix.basename(src, path.posix.extname(src));
  return `${dir}/responsive/${base}-${width}w.webp`;
}

// Keep in sync with socialCardPath in scripts/generate-seo.mjs.
function socialCardPath(src) {
  const dir = path.posix.dirname(src);
  const base = path.posix.basename(src, path.posix.extname(src));
  return `${dir}/social/${base}-${SOCIAL_CARD.width}x${SOCIAL_CARD.height}.jpg`;
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const approved = catalog.images.filter((image) => image.approved);
let written = 0;

for (const image of approved) {
  const source = path.join(publicRoot, image.src);
  const meta = await sharp(source).metadata();
  if (meta.width !== image.width || meta.height !== image.height) {
    throw new Error(`[photos] ${image.id}: catalog says ${image.width}x${image.height}, file is ${meta.width}x${meta.height}`);
  }

  for (const width of RESPONSIVE_WIDTHS.filter((w) => w < image.width)) {
    const out = path.join(publicRoot, variantPath(image.src, width));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(source).resize({ width }).webp({ quality: WEBP_QUALITY }).toFile(out);
    written += 1;
  }

  // Letterbox instead of cropping: link previews crop tall photos through the face.
  const fitted = await sharp(source)
    .resize({ width: SOCIAL_CARD.width, height: SOCIAL_CARD.height, fit: "inside" })
    .toBuffer();
  const card = path.join(publicRoot, socialCardPath(image.src));
  fs.mkdirSync(path.dirname(card), { recursive: true });
  await sharp({
    create: { width: SOCIAL_CARD.width, height: SOCIAL_CARD.height, channels: 3, background: "#090705" },
  })
    .composite([{ input: fitted, gravity: "center" }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(card);
  written += 1;
}

console.log(`[photos] Wrote ${written} derived files for ${approved.length} approved photos.`);
