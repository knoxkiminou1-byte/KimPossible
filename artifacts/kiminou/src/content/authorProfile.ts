import profile from "./author-profile.json";

export const PUBLISHED_BOOK_COUNT = profile.publishedBookCount;
export const AUTHOR_COUNT_LABEL = profile.authorCountLabel;
export const AUTHOR_SEARCH_DESCRIPTION = profile.searchDescription;
export const AUTHOR_SHORT_BIO = profile.shortBio;
export const CATALOG_EDITION_NOTE = profile.catalogEditionNote;
export type Publication = {
  venue: string;
  publisher?: string;
  title: string;
  type: string;
  date: string;
  url?: string;
};

export const PUBLICATIONS: Publication[] = profile.publications;
export const CANONICAL_BOOKS = profile.canonicalBooks;
export const CANONICAL_BOOK_TITLES = profile.canonicalBooks.map(({ title }) => title);
export const CANONICAL_BIBLIOGRAPHY_TEXT = CANONICAL_BOOK_TITLES.join("; ");
