// // src/game/scenes/Level1LibraryScene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import courseworkData from '../../data/coursework.json';

// export default class Level1LibraryScene extends Phaser.Scene {
//   constructor() {
//     super('Level1LibraryScene');
//   }

//   create() {
//     // ✨ LAYER 1: Beautiful classical library background (FIXED)
//     const libraryBg = this.add.image(640, 360, 'level1-library');
//     libraryBg.setDisplaySize(1280, 720); // ✅ Fill canvas
//     libraryBg.setScrollFactor(0);         // ✅ FIXED - doesn't scroll!
//     libraryBg.setAlpha(0.5);              // ✅ Semi-transparent
//     libraryBg.setDepth(-10);              // ✅ Behind everything

//     // ✨ LAYER 2: Dark overlay for readability
//     const overlay = this.add.graphics();
//     overlay.fillGradientStyle(0x0f0c29, 0x0f0c29, 0x302b63, 0x24243e, 0.7);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     // Atmospheric effects
//     this.createAtmosphere();

//     // 2) Platforms
//     this.createCircularPlatforms();

//     // 3) Player spawn
//     this.player = new Player(this, 150, 620);
//     this.physics.add.collider(this.player, this.platforms);

//     // 4) E key
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;

//     // 5) React callbacks
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 6) Create beautiful circular library
//     this.createCentralBookshelf();
//     this.createCircularItemsAroundCenter();
//     this.createExitDoor();

//     // 7) Beautiful title
//     this.createTitle();

//     // 8) Camera
//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 1280, 720);

//     // 9) BIG CLEAR Instructions
//     this.createInstructions();
//   }

//   createAtmosphere() {
//     // Floating book particles
//     for (let i = 0; i < 6; i++) {
//       const x = 100 + Math.random() * 1080;
//       const y = 50 + Math.random() * 200;
//       const particle = this.add.text(x, y, '📖', {
//         fontSize: '24px',
//         alpha: 0.3
//       });

//       this.tweens.add({
//         targets: particle,
//         y: y - 30,
//         alpha: 0.6,
//         duration: 3000 + Math.random() * 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }

//     // Mystical glow
//     const glowPositions = [
//       { x: 250, y: 150 },
//       { x: 1030, y: 150 },
//       { x: 640, y: 100 }
//     ];

//     glowPositions.forEach(pos => {
//       const glow = this.add.ellipse(pos.x, pos.y, 150, 150, 0xffd700, 0.1);
//       this.tweens.add({
//         targets: glow,
//         scaleX: 1.3,
//         scaleY: 1.3,
//         alpha: 0.2,
//         duration: 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createCircularPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     // Ground
//     const ground = this.platforms.create(640, 710, 'ground-tile');
//     ground.setScale(20, 1).refreshBody().setAlpha(0);

//     // Visual ground
//     const groundRect = this.add.rectangle(640, 690, 1280, 60, 0x1a1a2e, 1);
//     groundRect.setDepth(-1);

//     // ✅ 6 platforms (60° apart) - CENTER AT 640, 380
//     const centerX = 640, centerY = 380;
//     const radius = 220;

//     for (let i = 0; i < 6; i++) {
//       const angle = i * 60;
//       const rad = angle * Math.PI / 180;
//       const x = centerX + radius * Math.cos(rad);
//       const y = centerY - radius * Math.sin(rad);

//       // Platform shadow
//       this.add.ellipse(x, y + 40, 100, 20, 0x000000, 0.4).setDepth(-1);

//       // Platform
//       const platform = this.platforms.create(x, y + 30, 'platform-basic');
//       platform.setScale(1.2, 0.5).refreshBody();
//       platform.setTint(0xd4a373);

//       // Floating animation
//       this.tweens.add({
//         targets: platform,
//         y: y + 25,
//         duration: 2000 + (i * 250),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }
//   }

//   createCentralBookshelf() {
//     const centerX = 640, centerY = 380;

//     // Glowing aura
//     const aura = this.add.ellipse(centerX, centerY, 200, 200, 0xffd700, 0.15);
//     this.tweens.add({
//       targets: aura,
//       scaleX: 1.2,
//       scaleY: 1.2,
//       alpha: 0.25,
//       duration: 2000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Bookshelf
//     this.add.image(centerX, centerY, 'bookshelf').setScale(2).setDepth(0);

//     // Sparkles
//     for (let i = 0; i < 6; i++) {
//       const angle = i * 60;
//       const rad = angle * Math.PI / 180;
//       const px = centerX + 80 * Math.cos(rad);
//       const py = centerY - 80 * Math.sin(rad);

//       const sparkle = this.add.text(px, py, '✨', {
//         fontSize: '16px'
//       }).setOrigin(0.5);

//       this.tweens.add({
//         targets: sparkle,
//         angle: 360,
//         duration: 4000,
//         repeat: -1,
//         ease: 'Linear'
//       });
//     }

//     // Title
//     this.add.text(centerX, 240, '📚 Core Coursework', {
//       fontSize: '28px',
//       color: '#ffd700',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 5
//     }).setOrigin(0.5).setDepth(10);
//   }

//   createTitle() {
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a2e, 0.9);
//     titleBg.fillRoundedRect(20, 20, 350, 80, 12);
//     titleBg.lineStyle(3, 0xffd700, 1);
//     titleBg.strokeRoundedRect(20, 20, 350, 80, 12);
//     titleBg.setScrollFactor(0); // ✅ Fixed to camera

//     this.add.text(40, 35, '📖 Academic Library', {
//       fontSize: '24px',
//       color: '#ffd700',
//       fontStyle: 'bold'
//     }).setScrollFactor(0); // ✅ Fixed to camera

//     this.add.text(40, 65, 'Explore courses & certificates', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0); // ✅ Fixed to camera
//   }

//   createCircularItemsAroundCenter() {
//     const centerX = 640, centerY = 380;
//     const radius = 220;

//     const circularItems = [
//       { angle: 0, code: 'EE709', icon: '🔬', color: 0x3498db },
//       { angle: 60, code: 'EE782', icon: '🤖', color: 0xe74c3c },
//       { angle: 120, code: 'EE301', icon: '📡', color: 0x2ecc71 },
//       { angle: 180, code: 'CS419', icon: '🧠', color: 0xf39c12 },
//       { angle: 240, code: 'ONLINE-1', icon: '🎓', color: 0x9b59b6 },
//       { angle: 300, code: 'ONLINE-2', icon: '🌐', color: 0x1abc9c }
//     ];

//     this.courseItems = this.physics.add.staticGroup();

//     circularItems.forEach((item, index) => {
//       const rad = item.angle * Math.PI / 180;
//       const x = centerX + radius * Math.cos(rad);
//       const y = centerY - radius * Math.sin(rad);

//       const courseData = courseworkData.find(c => c.code === item.code);
//       if (!courseData) {
//         console.warn('Course not found:', item.code);
//         return;
//       }

//       this.createBeautifulCourseCard(x, y, courseData, item.icon, item.color);
//     });
//   }

//   createBeautifulCourseCard(x, y, course, icon, color) {
//     const isOnline = course.type === 'online';

//     // Card background
//     const cardBg = this.add.graphics();
//     cardBg.fillStyle(color, 0.3);
//     cardBg.fillRoundedRect(x - 50, y - 60, 100, 120, 10);
//     cardBg.lineStyle(3, color, 1);
//     cardBg.strokeRoundedRect(x - 50, y - 60, 100, 120, 10);
//     cardBg.setDepth(0);

//     // Top bar
//     const topBar = this.add.graphics();
//     topBar.fillStyle(color, 0.8);
//     topBar.fillRoundedRect(x - 50, y - 60, 100, 30, { tl: 10, tr: 10, bl: 0, br: 0 });
//     topBar.setDepth(0);

//     // Icon
//     const iconText = this.add.text(x, y - 35, icon, {
//       fontSize: '32px'
//     }).setOrigin(0.5).setDepth(2);

//     // Course code
//     this.add.text(x, y, course.code, {
//       fontSize: '13px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5).setDepth(2);

//     // Grade/Year
//     const gradeText = isOnline ? course.year : `Grade: ${course.grade}`;
//     const gradeColor = course.grade === 'AA' ? '#00ff00' : 
//                        course.grade === 'AB' ? '#00ccff' : '#ffffff';

//     this.add.text(x, y + 18, gradeText, {
//       fontSize: '10px',
//       color: isOnline ? '#ffffff' : gradeColor,
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 4, y: 2 }
//     }).setOrigin(0.5).setDepth(2);

//     // "Press E" hint
//     const hint = this.add.text(x, y + 48, 'Press E', {
//       fontSize: '10px',
//       color: '#00ff00',
//       backgroundColor: '#00000099',
//       padding: { x: 5, y: 2 }
//     }).setOrigin(0.5).setDepth(2).setVisible(false);

//     // Physics zone
//     const zone = this.add.zone(x, y, 100, 120);
//     this.physics.world.enable(zone);
//     zone.body.setAllowGravity(false);
//     zone.body.moves = false;
//     this.courseItems.add(zone);
//     zone.setData('course', course);

//     this.physics.add.overlap(this.player, zone, () => {
//       this.currentInteractTarget = { type: 'course', course: course };
//     }, null, this);

//     // Show hint
//     this.events.on('update', () => {
//       if (!this.player) return;
//       const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, x, y);
//       hint.setVisible(distance < 80);
//     });

//     // Floating animation
//     this.tweens.add({
//       targets: [cardBg, topBar, iconText],
//       y: '-=6',
//       duration: 2000 + (Math.random() * 500),
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });
//   }

//   createExitDoor() {
//     const exitBg = this.add.graphics();
//     exitBg.fillStyle(0xff6b6b, 0.3);
//     exitBg.fillRoundedRect(35, 570, 90, 110, 12);
//     exitBg.lineStyle(3, 0xff6b6b, 1);
//     exitBg.strokeRoundedRect(35, 570, 90, 110, 12);

//     this.exitDoor = this.physics.add.staticImage(80, 620, 'door-library');

//     this.add.text(80, 690, '🚪 Exit (E)', {
//       fontSize: '14px',
//       color: '#ff6b6b',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5);

//     this.physics.add.overlap(this.player, this.exitDoor, () => {
//       this.currentInteractTarget = { type: 'exit' };
//     }, null, this);
//   }

//   createInstructions() {
//     const controlsBg = this.add.graphics();
//     controlsBg.fillStyle(0x000000, 0.8);
//     controlsBg.fillRoundedRect(390, 675, 500, 35, 8);
//     controlsBg.setScrollFactor(0); // ✅ Fixed to camera

//     this.add.text(640, 692, '← → Move  |  ↑ Jump  |  E Read Book', {
//       fontSize: '18px',
//       color: '#ffffff',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 2
//     }).setOrigin(0.5).setScrollFactor(0); // ✅ Fixed to camera
//   }

//   handleInteraction(target) {
//     if (!target) return;

//     if (target.type === 'exit') {
//       this.scene.start('Level1Scene');
//       this.currentInteractTarget = null;
//       return;
//     }

//     if (target.type === 'course') {
//       console.log('📚 Opening course:', target.course);
      
//       if (this.callbacks && this.callbacks.openCourseworkModal) {
//         this.callbacks.openCourseworkModal(target.course);
//       } else {
//         alert(
//           `${target.course.code}: ${target.course.name}\n` +
//           `${target.course.semester || target.course.year}\n` +
//           `${target.course.grade ? 'Grade: ' + target.course.grade : ''}\n\n` +
//           `${target.course.description || 'Certificate course'}`
//         );
//       }
//     }

//     this.currentInteractTarget = null;
//   }

//   update() {
//     if (this.player && this.player.update) {
//       this.player.update();
//     }

//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }
//   }
// }



















// // src/game/scenes/Level1LibraryScene.js
// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import courseworkData from '../../data/coursework.json';

// export default class Level1LibraryScene extends Phaser.Scene {
//   constructor() {
//     super('Level1LibraryScene');
//   }

//   create() {
//     // ✨ LAYER 1: Beautiful classical library background (FIXED)
//     const libraryBg = this.add.image(640, 360, 'level1-library');
//     libraryBg.setDisplaySize(1280, 720); // ✅ Fill canvas
//     libraryBg.setScrollFactor(0);         // ✅ FIXED - doesn't scroll!
//     libraryBg.setAlpha(0.5);              // ✅ Semi-transparent
//     libraryBg.setDepth(-10);              // ✅ Behind everything

//     // ✨ LAYER 2: Dark overlay for readability
//     const overlay = this.add.graphics();
//     overlay.fillGradientStyle(0x0f0c29, 0x0f0c29, 0x302b63, 0x24243e, 0.7);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     // Atmospheric effects
//     this.createAtmosphere();

//     // 2) Platforms
//     this.createCircularPlatforms();

//     // 3) Player spawn
//     this.player = new Player(this, 150, 620);
//     this.physics.add.collider(this.player, this.platforms);

//     // 4) E key
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;

//     // 5) React callbacks
//     this.callbacks = this.game.registry.get('reactCallbacks') || null;

//     // 6) Create beautiful circular library
//     this.createCentralBookshelf();
//     this.createCircularItemsAroundCenter();
//     this.createExitDoor();

//     // 7) Beautiful title
//     this.createTitle();

//     // 8) Camera
//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 1280, 720);

//     // 9) BIG CLEAR Instructions
//     this.createInstructions();

//     // 🎮 10) MOUSE HOVER + FORWARD/BACK EVENT LISTENERS
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
//       if (this.player && this.player.sprite && this.player.sprite.body) {
//         this.player.sprite.setVelocityX(300);
//         setTimeout(() => {
//           if (this.player.sprite.body) {
//             this.player.sprite.setVelocityX(0);
//           }
//         }, 200);
//       }
//     });

//     this.game.registry.events.on('moveBackward', () => {
//       if (this.player && this.player.sprite && this.player.sprite.body) {
//         this.player.sprite.setVelocityX(-300);
//         setTimeout(() => {
//           if (this.player.sprite.body) {
//             this.player.sprite.setVelocityX(0);
//           }
//         }, 200);
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

//   createAtmosphere() {
//     // Floating book particles
//     for (let i = 0; i < 6; i++) {
//       const x = 100 + Math.random() * 1080;
//       const y = 50 + Math.random() * 200;
//       const particle = this.add.text(x, y, '📖', {
//         fontSize: '24px',
//         alpha: 0.3
//       });

//       this.tweens.add({
//         targets: particle,
//         y: y - 30,
//         alpha: 0.6,
//         duration: 3000 + Math.random() * 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }

//     // Mystical glow
//     const glowPositions = [
//       { x: 250, y: 150 },
//       { x: 1030, y: 150 },
//       { x: 640, y: 100 }
//     ];

//     glowPositions.forEach(pos => {
//       const glow = this.add.ellipse(pos.x, pos.y, 150, 150, 0xffd700, 0.1);
//       this.tweens.add({
//         targets: glow,
//         scaleX: 1.3,
//         scaleY: 1.3,
//         alpha: 0.2,
//         duration: 2000,
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     });
//   }

//   createCircularPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     // Ground
//     const ground = this.platforms.create(640, 710, 'ground-tile');
//     ground.setScale(20, 1).refreshBody().setAlpha(0);

//     // Visual ground
//     const groundRect = this.add.rectangle(640, 690, 1280, 60, 0x1a1a2e, 1);
//     groundRect.setDepth(-1);

//     // ✅ 6 platforms (60° apart) - CENTER AT 640, 380
//     const centerX = 640, centerY = 380;
//     const radius = 220;

//     for (let i = 0; i < 6; i++) {
//       const angle = i * 60;
//       const rad = angle * Math.PI / 180;
//       const x = centerX + radius * Math.cos(rad);
//       const y = centerY - radius * Math.sin(rad);

//       // Platform shadow
//       this.add.ellipse(x, y + 40, 100, 20, 0x000000, 0.4).setDepth(-1);

//       // Platform
//       const platform = this.platforms.create(x, y + 30, 'platform-basic');
//       platform.setScale(1.2, 0.5).refreshBody();
//       platform.setTint(0xd4a373);

//       // Floating animation
//       this.tweens.add({
//         targets: platform,
//         y: y + 25,
//         duration: 2000 + (i * 250),
//         yoyo: true,
//         repeat: -1,
//         ease: 'Sine.easeInOut'
//       });
//     }
//   }

//   createCentralBookshelf() {
//     const centerX = 640, centerY = 380;

//     // Glowing aura
//     const aura = this.add.ellipse(centerX, centerY, 200, 200, 0xffd700, 0.15);
//     this.tweens.add({
//       targets: aura,
//       scaleX: 1.2,
//       scaleY: 1.2,
//       alpha: 0.25,
//       duration: 2000,
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });

//     // Bookshelf
//     this.add.image(centerX, centerY, 'bookshelf').setScale(2).setDepth(0);

//     // Sparkles
//     for (let i = 0; i < 6; i++) {
//       const angle = i * 60;
//       const rad = angle * Math.PI / 180;
//       const px = centerX + 80 * Math.cos(rad);
//       const py = centerY - 80 * Math.sin(rad);

//       const sparkle = this.add.text(px, py, '✨', {
//         fontSize: '16px'
//       }).setOrigin(0.5);

//       this.tweens.add({
//         targets: sparkle,
//         angle: 360,
//         duration: 4000,
//         repeat: -1,
//         ease: 'Linear'
//       });
//     }

//     // Title
//     this.add.text(centerX, 240, '📚 Core Coursework', {
//       fontSize: '28px',
//       color: '#ffd700',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 5
//     }).setOrigin(0.5).setDepth(10);
//   }

//   createTitle() {
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a2e, 0.9);
//     titleBg.fillRoundedRect(20, 20, 350, 80, 12);
//     titleBg.lineStyle(3, 0xffd700, 1);
//     titleBg.strokeRoundedRect(20, 20, 350, 80, 12);
//     titleBg.setScrollFactor(0); // ✅ Fixed to camera

//     this.add.text(40, 35, '📖 Academic Library', {
//       fontSize: '24px',
//       color: '#ffd700',
//       fontStyle: 'bold'
//     }).setScrollFactor(0); // ✅ Fixed to camera

//     this.add.text(40, 65, 'Explore courses & certificates', {
//       fontSize: '14px',
//       color: '#cccccc',
//       fontStyle: 'italic'
//     }).setScrollFactor(0); // ✅ Fixed to camera
//   }

//   createCircularItemsAroundCenter() {
//     const centerX = 640, centerY = 380;
//     const radius = 220;

//     const circularItems = [
//       { angle: 0, code: 'EE709', icon: '🔬', color: 0x3498db },
//       { angle: 60, code: 'EE782', icon: '🤖', color: 0xe74c3c },
//       { angle: 120, code: 'EE301', icon: '📡', color: 0x2ecc71 },
//       { angle: 180, code: 'CS419', icon: '🧠', color: 0xf39c12 },
//       { angle: 240, code: 'ONLINE-1', icon: '🎓', color: 0x9b59b6 },
//       { angle: 300, code: 'ONLINE-2', icon: '🌐', color: 0x1abc9c }
//     ];

//     this.courseItems = this.physics.add.staticGroup();

//     circularItems.forEach((item, index) => {
//       const rad = item.angle * Math.PI / 180;
//       const x = centerX + radius * Math.cos(rad);
//       const y = centerY - radius * Math.sin(rad);

//       const courseData = courseworkData.find(c => c.code === item.code);
//       if (!courseData) {
//         console.warn('Course not found:', item.code);
//         return;
//       }

//       this.createBeautifulCourseCard(x, y, courseData, item.icon, item.color);
//     });
//   }

//   createBeautifulCourseCard(x, y, course, icon, color) {
//     const isOnline = course.type === 'online';

//     // Card background
//     const cardBg = this.add.graphics();
//     cardBg.fillStyle(color, 0.3);
//     cardBg.fillRoundedRect(x - 50, y - 60, 100, 120, 10);
//     cardBg.lineStyle(3, color, 1);
//     cardBg.strokeRoundedRect(x - 50, y - 60, 100, 120, 10);
//     cardBg.setDepth(0);

//     // Top bar
//     const topBar = this.add.graphics();
//     topBar.fillStyle(color, 0.8);
//     topBar.fillRoundedRect(x - 50, y - 60, 100, 30, { tl: 10, tr: 10, bl: 0, br: 0 });
//     topBar.setDepth(0);

//     // Icon
//     const iconText = this.add.text(x, y - 35, icon, {
//       fontSize: '32px'
//     }).setOrigin(0.5).setDepth(2);

//     // Course code
//     this.add.text(x, y, course.code, {
//       fontSize: '13px',
//       color: '#ffffff',
//       fontStyle: 'bold'
//     }).setOrigin(0.5).setDepth(2);

//     // Grade/Year
//     const gradeText = isOnline ? course.year : `Grade: ${course.grade}`;
//     const gradeColor = course.grade === 'AA' ? '#00ff00' : 
//                        course.grade === 'AB' ? '#00ccff' : '#ffffff';

//     this.add.text(x, y + 18, gradeText, {
//       fontSize: '10px',
//       color: isOnline ? '#ffffff' : gradeColor,
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 4, y: 2 }
//     }).setOrigin(0.5).setDepth(2);

//     // "Press E" hint
//     const hint = this.add.text(x, y + 48, 'Press E', {
//       fontSize: '10px',
//       color: '#00ff00',
//       backgroundColor: '#00000099',
//       padding: { x: 5, y: 2 }
//     }).setOrigin(0.5).setDepth(2).setVisible(false);

//     // Physics zone
//     const zone = this.add.zone(x, y, 100, 120);
//     this.physics.world.enable(zone);
//     zone.body.setAllowGravity(false);
//     zone.body.moves = false;
//     this.courseItems.add(zone);
//     zone.setData('course', course);

//     const target = { type: 'course', course: course };

//     this.physics.add.overlap(this.player, zone, () => {
//       this.currentInteractTarget = target;
//     }, null, this);

//     // 🎮 Add mouse hover to zone
//     this.addMouseHoverToElement(zone, target);

//     // Show hint
//     this.events.on('update', () => {
//       if (!this.player) return;
//       const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, x, y);
//       hint.setVisible(distance < 80);
//     });

//     // Floating animation
//     this.tweens.add({
//       targets: [cardBg, topBar, iconText],
//       y: '-=6',
//       duration: 2000 + (Math.random() * 500),
//       yoyo: true,
//       repeat: -1,
//       ease: 'Sine.easeInOut'
//     });
//   }

//   createExitDoor() {
//     const exitBg = this.add.graphics();
//     exitBg.fillStyle(0xff6b6b, 0.3);
//     exitBg.fillRoundedRect(35, 570, 90, 110, 12);
//     exitBg.lineStyle(3, 0xff6b6b, 1);
//     exitBg.strokeRoundedRect(35, 570, 90, 110, 12);

//     this.exitDoor = this.physics.add.staticImage(80, 620, 'door-library');

//     this.add.text(80, 690, '🚪 Exit (E)', {
//       fontSize: '14px',
//       color: '#ff6b6b',
//       fontStyle: 'bold',
//       backgroundColor: '#00000099',
//       padding: { x: 8, y: 4 }
//     }).setOrigin(0.5);

//     const target = { type: 'exit' };

//     this.physics.add.overlap(this.player, this.exitDoor, () => {
//       this.currentInteractTarget = target;
//     }, null, this);

//     // 🎮 Add mouse hover to exit door
//     this.addMouseHoverToElement(this.exitDoor, target);
//   }

//   createInstructions() {
//     const controlsBg = this.add.graphics();
//     controlsBg.fillStyle(0x000000, 0.8);
//     controlsBg.fillRoundedRect(340, 675, 600, 35, 8);
//     controlsBg.setScrollFactor(0); // ✅ Fixed to camera

//     this.add.text(640, 692, '← → Move  |  ↑ Jump  |  E Read Book  |  Hover = Auto Open', {
//       fontSize: '16px',
//       color: '#ffffff',
//       fontStyle: 'bold',
//       stroke: '#000000',
//       strokeThickness: 2
//     }).setOrigin(0.5).setScrollFactor(0); // ✅ Fixed to camera
//   }

//   handleInteraction(target) {
//     if (!target) return;

//     if (target.type === 'exit') {
//       this.scene.start('Level1Scene');
//       this.currentInteractTarget = null;
//       return;
//     }

//     if (target.type === 'course') {
//       console.log('📚 Opening course:', target.course);
      
//       if (this.callbacks && this.callbacks.openCourseworkModal) {
//         this.callbacks.openCourseworkModal(target.course);
//       } else {
//         alert(
//           `${target.course.code}: ${target.course.name}\n` +
//           `${target.course.semester || target.course.year}\n` +
//           `${target.course.grade ? 'Grade: ' + target.course.grade : ''}\n\n` +
//           `${target.course.description || 'Certificate course'}`
//         );
//       }
//     }

//     this.currentInteractTarget = null;
//   }

//   update() {
//     if (this.player && this.player.update) {
//       this.player.update();
//     }

//     // E KEY INTERACTION (still works!)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }
//   }
// }













// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import courseworkData from '../../data/coursework.json';

// export default class Level1LibraryScene extends Phaser.Scene {
//   constructor() {
//     super('Level1LibraryScene');
//   }

//   create() {
//     const libraryBg = this.add.image(640, 360, 'level1-library');
//     libraryBg.setDisplaySize(1280, 720);
//     libraryBg.setScrollFactor(0);
//     libraryBg.setAlpha(0.5);
//     libraryBg.setDepth(-10);

//     const overlay = this.add.graphics();
//     overlay.fillGradientStyle(0x0f0c29, 0x0f0c29, 0x302b63, 0x24243e, 0.7);
//     overlay.fillRect(0, 0, 1280, 720);
//     overlay.setDepth(-5);

//     this.createAtmosphere();
//     this.createCircularPlatforms();

//     this.player = new Player(this, 150, 620);
//     this.physics.add.collider(this.player, this.platforms);

//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;
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

//     this.createCentralBookshelf();
//     this.createCourseCards();
//     this.createExitDoor();
//     this.createTitle();

//     this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
//     this.cameras.main.setBounds(0, 0, 1280, 720);

//     this.createInstructions();
//   }

//   createAtmosphere() {
//     for (let i = 0; i < 6; i++) {
//       const x = 100 + Math.random() * 1080;
//       const y = 50 + Math.random() * 200;
//       const particle = this.add.text(x, y, '📖', { fontSize: '24px', alpha: 0.3 });
//       this.tweens.add({ targets: particle, y: y - 30, alpha: 0.6, duration: 3000 + Math.random() * 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
//     }

//     [{ x: 250, y: 150 }, { x: 1030, y: 150 }, { x: 640, y: 100 }].forEach(pos => {
//       const glow = this.add.ellipse(pos.x, pos.y, 150, 150, 0xffd700, 0.1);
//       this.tweens.add({ targets: glow, scaleX: 1.3, scaleY: 1.3, alpha: 0.2, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
//     });
//   }

//   createCircularPlatforms() {
//     this.platforms = this.physics.add.staticGroup();
//     const ground = this.platforms.create(640, 710, 'ground-tile');
//     ground.setScale(20, 1).refreshBody().setAlpha(0);

//     this.add.rectangle(640, 690, 1280, 60, 0x1a1a2e, 1).setDepth(-1);

//     const centerX = 640, centerY = 380, radius = 220;
//     for (let i = 0; i < 6; i++) {
//       const angle = i * 60;
//       const rad = angle * Math.PI / 180;
//       const x = centerX + radius * Math.cos(rad);
//       const y = centerY - radius * Math.sin(rad);

//       this.add.ellipse(x, y + 40, 100, 20, 0x000000, 0.4).setDepth(-1);
//       const platform = this.platforms.create(x, y + 30, 'platform-basic');
//       platform.setScale(1.2, 0.5).refreshBody().setTint(0xd4a373);
//       this.tweens.add({ targets: platform, y: y + 25, duration: 2000 + (i * 250), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
//     }
//   }

//   createCentralBookshelf() {
//     const centerX = 640, centerY = 380;
//     const aura = this.add.ellipse(centerX, centerY, 200, 200, 0xffd700, 0.15);
//     this.tweens.add({ targets: aura, scaleX: 1.2, scaleY: 1.2, alpha: 0.25, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

//     this.add.image(centerX, centerY, 'bookshelf').setScale(2).setDepth(0);

//     for (let i = 0; i < 6; i++) {
//       const angle = i * 60;
//       const rad = angle * Math.PI / 180;
//       const px = centerX + 80 * Math.cos(rad);
//       const py = centerY - 80 * Math.sin(rad);
//       const sparkle = this.add.text(px, py, '✨', { fontSize: '16px' }).setOrigin(0.5);
//       this.tweens.add({ targets: sparkle, angle: 360, duration: 4000, repeat: -1, ease: 'Linear' });
//     }

//     this.add.text(centerX, 240, '📚 Core Coursework', { fontSize: '28px', color: '#ffd700', fontStyle: 'bold', stroke: '#000000', strokeThickness: 5 }).setOrigin(0.5).setDepth(10);
//   }

//   createCourseCards() {
//     const centerX = 640, centerY = 380, radius = 220;
//     const courses = [
//       { angle: 0, code: 'EE709', icon: '🔬', color: 0x3498db },
//       { angle: 60, code: 'EE782', icon: '🤖', color: 0xe74c3c },
//       { angle: 120, code: 'EE301', icon: '📡', color: 0x2ecc71 },
//       { angle: 180, code: 'CS419', icon: '🧠', color: 0xf39c12 },
//       { angle: 240, code: 'ONLINE-1', icon: '🎓', color: 0x9b59b6 },
//       { angle: 300, code: 'ONLINE-2', icon: '🌐', color: 0x1abc9c }
//     ];

//     courses.forEach(({ angle, code, icon, color }) => {
//       const rad = angle * Math.PI / 180;
//       const x = centerX + radius * Math.cos(rad);
//       const y = centerY - radius * Math.sin(rad);

//       const course = courseworkData.find(c => c.code === code);
//       if (!course) return;

//       const isOnline = course.type === 'online';
//       const cardBg = this.add.graphics();
//       cardBg.fillStyle(color, 0.3);
//       cardBg.fillRoundedRect(x - 50, y - 60, 100, 120, 10);
//       cardBg.lineStyle(3, color, 1);
//       cardBg.strokeRoundedRect(x - 50, y - 60, 100, 120, 10);
//       cardBg.setDepth(0);

//       const topBar = this.add.graphics();
//       topBar.fillStyle(color, 0.8);
//       topBar.fillRoundedRect(x - 50, y - 60, 100, 30, { tl: 10, tr: 10, bl: 0, br: 0 });
//       topBar.setDepth(0);

//       const iconText = this.add.text(x, y - 35, icon, { fontSize: '32px' }).setOrigin(0.5).setDepth(2);
//       this.add.text(x, y, course.code, { fontSize: '13px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5).setDepth(2);

//       const gradeText = isOnline ? course.year : `Grade: ${course.grade}`;
//       const gradeColor = course.grade === 'AA' ? '#00ff00' : course.grade === 'AB' ? '#00ccff' : '#ffffff';
//       this.add.text(x, y + 18, gradeText, { fontSize: '10px', color: isOnline ? '#ffffff' : gradeColor, fontStyle: 'bold', backgroundColor: '#00000099', padding: { x: 4, y: 2 } }).setOrigin(0.5).setDepth(2);

//       const hint = this.add.text(x, y + 48, '👆 Hover', { fontSize: '10px', color: '#00ff00', backgroundColor: '#00000099', padding: { x: 5, y: 2 } }).setOrigin(0.5).setDepth(2);

//       const zone = this.add.zone(x, y, 100, 120).setInteractive();
//       this.physics.world.enable(zone);
//       zone.body.setAllowGravity(false);
//       zone.body.moves = false;

//       // 👆 MOUSE HOVER AUTO-TRIGGER
//       zone.on('pointerover', () => {
//         this.currentInteractTarget = { type: 'course', course };
//         hint.setText('Opening...');
//         this.openCourseModal(course);
//       });
//       zone.on('pointerout', () => {
//         this.currentInteractTarget = null;
//         hint.setText('👆 Hover');
//       });

//       this.physics.add.overlap(this.player, zone, () => {
//         this.currentInteractTarget = { type: 'course', course };
//       });

//       this.tweens.add({ targets: [cardBg, topBar, iconText], y: '-=6', duration: 2000 + (Math.random() * 500), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
//     });
//   }

//   createExitDoor() {
//     const exitBg = this.add.graphics();
//     exitBg.fillStyle(0xff6b6b, 0.3);
//     exitBg.fillRoundedRect(35, 570, 90, 110, 12);
//     exitBg.lineStyle(3, 0xff6b6b, 1);
//     exitBg.strokeRoundedRect(35, 570, 90, 110, 12);

//     this.exitDoor = this.physics.add.staticImage(80, 620, 'door-library').setInteractive();
//     this.add.text(80, 690, '← Exit', { fontSize: '14px', color: '#ff6b6b', fontStyle: 'bold', backgroundColor: '#00000099', padding: { x: 8, y: 4 } }).setOrigin(0.5);

//     // 👆 MOUSE HOVER EXIT
//     this.exitDoor.on('pointerover', () => this.scene.start('Level1Scene'));
//     this.physics.add.overlap(this.player, this.exitDoor, () => { this.currentInteractTarget = { type: 'exit' }; });
//   }

//   createTitle() {
//     const titleBg = this.add.graphics();
//     titleBg.fillStyle(0x1a1a2e, 0.9);
//     titleBg.fillRoundedRect(20, 20, 350, 80, 12);
//     titleBg.lineStyle(3, 0xffd700, 1);
//     titleBg.strokeRoundedRect(20, 20, 350, 80, 12);
//     titleBg.setScrollFactor(0);

//     this.add.text(40, 35, '📖 Academic Library', { fontSize: '24px', color: '#ffd700', fontStyle: 'bold' }).setScrollFactor(0);
//     this.add.text(40, 65, '👆 Hover cards = Auto open!', { fontSize: '14px', color: '#cccccc', fontStyle: 'italic' }).setScrollFactor(0);
//   }

//   createInstructions() {
//     const controlsBg = this.add.graphics();
//     controlsBg.fillStyle(0x000000, 0.8);
//     controlsBg.fillRoundedRect(340, 675, 600, 35, 8);
//     controlsBg.setScrollFactor(0);
//     this.add.text(640, 692, '👆 HOVER = Auto Modal | ←→ Camera+Player | WASD Play', { fontSize: '15px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0);
//   }

//   openCourseModal(course) {
//     if (this.callbacks && this.callbacks.openCourseworkModal) {
//       this.callbacks.openCourseworkModal(course);
//     } else {
//       alert(`${course.code}: ${course.name}\n${course.semester || course.year}\n${course.grade ? 'Grade: ' + course.grade : ''}`);
//     }
//   }

//   update() {
//     if (this.player && this.player.update) this.player.update();

//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       if (this.currentInteractTarget.type === 'exit') this.scene.start('Level1Scene');
//       else if (this.currentInteractTarget.type === 'course') this.openCourseModal(this.currentInteractTarget.course);
//       this.currentInteractTarget = null;
//     }
//   }
// }






















import Phaser from 'phaser';
import Player from '../entities/Player';
import courseworkData from '../../data/coursework.json';

export default class Level1LibraryScene extends Phaser.Scene {
  constructor() {
    super('Level1LibraryScene');
  }

  create() {
    // Background
    const libraryBg = this.add.image(640, 360, 'level1-library');
    libraryBg.setDisplaySize(1280, 720);
    libraryBg.setScrollFactor(0);
    libraryBg.setAlpha(0.5);
    libraryBg.setDepth(-10);

    // Gradient overlay
    const overlay = this.add.graphics();
    overlay.fillGradientStyle(0x0f0c29, 0x0f0c29, 0x302b63, 0x24243e, 0.7);
    overlay.fillRect(0, 0, 1280, 720);
    overlay.setDepth(-5);

    // Create scene elements
    this.createAtmosphere();
    this.createCircularPlatforms();

    // Player setup
    this.player = new Player(this, 150, 620);
    this.physics.add.collider(this.player, this.platforms);

    // Input setup
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // Create content
    this.createCentralBookshelf();
    this.createCourseCards();
    this.createExitDoor();
    this.createTitle();
    this.createInstructions();

    // Camera setup
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, 1280, 720);

    // Cleanup on scene shutdown
    this.events.on('shutdown', this.cleanup, this);
  }

  // 🧹 CLEANUP (Global events handled in index.js)
  cleanup() {
    // No cleanup needed - global movement system handles everything
  }

  createAtmosphere() {
    // Floating book particles
    for (let i = 0; i < 6; i++) {
      const x = 100 + Math.random() * 1080;
      const y = 50 + Math.random() * 200;
      const particle = this.add.text(x, y, '📖', { fontSize: '24px', alpha: 0.3 });
      this.tweens.add({
        targets: particle,
        y: y - 30,
        alpha: 0.6,
        duration: 3000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Ambient light glows
    [{ x: 250, y: 150 }, { x: 1030, y: 150 }, { x: 640, y: 100 }].forEach(pos => {
      const glow = this.add.ellipse(pos.x, pos.y, 150, 150, 0xffd700, 0.1);
      this.tweens.add({
        targets: glow,
        scaleX: 1.3,
        scaleY: 1.3,
        alpha: 0.2,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createCircularPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    
    // Ground
    const ground = this.platforms.create(640, 710, 'ground-tile');
    ground.setScale(20, 1).refreshBody().setAlpha(0);
    this.add.rectangle(640, 690, 1280, 60, 0x1a1a2e, 1).setDepth(-1);

    // Circular platform arrangement
    const centerX = 640, centerY = 380, radius = 220;
    for (let i = 0; i < 6; i++) {
      const angle = i * 60;
      const rad = angle * Math.PI / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY - radius * Math.sin(rad);

      // Platform shadow
      this.add.ellipse(x, y + 40, 100, 20, 0x000000, 0.4).setDepth(-1);
      
      // Platform
      const platform = this.platforms.create(x, y + 30, 'platform-basic');
      platform.setScale(1.2, 0.5).refreshBody().setTint(0xd4a373);
      
      // Float animation
      this.tweens.add({
        targets: platform,
        y: y + 25,
        duration: 2000 + (i * 250),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  createCentralBookshelf() {
    const centerX = 640, centerY = 380;
    
    // Central aura
    const aura = this.add.ellipse(centerX, centerY, 200, 200, 0xffd700, 0.15);
    this.tweens.add({
      targets: aura,
      scaleX: 1.2,
      scaleY: 1.2,
      alpha: 0.25,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Bookshelf
    this.add.image(centerX, centerY, 'bookshelf').setScale(2).setDepth(0);

    // Sparkles around bookshelf
    for (let i = 0; i < 6; i++) {
      const angle = i * 60;
      const rad = angle * Math.PI / 180;
      const px = centerX + 80 * Math.cos(rad);
      const py = centerY - 80 * Math.sin(rad);
      const sparkle = this.add.text(px, py, '✨', { fontSize: '16px' }).setOrigin(0.5);
      this.tweens.add({
        targets: sparkle,
        angle: 360,
        duration: 4000,
        repeat: -1,
        ease: 'Linear'
      });
    }

    // Title
    this.add.text(centerX, 240, '📚 Core Coursework', {
      fontSize: '28px',
      color: '#ffd700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(10);
  }

  createCourseCards() {
    const centerX = 640, centerY = 380, radius = 220;
    const courses = [
      { angle: 0, code: 'EE709', icon: '🔬', color: 0x3498db },
      { angle: 60, code: 'EE782', icon: '🤖', color: 0xe74c3c },
      { angle: 120, code: 'EE301', icon: '📡', color: 0x2ecc71 },
      { angle: 180, code: 'CS419', icon: '🧠', color: 0xf39c12 },
      { angle: 240, code: 'ONLINE-1', icon: '🎓', color: 0x9b59b6 },
      { angle: 300, code: 'ONLINE-2', icon: '🌐', color: 0x1abc9c }
    ];

    courses.forEach(({ angle, code, icon, color }) => {
      const rad = angle * Math.PI / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY - radius * Math.sin(rad);

      const course = courseworkData.find(c => c.code === code);
      if (!course) return;

      const isOnline = course.type === 'online';

      // Card background
      const cardBg = this.add.graphics();
      cardBg.fillStyle(color, 0.3);
      cardBg.fillRoundedRect(x - 50, y - 60, 100, 120, 10);
      cardBg.lineStyle(3, color, 1);
      cardBg.strokeRoundedRect(x - 50, y - 60, 100, 120, 10);
      cardBg.setDepth(0);

      // Top bar
      const topBar = this.add.graphics();
      topBar.fillStyle(color, 0.8);
      topBar.fillRoundedRect(x - 50, y - 60, 100, 30, { tl: 10, tr: 10, bl: 0, br: 0 });
      topBar.setDepth(0);

      // Icon
      const iconText = this.add.text(x, y - 35, icon, {
        fontSize: '32px'
      }).setOrigin(0.5).setDepth(2);

      // Course code
      this.add.text(x, y, course.code, {
        fontSize: '13px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(2);

      // Grade/Year
      const gradeText = isOnline ? course.year : `Grade: ${course.grade}`;
      const gradeColor = course.grade === 'AA' ? '#00ff00' : 
                        course.grade === 'AB' ? '#00ccff' : '#ffffff';
      this.add.text(x, y + 18, gradeText, {
        fontSize: '10px',
        color: isOnline ? '#ffffff' : gradeColor,
        fontStyle: 'bold',
        backgroundColor: '#00000099',
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5).setDepth(2);

      // Hover hint
      const hint = this.add.text(x, y + 48, '👆 Hover', {
        fontSize: '10px',
        color: '#00ff00',
        backgroundColor: '#00000099',
        padding: { x: 5, y: 2 }
      }).setOrigin(0.5).setDepth(2);

      // Interactive zone
      const zone = this.add.zone(x, y, 100, 120).setInteractive();
      this.physics.world.enable(zone);
      zone.body.setAllowGravity(false);
      zone.body.moves = false;

      // 👆 MOUSE HOVER AUTO-TRIGGER
      zone.on('pointerover', () => {
        this.currentInteractTarget = { type: 'course', course };
        hint.setText('Opening...');
        this.openCourseModal(course);
      });
      
      zone.on('pointerout', () => {
        this.currentInteractTarget = null;
        hint.setText('👆 Hover');
      });

      // Player overlap (backup for E key)
      this.physics.add.overlap(this.player, zone, () => {
        this.currentInteractTarget = { type: 'course', course };
      });

      // Float animation
      this.tweens.add({
        targets: [cardBg, topBar, iconText],
        y: '-=6',
        duration: 2000 + (Math.random() * 500),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createExitDoor() {
    // Door frame
    const exitBg = this.add.graphics();
    exitBg.fillStyle(0xff6b6b, 0.3);
    exitBg.fillRoundedRect(35, 570, 90, 110, 12);
    exitBg.lineStyle(3, 0xff6b6b, 1);
    exitBg.strokeRoundedRect(35, 570, 90, 110, 12);

    // Door
    this.exitDoor = this.physics.add.staticImage(80, 620, 'door-library').setInteractive();
    
    // Exit label
    this.add.text(80, 690, '← Exit', {
      fontSize: '14px',
      color: '#ff6b6b',
      fontStyle: 'bold',
      backgroundColor: '#00000099',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    // 👆 MOUSE HOVER EXIT
    this.exitDoor.on('pointerover', () => {
      this.scene.start('Level1Scene');
    });

    // Player overlap (backup)
    this.physics.add.overlap(this.player, this.exitDoor, () => {
      this.currentInteractTarget = { type: 'exit' };
    });
  }

  createTitle() {
    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x1a1a2e, 0.9);
    titleBg.fillRoundedRect(20, 20, 350, 80, 12);
    titleBg.lineStyle(3, 0xffd700, 1);
    titleBg.strokeRoundedRect(20, 20, 350, 80, 12);
    titleBg.setScrollFactor(0);

    this.add.text(40, 35, '📖 Academic Library', {
      fontSize: '24px',
      color: '#ffd700',
      fontStyle: 'bold'
    }).setScrollFactor(0);

    this.add.text(40, 65, '👆 Hover cards = Auto open!', {
      fontSize: '14px',
      color: '#cccccc',
      fontStyle: 'italic'
    }).setScrollFactor(0);
  }

  createInstructions() {
    const controlsBg = this.add.graphics();
    controlsBg.fillStyle(0x000000, 0.8);
    controlsBg.fillRoundedRect(340, 675, 600, 35, 8);
    controlsBg.setScrollFactor(0);

    this.add.text(640, 692, '👆 HOVER = Auto Modal | ←→ Buttons Move | WASD Play', {
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0);
  }

  openCourseModal(course) {
    if (this.callbacks && this.callbacks.openCourseworkModal) {
      this.callbacks.openCourseworkModal(course);
    } else {
      alert(`${course.code}: ${course.name}\n${course.semester || course.year}\n${course.grade ? 'Grade: ' + course.grade : ''}`);
    }
  }

  update() {
    // Update player (handles WASD movement)
    if (this.player && this.player.update) {
      this.player.update();
    }

    // E key interaction (backup)
    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'exit') {
        this.scene.start('Level1Scene');
      } else if (this.currentInteractTarget.type === 'course') {
        this.openCourseModal(this.currentInteractTarget.course);
      }
      this.currentInteractTarget = null;
    }
  }
}