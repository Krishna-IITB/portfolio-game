


// // src/game/scenes/GameScene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';

// export default class GameScene extends Phaser.Scene {
//   constructor() {
//     super('GameScene');
//   }

//   create() {
//     const { width, height } = this.cameras.main;

//     this.cameras.main.setBackgroundColor('#020617');

//     // Simple ground
//     const ground = this.add.rectangle(width / 2, height - 40, width, 80, 0x1e293b);
//     this.physics.add.existing(ground, true); // static body

//     // Player
//     this.player = new Player(this, width / 2, height - 120);

//     // Collisions
//     this.physics.add.collider(this.player, ground);

//     // Debug text
//     this.add.text(16, 16, 'Use arrows / WASD + Space to move & jump', {
//       fontSize: '16px',
//       color: '#e5e7eb'
//     });
//   }

//   update() {
//     // Player input is handled inside Player.preUpdate()
//   }
// }

// src/game/scenes/GameScene.js
import Phaser from 'phaser';
import Player from '../entities/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#020617');

    const ground = this.add.rectangle(width / 2, height - 40, width, 80, 0x1e293b);
    this.physics.add.existing(ground, true);

    this.player = new Player(this, width / 2, height - 120);
    this.physics.add.collider(this.player, ground);

    this.add.text(16, 16, 'Use arrows / WASD + Space', {
      fontSize: '16px',
      color: '#e5e7eb'
    });
  }
}
