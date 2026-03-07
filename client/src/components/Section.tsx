import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryButton: string;
  secondaryButton: string;
  imageLeft: boolean;
  background: string;
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primaryButton,
  secondaryButton,
  imageLeft,
  background
}: SectionProps) {
  const sectionRef = useScrollAnimation<HTMLElement>({ distance: 30, threshold: 0.12, direction: "up" });
  const contentRef = useScrollAnimation({
    delay: 140,
    distance: 44,
    threshold: 0.08,
    direction: imageLeft ? "left" : "right",
    scaleFrom: 0.975,
  });
  const imageRef = useScrollAnimation({
    delay: 50,
    distance: 38,
    threshold: 0.08,
    direction: imageLeft ? "right" : "left",
    scaleFrom: 0.98,
  });

  const handlePrimaryClick = () => {
    switch (primaryButton) {
      case "VIEW SPORTS CAREER":
        window.scrollTo({ top: document.getElementById('athlete')?.offsetTop || 0, behavior: 'smooth' });
        break;
      case "VIEW BOOKS":
        window.location.href = "/books";
        break;
      case "VISIT STORE":
        window.open("https://thett.shop", "_blank");
        break;
      case "VIEW PORTFOLIO":
        window.location.href = "/portfolio";
        break;
      default:
        break;
    }
  };

  const handleSecondaryClick = () => {
    switch (secondaryButton) {
      case "READ ATHLETIC STORY":
        window.scrollTo({ top: document.getElementById('athlete')?.offsetTop || 0, behavior: 'smooth' });
        break;
      case "READ EXCERPTS":
        window.location.href = "/books";
        break;
      case "BRAND STORY":
        window.scrollTo({ top: document.getElementById('entrepreneur')?.offsetTop || 0, behavior: 'smooth' });
        break;
      case "DESIGN PROCESS":
        window.scrollTo({ top: document.getElementById('designer')?.offsetTop || 0, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <section id={id} ref={sectionRef} className={`py-32 ${background} animate-on-scroll`} data-testid={`section-${id}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`${imageLeft ? 'order-2 lg:order-1' : ''} animate-on-scroll`} ref={imageRef}>
            <div className="luxury-card overflow-hidden rounded-lg">
              <img 
                src={image}
                alt={imageAlt}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-110" 
                loading="lazy"
                data-testid={`section-image-${id}`}
              />
            </div>
          </div>
          <div className={`${imageLeft ? 'order-1 lg:order-2' : ''} animate-on-scroll`} ref={contentRef}>
            <div className="mb-6">
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium" data-testid={`section-eyebrow-${id}`}>
                {eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6" data-testid={`section-title-${id}`}>
              {title}
            </h2>
            <div className="h-px w-24 bg-accent mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid={`section-description-${id}`}>
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePrimaryClick}
                className="luxury-button px-6 py-3 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                data-testid={`section-primary-button-${id}`}
              >
                {primaryButton}
              </button>
              <button 
                onClick={handleSecondaryClick}
                className="luxury-button px-6 py-3 border border-border text-foreground font-medium uppercase tracking-[0.1em] hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
                data-testid={`section-secondary-button-${id}`}
              >
                {secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
