import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Book, Trophy, Mic, Users, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const books = [
  {
    title: "Poems From A Black Boy",
    description: "Early poems that trace the inner life of a young Black boy in the Bay learning how to pray, love, and tell the truth.",
    link: "/books"
  },
  {
    title: "Hopeless Romantic",
    description: "A lyric study of love, heartbreak, and healing written from the point of view of a young man who wants to stay tender.",
    link: "/books"
  },
  {
    title: "Boys Raised In Silence",
    description: "Poems for the boys who were never allowed to feel, and the men they grow into when they finally learn how to speak.",
    link: "/books"
  }
];

const beyondCards = [
  {
    title: "Athlete",
    description: "Cristo Rey De La Salle forward and student of film and footwork, building a game that matches the ambition on the page.",
    link: "/basketball",
    linkText: "View athletic profile",
    icon: Trophy
  },
  {
    title: "Speaker",
    description: "Talks on discipline, Black boy voice, and creative work that lasts, crafted for schools, youth groups, and faith spaces.",
    link: "/speaking",
    linkText: "Learn about speaking",
    icon: Mic
  },
  {
    title: "Director",
    description: "Director of Artists and Athletes For Change, uniting creatives and athletes to make meaningful community impact.",
    link: "/contact",
    linkText: "Connect with Kiminou",
    icon: Users
  }
];

export default function Author() {
  return (
    <>
      <Helmet>
        <title>Kiminou Knox | Author Profile</title>
        <meta name="description" content="Kiminou Knox is a poet, novelist, athlete, and builder from East Palo Alto whose work follows Black boys wrestling with God, grief, desire, and the courage to stay soft in a hard city." />
        <link rel="canonical" href="https://kiminouknox.com/author" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Kiminou Knox | Author Profile" />
        <meta property="og:description" content="Author of poetry collections, a children's storybook, and a growing universe of psychological and spiritual fiction." />
        <meta property="og:url" content="https://kiminouknox.com/author" />
        <meta property="og:image" content="https://kiminouknox.com/author-kiminou.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox | Author Profile" />
        <meta name="twitter:image" content="https://kiminouknox.com/author-kiminou.jpg" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <Header />

        <main className="pt-28">
          {/* Tab Navigation */}
          <div className="sticky top-28 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6">
              <nav className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
                <a href="#bio" className="text-sm uppercase tracking-[0.15em] text-gray-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                  Bio
                </a>
                <a href="#books" className="text-sm uppercase tracking-[0.15em] text-gray-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                  Books
                </a>
                <a href="#beyond" className="text-sm uppercase tracking-[0.15em] text-gray-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                  Beyond the Page
                </a>
                <a href="#contact" className="text-sm uppercase tracking-[0.15em] text-gray-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                  Work Together
                </a>
              </nav>
            </div>
          </div>

          {/* Hero Section */}
          <section id="bio" className="max-w-6xl mx-auto px-6 py-16 lg:py-24 scroll-mt-40 relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div 
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(251,191,36,0.1) 0%, transparent 50%)"
              }}
              animate={{
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="grid gap-12 lg:grid-cols-2 items-center relative z-10">
              {/* Photo */}
              <motion.div 
                className="relative w-full max-w-md mx-auto lg:order-1"
                initial={{ opacity: 0, x: -50, rotate: -2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-amber-300/10 to-amber-400/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="aspect-[4/5] rounded-3xl overflow-hidden ring-2 ring-amber-300/50 shadow-2xl shadow-amber-900/40 relative">
                  <motion.img
                    src="/author-kiminou.jpg"
                    alt="Kiminou Knox - Author, Athlete, Entrepreneur from East Palo Alto, creator of The Black Boy Lie universe"
                    title="Kiminou Knox - Author, Athlete & Entrepreneur"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, filter: "grayscale(100%)" }}
                    animate={{ scale: 1, filter: "grayscale(0%)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    loading="eager"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-300 to-amber-400 text-black text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/30"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                >
                  Poet · Author · Athlete
                </motion.div>
              </motion.div>

              {/* Text */}
              <motion.div 
                className="space-y-6 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.p 
                  className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Author Profile
                </motion.p>
                <motion.h1 
                  className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Kiminou Knox
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Poet, novelist, athlete, and builder from East Palo Alto whose work follows Black boys wrestling with God, grief, desire, and the courage to stay soft in a hard city.
                </motion.p>
                <motion.p 
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Creator of The Black Boy Lie universe. Author of seven poetry collections and a children's storybook.
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-3 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {["Author", "Poet", "Athlete", "Director"].map((tag, index) => (
                    <motion.span 
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-white/10 text-xs uppercase tracking-wide text-gray-300 border border-white/5 hover:border-amber-300/30 hover:bg-amber-300/10 transition-all cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-5 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  {[
                    { name: "Goodreads", url: "https://www.goodreads.com/author/show/Kiminou_Knox" },
                    { name: "MaxPreps", url: "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2" },
                    { name: "NCSA", url: "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" },
                    { name: "Prep Hoops", url: "https://prephoops.com/player/kiminou-knox/" },
                    { name: "Instagram", url: "https://www.instagram.com/kiminouknox" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/kiminou-knox-50691a394/" },
                    { name: "Spotify", url: "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg?si=743c2b2226084348" }
                  ].map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-all hover:underline underline-offset-4"
                      whileHover={{ scale: 1.05, x: 2 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* About the Author */}
          <section className="border-t border-white/10 bg-gradient-to-b from-black to-gray-950">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl mb-8 text-white">
                  Bio
                </h2>
                <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
                  <div className="space-y-4">
                    <p>
                      Kiminou Knox is a poet, novelist, speaker, athlete, and creative executive from East Palo Alto, now based in Oakland, California. At nineteen, he has already become a seven-time published author and a cultural voice committed to the serious formation of young Black men and the institutions that should invest in them.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Early Life and Lineage</h3>
                    <p>
                      Born and raised in East Palo Alto, Knox grew up between church pews, school gyms, and homes where strength was expected long before softness was allowed. He is the son of Rashida Knox, the grandson of Faye McNair Knox, and the great-grandson of Sarah Lee Williams and Elisha Bonepart McNair, a lineage that functions in his work as both inheritance and obligation.
                    </p>
                    <p>
                      From an early age, he watched faith, resilience, and generational memory collide in real time, and those collisions became the emotional architecture of his voice. The elders who raised him gave him stories, standards, and a sense of spiritual gravity; his writing answers to all three with a conviction that feels lived-in rather than performed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Literary Work and Themes</h3>
                    <p>
                      By nineteen, Knox has authored and published seven books that together form a literary universe centered on the interior lives of Black boys and young Black men. His titles <em className="text-amber-300/90">Poems From A Black Boy</em>, <em className="text-amber-300/90">Black Boy Poems</em>, <em className="text-amber-300/90">Hopeless Romantic</em>, <em className="text-amber-300/90">The Spirit of Solomon</em>, <em className="text-amber-300/90">Our Father</em>, <em className="text-amber-300/90">Boys Raised In Silence</em>, and a children&apos;s storybook written with his younger brother move fluidly across poetry, psychological fiction, and prophetic reflection.
                    </p>
                    <p>
                      His pages are filled with faith, mental health, generational trauma, masculinity, family fracture, love, longing, and spiritual confusion, all rendered with clinical honesty and lyrical precision. Knox refuses to sand down pain into something easy to consume; he insists on the full weight of the Black experience grief, resistance, tenderness, and joy and trusts his readers to meet him at that depth.
                    </p>
                    <p>
                      Across his body of work, Black boys are not symbols or headlines; they are complex, vulnerable, searching human beings whose emotions are allowed to be expansive and exact. In a culture that often demands performance, Knox writes toward the parts of life that usually remain unspoken, naming depression, anger, shame, and hope with equal clarity.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Voice, Form, and Craft</h3>
                    <p>
                      Knox&apos;s writing is marked by emotional precision, spiritual seriousness, and an ear tuned to both scripture and street corners. His poems and prose move between confession and critique, prayer and observation, often within the same page, without confusing truth-telling for theater.
                    </p>
                    <p>
                      Formally, he allows each project to choose its own container: some works arrive as tight, concentrated poems; others unfold as narrative, interior monologue, or meditative reflection. What binds them is an unwavering commitment to say what is real, even when that reality is costly, uncomfortable, or unresolved.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Faith, Masculinity, and Mental Health</h3>
                    <p>
                      Raised within the Black church, Knox carries Christianity not as branding but as a lived framework for wrestling with doubt, desire, discipline, and grace. His work faces spiritual confusion head-on, asking hard questions about God, suffering, manhood, and responsibility without rushing to easy answers.
                    </p>
                    <p>
                      Masculinity, in his pages, is something to be interrogated and rebuilt, not merely inherited. He writes about boys taught to be durable before they are allowed to be gentle, and about men who must learn, sometimes late, how to name what hurts and what heals.
                    </p>
                    <p>
                      Mental health is not a side topic in his work; it is central. Knox makes space for therapy, breakdown, loneliness, and recovery, insisting that serious literature for Black boys must also be serious about their psychological and spiritual well-being.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">KimYaps: The Podcast</h3>
                    <p>
                      Knox extends his literary sensibility into audio with his podcast, KimYaps, a space where he speaks with the same intimacy and conviction that animate his writing. Episodes address Christianity, love, relationships, identity, emotional growth, and the costly truths people negotiate in private but rarely speak in public.
                    </p>
                    <p>
                      On KimYaps, Knox&apos;s voice is both conversational and commanding capable of spiritual reflection, cultural commentary, and personal testimony without turning any of them into performance. He approaches each subject as a man committed to saying what is necessary, even when it disrupts comfort, complicates public narratives, or exposes his own vulnerabilities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Athletics and Discipline</h3>
                    <p>
                      A multi-sport athlete, Knox brings long-view intention and disciplined rigor to his physical training that mirrors his commitment to the page. For him, athletics is not simply competition; it is a practice of stewardship over body, mind, and focus.
                    </p>
                    <p>
                      The same internal standards that govern his literary craft consistency, resilience, and a refusal to cut corners shape how he moves through weight rooms, fields, and courts. This integration of discipline across arenas allows him to model a form of Black boyhood and manhood where intellect, spirit, and physical strength are not at odds but in conversation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Leadership, Institutions, and Youth Development</h3>
                    <p>
                      As the founder of The TeeShirtTeens and Director of Artists and Athletes For Change (AAFC), Knox does more than create art; he builds structure around young talent. The TeeShirtTeens and AAFC function as serious developmental platforms for youth, helping them convert expression into opportunity and raw vision into documented, transferable work.
                    </p>
                    <p>
                      Under his leadership, these initiatives refuse to treat young creators and athletes as content or spectacle. Instead, they invest in them as whole people, offering pathways, mentorship, and accountability that translate creativity and discipline into something durable and real.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Philosophy and Operating Standard</h3>
                    <p>
                      Every arena Knox enters literature, media, leadership, athletics receives the same operating standard: excellence with substance and ambition grounded in soul. He is less interested in momentary visibility than in building a life and body of work that will still matter when trends pass and timelines clear.
                    </p>
                    <p>
                      His philosophy is simple but demanding: truth retains power, presence transforms lives, and Black boys deserve serious literature, serious investment, and the full architecture of legacy. That legacy, in his vision, is not postponed until later life; it is written early, built deliberately, and designed to last.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white">Generational Voice and Legacy</h3>
                    <p>
                      Kiminou Knox represents a generation of young Black men who refuse to separate depth from youth or seriousness from early ambition. His work stands at the intersection of art, faith, discipline, and legacy, offering a model of authorship and leadership that is both grounded in elders and unafraid to confront the present.
                    </p>
                    <p>
                      Whether on the page, behind a microphone, on the court, or inside a room full of young creators, Knox moves with the same conviction: to make his life and work mean something beyond the moment, and to ensure that the boys coming after him inherit not just stories, but structures.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8">
                  <a href="https://www.goodreads.com/author/show/Kiminou_Knox" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                    Goodreads
                  </a>
                  <a href="https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/basketball/stats/?careerid=84brnk148sii2" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                    MaxPreps
                  </a>
                  <a href="https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                    NCSA
                  </a>
                  <a href="https://prephoops.com/player/kiminou-knox/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                    Prep Hoops
                  </a>
                  <a href="https://www.instagram.com/kiminouknox" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                    Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Books Section */}
          <section id="books" className="border-t border-white/10 bg-gray-950 scroll-mt-40">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
              >
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-white">
                    Books by Kiminou Knox
                  </h2>
                  <p className="text-gray-400 mt-3">
                    A growing body of work across poetry, fiction, and children's storytelling.
                  </p>
                </div>
                <Link href="/books">
                  <motion.span
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-300 text-black text-sm font-semibold cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View all books
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {books.map((book, index) => (
                  <motion.article
                    key={book.title}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 flex flex-col group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, borderColor: "rgba(251,191,36,0.3)" }}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-amber-900/30 to-purple-900/30 flex items-center justify-center">
                      <Book className="w-16 h-16 text-amber-300/50 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg text-white group-hover:text-amber-300 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-400 flex-1 leading-relaxed">
                        {book.description}
                      </p>
                      <Link href={book.link}>
                        <span className="text-sm text-amber-300 hover:text-amber-200 transition-colors cursor-pointer">
                          Read more
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* Beyond the Page */}
          <section id="beyond" className="border-t border-white/10 bg-black scroll-mt-40">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mb-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-white">
                  Beyond the Page
                </h2>
                <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                  Alongside writing, Kiminou leads The Tee Shirt Teens and Artists and Athletes For Change, works with youth as a speaker, and continues his development as a serious basketball player. The same discipline that lives on the court and in the weight room shapes the language in his notebooks.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {beyondCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col group hover:border-amber-300/30 transition-all"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-300/10 flex items-center justify-center mb-4 group-hover:bg-amber-300/20 transition-colors">
                        <Icon className="w-6 h-6 text-amber-300" />
                      </div>
                      <h3 className="font-semibold text-xl text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-gray-400 flex-1 leading-relaxed">
                        {card.description}
                      </p>
                      <Link href={card.link}>
                        <span className="mt-4 text-sm text-amber-300 hover:text-amber-200 transition-colors cursor-pointer inline-flex items-center gap-2">
                          {card.linkText}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Contact Strip */}
          <section id="contact" className="bg-gradient-to-r from-amber-400 to-amber-500 scroll-mt-40">
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-black">
                  Work with Kiminou
                </h2>
                <p className="text-black/70 mt-2">
                  For readings, interviews, classroom visits, and creative collaborations, reach out below.
                </p>
              </div>
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-amber-300 text-sm font-semibold cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Kiminou
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
