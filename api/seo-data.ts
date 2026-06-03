export default function handler(_req: any, res: any) {
  res.status(200).json({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Kiminou Knox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kiminou Knox is a basketball player, entrepreneur, and published author.",
        },
      },
      {
        "@type": "Question",
        name: "What does Kiminou Knox write?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kiminou Knox writes poetry, books, and personal brand stories.",
        },
      },
    ],
  });
}
