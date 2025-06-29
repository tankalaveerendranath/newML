import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'node' | 'data' | 'connection';
  color: string;
}

interface Connection {
  from: Particle;
  to: Particle;
  opacity: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.1,
          type: Math.random() > 0.7 ? 'node' : 'data',
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      particlesRef.current = particles;
    };

    // Update connections
    const updateConnections = () => {
      const connections: Connection[] = [];
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            connections.push({
              from: particles[i],
              to: particles[j],
              opacity: (150 - distance) / 150 * 0.2
            });
          }
        }
      }
      
      connectionsRef.current = connections;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Pulse effect
        particle.opacity = 0.1 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.3;
      });
      
      updateConnections();
      
      // Draw connections
      connectionsRef.current.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${connection.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        
        if (particle.type === 'node') {
          // Neural network nodes
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          
          // Glow effect
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 50).toString(16).padStart(2, '0')}`;
          ctx.fill();
        } else {
          // Data points
          ctx.rect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });
      
      // Draw floating ML symbols
      const time = Date.now() * 0.001;
      const symbols = ['∑', '∂', 'θ', 'α', 'β', 'λ', '∇'];
      
      for (let i = 0; i < 5; i++) {
        const x = 100 + i * 200 + Math.sin(time + i) * 50;
        const y = 100 + Math.cos(time * 0.7 + i) * 30;
        const opacity = 0.1 + Math.sin(time * 2 + i) * 0.05;
        
        ctx.font = '24px serif';
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.fillText(symbols[i % symbols.length], x, y);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};