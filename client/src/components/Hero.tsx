import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToWork = () => {
    window.location.href = '/books';
  };

  const scrollToContact = () => {
    window.location.href = '/contact';
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
          className="text-lg md:text-xl font-light mb-4 leading-relaxed max-w-3xl mx-auto animate-fadeInUp" 
          style={{animationDelay: '0.6s'}}
          data-testid="hero-intro"
        >
          I am a Bay Area writer and basketball athlete building a legacy through books, sport, and youth leadership.
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" 
          style={{animationDelay: '0.9s'}}
        >
          <button 
            onClick={scrollToWork}
            className="luxury-button px-8 py-4 bg-white text-black font-medium uppercase tracking-[0.1em] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            data-testid="button-read-work"
          >
            Read the Work
          </button>
          <button 
            onClick={scrollToContact}
            className="luxury-button px-8 py-4 border-2 border-white text-white font-medium uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            data-testid="button-work-with-me"
          >
            Work With Me
          </button>
        </div>
      </div>
    </section>
  );
}
