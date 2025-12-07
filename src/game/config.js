




// // src/game/config.js
// const config = {
//   type: Phaser.AUTO,
//   width: 1280,
//   height: 720,
//   backgroundColor: '#1a1a2e',
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 800 },
//       debug: false
//     }
//   },
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: 1280,
//     height: 720
//     // ✅ parent set DYNAMICALLY in index.js
//   },
//   render: {
//     pixelArt: false,
//     antialias: true
//   }
// };

// export default config;







// src/game/config.js

// ✅ NO CHANGES NEEDED - This config is perfect as-is!
// The movement system is handled in index.js, not config

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
    // ✅ parent set DYNAMICALLY in index.js
  },
  render: {
    pixelArt: false,
    antialias: true
  }
};

export default config;