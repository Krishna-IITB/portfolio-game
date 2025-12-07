// // src/components/ProjectModal.jsx

// const overlayStyle = {
//   position: 'fixed',
//   inset: 0,
//   backgroundColor: 'rgba(0,0,0,0.6)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 50
// };

// const modalStyle = {
//   width: 'min(600px, 90vw)',
//   maxHeight: '80vh',
//   background: 'rgba(10,10,25,0.95)',
//   borderRadius: '16px',
//   padding: '24px',
//   color: '#fff',
//   boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
//   overflowY: 'auto'
// };

// function ProjectModal({ project, onClose }) {
//   if (!project) return null;

//   return (
//     <div style={overlayStyle} onClick={onClose}>
//       <div style={modalStyle} onClick={e => e.stopPropagation()}>
//         <h2 style={{ fontSize: 24, marginBottom: 8 }}>
//           {project.title}
//         </h2>
//         <p style={{ opacity: 0.8, marginBottom: 12 }}>
//           {project.company}
//         </p>

//         <ul style={{ marginLeft: 18, marginBottom: 16 }}>
//           {project.bullets?.map((b, idx) => (
//             <li key={idx} style={{ marginBottom: 4 }}>
//               {b}
//             </li>
//           ))}
//         </ul>

//         {project.demoImage && (
//           <img
//             src={project.demoImage}
//             alt={`${project.title} demo`}
//             style={{
//               width: '100%',
//               borderRadius: 8,
//               marginBottom: 16
//             }}
//           />
//         )}

//         <div
//           style={{
//             display: 'flex',
//             gap: 12,
//             justifyContent: 'flex-end'
//           }}
//         >
//           {project.githubLink && (
//             <button
//               onClick={() => window.open(project.githubLink, '_blank')}
//               style={{
//                 padding: '8px 14px',
//                 borderRadius: 999,
//                 border: 'none',
//                 background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
//                 color: '#0b1020',
//                 cursor: 'pointer',
//                 fontWeight: 600
//               }}
//             >
//               View on GitHub
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             style={{
//               padding: '8px 14px',
//               borderRadius: 999,
//               border: '1px solid #4b5563',
//               background: 'transparent',
//               color: '#e5e7eb',
//               cursor: 'pointer'
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectModal;
// src/components/ProjectModal.jsx

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 'min(650px, 90vw)',
          maxHeight: '85vh',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: '#fff',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '8px',
          background: 'linear-gradient(90deg, #00ffea, #6366f1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {project.title}
        </h2>

        {/* Company */}
        <p style={{
          fontSize: '16px',
          color: '#9ca3af',
          marginBottom: '20px'
        }}>
          {project.company}
        </p>

        {/* Tech Stack Tags */}
        {project.techStack && project.techStack.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  fontSize: '13px',
                  color: '#a5b4fc'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Bullets */}
        <ul style={{
          marginLeft: '20px',
          marginBottom: '24px',
          lineHeight: '1.7'
        }}>
          {project.bullets?.map((bullet, idx) => (
            <li key={idx} style={{ marginBottom: '8px', fontSize: '15px' }}>
              {bullet}
            </li>
          ))}
        </ul>

        {/* Demo GIF */}
        {project.demoImage && (
          <div style={{ marginBottom: '24px' }}>
            <img
              src={project.demoImage}
              alt={`${project.title} demo`}
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
          </div>
        )}

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          {project.githubLink && (
            <button
              onClick={() => window.open(project.githubLink, '_blank')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
                color: '#0a0a1a',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              View on GitHub
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #4b5563',
              background: 'transparent',
              color: '#e5e7eb',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
