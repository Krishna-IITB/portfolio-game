// // src/components/InfoModal.jsx
// import React from 'react';

// export default function InfoModal({ isOpen, onClose, title, content }) {
//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
//       onClick={onClose}
//       style={{ animation: 'fadeIn 0.3s ease-out' }}
//     >
//       <div 
//         className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-11/12 shadow-2xl border-2 border-cyan-500/30 relative"
//         onClick={(e) => e.stopPropagation()}
//         style={{ animation: 'slideUp 0.3s ease-out' }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Title */}
//         <h2 className="text-3xl font-bold text-cyan-400 mb-4 border-b-2 border-cyan-500/30 pb-3">
//           {title}
//         </h2>

//         {/* Content */}
//         <div className="text-gray-200 whitespace-pre-line leading-relaxed">
//           {content.split('\n').map((line, i) => {
//             // Course code line (bold)
//             if (line.includes(':') && i === 0) {
//               const [code, name] = line.split(':');
//               return (
//                 <p key={i} className="font-bold text-xl text-white mb-3">
//                   <span className="text-cyan-400">{code}:</span> {name}
//                 </p>
//               );
//             }
//             // Metadata lines
//             if (line.includes('Semester') || line.includes('Grade') || line.includes('Platform') || line.includes('Year')) {
//               return (
//                 <p key={i} className="text-sm text-gray-400 mb-2">
//                   {line}
//                 </p>
//               );
//             }
//             // Description
//             return line ? (
//               <p key={i} className="mt-4 text-gray-300">
//                 {line}
//               </p>
//             ) : null;
//           })}
//         </div>

//         {/* Close Button (bottom) */}
//         <button
//           onClick={onClose}
//           className="mt-6 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-semibold"
//         >
//           Close
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { 
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to { 
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// src/components/InfoModal.jsx
import React from 'react';
import './InfoModal.css';

export default function InfoModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div 
      className="info-modal-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="info-modal-content bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-11/12 shadow-2xl border-2 border-cyan-500/30 relative"
        onClick={(e) => e.stopPropagation()}
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

        {/* Title */}
        <h2 className="text-3xl font-bold text-cyan-400 mb-4 border-b-2 border-cyan-500/30 pb-3">
          {title}
        </h2>

        {/* Content */}
        <div className="text-gray-200 whitespace-pre-line leading-relaxed">
          {content.split('\n').map((line, i) => {
            // Course code line (bold)
            if (line.includes(':') && i === 0) {
              const [code, name] = line.split(':');
              return (
                <p key={i} className="font-bold text-xl text-white mb-3">
                  <span className="text-cyan-400">{code}:</span> {name}
                </p>
              );
            }
            // Metadata lines
            if (line.includes('Semester') || line.includes('Grade') || line.includes('Platform') || line.includes('Year')) {
              return (
                <p key={i} className="text-sm text-gray-400 mb-2">
                  {line}
                </p>
              );
            }
            // Description
            return line ? (
              <p key={i} className="mt-4 text-gray-300">
                {line}
              </p>
            ) : null;
          })}
        </div>

        {/* Close Button (bottom) */}
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
