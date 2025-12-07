// src/components/HobbyModal.jsx
import React from 'react';

export default function HobbyModal({ isOpen, onClose, hobby }) {
  if (!isOpen || !hobby) return null;

  const levelPercentage = (hobby.level / 10) * 100;

  // ✅ Check if achievement has a link
  const renderAchievement = (achievement) => {
    if (achievement.includes('leetcode.com')) {
      const url = achievement.split(': ')[1];
      return (
        <span>
          LeetCode Profile:{' '}
          <a 
            href={`https://${url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            {url}
          </a>
        </span>
      );
    }
    return achievement;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 max-w-xl w-11/12 shadow-2xl border-2 border-purple-500/50 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'popIn 0.3s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hobby Icon */}
        <div className="flex items-center gap-6 mb-6">
          <div className="text-6xl">{hobby.icon}</div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{hobby.name}</h2>
            <p className="text-purple-300">{hobby.category}</p>
          </div>
        </div>

        {/* Level Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-300">Skill Level</span>
            <span className="text-sm text-purple-300 font-bold">
              {hobby.level} / 10
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
              style={{ width: `${levelPercentage}%` }}
            />
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">💡 Fun Fact</h3>
          <p className="text-gray-200">{hobby.funFact}</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-300 leading-relaxed">{hobby.description}</p>
        </div>

        {/* Achievements */}
        {hobby.achievements && hobby.achievements.length > 0 && (
          <div className="border-t border-purple-500/30 pt-4">
            <h3 className="text-sm font-semibold text-purple-300 mb-2">🏆 Achievements</h3>
            <ul className="space-y-1">
              {hobby.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-gray-400">
                  • {renderAchievement(achievement)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-semibold"
        >
          Close
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes popIn {
            from { 
              opacity: 0;
              transform: scale(0.8);
            }
            to { 
              opacity: 1;
              transform: scale(1);
            }
          }
        `
      }} />
    </div>
  );
}
