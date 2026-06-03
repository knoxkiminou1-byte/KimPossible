import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const doors = [
  {
    id: "athlete",
    title: "ATHLETE",
    subtitle: "Basketball Excellence",
    description: "6 feet 7 inches, 235 lbs multi sport athlete (Basketball Guard/Forward/Center, Football DE/TE) who served as Cristo Rey De La Salle captain with features in PrepHoops and 247Sports, demonstrating exceptional leadership across multiple positions.",
    image: "/photos/athletic-pose.jpg",
  },
  {
    id: "author",
    title: "AUTHOR",
    subtitle: "Published Poet",
    description: "Seven published works including Black Boy Poems, Our Father, Boys Raised in Silence, The Spirit of Solomon, Hopeless Romantic, Poems From A Black Boy, and The Adventures of Kiminou the Great and Chua the Wise, all published by age 19.",
    image: "/photos/author-reading-book.jpg",
  },
  {
    id: "entrepreneur",
    title: "ENTREPRENEUR",
    subtitle: "The Tee Shirt Teens",
    description: "Co-Owner of The TeeShirtTeens apparel brand while maintaining demanding athletic schedule, showcasing entrepreneurial vision and time management skills that inspire youth empowerment.",
    image: "/photos/entrepreneur-style.jpg",
  },
  {
    id: "designer",
    title: "DESIGNER",
    subtitle: "Creative Visionary",
    description: "Content creator and creative designer who develops fashion concepts, community programs, and digital content that empowers youth and builds authentic connections.",
    image: "/photos/creative-designer.jpg",
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
            Four doors, four journeys. Explore the multifaceted talents of a 19 year old renaissance individual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doors.map((door, index) => {
            const doorRef = useScrollAnimation();
            
            return (
              <div
                key={door.id}
                ref={doorRef}
                className="door-card luxury-card group cursor-pointer animate-on-scroll"
                onClick={() => scrollToSection(door.id)}
                data-testid={`door-card-${door.id}`}
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden h-96 shadow-xl hover:shadow-2xl transition-all duration-500">
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
