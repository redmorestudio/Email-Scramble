import React, { useState, useEffect } from 'react';
import { Shuffle, Copy, Check } from 'lucide-react';

const EmailScrambleProtection = () => {
  const [email] = useState('seth@redmore.studio');
  const [scrambled, setScrambled] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

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
    try {
      setScrambled(scrambleEmail(email));
      let interval;
      if (!isRevealed) {
        interval = setInterval(() => {
          setScrambled(scrambleEmail(email));
        }, 100);
      }
      return () => clearInterval(interval);
    } catch (err) {
      setError("Unable to protect email. Please try again later.");
    }
  }, [isRevealed, email]);

  const handleInteractionStart = (e) => {
    const touch = e.touches?.[0];
    setIsDragging(true);
    e.preventDefault(); // Prevent scrolling on mobile
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy email. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-2" role="heading">Protected Email Address</h2>
        <p className="text-gray-600 text-sm" aria-live="polite">
          {isRevealed ? 'Email revealed!' : 'Slide to reveal email'}
        </p>
      </div>

      <div className="mb-6 h-12 flex items-center justify-center bg-gray-100 rounded relative">
        <span className="font-mono text-lg" aria-live="polite">
          {isRevealed ? email : scrambled}
        </span>
        {isRevealed && (
          <button
            onClick={copyToClipboard}
            className="absolute right-2 p-2 text-gray-600 hover:text-blue-500 transition-colors"
            aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        )}
      </div>

      {!isRevealed && (
        <div 
          role="slider"
          aria-label="Slide to reveal email address"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={dragPosition}
          className="relative h-12 bg-gray-200 rounded cursor-pointer select-none"
          onMouseDown={handleInteractionStart}
          onMouseMove={handleInteractionMove}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchMove={handleInteractionMove}
          onTouchEnd={handleInteractionEnd}
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
      
      {/* Screen reader message about contact form */}
      <p className="sr-only">
        A contact form is available below if you prefer not to reveal the email address.
      </p>
    </div>
  );
};

export default EmailScrambleProtection;