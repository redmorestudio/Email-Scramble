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

  // ... keeping all the other functions the same ...

  return (
    <div className="p-4 bg-transparent">
      <div className="max-w-full bg-white rounded-lg shadow-md p-4">
        <div className="text-center mb-3">
          <h2 className="text-lg font-semibold mb-1" role="heading">Protected Email Address</h2>
          <p className="text-gray-600 text-sm" aria-live="polite">
            {isRevealed ? 'Email revealed!' : 'Slide to reveal email'}
          </p>
        </div>

        <div className="mb-4 h-10 flex items-center bg-gray-100 rounded relative px-8">
          <span className="font-mono text-base flex-grow text-center" aria-live="polite">
            {isRevealed ? email : scrambled}
          </span>
          {isRevealed && (
            <button
              onClick={copyToClipboard}
              className="absolute right-2 p-1.5 text-gray-600 hover:text-blue-500 transition-colors"
              aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
              className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all"
              style={{ width: `${dragPosition}%` }}
            />
            <div 
              className="absolute top-0 h-full aspect-square bg-white shadow-lg rounded flex items-center justify-center transition-all"
              style={{ left: `${dragPosition}%` }}
            >
              <Shuffle className="w-5 h-5 text-blue-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-600 text-sm">
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