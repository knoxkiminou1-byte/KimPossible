import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowUpRight, FileText, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  breadcrumbSchema,
  podcastSchema,
  SITE_PODCAST_AMAZON,
  SITE_PODCAST_APPLE,
  SITE_PODCAST_RSS,
  SITE_PODCAST_SPOTIFY,
  SITE_URL,
  SITE_YOUTUBE,
} from "@/lib/seo";

// Written at build time by scripts/generate-seo.mjs from the Riverside RSS feed,
// so episode titles, dates, audio and transcripts always come from the host.
type Episode = {
  title: string;
  guid: string;
  datePublished: string;
  duration: string;
  description: string;
  audioUrl: string;
  audioType: string;
  transcriptUrl: string;
};

const PAGE_TITLE = "KimYaps Podcast by Kiminou Knox | All Episodes";
const PAGE_DESCRIPTION =
  "KimYaps is where Kiminou Knox talks through faith, Black boyhood, masculinity, relationships, culture, grief, discipline, purpose, love, and the parts of life people usually struggle to say plainly.";

const LISTEN_LINKS = [
  { label: "Apple Podcasts", href: SITE_PODCAST_APPLE },
  { label: "Spotify", href: SITE_PODCAST_SPOTIFY },
  { label: "Amazon Music", href: SITE_PODCAST_AMAZON },
  { label: "YouTube", href: SITE_YOUTUBE },
  { label: "RSS feed", href: SITE_PODCAST_RSS },
];

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

// "PT41M43S" -> "41 min"
function formatDuration(value: string) {
  const match = value.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return "";
  const minutes = Number(match[1] || 0) * 60 + Number(match[2] || 0) + (Number(match[3] || 0) >= 30 ? 1 : 0);
  return minutes ? `${minutes} min` : "";
}

export default function Podcast() {
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/podcast-episodes.json")
      .then((response) => (response.ok ? response.json() : { episodes: [] }))
      .then((data) => {
        if (!cancelled) setEpisodes(Array.isArray(data.episodes) ? data.episodes : []);
      })
      .catch(() => {
        if (!cancelled) setEpisodes([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/podcast`} />
        <link rel="alternate" type="application/rss+xml" title="KimYaps" href={SITE_PODCAST_RSS} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/podcast`} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <script type="application/ld+json">{JSON.stringify(podcastSchema())}</script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "KimYaps Podcast", url: `${SITE_URL}/podcast` },
            ]),
          )}
        </script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative pt-40 pb-14">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-400/72 mb-5 font-medium">Podcast</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight mb-6">KimYaps</h1>
            <div className="w-12 h-px bg-amber-400/50 mb-8" />
            <p className="text-base text-white/65 max-w-2xl leading-relaxed mb-4">{PAGE_DESCRIPTION}</p>
            <p className="text-sm text-white/62 max-w-2xl leading-relaxed mb-10">
              Hosted by <Link href="/author" className="text-amber-200/90 underline underline-offset-4 hover:text-amber-200">Kiminou Knox</Link>,
              a Bay Area raised, New Orleans based author and poet of{" "}
              <Link href="/books" className="text-amber-200/90 underline underline-offset-4 hover:text-amber-200">ten published books</Link>.
            </p>
            <ul className="flex flex-wrap gap-3" aria-label="Listen on">
              {LISTEN_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-white/80 hover:border-amber-400/50 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 transition-colors"
                  >
                    {link.label} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-28 border-t border-white/6" aria-labelledby="episodes-heading">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-14">
            <h2 id="episodes-heading" className="font-serif text-3xl md:text-4xl font-light mb-2">
              All Episodes
            </h2>
            <p className="text-sm text-white/62 mb-10">
              {episodes === null ? "Loading episodes..." : `${episodes.length} episodes, newest first.`}
            </p>

            {episodes?.length === 0 && (
              <p className="text-white/65">
                Episodes are unavailable right now. Listen on{" "}
                <a href={SITE_PODCAST_APPLE} className="text-amber-200/90 underline underline-offset-4">Apple Podcasts</a>.
              </p>
            )}

            <ol className="flex flex-col gap-5">
              {episodes?.map((episode) => (
                <li key={episode.guid || episode.title} className="border border-white/8 bg-white/[0.015] p-6 md:p-7">
                  <article>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-amber-400/72 mb-3">
                      <time dateTime={episode.datePublished}>{formatDate(episode.datePublished)}</time>
                      {formatDuration(episode.duration) && <span> · {formatDuration(episode.duration)}</span>}
                    </p>
                    <h3 className="font-serif text-2xl font-light text-white mb-3">{episode.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed mb-5">{episode.description}</p>
                    <audio
                      controls
                      preload="none"
                      className="w-full mb-3"
                      aria-label={`Play ${episode.title}`}
                    >
                      <source src={episode.audioUrl} type={episode.audioType || "audio/mpeg"} />
                    </audio>
                    <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.2em]">
                      {episode.transcriptUrl && (
                        <a
                          href={episode.transcriptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-white/70 hover:text-amber-200 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" aria-hidden="true" /> Transcript
                          <span className="sr-only"> for {episode.title}</span>
                        </a>
                      )}
                      <a
                        href={SITE_PODCAST_APPLE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-white/70 hover:text-amber-200 transition-colors"
                      >
                        <Headphones className="w-3.5 h-3.5" aria-hidden="true" /> Apple Podcasts
                      </a>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
