import { useEffect } from "react";

export default function Splash() {
  useEffect(() => {
    const splash = document.getElementById("splash");
    const hotspot = document.getElementById("hotspot");
    const enterBtn = document.getElementById("enterBtn");

    function createRipple(event: MouseEvent) {
      const rippleHost = event.currentTarget as HTMLElement;
      const rect = rippleHost.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ripple = document.createElement("div");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,212,0,.4)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      rippleHost.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    function enterSite() {
      if (splash) {
        window.sessionStorage.setItem("kk-play-intro", "1");
        splash.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      }
    }

    const handleHotspotClick = (event: Event) => {
      createRipple(event as MouseEvent);
      setTimeout(enterSite, 300);
    };

    const handleEnterButtonClick = (event: Event) => {
      event.preventDefault();
      enterSite();
    };

    hotspot?.addEventListener("click", handleHotspotClick);
    enterBtn?.addEventListener("click", handleEnterButtonClick);

    return () => {
      hotspot?.removeEventListener("click", handleHotspotClick);
      enterBtn?.removeEventListener("click", handleEnterButtonClick);
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --hotspot-left: 71%;
          --hotspot-top: 60%;
          --hotspot-width: 12%;
          --hotspot-height: 16%;
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
          background-image: url("/click-to-enter-orb-feb-27-2026.png");
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
            radial-gradient(34% 28% at 70% 58%, rgba(255, 232, 173, 0.18), transparent 22%),
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
          background: rgba(255,212,0,.12);
          border: 2px solid rgba(255,212,0,.42);
          backdrop-filter: blur(2px);
          transition: all .25s ease;
          animation: glow 2s ease-in-out infinite alternate;
          z-index: 3;
          padding: 0;
        }

        .hotspot:hover {
          background: rgba(255,212,0,.18);
          border-color: rgba(255,212,0,.75);
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
          right: 1.5rem;
          bottom: 1.5rem;
          padding: .6rem 1rem;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 999px;
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
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,212,0,.6);
        }

        .orb-label {
          position: absolute;
          left: var(--hotspot-left);
          top: calc(var(--hotspot-top) + 11%);
          transform: translateX(-50%);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255,255,255,.9);
          text-shadow: 0 2px 10px rgba(0,0,0,.55);
          z-index: 4;
          pointer-events: none;
          white-space: nowrap;
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

        @media (max-width: 768px) {
          :root {
            --hotspot-left: 71%;
            --hotspot-top: 61%;
            --hotspot-width: 18%;
            --hotspot-height: 18%;
          }

          .enter-btn {
            right: 1rem;
            bottom: 1rem;
            padding: .45rem .85rem;
            font-size: 0.8rem;
          }

          .hotspot {
            border-width: 1px;
          }

          .orb-label {
            top: calc(var(--hotspot-top) + 13%);
            font-size: 0.62rem;
          }
        }

        @media (max-width: 480px) {
          :root {
            --hotspot-left: 70%;
            --hotspot-top: 62%;
            --hotspot-width: 22%;
            --hotspot-height: 20%;
          }

          .enter-btn {
            right: 0.85rem;
            bottom: 0.85rem;
            padding: .4rem .72rem;
            font-size: 0.75rem;
          }

          .orb-label {
            top: calc(var(--hotspot-top) + 14%);
            letter-spacing: 0.2em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .art,
          .splash::before,
          .splash-glow {
            animation: none;
          }
        }
      `,
        }}
      />

      <div className="splash-page">
        <div className="splash" id="splash">
          <div className="art" aria-hidden="true" />
          <div className="splash-glow" />

          <button className="hotspot" id="hotspot" type="button" aria-label="Click the orb to enter">
            <span className="sr-only">Click to Enter</span>
          </button>
          <div className="orb-label">Click the Orb</div>

          <button className="enter-btn" id="enterBtn">ENTER</button>
        </div>
      </div>
    </>
  );
}
