import Phaser from 'phaser';
import Player from '../entities/Player';
import skillsData from '../../data/skills.json';

export default class Level1SkillsScene extends Phaser.Scene {
  constructor() {
    super('Level1SkillsScene');
  }

  create() {
    // Background
    const bg = this.add.image(640, 360, 'bg');
    bg.setDisplaySize(1280, 720).setScrollFactor(0).setDepth(-10);

    const overlay = this.add.graphics();
    overlay.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x6a0dad, 0x4b0082, 0.7);
    overlay.fillRect(0, 0, 1280, 720);
    overlay.setDepth(-5);

    // Atmosphere
    this.createAtmosphere();
    this.createCircularPlatforms();

    // Player
    this.player = new Player(this, 150, 620);
    this.physics.add.collider(this.player, this.platforms);

    // Camera
    this.cameras.main.setBounds(0, 0, 1280, 720);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Input
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    // 🎮 MOVEMENT TRACKING
    this.buttonMoving = false;
    this.registerButtonEvents();

    // Content
    this.createCentralSkillsHub();
    this.createSkillCards();
    this.createExitDoor();
    this.createTitle();
    this.createInstructions();

    // Cleanup
    this.events.on('shutdown', this.cleanup, this);
  }

  registerButtonEvents() {
    const events = this.game.registry.events;
    events.off('moveForward');
    events.off('moveBackward');
    events.off('moveLeft');
    events.off('moveRight');
    events.off('jump');

    events.on('moveForward', () => {
      if (!this.player?.sprite?.body) return;
      this.buttonMoving = true;
      this.player.sprite.setVelocityX(400);
      this.player.sprite.setFlipX(false);
      this.time.delayedCall(300, () => {
        if (this.player?.sprite?.body && this.buttonMoving) {
          this.player.sprite.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    events.on('moveBackward', () => {
      if (!this.player?.sprite?.body) return;
      this.buttonMoving = true;
      this.player.sprite.setVelocityX(-400);
      this.player.sprite.setFlipX(true);
      this.time.delayedCall(300, () => {
        if (this.player?.sprite?.body && this.buttonMoving) {
          this.player.sprite.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    events.on('moveLeft', () => {
      if (!this.player?.sprite?.body) return;
      this.buttonMoving = true;
      this.player.sprite.setVelocityX(-250);
      this.player.sprite.setFlipX(true);
      this.time.delayedCall(150, () => {
        if (this.player?.sprite?.body && this.buttonMoving) {
          this.player.sprite.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    events.on('moveRight', () => {
      if (!this.player?.sprite?.body) return;
      this.buttonMoving = true;
      this.player.sprite.setVelocityX(250);
      this.player.sprite.setFlipX(false);
      this.time.delayedCall(150, () => {
        if (this.player?.sprite?.body && this.buttonMoving) {
          this.player.sprite.setVelocityX(0);
          this.buttonMoving = false;
        }
      });
    });

    events.on('jump', () => {
      if (this.player?.sprite?.body?.blocked?.down) {
        this.player.sprite.setVelocityY(-600);
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

  createAtmosphere() {
    // Floating tech particles
    const techIcons = ['⚡', '💻', '🚀', '🎯', '⚙️', '🔥'];
    for (let i = 0; i < 8; i++) {
      const x = 100 + Math.random() * 1080;
      const y = 50 + Math.random() * 250;
      const icon = techIcons[Math.floor(Math.random() * techIcons.length)];
      const particle = this.add.text(x, y, icon, { fontSize: '28px', alpha: 0.4 });
      this.tweens.add({
        targets: particle,
        y: y - 40,
        alpha: 0.7,
        angle: 360,
        duration: 3500 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Energy glows
    [{ x: 200, y: 180 }, { x: 1080, y: 180 }, { x: 640, y: 120 }].forEach(pos => {
      const glow = this.add.ellipse(pos.x, pos.y, 180, 180, 0xff00ff, 0.15);
      this.tweens.add({
        targets: glow,
        scaleX: 1.4,
        scaleY: 1.4,
        alpha: 0.25,
        duration: 2200,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createCircularPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    
    const ground = this.platforms.create(640, 710, 'ground-tile');
    ground.setScale(20, 1).refreshBody().setAlpha(0);
    this.add.rectangle(640, 690, 1280, 60, 0x1a1a2e, 1).setDepth(-1);

    const centerX = 640, centerY = 380, radius = 220;
    const angles = [0, 72, 144, 216, 288]; // 5 positions for 5 skill categories

    angles.forEach((angle, i) => {
      const rad = angle * Math.PI / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY - radius * Math.sin(rad);

      this.add.ellipse(x, y + 40, 110, 22, 0x000000, 0.5).setDepth(-1);
      
      const platform = this.platforms.create(x, y + 30, 'platform-basic');
      platform.setScale(1.3, 0.5).refreshBody().setTint(0x9333ea);
      
      this.tweens.add({
        targets: platform,
        y: y + 24,
        duration: 2200 + (i * 200),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createCentralSkillsHub() {
    const centerX = 640, centerY = 380;
    
    // Central energy core
    const core = this.add.ellipse(centerX, centerY, 220, 220, 0x9333ea, 0.2);
    this.tweens.add({
      targets: core,
      scaleX: 1.3,
      scaleY: 1.3,
      alpha: 0.35,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Rotating skill icons
    const skillIcons = ['⚡', '💻', '🚀', '🎯'];
    skillIcons.forEach((icon, i) => {
      const angle = (i / skillIcons.length) * Math.PI * 2;
      const px = centerX + 90 * Math.cos(angle);
      const py = centerY - 90 * Math.sin(angle);
      const iconText = this.add.text(px, py, icon, { fontSize: '32px' }).setOrigin(0.5);
      this.tweens.add({
        targets: iconText,
        angle: 360,
        duration: 6000,
        repeat: -1,
        ease: 'Linear'
      });
    });

    // Central title
    this.add.text(centerX, 240, '⚡ My Skills', {
      fontSize: '32px',
      color: '#a855f7',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5).setDepth(10);
  }

  createSkillCards() {
    const centerX = 640, centerY = 380, radius = 220;
    
    const categories = [
      { key: 'frontend', angle: 0, icon: '🎨', color: 0x3b82f6, label: 'Frontend' },
      { key: 'backend', angle: 72, icon: '⚙️', color: 0x10b981, label: 'Backend' },
      { key: 'languages', angle: 144, icon: '💻', color: 0xf59e0b, label: 'Languages' },
      { key: 'ml', angle: 216, icon: '🤖', color: 0xec4899, label: 'ML/AI' },
      { key: 'systems', angle: 288, icon: '🛠️', color: 0x8b5cf6, label: 'Tools' }
    ];

    categories.forEach(({ key, angle, icon, color, label }) => {
      const rad = angle * Math.PI / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY - radius * Math.sin(rad);

      const categoryData = skillsData[key];
      if (!categoryData) return;

      const skillCount = categoryData.skills.length;

      // Card background
      const cardBg = this.add.graphics();
      cardBg.fillStyle(color, 0.3);
      cardBg.fillRoundedRect(x - 55, y - 65, 110, 130, 12);
      cardBg.lineStyle(3, color, 1);
      cardBg.strokeRoundedRect(x - 55, y - 65, 110, 130, 12);
      cardBg.setDepth(0);

      // Top bar
      const topBar = this.add.graphics();
      topBar.fillStyle(color, 0.9);
      topBar.fillRoundedRect(x - 55, y - 65, 110, 35, { tl: 12, tr: 12, bl: 0, br: 0 });
      topBar.setDepth(0);

      // Icon
      const iconText = this.add.text(x, y - 35, icon, { fontSize: '36px' }).setOrigin(0.5).setDepth(2);

      // Label
      this.add.text(x, y + 5, label, {
        fontSize: '14px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(2);

      // Skill count
      this.add.text(x, y + 25, `${skillCount} skills`, {
        fontSize: '11px',
        color: '#cccccc',
        backgroundColor: '#00000099',
        padding: { x: 4, y: 2 }
      }).setOrigin(0.5).setDepth(2);

      // Hover hint
      const hint = this.add.text(x, y + 50, '👆 Hover', {
        fontSize: '11px',
        color: '#00ff00',
        backgroundColor: '#00000099',
        padding: { x: 6, y: 3 }
      }).setOrigin(0.5).setDepth(2);

      // Interactive zone
      const zone = this.add.zone(x, y, 110, 130).setInteractive();
      this.physics.world.enable(zone);
      zone.body.setAllowGravity(false);
      zone.body.moves = false;

      // Mouse hover
      zone.on('pointerover', () => {
        hint.setText('Opening...');
        this.openSkillsModal(key, categoryData);
      });
      zone.on('pointerout', () => {
        hint.setText('👆 Hover');
      });

      // Player overlap
      this.physics.add.overlap(this.player, zone, () => {
        this.currentInteractTarget = { type: 'skills', key, data: categoryData };
      });

      // Float animation
      this.tweens.add({
        targets: [cardBg, topBar, iconText],
        y: '-=7',
        duration: 2200 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createExitDoor() {
    const exitX = 80, exitY = 620;
    
    const frame = this.add.graphics();
    frame.fillStyle(0xff4757, 0.3);
    frame.fillRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);
    frame.lineStyle(3, 0xff4757, 1);
    frame.strokeRoundedRect(exitX - 40, exitY - 50, 80, 100, 12);

    this.exitDoor = this.physics.add.staticImage(exitX, exitY, 'door-hobbies');
    this.exitDoor.setScale(0.8).setInteractive();

    this.add.text(exitX, exitY + 60, '← Exit', {
      fontSize: '14px',
      color: '#ff4757',
      fontStyle: 'bold',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    this.exitDoor.on('pointerover', () => this.scene.start('Level1Scene'));
    this.physics.add.overlap(this.player, this.exitDoor, () => {
      this.currentInteractTarget = { type: 'exit' };
    });
  }

  createTitle() {
    const box = this.add.graphics();
    box.fillStyle(0x1a1a2e, 0.9);
    box.fillRoundedRect(30, 30, 400, 90, 12);
    box.lineStyle(3, 0xa855f7, 1);
    box.strokeRoundedRect(30, 30, 400, 90, 12);
    box.setScrollFactor(0);

    this.add.text(50, 50, '⚡ Skills Arena', {
      fontSize: '26px',
      color: '#a855f7',
      fontStyle: 'bold'
    }).setScrollFactor(0);

    this.add.text(50, 85, '👆 Hover categories to explore!', {
      fontSize: '14px',
      color: '#cccccc',
      fontStyle: 'italic'
    }).setScrollFactor(0);
  }

  createInstructions() {
    const bar = this.add.graphics();
    bar.fillStyle(0x000000, 0.85);
    bar.fillRoundedRect(390, 670, 500, 35, 8);
    bar.setScrollFactor(0);

    this.add.text(640, 687, '👆 HOVER = Auto Modal | ←→ Buttons Move | WASD Play', {
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0);
  }

  openSkillsModal(key, categoryData) {
    if (this.callbacks?.openSkillsModal) {
      this.callbacks.openSkillsModal({ key, ...categoryData });
    }
  }

  update() {
    // Keyboard controls (only when not button-moving)
    if (!this.buttonMoving && this.player && this.player.update) {
      this.player.update();
    }

    // E key interaction
    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'exit') {
        this.scene.start('Level1Scene');
      } else if (this.currentInteractTarget.type === 'skills') {
        this.openSkillsModal(this.currentInteractTarget.key, this.currentInteractTarget.data);
      }
      this.currentInteractTarget = null;
    }
  }
}
