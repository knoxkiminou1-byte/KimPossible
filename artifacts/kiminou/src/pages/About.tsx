import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConstellationTimeline from "@/components/ConstellationTimeline";
import SplitNarrative from "@/components/SplitNarrative";

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
        "description": "Writer and athlete building books poems and youth facing projects with focus on craft service and lasting impact.",
        "jobTitle": "Writer and athlete",
        "affiliation": [{
          "@type": "Organization",
          "name": "Artists and Athletes for Change"
        }],
        "sameAs": [
          "https://instagram.com/hofkiminou",
          "https://x.com/KiminouKnox",
          "https://x.com/KnoxKiminou",
          "https://www.youtube.com/@KiminouKnoxVevo",
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
        <title>About Kiminou Knox | 19-Year-Old Bay Area Author, Athlete & Entrepreneur</title>
        <meta name="description" content="Kiminou Knox is a 19-year-old writer, NCAA basketball athlete, and entrepreneur from East Palo Alto, California. Creator of the Black Boy Lie universe — 7 published poetry books on faith, identity, and what it means to grow up Black in America." />
        <link rel="canonical" href="https://kiminouknox.com/about" />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About Kiminou Knox | Bay Area Author, Athlete & Entrepreneur" />
        <meta property="og:description" content="19-year-old Bay Area writer, NCAA basketball athlete, and entrepreneur. Creator of the Black Boy Lie universe — 7 published works on faith, identity, and the Black experience." />
        <meta property="og:url" content="https://kiminouknox.com/about" />
        <meta property="og:image" content="https://kiminouknox.com/kiminou-knox-social-share.png" />
        <meta property="og:image:alt" content="Kiminou Knox — Author, Athlete, Entrepreneur" />
        <meta property="og:site_name" content="Kiminou Knox" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KiminouKnox" />
        <meta name="twitter:title" content="About Kiminou Knox | Author, Athlete & Entrepreneur" />
        <meta name="twitter:description" content="19-year-old Bay Area writer, NCAA basketball athlete, and entrepreneur. Creator of the Black Boy Lie universe." />
        <meta name="twitter:image" content="https://kiminouknox.com/kiminou-knox-social-share.png" />
        
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
                I am a 19 year old writer and athlete from East Palo Alto, California, telling stories that carry faith, grit, and love. Through books, poems, and youth focused projects, I create work that helps people feel deeply and act with purpose.
              </p>

              <p data-testid="about-stats">
                My work includes 7 published books and recognition through 5 major awards. Academically, I scored 1380 on the SAT while maintaining excellence in both athletics and creative writing.
              </p>

              <p data-testid="about-family">
                My family serves as my compass. I am the son of Rashida Knox, a distinguished Bay Area marketer and presidential singer whose dedication to excellence shapes my approach to every endeavor. My grandmother, Dr. Faye McNair Knox, devoted her life to serving the One East Palo Alto community as its executive director, teaching me that service is a promise you renew each day.
              </p>

              <p data-testid="about-work">
                On the page, I explore Black boy life, love, and becoming through verse and narrative. On the court, I play forward and center, bringing the same discipline to both arenas. The principles remain constant: show up, do the work, leave every space better than you found it.
              </p>

              <p data-testid="about-books">
                My published works include Black Boy Poems, Our Father, Boys Raised in Silence, The Spirit of Solomon, Hopeless Romantic, and The Adventures of Kiminou the Great and Chua the Wise. I am building an interconnected author universe that weaves together poems, stories, essays, visual media, and live performances into a cohesive body of work.
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

      <SplitNarrative />
      <ConstellationTimeline />
      <Footer />
    </>
  );
}
