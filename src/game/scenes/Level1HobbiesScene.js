// // src/game/scenes/Level1HobbiesScene.js
// import Phaser from 'phaser';
// import hobbiesData from '../../data/hobbies.json';

// export default class Level1HobbiesScene extends Phaser.Scene {
//   constructor() {
//     super('Level1HobbiesScene');
//   }

//   create() {
//     // 1) FULLSCREEN BACKGROUND (bg)
//     const bg = this.add.image(640, 360, 'bg');
//     bg.setDisplaySize(1280, 720);
//     bg.setScrollFactor(0);
//     bg.setDepth(-10);

//     // Slight dark overlay for contrast
//     const overlay = this.add.graphics();
//     overlay.fillStyle(0x000000, 0.35);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     // 2) PLAYER + PHYSICS
//     this.platforms = this.physics.add.staticGroup();
//     const ground = this.platforms.create(640, 710, 'ground-tile');
//     ground.setScale(20, 1).refreshBody().setAlpha(0);

//     this.player = this.physics.add.sprite(150, 620, 'krishna-idle', 0);
//     this.player.setCollideWorldBounds(true);
//     this.physics.add.collider(this.player, this.platforms);

//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentTarget = null;

//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 3) CENTRAL GAMING CONTROLLER (SMALL)
//     this.createCentralController();

//     // 4) CIRCULAR HOBBY TILES
//     this.createHobbyPlatformsAndCards();

//     // 5) EXIT DOOR
//     this.createExitDoor();

//     // 6) TITLE BOX (top-left)
//     this.createTitle();

//     // 7) CONTROLS BAR
//     this.createInstructions();
//   }


// createCentralController() {
//   const centerX = 640;
//   const centerY = 360; // middle of screen

//   // Glow
//   const aura = this.add.ellipse(centerX, centerY, 220, 220, 0xff6b9d, 0.18);
//   this.tweens.add({
//     targets: aura,
//     scaleX: 1.2,
//     scaleY: 1.2,
//     alpha: 0.3,
//     duration: 2000,
//     yoyo: true,
//     repeat: -1,
//     ease: 'Sine.easeInOut'
//   });

//   // Middle figure (controller)
//   const controller = this.add.image(centerX, centerY, 'gaming-setup');
//   controller.setScale(1.0);        // 96x96 already, so small
//   controller.setDepth(3);

//   this.tweens.add({
//     targets: controller,
//     scale: 1.1,
//     duration: 2000,
//     yoyo: true,
//     repeat: -1,
//     ease: 'Sine.easeInOut'
//   });

//   // ✅ "My Hobbies" VERTICALLY BELOW controller
//   const titleY = centerY + 80;     // 80px below the controller

//   this.add.text(centerX, titleY, 'My Hobbies', {
//     fontSize: '28px',
//     color: '#ff6b9d',
//     fontStyle: 'bold',
//     stroke: '#000000',
//     strokeThickness: 5
//   }).setOrigin(0.5).setDepth(5);
// }





//   createHobbyPlatformsAndCards() {
//     const centerX = 640;
//     const centerY = 360;
//     const radius = 210;

//     // Positions around the controller (top, right, bottom, left)
//     const hobbiesLayout = [
//       {
//         angle: 90,
//         label: 'Manga Reading',
//         color: 0x22c1c3,
//         imageKey: 'hobby-manga'
//       },
//       {
//         angle: 0,
//         label: 'Anime Watching',
//         color: 0xf97373,
//         imageKey: 'hobby-anime'
//       },
//       {
//         angle: 270,
//         label: 'Coding',
//         color: 0x8b5cf6,
//         imageKey: 'hobby-laptop'
//       },
//       {
//         angle: 180,
//         label: 'Kabaddi',
//         color: 0xfacc15,
//         imageKey: 'hobby-gym'
//       }
//     ];

//     this.hobbyZones = this.physics.add.staticGroup();

//     hobbiesLayout.forEach(({ angle, label, color, imageKey }) => {
//       const rad = angle * Math.PI / 180;
//       const px = centerX + radius * Math.cos(rad);
//       const py = centerY - radius * Math.sin(rad);

//       // Platform under tile
//       const platform = this.platforms.create(px, py + 40, 'platform-basic');
//       platform.setScale(1.3, 0.5).refreshBody();
//       platform.setTint(color);

//       this.add.ellipse(px, py + 45, 120, 26, color, 0.35).setDepth(-1);

//       // Card
//       const cardWidth = 130;
//       const cardHeight = 150;

//       const cardBg = this.add.graphics();
//       cardBg.fillStyle(color, 0.25);
//       cardBg.fillRoundedRect(px - cardWidth / 2, py - cardHeight / 2, cardWidth, cardHeight, 12);
//       cardBg.lineStyle(3, color, 1);
//       cardBg.strokeRoundedRect(px - cardWidth / 2, py - cardHeight / 2, cardWidth, cardHeight, 12);
//       cardBg.setDepth(2);

//       const topBar = this.add.graphics();
//       topBar.fillStyle(color, 0.9);
//       topBar.fillRoundedRect(px - cardWidth / 2, py - cardHeight / 2, cardWidth, 40, {
//         tl: 12,
//         tr: 12,
//         bl: 0,
//         br: 0
//       });
//       topBar.setDepth(2);

//       const iconImg = this.add.image(px, py - 20, imageKey).setScale(0.55).setDepth(3);

//       const labelText = this.add.text(px, py + 30, label, {
//         fontSize: '14px',
//         color: '#ffffff',
//         fontStyle: 'bold',
//         align: 'center',
//         wordWrap: { width: cardWidth - 20 }
//       }).setOrigin(0.5).setDepth(3);

//       const hint = this.add.text(px, py + 60, 'Press E', {
//         fontSize: '12px',
//         color: '#22c55e',
//         backgroundColor: '#000000aa',
//         padding: { x: 6, y: 3 }
//       }).setOrigin(0.5).setDepth(3).setVisible(false);

//       // Interaction zone
//       const zone = this.add.zone(px, py, cardWidth, cardHeight);
//       this.physics.world.enable(zone);
//       zone.body.setAllowGravity(false);
//       zone.body.moves = false;
//       zone.setData('hobbyLabel', label);

//       this.hobbyZones.add(zone);

//       this.physics.add.overlap(this.player, zone, () => {
//         this.currentTarget = { kind: 'hobby', label };
//         hint.setVisible(true);
//       });

//       // Hide hint when far
//       this.events.on('update', () => {
//         if (!this.player) return;
//         const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, px, py);
//         if (dist > 110 && this.currentTarget && this.currentTarget.label === label) {
//           hint.setVisible(false);
//           this.currentTarget = null;
//         }
//       });

//       // Float animation
//       this.tweens.add({
//         targets: [cardBg, topBar, iconImg, labelText],
//         y: '-=8',
//         duration: 2000 + Math.random() * 400,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createExitDoor() {
//     const exitX = 80;
//     const exitY = 620;

//     const frame = this.add.graphics();
//     frame.fillStyle(0xff4757, 0.3);
//     frame.fillRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);
//     frame.lineStyle(3, 0xff4757, 1);
//     frame.strokeRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);

//     this.exitDoor = this.physics.add.staticImage(exitX, exitY, 'door-hobbies');
//     this.exitDoor.setScale(0.8);

//     this.add.text(exitX, exitY + 60, '← Exit (E)', {
//       fontSize: '14px',
//       color: '#ff4757',
//       fontStyle: 'bold',
//       backgroundColor: '#000000aa',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5);

//     this.physics.add.overlap(this.player, this.exitDoor, () => {
//       this.currentTarget = { kind: 'exit' };
//     });
//   }

//   createTitle() {
//     const box = this.add.graphics();
//     box.fillStyle(0x1a1a2e, 0.9);
//     box.fillRoundedRect(30, 30, 400, 90, 12);
//     box.lineStyle(3, 0xff6b9d, 1);
//     box.strokeRoundedRect(30, 30, 400, 90, 12);
//     box.setScrollFactor(0);

//     this.add.text(50, 50, '🎮 Hobbies Room', {
//       fontSize: '26px',
//       color: '#ff6b9d',
//       fontStyle: 'bold'
//     }).setScrollFactor(0);

//     this.add.text(50, 85, 'Explore my interests!', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0);
//   }

//   createInstructions() {
//     const bar = this.add.graphics();
//     bar.fillStyle(0x000000, 0.85);
//     bar.fillRoundedRect(390, 670, 500, 35, 8);
//     bar.setScrollFactor(0);

//     this.add.text(640, 687, '← → Move  |  ↑ Jump  |  E Explore Hobby', {
//       fontSize: '16px',
//       color: '#ffffff',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 2
//     }).setOrigin(0.5).setScrollFactor(0);
//   }

//   showHobbyPopup(label) {
//     const hobby = hobbiesData.find(h => h.name === label);
//     if (this.callbacks && this.callbacks.openHobbyModal && hobby) {
//       this.callbacks.openHobbyModal(hobby);
//     } else if (hobby) {
//       alert(`${hobby.name}\n\n${hobby.description}`);
//     }
//   }

//   update() {
//     // Movement
//     if (this.cursors.left.isDown) {
//       this.player.setVelocityX(-220);
//       this.player.setFlipX(true);
//     } else if (this.cursors.right.isDown) {
//       this.player.setVelocityX(220);
//       this.player.setFlipX(false);
//     } else {
//       this.player.setVelocityX(0);
//     }

//     // Jump
//     if (this.cursors.up.isDown && this.player.body.blocked.down) {
//       this.player.setVelocityY(-600);
//     }

//     // Interact
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentTarget) {
//       if (this.currentTarget.kind === 'hobby') {
//         this.showHobbyPopup(this.currentTarget.label);
//       } else if (this.currentTarget.kind === 'exit') {
//         this.scene.start('Level1Scene');
//       }
//       this.currentTarget = null;
//     }
//   }
// }















































// // src/game/scenes/Level1HobbiesScene.js
// import Phaser from 'phaser';
// import hobbiesData from '../../data/hobbies.json';

// export default class Level1HobbiesScene extends Phaser.Scene {
//   constructor() {
//     super('Level1HobbiesScene');
//   }

//   create() {
//     // 1) FULLSCREEN BACKGROUND (bg)
//     const bg = this.add.image(640, 360, 'bg');
//     bg.setDisplaySize(1280, 720);
//     bg.setScrollFactor(0);
//     bg.setDepth(-10);

//     // Slight dark overlay for contrast
//     const overlay = this.add.graphics();
//     overlay.fillStyle(0x000000, 0.35);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     // 2) PLAYER + PHYSICS
//     this.platforms = this.physics.add.staticGroup();
//     const ground = this.platforms.create(640, 710, 'ground-tile');
//     ground.setScale(20, 1).refreshBody().setAlpha(0);

//     this.player = this.physics.add.sprite(150, 620, 'krishna-idle', 0);
//     this.player.setCollideWorldBounds(true);
//     this.physics.add.collider(this.player, this.platforms);

//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentTarget = null;

//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 3) CENTRAL GAMING CONTROLLER (SMALL)
//     this.createCentralController();

//     // 4) CIRCULAR HOBBY TILES
//     this.createHobbyPlatformsAndCards();

//     // 5) EXIT DOOR
//     this.createExitDoor();

//     // 6) TITLE BOX (top-left)
//     this.createTitle();

//     // 7) CONTROLS BAR
//     this.createInstructions();

//     // 🎮 8) MOUSE HOVER + FORWARD/BACK EVENT LISTENERS
//     this.setupMouseHoverListeners();
//     this.setupForwardBackListeners();
//   }

//   // 🎮 MOUSE HOVER AUTO-TRIGGER SETUP
//   setupMouseHoverListeners() {
//     this.game.registry.events.on('mouseHover', (target) => {
//       if (this.callbacks && target) {
//         this.handleInteraction(target);
//       }
//     });
//   }

//   // 🎮 FORWARD/BACK BUTTON LISTENERS
//   setupForwardBackListeners() {
//     this.game.registry.events.on('moveForward', () => {
//       this.player.setVelocityX(300);
//       setTimeout(() => {
//         if (this.player.body) {
//           this.player.setVelocityX(0);
//         }
//       }, 200);
//     });

//     this.game.registry.events.on('moveBackward', () => {
//       this.player.setVelocityX(-300);
//       setTimeout(() => {
//         if (this.player.body) {
//           this.player.setVelocityX(0);
//         }
//       }, 200);
//     });
//   }

//   // 🎮 HELPER: Add mouse hover to interactive element
//   addMouseHoverToElement(element, target) {
//     element.setInteractive();
    
//     element.on('pointerover', () => {
//       this.currentTarget = target;
//       this.game.registry.events.emit('mouseHover', target);
//     });

//     element.on('pointerout', () => {
//       this.currentTarget = null;
//     });
//   }

//   createCentralController() {
//     const centerX = 640;
//     const centerY = 360; // middle of screen

//     // Glow
//     const aura = this.add.ellipse(centerX, centerY, 220, 220, 0xff6b9d, 0.18);
//     this.tweens.add({
//       targets: aura,
//       scaleX: 1.2,
//       scaleY: 1.2,
//       alpha: 0.3,
//       duration: 2000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Middle figure (controller)
//     const controller = this.add.image(centerX, centerY, 'gaming-setup');
//     controller.setScale(1.0);        // 96x96 already, so small
//     controller.setDepth(3);

//     this.tweens.add({
//       targets: controller,
//       scale: 1.1,
//       duration: 2000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // ✅ "My Hobbies" VERTICALLY BELOW controller
//     const titleY = centerY + 80;     // 80px below the controller

//     this.add.text(centerX, titleY, 'My Hobbies', {
//       fontSize: '28px',
//       color: '#ff6b9d',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 5
//     }).setOrigin(0.5).setDepth(5);
//   }

//   createHobbyPlatformsAndCards() {
//     const centerX = 640;
//     const centerY = 360;
//     const radius = 210;

//     // Positions around the controller (top, right, bottom, left)
//     const hobbiesLayout = [
//       {
//         angle: 90,
//         label: 'Manga Reading',
//         color: 0x22c1c3,
//         imageKey: 'hobby-manga'
//       },
//       {
//         angle: 0,
//         label: 'Anime Watching',
//         color: 0xf97373,
//         imageKey: 'hobby-anime'
//       },
//       {
//         angle: 270,
//         label: 'Coding',
//         color: 0x8b5cf6,
//         imageKey: 'hobby-laptop'
//       },
//       {
//         angle: 180,
//         label: 'Kabaddi',
//         color: 0xfacc15,
//         imageKey: 'hobby-gym'
//       }
//     ];

//     this.hobbyZones = this.physics.add.staticGroup();

//     hobbiesLayout.forEach(({ angle, label, color, imageKey }) => {
//       const rad = angle * Math.PI / 180;
//       const px = centerX + radius * Math.cos(rad);
//       const py = centerY - radius * Math.sin(rad);

//       // Platform under tile
//       const platform = this.platforms.create(px, py + 40, 'platform-basic');
//       platform.setScale(1.3, 0.5).refreshBody();
//       platform.setTint(color);

//       this.add.ellipse(px, py + 45, 120, 26, color, 0.35).setDepth(-1);

//       // Card
//       const cardWidth = 130;
//       const cardHeight = 150;

//       const cardBg = this.add.graphics();
//       cardBg.fillStyle(color, 0.25);
//       cardBg.fillRoundedRect(px - cardWidth / 2, py - cardHeight / 2, cardWidth, cardHeight, 12);
//       cardBg.lineStyle(3, color, 1);
//       cardBg.strokeRoundedRect(px - cardWidth / 2, py - cardHeight / 2, cardWidth, cardHeight, 12);
//       cardBg.setDepth(2);

//       const topBar = this.add.graphics();
//       topBar.fillStyle(color, 0.9);
//       topBar.fillRoundedRect(px - cardWidth / 2, py - cardHeight / 2, cardWidth, 40, {
//         tl: 12,
//         tr: 12,
//         bl: 0,
//         br: 0
//       });
//       topBar.setDepth(2);

//       const iconImg = this.add.image(px, py - 20, imageKey).setScale(0.55).setDepth(3);

//       const labelText = this.add.text(px, py + 30, label, {
//         fontSize: '14px',
//         color: '#ffffff',
//         fontStyle: 'bold',
//         align: 'center',
//         wordWrap: { width: cardWidth - 20 }
//       }).setOrigin(0.5).setDepth(3);

//       const hint = this.add.text(px, py + 60, 'Press E', {
//         fontSize: '12px',
//         color: '#22c55e',
//         backgroundColor: '#000000aa',
//         padding: { x: 6, y: 3 }
//       }).setOrigin(0.5).setDepth(3).setVisible(false);

//       // Interaction zone
//       const zone = this.add.zone(px, py, cardWidth, cardHeight);
//       this.physics.world.enable(zone);
//       zone.body.setAllowGravity(false);
//       zone.body.moves = false;
//       zone.setData('hobbyLabel', label);

//       this.hobbyZones.add(zone);

//       const target = { kind: 'hobby', label };

//       this.physics.add.overlap(this.player, zone, () => {
//         this.currentTarget = target;
//         hint.setVisible(true);
//       });

//       // 🎮 Add mouse hover to zone
//       this.addMouseHoverToElement(zone, target);

//       // Hide hint when far
//       this.events.on('update', () => {
//         if (!this.player) return;
//         const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, px, py);
//         if (dist > 110 && this.currentTarget && this.currentTarget.label === label) {
//           hint.setVisible(false);
//           this.currentTarget = null;
//         }
//       });

//       // Float animation
//       this.tweens.add({
//         targets: [cardBg, topBar, iconImg, labelText],
//         y: '-=8',
//         duration: 2000 + Math.random() * 400,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createExitDoor() {
//     const exitX = 80;
//     const exitY = 620;

//     const frame = this.add.graphics();
//     frame.fillStyle(0xff4757, 0.3);
//     frame.fillRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);
//     frame.lineStyle(3, 0xff4757, 1);
//     frame.strokeRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);

//     this.exitDoor = this.physics.add.staticImage(exitX, exitY, 'door-hobbies');
//     this.exitDoor.setScale(0.8);

//     this.add.text(exitX, exitY + 60, '← Exit (E)', {
//       fontSize: '14px',
//       color: '#ff4757',
//       fontStyle: 'bold',
//       backgroundColor: '#000000aa',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5);

//     const target = { kind: 'exit' };

//     this.physics.add.overlap(this.player, this.exitDoor, () => {
//       this.currentTarget = target;
//     });

//     // 🎮 Add mouse hover to exit door
//     this.addMouseHoverToElement(this.exitDoor, target);
//   }

//   createTitle() {
//     const box = this.add.graphics();
//     box.fillStyle(0x1a1a2e, 0.9);
//     box.fillRoundedRect(30, 30, 400, 90, 12);
//     box.lineStyle(3, 0xff6b9d, 1);
//     box.strokeRoundedRect(30, 30, 400, 90, 12);
//     box.setScrollFactor(0);

//     this.add.text(50, 50, '🎮 Hobbies Room', {
//       fontSize: '26px',
//       color: '#ff6b9d',
//       fontStyle: 'bold'
//     }).setScrollFactor(0);

//     this.add.text(50, 85, 'Explore my interests!', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0);
//   }

//   createInstructions() {
//     const bar = this.add.graphics();
//     bar.fillStyle(0x000000, 0.85);
//     bar.fillRoundedRect(390, 670, 500, 35, 8);
//     bar.setScrollFactor(0);

//     this.add.text(640, 687, '← → Move  |  ↑ Jump  |  E Explore Hobby  |  Hover = Auto Open', {
//       fontSize: '15px',
//       color: '#ffffff',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 2
//     }).setOrigin(0.5).setScrollFactor(0);
//   }

//   showHobbyPopup(label) {
//     const hobby = hobbiesData.find(h => h.name === label);
//     if (this.callbacks && this.callbacks.openHobbyModal && hobby) {
//       this.callbacks.openHobbyModal(hobby);
//     } else if (hobby) {
//       alert(`${hobby.name}\n\n${hobby.description}`);
//     }
//   }

//   // 🎮 UNIFIED INTERACTION HANDLER
//   handleInteraction(target) {
//     if (!target) return;

//     if (target.kind === 'hobby') {
//       this.showHobbyPopup(target.label);
//     } else if (target.kind === 'exit') {
//       this.scene.start('Level1Scene');
//     }

//     // Clear target after interaction
//     this.currentTarget = null;
//   }

//   update() {
//     // Movement
//     if (this.cursors.left.isDown) {
//       this.player.setVelocityX(-220);
//       this.player.setFlipX(true);
//     } else if (this.cursors.right.isDown) {
//       this.player.setVelocityX(220);
//       this.player.setFlipX(false);
//     } else {
//       this.player.setVelocityX(0);
//     }

//     // Jump
//     if (this.cursors.up.isDown && this.player.body.blocked.down) {
//       this.player.setVelocityY(-600);
//     }

//     // E KEY INTERACTION (still works!)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentTarget) {
//       this.handleInteraction(this.currentTarget);
//     }
//   }
// }
















// import Phaser from 'phaser';
// import hobbiesData from '../../data/hobbies.json';

// export default class Level1HobbiesScene extends Phaser.Scene {
//   constructor() {
//     super('Level1HobbiesScene');
//   }

//   create() {
//     const bg = this.add.image(640, 360, 'bg');
//     bg.setDisplaySize(1280, 720);
//     bg.setScrollFactor(0);
//     bg.setDepth(-10);

//     const overlay = this.add.graphics();
//     overlay.fillStyle(0x000000, 0.35);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     this.platforms = this.physics.add.staticGroup();
//     const ground = this.platforms.create(640, 710, 'ground-tile');
//     ground.setScale(20, 1).refreshBody().setAlpha(0);

//     this.player = this.physics.add.sprite(150, 620, 'krishna-idle', 0);
//     this.player.setCollideWorldBounds(true);
//     this.physics.add.collider(this.player, this.platforms);

//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 🎮 CAMERA + PLAYER DUAL MODE
//     this.game.registry.events.on('moveForward', () => {
//       this.cameras.main.scrollX += 100;
//       this.player.setVelocityX(300);
//       this.time.delayedCall(200, () => this.player.setVelocityX(0));
//     });

//     this.game.registry.events.on('moveBackward', () => {
//       this.cameras.main.scrollX -= 100;
//       this.player.setVelocityX(-300);
//       this.time.delayedCall(200, () => this.player.setVelocityX(0));
//     });

//     this.game.registry.events.on('moveLeft', () => {
//       this.player.setVelocityX(-220);
//       this.player.setFlipX(true);
//       this.time.delayedCall(150, () => this.player.setVelocityX(0));
//     });

//     this.game.registry.events.on('moveRight', () => {
//       this.player.setVelocityX(220);
//       this.player.setFlipX(false);
//       this.time.delayedCall(150, () => this.player.setVelocityX(0));
//     });

//     this.game.registry.events.on('jump', () => {
//       if (this.player.body.blocked.down) this.player.setVelocityY(-600);
//     });

//     this.createCentralController();
//     this.createHobbyCards();
//     this.createExitDoor();
//     this.createTitle();
//     this.createInstructions();
//   }

//   createCentralController() {
//     const centerX = 640, centerY = 360;
//     const aura = this.add.ellipse(centerX, centerY, 220, 220, 0xff6b9d, 0.18);
//     this.tweens.add({ targets: aura, scaleX: 1.2, scaleY: 1.2, alpha: 0.3, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

//     const controller = this.add.image(centerX, centerY, 'gaming-setup').setScale(1.0).setDepth(3);
//     this.tweens.add({ targets: controller, scale: 1.1, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

//     this.add.text(centerX, centerY + 80, 'My Hobbies', { fontSize: '28px', color: '#ff6b9d', fontStyle: 'bold', stroke: '#000000', strokeThickness: 5 }).setOrigin(0.5).setDepth(5);
//   }

//   createHobbyCards() {
//     const centerX = 640, centerY = 360, radius = 210;
//     const hobbies = [
//       { angle: 90, label: 'Manga Reading', color: 0x22c1c3, imageKey: 'hobby-manga' },
//       { angle: 0, label: 'Anime Watching', color: 0xf97373, imageKey: 'hobby-anime' },
//       { angle: 270, label: 'Coding', color: 0x8b5cf6, imageKey: 'hobby-laptop' },
//       { angle: 180, label: 'Kabaddi', color: 0xfacc15, imageKey: 'hobby-gym' }
//     ];

//     hobbies.forEach(({ angle, label, color, imageKey }) => {
//       const rad = angle * Math.PI / 180;
//       const px = centerX + radius * Math.cos(rad);
//       const py = centerY - radius * Math.sin(rad);

//       const platform = this.platforms.create(px, py + 40, 'platform-basic');
//       platform.setScale(1.3, 0.5).refreshBody().setTint(color);
//       this.add.ellipse(px, py + 45, 120, 26, color, 0.35).setDepth(-1);

//       const cardWidth = 130, cardHeight = 150;
//       const cardBg = this.add.graphics();
//       cardBg.fillStyle(color, 0.25);
//       cardBg.fillRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, cardHeight, 12);
//       cardBg.lineStyle(3, color, 1);
//       cardBg.strokeRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, cardHeight, 12);
//       cardBg.setDepth(2);

//       const topBar = this.add.graphics();
//       topBar.fillStyle(color, 0.9);
//       topBar.fillRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, 40, { tl: 12, tr: 12, bl: 0, br: 0 });
//       topBar.setDepth(2);

//       const iconImg = this.add.image(px, py - 20, imageKey).setScale(0.55).setDepth(3);
//       const labelText = this.add.text(px, py + 30, label, { fontSize: '14px', color: '#ffffff', fontStyle: 'bold', align: 'center', wordWrap: { width: cardWidth - 20 } }).setOrigin(0.5).setDepth(3);
//       const hint = this.add.text(px, py + 60, '👆 Hover', { fontSize: '12px', color: '#22c55e', backgroundColor: '#000000aa', padding: { x: 6, y: 3 } }).setOrigin(0.5).setDepth(3);

//       const zone = this.add.zone(px, py, cardWidth, cardHeight).setInteractive();
//       this.physics.world.enable(zone);
//       zone.body.setAllowGravity(false);
//       zone.body.moves = false;

//       // 👆 MOUSE HOVER AUTO-TRIGGER
//       zone.on('pointerover', () => {
//         this.currentTarget = { kind: 'hobby', label };
//         hint.setText('Opening...');
//         this.showHobbyPopup(label);
//       });
//       zone.on('pointerout', () => {
//         this.currentTarget = null;
//         hint.setText('👆 Hover');
//       });

//       this.physics.add.overlap(this.player, zone, () => {
//         this.currentTarget = { kind: 'hobby', label };
//       });

//       this.tweens.add({ targets: [cardBg, topBar, iconImg, labelText], y: '-=8', duration: 2000 + Math.random() * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
//     });
//   }

//   createExitDoor() {
//     const exitX = 80, exitY = 620;
//     const frame = this.add.graphics();
//     frame.fillStyle(0xff4757, 0.3);
//     frame.fillRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);
//     frame.lineStyle(3, 0xff4757, 1);
//     frame.strokeRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);

//     this.exitDoor = this.physics.add.staticImage(exitX, exitY, 'door-hobbies').setScale(0.8).setInteractive();
//     this.add.text(exitX, exitY + 60, '← Exit', { fontSize: '14px', color: '#ff4757', fontStyle: 'bold', backgroundColor: '#000000aa', padding: { x: 8, y: 4 } }).setOrigin(0.5);

//     // 👆 MOUSE HOVER EXIT
//     this.exitDoor.on('pointerover', () => this.scene.start('Level1Scene'));
//     this.physics.add.overlap(this.player, this.exitDoor, () => { this.currentTarget = { kind: 'exit' }; });
//   }

//   createTitle() {
//     const box = this.add.graphics();
//     box.fillStyle(0x1a1a2e, 0.9);
//     box.fillRoundedRect(30, 30, 400, 90, 12);
//     box.lineStyle(3, 0xff6b9d, 1);
//     box.strokeRoundedRect(30, 30, 400, 90, 12);
//     box.setScrollFactor(0);

//     this.add.text(50, 50, '🎮 Hobbies Room', { fontSize: '26px', color: '#ff6b9d', fontStyle: 'bold' }).setScrollFactor(0);
//     this.add.text(50, 85, '👆 Hover cards = Auto open!', { fontSize: '14px', color: '#cccccc', fontStyle: 'italic' }).setScrollFactor(0);
//   }

//   createInstructions() {
//     const bar = this.add.graphics();
//     bar.fillStyle(0x000000, 0.85);
//     bar.fillRoundedRect(390, 670, 500, 35, 8);
//     bar.setScrollFactor(0);
//     this.add.text(640, 687, '👆 HOVER = Auto Modal | ←→ Camera+Player | WASD Play', { fontSize: '15px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
//   }

//   showHobbyPopup(label) {
//     const hobby = hobbiesData.find(h => h.name === label);
//     if (this.callbacks && this.callbacks.openHobbyModal && hobby) {
//       this.callbacks.openHobbyModal(hobby);
//     } else if (hobby) {
//       alert(`${hobby.name}\n\n${hobby.description}`);
//     }
//   }

//   update() {
//     if (this.cursors.left.isDown) { this.player.setVelocityX(-220); this.player.setFlipX(true); }
//     else if (this.cursors.right.isDown) { this.player.setVelocityX(220); this.player.setFlipX(false); }
//     else { this.player.setVelocityX(0); }

//     if (this.cursors.up.isDown && this.player.body.blocked.down) { this.player.setVelocityY(-600); }

//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentTarget) {
//       if (this.currentTarget.kind === 'hobby') this.showHobbyPopup(this.currentTarget.label);
//       else if (this.currentTarget.kind === 'exit') this.scene.start('Level1Scene');
//       this.currentTarget = null;
//     }
//   }
// }

















// import Phaser from 'phaser';
// import hobbiesData from '../../data/hobbies.json';

// export default class Level1HobbiesScene extends Phaser.Scene {
//   constructor() {
//     super('Level1HobbiesScene');
//   }

//   create() {
//     // Background
//     const bg = this.add.image(640, 360, 'bg');
//     bg.setDisplaySize(1280, 720).setScrollFactor(0).setDepth(-10);

//     const overlay = this.add.graphics();
//     overlay.fillStyle(0x000000, 0.35);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     // Platforms
//     this.platforms = this.physics.add.staticGroup();
//     this.platforms.create(640, 710, 'ground-tile').setScale(20, 1).refreshBody().setAlpha(0);

//     // Player
//     this.player = this.physics.add.sprite(150, 620, 'krishna-idle', 0);
//     this.player.setCollideWorldBounds(true);
//     this.physics.add.collider(this.player, this.platforms);

//     // Input
//     this.cursors = this.input.keyboard.createCursorKeys();
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentTarget = null;
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 🎮 BUTTON EVENTS - FIXED (No snap back + cleanup)
//     this.registerButtonEvents();

//     // Content
//     this.createCentralController();
//     this.createHobbyCards();
//     this.createExitDoor();
//     this.createTitle();
//     this.createInstructions();

//     // 🧹 Cleanup on scene change
//     this.events.on('shutdown', this.cleanup, this);
//   }

//   // 🎮 FIXED BUTTON EVENTS (Player moves → Camera follows naturally)
//   registerButtonEvents() {
//     const events = this.game.registry.events;

//     // ✅ Remove old listeners (prevents duplicates)
//     events.off('moveForward');
//     events.off('moveBackward');
//     events.off('moveLeft');
//     events.off('moveRight');
//     events.off('jump');

//     // ←→ FORWARD/BACKWARD (Player moves → camera follows automatically!)
//     events.on('moveForward', () => {
//       if (!this.player?.body) return;
//       this.player.setVelocityX(400);
//       this.player.setFlipX(false);
//       this.time.delayedCall(300, () => {
//         if (this.player?.body) this.player.setVelocityX(0);
//       });
//     });

//     events.on('moveBackward', () => {
//       if (!this.player?.body) return;
//       this.player.setVelocityX(-400);
//       this.player.setFlipX(true);
//       this.time.delayedCall(300, () => {
//         if (this.player?.body) this.player.setVelocityX(0);
//       });
//     });

//     // 📱 MOBILE A/D/JUMP
//     events.on('moveLeft', () => {
//       if (!this.player?.body) return;
//       this.player.setVelocityX(-250);
//       this.player.setFlipX(true);
//       this.time.delayedCall(150, () => {
//         if (this.player?.body) this.player.setVelocityX(0);
//       });
//     });

//     events.on('moveRight', () => {
//       if (!this.player?.body) return;
//       this.player.setVelocityX(250);
//       this.player.setFlipX(false);
//       this.time.delayedCall(150, () => {
//         if (this.player?.body) this.player.setVelocityX(0);
//       });
//     });

//     events.on('jump', () => {
//       if (this.player?.body?.blocked?.down) {
//         this.player.setVelocityY(-600);
//       }
//     });
//   }

//   // 🧹 CLEANUP (prevents duplicate listeners)
//   cleanup() {
//     const events = this.game.registry.events;
//     events.off('moveForward');
//     events.off('moveBackward');
//     events.off('moveLeft');
//     events.off('moveRight');
//     events.off('jump');
//   }

//   createCentralController() {
//     const centerX = 640, centerY = 360;
    
//     // Aura glow
//     const aura = this.add.ellipse(centerX, centerY, 220, 220, 0xff6b9d, 0.18);
//     this.tweens.add({
//       targets: aura,
//       scaleX: 1.2,
//       scaleY: 1.2,
//       alpha: 0.3,
//       duration: 2000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Gaming controller
//     const controller = this.add.image(centerX, centerY, 'gaming-setup');
//     controller.setScale(1.0).setDepth(3);
//     this.tweens.add({
//       targets: controller,
//       scale: 1.1,
//       duration: 2000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Title
//     this.add.text(centerX, centerY + 80, 'My Hobbies', {
//       fontSize: '28px',
//       color: '#ff6b9d',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 5
//     }).setOrigin(0.5).setDepth(5);
//   }

//   createHobbyCards() {
//     const centerX = 640, centerY = 360, radius = 210;
//     const hobbies = [
//       { angle: 90, label: 'Manga Reading', color: 0x22c1c3, imageKey: 'hobby-manga' },
//       { angle: 0, label: 'Anime Watching', color: 0xf97373, imageKey: 'hobby-anime' },
//       { angle: 270, label: 'Coding', color: 0x8b5cf6, imageKey: 'hobby-laptop' },
//       { angle: 180, label: 'Kabaddi', color: 0xfacc15, imageKey: 'hobby-gym' }
//     ];

//     hobbies.forEach(({ angle, label, color, imageKey }) => {
//       const rad = angle * Math.PI / 180;
//       const px = centerX + radius * Math.cos(rad);
//       const py = centerY - radius * Math.sin(rad);

//       // Platform
//       const platform = this.platforms.create(px, py + 40, 'platform-basic');
//       platform.setScale(1.3, 0.5).refreshBody().setTint(color);

//       // Platform glow
//       this.add.ellipse(px, py + 45, 120, 26, color, 0.35).setDepth(-1);

//       // Card visuals
//       const cardWidth = 130, cardHeight = 150;
//       const cardBg = this.add.graphics();
//       cardBg.fillStyle(color, 0.25);
//       cardBg.fillRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, cardHeight, 12);
//       cardBg.lineStyle(3, color, 1);
//       cardBg.strokeRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, cardHeight, 12);
//       cardBg.setDepth(2);

//       const topBar = this.add.graphics();
//       topBar.fillStyle(color, 0.9);
//       topBar.fillRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, 40, { tl: 12, tr: 12, bl: 0, br: 0 });
//       topBar.setDepth(2);

//       const iconImg = this.add.image(px, py - 20, imageKey).setScale(0.55).setDepth(3);
//       const labelText = this.add.text(px, py + 30, label, {
//         fontSize: '14px',
//         color: '#ffffff',
//         fontStyle: 'bold'
//       }).setOrigin(0.5).setDepth(3);

//       // Hover hint
//       const hint = this.add.text(px, py + 60, '👆 Hover', {
//         fontSize: '12px',
//         color: '#22c55e',
//         backgroundColor: '#000000aa',
//         padding: { x: 6, y: 3 }
//       }).setOrigin(0.5).setDepth(3);

//       // Interactive zone
//       const zone = this.add.zone(px, py, cardWidth, cardHeight).setInteractive();
//       this.physics.world.enable(zone);
//       zone.body.setAllowGravity(false);
//       zone.body.moves = false;

//       // 👆 MOUSE HOVER AUTO-TRIGGER
//       zone.on('pointerover', () => {
//         hint.setText('Opening...');
//         this.showHobbyPopup(label);
//       });
//       zone.on('pointerout', () => {
//         hint.setText('👆 Hover');
//       });

//       // Player overlap (backup)
//       this.physics.add.overlap(this.player, zone, () => {
//         this.currentTarget = { kind: 'hobby', label };
//       });

//       // Float animation
//       this.tweens.add({
//         targets: [cardBg, topBar, iconImg, labelText],
//         y: '-=8',
//         duration: 2000 + Math.random() * 400,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createExitDoor() {
//     const exitX = 80, exitY = 620;
    
//     // Door frame
//     const frame = this.add.graphics();
//     frame.fillStyle(0xff4757, 0.3);
//     frame.fillRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);
//     frame.lineStyle(3, 0xff4757, 1);
//     frame.strokeRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);

//     // Door
//     this.exitDoor = this.physics.add.staticImage(exitX, exitY, 'door-hobbies');
//     this.exitDoor.setScale(0.8).setInteractive();

//     // Door label
//     this.add.text(exitX, exitY + 60, '← Exit', {
//       fontSize: '14px',
//       color: '#ff4757',
//       fontStyle: 'bold',
//       backgroundColor: '#000000aa',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5);

//     // 👆 HOVER EXIT DOOR
//     this.exitDoor.on('pointerover', () => {
//       this.scene.start('Level1Scene');
//     });

//     // Player overlap
//     this.physics.add.overlap(this.player, this.exitDoor, () => {
//       this.currentTarget = { kind: 'exit' };
//     });
//   }

//   createTitle() {
//     const box = this.add.graphics();
//     box.fillStyle(0x1a1a2e, 0.9);
//     box.fillRoundedRect(30, 30, 400, 90, 12);
//     box.lineStyle(3, 0xff6b9d, 1);
//     box.strokeRoundedRect(30, 30, 400, 90, 12);
//     box.setScrollFactor(0);

//     this.add.text(50, 50, '🎮 Hobbies Room', {
//       fontSize: '26px',
//       color: '#ff6b9d',
//       fontStyle: 'bold'
//     }).setScrollFactor(0);

//     this.add.text(50, 85, '👆 Hover cards = Auto open!', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0);
//   }

//   createInstructions() {
//     const bar = this.add.graphics();
//     bar.fillStyle(0x000000, 0.85);
//     bar.fillRoundedRect(390, 670, 500, 35, 8);
//     bar.setScrollFactor(0);

//     this.add.text(640, 687, '👆 HOVER = Auto Modal | ←→ Move Player | WASD Play', {
//       fontSize: '15px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5).setScrollFactor(0);
//   }

//   showHobbyPopup(label) {
//     const hobby = hobbiesData.find(h => h.name === label);
//     if (this.callbacks?.openHobbyModal && hobby) {
//       this.callbacks.openHobbyModal(hobby);
//     } else if (hobby) {
//       alert(`${hobby.name}\n\n${hobby.description}`);
//     }
//   }

//   update() {
//     // WASD Controls (backup)
//     if (this.cursors.left.isDown) {
//       this.player.setVelocityX(-220);
//       this.player.setFlipX(true);
//     } else if (this.cursors.right.isDown) {
//       this.player.setVelocityX(220);
//       this.player.setFlipX(false);
//     } else {
//       this.player.setVelocityX(0);
//     }

//     if (this.cursors.up.isDown && this.player.body.blocked.down) {
//       this.player.setVelocityY(-600);
//     }

//     // E Key (backup for keyboard users)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentTarget) {
//       if (this.currentTarget.kind === 'hobby') {
//         this.showHobbyPopup(this.currentTarget.label);
//       } else if (this.currentTarget.kind === 'exit') {
//         this.scene.start('Level1Scene');
//       }
//       this.currentTarget = null;
//     }
//   }
// }




import Phaser from 'phaser';
import hobbiesData from '../../data/hobbies.json';

export default class Level1HobbiesScene extends Phaser.Scene {
  constructor() {
    super('Level1HobbiesScene');
  }

  create() {
    // Background
    const bg = this.add.image(640, 360, 'bg');
    bg.setDisplaySize(1280, 720).setScrollFactor(0).setDepth(-10);

    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.35);
    overlay.fillRect(0, 0, 1280, 720);
    overlay.setDepth(-5);

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(640, 710, 'ground-tile').setScale(20, 1).refreshBody().setAlpha(0);

    // Player
    this.player = this.physics.add.sprite(150, 620, 'krishna-idle', 0);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // 🎮 MOVEMENT TRACKING (Prevents continuous movement bug)
    this.buttonMoving = false;

    // 🎮 REGISTER BUTTON EVENTS (With auto-stop)
    this.registerButtonEvents();

    // Content
    this.createCentralController();
    this.createHobbyCards();
    this.createExitDoor();
    this.createTitle();
    this.createInstructions();

    // 🧹 Cleanup
    this.events.on('shutdown', this.cleanup, this);
  }

  // 🎮 BUTTON EVENTS WITH AUTO-STOP
  registerButtonEvents() {
    const events = this.game.registry.events;

    // Remove old listeners
    events.off('moveForward');
    events.off('moveBackward');
    events.off('moveLeft');
    events.off('moveRight');
    events.off('jump');

    // ←→ FORWARD/BACKWARD (Auto-stop after 300ms)
    events.on('moveForward', () => {
      if (!this.player?.body) return;
      
      this.buttonMoving = true;
      this.player.setVelocityX(400);
      this.player.setFlipX(false);
      
      // Auto-stop after 300ms
      this.time.delayedCall(300, () => {
        if (this.player?.body && this.buttonMoving) {
          this.player.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    events.on('moveBackward', () => {
      if (!this.player?.body) return;
      
      this.buttonMoving = true;
      this.player.setVelocityX(-400);
      this.player.setFlipX(true);
      
      // Auto-stop after 300ms
      this.time.delayedCall(300, () => {
        if (this.player?.body && this.buttonMoving) {
          this.player.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    // 📱 MOBILE A/D (Short bursts)
    events.on('moveLeft', () => {
      if (!this.player?.body) return;
      
      this.buttonMoving = true;
      this.player.setVelocityX(-250);
      this.player.setFlipX(true);
      
      this.time.delayedCall(150, () => {
        if (this.player?.body && this.buttonMoving) {
          this.player.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    events.on('moveRight', () => {
      if (!this.player?.body) return;
      
      this.buttonMoving = true;
      this.player.setVelocityX(250);
      this.player.setFlipX(false);
      
      this.time.delayedCall(150, () => {
        if (this.player?.body && this.buttonMoving) {
          this.player.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    // 📱 JUMP
    events.on('jump', () => {
      if (this.player?.body?.blocked?.down) {
        this.player.setVelocityY(-600);
      }
    });
  }

  cleanup() {
    const events = this.game.registry.events;
    events.off('moveForward');
    events.off('moveBackward');
    events.off('moveLeft');
    events.off('moveRight');
    events.off('jump');
  }

  createCentralController() {
    const centerX = 640, centerY = 360;
    
    const aura = this.add.ellipse(centerX, centerY, 220, 220, 0xff6b9d, 0.18);
    this.tweens.add({ targets: aura, scaleX: 1.2, scaleY: 1.2, alpha: 0.3, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    const controller = this.add.image(centerX, centerY, 'gaming-setup').setScale(1.0).setDepth(3);
    this.tweens.add({ targets: controller, scale: 1.1, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

    this.add.text(centerX, centerY + 80, 'My Hobbies', {
      fontSize: '28px',
      color: '#ff6b9d',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(5);
  }

  createHobbyCards() {
    const centerX = 640, centerY = 360, radius = 210;
    const hobbies = [
      { angle: 90, label: 'Manga Reading', color: 0x22c1c3, imageKey: 'hobby-manga' },
      { angle: 0, label: 'Anime Watching', color: 0xf97373, imageKey: 'hobby-anime' },
      { angle: 270, label: 'Coding', color: 0x8b5cf6, imageKey: 'hobby-laptop' },
      { angle: 180, label: 'Kabaddi', color: 0xfacc15, imageKey: 'hobby-gym' }
    ];

    hobbies.forEach(({ angle, label, color, imageKey }) => {
      const rad = angle * Math.PI / 180;
      const px = centerX + radius * Math.cos(rad);
      const py = centerY - radius * Math.sin(rad);

      const platform = this.platforms.create(px, py + 40, 'platform-basic');
      platform.setScale(1.3, 0.5).refreshBody().setTint(color);
      this.add.ellipse(px, py + 45, 120, 26, color, 0.35).setDepth(-1);

      const cardWidth = 130, cardHeight = 150;
      const cardBg = this.add.graphics();
      cardBg.fillStyle(color, 0.25);
      cardBg.fillRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, cardHeight, 12);
      cardBg.lineStyle(3, color, 1);
      cardBg.strokeRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, cardHeight, 12);
      cardBg.setDepth(2);

      const topBar = this.add.graphics();
      topBar.fillStyle(color, 0.9);
      topBar.fillRoundedRect(px - cardWidth/2, py - cardHeight/2, cardWidth, 40, { tl: 12, tr: 12, bl: 0, br: 0 });
      topBar.setDepth(2);

      const iconImg = this.add.image(px, py - 20, imageKey).setScale(0.55).setDepth(3);
      const labelText = this.add.text(px, py + 30, label, { fontSize: '14px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5).setDepth(3);
      const hint = this.add.text(px, py + 60, '👆 Hover', { fontSize: '12px', color: '#22c55e', backgroundColor: '#000000aa', padding: { x: 6, y: 3 } }).setOrigin(0.5).setDepth(3);

      const zone = this.add.zone(px, py, cardWidth, cardHeight).setInteractive();
      this.physics.world.enable(zone);
      zone.body.setAllowGravity(false);
      zone.body.moves = false;

      zone.on('pointerover', () => {
        hint.setText('Opening...');
        this.showHobbyPopup(label);
      });
      zone.on('pointerout', () => {
        hint.setText('👆 Hover');
      });

      this.physics.add.overlap(this.player, zone, () => {
        this.currentTarget = { kind: 'hobby', label };
      });

      this.tweens.add({ targets: [cardBg, topBar, iconImg, labelText], y: '-=8', duration: 2000 + Math.random() * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
  }

  createExitDoor() {
    const exitX = 80, exitY = 620;
    
    const frame = this.add.graphics();
    frame.fillStyle(0xff4757, 0.3);
    frame.fillRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);
    frame.lineStyle(3, 0xff4757, 1);
    frame.strokeRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);

    this.exitDoor = this.physics.add.staticImage(exitX, exitY, 'door-hobbies').setScale(0.8).setInteractive();
    this.add.text(exitX, exitY + 60, '← Exit', { fontSize: '14px', color: '#ff4757', fontStyle: 'bold', backgroundColor: '#000000aa', padding: { x: 8, y: 4 } }).setOrigin(0.5);

    this.exitDoor.on('pointerover', () => this.scene.start('Level1Scene'));
    this.physics.add.overlap(this.player, this.exitDoor, () => { this.currentTarget = { kind: 'exit' }; });
  }

  createTitle() {
    const box = this.add.graphics();
    box.fillStyle(0x1a1a2e, 0.9);
    box.fillRoundedRect(30, 30, 400, 90, 12);
    box.lineStyle(3, 0xff6b9d, 1);
    box.strokeRoundedRect(30, 30, 400, 90, 12);
    box.setScrollFactor(0);

    this.add.text(50, 50, '🎮 Hobbies Room', { fontSize: '26px', color: '#ff6b9d', fontStyle: 'bold' }).setScrollFactor(0);
    this.add.text(50, 85, '👆 Hover cards = Auto open!', { fontSize: '14px', color: '#cccccc', fontStyle: 'italic' }).setScrollFactor(0);
  }

  createInstructions() {
    const bar = this.add.graphics();
    bar.fillStyle(0x000000, 0.85);
    bar.fillRoundedRect(390, 670, 500, 35, 8);
    bar.setScrollFactor(0);
    this.add.text(640, 687, '👆 HOVER = Auto Modal | ←→ Buttons Move | WASD Play', { fontSize: '15px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
  }

  showHobbyPopup(label) {
    const hobby = hobbiesData.find(h => h.name === label);
    if (this.callbacks?.openHobbyModal && hobby) {
      this.callbacks.openHobbyModal(hobby);
    }
  }

  update() {
    // ✅ KEYBOARD CONTROLS - Only when NOT button-moving
    if (!this.buttonMoving) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-220);
        this.player.setFlipX(true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(220);
        this.player.setFlipX(false);
      } else {
        // Stop immediately when no keys pressed
        this.player.setVelocityX(0);
      }
    }

    // Jump (always works)
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-600);
    }

    // E KEY INTERACTION
    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentTarget) {
      if (this.currentTarget.kind === 'hobby') {
        this.showHobbyPopup(this.currentTarget.label);
      } else if (this.currentTarget.kind === 'exit') {
        this.scene.start('Level1Scene');
      }
      this.currentTarget = null;
    }
  }
}
