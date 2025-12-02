// export const GAME_WIDTH = 1024;
// export const GAME_HEIGHT = 600;
// export const PHYSICS_CONFIG = {
//   default: 'arcade',
//   arcade: {
//     gravity: { y: 300 },
//     debug: false
//   }
// };

// export const SCENES = [
//   'PreloadScene',
//   'GameScene'
// ];



// src/game/config.js
export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 600;
export const PHYSICS_CONFIG = {
  default: 'arcade',
  arcade: {
    gravity: { y: 450 },
    debug: false
  }
};

import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

export const SCENES = [PreloadScene, GameScene];
