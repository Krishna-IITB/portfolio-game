// import Phaser from 'phaser';
// import Player from '../entities/Player';

// export default class BossScene extends Phaser.Scene {
//   constructor() {
//     super('BossScene');
//   }

//   create() {
//     // Arena background
//     const bg = this.add.image(1600, 360, 'boss-arena');
//     bg.setDisplaySize(3200, 720);
//     bg.setScrollFactor(0);
//     bg.setAlpha(0.9);

//     this.add.rectangle(1600, 360, 3200, 720, 0x020617, 0.4).setScrollFactor(0);

//     // Platforms
//     this.createPlatforms();

//     // Player
//     this.player = new Player(this, 400, 520);
//     this.physics.add.collider(this.player, this.platforms);

//     // Camera & world
//     this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
//     this.cameras.main.setBounds(0, 0, 3200, 720);
//     this.physics.world.setBounds(0, 0, 3200, 720);

//     // Input + React callbacks
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // Recruiter NPC + HUD
//     this.createRecruiter();
//     this.createInstructions();

//     this.events.on('shutdown', this.cleanup, this);
//   }

//   update() {
//     if (this.player?.update) this.player.update();

//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       if (this.currentInteractTarget.type === 'recruiter') {
//         if (this.callbacks?.openQuizModal) {
//           this.callbacks.openQuizModal();
//         }
//       }
//       this.currentInteractTarget = null;
//     }
//   }

//   cleanup() {}

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     const ground = this.platforms.create(1600, 690, 'ground-tile');
//     ground.setScale(110, 1).refreshBody().setAlpha(0);

//     const left = this.platforms.create(800, 520, 'platform-wood');
//     left.setScale(2, 1).refreshBody();

//     const right = this.platforms.create(2200, 520, 'platform-wood');
//     right.setScale(2, 1).refreshBody();
//   }

//   createRecruiter() {
//     const x = 2200, y = 450;

//     // Recruiter NPC
//     this.recruiter = this.physics.add.staticImage(x, y, 'npc-recruiter');
//     this.recruiter.setScale(1.4).setDepth(5);

//     this.physics.add.overlap(this.player, this.recruiter, () => {
//       this.currentInteractTarget = { type: 'recruiter' };
//     });

//     // Dialogue bubble
//     const bubble = this.add.graphics();
//     bubble.fillStyle(0x020617, 0.95);
//     bubble.fillRoundedRect(x - 200, y - 170, 260, 80, 20);
//     bubble.lineStyle(2, 0xfacc15, 1);
//     bubble.strokeRoundedRect(x - 200, y - 170, 260, 80, 20);
//     bubble.setDepth(6);

//     this.add.text(x - 70, y - 150, '👋 Ready for your\nfinal interview?', {
//       fontSize: '14px',
//       color: '#facc15'
//     }).setDepth(7);

//     const hint = this.add.text(x, y - 70, 'Press E to start quiz', {
//       fontSize: '14px',
//       color: '#ffffff',
//       backgroundColor: '#000000aa',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5).setDepth(7);

//     this.tweens.add({
//       targets: hint,
//       alpha: 0.4,
//       y: hint.y - 5,
//       duration: 800,
//       yoyo: true,
//       repeat: -1
//     });
//   }

//   createInstructions() {
//     const hud = this.add.graphics();
//     hud.fillStyle(0x000000, 0.9);
//     hud.fillRoundedRect(30, 30, 820, 70, 15);
//     hud.lineStyle(2, 0xfacc15, 1);
//     hud.strokeRoundedRect(30, 30, 820, 70, 15);
//     hud.setScrollFactor(0).setDepth(100);

//     this.add.text(50, 45, '🏆 BOSS ARENA - RECRUITER QUIZ', {
//       fontSize: '20px',
//       color: '#facc15',
//       fontStyle: 'bold'
//     }).setScrollFactor(0).setDepth(101);

//     this.add.text(
//       50,
//       70,
//       'Reach the recruiter on the right platform and press E to start the quiz',
//       {
//         fontSize: '14px',
//         color: '#ffffff'
//       }
//     ).setScrollFactor(0).setDepth(101);
//   }
// }






















// src/game/scenes/BossScene.js
import Phaser from 'phaser';
import Player from '../entities/Player';

export default class BossScene extends Phaser.Scene {
  constructor() {
    super('BossScene');
  }

  create() {
    // Arena background
    const bg = this.add.image(1600, 360, 'boss-arena');
    bg.setDisplaySize(3200, 720);
    bg.setScrollFactor(0);
    bg.setAlpha(0.9);

    // Dark overlay
    this.add.rectangle(1600, 360, 3200, 720, 0x020617, 0.4).setScrollFactor(0);

    // Platforms
    this.createPlatforms();

    // Player
    this.player = new Player(this, 400, 520);
    this.physics.add.collider(this.player, this.platforms);

    // Camera & world
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 3200, 720);
    this.physics.world.setBounds(0, 0, 3200, 720);

    // Input + React callbacks
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // Auto-open flag for first hover
    this.quizShownOnce = false;

    // Recruiter NPC + HUD
    this.createRecruiter();
    this.createInstructions();

    this.events.on('shutdown', this.cleanup, this);
  }

  update() {
    if (this.player?.update) this.player.update();

    // Press E to (re)open quiz when near recruiter
    if (
      Phaser.Input.Keyboard.JustDown(this.interactKey) &&
      this.currentInteractTarget
    ) {
      if (this.currentInteractTarget.type === 'recruiter') {
        if (this.callbacks?.openQuizModal) {
          this.callbacks.openQuizModal();
        }
      }
      this.currentInteractTarget = null;
    }
  }

  cleanup() {}

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    const ground = this.platforms.create(1600, 690, 'ground-tile');
    ground.setScale(110, 1).refreshBody().setAlpha(0);

    const left = this.platforms.create(800, 520, 'platform-wood');
    left.setScale(2, 1).refreshBody();

    const right = this.platforms.create(2200, 520, 'platform-wood');
    right.setScale(2, 1).refreshBody();
  }

  createRecruiter() {
    const x = 2200;
    const y = 450;

    // Recruiter NPC
    this.recruiter = this.physics.add.staticImage(x, y, 'npc-recruiter');
    this.recruiter.setScale(1.4).setDepth(5);

    // Overlap: set interact target + auto-open first time
    this.physics.add.overlap(this.player, this.recruiter, () => {
      this.currentInteractTarget = { type: 'recruiter' };

      if (!this.quizShownOnce && this.callbacks?.openQuizModal) {
        this.quizShownOnce = true;
        this.callbacks.openQuizModal();
      }
    });

    // Dialogue bubble
    const bubble = this.add.graphics();
    bubble.fillStyle(0x020617, 0.95);
    bubble.fillRoundedRect(x - 200, y - 170, 260, 80, 20);
    bubble.lineStyle(2, 0xfacc15, 1);
    bubble.strokeRoundedRect(x - 200, y - 170, 260, 80, 20);
    bubble.setDepth(6);

    this.add
      .text(x - 70, y - 150, '👋 Ready for your\nfinal interview?', {
        fontSize: '14px',
        color: '#facc15'
      })
      .setDepth(7);

    const hint = this.add
      .text(x, y - 70, 'Press E to start quiz', {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 8, y: 4 }
      })
      .setOrigin(0.5)
      .setDepth(7);

    this.tweens.add({
      targets: hint,
      alpha: 0.4,
      y: hint.y - 5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });
  }

  createInstructions() {
    const hud = this.add.graphics();
    hud.fillStyle(0x000000, 0.9);
    hud.fillRoundedRect(30, 30, 820, 70, 15);
    hud.lineStyle(2, 0xfacc15, 1);
    hud.strokeRoundedRect(30, 30, 820, 70, 15);
    hud.setScrollFactor(0).setDepth(100);

    this.add
      .text(50, 45, '🏆 BOSS ARENA - RECRUITER QUIZ', {
        fontSize: '20px',
        color: '#facc15',
        fontStyle: 'bold'
      })
      .setScrollFactor(0)
      .setDepth(101);

    this.add
      .text(
        50,
        70,
        'Reach the recruiter on the right platform and press E to start the quiz',
        {
          fontSize: '14px',
          color: '#ffffff'
        }
      )
      .setScrollFactor(0)
      .setDepth(101);
  }
}
