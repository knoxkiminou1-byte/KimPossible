import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToDoors = () => {
    const element = document.querySelector('#doors');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Pause video if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Video Background */}
      <video 
        ref={videoRef}
        className="hero-video absolute inset-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
        poster="/kiminou-splash-art.png"
        data-testid="hero-video"
      >
        <source src="/kiminou-splash-art.png" type="video/mp4" />
      </video>
      
      {/* Fallback Image for Reduced Motion */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" 
        style={{backgroundImage: "url('/kiminou-splash-art.png')"}}
        data-testid="hero-fallback"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-8 animate-fadeInUp" 
          style={{animationDelay: '0.3s'}}
          data-testid="hero-title"
        >
          KIMINOU KNOX
        </h1>
        <p 
          className="text-xl md:text-2xl font-light mb-12 tracking-wide animate-fadeInUp" 
          style={{animationDelay: '0.6s'}}
          data-testid="hero-subtitle"
        >
          ATHLETE • AUTHOR • ENTREPRENEUR • DESIGNER
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" 
          style={{animationDelay: '0.9s'}}
        >
          <button 
            onClick={scrollToDoors}
            className="luxury-button px-8 py-4 bg-white text-black font-medium uppercase tracking-[0.1em] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            data-testid="button-enter-house"
          >
            ENTER THE HOUSE
          </button>
          <button 
            onClick={scrollToAbout}
            className="luxury-button px-8 py-4 border-2 border-white text-white font-medium uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            data-testid="button-read-work"
          >
            READ THE WORK
          </button>
        </div>
      </div>
    </section>
  );
}
