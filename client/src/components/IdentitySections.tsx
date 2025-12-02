import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Book, Trophy, Briefcase, PenTool, Award, Users, Mic, ShoppingBag, Star, Heart } from "lucide-react";
import { Link } from "wouter";

interface Book {
  title: string;
  year: string;
  description: string;
}

const books: Book[] = [
  { title: "Poems from a Black Boy", year: "2024", description: "A raw exploration of identity and heritage" },
  { title: "Boys Raised in Silence", year: "2024", description: "The cost of silence and finding voice" },
  { title: "The Spirit of Solomon", year: "2024", description: "Wisdom and spiritual reflection" },
  { title: "Our Father?", year: "2024", description: "Questions of faith and family" },
  { title: "Hopeless Romantic", year: "2024", description: "Love, loss, and vulnerability" },
  { title: "Adventures of Kiminou the Great", year: "2024", description: "A children's tale of courage" }
];

const athleteStats = [
  { label: "Position", value: "Guard/Forward" },
  { label: "Height", value: "6'4\"" },
  { label: "Weight", value: "195 lbs" },
  { label: "Class", value: "2024" }
];

const ventures = [
  { name: "Artists & Athletes for Change", icon: Heart, description: "Uniting creatives and athletes to make meaningful community impact" },
  { name: "Published Author", icon: PenTool, description: "Six published works exploring identity, faith, and the human experience" },
  { name: "Youth Speaker", icon: Mic, description: "Inspiring the next generation through speaking engagements" },
  { name: "Brand Ambassador", icon: ShoppingBag, description: "Representing authentic voices in sports and literature" }
];

export default function IdentitySections() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      {/* THE AUTHOR SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-400 text-sm uppercase tracking-[0.3em] mb-2 block">The</span>
            <h2 className="font-serif text-6xl md:text-8xl font-bold text-white">Author</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.title}
                className="group relative bg-gray-900/60 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Book className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-purple-400 text-sm font-medium">{book.year}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {book.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/books">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168,85,247,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Book className="w-5 h-5" />
                Explore All Books
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THE ATHLETE SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-black via-orange-950/20 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="mb-16 text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-400 text-sm uppercase tracking-[0.3em] mb-2 block">The</span>
            <h2 className="font-serif text-6xl md:text-8xl font-bold text-white">Athlete</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {athleteStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-gray-900/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(249,115,22,0.5)" }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">NCAA Registered</h3>
                  <p className="text-orange-400">Bay Area Basketball</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A versatile guard/forward from East Palo Alto, combining court vision with relentless work ethic. 
                Trained in discipline and teamwork, ready for the next level of competition.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Leadership", "Court Vision", "Discipline", "Versatility"].map((trait) => (
                  <span 
                    key={trait}
                    className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <Link href="/basketball">
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249,115,22,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trophy className="w-5 h-5" />
                  View Athletic Profile
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE ENTREPRENEUR SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-black via-amber-950/20 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2 block">The</span>
            <h2 className="font-serif text-6xl md:text-8xl font-bold text-white">Entrepreneur</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {ventures.map((venture, index) => {
              const Icon = venture.icon;
              return (
                <motion.div
                  key={venture.name}
                  className="group relative bg-gray-900/60 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {venture.name}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {venture.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
              Building bridges between athletics, literature, and community impact. 
              Every venture is rooted in purpose and authenticity.
            </p>
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251,191,36,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase className="w-5 h-5" />
                Work Together
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
