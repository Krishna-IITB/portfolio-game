// src/components/AchievementsModal.jsx
import { X } from 'lucide-react';

const AchievementsModal = ({ isOpen, onClose, achievementsData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border-4 border-indigo-500 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-xl border-b-4 border-indigo-400 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-5xl">🏆</span>
              <h2 className="text-3xl font-bold text-white">Achievements & Activities</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Academic */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
              <span>🎓</span> Academic Achievements
            </h3>
            {achievementsData.academic.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-yellow-700 to-orange-700 rounded-xl p-6 border-3 border-yellow-400 shadow-lg">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">🏅</span>
                  <div>
                    <p className="text-2xl font-bold text-white">{item.title}</p>
                    <p className="text-yellow-200">{item.year}</p>
                    <p className="text-white mt-2 text-lg">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical */}
          <div>
            <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
              <span>💻</span> Technical Achievements
            </h3>
            {achievementsData.technical.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-700 to-teal-700 rounded-xl p-6 border-3 border-green-400 shadow-lg">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">⚡</span>
                  <div>
                    <p className="text-2xl font-bold text-white">{item.title}</p>
                    <p className="text-green-200">{item.platform}</p>
                    <p className="text-white mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extracurricular */}
          <div>
            <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
              <span>🎯</span> Extracurricular Activities
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievementsData.extracurricular.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-pink-700 to-purple-700 rounded-xl p-5 border-3 border-pink-400 shadow-lg transform hover:scale-[1.02] transition-all">
                  <p className="text-xl font-bold text-pink-200 mb-1">{item.activity}</p>
                  <p className="text-white text-sm mb-2">{item.organization}</p>
                  <p className="text-pink-300 text-xs mb-3">📅 {item.year}</p>
                  <p className="text-white text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-b-xl text-center">
          <button
            onClick={onClose}
            className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-100 transition-all transform hover:scale-105"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementsModal;
