// src/components/FallingLeaves.jsx
import React, { useEffect, useRef } from 'react';

const FallingLeaves = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const leaves = [];
    const leafCount = window.innerWidth < 768 ? 15 : 25;

    // Leaf properties
    class Leaf {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -200;
        this.size = Math.random() * 8 + 6;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 2 + 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.swing = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX + Math.sin(this.y * this.swing) * 0.5;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Reset leaf when it goes off screen
        if (this.y > canvas.height + 50) {
          this.y = Math.random() * -100;
          this.x = Math.random() * canvas.width;
        }
        
        // Side boundaries
        if (this.x < -50) this.x = canvas.width;
        if (this.x > canvas.width + 50) this.x = -50;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        
        // Leaf shape (stylized)
        ctx.fillStyle = '#4ade80';
        ctx.shadowColor = 'rgba(74, 222, 128, 0.4)';
        ctx.shadowBlur = 10;
        
        // Main leaf body
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Leaf stem
        ctx.fillStyle = '#22c55e';
        ctx.shadowBlur = 5;
        ctx.fillRect(-2, this.size * 0.4, 4, this.size * 0.6);
        
        // Leaf vein
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.5);
        ctx.lineTo(0, this.size * 0.5);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Initialize leaves
    for (let i = 0; i < leafCount; i++) {
      leaves.push(new Leaf());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default FallingLeaves;
