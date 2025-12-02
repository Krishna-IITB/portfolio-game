

// // src/game/scenes/PreloadScene.js
// import Phaser from 'phaser';

// export default class PreloadScene extends Phaser.Scene {
//   constructor() {
//     super('PreloadScene');
//   }

//   preload() {
//     const { width, height } = this.cameras.main;

//     const progressBox = this.add.graphics();
//     const progressBar = this.add.graphics();

//     progressBox.fillStyle(0x222222, 0.8);
//     progressBox.fillRect(width / 4, height / 2, width / 2, 30);

//     const loadingText = this.add.text(width / 2, height / 2 - 40, 'Loading...', {
//       fontSize: '24px',
//       color: '#ffffff'
//     }).setOrigin(0.5);

//     this.load.on('progress', (value) => {
//       progressBar.clear();
//       progressBar.fillStyle(0x22c55e, 1);
//       progressBar.fillRect(width / 4 + 5, height / 2 + 5, (width / 2 - 10) * value, 20);
//     });

//     this.load.on('complete', () => {
//       progressBar.destroy();
//       progressBox.destroy();
//       loadingText.destroy();
//       this.scene.start('GameScene'); // later you can change to 'MenuScene'
//     });

//     // --- LOAD ASSETS HERE ---

//     // Example player spritesheet
//     this.load.spritesheet('player', 'assets/characters/player.png', {
//       frameWidth: 48,
//       frameHeight: 48
//     });

//     // (Later: load backgrounds, platforms, collectibles, etc.)
//   }

//   create() {}
// }




// src/game/scenes/PreloadScene.js
import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    const { width, height } = this.cameras.main;

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2, width / 2, 30);

    const loadingText = this.add.text(width / 2, height / 2 - 40, 'Loading...', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0x22c55e, 1);
      progressBar.fillRect(width / 4 + 5, height / 2 + 5, (width / 2 - 10) * value, 20);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      this.scene.start('GameScene');
    });

    // ---- LOAD ASSETS HERE ----

    // Use your actual path: public/assets/characters/krishna/krishna-idle.png
    // this.load.image(
    //   'player',
    //   'assets/characters/krishna/krishna-idle.png'
    // );
    this.load.image('player', 'assets/characters/krishna/krishna-idle.png');

  }

  create() {}
}
