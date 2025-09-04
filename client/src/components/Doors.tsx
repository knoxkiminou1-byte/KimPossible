import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const doors = [
  {
    id: "athlete",
    title: "ATHLETE",
    subtitle: "Basketball & Football",
    description: "6'7\"-6'8\" multi-sport athlete who excelled in basketball and football throughout high school, serving as team captain at Ygnacio Valley High School.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: "author",
    title: "AUTHOR",
    subtitle: "Published Poet",
    description: "Four published poetry books including 'The Spirit Of Solomon', 'Our Father?', 'Poems from a Black Boy', and 'Hopeless Romantic' - all published by age 18.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: "entrepreneur",
    title: "ENTREPRENEUR",
    subtitle: "The Tee Shirt Teens",
    description: "Founder of The Tee Shirt Teens clothing brand - a youth-driven fashion venture focused on empowering young people through creative design and self-expression.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: "designer",
    title: "DESIGNER",
    subtitle: "Creative Visionary",
    description: "Content creator and creative designer who develops fashion concepts, community programs, and digital content that empowers youth and builds authentic connections.",
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
            Four doors, four journeys. Explore the multifaceted talents of an 18-year-old renaissance individual.
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
