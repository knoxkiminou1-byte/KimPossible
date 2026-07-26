import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const kiminouRoot = path.join(repoRoot, "artifacts", "kiminou");
const canonicalPath = path.join(kiminouRoot, "src", "content", "books.json");
const publicRoot = path.join(kiminouRoot, "public");

const books = JSON.parse(fs.readFileSync(canonicalPath, "utf8"));

const ids = new Set();
for (const book of books) {
  if (ids.has(book.id)) {
    throw new Error(`[generate-books] Duplicate book id: ${book.id}`);
  }
  ids.add(book.id);
}

// Normalize the collection fields every consumer iterates over. Entries in the
// source catalog legitimately omit these, and a missing array threw during
// render on /books — blanking the page. Filling them in here means the shipped
// books.json always matches the shape the UI reads.
const normalized = books.map((book) => ({
  ...book,
  samplePoems: Array.isArray(book.samplePoems) ? book.samplePoems : [],
  themes: Array.isArray(book.themes) ? book.themes : [],
  buyLinks: book.buyLinks && typeof book.buyLinks === "object" ? book.buyLinks : {},
}));

const json = `${JSON.stringify(normalized, null, 2)}\n`;

fs.writeFileSync(path.join(publicRoot, "books.json"), json);
fs.writeFileSync(path.join(publicRoot, "books-full.json"), json);

console.log(`[generate-books] Wrote ${normalized.length} books to public/books.json and public/books-full.json`);
