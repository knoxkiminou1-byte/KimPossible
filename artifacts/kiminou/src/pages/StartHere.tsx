import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KIMINOU_IMAGES } from "@/lib/kiminouMedia";
import {
  breadcrumbSchema,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_PODCAST_APPLE,
  SITE_PODCAST_SPOTIFY,
  SITE_URL,
} from "@/lib/seo";

const quickPaths = [
  {
    label: "Read The Books",
    href: "/books",
    kicker: "Poetry, faith, love, Black boyhood, and imagination.",
  },
  {
    label: "Meet The Author",
    href: "/author",
    kicker: "The voice, the world, and the Black Boy Lie universe.",
  },
  {
    label: "Book The Room",
    href: "/speaking",
    kicker: "Schools, teams, youth programs, faith, discipline, and voice.",
  },
  {
    label: "Verify The Profile",
    href: "/press",
    kicker: "Press links, public references, recognition, and official profiles.",
  },
];

const proofPoints = [
  "Eight published works",
  "NCAA-registered multi-sport athlete",
  "Host of KimYaps",
  "Miles Hall Foundation Youth Summit Top Essay Finalist",
  "Bay Area writer and program builder",
];

const externalLinks = [
  { label: "Apple Podcasts", href: SITE_PODCAST_APPLE },
  { label: "Spotify", href: SITE_PODCAST_SPOTIFY },
  { label: "Medium", href: "https://medium.com/@knoxkiminou1" },
  { label: "YouTube", href: "https://www.youtube.com/@KiminouKnoxOfficial" },
];

const startHereSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/start-here#webpage`,
  url: `${SITE_URL}/start-here`,
  name: "Start Here | Kiminou Knox",
  description:
    "Start here for the clearest introduction to Kiminou Knox: books, author profile, KimYaps, athletics, speaking, and press links.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}${KIMINOU_IMAGES.officialHeadshot.src}`,
    name: KIMINOU_IMAGES.officialHeadshot.title,
    caption: KIMINOU_IMAGES.officialHeadshot.caption,
    width: KIMINOU_IMAGES.officialHeadshot.width,
    height: KIMINOU_IMAGES.officialHeadshot.height,
  },
};

export default function StartHere() {
  return (
    <>
      <Helmet>
        <title>Start Here | Kiminou Knox</title>
        <meta
          name="description"
          content="Start here for Kiminou Knox: books, author profile, KimYaps podcast, athletics, speaking, press links, and the cleanest path through the full public brand."
        />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={`${SITE_URL}/start-here`} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Start Here | Kiminou Knox" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/start-here`} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Start Here | Kiminou Knox" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(startHereSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Start Here", url: `${SITE_URL}/start-here` },
            ]),
          )}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-black text-white">
        <section className="relative min-h-[92vh] overflow-hidden pt-28 md:pt-36">
          <img
            src={KIMINOU_IMAGES.officialHeadshot.src}
            alt={KIMINOU_IMAGES.officialHeadshot.alt}
            width={KIMINOU_IMAGES.officialHeadshot.width}
            height={KIMINOU_IMAGES.officialHeadshot.height}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_28%] opacity-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.74)_45%,rgba(0,0,0,0.42)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-6 pb-16 lg:px-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-amber-300/70">
              Start Here
            </p>
            <h1 className="max-w-5xl font-serif text-5xl font-light leading-[0.98] text-white md:text-7xl lg:text-8xl">
              Kiminou Knox is building one public world from books, sport, faith, and voice.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/58 md:text-lg">
              Bay Area poet and author. NCAA-registered multi-sport athlete. Host of KimYaps. Speaker and program builder. This page is the cleanest doorway into the full body of work.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/books">
                <span className="inline-flex cursor-pointer items-center gap-3 bg-amber-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-amber-200">
                  Books
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/press">
                <span className="inline-flex cursor-pointer items-center gap-3 border border-white/18 bg-black/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm transition-colors hover:border-amber-300/50 hover:text-amber-200">
                  Press Kit
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.018] py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-6 lg:px-10">
            {proofPoints.map((point) => (
              <p key={point} className="text-[11px] uppercase tracking-[0.25em] text-white/36">
                {point}
              </p>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.38em] text-amber-300/60">The Position</p>
            <h2 className="font-serif text-3xl font-light leading-tight text-white md:text-5xl">
              Young enough to feel current. Serious enough to already have a catalog.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/45">
              The strongest public lane is not only author, only athlete, or only speaker. It is the combination: a young Bay Area writer-athlete turning lived pressure into books, podcast episodes, essays, talks, and youth-centered work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quickPaths.map((path) => (
              <Link key={path.href} href={path.href}>
                <article className="group min-h-[188px] cursor-pointer border border-white/10 bg-white/[0.026] p-6 transition-colors hover:border-amber-300/35">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-amber-300/55">
                      {path.label}
                    </p>
                    <ArrowRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-amber-200" />
                  </div>
                  <p className="text-sm leading-7 text-white/50">{path.kicker}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-white/8 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.38em] text-amber-300/60">KimYaps</p>
              <h2 className="font-serif text-3xl font-light leading-tight text-white md:text-5xl">
                The voice lane is the growth lane.
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45">
                KimYaps is where the writing voice becomes portable: faith, pressure, relationships, culture, Black boy life, discipline, and grace in a room-based thinking style that sounds human before it sounds polished.
              </p>
            </div>
            <div className="grid content-start gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-white/10 px-5 py-4 text-sm text-white/54 transition-colors hover:border-amber-300/35 hover:text-amber-200"
                >
                  {link.label}
                  <ExternalLink className="h-4 w-4 text-white/22 transition-colors group-hover:text-amber-200" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
