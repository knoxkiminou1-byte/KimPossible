import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Book, Users, Trophy, Mic, Heart, Star, Sparkles } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "athlete" | "author" | "leader" | "milestone";
  icon: typeof Award;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2005",
    title: "Born in East Palo Alto",
    description: "Kiminou Knox was born in East Palo Alto, California, beginning his journey in the heart of the Bay Area.",
    category: "milestone",
    icon: Star
  },
  {
    year: "2015",
    title: "Started Playing Basketball",
    description: "At age 10, Kiminou discovered his passion for basketball, training relentlessly to develop his skills on the court.",
    category: "athlete",
    icon: Trophy
  },
  {
    year: "2020",
    title: "High School Basketball Career",
    description: "Emerged as a standout player on his high school team, combining athletic ability with leadership on and off the court.",
    category: "athlete",
    icon: Trophy
  },
  {
    year: "2023",
    title: "NCAA Registered Athlete",
    description: "Officially registered with the NCAA, marking the beginning of his collegiate athletic journey.",
    category: "athlete",
    icon: Award
  },
  {
    year: "2024",
    title: "First Published Works",
    description: "Released 'Poems from a Black Boy' and 'Boys Raised in Silence', exploring identity, heritage, and the cost of silence.",
    category: "author",
    icon: Book
  },
  {
    year: "2024",
    title: "Youth Advocacy Begins",
    description: "Started working with youth organizations and schools, sharing his message of discipline, voice, and purpose.",
    category: "leader",
    icon: Users
  },
  {
    year: "2025",
    title: "Six Published Works",
    description: "By age 19, published six books including 'The Spirit of Solomon', 'Our Father?', 'Hopeless Romantic', and 'The Adventures of Kiminou the Great and Chua the Wise'.",
    category: "author",
    icon: Book
  },
  {
    year: "2025",
    title: "Speaker & Media Presence",
    description: "Began speaking engagements addressing craft, discipline, and the power of authentic voice to audiences across the Bay Area.",
    category: "leader",
    icon: Mic
  },
  {
    year: "2025",
    title: "Artists and Athletes for Change",
    description: "Founded AAFC to unite creatives and athletes in making meaningful impact in their communities.",
    category: "milestone",
    icon: Heart
  },
  {
    year: "Future",
    title: "Building a Legacy",
    description: "Continuing to write, compete, and inspire the next generation through books, basketball, and community leadership.",
    category: "milestone",
    icon: Sparkles
  }
];

const categoryColors = {
  athlete: "from-orange-500 to-red-500",
  author: "from-purple-500 to-indigo-500",
  leader: "from-emerald-500 to-teal-500",
  milestone: "from-amber-500 to-yellow-500"
};

const categoryLabels = {
  athlete: "The Athlete",
  author: "The Author",
  leader: "The Leader",
  milestone: "The Journey"
};

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden" data-testid="story-timeline">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Journey
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            My Story
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From East Palo Alto to published author and NCAA athlete. A journey of discipline, creativity, and purpose.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-800 hidden md:block">
            <motion.div 
              className="w-full bg-gradient-to-b from-amber-500 via-purple-500 to-emerald-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile Line */}
          <div className="absolute left-8 w-1 h-full bg-gray-800 md:hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-amber-500 via-purple-500 to-emerald-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Events */}
          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const Icon = event.icon;

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <motion.div
                      className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-gray-700 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[event.category]} text-white text-xs font-semibold mb-4`}>
                        <Icon className="w-3 h-3" />
                        {categoryLabels[event.category]}
                      </div>

                      {/* Year */}
                      <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${categoryColors[event.category]} bg-clip-text text-transparent mb-2`}>
                        {event.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <motion.div 
                    className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${categoryColors[event.category]} flex items-center justify-center shadow-lg shadow-${event.category === 'athlete' ? 'orange' : event.category === 'author' ? 'purple' : 'amber'}-500/30`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">The story continues...</p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251,191,36,0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Be Part of the Journey
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
