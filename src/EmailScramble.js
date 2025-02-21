import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

/**
 * EmailScrambleProtection Component
 * 
 * A React component that protects an email address from scrapers by continuously
 * scrambling it until a user physically interacts with a slider to reveal it.
 * 
 * Features:
 * - Continuous email scrambling
 * - Touch and mouse support
 * - Maintains @ symbol position
 * - Smooth slider interaction
 * - Responsive design
 */
const EmailScrambleProtection = () => {
  // State management
  const [email] = useState('seth@redmore.studio'); // The protected email address
  const [scrambled, setScrambled] = useState(''); // Current scrambled version
  const [isRevealed, setIsRevealed] = useState(false); // Whether email is revealed
  const [dragPosition, setDragPosition] = useState(0); // Current slider position (0-100)

  /**
   * Scrambles a text string while preserving the @ symbol position
   * @param {string} input - The email address to scramble
   * @returns {string} - The scrambled email address
   */
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

  // Set up the scrambling interval
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

  /**
   * Handles both mouse and touch movement for the slider
   * @param {Event} e - Mouse or Touch event
   */
  const handleMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setDragPosition(newPosition);
    if (newPosition > 90) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="p-4 bg-transparent">
      <div className="max-w-full bg-[#F5F5F5] rounded-lg shadow-md p-4">
        {/* Header Section */}
        <div className="text-center mb-3">
          <h2 className="text-lg font-semibold mb-1 text-[#2AA8B3]">Protected Email Address</h2>
          <p className="text-[#3A3A3A] text-sm">
            {isRevealed ? 'Email revealed!' : 'Slide to reveal email'}
          </p>
        </div>

        {/* Email Display Section */}
        <div className="mb-4 h-10 flex items-center justify-center bg-white rounded">
          <span className="font-mono text-base text-[#3A3A3A]">
            {isRevealed ? email : scrambled}
          </span>
        </div>

        {/* Slider Section */}
        {!isRevealed && (
          <div 
            className="relative h-10 bg-gray-200 rounded cursor-pointer select-none"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* Progress Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-[#FFD93D] rounded transition-all"
              style={{ width: `${dragPosition}%` }}
            />
            {/* Slider Handle */}
            <div 
              className="absolute top-0 h-full aspect-square bg-white shadow-lg rounded flex items-center justify-center transition-all"
              style={{ left: `${dragPosition}%` }}
            >
              <Shuffle className="w-5 h-5 text-[#2AA8B3]" />
            </div>
            {/* Slider Text */}
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