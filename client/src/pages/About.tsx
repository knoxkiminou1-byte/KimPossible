import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.kiminouknox.com/#person",
        "name": "Kiminou Knox",
        "alternateName": "Kiminou",
        "url": "https://www.kiminouknox.com/",
        "image": "https://www.kiminouknox.com/author-kiminou.jpg",
        "description": "Bay Area author, poet, athlete, speaker, and program builder working across books, poems, basketball, speaking, and youth-facing projects.",
        "jobTitle": "Author, poet, athlete, speaker, and program builder",
        "affiliation": [{
          "@type": "Organization",
          "name": "Artists and Athletes for Change"
        }],
        "sameAs": [
          "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2",
          "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
          "https://prephoops.com/player/kiminou-knox/",
          "https://www.goodreads.com/author/show/55621683.Kiminou_Knox",
          "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
          "https://medium.com/@knoxkiminou1/about",
          "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308",
          "https://www.youtube.com/@KiminouKnoxOfficial",
          "https://about.me/kiminou",
          "https://stan.store/kiminou",
          "https://www.wikidata.org/wiki/Q137260299",
          "https://www.instagram.com/kiminouknox",
          "https://www.linkedin.com/in/kiminou-knox-50691a394/",
          "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.kiminouknox.com/#website",
        "url": "https://www.kiminouknox.com/",
        "name": "Kiminou Knox",
        "publisher": { "@id": "https://www.kiminouknox.com/#person" },
        "inLanguage": "en"
      },
      {
        "@type": "ProfilePage",
        "@id": "https://www.kiminouknox.com/about#webpage",
        "url": "https://www.kiminouknox.com/about",
        "name": "About",
        "isPartOf": { "@id": "https://www.kiminouknox.com/#website" },
        "about": { "@id": "https://www.kiminouknox.com/#person" },
        "mainEntity": { "@id": "https://www.kiminouknox.com/#person" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.kiminouknox.com/author-kiminou.jpg"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>About - Kiminou Knox</title>
        <meta name="description" content="Bay Area author, poet, athlete, speaker, and program builder. Books, poems, basketball, speaking, and youth-facing projects." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.kiminouknox.com/about" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About - Kiminou Knox" />
        <meta property="og:site_name" content="Kiminou Knox" />
        <meta property="og:description" content="Bay Area author, poet, athlete, speaker, and program builder working across books, poems, basketball, speaking, and youth-facing projects." />
        <meta property="og:url" content="https://www.kiminouknox.com/about" />
        <meta property="og:image" content="https://www.kiminouknox.com/author-kiminou.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - Kiminou Knox" />
        <meta name="twitter:description" content="Bay Area author, poet, athlete, speaker, and program builder." />
        <meta name="twitter:image" content="https://www.kiminouknox.com/author-kiminou.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="about-heading">
              Kiminou Knox
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-foreground leading-relaxed text-lg">
              <p data-testid="about-intro">
                Kiminou Knox is a Bay Area writer, athlete, program builder, author, chief editor, podcast host, and creator from the Oakland / East Palo Alto community, building across books, essays, KimYaps, AAFC (Artists and Athletes for Change), web design, athletics, and youth-centered storytelling.
              </p>

              <p data-testid="about-stats">
                The work now spans an eight-title authored book catalog, chief-editor credits on client book projects, KimYaps, Medium essays, AAFC program work, AAFC Builders, athletics, speaking, and community-facing creative work. I try to keep the same standard in each space: prepare seriously, stay close to the people I serve, and finish what I start.
              </p>

              <p data-testid="about-family">
                My family is the center of that standard. My mother, Rashida Knox, shaped my sense of discipline and presentation. My grandmother, Dr. Faye McNair Knox, served the One East Palo Alto community as its executive director and taught me that service is something you keep renewing.
              </p>

              <p data-testid="about-work">
                On the page, I explore Black boy life, love, and becoming through verse and narrative. On the court, I play forward and center, bringing the same discipline to both arenas. The principles remain constant: show up, do the work, leave every space better than you found it.
              </p>

              <p data-testid="about-books">
                My featured book titles include Kiminou's World of Imagination: The Basics, Poems from a Black Boy, Black Boy Poems, Our Father, Boys Raised in Silence, The Spirit of Solomon, Hopeless Romantic, and The Adventures of Kiminou the Great and Chua the Wise. I am continuing to build those books into a larger body of poems, stories, essays, readings, and media.
              </p>

              <p data-testid="about-speaking">
                As a speaker, I work with teams, schools, and community groups on writing, discipline, grief, faith, and how young people can find a voice without performing one.
              </p>

              <section aria-labelledby="quick-facts">
                <h2 id="quick-facts" className="font-serif text-3xl font-semibold">Quick Facts</h2>
                <dl className="mt-4 grid gap-3 text-base md:grid-cols-2">
                  <div><dt className="font-semibold">From</dt><dd>Oakland / East Palo Alto community</dd></div>
                  <div><dt className="font-semibold">Roles</dt><dd>Writer, Athlete, Program Builder, Author, Chief Editor, Podcast Host, Creator</dd></div>
                  <div><dt className="font-semibold">Known for</dt><dd>Books, KimYaps, Medium essays, AAFC, AAFC Builders, web design, athletics</dd></div>
                  <div><dt className="font-semibold">Authored catalog</dt><dd>Eight featured authored books</dd></div>
                  <div><dt className="font-semibold">Editorial credits</dt><dd>Rhythm & Roux and Voicing The Lens as chief-editor/client book projects</dd></div>
                  <div><dt className="font-semibold">Recognition</dt><dd>Miles Hall Foundation / Breaking Barriers essay recognition</dd></div>
                </dl>
              </section>

              <section aria-labelledby="about-links">
                <h2 id="about-links" className="font-serif text-3xl font-semibold">Official Links</h2>
                <div className="mt-4 flex flex-wrap gap-3 text-base">
                  <a className="underline" href="https://medium.com/@knoxkiminou1/about" target="_blank" rel="noopener noreferrer">Medium</a>
                  <a className="underline" href="https://www.goodreads.com/author/show/55621683.Kiminou_Knox" target="_blank" rel="noopener noreferrer">Goodreads</a>
                  <a className="underline" href="https://podcasts.apple.com/us/podcast/kimyaps/id1850364308" target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
                  <a className="underline" href="https://www.youtube.com/@KiminouKnoxOfficial" target="_blank" rel="noopener noreferrer">YouTube</a>
                  <a className="underline" href="https://www.linkedin.com/in/kiminou-knox-50691a394" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a className="underline" href="https://about.me/kiminou" target="_blank" rel="noopener noreferrer">About.me</a>
                  <a className="underline" href="https://www.wikidata.org/wiki/Q137260299" target="_blank" rel="noopener noreferrer">Wikidata</a>
                </div>
              </section>

              <section aria-labelledby="lanes">
                <h2 id="lanes" className="font-serif text-3xl font-semibold">Public Work Lanes</h2>
                <div className="mt-4 grid gap-4 text-base md:grid-cols-2">
                  <p><strong>KimYaps:</strong> podcast work on faith, discipline, identity, culture, relationships, emotional growth, apologetics, and reflection.</p>
                  <p><strong>Essays:</strong> Medium and official-site writing on faith, resilience, love, healing, Black boy life, and discipline.</p>
                  <p><strong>AAFC Builders:</strong> websites, landing pages, digital infrastructure, and brand systems.</p>
                  <p><strong>Athletics:</strong> public athletic profiles are presented as broad verification links, not as stat-first identity.</p>
                </div>
              </section>

              <p data-testid="about-closing" className="font-medium">
                Thank you for taking the time to read. The work is still growing.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
