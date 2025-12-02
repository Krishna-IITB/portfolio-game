// import React, { useEffect, useRef } from 'react';
// import { game } from '../game';

// export default function PhaserGame() {
//   const gameContainerRef = useRef(null);

//   useEffect(() => {
//     const container = gameContainerRef.current;
    
//     // Initialize game only once
//     if (container && !container.hasChildNodes()) {
//       game.canvas.style.display = 'block';
//       container.appendChild(game.canvas);
//     }

//     // Cleanup function
//     return () => {
//       if (container && game.canvas && game.canvas.parentNode === container) {
//         // Don't destroy game, just remove canvas
//         container.removeChild(game.canvas);
//       }
//     };
//   }, []);

//   return (
//     <div 
//       ref={gameContainerRef}
//       style={{
//         width: '1024px',
//         height: '600px',
//         margin: '20px auto',
//         border: '3px solid #444',
//         borderRadius: '8px',
//         background: '#1a1a2e',
//         overflow: 'hidden'
//       }}
//     />
//   );
// }


// src/components/PhaserGame.jsx
import React, { useEffect, useRef } from 'react';
import { game } from '../game';

export default function PhaserGame() {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const container = gameContainerRef.current;

    if (container && !container.hasChildNodes()) {
      game.canvas.style.width = '100%';
      game.canvas.style.height = '100%';
      container.appendChild(game.canvas);
    }

    return () => {
      if (container && game.canvas && game.canvas.parentNode === container) {
        container.removeChild(game.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={gameContainerRef}
      style={{
        width: '1024px',
        height: '600px',
        margin: '20px auto',
        border: '3px solid #444',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#020617'
      }}
    />
  );
}
