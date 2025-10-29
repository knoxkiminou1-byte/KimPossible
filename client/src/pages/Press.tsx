import { Helmet } from "react-helmet";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function Press() {
  const pressItems = [
    {
      date: "May 5, 2025",
      source: "Miles Hall Foundation",
      fact: "Essay recognition announcement",
      link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
    },
    {
      date: "February 2025",
      source: "Miles Hall Foundation Youth Summit",
      fact: "Top essay finalist for mental health advocacy",
      link: "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
    },
    {
      date: "2024 2025",
      source: "Amazon",
      fact: "Poetry collections active on major stores",
      link: "https://www.amazon.com/stores/author/B0DGM5Z5Q8"
    }
  ];

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Miles Hall Foundation Youth Summit Top Essay",
    "publisher": {
      "@type": "Organization",
      "name": "Miles Hall Foundation"
    },
    "url": "https://www.themileshallfoundation.org/post/youth-summit-essay-finalist"
  };

  return (
    <>
      <Helmet>
        <title>Press - Kiminou Knox</title>
        <meta name="description" content="Selected features and announcements that verify public facts about the work of writer and athlete Kiminou Knox." />
        <link rel="canonical" href="https://kiminouknox.com/press" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Press - Kiminou Knox" />
        <meta property="og:description" content="Selected features and announcements" />
        <meta property="og:url" content="https://kiminouknox.com/press" />
        <meta property="og:image" content="https://kiminouknox.com/og/press.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press - Kiminou Knox" />
        <meta name="twitter:description" content="Selected features and announcements" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/press.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkSchema)}
        </script>
      </Helmet>

      <Header theme="maison" onThemeChange={() => {}} />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="press-heading">
              Press
            </h1>
            <p className="text-lg text-muted-foreground">
              Selected features and announcements that verify public facts about my work. For media requests use the contact form or visit the <Link href="/press-kit"><a className="underline hover:text-foreground transition-colors">press kit</a></Link>.
            </p>
          </div>

          <div className="space-y-6">
            {pressItems.map((item, index) => (
              <div 
                key={index}
                className="border-l-4 border-accent pl-6 py-4 hover:bg-accent/5 transition-colors"
                data-testid={`press-item-${index}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                    <p className="font-semibold text-foreground mb-2">{item.source}</p>
                    <p className="text-muted-foreground">{item.fact}</p>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                      data-testid={`press-link-${index}`}
                    >
                      Read more
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
