import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { kiminouEntity } from "@shared/entity/kiminou";

export default function AafcBuilders() {
  return (
    <>
      <Helmet>
        <title>AAFC Builders - Web Design & Digital Infrastructure by Kiminou Knox</title>
        <meta name="description" content="Kiminou Knox builds websites, landing pages, digital infrastructure, and brand systems through AAFC Builders and related client work." />
        <link rel="canonical" href="https://www.kiminouknox.com/aafc-builders" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <section className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">AAFC Builders</p>
          <h1 className="font-serif text-5xl font-bold">Web Design & Digital Infrastructure</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Kiminou Knox builds websites, landing pages, digital infrastructure, and brand systems through AAFC Builders and related client work.
          </p>
        </section>
        <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
          {kiminouEntity.buildPortfolio.map((project) => (
            <article key={project.name} className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{project.category}</p>
              <h2 className="mt-3 text-xl font-semibold">{project.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
              <dl className="mt-5 space-y-2 text-sm">
                <div><dt className="inline font-medium">Role: </dt><dd className="inline">{project.role}</dd></div>
                <div><dt className="inline font-medium">Status: </dt><dd className="inline">{project.status}</dd></div>
              </dl>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
