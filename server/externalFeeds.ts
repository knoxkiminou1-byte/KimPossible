import { kiminouEntity } from "@shared/entity/kiminou";

type CacheEntry<T> = {
  expiresAt: number;
  data: T;
};

export type MediumItem = {
  title: string;
  slug: string;
  link: string;
  pubDate: string;
  author: string;
  excerpt: string;
  categories: string[];
  thumbnail: string;
  source: "Medium";
};

export type PodcastItem = {
  title: string;
  episodeTitle: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string;
  episodeUrl: string;
  image: string;
  source: string;
};

const MEDIUM_FEED_URL = "https://medium.com/feed/@knoxkiminou1";
const ONE_HOUR = 60 * 60 * 1000;

let mediumCache: CacheEntry<{ items: MediumItem[]; error: string | null }> | null = null;
let podcastCache: CacheEntry<{ profile: typeof kiminouEntity.podcastProfiles; items: PodcastItem[]; error: string | null }> | null = null;

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function textFromXml(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1].trim()) : "";
}

function allTextFromXml(xml: string, tag: string) {
  return Array.from(xml.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "gi"))).map((match) =>
    decodeEntities(match[1].trim()),
  );
}

function stripHtml(value: string) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugFromLink(link: string, title: string) {
  const pathSlug = link.split("/").filter(Boolean).pop();
  if (pathSlug) return pathSlug.split("?")[0];
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function imageFromHtml(value: string) {
  const match = value.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "";
}

function parseMediumFeed(xml: string): MediumItem[] {
  const itemBlocks = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)).map((match) => match[1]);
  return itemBlocks.slice(0, 12).map((item) => {
    const title = textFromXml(item, "title");
    const link = textFromXml(item, "link");
    const encoded = textFromXml(item, "content:encoded") || textFromXml(item, "description");
    return {
      title,
      slug: slugFromLink(link, title),
      link,
      pubDate: textFromXml(item, "pubDate"),
      author: textFromXml(item, "dc:creator") || "Kiminou Knox",
      excerpt: stripHtml(encoded).slice(0, 240),
      categories: allTextFromXml(item, "category"),
      thumbnail: imageFromHtml(encoded),
      source: "Medium",
    };
  });
}

function parsePodcastFeed(xml: string): PodcastItem[] {
  const channelTitle = textFromXml(xml, "title") || "KimYaps";
  const channelImage = textFromXml(xml, "itunes:image") || "";
  const itemBlocks = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)).map((match) => match[1]);
  return itemBlocks.slice(0, 12).map((item) => {
    const enclosure = item.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*>/i);
    const episodeImage = item.match(/<itunes:image[^>]+href=["']([^"']+)["'][^>]*>/i);
    const episodeTitle = textFromXml(item, "title");
    return {
      title: channelTitle,
      episodeTitle,
      description: stripHtml(textFromXml(item, "description") || textFromXml(item, "content:encoded")).slice(0, 320),
      pubDate: textFromXml(item, "pubDate"),
      duration: textFromXml(item, "itunes:duration"),
      audioUrl: enclosure?.[1] ?? "",
      episodeUrl: textFromXml(item, "link"),
      image: episodeImage?.[1] ?? channelImage,
      source: "Podcast RSS",
    };
  });
}

export async function getMediumFeed() {
  if (mediumCache && Date.now() < mediumCache.expiresAt) {
    return mediumCache.data;
  }

  try {
    const response = await fetch(MEDIUM_FEED_URL, {
      headers: { "User-Agent": "kiminouknox.com entity hub" },
    });
    if (!response.ok) throw new Error(`Medium returned ${response.status}`);
    const xml = await response.text();
    const data = { items: parseMediumFeed(xml), error: null };
    mediumCache = { data, expiresAt: Date.now() + ONE_HOUR };
    return data;
  } catch (error) {
    const data = { items: [] as MediumItem[], error: error instanceof Error ? error.message : "Medium unavailable" };
    mediumCache = { data, expiresAt: Date.now() + 10 * 60 * 1000 };
    return data;
  }
}

export async function getPodcastFeed() {
  if (podcastCache && Date.now() < podcastCache.expiresAt) {
    return podcastCache.data;
  }

  const profile = {
    ...kiminouEntity.podcastProfiles,
    rss: process.env.PODCAST_RSS_URL || kiminouEntity.podcastProfiles.rss,
    spotify: process.env.SPOTIFY_PODCAST_URL || kiminouEntity.podcastProfiles.spotify,
  };

  if (!profile.rss) {
    const data = { profile, items: [] as PodcastItem[], error: null };
    podcastCache = { data, expiresAt: Date.now() + ONE_HOUR };
    return data;
  }

  try {
    const response = await fetch(profile.rss, {
      headers: { "User-Agent": "kiminouknox.com podcast hub" },
    });
    if (!response.ok) throw new Error(`Podcast RSS returned ${response.status}`);
    const xml = await response.text();
    const data = { profile, items: parsePodcastFeed(xml), error: null };
    podcastCache = { data, expiresAt: Date.now() + ONE_HOUR };
    return data;
  } catch (error) {
    const data = { profile, items: [] as PodcastItem[], error: error instanceof Error ? error.message : "Podcast feed unavailable" };
    podcastCache = { data, expiresAt: Date.now() + 10 * 60 * 1000 };
    return data;
  }
}
