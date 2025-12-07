// import Phaser from 'phaser';

// export default class BootScene extends Phaser.Scene {
//   constructor() {
//     super('BootScene');
//   }

//   preload() {
//     this.load.json('config', '/data/config.json');
//   }

//   create() {
//     this.scene.start('PreloadScene');
//   }
// }




import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // ✅ REMOVED: config.json load (not needed)
    // Boot scene doesn't need to load anything
  }

  create() {
    // ✅ Start PreloadScene immediately
    this.scene.start('PreloadScene');
  }
}