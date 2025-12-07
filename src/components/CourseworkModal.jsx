// src/components/CourseworkModal.jsx
import React from 'react';

export default function CourseworkModal({ isOpen, onClose, course }) {
  if (!isOpen || !course) return null;

  const isOnlineCourse = course.type === 'online';

  // Grade color coding
  const gradeColors = {
    'AA': { text: 'text-green-400', glow: 'shadow-green-500/50', bg: 'bg-green-500/20' },
    'AB': { text: 'text-blue-400', glow: 'shadow-blue-500/50', bg: 'bg-blue-500/20' },
    'BB': { text: 'text-cyan-400', glow: 'shadow-cyan-500/50', bg: 'bg-cyan-500/20' },
    'BC': { text: 'text-yellow-400', glow: 'shadow-yellow-500/50', bg: 'bg-yellow-500/20' },
    'CC': { text: 'text-orange-400', glow: 'shadow-orange-500/50', bg: 'bg-orange-500/20' }
  };

  const gradeStyle = course.grade ? (gradeColors[course.grade] || gradeColors['CC']) : null;

  // Course type badge colors
  const typeColors = {
    'advanced': 'bg-purple-600/20 border-purple-500/30 text-purple-300',
    'core': 'bg-blue-600/20 border-blue-500/30 text-blue-300',
    'minor': 'bg-green-600/20 border-green-500/30 text-green-300',
    'online': 'bg-orange-600/20 border-orange-500/30 text-orange-300'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 max-w-3xl w-full shadow-2xl border-2 border-cyan-500/40 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Decorative background patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 hover:rotate-90 duration-300"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Course Header */}
        <div className="relative mb-8">
          <div className="flex items-start justify-between gap-6 mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="text-6xl">{course.icon || '📚'}</div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {course.code}
                </h2>
                <p className="text-2xl text-white font-light leading-tight">{course.name}</p>
              </div>
            </div>
            
            {/* Grade Badge (only for academic courses) */}
            {!isOnlineCourse && course.grade && (
              <div className={`${gradeStyle.bg} ${gradeStyle.glow} backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-white/20`}>
                <div className={`text-5xl font-black ${gradeStyle.text}`}>{course.grade}</div>
                <p className="text-xs text-gray-400 text-center mt-1">Grade</p>
              </div>
            )}
          </div>

          {/* Metadata Pills */}
          <div className="flex flex-wrap gap-3 mt-4">
            {/* Academic Course Metadata */}
            {!isOnlineCourse && (
              <>
                <div className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300 flex items-center gap-2">
                  <span className="text-lg">📅</span> {course.semester}
                </div>
                <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300 flex items-center gap-2">
                  <span className="text-lg">📚</span> {course.credits} Credits
                </div>
              </>
            )}

            {/* Online Course Metadata */}
            {isOnlineCourse && (
              <>
                <div className="px-4 py-2 bg-orange-600/20 border border-orange-500/30 rounded-full text-sm text-orange-300 flex items-center gap-2">
                  <span className="text-lg">🌐</span> {course.platform}
                </div>
                {course.instructor && (
                  <div className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-sm text-green-300 flex items-center gap-2">
                    <span className="text-lg">👨‍🏫</span> {course.instructor}
                  </div>
                )}
                <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300 flex items-center gap-2">
                  <span className="text-lg">📅</span> {course.year}
                </div>
              </>
            )}

            {/* Course Type Badge */}
            {course.type && (
              <div className={`px-4 py-2 border rounded-full text-sm flex items-center gap-2 ${typeColors[course.type] || 'bg-gray-600/20 border-gray-500/30 text-gray-300'}`}>
                <span className="text-lg">🏷️</span> 
                {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
              </div>
            )}
          </div>
        </div>

        {/* Course Description */}
        {course.description && (
          <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-2xl">📖</span> 
              {isOnlineCourse ? 'Course Overview' : 'Course Overview'}
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">{course.description}</p>
          </div>
        )}

        {/* Skills Learned (only for academic courses or if available) */}
        {course.skills && course.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Skills Learned
            </h3>
            <div className="flex flex-wrap gap-3">
              {course.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 rounded-xl text-sm text-cyan-200 font-medium hover:scale-105 transition-transform duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Topics (only for academic courses or if available) */}
        {course.topics && course.topics.length > 0 && (
          <div className="border-t border-cyan-500/20 pt-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-xl">📝</span> Key Topics Covered
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {course.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span className="text-sm text-gray-400">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Online Course Specific Info */}
        {isOnlineCourse && !course.description && (
          <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
            <p className="text-gray-300 text-center italic">
              Online certification course completed in {course.year}
              {course.platform && ` via ${course.platform}`}
              {course.instructor && `, instructed by ${course.instructor}`}.
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-cyan-500/50 hover:scale-[1.02]"
        >
          Close
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `
      }} />
    </div>
  );
}
