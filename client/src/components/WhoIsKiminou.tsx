import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen, Trophy, Briefcase, Users } from "lucide-react";
import { Link } from "wouter";

const identity = [
  {
    id: "books",
    icon: BookOpen,
    label: "Author",
    title: "Seven Published Works",
    description: "Published writer exploring faith, identity, love, and the Black experience through powerful poetry and narrative.",
    link: "/books",
    cta: "View Books"
  },
  {
    id: "basketball",
    icon: Trophy,
    label: "Athlete",
    title: "6'7\" Multi Sport Leader",
    description: "Varsity basketball captain and multi sport athlete combining physical excellence with leadership on and off the court.",
    link: "/author",
    cta: "View Bio"
  },
  {
    id: "speaker",
    icon: Users,
    label: "Speaker",
    title: "Youth Voice Advocate",
    description: "Award winning speaker addressing craft, discipline, and community impact through authentic storytelling and service.",
    link: "/contact",
    cta: "Contact"
  },
  {
    id: "brand",
    icon: Briefcase,
    label: "Director",
    title: "AAFC Leader",
    description: "Director of Artists and Athletes For Change, uniting creatives and athletes to make meaningful community impact.",
    link: "/contact",
    cta: "Connect",
    external: false
  }
];

export default function WhoIsKiminou() {
  const titleRef = useScrollAnimation();
  const descRef = useScrollAnimation();

  return (
    <section
      id="who-is-kiminou"
      className="relative overflow-hidden py-32"
      data-testid="who-is-kiminou-section"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/kiminou-hero.png"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/72 to-black/82" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-scroll text-amber-200"
            data-testid="who-title"
          >
            Who is Kiminou Knox
          </h2>
          <p
            ref={descRef}
            className="text-xl font-semibold text-amber-100 max-w-3xl mx-auto animate-on-scroll"
            data-testid="who-description"
          >
            A writer and athlete from East Palo Alto, California, building a legacy through books, sport, and youth leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {identity.map((item) => {
            const cardRef = useScrollAnimation();
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={cardRef}
                className="luxury-card group animate-on-scroll"
                data-testid={`identity-card-${item.id}`}
              >
                <div className="h-full rounded-lg border border-amber-200/20 bg-black/55 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-xl">
                  <div className="mb-6">
                    <Icon className="w-12 h-12 text-amber-200 mb-4" />
                    <span className="text-sm uppercase tracking-[0.2em] text-amber-100/80 font-semibold">
                      {item.label}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-semibold mb-4 text-white" data-testid={`identity-title-${item.id}`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-6" data-testid={`identity-description-${item.id}`}>
                    {item.description}
                  </p>
                  
                  {item.external ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-amber-200 hover:underline"
                      data-testid={`identity-link-${item.id}`}
                    >
                      {item.cta} →
                    </a>
                  ) : (
                    <Link 
                      href={item.link}
                      className="inline-flex items-center text-sm font-semibold text-amber-200 hover:underline" 
                      data-testid={`identity-link-${item.id}`}
                    >
                      {item.cta} →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
