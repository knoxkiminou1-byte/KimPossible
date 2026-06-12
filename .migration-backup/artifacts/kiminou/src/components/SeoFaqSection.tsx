import { motion } from "framer-motion";
import type { FaqItem } from "@/lib/seo";

type SeoFaqSectionProps = {
  title: string;
  intro?: string;
  items: FaqItem[];
  className?: string;
};

export default function SeoFaqSection({ title, intro, items, className = "" }: SeoFaqSectionProps) {
  return (
    <section className={`py-20 border-t border-white/6 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400/60 mb-4 font-medium">FAQ</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">{title}</h2>
          {intro && <p className="text-white/45 leading-relaxed max-w-2xl">{intro}</p>}
        </motion.div>

        <div className="grid gap-4">
          {items.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group border border-white/8 bg-white/[0.02] open:bg-white/[0.03] p-5 md:p-6"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-left">
                <span className="font-serif text-xl md:text-2xl text-white/90 pr-6">{item.question}</span>
                <span className="text-amber-300/50 text-sm uppercase tracking-[0.25em] group-open:text-amber-200">
                  Expand
                </span>
              </summary>
              <p className="mt-4 text-white/50 leading-relaxed max-w-3xl">{item.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
