// src/components/EducationModal.jsx
import { X } from 'lucide-react';

const EducationModal = ({ isOpen, onClose, educationData }) => {
  if (!isOpen) return null;

  const { college, school } = educationData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-500 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-xl border-b-4 border-blue-400 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-5xl">🎓</span>
              <h2 className="text-3xl font-bold text-white">Education</h2>
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
          {/* College Section */}
          <div className="bg-gradient-to-br from-blue-800 to-purple-800 rounded-xl p-6 border-3 border-blue-400 shadow-lg transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">🏛️</span>
              <div>
                <h3 className="text-2xl font-bold text-yellow-300">{college.name}</h3>
                <p className="text-blue-200 text-lg">{college.location}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-blue-500">
                <p className="text-blue-300 text-sm font-semibold mb-1">Degree</p>
                <p className="text-white text-lg font-bold">{college.degree}</p>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-blue-500">
                <p className="text-blue-300 text-sm font-semibold mb-1">Department</p>
                <p className="text-white text-lg font-bold">{college.department}</p>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-blue-500">
                <p className="text-blue-300 text-sm font-semibold mb-1">Minor</p>
                <p className="text-white text-lg font-bold">{college.minor}</p>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-green-500">
                <p className="text-green-300 text-sm font-semibold mb-1">CGPA</p>
                <p className="text-white text-2xl font-bold">
                  {college.cgpa}/{college.cgpaScale}
                </p>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-blue-500">
                <p className="text-blue-300 text-sm font-semibold mb-1">Roll Number</p>
                <p className="text-white text-lg font-bold">{college.rollNo}</p>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-blue-500">
                <p className="text-blue-300 text-sm font-semibold mb-1">Duration</p>
                <p className="text-white text-lg font-bold">{college.duration}</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-6 bg-black bg-opacity-30 rounded-lg p-4 border-2 border-yellow-500">
              <p className="text-yellow-300 font-bold mb-3 flex items-center gap-2">
                <span>🏆</span> Achievements
              </p>
              <ul className="space-y-2">
                {college.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-white flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* School Section */}
          <div className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-xl p-6 border-3 border-purple-400 shadow-lg transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">🏫</span>
              <div>
                <h3 className="text-2xl font-bold text-yellow-300">{school.name}</h3>
                <p className="text-purple-200 text-lg">{school.board}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-green-500">
                <p className="text-green-300 text-sm font-semibold mb-1">Class 12 ({school.class12.year})</p>
                <p className="text-white text-2xl font-bold">{school.class12.percentage}</p>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border-2 border-green-500">
                <p className="text-green-300 text-sm font-semibold mb-1">Class 10 ({school.class10.year})</p>
                <p className="text-white text-2xl font-bold">{school.class10.cgpa}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-b-xl text-center">
          <button
            onClick={onClose}
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition-all transform hover:scale-105"
          >
            Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationModal;
