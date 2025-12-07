// src/components/LeadershipModal.jsx
import { X } from 'lucide-react';

const LeadershipModal = ({ isOpen, onClose, positions }) => {
  if (!isOpen) return null;

  const colors = ['from-blue-600 to-purple-600', 'from-purple-600 to-pink-600', 'from-orange-600 to-red-600'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border-4 border-yellow-500 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-t-xl border-b-4 border-yellow-400 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-5xl">🏅</span>
              <h2 className="text-3xl font-bold text-white">Leadership & Positions</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {positions.map((position, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${colors[idx % colors.length]} rounded-xl p-6 border-3 border-yellow-400 shadow-lg transform hover:scale-[1.02] transition-all`}
            >
              {/* Title Section */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-1">{position.title}</h3>
                  <p className="text-white text-lg font-semibold">{position.organization}</p>
                  <p className="text-gray-200 text-sm mt-1">📅 {position.duration}</p>
                </div>
                <span className="text-5xl">{idx === 0 ? '🔬' : idx === 1 ? '💰' : '⚙️'}</span>
              </div>

              {/* Responsibilities */}
              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-white border-opacity-30 mb-4">
                <p className="text-yellow-300 font-bold mb-3 flex items-center gap-2">
                  <span>📋</span> Key Responsibilities
                </p>
                <ul className="space-y-2">
                  {position.responsibilities.map((resp, i) => (
                    <li key={i} className="text-white flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">✓</span>
                      <span className="text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="bg-green-900 bg-opacity-50 rounded-lg p-4 border-2 border-green-400">
                <p className="text-green-300 font-bold mb-2 flex items-center gap-2">
                  <span>🎯</span> Impact
                </p>
                <p className="text-white text-sm">{position.impact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-b-xl text-center">
          <button
            onClick={onClose}
            className="bg-white text-orange-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-100 transition-all transform hover:scale-105"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadershipModal;
