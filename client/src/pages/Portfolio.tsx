import { motion } from "framer-motion";
import {
  BookOpen,
  PenLine,
  Link as LinkIcon,
  Mail,
  MapPin,
  Calendar as CalendarIcon,
  FileText,
  Layers,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

// --- Small UI helpers ---
const Section = ({ id, title, icon: Icon, children }: any) => (
  <section id={id} className="scroll-mt-24 py-16">
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon className="w-6 h-6" aria-hidden />}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm">
    {children}
  </span>
);

const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-2xl border p-5 shadow-sm ${className}`}>{children}</div>
);

// --- Main Component ---
export default function Portfolio() {
  const socials = [
    { name: "Instagram", href: "https://instagram.com/hofkiminou", icon: Instagram },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "X / Twitter", href: "https://twitter.com/KnoxKiminou", icon: Twitter },
    { name: "Amazon Author", href: "#", icon: LinkIcon },
  ];

  const novelsMajor = [
    {
      title: "The Black Boy Lie",
      status: "Coming soon",
      themes:
        "Black identity, generational trauma, supernatural mystery, prophecy",
      note:
        "Core canonical novel that anchors the Kiminou Knox Author Universe.",
    },
  ];

  const poetryCollections = [
    {
      title: "The Spirit of Solomon",
      status: "published/complete",
      blurb:
        "A themed poetic journey of rise, ruin, and wisdom through a modern-day Solomon figure.",
    },
    {
      title: "Our Father?",
      status: "published/complete",
      blurb:
        "Raw, intimate dialogue with God—wrestling with silence, suffering, and doubt.",
    },
    {
      title: "Poems by a Black Boy",
      status: "complete",
      blurb:
        "Early voice pieces charting identity, tenderness, and becoming.",
    },
    {
      title: "Hopeless Romantic",
      status: "complete",
      blurb:
        "Love, longing, and the soft edges of heartbreak.",
    },
  ];

  const universeNotes = [
    {
      title: "Shared Universe",
      text:
        "The books live in a connected mythos. Emmanuel's journey in *The Black Boy Lie* threads across future stories.",
    },
  ];

  const now = new Date();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-100 via-white to-white text-zinc-900">
      {/* Header / Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b">
        <nav className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/home" className="font-semibold tracking-tight">Kiminou Knox</a>
          <div className="hidden md:flex items-center gap-5 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#writing" className="hover:underline">Writing</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main id="top" className="relative">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3"
            >
              <Badge>The Black Boy Lie — Coming Soon</Badge>
              <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.1]">
                Writer & Student‑Athlete
              </h1>
              <p className="mt-5 text-zinc-600 max-w-2xl">
                I'm Kiminou Knox—Class of 2025—building stories and community across
                literature and sport. My work spans psychological drama, metaphysical
                thrillers, and lyrical spirituality grounded in Black identity, faith,
                and becoming.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:contact@kiminouknox.com"
                  className="rounded-2xl border px-4 py-2 text-sm font-medium hover:shadow"
                >
                  <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4"/> Email me</span>
                </a>
                <a
                  href="#"
                  className="rounded-2xl border px-4 py-2 text-sm font-medium hover:shadow"
                >
                  <span className="inline-flex items-center gap-2"><FileText className="w-4 h-4"/> Download résumé</span>
                </a>
                {socials.map((s) => (
                  <a key={s.name} href={s.href} className="rounded-2xl border px-4 py-2 text-sm font-medium hover:shadow">
                    <span className="inline-flex items-center gap-2"><s.icon className="w-4 h-4"/> {s.name}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-600">
                <Badge>Author Universe Builder</Badge>
                <Badge>Poetry Collections (4 completed)</Badge>
                <Badge>Oakland–East Bay</Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="md:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden border shadow-sm">
                <img
                  src="/photos/brown-suit-author.jpg"
                  alt="Kiminou Knox in brown suit"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* About */}
        <Section id="about" title="About" icon={Layers}>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-4 h-4"/>
                <p className="text-sm font-medium">Oakland–East Bay roots</p>
              </div>
              <p className="text-zinc-600 text-sm">
                Student‑athlete and author weaving faith, community, and creative discipline.
              </p>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-2">
                <CalendarIcon className="w-4 h-4"/>
                <p className="text-sm font-medium">Class of 2025</p>
              </div>
              <p className="text-zinc-600 text-sm">
                Focused on varsity training and a growing catalog of finished poetry.
              </p>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-2">
                <PenLine className="w-4 h-4"/>
                <p className="text-sm font-medium">Voice & Themes</p>
              </div>
              <p className="text-zinc-600 text-sm">
                Psychological drama, metaphysical thrillers, magical realism, and poetic spirituality.
              </p>
            </Card>
          </div>
        </Section>

        {/* Writing */}
        <Section id="writing" title="Writing — Books & Poetry" icon={BookOpen}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><PenLine className="w-4 h-4"/> Canon / Major Novel</h3>
              <ul className="space-y-4">
                {novelsMajor.map((n) => (
                  <li key={n.title} className="">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-xs text-zinc-500">{n.status}</div>
                    <p className="text-sm text-zinc-700 mt-1">{n.themes}</p>
                    <p className="text-xs text-zinc-500 mt-1">{n.note}</p>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><PenLine className="w-4 h-4"/> Poetry Collections (Completed)</h3>
              <ul className="space-y-4">
                {poetryCollections.map((p) => (
                  <li key={p.title}>
                    <div className="font-medium">{p.title} <span className="text-xs text-zinc-500 font-normal">— {p.status}</span></div>
                    <p className="text-sm text-zinc-700 mt-1">{p.blurb}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Universe Note</h3>
            <div className="grid md:grid-cols-1 gap-4">
              {universeNotes.map((u) => (
                <div key={u.title}>
                  <div className="font-medium">{u.title}</div>
                  <p className="text-sm text-zinc-700 mt-1">{u.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact" icon={Mail}>
          <Card>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-lg font-semibold">Work with me</h3>
                <p className="text-sm text-zinc-700 mt-1">
                  For speaking, appearances, or creative collabs, use the email link below.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="mailto:contact@kiminouknox.com"
                    className="rounded-2xl border px-4 py-2 text-sm font-medium hover:shadow inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4"/> contact@kiminouknox.com
                  </a>
                  {socials.map((s) => (
                    <a key={s.name} href={s.href} className="rounded-2xl border px-4 py-2 text-sm font-medium hover:shadow inline-flex items-center gap-2">
                      <s.icon className="w-4 h-4"/> {s.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border shadow-sm">
                <img
                  src="/photos/creative-designer.jpg"
                  alt="Creative workspace"
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </Card>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-zinc-500">
        <div className="max-w-5xl mx-auto px-6">
          <p>© {now.getFullYear()} Kiminou Knox. All rights reserved.</p>
          <p className="mt-1">Last updated {now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
        </div>
      </footer>
    </div>
  );
}