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

const json = `${JSON.stringify(books, null, 2)}\n`;

fs.writeFileSync(path.join(publicRoot, "books.json"), json);
fs.writeFileSync(path.join(publicRoot, "books-full.json"), json);

console.log(`[generate-books] Wrote ${books.length} books to public/books.json and public/books-full.json`);
