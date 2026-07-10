import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const repoRoot = process.cwd();
const publicRoot = path.join(repoRoot, "artifacts", "kiminou", "public");

const MAX_DIMENSION = 2200;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;
const MIN_SIZE_TO_TOUCH = 250 * 1024; // 250KB — skip files already small
const SKIP_DIRS = new Set(["node_modules"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const targets = walk(publicRoot).filter((f) => fs.statSync(f).size >= MIN_SIZE_TO_TOUCH);

let totalBefore = 0;
let totalAfter = 0;

for (const file of targets) {
  const before = fs.statSync(file).size;
  const isPng = /\.png$/i.test(file);
  const image = sharp(file);
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > MAX_DIMENSION) {
    pipeline = pipeline.resize({ width: MAX_DIMENSION });
  }
  pipeline = isPng
    ? pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

  const buffer = await pipeline.toBuffer();

  if (buffer.length < before) {
    fs.writeFileSync(file, buffer);
    totalBefore += before;
    totalAfter += buffer.length;
    console.log(
      `[optimize-images] ${path.relative(publicRoot, file)}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(buffer.length / 1024 / 1024).toFixed(2)}MB`,
    );
  } else {
    console.log(`[optimize-images] ${path.relative(publicRoot, file)}: already optimal, skipped`);
  }
}

console.log(
  `\n[optimize-images] Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (${targets.length} files touched)`,
);
