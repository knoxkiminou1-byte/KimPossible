import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Trophy, Book, Star, Heart, Users, ArrowRight, ArrowDown, Sparkles, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "athletic" | "literary" | "business" | "personal";
  icon: React.ReactNode;
  image?: string;
  achievement?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2006",
    title: "Early Life",
    description: "Born in the Bay Area, showing early signs of both athletic and creative talent",
    achievement: "Foundation Years",
    category: "personal",
    icon: <Star className="w-5 h-5" />,
    image: "/photos/athletic-pose.jpg"
  },
  {
    year: "2019",
    title: "Athletic Emergence", 
    description: "Began excelling on the basketball court, reaching 6'7\" and showing exceptional athletic ability",
    achievement: "Multi-Sport Excellence",
    category: "athletic",
    icon: <Trophy className="w-5 h-5" />,
    image: "/photos/athletic-pose.jpg"
  },
  {
    year: "2020",
    title: "First Poetry Publication",
    description: "Published 'The Spirit Of Solomon' - the beginning of a literary journey",
    achievement: "Literary Debut",
    category: "literary", 
    icon: <Book className="w-5 h-5" />,
    image: "/photos/author-reading-book.jpg"
  },
  {
    year: "2021",
    title: "Cristo Rey De La Salle",
    description: "Starred in basketball while developing leadership skills and academic excellence",
    achievement: "Team Captain",
    category: "athletic",
    icon: <Trophy className="w-5 h-5" />,
    image: "/photos/athletic-pose.jpg"
  },
  {
    year: "2022",
    title: "Literary Expansion",
    description: "Released 'Our Father?' and 'Poems from a Black Boy' - exploring faith, identity, and experience",
    achievement: "Three Books Published",
    category: "literary",
    icon: <Book className="w-5 h-5" />,
    image: "/photos/author-reading-book.jpg"
  },
  {
    year: "2023", 
    title: "The Tee Shirt Teens",
    description: "Founded fashion brand focused on youth culture and authentic expression",
    achievement: "Entrepreneur Debut",
    category: "business",
    icon: <Users className="w-5 h-5" />,
    image: "/photos/entrepreneur-style.jpg"
  },
  {
    year: "2024",
    title: "Miles Hall Foundation Honor",
    description: "Won essay contest recognizing community leadership and grandmother's legacy continuation",
    achievement: "Community Recognition",
    category: "personal",
    icon: <Heart className="w-5 h-5" />,
    image: "/photos/youth-leader-portrait.jpg"
  },
  {
    year: "2024",
    title: "Transfer to Ygnacio Valley",
    description: "Continued athletic excellence at Ygnacio Valley, bringing leadership and basketball experience",
    achievement: "Program Builder",
    category: "athletic",
    icon: <Trophy className="w-5 h-5" />,
    image: "/photos/athletic-pose.jpg"
  },
  {
    year: "2024",
    title: "Hopeless Romantic",
    description: "Released fourth poetry collection, showcasing emotional depth and maturity",
    achievement: "Fourth Poetry Book",
    category: "literary",
    icon: <Book className="w-5 h-5" />,
    image: "/photos/author-reading-book.jpg"
  },
  {
    year: "2025",
    title: "Senior Year Excellence",
    description: "Graduating class of 2025, balancing athletics, academics, business, and creative writing",
    achievement: "Renaissance Man",
    category: "personal",
    icon: <Star className="w-5 h-5" />,
    image: "/photos/creative-designer.jpg"
  }
];

const getCategoryConfig = (category: string) => {
  switch (category) {
    case "athletic": 
      return {
        color: "bg-red-500/20 text-red-300 border-red-500/30",
        glow: "shadow-red-500/20",
        gradient: "from-red-500/10 to-red-600/5"
      };
    case "literary": 
      return {
        color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        glow: "shadow-blue-500/20",
        gradient: "from-blue-500/10 to-blue-600/5"
      };
    case "business": 
      return {
        color: "bg-green-500/20 text-green-300 border-green-500/30",
        glow: "shadow-green-500/20", 
        gradient: "from-green-500/10 to-green-600/5"
      };
    case "personal": 
      return {
        color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        glow: "shadow-purple-500/20",
        gradient: "from-purple-500/10 to-purple-600/5"
      };
    default: 
      return {
        color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        glow: "shadow-gray-500/20",
        gradient: "from-gray-500/10 to-gray-600/5"
      };
  }
};

export default function Timeline() {
  const timelineRef = useScrollAnimation();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(Array.from(prev).concat([index])));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px' }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observerRef.current?.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observerRef.current?.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden" data-testid="timeline-section">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-20" ref={timelineRef}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Journey of Excellence
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent" data-testid="timeline-title">
            The Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="timeline-subtitle">
            From Bay Area kid to multi-faceted renaissance man — a timeline of growth, achievement, and artistic expression that defines a generation
          </p>
        </div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 h-full timeline-line"></div>
          </div>

          {/* Timeline Events */}
          <div className="space-y-20">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.has(index);
              const config = getCategoryConfig(event.category);
              
              return (
                <div 
                  key={`${event.year}-${index}`}
                  className={`timeline-item relative flex items-center transition-all duration-1000 delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  data-index={index}
                  data-testid={`timeline-event-${index}`}
                >
                  {/* Animated Arrow Connector */}
                  <div className={`absolute top-1/2 z-20 ${isLeft ? 'left-1/2 ml-8' : 'right-1/2 mr-8'} transform -translate-y-1/2`}>
                    <div className={`flex items-center gap-2 ${isLeft ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-px bg-gradient-to-r ${isLeft ? 'from-primary/60 to-transparent' : 'from-transparent to-primary/60'} ${isVisible ? 'animate-pulse' : ''}`}></div>
                      <div className={`${isVisible ? 'animate-bounce' : ''}`}>
                        {isLeft ? <ArrowRight className="w-5 h-5 text-primary/80" /> : <ArrowRight className="w-5 h-5 text-primary/80 rotate-180" />}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot with Advanced Animation */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                    <div className={`relative w-8 h-8 ${isVisible ? 'animate-pulse' : ''}`}>
                      {/* Outer Glow Ring */}
                      <div className={`absolute inset-0 rounded-full bg-primary/20 ${config.glow} ${isVisible ? 'animate-ping' : ''}`}></div>
                      {/* Main Dot */}
                      <div className="absolute inset-0 bg-primary rounded-full border-4 border-background shadow-2xl">
                        <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                          <div className={`w-2.5 h-2.5 bg-primary rounded-full ${isVisible ? 'animate-pulse' : ''}`}></div>
                        </div>
                      </div>
                      {/* Floating Sparkles */}
                      {isVisible && (
                        <div className="absolute -inset-2">
                          <Sparkles className="absolute -top-1 -left-1 w-3 h-3 text-primary/60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                          <Zap className="absolute -bottom-1 -right-1 w-3 h-3 text-primary/60 animate-bounce" style={{ animationDelay: '1s' }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Card with Elaborate Effects */}
                  <div className={`w-5/12 ${isLeft ? 'pr-12' : 'pl-12'}`}>
                    <div className={`luxury-card relative p-8 bg-gradient-to-br ${config.gradient} border border-border/50 rounded-2xl shadow-2xl hover:shadow-4xl transition-all duration-700 group backdrop-blur-sm ${isVisible ? 'hover:scale-105' : ''}`}>
                      {/* Category Badge with Glow */}
                      <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold border mb-6 ${config.color} ${isVisible ? 'animate-pulse' : ''}`}>
                        <div className="p-1 bg-current/20 rounded-full">
                          {event.icon}
                        </div>
                        <span>{event.year}</span>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      </div>

                      {/* Event Image with Advanced Hover */}
                      {event.image && (
                        <div className="mb-6 overflow-hidden rounded-xl relative group">
                          <img 
                            src={event.image}
                            alt={event.title}
                            className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          {/* Achievement Badge Overlay */}
                          {event.achievement && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                              {event.achievement}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Event Details with Sophisticated Typography */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-500 font-serif" data-testid={`timeline-title-${index}`}>
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg" data-testid={`timeline-description-${index}`}>
                          {event.description}
                        </p>
                      </div>

                      {/* Interactive Hover Effects */}
                      <div className="absolute inset-0 rounded-2xl">
                        {/* Animated Border Gradient */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                        {/* Corner Accents */}
                        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-0 group-hover:rotate-45"></div>
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-0 group-hover:-rotate-45"></div>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-2/12"></div>
                </div>
              );
            })}
          </div>

          {/* Future Direction Arrow */}
          <div className="text-center mt-20 relative">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur animate-pulse"></div>
              <div className="relative luxury-card p-8 bg-gradient-to-br from-background to-muted/30 border border-primary/20 rounded-2xl">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Calendar className="w-6 h-6 text-primary animate-bounce" />
                  <ArrowDown className="w-6 h-6 text-primary animate-pulse" />
                  <Sparkles className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  The Story Continues...
                </h3>
                <p className="text-lg text-muted-foreground">
                  Class of 2025 & Beyond — The Next Chapter Awaits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}