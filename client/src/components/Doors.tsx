import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const doors = [
  {
    id: "athlete",
    title: "ATHLETE",
    subtitle: "Excellence in Motion",
    description: "Discover the journey of athletic mastery and the pursuit of physical excellence.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: "author",
    title: "AUTHOR",
    subtitle: "Words That Transform",
    description: "Explore the literary works that inspire, challenge, and illuminate the human experience.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: "entrepreneur",
    title: "ENTREPRENEUR",
    subtitle: "Vision in Action",
    description: "Experience the innovative ventures that shape industries and create lasting impact.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: "architect",
    title: "ARCHITECT",
    subtitle: "Space Reimagined",
    description: "Witness the architectural innovations that redefine how we inhabit and experience space.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
];

export default function Doors() {
  const sectionRef = useScrollAnimation();
  const titleRef = useScrollAnimation();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doors" className="py-32 bg-background" data-testid="doors-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 animate-on-scroll"
            data-testid="doors-title"
          >
            Choose Your Path
          </h2>
          <p 
            ref={sectionRef}
            className="text-xl text-muted-foreground font-light max-w-2xl mx-auto animate-on-scroll"
            data-testid="doors-description"
          >
            Four doors, four journeys. Each path reveals a different facet of excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doors.map((door, index) => {
            const doorRef = useScrollAnimation();
            
            return (
              <div
                key={door.id}
                ref={doorRef}
                className="door-card group cursor-pointer animate-on-scroll"
                onClick={() => scrollToSection(door.id)}
                data-testid={`door-card-${door.id}`}
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden h-96">
                  <div 
                    className="h-64 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${door.image}')` }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="font-serif text-2xl font-semibold mb-2" data-testid={`door-title-${door.id}`}>
                          {door.title}
                        </h3>
                        <p className="text-sm opacity-90" data-testid={`door-subtitle-${door.id}`}>
                          {door.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`door-description-${door.id}`}>
                      {door.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
