// // src/game/scenes/Level2Scene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import projects from '../../data/projects.json';

// const PLATFORM_TECH = [
//   { name: 'YOLOv8',     key: 'icon-yolo',        x: 350,  yPlatform: 540, color: 0x00ff41 },
//   { name: 'PyTorch',    key: 'icon-pytorch',     x: 620,  yPlatform: 470, color: 0xee4c2c },
//   { name: 'U-Net',      key: 'icon-unet',        x: 890,  yPlatform: 410, color: 0x4169e1 },
//   { name: 'PIL',        key: 'icon-python',      x: 1240, yPlatform: 450, color: 0xffd43b },
//   { name: 'NumPy',      key: 'icon-numpy',       x: 1510, yPlatform: 390, color: 0x4dabcf },
//   { name: 'GeoJSON',    key: 'icon-geojson',     x: 1780, yPlatform: 510, color: 0x00d4aa },
//   { name: 'CLI Tool',   key: 'icon-pyinstaller', x: 2050, yPlatform: 430, color: 0xff6b6b },
//   { name: 'Deployment', key: 'icon-docker',      x: 2320, yPlatform: 360, color: 0x2496ed },
//   { name: 'Satellite',  key: null,               x: 2550, yPlatform: 320, color: 0xfbbf24 }
// ];

// export default class Level2Scene extends Phaser.Scene {
//   constructor() {
//     super('Level2Scene');
//   }

//   create() {
//     // ✨ FIXED SATELLITE BACKGROUND (doesn't scroll)
//     const satelliteBg = this.add.image(640, 360, 'level2-satellite');
//     satelliteBg.setDisplaySize(1280, 720); // ✅ Fill viewport
//     satelliteBg.setScrollFactor(0);         // ✅ FIXED - doesn't move!
//     satelliteBg.setAlpha(0.6);              // ✅ Semi-transparent
//     satelliteBg.setDepth(-10);

//     // Twinkling stars
//     this.createStarfield();

//     // Dark overlay
//     const overlay = this.add.graphics();
//     overlay.fillGradientStyle(0x000000, 0x000000, 0x1a1a3e, 0x2a2a5e, 0.4);
//     overlay.fillRect(0, 0, 2900, 720);
//     overlay.setDepth(-5);
//     overlay.setScrollFactor(0); // ✅ Fixed overlay

//     // 2) Platforms
//     this.createPlatforms();

//     // 3) Player
//     this.player = new Player(this, 150, 400);
//     this.physics.add.collider(this.player, this.platforms);

//     // 4) Camera + world
//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 2900, 720);
//     this.physics.world.setBounds(0, 0, 2900, 720);

//     // 5) Rest of scene
//     this.createTitleCard();
//     this.createPlatformLabels();
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;
//     this.createSatelliteDish();
//     this.createTechCollectibles();
//     this.createRewardStar();
//     this.createLevel3Door();
//     this.createGroundVisuals();
//     this.createInstructions();
//   }

//   createStarfield() {
//     for (let i = 0; i < 100; i++) {
//       const x = Math.random() * 2900;
//       const y = Math.random() * 600;
//       const size = Math.random() * 3 + 1;
      
//       const star = this.add.circle(x, y, size, 0xffffff, Math.random() * 0.8);
//       star.setDepth(-4);
//       star.setScrollFactor(0.2); // ✅ Slow parallax for stars
      
//       this.tweens.add({
//         targets: star,
//         alpha: Math.random() * 0.3,
//         duration: 1000 + Math.random() * 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }
//   }

//   createTitleCard() {
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a3e, 0.9);
//     titleBg.fillRoundedRect(30, 30, 450, 90, 12);
//     titleBg.lineStyle(3, 0x00d4ff, 1);
//     titleBg.strokeRoundedRect(30, 30, 450, 90, 12);
//     titleBg.setScrollFactor(0);

//     this.add.text(50, 50, '🛰️ Satellite Segmentation', {
//       fontSize: '26px',
//       color: '#00d4ff',
//       fontStyle: 'bold'
//     }).setScrollFactor(0);

//     this.add.text(50, 85, 'Jump through the tech stack!', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0);
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     const ground = this.platforms.create(1450, 710, 'ground-tile');
//     ground.setScale(70, 1).refreshBody().setAlpha(0);

//     PLATFORM_TECH.forEach((t, i) => {
//       this.add.ellipse(t.x, t.yPlatform + 15, 120, 25, 0x000000, 0.4).setDepth(-1);

//       const platform = this.platforms.create(t.x, t.yPlatform, 'platform-basic');
//       platform.refreshBody();
//       platform.setTint(t.color);

//       this.tweens.add({
//         targets: platform,
//         y: t.yPlatform - 8,
//         duration: 2000 + (i * 200),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });

//       const glow = this.add.ellipse(t.x, t.yPlatform, 140, 60, t.color, 0.2);
//       glow.setDepth(-1);
      
//       this.tweens.add({
//         targets: glow,
//         alpha: 0.4,
//         scaleX: 1.2,
//         scaleY: 1.2,
//         duration: 2000 + (i * 200),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createPlatformLabels() {
//     PLATFORM_TECH.forEach(t => {
//       const labelBg = this.add.graphics();
//       labelBg.fillStyle(0x000000, 0.7);
//       labelBg.fillRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);
//       labelBg.lineStyle(2, t.color, 1);
//       labelBg.strokeRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);

//       this.add.text(t.x, t.yPlatform - 55, t.name, {
//         fontSize: '16px',
//         color: '#ffffff',
//         fontStyle: 'bold',
//         stroke: '#000000',
//         strokeThickness: 3
//       }).setOrigin(0.5);
//     });
//   }

//   createSatelliteDish() {
//     const sat = PLATFORM_TECH.find(t => t.name === 'Satellite');
//     const x = sat.x;
//     const yPlatform = sat.yPlatform;

//     const cardBg = this.add.graphics();
//     cardBg.fillStyle(0xfbbf24, 0.2);
//     cardBg.fillRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);
//     cardBg.lineStyle(4, 0xfbbf24, 1);
//     cardBg.strokeRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);

//     const topBar = this.add.graphics();
//     topBar.fillStyle(0xfbbf24, 0.8);
//     topBar.fillRoundedRect(x - 70, yPlatform - 150, 140, 40, {tl: 12, tr: 12, bl: 0, br: 0});

//     this.satelliteDish = this.physics.add.staticImage(x, yPlatform - 70, 'satellite-dish');
//     this.satelliteDish.setScale(1.2);

//     this.tweens.add({
//       targets: this.satelliteDish,
//       angle: 360,
//       duration: 8000,
//       repeat: -1,
//       ease: 'Linear'
//     });

//     const dishGlow = this.add.ellipse(x, yPlatform - 70, 100, 100, 0xfbbf24, 0.3);
//     dishGlow.setDepth(-1);
//     this.tweens.add({
//       targets: dishGlow,
//       scaleX: 1.5,
//       scaleY: 1.5,
//       alpha: 0.1,
//       duration: 1500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.add.text(x, yPlatform - 135, '🛰️ Project', {
//       fontSize: '14px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5);

//     this.physics.add.overlap(
//       this.player,
//       this.satelliteDish,
//       () => {
//         this.currentInteractTarget = { type: 'satelliteProject' };
//       },
//       null,
//       this
//     );

//     this.dishHint = this.add.text(x, yPlatform - 30, 'Press E', {
//       fontSize: '14px',
//       color: '#00ff00',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5).setVisible(false);
//   }

//   createTechCollectibles() {
//     this.techIcons = this.physics.add.group();

//     PLATFORM_TECH.forEach((t, i) => {
//       if (!t.key) return;

//       const icon = this.techIcons.create(t.x, t.yPlatform - 100, t.key);
//       icon.setData('techName', t.name);
//       icon.setScale(0.6);
//       icon.setBounceY(0);
//       icon.body.allowGravity = false;

//       this.tweens.add({
//         targets: icon,
//         y: t.yPlatform - 110,
//         duration: 1500 + (i * 100),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });

//       this.tweens.add({
//         targets: icon,
//         angle: 360,
//         duration: 4000,
//         repeat: -1,
//         ease: 'Linear'
//       });

//       const iconGlow = this.add.ellipse(t.x, t.yPlatform - 100, 50, 50, t.color, 0.4);
//       iconGlow.setDepth(-1);
      
//       this.tweens.add({
//         targets: iconGlow,
//         scaleX: 1.3,
//         scaleY: 1.3,
//         alpha: 0.2,
//         duration: 1500 + (i * 100),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });

//     this.physics.add.overlap(
//       this.player,
//       this.techIcons,
//       (player, icon) => {
//         const name = icon.getData('techName');
        
//         this.tweens.add({
//           targets: icon,
//           scale: 0,
//           alpha: 0,
//           duration: 300,
//           ease: 'Power2',
//           onComplete: () => {
//             icon.disableBody(true, true);
//           }
//         });

//         const collectText = this.add.text(icon.x, icon.y - 30, `+${name}`, {
//           fontSize: '18px',
//           color: '#00ff00',
//           fontStyle: 'bold'
//         }).setOrigin(0.5);

//         this.tweens.add({
//           targets: collectText,
//           y: icon.y - 60,
//           alpha: 0,
//           duration: 1000,
//           onComplete: () => collectText.destroy()
//         });

//         console.log('✅ Collected tech:', name);
//         if (this.callbacks && this.callbacks.onTechCollect) {
//           this.callbacks.onTechCollect(name);
//         }
//       },
//       null,
//       this
//     );
//   }

//   createRewardStar() {
//     const deploy = PLATFORM_TECH.find(t => t.name === 'Deployment');
//     const x = deploy.x;
//     const yPlatform = deploy.yPlatform;

//     this.rewardStar = this.physics.add.sprite(x, yPlatform - 70, 'star-gold');
//     this.rewardStar.setBounceY(0.4);
//     this.rewardStar.setScale(1.2);

//     this.tweens.add({
//       targets: this.rewardStar,
//       angle: 360,
//       duration: 2000,
//       repeat: -1,
//       ease: 'Linear'
//     });

//     const starGlow = this.add.ellipse(x, yPlatform - 70, 60, 60, 0xffd700, 0.5);
//     starGlow.setDepth(-1);
//     this.tweens.add({
//       targets: starGlow,
//       scaleX: 1.5,
//       scaleY: 1.5,
//       alpha: 0.2,
//       duration: 1000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.physics.add.collider(this.rewardStar, this.platforms);

//     this.physics.add.overlap(
//       this.player,
//       this.rewardStar,
//       () => {
//         this.rewardStar.disableBody(true, true);
//         starGlow.destroy();
        
//         const victoryText = this.add.text(640, 200, '🚀 Satellite Puzzle Complete!', {
//           fontSize: '32px',
//           color: '#ffd700',
//           fontStyle: 'bold',
//           stroke: '#000000',
//           strokeThickness: 6
//         }).setOrigin(0.5).setScrollFactor(0);

//         this.tweens.add({
//           targets: victoryText,
//           scale: 1.2,
//           duration: 500,
//           yoyo: true,
//           repeat: 2,
//           onComplete: () => victoryText.destroy()
//         });
//       },
//       null,
//       this
//     );
//   }

//   createLevel3Door() {
//     const doorX = 2700;
//     const doorY = 580;

//     const doorBg = this.add.graphics();
//     doorBg.fillStyle(0xec4899, 0.3);
//     doorBg.fillRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);
//     doorBg.lineStyle(4, 0xec4899, 1);
//     doorBg.strokeRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);

//     this.level3Door = this.physics.add.staticImage(doorX, doorY - 20, 'door-large');
//     this.level3Door.setScale(1.3);

//     const doorGlow = this.add.ellipse(doorX, doorY - 20, 120, 160, 0xec4899, 0.3);
//     doorGlow.setDepth(-1);
//     this.tweens.add({
//       targets: doorGlow,
//       alpha: 0.6,
//       duration: 1500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.add.text(doorX, doorY - 120, 'Level 3 →', {
//       fontSize: '18px',
//       color: '#ec4899',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 10, y: 5 }
//     }).setOrigin(0.5);

//     this.physics.add.overlap(
//       this.player,
//       this.level3Door,
//       () => {
//         this.currentInteractTarget = { type: 'level3Door' };
//       },
//       null,
//       this
//     );
//   }

//   createGroundVisuals() {
//     const groundRect = this.add.rectangle(1450, 690, 2900, 60, 0x1a1a3e, 1);
//     groundRect.setDepth(-2);
    
//     const dirtRect = this.add.rectangle(1450, 720, 2900, 60, 0x0a0a1e, 1);
//     dirtRect.setDepth(-3);
//   }

//   createInstructions() {
//     const controlsBg = this.add.graphics();
//     controlsBg.fillStyle(0x000000, 0.8);
//     controlsBg.fillRoundedRect(390, 670, 500, 35, 8);
//     controlsBg.setScrollFactor(0);

//     this.add.text(640, 687, '← → Move  |  ↑ Jump  |  E Collect / Interact', {
//       fontSize: '16px',
//       color: '#ffffff',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 2
//     }).setOrigin(0.5).setScrollFactor(0);
//   }

//   handleInteraction(target) {
//     if (!target || !this.callbacks) return;

//     if (target.type === 'satelliteProject') {
//       const project = projects.find(p => p.id === 2);
//       if (project && this.callbacks.openProjectModal) {
//         this.callbacks.openProjectModal(project);
//       }
//     }

//     if (target.type === 'level3Door') {
//       this.scene.start('Level3Scene');
//     }

//     this.currentInteractTarget = null;
//   }

//   update() {
//     if (this.player && this.player.update) {
//       this.player.update();
//     }

//     if (this.currentInteractTarget && this.currentInteractTarget.type === 'satelliteProject') {
//       this.dishHint.setVisible(true);
//     } else {
//       this.dishHint.setVisible(false);
//     }

//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }
//   }
// }



































// // src/game/scenes/Level2Scene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import projects from '../../data/projects.json';

// const PLATFORM_TECH = [
//   { name: 'YOLOv8',     key: 'icon-yolo',        x: 350,  yPlatform: 540, color: 0x00ff41 },
//   { name: 'PyTorch',    key: 'icon-pytorch',     x: 620,  yPlatform: 470, color: 0xee4c2c },
//   { name: 'U-Net',      key: 'icon-unet',        x: 890,  yPlatform: 410, color: 0x4169e1 },
//   { name: 'PIL',        key: 'icon-python',      x: 1240, yPlatform: 450, color: 0xffd43b },
//   { name: 'NumPy',      key: 'icon-numpy',       x: 1510, yPlatform: 390, color: 0x4dabcf },
//   { name: 'GeoJSON',    key: 'icon-geojson',     x: 1780, yPlatform: 510, color: 0x00d4aa },
//   { name: 'CLI Tool',   key: 'icon-pyinstaller', x: 2050, yPlatform: 430, color: 0xff6b6b },
//   { name: 'Deployment', key: 'icon-docker',      x: 2320, yPlatform: 360, color: 0x2496ed },
//   { name: 'Satellite',  key: null,               x: 2550, yPlatform: 320, color: 0xfbbf24 }
// ];

// export default class Level2Scene extends Phaser.Scene {
//   constructor() {
//     super('Level2Scene');
//   }

//   create() {
//     // ✨ FIXED SATELLITE BACKGROUND (doesn't scroll)
//     const satelliteBg = this.add.image(640, 360, 'level2-satellite');
//     satelliteBg.setDisplaySize(1280, 720); // ✅ Fill viewport
//     satelliteBg.setScrollFactor(0);         // ✅ FIXED - doesn't move!
//     satelliteBg.setAlpha(0.6);              // ✅ Semi-transparent
//     satelliteBg.setDepth(-10);

//     // Twinkling stars
//     this.createStarfield();

//     // Dark overlay
//     const overlay = this.add.graphics();
//     overlay.fillGradientStyle(0x000000, 0x000000, 0x1a1a3e, 0x2a2a5e, 0.4);
//     overlay.fillRect(0, 0, 2900, 720);
//     overlay.setDepth(-5);
//     overlay.setScrollFactor(0); // ✅ Fixed overlay

//     // 2) Platforms
//     this.createPlatforms();

//     // 3) Player
//     this.player = new Player(this, 150, 400);
//     this.physics.add.collider(this.player, this.platforms);

//     // 4) Camera + world
//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 2900, 720);
//     this.physics.world.setBounds(0, 0, 2900, 720);

//     // 5) Rest of scene
//     this.createTitleCard();
//     this.createPlatformLabels();
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;
//     this.createSatelliteDish();
//     this.createTechCollectibles();
//     this.createRewardStar();
//     this.createLevel3Door();
//     this.createGroundVisuals();
//     this.createInstructions();

//     // 🎮 6) MOUSE HOVER + FORWARD/BACK EVENT LISTENERS
//     this.setupMouseHoverListeners();
//     this.setupForwardBackListeners();
//   }

//   // 🎮 MOUSE HOVER AUTO-TRIGGER SETUP
//   setupMouseHoverListeners() {
//     this.game.registry.events.on('mouseHover', (target) => {
//       if (target) {
//         this.handleInteraction(target);
//       }
//     });
//   }

//   // 🎮 FORWARD/BACK BUTTON LISTENERS
//   setupForwardBackListeners() {
//     this.game.registry.events.on('moveForward', () => {
//       if (this.player && this.player.sprite && this.player.sprite.body) {
//         this.player.sprite.setVelocityX(300);
//         this.time.delayedCall(200, () => {
//           if (this.player && this.player.sprite && this.player.sprite.body) {
//             this.player.sprite.setVelocityX(0);
//           }
//         });
//       }
//     });

//     this.game.registry.events.on('moveBackward', () => {
//       if (this.player && this.player.sprite && this.player.sprite.body) {
//         this.player.sprite.setVelocityX(-300);
//         this.time.delayedCall(200, () => {
//           if (this.player && this.player.sprite && this.player.sprite.body) {
//             this.player.sprite.setVelocityX(0);
//           }
//         });
//       }
//     });
//   }

//   // 🎮 HELPER: Add mouse hover to interactive element
//   addMouseHoverToElement(element, target) {
//     element.setInteractive();
    
//     element.on('pointerover', () => {
//       this.currentInteractTarget = target;
//       this.game.registry.events.emit('mouseHover', target);
//     });

//     element.on('pointerout', () => {
//       this.currentInteractTarget = null;
//     });
//   }

//   createStarfield() {
//     for (let i = 0; i < 100; i++) {
//       const x = Math.random() * 2900;
//       const y = Math.random() * 600;
//       const size = Math.random() * 3 + 1;
      
//       const star = this.add.circle(x, y, size, 0xffffff, Math.random() * 0.8);
//       star.setDepth(-4);
//       star.setScrollFactor(0.2); // ✅ Slow parallax for stars
      
//       this.tweens.add({
//         targets: star,
//         alpha: Math.random() * 0.3,
//         duration: 1000 + Math.random() * 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }
//   }

//   createTitleCard() {
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a3e, 0.9);
//     titleBg.fillRoundedRect(30, 30, 450, 90, 12);
//     titleBg.lineStyle(3, 0x00d4ff, 1);
//     titleBg.strokeRoundedRect(30, 30, 450, 90, 12);
//     titleBg.setScrollFactor(0);

//     this.add.text(50, 50, '🛰️ Satellite Segmentation', {
//       fontSize: '26px',
//       color: '#00d4ff',
//       fontStyle: 'bold'
//     }).setScrollFactor(0);

//     this.add.text(50, 85, 'Jump through the tech stack!', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0);
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     const ground = this.platforms.create(1450, 710, 'ground-tile');
//     ground.setScale(70, 1).refreshBody().setAlpha(0);

//     PLATFORM_TECH.forEach((t, i) => {
//       this.add.ellipse(t.x, t.yPlatform + 15, 120, 25, 0x000000, 0.4).setDepth(-1);

//       const platform = this.platforms.create(t.x, t.yPlatform, 'platform-basic');
//       platform.refreshBody();
//       platform.setTint(t.color);

//       this.tweens.add({
//         targets: platform,
//         y: t.yPlatform - 8,
//         duration: 2000 + (i * 200),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });

//       const glow = this.add.ellipse(t.x, t.yPlatform, 140, 60, t.color, 0.2);
//       glow.setDepth(-1);
      
//       this.tweens.add({
//         targets: glow,
//         alpha: 0.4,
//         scaleX: 1.2,
//         scaleY: 1.2,
//         duration: 2000 + (i * 200),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createPlatformLabels() {
//     PLATFORM_TECH.forEach(t => {
//       const labelBg = this.add.graphics();
//       labelBg.fillStyle(0x000000, 0.7);
//       labelBg.fillRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);
//       labelBg.lineStyle(2, t.color, 1);
//       labelBg.strokeRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);

//       this.add.text(t.x, t.yPlatform - 55, t.name, {
//         fontSize: '16px',
//         color: '#ffffff',
//         fontStyle: 'bold',
//         stroke: '#000000',
//         strokeThickness: 3
//       }).setOrigin(0.5);
//     });
//   }

//   createSatelliteDish() {
//     const sat = PLATFORM_TECH.find(t => t.name === 'Satellite');
//     const x = sat.x;
//     const yPlatform = sat.yPlatform;

//     const cardBg = this.add.graphics();
//     cardBg.fillStyle(0xfbbf24, 0.2);
//     cardBg.fillRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);
//     cardBg.lineStyle(4, 0xfbbf24, 1);
//     cardBg.strokeRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);

//     const topBar = this.add.graphics();
//     topBar.fillStyle(0xfbbf24, 0.8);
//     topBar.fillRoundedRect(x - 70, yPlatform - 150, 140, 40, {tl: 12, tr: 12, bl: 0, br: 0});

//     this.satelliteDish = this.physics.add.staticImage(x, yPlatform - 70, 'satellite-dish');
//     this.satelliteDish.setScale(1.2);

//     this.tweens.add({
//       targets: this.satelliteDish,
//       angle: 360,
//       duration: 8000,
//       repeat: -1,
//       ease: 'Linear'
//     });

//     const dishGlow = this.add.ellipse(x, yPlatform - 70, 100, 100, 0xfbbf24, 0.3);
//     dishGlow.setDepth(-1);
//     this.tweens.add({
//       targets: dishGlow,
//       scaleX: 1.5,
//       scaleY: 1.5,
//       alpha: 0.1,
//       duration: 1500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.add.text(x, yPlatform - 135, '🛰️ Project', {
//       fontSize: '14px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5);

//     const target = { type: 'satelliteProject' };

//     this.physics.add.overlap(
//       this.player,
//       this.satelliteDish,
//       () => {
//         this.currentInteractTarget = target;
//       },
//       null,
//       this
//     );

//     // 🎮 Add mouse hover to satellite dish
//     this.addMouseHoverToElement(this.satelliteDish, target);

//     this.dishHint = this.add.text(x, yPlatform - 30, 'Press E / Hover', {
//       fontSize: '13px',
//       color: '#00ff00',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5).setVisible(false);
//   }

//   createTechCollectibles() {
//     this.techIcons = this.physics.add.group();

//     PLATFORM_TECH.forEach((t, i) => {
//       if (!t.key) return;

//       const icon = this.techIcons.create(t.x, t.yPlatform - 100, t.key);
//       icon.setData('techName', t.name);
//       icon.setScale(0.6);
//       icon.setBounceY(0);
//       icon.body.allowGravity = false;

//       this.tweens.add({
//         targets: icon,
//         y: t.yPlatform - 110,
//         duration: 1500 + (i * 100),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });

//       this.tweens.add({
//         targets: icon,
//         angle: 360,
//         duration: 4000,
//         repeat: -1,
//         ease: 'Linear'
//       });

//       const iconGlow = this.add.ellipse(t.x, t.yPlatform - 100, 50, 50, t.color, 0.4);
//       iconGlow.setDepth(-1);
      
//       this.tweens.add({
//         targets: iconGlow,
//         scaleX: 1.3,
//         scaleY: 1.3,
//         alpha: 0.2,
//         duration: 1500 + (i * 100),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });

//     this.physics.add.overlap(
//       this.player,
//       this.techIcons,
//       (player, icon) => {
//         const name = icon.getData('techName');
        
//         this.tweens.add({
//           targets: icon,
//           scale: 0,
//           alpha: 0,
//           duration: 300,
//           ease: 'Power2',
//           onComplete: () => {
//             icon.disableBody(true, true);
//           }
//         });

//         const collectText = this.add.text(icon.x, icon.y - 30, `+${name}`, {
//           fontSize: '18px',
//           color: '#00ff00',
//           fontStyle: 'bold'
//         }).setOrigin(0.5);

//         this.tweens.add({
//           targets: collectText,
//           y: icon.y - 60,
//           alpha: 0,
//           duration: 1000,
//           onComplete: () => collectText.destroy()
//         });

//         console.log('✅ Collected tech:', name);
//         if (this.callbacks && this.callbacks.onTechCollect) {
//           this.callbacks.onTechCollect(name);
//         }
//       },
//       null,
//       this
//     );
//   }

//   createRewardStar() {
//     const deploy = PLATFORM_TECH.find(t => t.name === 'Deployment');
//     const x = deploy.x;
//     const yPlatform = deploy.yPlatform;

//     this.rewardStar = this.physics.add.sprite(x, yPlatform - 70, 'star-gold');
//     this.rewardStar.setBounceY(0.4);
//     this.rewardStar.setScale(1.2);

//     this.tweens.add({
//       targets: this.rewardStar,
//       angle: 360,
//       duration: 2000,
//       repeat: -1,
//       ease: 'Linear'
//     });

//     const starGlow = this.add.ellipse(x, yPlatform - 70, 60, 60, 0xffd700, 0.5);
//     starGlow.setDepth(-1);
//     this.tweens.add({
//       targets: starGlow,
//       scaleX: 1.5,
//       scaleY: 1.5,
//       alpha: 0.2,
//       duration: 1000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.physics.add.collider(this.rewardStar, this.platforms);

//     this.physics.add.overlap(
//       this.player,
//       this.rewardStar,
//       () => {
//         this.rewardStar.disableBody(true, true);
//         starGlow.destroy();
        
//         const victoryText = this.add.text(640, 200, '🚀 Satellite Puzzle Complete!', {
//           fontSize: '32px',
//           color: '#ffd700',
//           fontStyle: 'bold',
//           stroke: '#000000',
//           strokeThickness: 6
//         }).setOrigin(0.5).setScrollFactor(0);

//         this.tweens.add({
//           targets: victoryText,
//           scale: 1.2,
//           duration: 500,
//           yoyo: true,
//           repeat: 2,
//           onComplete: () => victoryText.destroy()
//         });
//       },
//       null,
//       this
//     );
//   }

//   createLevel3Door() {
//     const doorX = 2700;
//     const doorY = 580;

//     const doorBg = this.add.graphics();
//     doorBg.fillStyle(0xec4899, 0.3);
//     doorBg.fillRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);
//     doorBg.lineStyle(4, 0xec4899, 1);
//     doorBg.strokeRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);

//     this.level3Door = this.physics.add.staticImage(doorX, doorY - 20, 'door-large');
//     this.level3Door.setScale(1.3);

//     const doorGlow = this.add.ellipse(doorX, doorY - 20, 120, 160, 0xec4899, 0.3);
//     doorGlow.setDepth(-1);
//     this.tweens.add({
//       targets: doorGlow,
//       alpha: 0.6,
//       duration: 1500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.add.text(doorX, doorY - 120, 'Level 3 →', {
//       fontSize: '18px',
//       color: '#ec4899',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 10, y: 5 }
//     }).setOrigin(0.5);

//     const target = { type: 'level3Door' };

//     this.physics.add.overlap(
//       this.player,
//       this.level3Door,
//       () => {
//         this.currentInteractTarget = target;
//       },
//       null,
//       this
//     );

//     // 🎮 Add mouse hover to Level 3 door
//     this.addMouseHoverToElement(this.level3Door, target);
//   }

//   createGroundVisuals() {
//     const groundRect = this.add.rectangle(1450, 690, 2900, 60, 0x1a1a3e, 1);
//     groundRect.setDepth(-2);
    
//     const dirtRect = this.add.rectangle(1450, 720, 2900, 60, 0x0a0a1e, 1);
//     dirtRect.setDepth(-3);
//   }

//   createInstructions() {
//     const controlsBg = this.add.graphics();
//     controlsBg.fillStyle(0x000000, 0.8);
//     controlsBg.fillRoundedRect(340, 670, 600, 35, 8);
//     controlsBg.setScrollFactor(0);

//     this.add.text(640, 687, '← → Move  |  ↑ Jump  |  E Interact  |  Hover = Auto Open', {
//       fontSize: '15px',
//       color: '#ffffff',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 2
//     }).setOrigin(0.5).setScrollFactor(0);
//   }

//   handleInteraction(target) {
//     if (!target) return;

//     if (target.type === 'satelliteProject') {
//       const project = projects.find(p => p.id === 2);
//       if (project && this.callbacks && this.callbacks.openProjectModal) {
//         this.callbacks.openProjectModal(project);
//       } else {
//         console.log('📡 Satellite project:', project);
//       }
//     }

//     if (target.type === 'level3Door') {
//       this.scene.start('Level3Scene');
//     }

//     this.currentInteractTarget = null;
//   }

//   update() {
//     if (this.player && this.player.update) {
//       this.player.update();
//     }

//     if (this.currentInteractTarget && this.currentInteractTarget.type === 'satelliteProject') {
//       this.dishHint.setVisible(true);
//     } else {
//       this.dishHint.setVisible(false);
//     }

//     // ⌨️ E KEY INTERACTION (backup)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }
//   }
// }

















import Phaser from 'phaser';
import Player from '../entities/Player';
import projects from '../../data/projects.json';

const PLATFORM_TECH = [
  { name: 'YOLOv8', key: 'icon-yolo', x: 350, yPlatform: 540, color: 0x00ff41 },
  { name: 'PyTorch', key: 'icon-pytorch', x: 620, yPlatform: 470, color: 0xee4c2c },
  { name: 'U-Net', key: 'icon-unet', x: 890, yPlatform: 410, color: 0x4169e1 },
  { name: 'PIL', key: 'icon-python', x: 1240, yPlatform: 450, color: 0xffd43b },
  { name: 'NumPy', key: 'icon-numpy', x: 1510, yPlatform: 390, color: 0x4dabcf },
  { name: 'GeoJSON', key: 'icon-geojson', x: 1780, yPlatform: 510, color: 0x00d4aa },
  { name: 'CLI Tool', key: 'icon-pyinstaller', x: 2050, yPlatform: 430, color: 0xff6b6b },
  { name: 'Deployment', key: 'icon-docker', x: 2320, yPlatform: 360, color: 0x2496ed },
  { name: 'Satellite', key: null, x: 2550, yPlatform: 320, color: 0xfbbf24 }
];

export default class Level2Scene extends Phaser.Scene {
  constructor() {
    super('Level2Scene');
  }

  create() {
    const satelliteBg = this.add.image(640, 360, 'level2-satellite');
    satelliteBg.setDisplaySize(1280, 720);
    satelliteBg.setScrollFactor(0);
    satelliteBg.setAlpha(0.6);
    satelliteBg.setDepth(-10);

    this.createStarfield();

    const overlay = this.add.graphics();
    overlay.fillGradientStyle(0x000000, 0x000000, 0x1a1a3e, 0x2a2a5e, 0.4);
    overlay.fillRect(0, 0, 2900, 720);
    overlay.setDepth(-5);
    overlay.setScrollFactor(0);

    this.createPlatforms();

    this.player = new Player(this, 150, 400);
    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, 2900, 720);
    this.physics.world.setBounds(0, 0, 2900, 720);

    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // 🎮 CAMERA + PLAYER DUAL MODE
    this.game.registry.events.on('moveForward', () => {
      const targetX = Math.min(this.cameras.main.scrollX + 300, 2900 - 1280);
      this.tweens.add({ targets: this.cameras.main, scrollX: targetX, duration: 400, ease: 'Power2' });
      this.player.setVelocityX(350);
      this.time.delayedCall(250, () => this.player.setVelocityX(0));
    });

    this.game.registry.events.on('moveBackward', () => {
      const targetX = Math.max(this.cameras.main.scrollX - 300, 0);
      this.tweens.add({ targets: this.cameras.main, scrollX: targetX, duration: 400, ease: 'Power2' });
      this.player.setVelocityX(-350);
      this.time.delayedCall(250, () => this.player.setVelocityX(0));
    });

    this.game.registry.events.on('moveLeft', () => {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
      this.time.delayedCall(150, () => this.player.setVelocityX(0));
    });

    this.game.registry.events.on('moveRight', () => {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
      this.time.delayedCall(150, () => this.player.setVelocityX(0));
    });

    this.game.registry.events.on('jump', () => {
      if (this.player.body.blocked.down) this.player.setVelocityY(-600);
    });

    this.createTitleCard();
    this.createPlatformLabels();
    this.createSatelliteDish();
    this.createTechCollectibles();
    this.createRewardStar();
    this.createLevel3Door();
    this.createGroundVisuals();
    this.createInstructions();
  }

  createStarfield() {
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 2900;
      const y = Math.random() * 600;
      const size = Math.random() * 3 + 1;
      const star = this.add.circle(x, y, size, 0xffffff, Math.random() * 0.8);
      star.setDepth(-4).setScrollFactor(0.2);
      this.tweens.add({ targets: star, alpha: Math.random() * 0.3, duration: 1000 + Math.random() * 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
  }

  createTitleCard() {
    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x1a1a3e, 0.9);
    titleBg.fillRoundedRect(30, 30, 450, 90, 12);
    titleBg.lineStyle(3, 0x00d4ff, 1);
    titleBg.strokeRoundedRect(30, 30, 450, 90, 12);
    titleBg.setScrollFactor(0);

    this.add.text(50, 50, '🛰️ Satellite Segmentation', { fontSize: '26px', color: '#00d4ff', fontStyle: 'bold' }).setScrollFactor(0);
    this.add.text(50, 85, '👆 Hover tech = Collect | ←→ Camera scroll', { fontSize: '14px', color: '#cccccc', fontStyle: 'italic' }).setScrollFactor(0);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    const ground = this.platforms.create(1450, 710, 'ground-tile');
    ground.setScale(70, 1).refreshBody().setAlpha(0);

    PLATFORM_TECH.forEach((t, i) => {
      this.add.ellipse(t.x, t.yPlatform + 15, 120, 25, 0x000000, 0.4).setDepth(-1);
      const platform = this.platforms.create(t.x, t.yPlatform, 'platform-basic');
      platform.refreshBody().setTint(t.color);
      this.tweens.add({ targets: platform, y: t.yPlatform - 8, duration: 2000 + (i * 200), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

      const glow = this.add.ellipse(t.x, t.yPlatform, 140, 60, t.color, 0.2).setDepth(-1);
      this.tweens.add({ targets: glow, alpha: 0.4, scaleX: 1.2, scaleY: 1.2, duration: 2000 + (i * 200), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
  }

  createPlatformLabels() {
    PLATFORM_TECH.forEach(t => {
      const labelBg = this.add.graphics();
      labelBg.fillStyle(0x000000, 0.7);
      labelBg.fillRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);
      labelBg.lineStyle(2, t.color, 1);
      labelBg.strokeRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);
      this.add.text(t.x, t.yPlatform - 55, t.name, { fontSize: '16px', color: '#ffffff', fontStyle: 'bold', stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
    });
  }

  createSatelliteDish() {
    const sat = PLATFORM_TECH.find(t => t.name === 'Satellite');
    const x = sat.x, yPlatform = sat.yPlatform;

    const cardBg = this.add.graphics();
    cardBg.fillStyle(0xfbbf24, 0.2);
    cardBg.fillRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);
    cardBg.lineStyle(4, 0xfbbf24, 1);
    cardBg.strokeRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);

    const topBar = this.add.graphics();
    topBar.fillStyle(0xfbbf24, 0.8);
    topBar.fillRoundedRect(x - 70, yPlatform - 150, 140, 40, { tl: 12, tr: 12, bl: 0, br: 0 });

    this.satelliteDish = this.physics.add.staticImage(x, yPlatform - 70, 'satellite-dish').setScale(1.2).setInteractive();
    this.tweens.add({ targets: this.satelliteDish, angle: 360, duration: 8000, repeat: -1, ease: 'Linear' });

    const dishGlow = this.add.ellipse(x, yPlatform - 70, 100, 100, 0xfbbf24, 0.3).setDepth(-1);
    this.tweens.add({ targets: dishGlow, scaleX: 1.5, scaleY: 1.5, alpha: 0.1, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.add.text(x, yPlatform - 135, '🛰️ Project', { fontSize: '14px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
    const hint = this.add.text(x, yPlatform - 30, '👆 Hover', { fontSize: '13px', color: '#00ff00', fontStyle: 'bold', backgroundColor: '#00000099', padding: { x: 8, y: 4 } }).setOrigin(0.5);

    // 👆 MOUSE HOVER AUTO-TRIGGER
    this.satelliteDish.on('pointerover', () => {
      hint.setText('Opening...');
      const project = projects.find(p => p.id === 2);
      if (project && this.callbacks?.openProjectModal) this.callbacks.openProjectModal(project);
    });
    this.satelliteDish.on('pointerout', () => { hint.setText('👆 Hover'); });

    this.physics.add.overlap(this.player, this.satelliteDish, () => { this.currentInteractTarget = { type: 'satelliteProject' }; });
  }

  createTechCollectibles() {
    this.techIcons = this.physics.add.group();

    PLATFORM_TECH.forEach((t, i) => {
      if (!t.key) return;

      const icon = this.techIcons.create(t.x, t.yPlatform - 100, t.key);
      icon.setData('techName', t.name).setScale(0.6).setBounceY(0);
      icon.body.allowGravity = false;

      this.tweens.add({ targets: icon, y: t.yPlatform - 110, duration: 1500 + (i * 100), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: icon, angle: 360, duration: 4000, repeat: -1, ease: 'Linear' });

      const iconGlow = this.add.ellipse(t.x, t.yPlatform - 100, 50, 50, t.color, 0.4).setDepth(-1);
      this.tweens.add({ targets: iconGlow, scaleX: 1.3, scaleY: 1.3, alpha: 0.2, duration: 1500 + (i * 100), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });

    this.physics.add.overlap(this.player, this.techIcons, (player, icon) => {
      const name = icon.getData('techName');
      this.tweens.add({ targets: icon, scale: 0, alpha: 0, duration: 300, ease: 'Power2', onComplete: () => icon.disableBody(true, true) });
      const collectText = this.add.text(icon.x, icon.y - 30, `+${name}`, { fontSize: '18px', color: '#00ff00', fontStyle: 'bold' }).setOrigin(0.5);
      this.tweens.add({ targets: collectText, y: icon.y - 60, alpha: 0, duration: 1000, onComplete: () => collectText.destroy() });
      this.callbacks?.onTechCollect?.(name);
    });
  }

  createRewardStar() {
    const deploy = PLATFORM_TECH.find(t => t.name === 'Deployment');
    const x = deploy.x, yPlatform = deploy.yPlatform;

    this.rewardStar = this.physics.add.sprite(x, yPlatform - 70, 'star-gold').setBounceY(0.4).setScale(1.2);
    this.tweens.add({ targets: this.rewardStar, angle: 360, duration: 2000, repeat: -1, ease: 'Linear' });

    const starGlow = this.add.ellipse(x, yPlatform - 70, 60, 60, 0xffd700, 0.5).setDepth(-1);
    this.tweens.add({ targets: starGlow, scaleX: 1.5, scaleY: 1.5, alpha: 0.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.physics.add.collider(this.rewardStar, this.platforms);
    this.physics.add.overlap(this.player, this.rewardStar, () => {
      this.rewardStar.disableBody(true, true);
      starGlow.destroy();
      const victoryText = this.add.text(640, 200, '🚀 Satellite Puzzle Complete!', { fontSize: '32px', color: '#ffd700', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setScrollFactor(0);
      this.tweens.add({ targets: victoryText, scale: 1.2, duration: 500, yoyo: true, repeat: 2, onComplete: () => victoryText.destroy() });
    });
  }

  createLevel3Door() {
    const doorX = 2700, doorY = 580;

    const doorBg = this.add.graphics();
    doorBg.fillStyle(0xec4899, 0.3);
    doorBg.fillRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);
    doorBg.lineStyle(4, 0xec4899, 1);
    doorBg.strokeRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);

    this.level3Door = this.physics.add.staticImage(doorX, doorY - 20, 'door-large').setScale(1.3).setInteractive();

    const doorGlow = this.add.ellipse(doorX, doorY - 20, 120, 160, 0xec4899, 0.3).setDepth(-1);
    this.tweens.add({ targets: doorGlow, alpha: 0.6, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.add.text(doorX, doorY - 120, 'Level 3 →', { fontSize: '18px', color: '#ec4899', fontStyle: 'bold', backgroundColor: '#00000099', padding: { x: 10, y: 5 } }).setOrigin(0.5);

    // 👆 MOUSE HOVER LEVEL3 DOOR
    this.level3Door.on('pointerover', () => this.scene.start('Level3Scene'));
    this.physics.add.overlap(this.player, this.level3Door, () => { this.currentInteractTarget = { type: 'level3Door' }; });
  }

  createGroundVisuals() {
    this.add.rectangle(1450, 690, 2900, 60, 0x1a1a3e, 1).setDepth(-2);
    this.add.rectangle(1450, 720, 2900, 60, 0x0a0a1e, 1).setDepth(-3);
  }

  createInstructions() {
    const controlsBg = this.add.graphics();
    controlsBg.fillStyle(0x000000, 0.8);
    controlsBg.fillRoundedRect(340, 670, 600, 35, 8);
    controlsBg.setScrollFactor(0);
    this.add.text(640, 687, '👆 HOVER = Auto Modal | ←→ CAMERA+Player | WASD Play', { fontSize: '15px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
  }

  update() {
    if (this.player?.update) this.player.update();
    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'satelliteProject') {
        const project = projects.find(p => p.id === 2);
        if (project && this.callbacks?.openProjectModal) this.callbacks.openProjectModal(project);
      }
      if (this.currentInteractTarget.type === 'level3Door') this.scene.start('Level3Scene');
      this.currentInteractTarget = null;
    }
  }
}



















// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import projects from '../../data/projects.json';

// const PLATFORM_TECH = [
//   { name: 'YOLOv8', key: 'icon-yolo', x: 350, yPlatform: 540, color: 0x00ff41 },
//   { name: 'PyTorch', key: 'icon-pytorch', x: 620, yPlatform: 470, color: 0xee4c2c },
//   { name: 'U-Net', key: 'icon-unet', x: 890, yPlatform: 410, color: 0x4169e1 },
//   { name: 'PIL', key: 'icon-python', x: 1240, yPlatform: 450, color: 0xffd43b },
//   { name: 'NumPy', key: 'icon-numpy', x: 1510, yPlatform: 390, color: 0x4dabcf },
//   { name: 'GeoJSON', key: 'icon-geojson', x: 1780, yPlatform: 510, color: 0x00d4aa },
//   { name: 'CLI Tool', key: 'icon-pyinstaller', x: 2050, yPlatform: 430, color: 0xff6b6b },
//   { name: 'Deployment', key: 'icon-docker', x: 2320, yPlatform: 360, color: 0x2496ed },
//   { name: 'Satellite', key: null, x: 2550, yPlatform: 320, color: 0xfbbf24 }
// ];

// export default class Level2Scene extends Phaser.Scene {
//   constructor() {
//     super('Level2Scene');
//   }

//   create() {
//     // Background
//     const satelliteBg = this.add.image(640, 360, 'level2-satellite');
//     satelliteBg.setDisplaySize(1280, 720);
//     satelliteBg.setScrollFactor(0);
//     satelliteBg.setAlpha(0.6);
//     satelliteBg.setDepth(-10);

//     // Starfield
//     this.createStarfield();

//     // Gradient overlay
//     const overlay = this.add.graphics();
//     overlay.fillGradientStyle(0x000000, 0x000000, 0x1a1a3e, 0x2a2a5e, 0.4);
//     overlay.fillRect(0, 0, 2900, 720);
//     overlay.setDepth(-5);
//     overlay.setScrollFactor(0);

//     // Platforms
//     this.createPlatforms();

//     // Player
//     this.player = new Player(this, 150, 400);
//     this.physics.add.collider(this.player, this.platforms);

//     // Camera setup
//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 2900, 720);
//     this.physics.world.setBounds(0, 0, 2900, 720);

//     // Input
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // Create content
//     this.createTitleCard();
//     this.createPlatformLabels();
//     this.createSatelliteDish();
//     this.createTechCollectibles();
//     this.createRewardStar();
//     this.createLevel3Door();
//     this.createGroundVisuals();
//     this.createInstructions();

//     // Cleanup on shutdown
//     this.events.on('shutdown', this.cleanup, this);
//   }

//   // 🧹 CLEANUP (Global events handled in index.js)
//   cleanup() {
//     // No cleanup needed - global movement system handles everything
//   }

//   createStarfield() {
//     for (let i = 0; i < 100; i++) {
//       const x = Math.random() * 2900;
//       const y = Math.random() * 600;
//       const size = Math.random() * 3 + 1;
//       const star = this.add.circle(x, y, size, 0xffffff, Math.random() * 0.8);
//       star.setDepth(-4).setScrollFactor(0.2);
//       this.tweens.add({
//         targets: star,
//         alpha: Math.random() * 0.3,
//         duration: 1000 + Math.random() * 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }
//   }

//   createTitleCard() {
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a3e, 0.9);
//     titleBg.fillRoundedRect(30, 30, 450, 90, 12);
//     titleBg.lineStyle(3, 0x00d4ff, 1);
//     titleBg.strokeRoundedRect(30, 30, 450, 90, 12);
//     titleBg.setScrollFactor(0);

//     this.add.text(50, 50, '🛰️ Satellite Segmentation', {
//       fontSize: '26px',
//       color: '#00d4ff',
//       fontStyle: 'bold'
//     }).setScrollFactor(0);

//     this.add.text(50, 85, '👆 Hover tech = Collect | ←→ Move forward', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0);
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();
//     const ground = this.platforms.create(1450, 710, 'ground-tile');
//     ground.setScale(70, 1).refreshBody().setAlpha(0);

//     PLATFORM_TECH.forEach((t, i) => {
//       // Platform shadow
//       this.add.ellipse(t.x, t.yPlatform + 15, 120, 25, 0x000000, 0.4).setDepth(-1);
      
//       // Platform
//       const platform = this.platforms.create(t.x, t.yPlatform, 'platform-basic');
//       platform.refreshBody().setTint(t.color);
      
//       // Float animation
//       this.tweens.add({
//         targets: platform,
//         y: t.yPlatform - 8,
//         duration: 2000 + (i * 200),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });

//       // Platform glow
//       const glow = this.add.ellipse(t.x, t.yPlatform, 140, 60, t.color, 0.2).setDepth(-1);
//       this.tweens.add({
//         targets: glow,
//         alpha: 0.4,
//         scaleX: 1.2,
//         scaleY: 1.2,
//         duration: 2000 + (i * 200),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createPlatformLabels() {
//     PLATFORM_TECH.forEach(t => {
//       const labelBg = this.add.graphics();
//       labelBg.fillStyle(0x000000, 0.7);
//       labelBg.fillRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);
//       labelBg.lineStyle(2, t.color, 1);
//       labelBg.strokeRoundedRect(t.x - 60, t.yPlatform - 70, 120, 30, 8);
      
//       this.add.text(t.x, t.yPlatform - 55, t.name, {
//         fontSize: '16px',
//         color: '#ffffff',
//         fontStyle: 'bold',
//         stroke: '#000000',
//         strokeThickness: 3
//       }).setOrigin(0.5);
//     });
//   }

//   createSatelliteDish() {
//     const sat = PLATFORM_TECH.find(t => t.name === 'Satellite');
//     const x = sat.x, yPlatform = sat.yPlatform;

//     // Card background
//     const cardBg = this.add.graphics();
//     cardBg.fillStyle(0xfbbf24, 0.2);
//     cardBg.fillRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);
//     cardBg.lineStyle(4, 0xfbbf24, 1);
//     cardBg.strokeRoundedRect(x - 70, yPlatform - 150, 140, 180, 12);

//     // Top bar
//     const topBar = this.add.graphics();
//     topBar.fillStyle(0xfbbf24, 0.8);
//     topBar.fillRoundedRect(x - 70, yPlatform - 150, 140, 40, { tl: 12, tr: 12, bl: 0, br: 0 });

//     // Satellite dish
//     this.satelliteDish = this.physics.add.staticImage(x, yPlatform - 70, 'satellite-dish');
//     this.satelliteDish.setScale(1.2).setInteractive();
    
//     // Rotate animation
//     this.tweens.add({
//       targets: this.satelliteDish,
//       angle: 360,
//       duration: 8000,
//       repeat: -1,
//       ease: 'Linear'
//     });

//     // Dish glow
//     const dishGlow = this.add.ellipse(x, yPlatform - 70, 100, 100, 0xfbbf24, 0.3).setDepth(-1);
//     this.tweens.add({
//       targets: dishGlow,
//       scaleX: 1.5,
//       scaleY: 1.5,
//       alpha: 0.1,
//       duration: 1500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Labels
//     this.add.text(x, yPlatform - 135, '🛰️ Project', {
//       fontSize: '14px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5);

//     const hint = this.add.text(x, yPlatform - 30, '👆 Hover', {
//       fontSize: '13px',
//       color: '#00ff00',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5);

//     // 👆 MOUSE HOVER AUTO-TRIGGER
//     this.satelliteDish.on('pointerover', () => {
//       hint.setText('Opening...');
//       const project = projects.find(p => p.id === 2);
//       if (project && this.callbacks?.openProjectModal) {
//         this.callbacks.openProjectModal(project);
//       }
//     });
    
//     this.satelliteDish.on('pointerout', () => {
//       hint.setText('👆 Hover');
//     });

//     // Player overlap (backup for E key)
//     this.physics.add.overlap(this.player, this.satelliteDish, () => {
//       this.currentInteractTarget = { type: 'satelliteProject' };
//     });
//   }

//   createTechCollectibles() {
//     this.techIcons = this.physics.add.group();

//     PLATFORM_TECH.forEach((t, i) => {
//       if (!t.key) return;

//       const icon = this.techIcons.create(t.x, t.yPlatform - 100, t.key);
//       icon.setData('techName', t.name).setScale(0.6).setBounceY(0);
//       icon.body.allowGravity = false;

//       // Float animation
//       this.tweens.add({
//         targets: icon,
//         y: t.yPlatform - 110,
//         duration: 1500 + (i * 100),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });

//       // Spin animation
//       this.tweens.add({
//         targets: icon,
//         angle: 360,
//         duration: 4000,
//         repeat: -1,
//         ease: 'Linear'
//       });

//       // Icon glow
//       const iconGlow = this.add.ellipse(t.x, t.yPlatform - 100, 50, 50, t.color, 0.4).setDepth(-1);
//       this.tweens.add({
//         targets: iconGlow,
//         scaleX: 1.3,
//         scaleY: 1.3,
//         alpha: 0.2,
//         duration: 1500 + (i * 100),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });

//     // Collect tech icons
//     this.physics.add.overlap(this.player, this.techIcons, (player, icon) => {
//       const name = icon.getData('techName');
      
//       // Shrink animation
//       this.tweens.add({
//         targets: icon,
//         scale: 0,
//         alpha: 0,
//         duration: 300,
//         ease: 'Power2',
//         onComplete: () => icon.disableBody(true, true)
//       });

//       // Collect text
//       const collectText = this.add.text(icon.x, icon.y - 30, `+${name}`, {
//         fontSize: '18px',
//         color: '#00ff00',
//         fontStyle: 'bold'
//       }).setOrigin(0.5);

//       this.tweens.add({
//         targets: collectText,
//         y: icon.y - 60,
//         alpha: 0,
//         duration: 1000,
//         onComplete: () => collectText.destroy()
//       });

//       this.callbacks?.onTechCollect?.(name);
//     });
//   }

//   createRewardStar() {
//     const deploy = PLATFORM_TECH.find(t => t.name === 'Deployment');
//     const x = deploy.x, yPlatform = deploy.yPlatform;

//     this.rewardStar = this.physics.add.sprite(x, yPlatform - 70, 'star-gold');
//     this.rewardStar.setBounceY(0.4).setScale(1.2);
    
//     // Spin animation
//     this.tweens.add({
//       targets: this.rewardStar,
//       angle: 360,
//       duration: 2000,
//       repeat: -1,
//       ease: 'Linear'
//     });

//     // Star glow
//     const starGlow = this.add.ellipse(x, yPlatform - 70, 60, 60, 0xffd700, 0.5).setDepth(-1);
//     this.tweens.add({
//       targets: starGlow,
//       scaleX: 1.5,
//       scaleY: 1.5,
//       alpha: 0.2,
//       duration: 1000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     this.physics.add.collider(this.rewardStar, this.platforms);
    
//     // Collect star
//     this.physics.add.overlap(this.player, this.rewardStar, () => {
//       this.rewardStar.disableBody(true, true);
//       starGlow.destroy();
      
//       const victoryText = this.add.text(640, 200, '🚀 Satellite Puzzle Complete!', {
//         fontSize: '32px',
//         color: '#ffd700',
//         fontStyle: 'bold',
//         stroke: '#000000',
//         strokeThickness: 6
//       }).setOrigin(0.5).setScrollFactor(0);

//       this.tweens.add({
//         targets: victoryText,
//         scale: 1.2,
//         duration: 500,
//         yoyo: true,
//         repeat: 2,
//         onComplete: () => victoryText.destroy()
//       });
//     });
//   }

//   createLevel3Door() {
//     const doorX = 2700, doorY = 580;

//     // Door background
//     const doorBg = this.add.graphics();
//     doorBg.fillStyle(0xec4899, 0.3);
//     doorBg.fillRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);
//     doorBg.lineStyle(4, 0xec4899, 1);
//     doorBg.strokeRoundedRect(doorX - 60, doorY - 100, 120, 160, 12);

//     // Door
//     this.level3Door = this.physics.add.staticImage(doorX, doorY - 20, 'door-large');
//     this.level3Door.setScale(1.3).setInteractive();

//     // Door glow
//     const doorGlow = this.add.ellipse(doorX, doorY - 20, 120, 160, 0xec4899, 0.3).setDepth(-1);
//     this.tweens.add({
//       targets: doorGlow,
//       alpha: 0.6,
//       duration: 1500,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Door label
//     this.add.text(doorX, doorY - 120, 'Level 3 →', {
//       fontSize: '18px',
//       color: '#ec4899',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 10, y: 5 }
//     }).setOrigin(0.5);

//     // 👆 MOUSE HOVER LEVEL3 DOOR
//     this.level3Door.on('pointerover', () => {
//       this.scene.start('Level3Scene');
//     });

//     // Player overlap (backup)
//     this.physics.add.overlap(this.player, this.level3Door, () => {
//       this.currentInteractTarget = { type: 'level3Door' };
//     });
//   }

//   createGroundVisuals() {
//     this.add.rectangle(1450, 690, 2900, 60, 0x1a1a3e, 1).setDepth(-2);
//     this.add.rectangle(1450, 720, 2900, 60, 0x0a0a1e, 1).setDepth(-3);
//   }

//   createInstructions() {
//     const controlsBg = this.add.graphics();
//     controlsBg.fillStyle(0x000000, 0.8);
//     controlsBg.fillRoundedRect(340, 670, 600, 35, 8);
//     controlsBg.setScrollFactor(0);

//     this.add.text(640, 687, '👆 HOVER = Auto Modal | ←→ Buttons Move | WASD Play', {
//       fontSize: '15px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5).setScrollFactor(0);
//   }

//   update() {
//     // Update player (handles WASD movement)
//     if (this.player?.update) {
//       this.player.update();
//     }

//     // E key interaction (backup)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       if (this.currentInteractTarget.type === 'satelliteProject') {
//         const project = projects.find(p => p.id === 2);
//         if (project && this.callbacks?.openProjectModal) {
//           this.callbacks.openProjectModal(project);
//         }
//       }
//       if (this.currentInteractTarget.type === 'level3Door') {
//         this.scene.start('Level3Scene');
//       }
//       this.currentInteractTarget = null;
//     }
//   }
// }








