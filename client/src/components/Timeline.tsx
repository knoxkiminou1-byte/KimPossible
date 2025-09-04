import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Trophy, Book, Star, Heart, Users } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "athletic" | "literary" | "business" | "personal";
  icon: React.ReactNode;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2006",
    title: "Early Life",
    description: "Born in the Bay Area, showing early signs of both athletic and creative talent",
    category: "personal",
    icon: <Star className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2019",
    title: "Athletic Emergence", 
    description: "Began dominating on the court and field, reaching 6'6\" and showing exceptional two-sport ability",
    category: "athletic",
    icon: <Trophy className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2020",
    title: "First Poetry Publication",
    description: "Published 'The Spirit Of Solomon' - the beginning of a literary journey",
    category: "literary", 
    icon: <Book className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMijA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2021",
    title: "Cristo Rey De La Salle",
    description: "Starred in basketball while developing leadership skills and academic excellence",
    category: "athletic",
    icon: <Trophy className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2022",
    title: "Literary Expansion",
    description: "Released 'Our Father?' and 'Poems from a Black Boy' - exploring faith, identity, and experience",
    category: "literary",
    icon: <Book className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2023", 
    title: "The Tee Shirt Teens",
    description: "Founded fashion brand focused on youth culture and authentic expression",
    category: "business",
    icon: <Users className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2024",
    title: "Miles Hall Foundation Honor",
    description: "Won essay contest recognizing community leadership and grandmother's legacy continuation",
    category: "personal",
    icon: <Heart className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2024",
    title: "Transfer to Ygnacio Valley",
    description: "Joined football team as 300-pound lineman, bringing experience and leadership",
    category: "athletic",
    icon: <Trophy className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2024",
    title: "Hopeless Romantic",
    description: "Released fourth poetry collection, showcasing emotional depth and maturity",
    category: "literary",
    icon: <Book className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  },
  {
    year: "2025",
    title: "Senior Year Excellence",
    description: "Graduating class of 2025, balancing athletics, academics, business, and creative writing",
    category: "personal",
    icon: <Star className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "athletic": return "bg-red-500/20 text-red-300 border-red-500/30";
    case "literary": return "bg-blue-500/20 text-blue-300 border-blue-500/30"; 
    case "business": return "bg-green-500/20 text-green-300 border-green-500/30";
    case "personal": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export default function Timeline() {
  const timelineRef = useScrollAnimation();

  return (
    <section className="py-24 bg-background" data-testid="timeline-section">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={timelineRef}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="timeline-title">
            The Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="timeline-subtitle">
            From Bay Area kid to multi-faceted renaissance man - a timeline of growth, achievement, and artistic expression
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 h-full"></div>

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={`${event.year}-${index}`}
                  className={`timeline-item relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  data-testid={`timeline-event-${index}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10">
                    <div className="absolute inset-0.5 bg-background rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <div className="luxury-card p-6 bg-card border border-border rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 group">
                      {/* Year Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getCategoryColor(event.category)}`}>
                        {event.icon}
                        {event.year}
                      </div>

                      {/* Event Image */}
                      {event.image && (
                        <div className="mb-4 overflow-hidden rounded-lg">
                          <img 
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Event Details */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" data-testid={`timeline-title-${index}`}>
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`timeline-description-${index}`}>
                        {event.description}
                      </p>

                      {/* Hover Effect Line */}
                      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-2/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-testid="timeline-cta">
          <p className="text-lg text-muted-foreground mb-6">
            The story continues...
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-medium">
            <Calendar className="w-5 h-5" />
            <span>Class of 2025 & Beyond</span>
          </div>
        </div>
      </div>
    </section>
  );
}