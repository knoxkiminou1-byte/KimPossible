import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen, Trophy, Briefcase, Users } from "lucide-react";
import { Link } from "wouter";

const identity = [
  {
    id: "books",
    icon: BookOpen,
    label: "Author",
    title: "Ten Published Books",
    description: "Author and poet exploring faith, identity, love, Black boyhood, grief, family, and becoming.",
    link: "/books",
    cta: "View Books"
  },
  {
    id: "basketball",
    icon: Trophy,
    label: "Athlete",
    title: "Athletics",
    description: "Current athletic pursuit and historical varsity experience, kept secondary to the literary public identity.",
    link: "/sports",
    cta: "View Athletics"
  },
  {
    id: "speaker",
    icon: Users,
    label: "Speaker",
    title: "Youth Voice Advocate",
    description: "Award winning speaker addressing craft, discipline, and community impact through authentic storytelling and service.",
    link: "/speaking",
    cta: "Book Speaking"
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
    <section id="who-is-kiminou" className="py-32 bg-background" data-testid="who-is-kiminou-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 animate-on-scroll"
            data-testid="who-title"
          >
            Who is Kiminou Knox
          </h2>
          <p
            ref={descRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto animate-on-scroll"
            data-testid="who-description"
          >
            A Bay Area raised, New Orleans based author and poet. Ten books, KimYaps, speaking, AAFC, music, athletics, and technology work each have their own room.
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
                <div className="bg-card border border-border rounded-lg p-8 h-full hover:shadow-xl transition-all duration-500">
                  <div className="mb-6">
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      {item.label}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-semibold mb-4" data-testid={`identity-title-${item.id}`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6" data-testid={`identity-description-${item.id}`}>
                    {item.description}
                  </p>
                  
                  {item.external ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      data-testid={`identity-link-${item.id}`}
                    >
                      {item.cta} →
                    </a>
                  ) : (
                    <Link 
                      href={item.link}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline" 
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
