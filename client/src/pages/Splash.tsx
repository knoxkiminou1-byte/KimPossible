import { useEffect } from "react";

export default function Splash() {
  useEffect(() => {
    const splash = document.getElementById('splash');
    const hotspot = document.getElementById('hotspot');
    const enterBtn = document.getElementById('enterBtn');
    
    function createRipple(event: MouseEvent) {
      const splash = event.currentTarget as HTMLElement;
      const rect = splash.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,212,0,.4)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      splash.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    
    function enterSite() {
      if (splash) {
        splash.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = '/home';
        }, 500);
      }
    }
    
    // Main interaction
    if (hotspot) {
      hotspot.addEventListener('click', (e) => {
        createRipple(e as MouseEvent);
        setTimeout(enterSite, 300);
      });
    }
    
    // Fallback button
    if (enterBtn) {
      enterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        enterSite();
      });
    }
    
    // Keyboard accessibility
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterSite();
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --hotspot-left: 18%;
          --hotspot-top: 80%;
          --hotspot-width: 15%;
          --hotspot-height: 20%;
          --bg: #0d0d0f;
          --fg: #fff;
          --accent: #ffd400;
        }

        .splash-page {
          height: 100vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: var(--bg);
          color: var(--fg);
        }

        .splash {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #111;
          animation: rise .7s cubic-bezier(.2,.9,.2,1) both;
        }

        .splash::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 80% at 20% 20%, rgba(255, 214, 94, 0.14), transparent 55%),
            radial-gradient(100% 70% at 80% 0%, rgba(90, 185, 255, 0.1), transparent 60%),
            linear-gradient(180deg, rgba(8, 10, 14, 0.28), rgba(8, 10, 14, 0.58) 55%, rgba(8, 10, 14, 0.86));
          z-index: 1;
          pointer-events: none;
          animation: glowShift 16s ease-in-out infinite alternate;
        }

        .splash::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 120% at 50% 30%, transparent 55%, rgba(0, 0, 0, 0.65) 100%);
          z-index: 2;
          pointer-events: none;
        }
        
        @keyframes rise { 
          from { 
            opacity: 0; 
            transform: translateY(16px) scale(.985); 
          } 
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          } 
        }

        .art {
          position: absolute;
          inset: 0;
          background-image: url("/kiminou-hero-feb-27-2026.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: saturate(1.15) contrast(1.05);
          transform-origin: center;
          will-change: transform;
          animation: heroFloat 30s ease-in-out infinite alternate;
          user-select: none;
          -webkit-user-drag: none;
          z-index: 0;
        }

        @keyframes heroFloat {
          0% { transform: scale(1.02) translate3d(0, 0.5%, 0); }
          50% { transform: scale(1.05) translate3d(-0.5%, -1.2%, 0); }
          100% { transform: scale(1.08) translate3d(-1.4%, -3%, 0); }
        }

        @keyframes glowShift {
          0% { opacity: 0.7; transform: translate3d(0, 0, 0); }
          100% { opacity: 1; transform: translate3d(0, -1.5%, 0); }
        }

        .splash-glow {
          position: absolute;
          inset: -8%;
          background:
            radial-gradient(34% 28% at 22% 22%, rgba(255, 232, 173, 0.18), transparent 70%),
            radial-gradient(28% 26% at 74% 26%, rgba(160, 204, 255, 0.12), transparent 72%),
            radial-gradient(30% 28% at 50% 72%, rgba(255, 255, 255, 0.08), transparent 74%);
          mix-blend-mode: screen;
          opacity: 0.52;
          pointer-events: none;
          z-index: 2;
          will-change: transform, opacity;
          animation: glowPulse 22s ease-in-out infinite alternate;
        }

        @keyframes glowPulse {
          0% { opacity: 0.42; transform: scale(1) translate3d(0, 0, 0); }
          50% { opacity: 0.62; transform: scale(1.04) translate3d(0, -1%, 0); }
          100% { opacity: 0.5; transform: scale(1.08) translate3d(-1%, -2%, 0); }
        }


        .hotspot {
          position: absolute;
          left: var(--hotspot-left);
          top: var(--hotspot-top);
          width: var(--hotspot-width);
          height: var(--hotspot-height);
          transform: translate(-50%, -50%);
          cursor: pointer;
          border-radius: 50%;
          background: rgba(255,212,0,.08);
          border: 2px solid rgba(255,212,0,.2);
          backdrop-filter: blur(2px);
          transition: all .25s ease;
          animation: glow 2s ease-in-out infinite alternate;
          z-index: 3;
        }
        
        .hotspot:hover {
          background: rgba(255,212,0,.2);
          border-color: rgba(255,212,0,.6);
          transform: translate(-50%, -50%) scale(1.1);
        }
        
        @keyframes glow {
          0% { 
            box-shadow: 0 0 20px rgba(255,212,0,.3); 
          }
          100% { 
            box-shadow: 0 0 40px rgba(255,212,0,.6), 0 0 60px rgba(255,212,0,.3); 
          }
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        .enter-btn {
          position: absolute;
          left: var(--hotspot-left);
          top: var(--hotspot-top);
          transform: translate(-50%, -50%);
          padding: .5rem 1rem;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s ease;
          text-decoration: none;
          display: inline-block;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 15px rgba(255,212,0,.4);
          z-index: 10;
        }

        /* Mobile responsiveness for iPhone and small screens */
        @media (max-width: 768px) {
          :root {
            --hotspot-left: 18%;
            --hotspot-top: 75%;
            --hotspot-width: 20%;
            --hotspot-height: 15%;
          }
          
          .enter-btn {
            padding: .4rem .8rem;
            font-size: 0.8rem;
          }
          
          .hotspot {
            border-width: 1px;
          }
        }

        @media (max-width: 480px) {
          :root {
            --hotspot-left: 20%;
            --hotspot-top: 70%;
            --hotspot-width: 25%;
            --hotspot-height: 20%;
          }
          
          .enter-btn {
            padding: .35rem .7rem;
            font-size: 0.75rem;
          }
        }
        
        .enter-btn:hover {
          background: #ffdf33;
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(255,212,0,.6);
        }

        .fade-out {
          animation: fadeOut .5s ease-in-out forwards;
        }
        
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .art,
          .splash::before,
          .splash-glow {
            animation: none;
          }
        }
      `}} />
      
      <div className="splash-page">
        <div className="splash" id="splash">
          <div className="art" aria-hidden="true" />
          <div className="splash-glow" />
          
          <div className="hotspot" id="hotspot"></div>
          
          
          <button className="enter-btn" id="enterBtn">ENTER</button>
        </div>
      </div>
    </>
  );
}
