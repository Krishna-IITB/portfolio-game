



// // src/game/scenes/Level3Scene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import projects from '../../data/projects.json';

// export default class Level3Scene extends Phaser.Scene {
//   constructor() {
//     super('Level3Scene');
//   }

//   create() {
//     // 1) Security room background
//     this.add.image(512, 300, 'level3-security').setScrollFactor(0);

//     // 2) Platforms / ground
//     this.createPlatforms();

//     // 3) Player spawn
//     this.player = new Player(this, 120, 450);
//     this.physics.add.collider(this.player, this.platforms);

//     // 4) Camera + world bounds
//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 1024, 600);
//     this.physics.world.setBounds(0, 0, 1024, 600);

//     // 5) Input + callbacks
//     this.interactKey = this.input.keyboard.addKey(
//       Phaser.Input.Keyboard.KeyCodes.E
//     );
//     this.currentInteractTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 6) Moving CCTV camera + laser hazard + AI PC + collectibles
//     this.createCctvCamera();
//     this.createLaserHazard();
//     this.createComputerTerminal();
//     this.createTechCollectibles();

//     // HUD text
//     this.add
//       .text(40, 40, 'Level 3: AI Guard – Dodge the laser, reach the PC (E)', {
//         fontSize: '16px',
//         color: '#ffffff'
//       })
//       .setScrollFactor(0);
//   }

//   // ---------- Platforms ----------
//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     // Ground
//     this.platforms
//       .create(512, 590, 'ground-tile')
//       .setScale(16, 1)
//       .refreshBody();

//     // Small raised platform under PC
//     this.platforms
//       .create(780, 420, 'platform-basic')
//       .setScale(2, 1)
//       .refreshBody();
//   }

//   // ---------- CCTV camera ----------
//   createCctvCamera() {
//     // Pivot at ceiling center
//     this.cctvPivot = this.add.container(512, 120);

//     this.cctvHead = this.add.image(80, 0, 'cctv-head')
//       .setOrigin(0.1, 0.5)
//       .setScale(0.8);

//     this.cctvPivot.add(this.cctvHead);

//     // Sweep left-right
//     this.tweens.add({
//       targets: this.cctvPivot,
//       rotation: { from: -0.6, to: 0.6 },
//       duration: 2500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });
//   }

//   // ---------- Timed laser hazard ----------
//   createLaserHazard() {
//     // Horizontal laser near middle of level
//     this.laser = this.physics.add.staticImage(520, 560, 'laser-beam');
//     this.laser.setScale(3.5, 0.6);
//     this.laser.setVisible(false);

//     this.laserActive = false;

//     // Overlap only hurts when active
//     this.physics.add.overlap(
//       this.player,
//       this.laser,
//       () => {
//         if (this.laserActive) {
//           this.handlePlayerHitByLaser();
//         }
//       },
//       null,
//       this
//     );

//     // Toggle laser on/off every 1.2s
//     this.time.addEvent({
//       delay: 1200,
//       loop: true,
//       callback: () => {
//         this.laserActive = !this.laserActive;
//         this.laser.setVisible(this.laserActive);
//       }
//     });
//   }

//   handlePlayerHitByLaser() {
//     // Simple feedback + reset to start
//     this.player.setTint(0xff0000);
//     this.time.delayedCall(150, () => this.player.clearTint());
//     this.player.setPosition(120, 450);
//   }

//   // ---------- AI Guard computer ----------
//   createComputerTerminal() {
//     this.computer = this.physics.add.staticImage(780, 380, 'pc-terminal');

//     this.physics.add.overlap(
//       this.player,
//       this.computer,
//       () => {
//         this.currentInteractTarget = { type: 'aiGuardDemo' };
//       },
//       null,
//       this
//     );

//     this.add
//       .text(780, 330, 'AI Guard\nPress E', {
//         fontSize: '14px',
//         color: '#00ffea',
//         align: 'center'
//       })
//       .setOrigin(0.5);
//   }

//   // ---------- Collectibles ----------
//   createTechCollectibles() {
//     this.techIcons = this.physics.add.group();

//     const techData = [
//       { key: 'icon-deepface', name: 'DeepFace', x: 280, y: 420 },
//       { key: 'icon-llama',    name: 'Llama',    x: 520, y: 360 },
//       { key: 'icon-telegram', name: 'Telegram', x: 880, y: 260 }
//     ];

//     techData.forEach(t => {
//       const icon = this.techIcons.create(t.x, t.y, t.key);
//       icon.setData('techName', t.name);
//       icon.setScale(0.75);
//       icon.body.allowGravity = false;
//     });

//     this.physics.add.overlap(
//       this.player,
//       this.techIcons,
//       (player, icon) => {
//         const name = icon.getData('techName');
//         icon.disableBody(true, true);

//         console.log('✅ Collected Level 3 tech:', name);
//         if (this.callbacks && this.callbacks.onTechCollect) {
//           this.callbacks.onTechCollect(name);
//         }
//       },
//       null,
//       this
//     );
//   }

//   // ---------- Interactions ----------
//   handleInteraction(target) {
//     if (!target || !this.callbacks) return;

//     if (target.type === 'aiGuardDemo') {
//       // Use your new AI Guard (id:3) entry from projects.json
//       const project = projects.find(p => p.id === 3);
//       if (project && this.callbacks.openProjectModal) {
//         this.callbacks.openProjectModal(project);
//       }
//     }

//     this.currentInteractTarget = null;
//   }

//   update() {
//     if (this.player && this.player.update) {
//       this.player.update();
//     }

//     if (
//       Phaser.Input.Keyboard.JustDown(this.interactKey) &&
//       this.currentInteractTarget
//     ) {
//       this.handleInteraction(this.currentInteractTarget);
//     }
//   }
// }





// src/game/scenes/Level3Scene.js
import Phaser from 'phaser';
import Player from '../entities/Player';
import projects from '../../data/projects.json';

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super('Level3Scene');
  }

  create() {
    // 1) Security room background
    this.add.image(512, 300, 'level3-security').setScrollFactor(0);

    // Dark overlay so gameplay pops
    this.add.rectangle(512, 300, 1024, 600, 0x000000, 0.45).setScrollFactor(0);

    // 2) Platforms / ground
    this.createPlatforms();

    // 3) Player spawn
    this.player = new Player(this, 120, 450);
    this.physics.add.collider(this.player, this.platforms);

    // 4) Camera + world bounds
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, 1024, 600);
    this.physics.world.setBounds(0, 0, 1024, 600);

    // 5) Input + callbacks
    this.interactKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // 6) Moving CCTV camera + laser hazard + AI PC + collectibles
    this.createCctvCamera();
    this.createLaserHazard();
    this.createComputerTerminal();
    this.createTechCollectibles();

    // HUD text
    this.add
      .text(40, 30, 'Level 3: AI Guard – Reach the PC, avoid the laser (E)', {
        fontSize: '16px',
        color: '#ffffff'
      })
      .setScrollFactor(0);
  }

  // ---------- Platforms ----------
  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    // Ground
    this.platforms
      .create(512, 590, 'ground-tile')
      .setScale(16, 1)
      .refreshBody();

    // Raised platform under PC (slightly lower)
    this.platforms
      .create(780, 460, 'platform-basic') // y 460
      .setScale(2, 1)
      .refreshBody();
  }

  // ---------- CCTV camera ----------
  createCctvCamera() {
    // Pivot at ceiling center
    this.cctvPivot = this.add.container(512, 120);

    this.cctvHead = this.add.image(80, 0, 'cctv-head')
      .setOrigin(0.1, 0.5)
      .setScale(0.8);

    this.cctvPivot.add(this.cctvHead);

    // Sweep left-right
    this.tweens.add({
      targets: this.cctvPivot,
      rotation: { from: -0.6, to: 0.6 },
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  // ---------- Timed laser hazard (graphics) ----------
  createLaserHazard() {
    // Red beam just above ground
    this.laserGraphic = this.add
      .rectangle(520, 560, 600, 8, 0xff0033)
      .setOrigin(0.5, 0.5)
      .setAlpha(0);

    this.physics.add.existing(this.laserGraphic, true); // static body

    this.laserActive = false;

    this.physics.add.overlap(
      this.player,
      this.laserGraphic,
      () => {
        if (this.laserActive) {
          this.handlePlayerHitByLaser();
        }
      },
      null,
      this
    );

    // Toggle on/off
    this.time.addEvent({
      delay: 1200,
      loop: true,
      callback: () => {
        this.laserActive = !this.laserActive;
        this.laserGraphic.setAlpha(this.laserActive ? 0.9 : 0);
      }
    });
  }

  handlePlayerHitByLaser() {
    this.player.setTint(0xff0000);
    this.time.delayedCall(150, () => this.player.clearTint());
    this.player.setPosition(120, 450);
  }

  // ---------- AI Guard computer ----------
  createComputerTerminal() {
    // Moved slightly down with platform
    this.computer = this.physics.add.staticImage(780, 420, 'pc-terminal');

    this.physics.add.overlap(
      this.player,
      this.computer,
      () => {
        this.currentInteractTarget = { type: 'aiGuardDemo' };
      },
      null,
      this
    );

    this.add
      .text(780, 370, 'AI Guard\nPress E', {
        fontSize: '14px',
        color: '#00ffea',
        align: 'center'
      })
      .setOrigin(0.5);
  }

  // ---------- Collectibles ----------
  createTechCollectibles() {
    this.techIcons = this.physics.add.group();

    const techData = [
      { key: 'icon-deepface', name: 'DeepFace', x: 260, y: 500 },
      { key: 'icon-llama',    name: 'Llama',    x: 520, y: 440 },
      { key: 'icon-telegram', name: 'Telegram', x: 820, y: 500 }
    ];

    techData.forEach(t => {
      const icon = this.techIcons.create(t.x, t.y, t.key);
      icon.setData('techName', t.name);
      icon.setScale(0.75);
      icon.body.allowGravity = false;
    });

    this.physics.add.overlap(
      this.player,
      this.techIcons,
      (player, icon) => {
        const name = icon.getData('techName');
        icon.disableBody(true, true);

        console.log('✅ Collected Level 3 tech:', name);
        if (this.callbacks && this.callbacks.onTechCollect) {
          this.callbacks.onTechCollect(name);
        }
      },
      null,
      this
    );
  }

  // ---------- Interactions ----------
  handleInteraction(target) {
    if (!target || !this.callbacks) return;

    if (target.type === 'aiGuardDemo') {
      // Use your AI Guard (id:3) entry from projects.json
      const project = projects.find(p => p.id === 3);
      if (project && this.callbacks.openProjectModal) {
        this.callbacks.openProjectModal(project);
      }
    }

    this.currentInteractTarget = null;
  }

  update() {
    if (this.player && this.player.update) {
      this.player.update();
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.interactKey) &&
      this.currentInteractTarget
    ) {
      this.handleInteraction(this.currentInteractTarget);
    }
  }
}
