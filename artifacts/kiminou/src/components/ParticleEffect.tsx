import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  hue: number;
  saturation: number;
  lightness: number;
  type: 'sparkle' | 'glow' | 'dust' | 'star';
  pulsePhase: number;
}

interface ParticleEffectProps {
  density?: number;
  colors?: string[];
  className?: string;
  effects?: ('sparkle' | 'glow' | 'dust' | 'star')[];
}

export default function ParticleEffect({ 
  density = 80, 
  colors = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"],
  className = "",
  effects = ['sparkle', 'glow', 'dust', 'star']
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles with different types
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < density; i++) {
        const type = effects[Math.floor(Math.random() * effects.length)];
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (type === 'dust' ? 0.2 : 0.8),
          vy: (Math.random() - 0.5) * (type === 'dust' ? 0.2 : 0.8),
          life: 0,
          maxLife: Math.random() * 200 + 100,
          size: type === 'star' ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() * 360,
          saturation: Math.random() * 50 + 50,
          lightness: Math.random() * 30 + 60,
          type,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };

    initParticles();

    // Advanced drawing functions
    const drawSparkle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number) => {
      const sparkleSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.3);
      
      ctx.save();
      ctx.globalAlpha = alpha * particle.opacity;
      
      // Create sparkle with multiple rays
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, sparkleSize * 2);
      gradient.addColorStop(0, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 1)`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0.3)`);
      gradient.addColorStop(1, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0)`);
      
      ctx.fillStyle = gradient;
      
      // Draw cross pattern
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + particle.pulsePhase;
        const x1 = particle.x + Math.cos(angle) * sparkleSize;
        const y1 = particle.y + Math.sin(angle) * sparkleSize;
        const x2 = particle.x - Math.cos(angle) * sparkleSize;
        const y2 = particle.y - Math.sin(angle) * sparkleSize;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient;
      ctx.stroke();
      
      // Center glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, sparkleSize * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGlow = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number) => {
      const glowSize = particle.size * (1 + Math.sin(particle.pulsePhase * 2) * 0.2);
      
      ctx.save();
      ctx.globalAlpha = alpha * particle.opacity * 0.6;
      
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowSize * 3);
      gradient.addColorStop(0, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0.8)`);
      gradient.addColorStop(0.7, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0.2)`);
      gradient.addColorStop(1, `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowSize * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawDust = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha * particle.opacity * 0.4;
      ctx.fillStyle = `hsla(${particle.hue}, 20%, 80%, 1)`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number) => {
      const starSize = particle.size * (1 + Math.sin(particle.pulsePhase * 1.5) * 0.4);
      
      ctx.save();
      ctx.globalAlpha = alpha * particle.opacity;
      ctx.fillStyle = `hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, 1)`;
      
      // Draw 5-pointed star
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 + particle.pulsePhase;
        const radius = i % 2 === 0 ? starSize : starSize * 0.4;
        const x = particle.x + Math.cos(angle) * radius;
        const y = particle.y + Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Animation loop with mouse interaction
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse attraction effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }

        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        particle.pulsePhase += 0.05;

        // Apply subtle gravity and drag
        particle.vy += 0.001;
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Fade in and out with more sophisticated easing
        const lifeFactor = particle.life / particle.maxLife;
        let alpha;
        if (lifeFactor < 0.1) {
          alpha = lifeFactor * 10; // Fade in
        } else if (lifeFactor > 0.9) {
          alpha = (1 - lifeFactor) * 10; // Fade out
        } else {
          alpha = 1; // Full opacity
        }

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Reset particle if life is over
        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 0;
          particle.maxLife = Math.random() * 200 + 100;
          particle.hue = Math.random() * 360;
        }

        // Draw based on particle type
        switch (particle.type) {
          case 'sparkle':
            drawSparkle(ctx, particle, alpha);
            break;
          case 'glow':
            drawGlow(ctx, particle, alpha);
            break;
          case 'dust':
            drawDust(ctx, particle, alpha);
            break;
          case 'star':
            drawStar(ctx, particle, alpha);
            break;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, colors, effects]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    />
  );
}
