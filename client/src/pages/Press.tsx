import { Helmet } from "react-helmet";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

type VerificationLink = {
  name: string;
  source: string;
  detail: string;
  link: string;
};

const recognitionItems = [
  {
    date: "May 5, 2025",
    source: "Miles Hall Foundation",
    fact: "Essay recognition announcement tied to youth advocacy and mental health.",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
  },
  {
    date: "February 2025",
    source: "Miles Hall Foundation Youth Summit",
    fact: "Top essay finalist recognition.",
    link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
  }
];

const verificationGroups: Array<{ title: string; items: VerificationLink[] }> = [
  {
    title: "Books",
    items: [
      {
        name: "Amazon Author Store",
        source: "Amazon",
        detail: "Author storefront and retail listings.",
        link: "https://www.amazon.com/stores/author/B0DGM5Z5Q8"
      },
      {
        name: "Goodreads Author Profile",
        source: "Goodreads",
        detail: "Reader-facing author profile and book records.",
        link: "https://www.goodreads.com/author/show/Kiminou_Knox"
      },
      {
        name: "Google Play Books Listings",
        source: "Google Play Books",
        detail: "Search results for Kiminou Knox books on Google.",
        link: "https://play.google.com/store/search?q=Kiminou%20Knox&c=books"
      }
    ]
  },
  {
    title: "Basketball",
    items: [
      {
        name: "MaxPreps Basketball Profile",
        source: "MaxPreps",
        detail: "Athlete profile and basketball stats.",
        link: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2"
      },
      {
        name: "NCSA Recruiting Profile",
        source: "NCSA",
        detail: "Basketball recruiting profile.",
        link: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox"
      },
      {
        name: "Prep Hoops Profile",
        source: "Prep Hoops",
        detail: "Basketball profile and player listing.",
        link: "https://prephoops.com/player/kiminou-knox/"
      }
    ]
  },
  {
    title: "Profiles",
    items: [
      {
        name: "LinkedIn",
        source: "LinkedIn",
        detail: "Professional profile.",
        link: "https://www.linkedin.com/in/kiminou-knox-50691a394/"
      },
      {
        name: "Instagram",
        source: "Instagram",
        detail: "Public social profile.",
        link: "https://www.instagram.com/kiminouknox"
      },
      {
        name: "Spotify Show",
        source: "Spotify",
        detail: "Audio profile connected to Kiminou Knox.",
        link: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg"
      }
    ]
  }
];

const schemaLinks = [
  ...recognitionItems.map((item) => ({
    name: item.source,
    source: item.source,
    detail: item.fact,
    link: item.link
  })),
  ...verificationGroups.flatMap((group) => group.items)
];

export default function Press() {
  const pressSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.kiminouknox.com/press#webpage",
        "url": "https://www.kiminouknox.com/press",
        "name": "Verification & Press - Kiminou Knox",
        "description": "Public links, book listings, athletics profiles, and recognition sources that help verify Kiminou Knox online.",
        "about": {
          "@type": "Person",
          "@id": "https://www.kiminouknox.com/#person",
          "name": "Kiminou Knox",
          "url": "https://www.kiminouknox.com/"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://www.kiminouknox.com/press#verification-list",
        "name": "Public verification links for Kiminou Knox",
        "itemListElement": schemaLinks.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "WebPage",
            "name": item.name,
            "url": item.link,
            "publisher": {
              "@type": "Organization",
              "name": item.source
            },
            "about": item.detail
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.kiminouknox.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Verification & Press",
            "item": "https://www.kiminouknox.com/press"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Verification & Press - Kiminou Knox</title>
        <meta name="description" content="Public links, book listings, athletics profiles, and recognition sources that help verify Kiminou Knox online." />
        <link rel="canonical" href="https://www.kiminouknox.com/press" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Verification & Press - Kiminou Knox" />
        <meta property="og:description" content="Public proof links, book listings, athletics profiles, and recognition sources for Kiminou Knox." />
        <meta property="og:url" content="https://www.kiminouknox.com/press" />
        <meta property="og:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Verification & Press - Kiminou Knox" />
        <meta name="twitter:description" content="Public proof links, book listings, athletics profiles, and recognition sources for Kiminou Knox." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(pressSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Verification
            </p>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="press-heading">
              Press & Public Profiles
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Public sources for books, basketball, recognition, and profile verification. Media and booking requests can go through the <Link href="/contact" className="underline hover:text-foreground transition-colors">contact form</Link>.
            </p>
          </div>

          <section className="mb-16" aria-labelledby="recognition-heading">
            <h2 id="recognition-heading" className="mb-6 font-serif text-3xl font-semibold text-foreground">
              Recognition
            </h2>
            <div className="space-y-5">
              {recognitionItems.map((item, index) => (
                <article
                  key={`${item.source}-${item.date}`}
                  className="border-l-4 border-accent pl-6 py-4 hover:bg-accent/5 transition-colors"
                  data-testid={`press-item-${index}`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                      <h3 className="font-semibold text-foreground mb-2">{item.source}</h3>
                      <p className="text-muted-foreground">{item.fact}</p>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                      data-testid={`press-link-${index}`}
                    >
                      View source
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="verification-heading">
            <h2 id="verification-heading" className="mb-6 font-serif text-3xl font-semibold text-foreground">
              Verification Links
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {verificationGroups.map((group) => (
                <div key={group.title} className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <a
                        key={item.link}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/5"
                      >
                        <span className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-semibold text-foreground">{item.name}</span>
                          <ExternalLink className="h-4 w-4 shrink-0 text-primary" />
                        </span>
                        <span className="block text-sm text-muted-foreground">
                          {item.source} - {item.detail}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
