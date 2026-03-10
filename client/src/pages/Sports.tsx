import { Helmet } from "react-helmet";
import { ExternalLink, Trophy, TrendingUp, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const measurables = [
  { label: "Height", value: "6'7\"", source: "NCSA", icon: TrendingUp },
  { label: "Weight", value: "235 lbs", source: "NCSA", icon: Target },
  { label: "Position", value: "Forward / Center", source: "MaxPreps", icon: Trophy },
];

const profiles = [
  {
    title: "NCSA College Recruiting",
    href: "https://www.ncsasports.org",
    description: "Complete recruiting profile with measurements and recruitment data.",
  },
  {
    title: "MaxPreps",
    href: "https://www.maxpreps.com",
    description: "High school performance and team record context.",
  },
  {
    title: "247Sports",
    href: "https://247sports.com",
    description: "Rankings, recruiting coverage, and athlete news references.",
  },
];

const highlights = [
  "Varsity Captain - Ygnacio Valley High School",
  "Redwood Christian MVP",
  "Pine Valley MVP",
  "CaliHoop Top Team Player Selection",
  "NCAA Eligibility Registered",
];

export default function Sports() {
  return (
    <>
      <Helmet>
        <title>Athletics - Kiminou Knox</title>
        <meta
          name="description"
          content="Athletics profile, verified measurables, recruiting references, and competitive highlights for Kiminou Knox."
        />
        <link rel="canonical" href="https://kiminouknox.com/sports" />
      </Helmet>

      <Header />

      <main className="relative min-h-screen overflow-hidden pb-20 pt-40 text-white">
        <div className="section-backdrop" aria-hidden="true">
          <img src="/basketball-bg-feb-27-2026.png" alt="" className="section-backdrop-image" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-black/80 to-black/92" />
          <div className="section-backdrop-vignette" />
          <div className="section-backdrop-glow" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <section className="mb-14 max-w-3xl">
            <p className="luxury-kicker mb-4">Athletics</p>
            <h1 className="luxury-heading mb-6 font-serif text-5xl font-light md:text-6xl" data-testid="sports-heading">
              Competitive Profile
            </h1>
            <p className="luxury-body text-base md:text-xl">
              Verified athlete metrics, leadership highlights, and recruiting-facing references.
            </p>
          </section>

          <section className="mb-12 grid gap-5 md:grid-cols-3">
            {measurables.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="luxury-surface rounded-2xl p-7 text-center">
                  <Icon className="mx-auto mb-3 h-9 w-9 text-amber-200" />
                  <p className="mb-2 text-[0.65rem] uppercase tracking-[0.26em] text-amber-100/70">{item.label}</p>
                  <p className="mb-2 text-3xl font-semibold text-amber-50">{item.value}</p>
                  <p className="text-xs text-amber-100/65">Source: {item.source}</p>
                </article>
              );
            })}
          </section>

          <section className="mb-12 grid gap-5 md:grid-cols-3">
            {profiles.map((profile) => (
              <a
                key={profile.title}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer external"
                className="luxury-surface group rounded-2xl p-7 transition hover:border-amber-200/28"
                data-testid={`link-profile-${profile.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-amber-100/65">Verified Profile</p>
                  <ExternalLink className="h-4 w-4 text-amber-100/70 transition group-hover:text-amber-50" />
                </div>
                <h2 className="mb-3 font-serif text-2xl text-amber-50">{profile.title}</h2>
                <p className="luxury-body text-sm">{profile.description}</p>
              </a>
            ))}
          </section>

          <section className="luxury-surface rounded-2xl p-7 md:p-9">
            <h2 className="mb-5 font-serif text-3xl text-amber-50">Career Highlights</h2>
            <div className="grid gap-3">
              {highlights.map((item) => (
                <div key={item} className="rounded-xl border border-amber-100/12 bg-black/25 px-4 py-3 text-amber-50/88">
                  {item}
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
