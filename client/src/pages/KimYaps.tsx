import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { kiminouEntity } from "@shared/entity/kiminou";
import { ExternalLink } from "lucide-react";

type PodcastItem = {
  episodeTitle: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string;
  episodeUrl: string;
  image: string;
};

export default function KimYaps() {
  const { data } = useQuery<{ profile: typeof kiminouEntity.podcastProfiles; items: PodcastItem[]; error: string | null }>({
    queryKey: ["/api/external/podcast"],
  });

  const profile = data?.profile ?? kiminouEntity.podcastProfiles;
  const episodes = data?.items ?? [];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PodcastSeries",
        "@id": "https://www.kiminouknox.com/kimyaps#podcast",
        name: "KimYaps",
        url: "https://www.kiminouknox.com/kimyaps",
        description: "KimYaps is Kiminou Knox's podcast and public voice lane, centered on faith, discipline, identity, culture, relationships, emotional growth, apologetics, and real-life reflection.",
        webFeed: profile.rss || undefined,
        sameAs: [profile.apple, profile.spotify].filter(Boolean),
        author: { "@id": "https://www.kiminouknox.com/#person" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.kiminouknox.com/" },
          { "@type": "ListItem", position: 2, name: "KimYaps", item: "https://www.kiminouknox.com/kimyaps" },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>KimYaps Podcast - Kiminou Knox on Faith, Culture, Discipline & Identity</title>
        <meta name="description" content="Listen to KimYaps, the podcast by Kiminou Knox exploring faith, discipline, identity, culture, relationships, emotional growth, apologetics, and real-life reflection." />
        <link rel="canonical" href="https://www.kiminouknox.com/kimyaps" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Podcast</p>
          <h1 className="font-serif text-5xl font-bold">KimYaps</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            KimYaps is Kiminou Knox's podcast and public voice lane, centered on faith, discipline, identity, culture, relationships, emotional growth, apologetics, and real-life reflection.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.apple} target="_blank" rel="noopener noreferrer external"><Button>Apple Podcasts <ExternalLink className="ml-2 h-4 w-4" /></Button></a>
            {profile.spotify && <a href={profile.spotify} target="_blank" rel="noopener noreferrer external"><Button variant="outline">Spotify <ExternalLink className="ml-2 h-4 w-4" /></Button></a>}
            {profile.youtube && <a href={profile.youtube} target="_blank" rel="noopener noreferrer external"><Button variant="outline">YouTube <ExternalLink className="ml-2 h-4 w-4" /></Button></a>}
            <Link href="/essays"><Button variant="outline">Related Essays</Button></Link>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-semibold">Latest Episodes</h2>
          {episodes.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-semibold">KimYaps episode feed</h3>
              <p className="mt-3 text-muted-foreground">
                Add `PODCAST_RSS_URL` to show auto-updating episode cards here. Until then, use the Apple Podcasts link for the current public profile.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <article key={episode.episodeUrl || episode.episodeTitle} className="rounded-lg border border-border bg-card p-6">
                  <h3 className="text-xl font-semibold">{episode.episodeTitle}</h3>
                  <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">{episode.description}</p>
                  {episode.episodeUrl && <a className="mt-5 inline-flex text-sm font-medium text-primary" href={episode.episodeUrl} target="_blank" rel="noopener noreferrer external">Listen <ExternalLink className="ml-2 h-4 w-4" /></a>}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-6 lg:px-8">
          <h2 className="mb-4 font-serif text-3xl font-semibold">Host</h2>
          <p className="max-w-3xl text-muted-foreground">{kiminouEntity.shortBio}</p>
          <Link href="/about" className="mt-5 inline-flex text-sm font-medium text-primary">Read the official bio</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
