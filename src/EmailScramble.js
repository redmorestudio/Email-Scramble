import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

const EmailScrambleProtection = () => {
  const [email] = useState('seth@redmore.studio');
  const [scrambled, setScrambled] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const scrambleEmail = (input) => {
    const [username, domain] = input.split('@');
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    const scrambleText = (text) => {
      return text.split('').map(() => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
    };

    return `${scrambleText(username)}@${scrambleText(domain)}`;
  };

  useEffect(() => {
    setScrambled(scrambleEmail(email));
    let interval;
    if (!isRevealed) {
      interval = setInterval(() => {
        setScrambled(scrambleEmail(email));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRevealed, email]);

  const handleInteractionStart = (e) => {
    setIsDragging(true);
    if (e.touches) e.preventDefault(); // Prevent scrolling on mobile
  };

  const handleInteractionMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches?.[0];
    const clientX = touch?.clientX || e.clientX;
    
    const container = e.currentTarget.getBoundingClientRect();
    const x = clientX - container.left;
    const newPosition = Math.max(0, Math.min(100, (x / container.width) * 100));
    setDragPosition(newPosition);
    
    if (newPosition >= 95) {
      setIsRevealed(true);
      setIsDragging(false);
    }
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
    if (dragPosition < 95) {
      setDragPosition(0);
    }
  };

  return (
    <div className="p-4 bg-transparent">
      <div className="max-w-full bg-[#F5F5F5] rounded-lg shadow-md p-4">
        <div className="text-center mb-3">
          <h2 className="text-lg font-semibold mb-1 text-[#2AA8B3]">Protected Email Address</h2>
          <p className="text-[#3A3A3A] text-sm">
            {isRevealed ? 'Email revealed!' : 'Slide to reveal email'}
          </p>
        </div>

        <div className="mb-4 h-10 flex items-center justify-center bg-white rounded">
          <span className="font-mono text-base text-[#3A3A3A]">
            {isRevealed ? email : scrambled}
          </span>
        </div>

        {!isRevealed && (
          <div 
            className="relative h-10 bg-gray-200 rounded cursor-pointer select-none"
            onMouseDown={handleInteractionStart}
            onMouseMove={handleInteractionMove}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchMove={handleInteractionMove}
            onTouchEnd={handleInteractionEnd}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-[#FFD93D] rounded transition-all"
              style={{ width: `${dragPosition}%` }}
            />
            <div 
              className="absolute top-0 h-full aspect-square bg-white shadow-lg rounded flex items-center justify-center transition-all"
              style={{ left: `${dragPosition}%` }}
            >
              <Shuffle className="w-5 h-5 text-[#2AA8B3]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[#3A3A3A] text-sm">
                Slide to reveal
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailScrambleProtection;