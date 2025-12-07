// src/components/WelcomeModal.jsx
import { X } from 'lucide-react';
import { useEffect } from 'react';

const WelcomeModal = ({ isOpen, onClose }) => {
  // ✅ ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}  // ✅ Click outside to close
    >
      <div 
        className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-2xl max-w-3xl w-full border-4 border-purple-500 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}  // ✅ Prevent closing when clicking inside
      >
        {/* ✅ CLOSE BUTTON - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white bg-red-600 hover:bg-red-700 rounded-full p-3 transition-all shadow-lg"
          aria-label="Close"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Header with animated gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 border-b-4 border-purple-400">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse opacity-50"></div>

          <div className="relative z-10 text-center">
            <div className="text-8xl mb-4 animate-bounce">👋</div>
            <h2 className="text-5xl font-black text-white mb-2 drop-shadow-lg">
              Welcome!
            </h2>
            <p className="text-xl text-purple-200 font-semibold">
              नमस्ते! I'm Krishna Kumar Singh
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-blue-800 to-purple-800 rounded-xl p-6 border-3 border-blue-400 shadow-lg">
            <div className="flex items-center gap-6">
              <div className="text-7xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">Krishna Kumar Singh</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-300 font-semibold">🆔 Roll Number:</span>
                    <span className="text-white text-lg font-bold">22B3968</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-300 font-semibold">🎯 Degree:</span>
                    <span className="text-white text-lg">Dual Degree (B.Tech + M.Tech)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-300 font-semibold">⚡ Department:</span>
                    <span className="text-white text-lg">Electrical Engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-700 to-teal-700 rounded-xl p-4 border-2 border-green-400 text-center transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-green-200 text-sm font-semibold">CGPA</p>
              <p className="text-white text-3xl font-bold">8.43</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-700 to-orange-700 rounded-xl p-4 border-2 border-yellow-400 text-center transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">🏛️</div>
              <p className="text-yellow-200 text-sm font-semibold">Institute</p>
              <p className="text-white text-xl font-bold">IIT Bombay</p>
            </div>

            <div className="bg-gradient-to-br from-pink-700 to-purple-700 rounded-xl p-4 border-2 border-pink-400 text-center transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-pink-200 text-sm font-semibold">Batch</p>
              <p className="text-white text-xl font-bold">2022-2027</p>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-xl p-6 border-3 border-indigo-400">
            <h4 className="text-2xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
              <span>💡</span> About Me
            </h4>
            <p className="text-white text-lg leading-relaxed">
              Fourth-year Dual Degree student passionate about <span className="text-yellow-300 font-bold">software development</span>, 
              <span className="text-green-300 font-bold"> machine learning</span>, and 
              <span className="text-blue-300 font-bold"> full-stack engineering</span>. 
              Currently seeking SDE roles and exploring innovative projects in AI and web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-3 border-gray-600">
            <h4 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
              <span>🚀</span> Explore My Portfolio
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3 border-2 border-blue-400 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span className="text-white font-semibold">Education & Courses</span>
              </div>
              <div className="bg-purple-700 bg-opacity-50 rounded-lg p-3 border-2 border-purple-400 flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span className="text-white font-semibold">Hobbies & Interests</span>
              </div>
              <div className="bg-orange-700 bg-opacity-50 rounded-lg p-3 border-2 border-orange-400 flex items-center gap-2">
                <span className="text-2xl">🏅</span>
                <span className="text-white font-semibold">Leadership Roles</span>
              </div>
              <div className="bg-red-700 bg-opacity-50 rounded-lg p-3 border-2 border-red-400 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <span className="text-white font-semibold">Projects & Skills</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 text-center">
          <p className="text-white text-lg mb-4 font-semibold">
            ⬅️ ➡️ Move around and press <span className="bg-white text-purple-900 px-3 py-1 rounded-md font-bold">E</span> to explore!
          </p>
          <button
            onClick={onClose}
            className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Exploring! 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
