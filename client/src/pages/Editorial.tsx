import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { editorialCredits } from "@shared/entity/kiminou";

export default function Editorial() {
  return (
    <>
      <Helmet>
        <title>Editorial Work by Kiminou Knox - Chief Editor Credits & Client Book Projects</title>
        <meta name="description" content="Explore chief-editor and client book projects connected to Kiminou Knox, including editorial development, sequencing, publishing support, and creator collaboration." />
        <link rel="canonical" href="https://www.kiminouknox.com/editorial" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Chief Editor</p>
          <h1 className="font-serif text-5xl font-bold">Editorial Work</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Chief-editor and client book projects are separate from Books by Kiminou. This lane covers editorial development, sequencing, line editing, publishing support, and creator collaboration.
          </p>
        </section>
        <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          {editorialCredits.map((credit) => (
            <article key={credit.id} className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{credit.role}</p>
              <h2 className="mt-3 text-2xl font-semibold">{credit.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{credit.description}</p>
              <dl className="mt-5 space-y-2 text-sm">
                <div><dt className="inline font-medium">Date: </dt><dd className="inline">{credit.datePublished}</dd></div>
                <div><dt className="inline font-medium">Format: </dt><dd className="inline">{credit.format}</dd></div>
                <div><dt className="inline font-medium">Price reference: </dt><dd className="inline">{credit.price}</dd></div>
                <div><dt className="inline font-medium">Listed creators: </dt><dd className="inline">{credit.creators.join(", ")}</dd></div>
              </dl>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
