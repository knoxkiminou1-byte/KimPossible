import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const lookbookImages = [
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Athletic excellence in action",
    title: "Athletic Excellence",
    description: "Championship performance on the field"
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Literary achievement celebration",
    title: "Literary Recognition",
    description: "Celebrated work touching hearts and minds"
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Entrepreneurial innovation presentation",
    title: "Innovation Showcase",
    description: "Presenting breakthrough solutions"
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Architectural design process",
    title: "Design Excellence",
    description: "Creating spaces that inspire"
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Leadership and mentoring",
    title: "Leadership Impact",
    description: "Inspiring the next generation"
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
            A curated collection of moments that define excellence across all domains.
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
              className="lookbook-item w-80 md:w-96 flex-shrink-0"
              data-testid={`lookbook-item-${index}`}
            >
              <img 
                src={item.src}
                alt={item.alt}
                className="w-full h-96 object-cover rounded-lg shadow-2xl" 
                loading="lazy"
              />
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
