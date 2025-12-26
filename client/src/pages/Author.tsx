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
    description: "Varsity level forward and student of film and footwork, building a game that matches the ambition on the page.",
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
                  Creator of The Black Boy Lie universe. Author of six poetry collections and a children's storybook.
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
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/kiminouknox" },
                    { name: "Spotify", url: "https://open.spotify.com/user/kiminouknox" }
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
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Kiminou Knox is a poet, novelist, and creative organizer from East Palo Alto now based in Oakland California. Son of Rashida Knox, grandson of Faye McNair Knox, and great grandson of Sarah Lee Williams and Elisha Bonepart McNair. A creative force of African American, Jamaican, and Congolese descent, he came up between church benches, school gyms, and crowded apartments where everybody was carrying more than they could say out loud. Those rooms and those silences are where his voice began.
                  </p>
                  <p>
                    He has released several poetry collections including <em className="text-amber-300/90">Poems From A Black Boy</em>, <em className="text-amber-300/90">Black Boy Poems</em>, <em className="text-amber-300/90">Hopeless Romantic</em>, <em className="text-amber-300/90">The Spirit of Solomon</em>, <em className="text-amber-300/90">Our Father</em>, and <em className="text-amber-300/90">Boys Raised In Silence</em>, plus a children's storybook written with his younger brother. His work walks through faith, family, mental health, and desire, following Black boys who are trying to understand God, forgive their fathers, love their friends, and keep breathing in neighborhoods that do not always love them back. The poems move from classrooms to courts to kitchen tables and bedroom prayers, speaking in the plain voice of a young man who refuses to lie about what hurts and what heals.
                  </p>
                  <p>
                    Away from the page, Kiminou is a committed student athlete and youth builder. He competes as a varsity level basketball player, trains with the same intensity he brings to the notebook, and studies film and footwork with professional ambition. He is the Director of Artists and Athletes For Change, a platform that uses story, apparel, and mentorship to help young people turn their talent into testimony and their testimony into work that can feed them.
                  </p>
                  <p>
                    On stage and on the court he carries the same mission as in his books: to prove that Black boys are not problems to control but lives to protect, futures to fund, and voices that deserve to stand at the center of the room.
                  </p>
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
