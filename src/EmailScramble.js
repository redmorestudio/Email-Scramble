// src/EmailScramble.js
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

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const newPosition = Math.max(0, Math.min(100, (x / container.width) * 100));
    setDragPosition(newPosition);
    
    if (newPosition >= 95) {
      setIsRevealed(true);
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragPosition < 95) {
      setDragPosition(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-2">Protected Email Address</h2>
        <p className="text-gray-600 text-sm">
          {isRevealed ? 'Email revealed!' : 'Slide to reveal email'}
        </p>
      </div>

      <div className="mb-6 h-12 flex items-center justify-center bg-gray-100 rounded">
        <span className="font-mono text-lg">
          {isRevealed ? email : scrambled}
        </span>
      </div>

      {!isRevealed && (
        <div 
          className="relative h-12 bg-gray-200 rounded cursor-pointer"
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all"
            style={{ width: `${dragPosition}%` }}
          />
          <div 
            className="absolute top-0 h-full aspect-square bg-white shadow-lg rounded flex items-center justify-center transition-all"
            style={{ left: `${dragPosition}%` }}
          >
            <Shuffle className="w-6 h-6 text-blue-500" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-600">
              Slide to reveal
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailScrambleProtection;