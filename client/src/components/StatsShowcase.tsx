import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Trophy, Book, Users, Heart, Target, Star } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const stats: Stat[] = [
  {
    label: "Published Books",
    value: 6,
    icon: <Book className="w-6 h-6" />,
    color: "text-purple-400",
    description: "Poetry and Stories"
  },
  {
    label: "Major Awards",
    value: 5,
    icon: <Star className="w-6 h-6" />,
    color: "text-yellow-400",
    description: "Recognition and Honors"
  },
  {
    label: "Height",
    value: 6,
    suffix: "'7\" / 235 lbs",
    icon: <Target className="w-6 h-6" />,
    color: "text-green-400",
    description: "Athletic Profile"
  },
  {
    label: "Class of",
    value: 2025,
    icon: <Trophy className="w-6 h-6" />,
    color: "text-blue-400",
    description: "Graduation Year"
  }
];

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

function AnimatedCounter({ value, suffix = "", duration = 2000, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startCount = 0;
    const endCount = value;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startCount + (endCount - startCount) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
        setCount(endCount);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span id={`counter-${value}`} className={className}>
      {count}{suffix}
    </span>
  );
}

export default function StatsShowcase() {
  const statsRef = useScrollAnimation();

  return (
    <section className="py-8 bg-muted/30" data-testid="stats-showcase">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8" ref={statsRef}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="stats-title">
            By The Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="stats-subtitle">
            Quantifying a life of dedication, creativity, and athletic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="luxury-card group relative p-8 bg-card border border-border rounded-lg text-center hover:shadow-2xl transition-all duration-500"
              data-testid={`stat-card-${index}`}
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/50 mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>

              {/* Number */}
              <div className="mb-4">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    className="tabular-nums"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground" data-testid={`stat-description-${index}`}>
                {stat.description}
              </p>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}