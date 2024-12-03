import React, { useState, useEffect } from 'react';

export default function TypingEffect({ text, speed = 30 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeoutId); // Clean up the timeout on each render
    }
  }, [index, text, speed]);

  return (
    <div className="relative">
      <p>{displayedText}<span className="absolute right-0 top-0 w-1 h-6 bg-black animate-blink"></span></p>
      <br />
    </div>
  );
}