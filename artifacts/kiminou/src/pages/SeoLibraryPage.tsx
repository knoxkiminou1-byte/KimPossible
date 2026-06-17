import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import seoLibrary from "@/content/seoLibrary.json";

type SeoLibraryPageData = {
  loc: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  keywords: string[];
  image: string;
  schemaType: string;
  sections: Array<{ heading: string; text: string }>;
  excerpts: Array<{ title: string; source: string; text: string; href: string }>;
  links: Array<{ label: string; href: string }>;
};

const pages = seoLibrary.pages as SeoLibraryPageData[];

function pageForLocation(pathname: string) {
  return pages.find((page) => page.loc === pathname) || pages[0];
}

export default function SeoLibraryPage() {
  const [location] = useLocation();
  const page = pageForLocation(location);
  const canonicalUrl = `${SITE_URL}${page.loc}`;
  const imageUrl = page.image.startsWith("http") ? page.image : `${SITE_URL}${page.image}`;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": page.schemaType || "CollectionPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    image: imageUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
    mainEntity: page.excerpts.map((excerpt) => ({
      "@type": "CreativeWork",
      name: excerpt.title,
      isPartOf: excerpt.source,
      text: excerpt.text,
      url: `${SITE_URL}${excerpt.href}`,
      author: { "@id": `${SITE_URL}/#person` },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="keywords" content={page.keywords.join(", ")} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: page.eyebrow, url: canonicalUrl },
            ]),
          )}
        </script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-10">
          <div className="absolute inset-0 opacity-24">
            <img src={page.image} alt="" className="h-full w-full object-cover" loading="eager" decoding="async" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/88 to-black" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-amber-300/65">
              {page.eyebrow}
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-light leading-tight text-white md:text-7xl">
              {page.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/58 md:text-lg">
              {page.intro}
            </p>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.018] px-6 py-8 lg:px-10">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-3">
            {page.links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="inline-flex cursor-pointer items-center gap-2 border border-white/12 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/52 transition-colors hover:border-amber-300/40 hover:text-amber-200">
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-amber-300/58">Reader Notes</p>
            <div className="space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-2xl font-light text-white">{section.heading}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/45">{section.text}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {page.excerpts.map((excerpt) => (
              <article key={`${excerpt.source}-${excerpt.title}`} className="border border-white/10 bg-white/[0.024] p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-amber-300/54">{excerpt.source}</p>
                  <BookOpen className="h-4 w-4 text-white/22" />
                </div>
                <h2 className="font-serif text-2xl font-light text-white">{excerpt.title}</h2>
                <blockquote className="mt-4 border-l border-amber-300/35 pl-5 font-serif text-xl leading-9 text-white/68">
                  {excerpt.text}
                </blockquote>
                <Link href={excerpt.href}>
                  <span className="mt-6 inline-flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber-300/68 transition-colors hover:text-amber-200">
                    Read the source
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
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
