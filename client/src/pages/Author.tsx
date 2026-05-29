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
    description: "Director of Artists and Athletes For Change, organizing creative and athletic projects with a practical community focus.",
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
        <meta name="description" content="Kiminou Knox is a Bay Area writer, poet, athlete, and program builder working across books, basketball, speaking, and community projects." />
        <link rel="canonical" href="https://www.kiminouknox.com/author" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Kiminou Knox | Author Profile" />
        <meta property="og:description" content="Author of poetry, fiction, and a children's storybook." />
        <meta property="og:url" content="https://www.kiminouknox.com/author" />
        <meta property="og:image" content="https://www.kiminouknox.com/author-kiminou.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kiminou Knox | Author Profile" />
        <meta name="twitter:image" content="https://www.kiminouknox.com/author-kiminou.jpg" />
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

          <section id="bio" className="max-w-6xl mx-auto px-6 py-16 lg:py-24 scroll-mt-40 relative overflow-hidden">
            <div className="grid gap-12 lg:grid-cols-2 items-center relative z-10">
              <motion.div 
                className="relative w-full max-w-md mx-auto lg:order-1"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="aspect-[4/5] rounded-lg overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40 relative">
                  <motion.img
                    src="/author-kiminou.jpg"
                    alt="Kiminou Knox - author, athlete, and entrepreneur from East Palo Alto"
                    title="Kiminou Knox - Writer, Athlete & Program Builder"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.03 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    loading="eager"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 rounded-md bg-amber-300 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-black shadow-lg shadow-black/30"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
                >
                  Poet · Author · Athlete
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-6 lg:order-2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
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
                  Writer, poet, athlete, and program builder from East Palo Alto, California.
                </motion.p>
                <motion.p 
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Author of poetry, fiction, and a children's storybook.
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
	                      Kiminou Knox is a writer, speaker, athlete, and program builder from East Palo Alto, now based in Oakland, California. His work moves between poetry, fiction, basketball, faith, and community projects for young people.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Early Life and Lineage</h3>
	                    <p>
	                      Born and raised in East Palo Alto, Knox grew up around church, school gyms, family stories, and community work. He is the son of Rashida Knox and the grandson of Faye McNair Knox, whose service in East Palo Alto remains part of the standard he works from.
	                    </p>
	                    <p>
	                      Those rooms gave him a practical sense of faith, memory, pressure, and responsibility. His writing keeps returning to what families carry, what boys are taught to hide, and what it takes to speak plainly.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Literary Work and Themes</h3>
	                    <p>
	                      Knox has published seven books across poetry, fiction, and children's storytelling. His titles <em className="text-amber-300/90">Poems From A Black Boy</em>, <em className="text-amber-300/90">Black Boy Poems</em>, <em className="text-amber-300/90">Hopeless Romantic</em>, <em className="text-amber-300/90">The Spirit of Solomon</em>, <em className="text-amber-300/90">Our Father</em>, <em className="text-amber-300/90">Boys Raised In Silence</em>, and a children's storybook written with his younger brother move across poems, narrative, prayer, and reflection.
	                    </p>
	                    <p>
	                      The pages deal with faith, mental health, family fracture, masculinity, love, longing, and spiritual confusion. The goal is not to make pain decorative; it is to name it clearly enough that a reader can recognize something true.
	                    </p>
	                    <p>
	                      Across the work, Black boys are treated as whole people with complicated feelings, private questions, and room to change. Knox writes toward the parts of life that are often left unspoken.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Voice, Form, and Craft</h3>
	                    <p>
	                      Knox's writing moves between confession, prayer, observation, and critique. He is interested in direct language, emotional detail, and work that can be read out loud without losing its meaning.
	                    </p>
	                    <p>
	                      Some projects are tight poems. Others work as narrative, interior monologue, or meditative reflection. What connects them is the attempt to say what is real without dressing it up.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Faith, Masculinity, and Mental Health</h3>
	                    <p>
	                      Raised around the Black church, Knox writes about Christianity as a lived framework for doubt, desire, discipline, grace, and responsibility. His work asks hard questions without rushing to clean answers.
	                    </p>
	                    <p>
	                      Masculinity, in his pages, is something to examine instead of simply inherit. He writes about boys taught to be durable before they are allowed to be honest.
	                    </p>
	                    <p>
	                      Mental health is central to that work. Knox makes room for loneliness, anger, shame, therapy, breakdown, recovery, and the long process of learning how to name what hurts.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">KimYaps: The Podcast</h3>
	                    <p>
	                      Knox extends the same questions into audio with KimYaps. Episodes cover Christianity, love, relationships, identity, emotional growth, and the private truths people often struggle to say out loud.
	                    </p>
	                    <p>
	                      The format is conversational, but the standard is the same as the writing: be clear, stay honest, and do not turn vulnerability into a performance.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Athletics and Discipline</h3>
	                    <p>
	                      As a basketball player and multi-sport athlete, Knox brings the same practice habits to training that he brings to writing. Athletics gives him a daily structure for body, mind, and focus.
	                    </p>
	                    <p>
	                      Consistency, film study, weight-room work, and repetition all show up in the creative process too. The court and the page are different spaces, but both demand patience and accountability.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Leadership, Institutions, and Youth Development</h3>
	                    <p>
	                      As the founder of The TeeShirtTeens and Director of Artists and Athletes For Change (AAFC), Knox builds projects around young talent, expression, and practical opportunity.
	                    </p>
	                    <p>
	                      The work is meant to give young creators and athletes structure, mentorship, and a record of what they are building, not just a moment of attention.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">Operating Standard</h3>
	                    <p>
	                      Every arena Knox enters, from literature and media to leadership and athletics, gets the same operating standard: show up prepared, respect the room, and build work that can last beyond a single post or event.
	                    </p>
	                    <p>
	                      His focus is simple: tell the truth, build useful structure, and take young people's inner lives seriously.
	                    </p>
	                  </div>

                  <div className="space-y-4">
	                    <h3 className="font-serif text-2xl text-white">What Comes Next</h3>
	                    <p>
	                      The work is still growing. Knox is continuing to write, train, speak, and build with young creators and athletes who are trying to turn discipline into something visible.
	                    </p>
	                    <p>
	                      Whether on the page, behind a microphone, on the court, or in a room full of students, the goal is the same: make honest work and leave behind something useful.
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
