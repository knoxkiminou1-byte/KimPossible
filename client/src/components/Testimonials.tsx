import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import coachImage from "@assets/stock_images/hispanic_male_basket_bda609d8.jpg";
import teacherImage from "@assets/stock_images/hispanic_female_teac_ec6c82ff.jpg";
import entrepreneurImage from "@assets/stock_images/young_asian_female_e_ebdc3282.jpg";
import teammateImage from "@assets/stock_images/black_male_athlete_f_3482c3ba.jpg";
import directorImage from "@assets/stock_images/black_female_doctor__f790a86a.jpg";
import readerImage from "@assets/stock_images/young_person_reading_ebde28b9.jpg";

interface Testimonial {
  name: string;
  role: string;
  organization: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Coach Martinez",
    role: "Head Basketball Coach",
    organization: "Cristo Rey De La Salle",
    content:
      "Kiminou's leadership on and off the court is extraordinary. At 6 feet 7 inches, he dominates physically, but it's his mental game and team-first attitude that sets him apart.",
    avatar: coachImage,
    rating: 5,
  },
  {
    name: "Ms. Rodriguez",
    role: "English Department Head",
    organization: "Ygnacio Valley High School",
    content:
      "Reading Kiminou's poetry is watching raw talent become refined artistry. Seven published works at his age is rare and earned.",
    avatar: teacherImage,
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Young Entrepreneur",
    organization: "Bay Area Youth Business Network",
    content:
      "The Tee Shirt Teens feels like a movement, not just a brand. Kiminou understands youth culture and turns that insight into action.",
    avatar: entrepreneurImage,
    rating: 5,
  },
  {
    name: "Marcus Thompson",
    role: "Teammate",
    organization: "Ygnacio Valley Football",
    content:
      "Playing alongside Kiminou changed my perspective. His presence raises the standard for everyone around him.",
    avatar: teammateImage,
    rating: 5,
  },
  {
    name: "Dr. Patricia Williams",
    role: "Program Director",
    organization: "Miles Hall Foundation",
    content:
      "His voice carries wisdom and responsibility. He writes and speaks with purpose.",
    avatar: directorImage,
    rating: 5,
  },
  {
    name: "Jamie Foster",
    role: "Reader",
    organization: "Bookshop Community",
    content: "Kiminou writes with vulnerability and strength. The work leaves a real emotional imprint.",
    avatar: readerImage,
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5600);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden py-24" data-testid="testimonials-section">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090d] to-[#06070b]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="luxury-kicker mb-4">Testimonials</p>
          <h2 className="mb-5 font-serif text-4xl font-light text-amber-50 md:text-5xl" data-testid="testimonials-title">
            What Others Say
          </h2>
          <p className="mx-auto max-w-2xl text-amber-50/74" data-testid="testimonials-subtitle">
            Coaches, educators, readers, and community voices.
          </p>
        </div>

        <div className="luxury-surface relative rounded-3xl p-8 md:p-12">
          <div className="mb-5 flex justify-center gap-1">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-200 text-amber-200" />
            ))}
          </div>

          <blockquote className="mb-8 text-center font-serif text-2xl leading-relaxed text-amber-50/94 md:text-3xl">
            "{current.content}"
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <img src={current.avatar} alt={current.name} className="h-14 w-14 rounded-full border border-amber-100/24 object-cover" />
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-amber-100/65">{current.name}</p>
              <p className="text-sm text-amber-50/72">
                {current.role} • {current.organization}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              setIsAutoPlaying(false);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-amber-100/22 bg-black/40 p-2 text-amber-100/75 transition hover:text-amber-50"
            data-testid="testimonials-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              setCurrentIndex((prev) => (prev + 1) % testimonials.length);
              setIsAutoPlaying(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-amber-100/22 bg-black/40 p-2 text-amber-100/75 transition hover:text-amber-50"
            data-testid="testimonials-next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2.5 rounded-full transition ${index === currentIndex ? "w-8 bg-amber-200" : "w-2.5 bg-amber-100/25"}`}
              data-testid={`testimonial-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
