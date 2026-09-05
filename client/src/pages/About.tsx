import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://kiminouknox.com/#person",
        "name": "Kiminou Knox",
        "alternateName": "Kiminou",
        "url": "https://kiminouknox.com/",
        "image": "https://kiminouknox.com/media/headshot.jpg",
        "description": "Bay Area raised, New Orleans based author and poet. Author of ten books and host of KimYaps.",
        "jobTitle": "Author and Poet",
        "affiliation": [{
          "@type": "Organization",
          "name": "Artists and Athletes for Change"
        }],
        "sameAs": [
          "https://x.com/KnoxKiminou",
          "https://www.youtube.com/@KiminouKnoxOfficial",
          "https://www.tiktok.com/@kiminou.knox",
          "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
          "https://kiminouknox.com/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://kiminouknox.com/#website",
        "url": "https://kiminouknox.com/",
        "name": "Kiminou Knox",
        "publisher": { "@id": "https://kiminouknox.com/#person" },
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": "https://kiminouknox.com/about#webpage",
        "url": "https://kiminouknox.com/about",
        "name": "About",
        "isPartOf": { "@id": "https://kiminouknox.com/#website" },
        "about": { "@id": "https://kiminouknox.com/#person" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://kiminouknox.com/media/headshot.jpg"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>About - Kiminou Knox</title>
        <meta name="description" content="Kiminou Knox is a Bay Area raised, New Orleans based author and poet. He is the author of ten books and host of KimYaps." />
        <link rel="canonical" href="https://kiminouknox.com/about" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About - Kiminou Knox" />
        <meta property="og:description" content="Bay Area raised, New Orleans based author and poet. Ten books. Host of KimYaps." />
        <meta property="og:url" content="https://kiminouknox.com/about" />
        <meta property="og:image" content="https://kiminouknox.com/og/about.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - Kiminou Knox" />
        <meta name="twitter:description" content="Bay Area raised, New Orleans based author and poet" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/about.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="about-heading">
              About
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-foreground leading-relaxed text-lg">
              <p data-testid="about-intro">
                I am a Bay Area raised, New Orleans based author and poet. I write books and essays about Black boyhood, faith, love, grief, masculinity, family, and becoming.
              </p>

              <p data-testid="about-stats">
                My work includes ten distinct original books and KimYaps. Athletics, speaking, music, AAFC, faith work, Social Following Studios, and technology work remain secondary public rooms.
              </p>

              <p data-testid="about-family">
                My family serves as my compass. I am the son of Rashida Knox, a distinguished Bay Area marketer and presidential singer whose dedication to excellence shapes my approach to every endeavor. My grandmother, Dr. Faye McNair Knox, devoted her life to serving the One East Palo Alto community as its executive director, teaching me that service is a promise you renew each day.
              </p>

              <p data-testid="about-work">
                On the page, I explore Black boy life, love, and becoming through verse and narrative. On the court, I play forward and center, bringing the same discipline to both arenas. The principles remain constant: show up, do the work, leave every space better than you found it.
              </p>

              <p data-testid="about-books">
                My published books include poetry, faith-centered writing, love poems, Black boyhood, family, imagination, and legacy. Revised, remastered, and alternate editions are editions rather than new original works.
              </p>

              <p data-testid="about-speaking">
                As a speaker, I address craft, discipline, voice, and the cost of silence. I collaborate with teams, schools, and community organizations to transform ideas into meaningful action that creates lasting change.
              </p>

              <p data-testid="about-closing" className="font-medium">
                Thank you for taking the time to learn about my journey. Together, let us build work that endures.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
