import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import GlitchHeading from "@/components/LuxuryFX/GlitchHeading";
import GoldUnmask from "@/components/LuxuryFX/GoldUnmask";
import MagneticElement from "@/components/LuxuryFX/MagneticElement";
import VariableFontWave from "@/components/LuxuryFX/VariableFontWave";

const identity = [
  {
    id: "books",
    number: "01",
    label: "Author",
    title: "Seven Published Works",
    description: "Published writer exploring faith, identity, love, and the Black experience through powerful poetry and narrative.",
    link: "/books",
    cta: "View Books",
  },
  {
    id: "basketball",
    number: "02",
    label: "Athlete",
    title: "6'7\" Multi-Sport Leader",
    description: "Cristo Rey De La Salle basketball captain and multi-sport athlete combining physical excellence with leadership on and off the court.",
    link: "/basketball",
    cta: "View Athletics",
  },
  {
    id: "speaker",
    number: "03",
    label: "Speaker",
    title: "Youth Voice Advocate",
    description: "Award-winning speaker addressing craft, discipline, and community impact through authentic storytelling and service.",
    link: "/speaking",
    cta: "Book Speaking",
  },
  {
    id: "brand",
    number: "04",
    label: "Director",
    title: "AAFC Leader",
    description: "Director of Artists and Athletes For Change, uniting creatives and athletes to make meaningful community impact.",
    link: "/contact",
    cta: "Connect",
  },
];

function Card({ item, index }: { item: (typeof identity)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <MagneticElement strength={0.22} radius={140}>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border-t border-foreground/10 pt-8 pb-10 flex flex-col gap-4 hover:border-amber-400/40 transition-colors duration-500"
      data-testid={`identity-card-${item.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-serif text-5xl text-foreground/10 font-light leading-none select-none group-hover:text-amber-400/30 transition-colors duration-500">
          {item.number}
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-medium mt-1">
          {item.label}
        </span>
      </div>

      <h3
        className="font-serif text-2xl md:text-3xl font-light text-foreground group-hover:text-amber-600 transition-colors duration-300"
        data-testid={`identity-title-${item.id}`}
      >
        {item.title}
      </h3>

      <p
        className="text-sm text-foreground/60 leading-relaxed flex-1"
        data-testid={`identity-description-${item.id}`}
      >
        {item.description}
      </p>

      <Link href={item.link} data-testid={`identity-link-${item.id}`}>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400/80 hover:text-amber-300 transition-colors duration-200 cursor-pointer group/link">
          {item.cta}
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </span>
      </Link>
    </motion.div>
    </MagneticElement>
  );
}

export default function WhoIsKiminou() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section
      id="who-is-kiminou"
      className="py-28 md:py-40 bg-background"
      data-testid="who-is-kiminou-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, x: -32 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-5 font-medium">
              About
            </p>
            <GoldUnmask delay={0.1} className="inline-block mb-8">
              <h2
                className="font-serif text-4xl md:text-5xl xl:text-6xl font-light leading-tight"
                data-testid="who-title"
              >
                <VariableFontWave
                  as="span"
                  className="block font-serif font-light"
                  triggerOnView
                  triggerOnHover
                  minWeight={300}
                  maxWeight={700}
                >
                  Who is
                </VariableFontWave>
                <br />
                <GlitchHeading as="span" className="italic text-amber-200/90">Kiminou Knox</GlitchHeading>
              </h2>
            </GoldUnmask>
            <div className="w-10 h-px bg-amber-400/50 mb-8" />
            <p
              className="text-base text-white/55 leading-relaxed max-w-sm"
              data-testid="who-description"
            >
              A writer and athlete from East Palo Alto, California, building a legacy through books, sport, and youth leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {identity.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
