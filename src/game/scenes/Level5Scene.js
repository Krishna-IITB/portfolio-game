// CREATE NEW FILE: src/game/scenes/Level5Scene.js
import Phaser from 'phaser';
import Player from '../entities/Player';
import projects from '../../data/projects.json';

export default class Level5Scene extends Phaser.Scene {
  constructor() {
    super('Level5Scene');
    this.isDarkMode = false;
  }

  create() {
    // VS Code theme background
    const bg = this.add.image(1600, 360, 'level5-code-editor');
    bg.setDisplaySize(3200, 720);
    bg.setScrollFactor(0);
    bg.setAlpha(0.6);

    // Dark overlay (VS Code dark theme)
    this.darkOverlay = this.add.rectangle(1600, 360, 3200, 720, 0x1e1e1e, 0.5);
    this.darkOverlay.setScrollFactor(0);

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
    this.createThemeChest();
    this.createReactKeepComputer();
    this.createTechCollectibles();
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

    // Bouncy cloud platforms (trampoline effect)
    const platformData = [
      { x: 400, y: 540 },
      { x: 700, y: 480 },
      { x: 1000, y: 420 },
      { x: 1400, y: 380 },
      { x: 1800, y: 420 },
      { x: 2200, y: 480 },
      { x: 2600, y: 540 }
    ];

    platformData.forEach((p, i) => {
      const plat = this.platforms.create(p.x, p.y, 'platform-cloud');
      plat.setScale(1.5, 1).refreshBody();
      plat.setTint(0x61dafb); // React blue tint
      
      // Bounce animation
      this.tweens.add({
        targets: plat,
        y: p.y - 10,
        duration: 1500 + (i * 100),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });
    });
  }

  createTitleCard() {
    const x = 300, y = 200;

    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x282c34, 0.95); // VS Code dark
    titleBg.fillRoundedRect(x - 180, y - 90, 360, 180, 15);
    titleBg.lineStyle(3, 0x61dafb, 1); // React blue
    titleBg.strokeRoundedRect(x - 180, y - 90, 360, 180, 15);
    titleBg.setDepth(5);

    this.add.text(x, y - 50, '⚛️', { fontSize: '40px' }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y, 'REACT KEEP', {
      fontSize: '26px',
      color: '#61dafb',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y + 35, 'Note-Taking App', {
      fontSize: '15px',
      color: '#abb2bf'
    }).setOrigin(0.5).setDepth(7);
  }

  createThemeChest() {
    const x = 1000, y = 320;

    // Chest background
    const chestBg = this.add.graphics();
    chestBg.fillStyle(0x3b82f6, 0.2);
    chestBg.fillRoundedRect(x - 80, y - 60, 160, 120, 15);
    chestBg.lineStyle(3, 0x3b82f6, 1);
    chestBg.strokeRoundedRect(x - 80, y - 60, 160, 120, 15);
    chestBg.setDepth(8);

    // Chest icon
    const chestIcon = this.add.text(x, y - 20, '🎨', {
      fontSize: '48px'
    }).setOrigin(0.5).setDepth(10);

    // Label
    this.add.text(x, y + 35, 'THEME TOGGLE', {
      fontSize: '14px',
      color: '#3b82f6',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(10);

    // Pulse animation
    this.tweens.add({
      targets: chestIcon,
      scale: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    // Interactive zone
    this.themeChest = this.add.zone(x, y, 160, 120).setInteractive();
    this.physics.world.enable(this.themeChest);
    this.themeChest.body.setAllowGravity(false);
    this.themeChest.body.moves = false;

    this.themeChest.on('pointerdown', () => {
      this.toggleTheme();
    });

    this.physics.add.overlap(this.player, this.themeChest, () => {
      this.currentInteractTarget = { type: 'themeChest' };
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    // Animate theme change
    this.tweens.add({
      targets: this.darkOverlay,
      alpha: this.isDarkMode ? 0.8 : 0.5,
      fillColor: this.isDarkMode ? 0x0d1117 : 0x1e1e1e,
      duration: 500
    });

    // Show notification
    const themeText = this.add.text(1000, 250, 
      `${this.isDarkMode ? '🌙 Dark' : '☀️ Light'} Mode`, {
      fontSize: '20px',
      color: this.isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: this.isDarkMode ? '#000000aa' : '#ffffffaa',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5).setDepth(100);

    this.tweens.add({
      targets: themeText,
      y: 220,
      alpha: 0,
      duration: 1500,
      onComplete: () => themeText.destroy()
    });
  }

  createReactKeepComputer() {
    const x = 1600, y = 400;

    // Computer desk card
    const computerBg = this.add.graphics();
    computerBg.fillStyle(0x1e293b, 0.95);
    computerBg.fillRoundedRect(x - 220, y - 150, 440, 300, 20);
    computerBg.lineStyle(4, 0x61dafb, 1);
    computerBg.strokeRoundedRect(x - 220, y - 150, 440, 300, 20);
    computerBg.setDepth(8);

    // Computer image
    const computerImg = this.add.image(x, y - 70, 'computer-desk');
    computerImg.setScale(1.5);
    computerImg.setDepth(10);

    // Title
    this.add.text(x, y + 10, 'REACT KEEP', {
      fontSize: '24px',
      color: '#61dafb',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(10);

    // Features
    const features = ['📝 Note Taking', '🎨 Rich Formatting', '🔍 Search & Filter'];
    features.forEach((feature, i) => {
      this.add.text(x, y + 45 + (i * 22), feature, {
        fontSize: '13px',
        color: '#e2e8f0'
      }).setOrigin(0.5).setDepth(10);
    });

    // Click hint
    const hint = this.add.text(x, y + 135, '👆 CLICK FOR PROJECT', {
      fontSize: '14px',
      color: '#61dafb',
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
    this.reactComputer = this.add.zone(x, y, 440, 300).setInteractive();
    this.physics.world.enable(this.reactComputer);
    this.reactComputer.body.setAllowGravity(false);
    this.reactComputer.body.moves = false;

    this.reactComputer.on('pointerdown', () => {
      const project = projects.find(p => p.id === 4); // React Keep
      if (project && this.callbacks?.openProjectModal) {
        this.callbacks.openProjectModal(project);
      }
    });

    this.physics.add.overlap(this.player, this.reactComputer, () => {
      this.currentInteractTarget = { type: 'reactComputer' };
    });
  }

  createTechCollectibles() {
    const collectibles = [
      { x: 700, y: 400, icon: 'icon-react', label: 'React' },
      { x: 1400, y: 300, icon: 'icon-tailwind', label: 'Tailwind' },
      { x: 2200, y: 400, icon: 'icon-javascript', label: 'JavaScript' }
    ];

    this.techIcons = this.physics.add.group();

    collectibles.forEach((c, i) => {
      const icon = this.techIcons.create(c.x, c.y, c.icon);
      icon.setScale(0.6);
      icon.body.setAllowGravity(false);

      // Float animation
      this.tweens.add({
        targets: icon,
        y: c.y - 15,
        angle: 10,
        duration: 2000 + (i * 300),
        yoyo: true,
        repeat: -1
      });

      // Glow
      const glow = this.add.circle(c.x, c.y, 40, 0x61dafb, 0.2);
      glow.setDepth(icon.depth - 1);
      this.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.05,
        duration: 1500,
        yoyo: true,
        repeat: -1
      });
    });

    // Collect icons
    this.physics.add.overlap(this.player, this.techIcons, (player, icon) => {
      icon.disableBody(true, true);
      
      const collectText = this.add.text(icon.x, icon.y - 30, '+Tech Skill', {
        fontSize: '16px',
        color: '#61dafb',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4
      }).setOrigin(0.5);

      this.tweens.add({
        targets: collectText,
        y: icon.y - 60,
        alpha: 0,
        duration: 1000,
        onComplete: () => collectText.destroy()
      });
    });
  }

  createNavigationDoors() {
    this.createDoor(100, 580, '← Level 4', 0xfbbf24, 'Level4Scene');
    this.createDoor(3100, 580, '→ Level 6', 0x10b981, 'Level6Scene');
  }

  createDoor(x, y, label, color, targetScene) {
    const doorBg = this.add.graphics();
    doorBg.fillStyle(color, 0.2);
    doorBg.fillRoundedRect(x - 70, y - 100, 140, 180, 15);
    doorBg.lineStyle(3, color, 1);
    doorBg.strokeRoundedRect(x - 70, y - 100, 140, 180, 15);
    doorBg.setDepth(5);

    const door = this.physics.add.staticImage(x, y, 'door-large');
    door.setScale(1.2).setInteractive();
    door.setDepth(6);

    // Glow
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
    hud.fillRoundedRect(30, 30, 750, 70, 15);
    hud.lineStyle(2, 0x61dafb, 1);
    hud.strokeRoundedRect(30, 30, 750, 70, 15);
    hud.setScrollFactor(0).setDepth(100);

    this.add.text(50, 45, '⚛️ REACT KEEP - CODE EDITOR', {
      fontSize: '20px',
      color: '#61dafb',
      fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(101);

    this.add.text(50, 70, 'Click Computer = Project | Click Chest = Toggle Theme | Collect Skills', {
      fontSize: '14px',
      color: '#ffffff'
    }).setScrollFactor(0).setDepth(101);
  }

  update() {
    if (this.player?.update) this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'themeChest') {
        this.toggleTheme();
      } else if (this.currentInteractTarget.type === 'reactComputer') {
        const project = projects.find(p => p.id === 4);
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
