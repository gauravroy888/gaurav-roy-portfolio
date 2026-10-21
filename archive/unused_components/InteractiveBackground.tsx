'use client';

import React, { useEffect, useRef } from 'react';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 200,
    };

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY + window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for spatial computing constellation
    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

    const colors = ['#8B5CF6', '#6366F1', '#06B6D4', '#F1F4F9'];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.15,
        });
      }
    };

    initParticles();

    let lastTime = performance.now();

    // Render loop
    const render = () => {
      const now = performance.now();
      const rawDelta = (now - lastTime) / 1000;
      lastTime = now;
      const delta = Math.min(Math.max(rawDelta, 0.001), 0.1);
      const dt = delta * 60;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * Math.min(1, 0.05 * dt);
      mouse.y += (mouse.targetY - mouse.y) * Math.min(1, 0.05 * dt);

      // Draw interactive radial cursor spotlight
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y - window.scrollY,
        10,
        mouse.x,
        mouse.y - window.scrollY,
        mouse.radius * 1.8
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      gradient.addColorStop(1, 'rgba(8, 9, 12, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      const currentScrollY = window.scrollY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle organic drift
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse gravitational push / interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= (dx / distance) * force * 1.5 * dt;
          p.y -= (dy / distance) * force * 1.5 * dt;
        }

        // Draw particle dot
        const renderY = p.y - currentScrollY;
        if (renderY >= -20 && renderY <= height + 20) {
          ctx.beginPath();
          ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }

        // Connect nearby particles with subtle glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist2 < 120) {
            const lineAlpha = (1 - dist2 / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - currentScrollY);
            ctx.lineTo(p2.x, p2.y - currentScrollY);
            ctx.strokeStyle = '#8B5CF6';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      
      {/* Subtle Noise / Film Grain for luxury texture */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
