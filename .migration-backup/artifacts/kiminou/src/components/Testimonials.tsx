import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import coachImage from "@assets/stock_images/hispanic_male_basket_bda609d8.jpg";
import teacherImage from "@assets/stock_images/hispanic_female_teac_ec6c82ff.jpg";
import entrepreneurImage from "@assets/stock_images/young_asian_female_e_ebdc3282.jpg";
import teammateImage from "@assets/stock_images/black_male_athlete_f_3482c3ba.jpg";
import directorImage from "@assets/stock_images/black_female_doctor__f790a86a.jpg";
import readerImage from "@assets/stock_images/young_person_reading_ebde28b9.jpg";

const testimonials = [
  {
    name: "Coach Martinez",
    role: "Head Basketball Coach",
    org: "Cristo Rey De La Salle",
    quote: "Kiminou's leadership on and off the court is extraordinary. It's his mental game and team-first attitude that sets him apart. A true captain.",
    avatar: coachImage,
    category: "Athletics",
  },
  {
    name: "Ms. Rodriguez",
    role: "English Department Head",
    org: "Ygnacio Valley High School",
    quote: "Seven published works by 19? That's not just impressive, it's unprecedented. Reading Kiminou's poetry is like witnessing raw talent transform into refined artistry.",
    avatar: teacherImage,
    category: "Literature",
  },
  {
    name: "Sarah Chen",
    role: "Young Entrepreneur",
    org: "Bay Area Youth Business Network",
    quote: "The Tee Shirt Teens is not just a brand, it's a movement. Kiminou understands our generation in a way that resonates authentically.",
    avatar: entrepreneurImage,
    category: "Business",
  },
  {
    name: "Marcus Thompson",
    role: "Teammate & Friend",
    org: "Ygnacio Valley Football",
    quote: "Playing alongside Kiminou changed my perspective. It's his heart that makes him unstoppable. On and off the field, he elevates everyone around him.",
    avatar: teammateImage,
    category: "Athletics",
  },
  {
    name: "Dr. Patricia Williams",
    role: "Program Director",
    org: "Miles Hall Foundation",
    quote: "His voice carries wisdom beyond his years. Kiminou's commitment to meaningful change in our community is extraordinary and infectious.",
    avatar: directorImage,
    category: "Community",
  },
  {
    name: "Jamie Foster",
    role: "Poetry Reader",
    org: "BookShop.org Community",
    quote: "'Hopeless Romantic' moved me to tears. Kiminou writes with vulnerability and strength that's rare in any writer, let alone someone so young.",
    avatar: readerImage,
    category: "Literature",
  },
];

const categoryColors: Record<string, string> = {
  Athletics: "text-amber-400/70",
  Literature: "text-blue-300/70",
  Business: "text-emerald-400/70",
  Community: "text-purple-400/70",
};

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="group relative border border-white/8 bg-white/[0.03] p-7 flex flex-col gap-5 hover:border-amber-400/20 hover:bg-white/[0.055] transition-all duration-500"
      data-testid={`testimonial-card-${index}`}
    >
      <div className="absolute top-6 right-6">
        <span className="font-serif text-4xl text-white/6 group-hover:text-amber-400/10 transition-colors duration-500 leading-none">
          "
        </span>
      </div>

      <p className="font-serif text-base md:text-lg text-white/65 leading-relaxed italic flex-1">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-4 pt-3 border-t border-white/8">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover grayscale opacity-70 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/80 truncate">{t.name}</p>
          <p className="text-xs text-white/40 truncate">{t.role} · {t.org}</p>
        </div>
        <span className={`text-xs uppercase tracking-[0.2em] font-medium ${categoryColors[t.category] ?? "text-white/30"} shrink-0`}>
          {t.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className="py-28 md:py-40 bg-background" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/60 mb-4 font-medium">
            Testimonials
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-light text-white"
            data-testid="testimonials-title"
          >
            What Others Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
