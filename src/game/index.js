// import Phaser from 'phaser';
// import PreloadScene from './scenes/PreloadScene.js';
// import GameScene from './scenes/GameScene.js';
// import { GAME_WIDTH, GAME_HEIGHT, PHYSICS_CONFIG, SCENES } from './config.js';

// const config = {
//   type: Phaser.AUTO,
//   width: GAME_WIDTH,
//   height: GAME_HEIGHT,
//   parent: 'game-container',
//   physics: PHYSICS_CONFIG,
//   scene: [PreloadScene, GameScene],
//   backgroundColor: '#2d2d72',
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH
//   }
// };

// export const game = new Phaser.Game(config);

// src/game/index.js
import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, PHYSICS_CONFIG, SCENES } from './config';

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  physics: PHYSICS_CONFIG,
  scene: SCENES,
  backgroundColor: '#020617'
};

export const game = new Phaser.Game(config);
