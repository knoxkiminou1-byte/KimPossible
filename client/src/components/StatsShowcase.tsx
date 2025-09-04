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
    label: "Poetry Books Published",
    value: 4,
    icon: <Book className="w-6 h-6" />,
    color: "text-blue-400",
    description: "Published by age 18"
  },
  {
    label: "Height",
    value: 6,
    suffix: "'8\"",
    icon: <Target className="w-6 h-6" />,
    color: "text-green-400",
    description: "Dominant presence"
  },
  {
    label: "Football Weight",
    value: 300,
    suffix: " lbs",
    icon: <Trophy className="w-6 h-6" />,
    color: "text-red-400",
    description: "Powerful lineman"
  },
  {
    label: "Years Business Experience",
    value: 2,
    suffix: "+",
    icon: <Users className="w-6 h-6" />,
    color: "text-purple-400",
    description: "The Tee Shirt Teens founder"
  },
  {
    label: "Sports Played Varsity",
    value: 2,
    icon: <Star className="w-6 h-6" />,
    color: "text-yellow-400",
    description: "Basketball & Football"
  },
  {
    label: "Community Awards",
    value: 1,
    suffix: "+",
    icon: <Heart className="w-6 h-6" />,
    color: "text-pink-400",
    description: "Miles Hall Foundation"
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
    <section className="py-24 bg-muted/30" data-testid="stats-showcase">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={statsRef}>
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

        {/* Additional Context */}
        <div className="mt-16 text-center" data-testid="stats-context">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-card border border-border rounded-full">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>18 Years Old</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>Class of 2025</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>Bay Area Native</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}