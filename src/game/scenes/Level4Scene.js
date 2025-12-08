// // src/game/scenes/Level4Scene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import projects from '../../data/projects.json';

// export default class Level4Scene extends Phaser.Scene {
//   constructor() {
//     super('Level4Scene');
//   }

//   create() {
//     this.createServerBackground();
//     this.createPlatforms();

//     this.player = new Player(this, 200, 500);
//     this.physics.add.collider(this.player, this.platforms);

//     this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
//     this.cameras.main.setBounds(0, 0, 3200, 720);
//     this.physics.world.setBounds(0, 0, 3200, 720);

//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     this.createTitleCard();
//     this.createDockerContainers();
//     this.createServerRack();
//     this.createQRCollectibles();
//     this.createNavigationDoors();
//     this.createInstructions();

//     this.events.on('shutdown', this.cleanup, this);
//   }

//   cleanup() {}

//   createServerBackground() {
//     const bg = this.add.rectangle(1600, 360, 3200, 720, 0x0a0a1a);
//     bg.setDepth(-10);

//     const grid = this.add.graphics();
//     grid.lineStyle(1, 0x00ff88, 0.1);
//     for (let x = 0; x < 3200; x += 50) {
//       grid.lineBetween(x, 0, x, 720);
//     }
//     for (let y = 0; y < 720; y += 50) {
//       grid.lineBetween(0, y, 3200, y);
//     }
//     grid.setDepth(-8);

//     for (let i = 0; i < 20; i++) {
//       const circuit = this.add.circle(
//         Math.random() * 3200,
//         Math.random() * 720,
//         2,
//         0x00ff88,
//         0.8
//       );
//       circuit.setDepth(-7);
//       this.tweens.add({
//         targets: circuit,
//         alpha: 0.2,
//         duration: 2000 + Math.random() * 1000,
//         yoyo: true,
//         repeat: -1
//       });
//     }
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();
//     const ground = this.platforms.create(1600, 690, 'ground-tile');
//     ground.setScale(110, 1).refreshBody().setAlpha(0);

//     const platformData = [
//       { x: 400, y: 520, label: 'Entry' },
//       { x: 700, y: 450, label: 'API Gateway' },
//       { x: 1100, y: 400, label: 'MongoDB' },
//       { x: 1500, y: 380, label: 'Redis Cache' },
//       { x: 1900, y: 420, label: 'Analytics' },
//       { x: 2300, y: 460, label: 'QR Generator' },
//       { x: 2700, y: 500, label: 'Exit' }
//     ];

//     platformData.forEach((p, i) => {
//       const plat = this.platforms.create(p.x, p.y, 'platform-basic');
//       plat.setScale(2, 1).refreshBody().setTint(0x00ff88);
      
//       this.tweens.add({
//         targets: plat,
//         y: p.y - 8,
//         duration: 2500 + (i * 200),
//         yoyo: true,
//         repeat: -1
//       });

//       this.add.text(p.x, p.y - 50, p.label, {
//         fontSize: '16px',
//         color: '#00ff88',
//         fontStyle: 'bold',
//         backgroundColor: '#000000aa',
//         padding: { x: 8, y: 4 }
//       }).setOrigin(0.5).setDepth(10);
//     });
//   }

//   createTitleCard() {
//     const x = 400, y = 200;
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a3e, 0.95);
//     titleBg.fillRoundedRect(x - 200, y - 100, 400, 200, 20);
//     titleBg.lineStyle(3, 0x00ff88, 1);
//     titleBg.strokeRoundedRect(x - 200, y - 100, 400, 200, 20);
//     titleBg.setDepth(5);

//     this.add.text(x, y - 60, '🔗', { fontSize: '48px' }).setOrigin(0.5).setDepth(7);
//     this.add.text(x, y, 'URL SHORTENER', {
//       fontSize: '28px',
//       color: '#00ff88',
//       fontStyle: 'bold'
//     }).setOrigin(0.5).setDepth(7);
//     this.add.text(x, y + 40, 'Analytics + QR Codes', {
//       fontSize: '16px',
//       color: '#94a3b8'
//     }).setOrigin(0.5).setDepth(7);
//   }

//   createDockerContainers() {
//     const containers = [
//       { x: 900, y: 280, label: 'API', color: 0x2496ed },
//       { x: 1300, y: 220, label: 'MongoDB', color: 0x4db33d },
//       { x: 1700, y: 260, label: 'Redis', color: 0xdc382d },
//       { x: 2100, y: 240, label: 'Worker', color: 0xf59e0b }
//     ];

//     containers.forEach((c, i) => {
//       const container = this.add.graphics();
//       container.fillStyle(c.color, 0.3);
//       container.fillRoundedRect(c.x - 60, c.y - 40, 120, 80, 12);
//       container.lineStyle(3, c.color, 1);
//       container.strokeRoundedRect(c.x - 60, c.y - 40, 120, 80, 12);
//       container.setDepth(3);

//       this.add.text(c.x, c.y - 10, '🐳', {
//         fontSize: '32px'
//       }).setOrigin(0.5).setDepth(4);

//       this.add.text(c.x, c.y + 30, c.label, {
//         fontSize: '14px',
//         color: c.color,
//         fontStyle: 'bold'
//       }).setOrigin(0.5).setDepth(4);

//       this.tweens.add({
//         targets: container,
//         alpha: 0.6,
//         duration: 2000 + (i * 300),
//         yoyo: true,
//         repeat: -1
//       });
//     });
//   }

//   createServerRack() {
//     const x = 1600, y = 400;
//     const rackBg = this.add.graphics();
//     rackBg.fillStyle(0x1e293b, 0.95);
//     rackBg.fillRoundedRect(x - 180, y - 120, 360, 240, 20);
//     rackBg.lineStyle(4, 0xfbbf24, 1);
//     rackBg.strokeRoundedRect(x - 180, y - 120, 360, 240, 20);
//     rackBg.setDepth(8);

//     this.add.text(x, y - 80, '🖥️', { fontSize: '48px' }).setOrigin(0.5).setDepth(10);
//     this.add.text(x, y - 20, 'SERVER RACK', {
//       fontSize: '24px',
//       color: '#fbbf24',
//       fontStyle: 'bold'
//     }).setOrigin(0.5).setDepth(10);

//     const stats = ['Links: 10K+', 'Clicks/day: 45K', 'Uptime: 99.9%'];
//     stats.forEach((stat, i) => {
//       this.add.text(x, y + 15 + (i * 25), stat, {
//         fontSize: '14px',
//         color: '#e2e8f0'
//       }).setOrigin(0.5).setDepth(10);
//     });

//     const hint = this.add.text(x, y + 100, '👆 CLICK FOR PROJECT', {
//       fontSize: '14px',
//       color: '#00ff88',
//       fontStyle: 'bold',
//       backgroundColor: '#000000aa',
//       padding: { x: 10, y: 5 }
//     }).setOrigin(0.5).setDepth(11);

//     this.serverRack = this.add.zone(x, y, 360, 240).setInteractive();
//     this.physics.world.enable(this.serverRack);
//     this.serverRack.body.setAllowGravity(false);
//     this.serverRack.body.moves = false;

//     this.serverRack.on('pointerdown', () => {
//       const project = projects.find(p => p.id === 3);
//       if (project && this.callbacks?.openProjectModal) {
//         this.callbacks.openProjectModal(project);
//       }
//     });

//     this.physics.add.overlap(this.player, this.serverRack, () => {
//       this.currentInteractTarget = { type: 'serverRack' };
//     });
//   }

//   createQRCollectibles() {
//     const qrPositions = [
//       { x: 800, y: 350 },
//       { x: 1200, y: 300 },
//       { x: 2000, y: 340 },
//       { x: 2400, y: 380 }
//     ];

//     this.qrCodes = this.physics.add.group();

//     qrPositions.forEach((pos, i) => {
//       const qr = this.qrCodes.create(pos.x, pos.y, 'icon-docker');
//       qr.setScale(0.6).setTint(0x00ff88);
//       qr.body.setAllowGravity(false);

//       this.tweens.add({
//         targets: qr,
//         y: pos.y - 15,
//         angle: 360,
//         duration: 3000,
//         yoyo: true,
//         repeat: -1
//       });
//     });

//     this.physics.add.overlap(this.player, this.qrCodes, (player, qr) => {
//       qr.disableBody(true, true);
      
//       const collectText = this.add.text(qr.x, qr.y - 30, '+QR Code', {
//         fontSize: '16px',
//         color: '#00ff88',
//         fontStyle: 'bold'
//       }).setOrigin(0.5);

//       this.tweens.add({
//         targets: collectText,
//         y: qr.y - 60,
//         alpha: 0,
//         duration: 1000,
//         onComplete: () => collectText.destroy()
//       });
//     });
//   }

//   createNavigationDoors() {
//     this.createDoor(100, 580, '← Level 3', 0x6366f1, 'Level3Scene');
//     this.createDoor(3100, 580, '→ Level 5', 0xec4899, 'Level5Scene');
//   }

//   createDoor(x, y, label, color, targetScene) {
//     const doorBg = this.add.graphics();
//     doorBg.fillStyle(color, 0.2);
//     doorBg.fillRoundedRect(x - 60, y - 90, 120, 160, 15);
//     doorBg.lineStyle(3, color, 1);
//     doorBg.strokeRoundedRect(x - 60, y - 90, 120, 160, 15);

//     const door = this.physics.add.staticImage(x, y - 20, 'door-large')
//       .setScale(1.1).setInteractive();

//     this.add.text(x, y - 120, label, {
//       fontSize: '18px',
//       color: color,
//       fontStyle: 'bold'
//     }).setOrigin(0.5);

//     door.on('pointerover', () => this.scene.start(targetScene));
//     this.physics.add.overlap(this.player, door, () => {
//       this.currentInteractTarget = { type: 'door', scene: targetScene };
//     });
//   }

//   createInstructions() {
//     const hud = this.add.graphics();
//     hud.fillStyle(0x000000, 0.9);
//     hud.fillRoundedRect(30, 30, 650, 70, 15);
//     hud.lineStyle(2, 0x00ff88, 1);
//     hud.strokeRoundedRect(30, 30, 650, 70, 15);
//     hud.setScrollFactor(0).setDepth(100);

//     this.add.text(50, 45, '🔗 URL SHORTENER - SERVER ROOM', {
//       fontSize: '20px',
//       color: '#00ff88',
//       fontStyle: 'bold'
//     }).setScrollFactor(0).setDepth(101);

//     this.add.text(50, 70, 'Click Server Rack = Project | Collect QR Codes | Walk ←→', {
//       fontSize: '14px',
//       color: '#ffffff'
//     }).setScrollFactor(0).setDepth(101);
//   }

//   update() {
//     if (this.player?.update) this.player.update();

//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       if (this.currentInteractTarget.type === 'serverRack') {
//         const project = projects.find(p => p.id === 3);
//         if (project && this.callbacks?.openProjectModal) {
//           this.callbacks.openProjectModal(project);
//         }
//       } else if (this.currentInteractTarget.type === 'door') {
//         this.scene.start(this.currentInteractTarget.scene);
//       }
//       this.currentInteractTarget = null;
//     }
//   }
// }


// REPLACE ENTIRE src/game/scenes/Level4Scene.js
// ✅ COMPLETE FIXED VERSION - Docker containers ON platforms, correct paths
import Phaser from 'phaser';
import Player from '../entities/Player';
import projects from '../../data/projects.json';

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super('Level4Scene');
  }

  create() {
    // YOUR ACTUAL BACKGROUND IMAGE
    const bg = this.add.image(1600, 360, 'level4-server');
    bg.setDisplaySize(3200, 720);
    bg.setScrollFactor(0);
    bg.setAlpha(0.5);

    // Dark overlay
    this.add.rectangle(1600, 360, 3200, 720, 0x000000, 0.3).setScrollFactor(0);

    // Platforms
    this.createPlatforms();

    // Player
    this.player = new Player(this, 200, 500);
    this.physics.add.collider(this.player, this.platforms);

    // Camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 3200, 720);
    this.physics.world.setBounds(0, 0, 3200, 720);

    // Input
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // Scene elements
    this.createTitleCard();
    this.createDockerContainers();
    this.createServerRack();
    this.createQRCollectibles();
    this.createNavigationDoors();
    this.createInstructions();

    this.events.on('shutdown', this.cleanup, this);
  }

  cleanup() {}

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    // Ground
    const ground = this.platforms.create(1600, 690, 'ground-tile');
    ground.setScale(110, 1).refreshBody().setAlpha(0);

    // Chain-link platforms (floating server nodes)
    const platformData = [
      { x: 400, y: 520, label: 'Entry' },
      { x: 700, y: 450, label: 'API Gateway' },
      { x: 1100, y: 400, label: 'MongoDB' },
      { x: 1500, y: 380, label: 'Redis Cache' },
      { x: 1900, y: 420, label: 'Analytics' },
      { x: 2300, y: 460, label: 'QR Generator' },
      { x: 2700, y: 500, label: 'Exit' }
    ];

    platformData.forEach((p, i) => {
      const plat = this.platforms.create(p.x, p.y, 'platform-metal');
      plat.setScale(2, 1).refreshBody();
      
      this.tweens.add({
        targets: plat,
        y: p.y - 8,
        duration: 2500 + (i * 200),
        yoyo: true,
        repeat: -1
      });

      this.add.text(p.x, p.y - 50, p.label, {
        fontSize: '16px',
        color: '#00ff88',
        fontStyle: 'bold',
        backgroundColor: '#000000aa',
        padding: { x: 8, y: 4 }
      }).setOrigin(0.5).setDepth(10);
    });
  }

  createTitleCard() {
    const x = 400, y = 200;

    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x1a1a3e, 0.95);
    titleBg.fillRoundedRect(x - 200, y - 100, 400, 200, 20);
    titleBg.lineStyle(3, 0x00ff88, 1);
    titleBg.strokeRoundedRect(x - 200, y - 100, 400, 200, 20);
    titleBg.setDepth(5);

    this.add.text(x, y - 60, '🔗', { fontSize: '48px' }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y, 'URL SHORTENER', {
      fontSize: '28px',
      color: '#00ff88',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y + 40, 'Analytics + QR Codes', {
      fontSize: '16px',
      color: '#94a3b8'
    }).setOrigin(0.5).setDepth(7);
  }

  createDockerContainers() {
    // ✅ POSITIONED ON PLATFORMS (matching platform y-coordinates)
    const containers = [
      { x: 700, y: 420, icon: 'icon-nodejs', label: 'API', color: 0x339933 },
      { x: 1100, y: 370, icon: 'icon-mongodb', label: 'MongoDB', color: 0x4db33d },
      { x: 1500, y: 350, icon: 'icon-redis', label: 'Redis', color: 0xdc382d },
      { x: 2100, y: 390, icon: 'icon-docker', label: 'Docker', color: 0x2496ed }
    ];

    containers.forEach((c, i) => {
      // Container frame
      const containerBg = this.add.graphics();
      containerBg.fillStyle(c.color, 0.2);
      containerBg.fillRoundedRect(c.x - 60, c.y - 50, 120, 100, 12);
      containerBg.lineStyle(3, c.color, 1);
      containerBg.strokeRoundedRect(c.x - 60, c.y - 50, 120, 100, 12);
      containerBg.setDepth(3);

      // ✅ YOUR ACTUAL TECH ICONS
      const icon = this.add.image(c.x, c.y - 10, c.icon);
      icon.setScale(0.8);
      icon.setDepth(4);

      // Label
      this.add.text(c.x, c.y + 35, c.label, {
        fontSize: '14px',
        color: c.color,
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(4);

      // Pulse animation
      this.tweens.add({
        targets: [containerBg, icon],
        alpha: 0.7,
        duration: 2000 + (i * 300),
        yoyo: true,
        repeat: -1
      });
    });
  }

  createServerRack() {
    const x = 1600, y = 400;

    // Card background
    const rackBg = this.add.graphics();
    rackBg.fillStyle(0x1e293b, 0.95);
    rackBg.fillRoundedRect(x - 200, y - 140, 400, 280, 20);
    rackBg.lineStyle(4, 0xfbbf24, 1);
    rackBg.strokeRoundedRect(x - 200, y - 140, 400, 280, 20);
    rackBg.setDepth(8);

    // ✅ YOUR ACTUAL SERVER RACK IMAGE
    const serverImg = this.add.image(x, y - 60, 'server-rack');
    serverImg.setScale(1.2);
    serverImg.setDepth(10);

    // Title
    this.add.text(x, y + 20, 'SERVER RACK', {
      fontSize: '24px',
      color: '#fbbf24',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(10);

    // Stats
    const stats = ['Links: 10K+', 'Clicks/day: 45K', 'Uptime: 99.9%'];
    stats.forEach((stat, i) => {
      this.add.text(x, y + 55 + (i * 22), stat, {
        fontSize: '13px',
        color: '#e2e8f0'
      }).setOrigin(0.5).setDepth(10);
    });

    // Click hint (animated)
    const hint = this.add.text(x, y + 125, '👆 CLICK FOR PROJECT', {
      fontSize: '14px',
      color: '#00ff88',
      fontStyle: 'bold',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setDepth(11);

    this.tweens.add({
      targets: hint,
      alpha: 0.5,
      scale: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Interactive zone
    this.serverRack = this.add.zone(x, y, 400, 280).setInteractive();
    this.physics.world.enable(this.serverRack);
    this.serverRack.body.setAllowGravity(false);
    this.serverRack.body.moves = false;

    this.serverRack.on('pointerdown', () => {
      const project = projects.find(p => p.id === 3);
      if (project && this.callbacks?.openProjectModal) {
        this.callbacks.openProjectModal(project);
      }
    });

    this.physics.add.overlap(this.player, this.serverRack, () => {
      this.currentInteractTarget = { type: 'serverRack' };
    });
  }

  createQRCollectibles() {
    const qrPositions = [
      { x: 800, y: 350 },
      { x: 1200, y: 300 },
      { x: 2000, y: 340 },
      { x: 2400, y: 380 }
    ];

    this.qrCodes = this.physics.add.group();

    qrPositions.forEach((pos, i) => {
      // ✅ YOUR ACTUAL QR CODE IMAGE
      const qr = this.qrCodes.create(pos.x, pos.y, 'qr-code');
      qr.setScale(0.7);
      qr.body.setAllowGravity(false);

      // Float + spin animation
      this.tweens.add({
        targets: qr,
        y: pos.y - 15,
        angle: 360,
        duration: 3000,
        yoyo: true,
        repeat: -1
      });

      // Glow effect
      const glow = this.add.circle(pos.x, pos.y, 35, 0x00ff88, 0.2);
      glow.setDepth(qr.depth - 1);
      this.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.05,
        duration: 1500,
        yoyo: true,
        repeat: -1
      });
    });

    // Collect QR codes
    this.physics.add.overlap(this.player, this.qrCodes, (player, qr) => {
      qr.disableBody(true, true);
      
      const collectText = this.add.text(qr.x, qr.y - 30, '+QR Code', {
        fontSize: '16px',
        color: '#00ff88',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4
      }).setOrigin(0.5);

      this.tweens.add({
        targets: collectText,
        y: qr.y - 60,
        alpha: 0,
        duration: 1000,
        onComplete: () => collectText.destroy()
      });
    });
  }

  createNavigationDoors() {
    this.createDoor(100, 580, '← Level 3', 0x6366f1, 'Level3Scene');
    this.createDoor(3100, 580, '→ Level 5', 0xec4899, 'Level5Scene');
  }

  createDoor(x, y, label, color, targetScene) {
    const doorBg = this.add.graphics();
    doorBg.fillStyle(color, 0.2);
    doorBg.fillRoundedRect(x - 70, y - 100, 140, 180, 15);
    doorBg.lineStyle(3, color, 1);
    doorBg.strokeRoundedRect(x - 70, y - 100, 140, 180, 15);
    doorBg.setDepth(5);

    // ✅ YOUR ACTUAL DOOR IMAGE
    const door = this.physics.add.staticImage(x, y, 'door-large');
    door.setScale(1.2).setInteractive();
    door.setDepth(6);

    // Glow effect
    const glow = this.add.ellipse(x, y, 160, 200, color, 0.2);
    glow.setDepth(4);
    this.tweens.add({
      targets: glow,
      alpha: 0.4,
      scale: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1
    });

    // Label
    this.add.text(x, y - 130, label, {
      fontSize: '18px',
      color: color,
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(7);

    door.on('pointerover', () => this.scene.start(targetScene));
    
    this.physics.add.overlap(this.player, door, () => {
      this.currentInteractTarget = { type: 'door', scene: targetScene };
    });
  }

  createInstructions() {
    const hud = this.add.graphics();
    hud.fillStyle(0x000000, 0.9);
    hud.fillRoundedRect(30, 30, 680, 70, 15);
    hud.lineStyle(2, 0x00ff88, 1);
    hud.strokeRoundedRect(30, 30, 680, 70, 15);
    hud.setScrollFactor(0).setDepth(100);

    this.add.text(50, 45, '🔗 URL SHORTENER - SERVER ROOM', {
      fontSize: '20px',
      color: '#00ff88',
      fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(101);

    this.add.text(50, 70, 'Click Server Rack = Project | Collect QR Codes | Walk ←→', {
      fontSize: '14px',
      color: '#ffffff'
    }).setScrollFactor(0).setDepth(101);
  }

  update() {
    if (this.player?.update) this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'serverRack') {
        const project = projects.find(p => p.id === 3);
        if (project && this.callbacks?.openProjectModal) {
          this.callbacks.openProjectModal(project);
        }
      } else if (this.currentInteractTarget.type === 'door') {
        this.scene.start(this.currentInteractTarget.scene);
      }
      this.currentInteractTarget = null;
    }
  }
}
