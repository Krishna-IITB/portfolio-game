// src/components/DialogueBox.jsx
import React, { useState, useEffect } from 'react';

export default function DialogueBox({ 
  isOpen, 
  onClose, 
  npcName, 
  dialogue, 
  npcImage 
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Split dialogue into lines
  const lines = Array.isArray(dialogue) ? dialogue : [dialogue];
  const currentLine = lines[currentLineIndex] || '';

  // Typewriter effect
  useEffect(() => {
    if (!isOpen) return;

    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(currentLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30); // 30ms per character

    return () => clearInterval(typeInterval);
  }, [currentLine, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(currentLine);
      setIsTyping(false);
    } else if (currentLineIndex < lines.length - 1) {
      // Go to next line
      setCurrentLineIndex(currentLineIndex + 1);
    } else {
      // Close dialogue
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentLineIndex(0);
    setDisplayedText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 p-4">
      <div 
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-3xl w-full max-w-4xl border-t-4 border-cyan-500 shadow-2xl"
        style={{ animation: 'slideUpDialogue 0.3s ease-out' }}
      >
        {/* NPC Header */}
        <div className="flex items-center gap-4 p-6 border-b border-cyan-500/30">
          {npcImage && (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
              <img src={npcImage} alt={npcName} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold text-cyan-400">{npcName}</h3>
            <p className="text-sm text-gray-400">
              {currentLineIndex + 1} / {lines.length}
            </p>
          </div>
        </div>

        {/* Dialogue Text */}
        <div className="p-8 min-h-[150px]">
          <p className="text-xl text-gray-200 leading-relaxed">
            {displayedText}
            {isTyping && <span className="animate-pulse">▋</span>}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center p-6 border-t border-cyan-500/30">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Skip
          </button>
          
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-semibold flex items-center gap-2"
          >
            {isTyping ? 'Continue' : currentLineIndex < lines.length - 1 ? 'Next' : 'Close'}
            {!isTyping && currentLineIndex < lines.length - 1 && (
              <span>→</span>
            )}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideUpDialogue {
            from { 
              opacity: 0;
              transform: translateY(100px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  );
}
