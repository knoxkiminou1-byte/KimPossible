import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { BookOpen, Feather, Trophy, Mic2 } from "lucide-react";
import { Link } from "wouter";

const portals = [
  {
    title: "Books",
    href: "/books",
    icon: BookOpen,
    className: "paper-depth-card-one",
    depth: "translateZ(190px) rotateY(-22deg) rotateX(8deg)",
  },
  {
    title: "Author",
    href: "/author",
    icon: Feather,
    className: "paper-depth-card-two",
    depth: "translateZ(310px) rotateY(14deg) rotateX(-7deg)",
  },
  {
    title: "Sports",
    href: "/sports",
    icon: Trophy,
    className: "paper-depth-card-three",
    depth: "translateZ(130px) rotateY(28deg) rotateX(10deg)",
  },
  {
    title: "Speaking",
    href: "/speaking",
    icon: Mic2,
    className: "paper-depth-card-four",
    depth: "translateZ(250px) rotateY(-16deg) rotateX(-8deg)",
  },
];

const paperPlanes = [
  { className: "paper-plane-one", delay: 0 },
  { className: "paper-plane-two", delay: 0.75 },
  { className: "paper-plane-three", delay: 1.4 },
  { className: "paper-plane-four", delay: 0.35 },
  { className: "paper-plane-five", delay: 1.1 },
  { className: "paper-plane-six", delay: 1.8 },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 42, rotateX: -22, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.2 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function PaperRealmPortal() {
  const { scrollYProgress } = useScroll();
  const chamberRotate = useTransform(scrollYProgress, [0, 0.55], [-10, 24]);
  const chamberY = useTransform(scrollYProgress, [0, 0.55], [70, -120]);
  const liquidShift = useTransform(scrollYProgress, [0, 0.55], ["-18%", "22%"]);

  return (
    <section className="paper-realm-section relative isolate min-h-screen overflow-hidden">
      <motion.div
        className="paper-realm-backdrop"
        style={{ y: chamberY, rotate: chamberRotate }}
      />
      <div className="paper-realm-vignette" />

      <div className="paper-dimension-field" aria-hidden="true">
        <motion.div className="paper-tunnel paper-tunnel-one" style={{ rotate: chamberRotate }} />
        <motion.div className="paper-tunnel paper-tunnel-two" style={{ rotate: chamberRotate }} />
        <motion.div className="paper-tunnel paper-tunnel-three" style={{ rotate: chamberRotate }} />

        {paperPlanes.map((plane) => (
          <motion.div
            key={plane.className}
            className={`paper-plane ${plane.className}`}
            animate={{ y: [0, -24, 0], rotateZ: [0, 7, 0], rotateY: [-12, 16, -12] }}
            transition={{ duration: 7.4, delay: plane.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <motion.div className="paper-liquid-river" style={{ x: liquidShift }} />
        <motion.div
          className="paper-liquid-thread"
          animate={{ scaleX: [0.72, 1.12, 0.82], opacity: [0.28, 0.85, 0.38] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="paper-realm-navigation" aria-label="Paper realm navigation">
        {portals.map((portal, index) => {
          const Icon = portal.icon;
          return (
            <motion.div
              key={portal.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              className={`paper-realm-card ${portal.className}`}
              style={{ transform: portal.depth }}
            >
              <Link href={portal.href}>
                <span className="paper-card-link" aria-label={portal.title}>
                  <span className="paper-card-sheen" />
                  <Icon className="relative z-10 w-7 h-7 text-amber-200" />
                  <span className="relative z-10 font-serif text-3xl md:text-4xl text-white">
                    {portal.title}
                  </span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="paper-realm-player"
        animate={{ y: [0, -20, 0], rotateY: [-18, 14, -18], rotateZ: [-2, 2, -2] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="paper-realm-head" />
        <div className="paper-realm-body" />
        <div className="paper-realm-ball" />
      </motion.div>
    </section>
  );
}
