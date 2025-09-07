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
          --hotspot-left: 25%;
          --hotspot-top: 50%;
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
          width: min(1200px, 92vw);
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,.45);
          overflow: hidden;
          background: #111;
          transform: translateY(6px);
          animation: rise .7s cubic-bezier(.2,.9,.2,1) both;
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
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(1.15) contrast(1.05);
          user-select: none;
          -webkit-user-drag: none;
        }

        .caption {
          position: absolute;
          left: 2rem;
          bottom: 1.25rem;
          font-weight: 700;
          letter-spacing: .02em;
          text-shadow: 0 2px 12px rgba(0,0,0,.55);
          display: flex;
          align-items: center;
          gap: .6rem;
        }
        
        .caption .pulse {
          width: .85rem;
          height: .85rem;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(255,212,0,.7);
          animation: pulse 1.3s infinite;
        }
        
        @keyframes pulse { 
          to { 
            box-shadow: 0 0 0 16px rgba(255,212,0,0); 
          } 
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
      `}} />
      
      <div className="splash-page">
        <div className="splash" id="splash">
          <img 
            src="/kiminou-hand-interactive.png" 
            alt="Kiminou Knox - Click to Enter" 
            className="art"
          />
          
          <div className="hotspot" id="hotspot"></div>
          
          <div className="caption">
            <div className="pulse"></div>
            <span>Click the hand to enter</span>
          </div>
          
          <button className="enter-btn" id="enterBtn">ENTER</button>
        </div>
      </div>
    </>
  );
}