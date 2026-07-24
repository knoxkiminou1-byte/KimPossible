import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const kiminouRoot = path.join(repoRoot, "artifacts", "kiminou");
const srcRoot = path.join(kiminouRoot, "src");
const publicRoot = path.join(kiminouRoot, "public");

const SCAN_EXTS = new Set([".ts", ".tsx", ".css", ".json", ".xml", ".mjs"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);
const ASSET_EXT_PATTERN =
  "png|jpe?g|webp|gif|svg|ico|pdf|mp3|mp4|wav|m4a|json|xml|txt|webmanifest|css|woff2?|ttf";

const REFERENCE_PATTERNS = [
  new RegExp(`["'\`(](/[A-Za-z0-9_\\-./%]+\\.(?:${ASSET_EXT_PATTERN}))["'\`)?#]`, "g"),
  new RegExp(`url\\((/[A-Za-z0-9_\\-./%]+\\.(?:${ASSET_EXT_PATTERN}))\\)`, "g"),
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SCAN_EXTS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function collectReferences(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const refs = new Set();
  for (const pattern of REFERENCE_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content))) {
      refs.add(match[1]);
    }
  }
  return refs;
}

const scanRoots = [srcRoot, publicRoot];
const filesToScan = scanRoots.flatMap((root) => (fs.existsSync(root) ? walk(root) : []));

const allRefs = new Map(); // asset path -> Set of files referencing it
for (const file of filesToScan) {
  for (const ref of collectReferences(file)) {
    if (!allRefs.has(ref)) allRefs.set(ref, new Set());
    allRefs.get(ref).add(path.relative(repoRoot, file));
  }
}

const missing = [];
for (const [ref, referencedBy] of allRefs) {
  const onDisk = path.join(publicRoot, ref);
  if (!fs.existsSync(onDisk)) {
    missing.push({ ref, referencedBy: [...referencedBy] });
  }
}

if (missing.length > 0) {
  console.error(`[check-assets] Found ${missing.length} missing local asset reference(s):\n`);
  for (const { ref, referencedBy } of missing) {
    console.error(`  ${ref}`);
    for (const file of referencedBy) console.error(`    referenced in ${file}`);
  }
  process.exit(1);
}

console.log(`[check-assets] Scanned ${filesToScan.length} files, ${allRefs.size} unique asset references, 0 missing.`);
