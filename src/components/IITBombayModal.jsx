// src/components/IITBombayModal.jsx
import { X } from 'lucide-react';

const IITBombayModal = ({ isOpen, onClose, iitbData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-cyan-500 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-t-xl border-b-4 border-cyan-400 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-5xl">🏛️</span>
              <div>
                <h2 className="text-3xl font-bold text-white">{iitbData.name}</h2>
                <p className="text-cyan-200">Est. {iitbData.established}</p>
              </div>
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
          {/* Key Info Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-700 to-cyan-700 rounded-lg p-4 border-2 border-cyan-400 text-center">
              <p className="text-cyan-200 text-sm mb-1">Campus Size</p>
              <p className="text-white text-2xl font-bold">{iitbData.campusSize}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-cyan-700 rounded-lg p-4 border-2 border-cyan-400 text-center">
              <p className="text-cyan-200 text-sm mb-1">Departments</p>
              <p className="text-white text-2xl font-bold">{iitbData.departments}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-cyan-700 rounded-lg p-4 border-2 border-cyan-400 text-center">
              <p className="text-cyan-200 text-sm mb-1">Students</p>
              <p className="text-white text-2xl font-bold">{iitbData.students}</p>
            </div>
          </div>

          {/* Rankings */}
          <div className="bg-gradient-to-br from-yellow-700 to-orange-700 rounded-xl p-6 border-3 border-yellow-400">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
              <span>🏆</span> Rankings
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-yellow-400">
                <p className="text-yellow-300 text-sm mb-1">NIRF 2024</p>
                <p className="text-white text-xl font-bold">{iitbData.ranking.nirf2024}</p>
              </div>
              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-yellow-400">
                <p className="text-yellow-300 text-sm mb-1">QS World 2024</p>
                <p className="text-white text-xl font-bold">{iitbData.ranking.qsWorld2024}</p>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-gradient-to-br from-purple-700 to-pink-700 rounded-xl p-6 border-3 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-200 mb-4 flex items-center gap-2">
              <span>🏗️</span> World-Class Facilities
            </h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {iitbData.facilities.map((facility, idx) => (
                <li key={idx} className="bg-black bg-opacity-30 rounded-lg p-3 border-2 border-purple-400 flex items-center gap-2">
                  <span className="text-purple-300">✓</span>
                  <span className="text-white">{facility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fun Facts */}
          <div className="bg-gradient-to-br from-green-700 to-teal-700 rounded-xl p-6 border-3 border-green-400">
            <h3 className="text-2xl font-bold text-green-200 mb-4 flex items-center gap-2">
              <span>✨</span> Did You Know?
            </h3>
            <ul className="space-y-3">
              {iitbData.funFacts.map((fact, idx) => (
                <li key={idx} className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-green-400 flex items-start gap-3">
                  <span className="text-2xl">{['🚄', '🌟', '🎪', '🎭'][idx]}</span>
                  <span className="text-white">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-700 rounded-xl p-6 border-3 border-blue-400 text-center">
            <p className="text-blue-200 text-lg mb-2">📍 Location</p>
            <p className="text-white text-2xl font-bold">{iitbData.location}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 rounded-b-xl text-center">
          <button
            onClick={onClose}
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-cyan-100 transition-all transform hover:scale-105"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};

export default IITBombayModal;
