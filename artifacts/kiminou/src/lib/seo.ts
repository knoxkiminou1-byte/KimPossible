export const SITE_NAME = "Kiminou Knox";
export const SITE_URL = "https://www.kiminouknox.com";
export const SITE_DESCRIPTION =
  "Official website of Kiminou Knox — author of 10 published works, NCAA-registered athlete, speaker, and podcast host from the Bay Area.";
export const SITE_IMAGE = "https://www.kiminouknox.com/og-image.png";
export const SITE_PERSON_IMAGE =
  "https://www.kiminouknox.com/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg";
export const SITE_TWITTER = "@KnoxKiminou";
export const SITE_FEED = "https://www.kiminouknox.com/rss.xml";
export const SITE_MEDIUM_PROFILE = "https://medium.com/@knoxkiminou1";
export const SITE_GOODREADS_PROFILE =
  "https://www.goodreads.com/author/show/55621683.Kiminou_Knox";
export const SITE_PODCAST_APPLE = "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308";
export const SITE_PODCAST_SPOTIFY = "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg";
export const SITE_YOUTUBE = "https://www.youtube.com/@KiminouKnoxOfficial";

export const SITE_SAME_AS = [
  SITE_MEDIUM_PROFILE,
  SITE_GOODREADS_PROFILE,
  "https://x.com/KnoxKiminou",
  SITE_YOUTUBE,
  "https://www.linkedin.com/in/kiminou-knox-50691a394/",
  "https://www.amazon.com/stores/author/B0DGM5Z5Q8",
  SITE_PODCAST_APPLE,
  SITE_PODCAST_SPOTIFY,
  "https://about.me/kiminou",
  "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc",
  "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  "https://prephoops.com/player/kiminou-knox/",
  "https://stan.store/kiminouknox",
  "https://www.wikidata.org/wiki/Q137260299",
];

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        alternateName: "Kiminou",
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          url: SITE_PERSON_IMAGE,
          caption: "Kiminou Knox — official author headshot 2026",
        },
        jobTitle: ["Author", "Athlete", "Speaker", "Podcast Host"],
        description:
          "Kiminou Knox is the author of 10 published works, a Bay Area poet, NCAA-registered basketball and football athlete, speaker, and podcast host. Creator of the Black Boy Lie universe.",
        birthPlace: {
          "@type": "Place",
          name: "Bay Area, California",
        },
        homeLocation: {
          "@type": "Place",
          name: "Bay Area, California",
        },
        height: {
          "@type": "QuantitativeValue",
          value: 80,
          unitCode: "INH",
        },
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Ygnacio Valley High School",
          },
          {
            "@type": "EducationalOrganization",
            name: "Cristo Rey De La Salle",
          },
          {
            "@type": "EducationalOrganization",
            name: "Bishop O'Dowd High School",
          },
        ],
        knowsAbout: [
          "Poetry",
          "Basketball",
          "Football",
          "Creative writing",
          "Public speaking",
          "Faith",
          "Black boyhood",
          "Youth leadership",
          "Publishing",
          "Bay Area literature",
          "Podcasting",
          "Mental health advocacy",
        ],
        award: "Miles Hall Foundation Youth Summit Top Essay Finalist (2025)",
        sameAs: SITE_SAME_AS,
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${SITE_NAME} — Official Site`,
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function podcastSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": `${SITE_URL}/#podcast`,
    name: "KimYaps",
    description:
      "KimYaps is a podcast by Kiminou Knox — honest conversations about navigating pain, finding purpose, and giving yourself (and others) a little extra grace.",
    url: SITE_PODCAST_APPLE,
    webFeed: SITE_PODCAST_SPOTIFY,
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
    image: SITE_PERSON_IMAGE,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
