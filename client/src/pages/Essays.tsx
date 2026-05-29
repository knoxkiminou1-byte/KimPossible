import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";
import { kiminouEntity } from "@shared/entity/kiminou";
import { ExternalLink } from "lucide-react";

type MediumItem = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  categories: string[];
  thumbnail: string;
  source: "Medium";
};

export default function Essays() {
  const { data: mediumData } = useQuery<{ items: MediumItem[]; error: string | null }>({
    queryKey: ["/api/external/medium"],
  });
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts?published=true"],
  });

  const mediumItems = mediumData?.items ?? [];

  return (
    <>
      <Helmet>
        <title>Essays by Kiminou Knox - Medium Writing, Faith, Black Boy Life & Creative Voice</title>
        <meta name="description" content="Read essays, poems, reflections, and public writing by Kiminou Knox, a Bay Area author, athlete, program builder, podcast host, and creator writing on faith, resilience, love, healing, Black boy life, and discipline." />
        <link rel="canonical" href="https://www.kiminouknox.com/essays" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Essays</p>
          <h1 className="font-serif text-5xl font-bold text-foreground">Essays by Kiminou Knox</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Public writing from Kiminou Knox across Medium and the official site, centered on faith, discipline, love, healing, Black boy life, creative voice, and youth-centered storytelling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={kiminouEntity.publicProfiles.find((profile) => profile.label === "Medium")?.url} target="_blank" rel="noopener noreferrer external">
              <Button>Read on Medium <ExternalLink className="ml-2 h-4 w-4" /></Button>
            </a>
            <Link href="/blog"><Button variant="outline">Local Blog</Button></Link>
            <Link href="/kimyaps"><Button variant="outline">KimYaps</Button></Link>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-semibold">Latest Medium Essays</h2>
          {mediumData?.error && (
            <p className="mb-6 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
              Medium is temporarily unavailable, so this section will refresh automatically when the feed returns.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mediumItems.map((item) => (
              <article key={item.link} className="rounded-lg border border-border bg-card p-6">
                <Badge variant="outline">{item.source}</Badge>
                <h3 className="mt-4 text-xl font-semibold leading-snug">{item.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">{item.excerpt}</p>
                <a className="mt-5 inline-flex items-center text-sm font-medium text-primary" href={item.link} target="_blank" rel="noopener noreferrer external">
                  Read on Medium <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </article>
            ))}
            {mediumItems.length === 0 && !mediumData?.error && (
              <p className="text-muted-foreground">Medium essays will appear here automatically when available.</p>
            )}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-semibold">Official Site Writing</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-medium text-primary">
                  Read local article
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
