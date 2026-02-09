import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };

    const handleHover = () => {
      document.body.classList.add('hovered');
      gsap.to(cursorRef.current, { width: 10, height: 10 });
      gsap.to(followerRef.current, { 
        width: 80, 
        height: 80, 
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderColor: 'transparent'
      });
    };

    const handleUnhover = () => {
      document.body.classList.remove('hovered');
      gsap.to(cursorRef.current, { width: 20, height: 20 });
      gsap.to(followerRef.current, { 
        width: 50, 
        height: 50,
        backgroundColor: 'transparent',
        borderColor: '#d4af37'
      });
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Attach event listeners to interactive elements
    const links = document.querySelectorAll('a, button, .interactive');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleUnhover);
    });

    // Clean up is tricky with dynamic elements, but this covers basic static ones
    // For a robust app, you'd use a context or event delegation
    document.addEventListener('mouseover', (e) => {
        if ((e.target as HTMLElement).closest('a, button, .interactive')) {
            handleHover();
        } else {
            handleUnhover();
        }
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-5 h-5 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={followerRef} className="fixed w-[50px] h-[50px] border border-gold rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

export default Cursor;