


// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import educationData from '../../data/education.json';
// import positionsData from '../../data/positions.json';
// import iitbData from '../../data/iitb-info.json';

// export default class Level1Scene extends Phaser.Scene {
//   constructor() {
//     super('Level1Scene');
//   }

//   create() {
//     // 1. BACKGROUND (IITB Hub)
//     this.add.image(512, 300, 'level1-iitb-hub').setScrollFactor(0);

//     // 2. PLATFORMS (Ground + 10 floating platforms)
//     this.createPlatforms();

//     // 3. PLAYER SPAWN (x:100, y:300)
//     this.player = new Player(this, 100, 300);
//     this.physics.add.collider(this.player.sprite, this.platforms);

//     // 4. E KEY FOR INTERACTION
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;

//     // 5. 8 ZONES (Morning)
//     this.createZone1Welcome();
//     this.createZone2Education();
//     this.createZone3POR();
//     this.createZone4HobbiesDoor();

//     // 6. 8 ZONES (Afternoon)
//     this.createZone5LibraryDoor();
//     this.createZone6IITBKiosk();
//     this.createZone7Skills();
//     this.createZone8ProjectsDoor();

//     // 7. STARS (10 collectible stars)
//     this.createStars();

//     // 8. REACT CALLBACKS (for popups)
//     this.setupReactCallbacks();
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     // GROUND (full width bottom)
//     this.platforms.create(512, 590, 'ground-tile').setScale(16, 1).refreshBody();

//     // 10 FLOATING PLATFORMS (connect zones)
//     const platformPositions = [
//       [300, 500], [600, 450], [900, 500], [1200, 450],
//       [1500, 500], [1800, 450], [2200, 500], [2500, 450],
//       [2800, 500], [3100, 450]
//     ];

//     platformPositions.forEach(([x, y], i) => {
//       this.platforms.create(x, y, 'platform-basic').setScale(1.5, 1).refreshBody();
//     });
//   }

//   createStars() {
//     this.stars = this.physics.add.group({
//       key: 'star-gold',
//       repeat: 9,  // 10 total stars
//       setXY: { x: 200, y: 0, stepX: 300 }
//     });

//     this.stars.children.iterate((child) => {
//       child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
//     });

//     this.physics.add.collider(this.stars, this.platforms);
//     this.physics.add.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
//   }

//   collectStar(player, star) {
//     star.disableBody(true, true);
//     // Later: Add sound + counter
//   }

//   setupReactCallbacks() {
//     const callbacks = this.game.registry.get('reactCallbacks');
//     if (callbacks) {
//       this.callbacks = callbacks;
//     }
//   }

//   // ZONES 1-4 (MORNING)
//   createZone1Welcome() {
//     this.signboard = this.physics.add.staticImage(200, 450, 'signboard-welcome');
//     this.physics.add.overlap(this.player.sprite, this.signboard, 
//       () => this.currentInteractTarget = { type: 'welcome' }, null, this);
//   }

//   createZone2Education() {
//     this.professorNpc = this.physics.add.staticImage(400, 450, 'npc-professor');
//     this.physics.add.overlap(this.player.sprite, this.professorNpc, 
//       () => this.currentInteractTarget = { type: 'education' }, null, this);
//   }

//   createZone3POR() {
//     this.leaderNpc = this.physics.add.staticImage(600, 450, 'npc-leader');
//     this.physics.add.overlap(this.player.sprite, this.leaderNpc, 
//       () => this.currentInteractTarget = { type: 'por' }, null, this);
//   }

//   createZone4HobbiesDoor() {
//     this.hobbiesDoor = this.physics.add.staticImage(800, 450, 'door-hobbies');
//     this.physics.add.overlap(this.player.sprite, this.hobbiesDoor, 
//       () => this.currentInteractTarget = { type: 'hobbiesDoor' }, null, this);
//   }

//   // ZONES 5-8 (AFTERNOON)
//   createZone5LibraryDoor() {
//     this.libraryDoor = this.physics.add.staticImage(1000, 450, 'door-hobbies');
//     this.libraryDoor.setTint(0x8B4513); // Brown tint for library
//     this.physics.add.overlap(this.player.sprite, this.libraryDoor, 
//       () => this.currentInteractTarget = { type: 'libraryDoor' }, null, this);
//   }

//   createZone6IITBKiosk() {
//     this.iitbKiosk = this.physics.add.staticImage(1200, 450, 'info-kiosk');
//     this.physics.add.overlap(this.player.sprite, this.iitbKiosk, 
//       () => this.currentInteractTarget = { type: 'iitbInfo' }, null, this);
//   }

//   createZone7Skills() {
//     // Glowing orb (scale animation)
//     this.skillsOrb = this.add.image(1400, 450, 'star-rainbow').setScale(2);
//     this.tweens.add({
//       targets: this.skillsOrb,
//       scale: 2.5,
//       angle: 360,
//       duration: 3000,
//       repeat: -1,
//       yoyo: true
//     });

//     this.skillsPreview = this.physics.add.staticGroup();
//     ['icon-react', 'icon-python', 'icon-docker', 'icon-pytorch', 'icon-vhdl']
//       .forEach((icon, i) => {
//         this.skillsPreview.create(1350 + i * 40, 420, icon).setScale(0.5);
//       });

//     this.physics.add.overlap(this.player.sprite, this.skillsOrb, 
//       () => this.currentInteractTarget = { type: 'skills' }, null, this);
//   }

//   createZone8ProjectsDoor() {
//     this.projectsDoor = this.physics.add.staticImage(1600, 450, 'door-large');
//     this.physics.add.overlap(this.player.sprite, this.projectsDoor, 
//       () => this.currentInteractTarget = { type: 'projectsDoor' }, null, this);
//   }

//   handleInteraction(target) {
//     if (!this.callbacks) return;

//     switch (target.type) {
//       case 'welcome':
//         this.callbacks.openPopup({
//           kind: 'info',
//           title: 'Welcome to Krishna\'s Portfolio!',
//           content: `Krishna Kumar Singh
// Roll No: 22B3968
// Dual Degree EE | IIT Bombay
// CGPA: 8.43/10.0`
//         });
//         break;

//       case 'education':
//         this.callbacks.openPopup({
//           kind: 'info',
//           title: '🎓 Education Journey',
//           content: `IIT Bombay (2022-2027)
// Dual Degree EE | CGPA: 8.43/10.0
// JEE Advanced: Top 5%

// CBSE Class 12: 95.4% (Math: 100/100)
// CBSE Class 10: 95.2%`
//         });
//         break;

//       case 'por':
//         this.callbacks.openPopup({
//           kind: 'info',
//           title: '🏆 Positions of Responsibility',
//           content: `Tech Team Lead - WnCC (2023-24)
// • Led 5-member web dev team
// • Mentored 20+ freshers

// Project Coordinator - Seasons of Code
// • Managed IDS project with 3 teams

// Teaching Assistant - EE Dept
// • Guided 40+ students in VHDL

// NCC Cadet (2019-2021)`
//         });
//         break;

//       case 'hobbiesDoor':
//         this.scene.start('Level1HobbiesScene');
//         break;

//       case 'libraryDoor':
//         this.scene.start('Level1LibraryScene');
//         break;

//       case 'iitbInfo':
//         this.callbacks.openPopup({
//           kind: 'info',
//           title: '🏛️ About IIT Bombay',
//           content: `NIRF #3 Engineering | QS World #149
// 550 acres | 16 departments
// 400K+ books library | 24/7 Computer Center

// Clubs: WnCC, E-Cell, Analytics Club
// Techfest | Mood Indigo

// Fun Fact: Home to Asia's 1st maglev prototype!`
//         });
//         break;

//       case 'skills':
//         this.callbacks.openPopup({
//           kind: 'info',
//           title: '⭐ Skills Showcase',
//           content: 'Collect 60+ skills across 4 zones!\n\nReact • Python • Docker • PyTorch • VHDL\nNode.js • MySQL • OpenCV • YOLOv8'
//         });
//         break;

//       case 'projectsDoor':
//         this.scene.start('Level2Scene');
//         break;
//     }

//     // Clear target after interaction
//     this.currentInteractTarget = null;
//   }

//   update() {
//     this.player.update();

//     // E KEY INTERACTION
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }

//     // VISUAL FEEDBACK (optional - glow effect near interactables)
//     if (this.currentInteractTarget) {
//       // Add glow tween to current target
//     }
//   }
// }























// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import educationData from '../../data/education.json';
// import positionsData from '../../data/positions.json';
// import iitbData from '../../data/iitb-info.json';

// export default class Level1Scene extends Phaser.Scene {
//   constructor() {
//     super('Level1Scene');
//   }

//   create() {
//     // 1. BACKGROUND (IITB Hub)
//     this.add.image(512, 300, 'level1-iitb-hub').setScrollFactor(0);

//     // 2. PLATFORMS (Ground + 10 floating platforms)
//     this.createPlatforms();

//     // 3. PLAYER SPAWN (x:100, y:300)
//     this.player = new Player(this, 100, 300);
//     this.physics.add.collider(this.player.sprite, this.platforms);

//     // 4. E KEY FOR INTERACTION
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;

//     // 5. 8 ZONES (Morning)
//     this.createZone1Welcome();
//     this.createZone2Education();
//     this.createZone3POR();
//     this.createZone4HobbiesDoor();

//     // 6. 8 ZONES (Afternoon)
//     this.createZone5LibraryDoor();
//     this.createZone6IITBKiosk();
//     this.createZone7Skills();
//     this.createZone8ProjectsDoor();

//     // 7. STARS (10 collectible stars)
//     this.createStars();

//     // 8. REACT CALLBACKS (for popups)
//     this.setupReactCallbacks();

//     // 🎮 9. MOUSE HOVER + FORWARD/BACK EVENT LISTENERS
//     this.setupMouseHoverListeners();
//     this.setupForwardBackListeners();
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     // GROUND (full width bottom)
//     this.platforms.create(512, 590, 'ground-tile').setScale(16, 1).refreshBody();

//     // 10 FLOATING PLATFORMS (connect zones)
//     const platformPositions = [
//       [300, 500], [600, 450], [900, 500], [1200, 450],
//       [1500, 500], [1800, 450], [2200, 500], [2500, 450],
//       [2800, 500], [3100, 450]
//     ];

//     platformPositions.forEach(([x, y], i) => {
//       this.platforms.create(x, y, 'platform-basic').setScale(1.5, 1).refreshBody();
//     });
//   }

//   createStars() {
//     this.stars = this.physics.add.group({
//       key: 'star-gold',
//       repeat: 9,  // 10 total stars
//       setXY: { x: 200, y: 0, stepX: 300 }
//     });

//     this.stars.children.iterate((child) => {
//       child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
//     });

//     this.physics.add.collider(this.stars, this.platforms);
//     this.physics.add.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
//   }

//   collectStar(player, star) {
//     star.disableBody(true, true);
//     // Later: Add sound + counter
//   }

//   setupReactCallbacks() {
//     const callbacks = this.game.registry.get('reactCallbacks');
//     if (callbacks) {
//       this.callbacks = callbacks;
//     }
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
//       this.player.sprite.setVelocityX(300);
//       setTimeout(() => {
//         if (this.player.sprite.body) {
//           this.player.sprite.setVelocityX(0);
//         }
//       }, 200);
//     });

//     this.game.registry.events.on('moveBackward', () => {
//       this.player.sprite.setVelocityX(-300);
//       setTimeout(() => {
//         if (this.player.sprite.body) {
//           this.player.sprite.setVelocityX(0);
//         }
//       }, 200);
//     });
//   }

//   // 🎮 HELPER: Add mouse hover to zone
//   addMouseHoverToZone(zone, target) {
//     zone.setInteractive();
    
//     zone.on('pointerover', () => {
//       this.currentInteractTarget = target;
//       this.game.registry.events.emit('mouseHover', target);
//     });

//     zone.on('pointerout', () => {
//       this.currentInteractTarget = null;
//     });
//   }

//   // ZONES 1-4 (MORNING)
//   createZone1Welcome() {
//     this.signboard = this.physics.add.staticImage(200, 450, 'signboard-welcome');
//     const target = { type: 'welcome' };
    
//     this.physics.add.overlap(this.player.sprite, this.signboard, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.signboard, target);
//   }

//   createZone2Education() {
//     this.professorNpc = this.physics.add.staticImage(400, 450, 'npc-professor');
//     const target = { type: 'education' };
    
//     this.physics.add.overlap(this.player.sprite, this.professorNpc, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.professorNpc, target);
//   }

//   createZone3POR() {
//     this.leaderNpc = this.physics.add.staticImage(600, 450, 'npc-leader');
//     const target = { type: 'por' };
    
//     this.physics.add.overlap(this.player.sprite, this.leaderNpc, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.leaderNpc, target);
//   }

//   createZone4HobbiesDoor() {
//     this.hobbiesDoor = this.physics.add.staticImage(800, 450, 'door-hobbies');
//     const target = { type: 'hobbiesDoor' };
    
//     this.physics.add.overlap(this.player.sprite, this.hobbiesDoor, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.hobbiesDoor, target);
//   }

//   // ZONES 5-8 (AFTERNOON)
//   createZone5LibraryDoor() {
//     this.libraryDoor = this.physics.add.staticImage(1000, 450, 'door-hobbies');
//     this.libraryDoor.setTint(0x8B4513); // Brown tint for library
//     const target = { type: 'libraryDoor' };
    
//     this.physics.add.overlap(this.player.sprite, this.libraryDoor, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.libraryDoor, target);
//   }

//   createZone6IITBKiosk() {
//     this.iitbKiosk = this.physics.add.staticImage(1200, 450, 'info-kiosk');
//     const target = { type: 'iitbInfo' };
    
//     this.physics.add.overlap(this.player.sprite, this.iitbKiosk, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.iitbKiosk, target);
//   }

//   createZone7Skills() {
//     // Glowing orb (scale animation)
//     this.skillsOrb = this.add.image(1400, 450, 'star-rainbow').setScale(2);
//     this.tweens.add({
//       targets: this.skillsOrb,
//       scale: 2.5,
//       angle: 360,
//       duration: 3000,
//       repeat: -1,
//       yoyo: true
//     });

//     this.skillsPreview = this.physics.add.staticGroup();
//     ['icon-react', 'icon-python', 'icon-docker', 'icon-pytorch', 'icon-vhdl']
//       .forEach((icon, i) => {
//         this.skillsPreview.create(1350 + i * 40, 420, icon).setScale(0.5);
//       });

//     const target = { type: 'skills' };
//     this.physics.add.overlap(this.player.sprite, this.skillsOrb, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover - need to make orb interactive
//     this.skillsOrb.setInteractive();
//     this.skillsOrb.on('pointerover', () => {
//       this.currentInteractTarget = target;
//       this.game.registry.events.emit('mouseHover', target);
//     });
//     this.skillsOrb.on('pointerout', () => {
//       this.currentInteractTarget = null;
//     });
//   }

//   createZone8ProjectsDoor() {
//     this.projectsDoor = this.physics.add.staticImage(1600, 450, 'door-large');
//     const target = { type: 'projectsDoor' };
    
//     this.physics.add.overlap(this.player.sprite, this.projectsDoor, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.projectsDoor, target);
//   }

//   handleInteraction(target) {
//     if (!this.callbacks) return;

//     switch (target.type) {
//       case 'welcome':
//         this.callbacks.openWelcomeModal();
//         break;

//       case 'education':
//         this.callbacks.openEducationModal();
//         break;

//       case 'por':
//         this.callbacks.openLeadershipModal();
//         break;

//       case 'hobbiesDoor':
//         this.scene.start('Level1HobbiesScene');
//         break;

//       case 'libraryDoor':
//         this.scene.start('Level1LibraryScene');
//         break;

//       case 'iitbInfo':
//         this.callbacks.openIITBModal();
//         break;

//       case 'skills':
//         this.callbacks.openInfoModal({
//           title: '⭐ Skills Showcase',
//           content: 'Collect 60+ skills across 4 zones!\n\nReact • Python • Docker • PyTorch • VHDL\nNode.js • MySQL • OpenCV • YOLOv8'
//         });
//         break;

//       case 'projectsDoor':
//         this.scene.start('Level2Scene');
//         break;
//     }

//     // Clear target after interaction
//     this.currentInteractTarget = null;
//   }

//   update() {
//     this.player.update();

//     // E KEY INTERACTION (still works!)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }

//     // VISUAL FEEDBACK (optional - glow effect near interactables)
//     if (this.currentInteractTarget) {
//       // Add glow tween to current target
//     }
//   }
// }



























// import Phaser from 'phaser';
// import Player from '../entities/Player';
// import educationData from '../../data/education.json';
// import positionsData from '../../data/positions.json';
// import iitbData from '../../data/iitb-info.json';

// export default class Level1Scene extends Phaser.Scene {
//   constructor() {
//     super('Level1Scene');
//   }

//   create() {
//     // 1. BACKGROUND (IITB Hub)
//     this.add.image(512, 300, 'level1-iitb-hub').setScrollFactor(0);

//     // 2. PLATFORMS (Ground + 10 floating platforms)
//     this.createPlatforms();

//     // 3. PLAYER SPAWN (x:100, y:300)
//     this.player = new Player(this, 100, 300);
//     this.physics.add.collider(this.player.sprite, this.platforms);

//     // 4. E KEY FOR INTERACTION
//     this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
//     this.currentInteractTarget = null;

//     // 5. 8 ZONES (Morning)
//     this.createZone1Welcome();
//     this.createZone2Education();
//     this.createZone3POR();
//     this.createZone4HobbiesDoor();

//     // 6. 8 ZONES (Afternoon)
//     this.createZone5LibraryDoor();
//     this.createZone6IITBKiosk();
//     this.createZone7Skills();
//     this.createZone8ProjectsDoor();

//     // 7. STARS (10 collectible stars)
//     this.createStars();

//     // 8. REACT CALLBACKS (for popups)
//     this.setupReactCallbacks();

//     // 🎮 9. MOUSE HOVER + FORWARD/BACK EVENT LISTENERS
//     this.setupMouseHoverListeners();
//     this.setupForwardBackListeners();
//   }

//   createPlatforms() {
//     this.platforms = this.physics.add.staticGroup();

//     // GROUND (full width bottom)
//     this.platforms.create(512, 590, 'ground-tile').setScale(16, 1).refreshBody();

//     // 10 FLOATING PLATFORMS (connect zones)
//     const platformPositions = [
//       [300, 500], [600, 450], [900, 500], [1200, 450],
//       [1500, 500], [1800, 450], [2200, 500], [2500, 450],
//       [2800, 500], [3100, 450]
//     ];

//     platformPositions.forEach(([x, y], i) => {
//       this.platforms.create(x, y, 'platform-basic').setScale(1.5, 1).refreshBody();
//     });
//   }

//   createStars() {
//     this.stars = this.physics.add.group({
//       key: 'star-gold',
//       repeat: 9,  // 10 total stars
//       setXY: { x: 200, y: 0, stepX: 300 }
//     });

//     this.stars.children.iterate((child) => {
//       child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
//     });

//     this.physics.add.collider(this.stars, this.platforms);
//     this.physics.add.overlap(this.player.sprite, this.stars, this.collectStar, null, this);
//   }

//   collectStar(player, star) {
//     star.disableBody(true, true);
//     // Later: Add sound + counter
//   }

//   setupReactCallbacks() {
//     const callbacks = this.game.registry.get('reactCallbacks');
//     if (callbacks) {
//       this.callbacks = callbacks;
//     }
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
//       this.player.sprite.setVelocityX(300);
//       setTimeout(() => {
//         if (this.player.sprite.body) {
//           this.player.sprite.setVelocityX(0);
//         }
//       }, 200);
//     });

//     this.game.registry.events.on('moveBackward', () => {
//       this.player.sprite.setVelocityX(-300);
//       setTimeout(() => {
//         if (this.player.sprite.body) {
//           this.player.sprite.setVelocityX(0);
//         }
//       }, 200);
//     });
//   }

//   // 🎮 HELPER: Add mouse hover to zone
//   addMouseHoverToZone(zone, target) {
//     zone.setInteractive();
    
//     zone.on('pointerover', () => {
//       this.currentInteractTarget = target;
//       this.game.registry.events.emit('mouseHover', target);
//     });

//     zone.on('pointerout', () => {
//       this.currentInteractTarget = null;
//     });
//   }

//   // ZONES 1-4 (MORNING)
//   createZone1Welcome() {
//     this.signboard = this.physics.add.staticImage(200, 450, 'signboard-welcome');
//     const target = { type: 'welcome' };
    
//     this.physics.add.overlap(this.player.sprite, this.signboard, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.signboard, target);
//   }

//   createZone2Education() {
//     this.professorNpc = this.physics.add.staticImage(400, 450, 'npc-professor');
//     const target = { type: 'education' };
    
//     this.physics.add.overlap(this.player.sprite, this.professorNpc, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.professorNpc, target);
//   }

//   createZone3POR() {
//     this.leaderNpc = this.physics.add.staticImage(600, 450, 'npc-leader');
//     const target = { type: 'por' };
    
//     this.physics.add.overlap(this.player.sprite, this.leaderNpc, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.leaderNpc, target);
//   }

//   createZone4HobbiesDoor() {
//     this.hobbiesDoor = this.physics.add.staticImage(800, 450, 'door-hobbies');
//     const target = { type: 'hobbiesDoor' };
    
//     this.physics.add.overlap(this.player.sprite, this.hobbiesDoor, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.hobbiesDoor, target);
//   }

//   // ZONES 5-8 (AFTERNOON)
//   createZone5LibraryDoor() {
//     this.libraryDoor = this.physics.add.staticImage(1000, 450, 'door-hobbies');
//     this.libraryDoor.setTint(0x8B4513); // Brown tint for library
//     const target = { type: 'libraryDoor' };
    
//     this.physics.add.overlap(this.player.sprite, this.libraryDoor, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.libraryDoor, target);
//   }

//   createZone6IITBKiosk() {
//     this.iitbKiosk = this.physics.add.staticImage(1200, 450, 'info-kiosk');
//     const target = { type: 'iitbInfo' };
    
//     this.physics.add.overlap(this.player.sprite, this.iitbKiosk, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.iitbKiosk, target);
//   }

//   createZone7Skills() {
//     // Glowing orb (scale animation)
//     this.skillsOrb = this.add.image(1400, 450, 'star-rainbow').setScale(2);
//     this.tweens.add({
//       targets: this.skillsOrb,
//       scale: 2.5,
//       angle: 360,
//       duration: 3000,
//       repeat: -1,
//       yoyo: true
//     });

//     this.skillsPreview = this.physics.add.staticGroup();
//     ['icon-react', 'icon-python', 'icon-docker', 'icon-pytorch', 'icon-vhdl']
//       .forEach((icon, i) => {
//         this.skillsPreview.create(1350 + i * 40, 420, icon).setScale(0.5);
//       });

//     const target = { type: 'skills' };
//     this.physics.add.overlap(this.player.sprite, this.skillsOrb, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover - need to make orb interactive
//     this.skillsOrb.setInteractive();
//     this.skillsOrb.on('pointerover', () => {
//       this.currentInteractTarget = target;
//       this.game.registry.events.emit('mouseHover', target);
//     });
//     this.skillsOrb.on('pointerout', () => {
//       this.currentInteractTarget = null;
//     });
//   }

//   createZone8ProjectsDoor() {
//     this.projectsDoor = this.physics.add.staticImage(1600, 450, 'door-large');
//     const target = { type: 'projectsDoor' };
    
//     this.physics.add.overlap(this.player.sprite, this.projectsDoor, 
//       () => this.currentInteractTarget = target, null, this);
    
//     // 🎮 Add mouse hover
//     this.addMouseHoverToZone(this.projectsDoor, target);
//   }

//   handleInteraction(target) {
//     if (!this.callbacks) return;

//     switch (target.type) {
//       case 'welcome':
//         this.callbacks.openWelcomeModal();
//         break;

//       case 'education':
//         this.callbacks.openEducationModal();
//         break;

//       case 'por':
//         this.callbacks.openLeadershipModal();
//         break;

//       case 'hobbiesDoor':
//         this.scene.start('Level1HobbiesScene');
//         break;

//       case 'libraryDoor':
//         this.scene.start('Level1LibraryScene');
//         break;

//       case 'iitbInfo':
//         this.callbacks.openIITBModal();
//         break;

//       case 'skills':
//         this.callbacks.openInfoModal({
//           title: '⭐ Skills Showcase',
//           content: 'Collect 60+ skills across 4 zones!\n\nReact • Python • Docker • PyTorch • VHDL\nNode.js • MySQL • OpenCV • YOLOv8'
//         });
//         break;

//       case 'projectsDoor':
//         this.scene.start('Level2Scene');
//         break;
//     }

//     // Clear target after interaction
//     this.currentInteractTarget = null;
//   }

//   update() {
//     this.player.update();

//     // E KEY INTERACTION (still works!)
//     if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
//       this.handleInteraction(this.currentInteractTarget);
//     }

//     // VISUAL FEEDBACK (optional - glow effect near interactables)
//     if (this.currentInteractTarget) {
//       // Add glow tween to current target
//     }
//   }
// }













import Phaser from 'phaser';
import Player from '../entities/Player';

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1Scene');
  }

  create() {
    // ✨ FIXED BACKGROUND (doesn't scroll with camera)
    this.bg = this.add.image(640, 360, 'bg');
    this.bg.setDisplaySize(1280, 720);
    this.bg.setScrollFactor(0);
    this.bg.setAlpha(0.8);
    this.bg.setDepth(-10);

    // Add floating particles
    this.createFloatingParticles();

    // Platforms
    this.createPlatforms();

    // Player spawn
    this.player = new Player(this, 100, 360);
    this.physics.add.collider(this.player, this.platforms);

    // Extend world + camera
    this.physics.world.setBounds(0, 0, 2750, 720);
    this.cameras.main.setBounds(0, 0, 2750, 720);
    this.cameras.main.startFollow(this.player);

    // Input
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentInteractTarget = null;

    // Create all 8 zones
    this.createZone1Welcome();
    this.createZone2Education();
    this.createZone3POR();
    this.createZone4HobbiesDoor();
    this.createZone5LibraryDoor();
    this.createZone6IITBKiosk();
    this.createZone7Skills();
    this.createZone8ProjectsDoor();

    // Stars only on platforms
    this.createStarsOnPlatforms();

    // Beautiful title
    this.createTitle();

    // Instructions
    this.createInstructions();

    // React callbacks
    this.setupReactCallbacks();

    // Cleanup on shutdown
    this.events.on('shutdown', this.cleanup, this);
  }

  // 🧹 CLEANUP (Global events handled in index.js)
  cleanup() {
    // No cleanup needed - global movement system handles everything
  }

  createFloatingParticles() {
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 2750;
      const y = Math.random() * 400;
      const particle = this.add.circle(x, y, 3, 0xff6b9d, 0.6);
      
      this.tweens.add({
        targets: particle,
        y: y + 50,
        x: x + (Math.random() - 0.5) * 100,
        alpha: 0.2,
        duration: 3000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  createTitle() {
    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x1a1a2e, 0.9);
    titleBg.fillRoundedRect(30, 30, 500, 100, 15);
    titleBg.lineStyle(4, 0xff6b9d, 1);
    titleBg.strokeRoundedRect(30, 30, 500, 100, 15);
    titleBg.setScrollFactor(0);

    this.add.text(50, 50, '🎮 Krishna\'s Portfolio World', {
      fontSize: '28px',
      color: '#ff6b9d',
      fontStyle: 'bold'
    }).setScrollFactor(0);

    this.add.text(50, 90, 'IIT Bombay • Dual Degree • Roll 22B3968', {
      fontSize: '14px',
      color: '#cccccc',
      fontStyle: 'italic'
    }).setScrollFactor(0);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    // Ground
    const ground = this.platforms.create(1375, 710, 'ground-tile');
    ground.setScale(80, 1).refreshBody().setAlpha(0);

    // Store platform positions for star placement
    this.platformPositions = [
      { x: 300, y: 520 },
      { x: 600, y: 480 },
      { x: 950, y: 520 },
      { x: 1300, y: 480 },
      { x: 1650, y: 540 },
      { x: 1950, y: 500 },
      { x: 2250, y: 540 },
      { x: 2550, y: 500 }
    ];

    this.platformPositions.forEach(({ x, y }) => {
      // Shadow
      this.add.ellipse(x, y + 10, 150, 20, 0x000000, 0.4).setDepth(-1);

      const platform = this.platforms.create(x, y, 'platform-basic');
      platform.setScale(1.5, 1).refreshBody();
      platform.setTint(0xff6b9d);

      // Glow
      const glow = this.add.ellipse(x, y, 160, 50, 0xff6b9d, 0.3);
      glow.setDepth(-1);
      this.tweens.add({
        targets: glow,
        scaleX: 1.2,
        alpha: 0.5,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      // Floating animation
      this.tweens.add({
        targets: platform,
        y: y - 6,
        duration: 2000 + Math.random() * 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createStarsOnPlatforms() {
    this.stars = this.physics.add.group();

    this.platformPositions.forEach(pos => {
      const star = this.stars.create(pos.x, pos.y - 80, 'star-gold');
      star.setBounceY(0.3);
      star.setScale(0.8);

      // Spinning animation
      this.tweens.add({
        targets: star,
        angle: 360,
        duration: 2000,
        repeat: -1,
        ease: 'Linear'
      });

      // Glow around star
      const starGlow = this.add.ellipse(pos.x, pos.y - 80, 40, 40, 0xffd700, 0.5);
      starGlow.setDepth(-1);
      this.tweens.add({
        targets: starGlow,
        scaleX: 1.3,
        scaleY: 1.3,
        alpha: 0.2,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    
    // Particle burst
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const particle = this.add.circle(star.x, star.y, 5, 0xffd700, 1);
      
      this.tweens.add({
        targets: particle,
        x: star.x + Math.cos(angle) * 50,
        y: star.y + Math.sin(angle) * 50,
        alpha: 0,
        duration: 500,
        onComplete: () => particle.destroy()
      });
    }

    const collectText = this.add.text(star.x, star.y, '+10 ⭐', {
      fontSize: '24px',
      color: '#ffd700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.tweens.add({
      targets: collectText,
      y: star.y - 50,
      alpha: 0,
      duration: 1200,
      onComplete: () => collectText.destroy()
    });
  }

  createInstructions() {
    const controlsBg = this.add.graphics();
    controlsBg.fillStyle(0x000000, 0.85);
    controlsBg.fillRoundedRect(30, 650, 380, 45, 10);
    controlsBg.setScrollFactor(0);

    this.add.text(50, 672, '🖱️ Hover=Instant | 📱 ←→/A/D/↑ | ⌨️ WASD+E', {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 2
    }).setScrollFactor(0);
  }

  setupReactCallbacks() {
    const callbacks = this.game.registry.get('reactCallbacks');
    if (callbacks) {
      this.callbacks = callbacks;
    }
  }

  // Zone creators (ALL WITH HOVER!)
  createZone1Welcome() {
    this.createBeautifulCard({
      x: 300, y: 440, icon: '🎓', label: 'Welcome',
      description: 'About Me', color: 0x7c3aed,
      target: { type: 'welcome' }
    });
  }

  createZone2Education() {
    this.createBeautifulCard({
      x: 600, y: 400, icon: '👨‍🏫', label: 'Education',
      description: 'Academic Info', color: 0x3b82f6,
      target: { type: 'education' }
    });
  }

  createZone3POR() {
    this.createBeautifulCard({
      x: 950, y: 440, icon: '🏅', label: 'Leadership',
      description: 'Positions', color: 0xf59e0b,
      target: { type: 'por' }
    });
  }

  createZone4HobbiesDoor() {
    this.createBeautifulCard({
      x: 1300, y: 400, icon: '🎮', label: 'Hobbies',
      description: 'Enter Room', color: 0x8b5cf6,
      target: { type: 'hobbiesDoor' }, isDoor: true
    });
  }

  createZone5LibraryDoor() {
    this.createBeautifulCard({
      x: 1650, y: 460, icon: '📚', label: 'Library',
      description: 'Coursework', color: 0x10b981,
      target: { type: 'libraryDoor' }, isDoor: true
    });
  }

  createZone6IITBKiosk() {
    this.createBeautifulCard({
      x: 1950, y: 420, icon: '🏛️', label: 'IIT Bombay',
      description: 'Campus Info', color: 0x06b6d4,
      target: { type: 'iitbInfo' }
    });
  }

  createZone7Skills() {
    this.skillsOrb = this.add.image(2250, 420, 'star-rainbow').setScale(2.5);
    this.tweens.add({
      targets: this.skillsOrb,
      scale: 3, duration: 2000, yoyo: true, repeat: -1
    });

    this.createBeautifulCard({
      x: 2250, y: 520, icon: '⚡', label: 'Skills',
      description: 'Tech Stack', color: 0xec4899,
      target: { type: 'skills' }
    });
  }

  createZone8ProjectsDoor() {
    this.createBeautifulCard({
      x: 2550, y: 420, icon: '🚀', label: 'Projects',
      description: 'Gateway', color: 0xef4444,
      target: { type: 'projectsDoor' }, isDoor: true, isLarge: true
    });
  }

  createBeautifulCard(config) {
    const { x, y, icon, label, description, color, target, isDoor, isLarge } = config;
    const cardWidth = isLarge ? 180 : 140;
    const cardHeight = 180;

    // Glow
    const glow = this.add.ellipse(x, y, cardWidth + 40, cardHeight + 40, color, 0.3);
    glow.setDepth(-1);
    this.tweens.add({
      targets: glow,
      scaleX: 1.3, scaleY: 1.3, alpha: 0.5,
      duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    // Shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.5);
    shadow.fillRoundedRect(x - cardWidth/2 + 8, y - cardHeight/2 + 8, cardWidth, cardHeight, 12);

    // Card
    const card = this.add.graphics();
    card.fillStyle(color, 0.25);
    card.fillRoundedRect(x - cardWidth/2, y - cardHeight/2, cardWidth, cardHeight, 12);
    card.lineStyle(4, color, 1);
    card.strokeRoundedRect(x - cardWidth/2, y - cardHeight/2, cardWidth, cardHeight, 12);

    // Top bar
    const topBar = this.add.graphics();
    topBar.fillStyle(color, 0.9);
    topBar.fillRoundedRect(x - cardWidth/2, y - cardHeight/2, cardWidth, 45, { tl: 12, tr: 12, bl: 0, br: 0 });

    // Icon
    const iconText = this.add.text(x, y - 50, icon, { fontSize: '48px' }).setOrigin(0.5);

    // Label
    const labelText = this.add.text(x, y + 15, label, {
      fontSize: '18px', color: '#ffffff', fontStyle: 'bold',
      stroke: '#000000', strokeThickness: 3
    }).setOrigin(0.5);

    // Description
    const descText = this.add.text(x, y + 40, description, {
      fontSize: '12px', color: '#cccccc'
    }).setOrigin(0.5);

    // Hint
    const hint = this.add.text(x, y + 70, isDoor ? '👆 Hover →' : '👆 Hover', {
      fontSize: '13px', color: '#00ff00', fontStyle: 'bold',
      backgroundColor: '#00000099', padding: { x: 8, y: 4 }
    }).setOrigin(0.5).setVisible(false);

    // 🖱️ INTERACTIVE ZONE + HOVER
    const zone = this.add.zone(x, y, cardWidth, cardHeight);
    this.physics.world.enable(zone);
    zone.body.setAllowGravity(false);
    zone.body.moves = false;
    zone.setInteractive();

    // 👆 MOUSE HOVER AUTO-TRIGGER
    zone.on('pointerover', () => {
      this.currentInteractTarget = target;
      hint.setVisible(true);
      this.handleInteraction(target);
    });
    
    zone.on('pointerout', () => {
      hint.setVisible(false);
    });

    // PLAYER OVERLAP (backup for E key)
    this.physics.add.overlap(this.player, zone, () => {
      this.currentInteractTarget = target;
      hint.setVisible(true);
    }, null, this);

    // Hide hint when far
    this.events.on('update', () => {
      if (!this.player) return;
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, x, y);
      if (distance > 110) {
        hint.setVisible(false);
        if (this.currentInteractTarget === target) {
          this.currentInteractTarget = null;
        }
      }
    });

    // Floating animation
    this.tweens.add({
      targets: [shadow, card, topBar, iconText, labelText, descText],
      y: '-=8', duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });
  }

  showSimplePopup(title, content) { 
    alert(`${title}\n\n${content}`); 
  }

  handleInteraction(target) {
    if (!target) return;

    const callbacks = this.game.registry.get('reactCallbacks');

    switch (target.type) {
      case 'welcome':
        if (callbacks && callbacks.openWelcomeModal) {
          callbacks.openWelcomeModal();
        } else {
          this.showSimplePopup('Welcome', 'Name: Krishna Kumar Singh\nRoll: 22B3968\nDegree: Dual Degree EE, IIT Bombay');
        }
        break;
        
      case 'education': 
        if (callbacks && callbacks.openEducationModal) {
          callbacks.openEducationModal();
        }
        break;
        
      case 'por': 
        if (callbacks && callbacks.openLeadershipModal) {
          callbacks.openLeadershipModal();
        }
        break;
        
      case 'hobbiesDoor': 
        this.scene.start('Level1HobbiesScene'); 
        break;
        
      case 'libraryDoor': 
        this.scene.start('Level1LibraryScene'); 
        break;
        
      case 'iitbInfo': 
        if (callbacks && callbacks.openIITBModal) {
          callbacks.openIITBModal();
        }
        break;
        
      case 'skills':
        this.showSimplePopup('Skills', 'Collect skills across all levels!');
        break;
        
      case 'projectsDoor': 
        this.scene.start('Level2Scene'); 
        break;
    }
    
    this.currentInteractTarget = null;
  }

  update() {
    // Update player (handles WASD movement)
    if (this.player && this.player.update) {
      this.player.update();
    }

    // ⌨️ E KEY INTERACTION (backup)
    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      this.handleInteraction(this.currentInteractTarget);
    }
  }
}