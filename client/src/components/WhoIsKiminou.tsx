import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookOpen, Trophy, Briefcase, Users, type LucideIcon } from "lucide-react";
import { Link } from "wouter";

type IdentityItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  link: string;
  cta: string;
  external?: boolean;
};

const identity: IdentityItem[] = [
  {
    id: "books",
    icon: BookOpen,
    label: "Author",
    title: "Books and poems",
    description: "Published work on faith, family, love, and growing up Black in the Bay Area.",
    link: "/books",
    cta: "View Books"
  },
  {
    id: "basketball",
    icon: Trophy,
    label: "Athlete",
    title: "Basketball and training",
    description: "A 6'7\" forward and center who brings the same practice habits from writing into sport.",
    link: "/sports",
    cta: "View Athletics"
  },
  {
    id: "speaker",
    icon: Users,
    label: "Speaker",
    title: "Schools and groups",
    description: "Talks on writing, discipline, grief, faith, and finding a voice without performing one.",
    link: "/speaking",
    cta: "Book Speaking"
  },
  {
    id: "brand",
    icon: Briefcase,
    label: "Director",
    title: "Artists & Athletes for Change",
    description: "Organizing creative and athletic projects with a practical community focus.",
    link: "/contact",
    cta: "Connect",
    external: false
  }
];

function IdentityCard({ item }: { item: IdentityItem }) {
  const cardRef = useScrollAnimation();
  const Icon = item.icon;

  return (
    <div
      ref={cardRef}
      className="surface-card group animate-on-scroll"
      data-testid={`identity-card-${item.id}`}
    >
      <div className="h-full rounded-lg border border-amber-200/20 bg-black/60 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
        <div className="mb-6">
          <Icon className="w-12 h-12 text-amber-200 mb-4" />
          <span className="text-sm uppercase tracking-[0.18em] text-amber-100/80 font-semibold">
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
}

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
          src="/kiminou-hero.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
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
            A Bay Area writer and athlete working across books, basketball, speaking, and community projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {identity.map((item) => (
            <IdentityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
