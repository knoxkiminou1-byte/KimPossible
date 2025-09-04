import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  organization: string;
  content: string;
  avatar: string;
  rating: number;
  category: "athletic" | "literary" | "business" | "personal";
}

const testimonials: Testimonial[] = [
  {
    name: "Coach Martinez",
    role: "Head Basketball Coach",
    organization: "Cristo Rey De La Salle",
    content: "Kiminou's leadership on and off the court is extraordinary. At 6'8\", he dominates physically, but it's his mental game and team-first attitude that sets him apart. A true captain.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    category: "athletic"
  },
  {
    name: "Ms. Rodriguez",
    role: "English Department Head", 
    organization: "Ygnacio Valley High School",
    content: "Reading Kiminou's poetry is like witnessing raw talent transform into refined artistry. Four published books by 18? That's not just impressive—it's unprecedented for someone his age.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    category: "literary"
  },
  {
    name: "Sarah Chen",
    role: "Young Entrepreneur",
    organization: "Bay Area Youth Business Network",
    content: "The Tee Shirt Teens isn't just a brand—it's a movement. Kiminou understands our generation in a way that resonates authentically. His business instincts are incredible.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    category: "business"
  },
  {
    name: "Marcus Thompson",
    role: "Teammate & Friend",
    organization: "Ygnacio Valley Football",
    content: "Playing alongside Kiminou changed my perspective. He's 300 pounds of pure determination, but it's his heart that makes him unstoppable. On and off the field, he elevates everyone.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    category: "athletic"
  },
  {
    name: "Dr. Patricia Williams",
    role: "Program Director",
    organization: "Miles Hall Foundation",
    content: "Kiminou's essay honored his grandmother's legacy while addressing critical community issues. His voice carries wisdom beyond his years and a commitment to meaningful change.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    category: "personal"
  },
  {
    name: "Jamie Foster",
    role: "Poetry Reader & Fan",
    organization: "BookShop.org Community",
    content: "'Hopeless Romantic' moved me to tears. Kiminou writes with vulnerability and strength that's rare in any writer, let alone someone so young. His words heal.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    category: "literary"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonialsRef = useScrollAnimation();

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "athletic": return "text-red-400";
      case "literary": return "text-blue-400";
      case "business": return "text-green-400";
      case "personal": return "text-purple-400";
      default: return "text-gray-400";
    }
  };

  return (
    <section className="py-24 bg-muted/30" data-testid="testimonials-section">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={testimonialsRef}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="testimonials-title">
            What Others Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-subtitle">
            Voices from coaches, teachers, teammates, and community members who've witnessed the impact firsthand
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="luxury-card relative bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-20 h-20" />
            </div>

            {/* Category Badge */}
            <div className="flex justify-center mb-8">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-background/50 border ${getCategoryColor(currentTestimonial.category)}`}>
                <div className="w-2 h-2 bg-current rounded-full"></div>
                {currentTestimonial.category.charAt(0).toUpperCase() + currentTestimonial.category.slice(1)}
              </span>
            </div>

            {/* Testimonial Content */}
            <div className="text-center relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img 
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-border"
                />
                <div className="text-left">
                  <div className="font-bold text-lg">{currentTestimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{currentTestimonial.role}</div>
                  <div className="text-sm text-muted-foreground">{currentTestimonial.organization}</div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center transition-colors shadow-lg"
              data-testid="testimonials-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center transition-colors shadow-lg"
              data-testid="testimonials-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                data-testid={`testimonial-dot-${index}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="testimonials-autoplay-toggle"
            >
              {isAutoPlaying ? "Pause auto-advance" : "Resume auto-advance"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}