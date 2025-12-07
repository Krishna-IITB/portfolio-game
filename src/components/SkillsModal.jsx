import { X } from 'lucide-react';

const SkillsModal = ({ isOpen, onClose, skillCategory }) => {
  if (!isOpen || !skillCategory) return null;

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'text-green-400 bg-green-900/30';
      case 'Intermediate': return 'text-blue-400 bg-blue-900/30';
      case 'Beginner': return 'text-yellow-400 bg-yellow-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getCategoryColor = (key) => {
    const colors = {
      frontend: 'from-blue-600 to-blue-800',
      backend: 'from-green-600 to-green-800',
      languages: 'from-amber-600 to-amber-800',
      ml: 'from-pink-600 to-pink-800',
      systems: 'from-purple-600 to-purple-800'
    };
    return colors[key] || 'from-gray-600 to-gray-800';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border-2 border-purple-500/30">
        
        {/* Header */}
        <div className={`sticky top-0 z-10 bg-gradient-to-r ${getCategoryColor(skillCategory.key)} p-6 rounded-t-2xl`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {skillCategory.category}
          </h2>
          <p className="text-white/80 text-sm">
            {skillCategory.skills.length} skills mastered
          </p>
        </div>

        {/* Skills Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategory.skills.map((skill, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              {/* Skill Icon Placeholder */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 text-2xl">
                {skill.name.charAt(0)}
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {skill.name}
              </h3>

              {/* Level Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
