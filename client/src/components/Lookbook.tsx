import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const lookbookImages = [
  {
    src: "/photos/athletic-pose.jpg",
    alt: "Basketball athlete",
    title: "Basketball Excellence",
    description: "Varsity basketball captain at 6 feet 7 inches tall"
  },
  {
    src: "/photos/brown-suit-author.jpg",
    alt: "Published author with seven works",
    title: "Published Author",
    description: "Seven published works by age 19, exploring love, faith, and identity"
  },
  {
    src: "/photos/entrepreneur-style.jpg",
    alt: "The Tee Shirt Teens clothing brand founder",
    title: "Fashion Entrepreneur",
    description: "Founded The Tee Shirt Teens brand while balancing athletics and academics"
  },
  {
    src: "/photos/creative-designer.jpg",
    alt: "Creative design and content creation",
    title: "Creative Designer",
    description: "Content creator developing youth-focused fashion and community programs"
  },
  {
    src: "/photos/hero-portrait.jpg",
    alt: "Community leadership and youth advocacy",
    title: "Youth Leader",
    description: "Essay contest winner and community advocate continuing his grandmother's legacy"
  }
];

export default function Lookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useScrollAnimation();
  const descriptionRef = useScrollAnimation();

  const scrollToItem = (index: number) => {
    if (containerRef.current) {
      const itemWidth = 384; // w-96 = 384px
      const scrollLeft = index * (itemWidth + 32); // 32px gap
      containerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <section id="lookbook" className="py-32 bg-primary text-primary-foreground" data-testid="lookbook-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 
            ref={titleRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 animate-on-scroll"
            data-testid="lookbook-title"
          >
            Visual Journey
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl opacity-90 font-light max-w-2xl mx-auto animate-on-scroll"
            data-testid="lookbook-description"
          >
            Highlights from the multifaceted journey of a 19 year old Bay Area renaissance talent.
          </p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="lookbook-container overflow-x-auto scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
        data-testid="lookbook-container"
      >
        <div className="flex space-x-8 px-6 lg:px-8">
          {lookbookImages.map((item, index) => (
            <div 
              key={index}
              className="lookbook-item luxury-card w-80 md:w-96 flex-shrink-0"
              data-testid={`lookbook-item-${index}`}
            >
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-96 object-cover transition-transform duration-500 hover:scale-110" 
                  loading="lazy"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-xl font-semibold mb-2" data-testid={`lookbook-title-${index}`}>
                  {item.title}
                </h3>
                <p className="text-sm opacity-80" data-testid={`lookbook-description-${index}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          {lookbookImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => scrollToItem(index)}
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-colors"
              data-testid={`lookbook-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
