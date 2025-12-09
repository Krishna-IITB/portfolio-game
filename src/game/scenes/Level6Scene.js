// REPLACE ENTIRE src/game/scenes/Level6Scene.js
import Phaser from 'phaser';
import Player from '../entities/Player';
import projects from '../../data/projects.json';

export default class Level6Scene extends Phaser.Scene {
  constructor() {
    super('Level6Scene');
  }

  create() {
    const bg = this.add.image(1600, 360, 'level7-circuit');
    bg.setDisplaySize(3200, 720);
    bg.setScrollFactor(0);
    bg.setAlpha(0.6);

    this.add.rectangle(1600, 360, 3200, 720, 0x0a1628, 0.4).setScrollFactor(0);

    this.drawCircuitTraces();
    this.createPlatforms();

    this.player = new Player(this, 200, 500);
    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 3200, 720);
    this.physics.world.setBounds(0, 0, 3200, 720);

    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.currentInteractTarget = null;
    this.callbacks = this.game.registry.get('reactCallbacks') || null;

    this.createTitleCard();
    this.createDisappearingPlatforms();
    this.createModelSimChip();
    this.createVHDLCollectibles();
    this.createNavigationDoors();
    this.createInstructions();

    this.events.on('shutdown', this.cleanup, this);
  }

  cleanup() {}

  drawCircuitTraces() {
    const traces = this.add.graphics();
    traces.lineStyle(2, 0x3b82f6, 0.3);
    traces.setScrollFactor(0);

    for (let y = 100; y <= 620; y += 120) {
      traces.lineBetween(0, y, 3200, y);
    }

    for (let x = 150; x <= 3050; x += 200) {
      traces.lineBetween(x, 0, x, 720);
      
      for (let y = 100; y <= 620; y += 120) {
        traces.fillStyle(0x3b82f6, 0.6);
        traces.fillCircle(x, y, 4);
      }
    }

    traces.setDepth(1);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    const ground = this.platforms.create(1600, 690, 'ground-tile');
    ground.setScale(110, 1).refreshBody().setAlpha(0);

    const staticData = [
      { x: 400, y: 540 },
      { x: 2200, y: 460 },
      { x: 2800, y: 520 }
    ];

    staticData.forEach(p => {
      const plat = this.platforms.create(p.x, p.y, 'platform-metal');
      plat.setScale(1.8, 1).refreshBody();
      plat.setTint(0x3b82f6);
    });
  }

  createTitleCard() {
    const x = 300, y = 180;

    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x0a1628, 0.95);
    titleBg.fillRoundedRect(x - 180, y - 90, 360, 180, 15);
    titleBg.lineStyle(3, 0x3b82f6, 1);
    titleBg.strokeRoundedRect(x - 180, y - 90, 360, 180, 15);
    titleBg.setDepth(5);

    this.add.text(x, y - 50, '⚡', { fontSize: '40px' }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y, 'RISC PROCESSOR', {
      fontSize: '26px',
      color: '#3b82f6',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y + 35, '6-Stage Pipeline', {
      fontSize: '15px',
      color: '#94a3b8'
    }).setOrigin(0.5).setDepth(7);
  }

  createDisappearingPlatforms() {
    const hazardData = [
      { x: 800, y: 480, phase: 0 },
      { x: 1100, y: 420, phase: 1000 },
      { x: 1400, y: 380, phase: 2000 },
      { x: 1700, y: 420, phase: 1500 },
      { x: 2000, y: 480, phase: 500 }
    ];

    this.disappearingPlatforms = [];

    hazardData.forEach((h, i) => {
      const plat = this.platforms.create(h.x, h.y, 'platform-cloud');
      plat.setScale(1.5, 1).refreshBody();
      plat.setTint(0xfbbf24);

      this.disappearingPlatforms.push(plat);

      const warning = this.add.text(h.x, h.y - 40, '⚠️ Pipeline Hazard', {
        fontSize: '12px',
        color: '#fbbf24',
        backgroundColor: '#000000aa',
        padding: { x: 6, y: 3 }
      }).setOrigin(0.5).setDepth(10);

      this.time.addEvent({
        delay: 2000,
        startAt: h.phase,
        callback: () => {
          plat.setAlpha(0);
          plat.body.checkCollision.none = true;
          warning.setAlpha(0);

          this.time.delayedCall(1000, () => {
            plat.setAlpha(1);
            plat.body.checkCollision.none = false;
            warning.setAlpha(1);
          });
        },
        loop: true
      });
    });
  }

  createModelSimChip() {
    const x = 1600, y = 350;

    const panel = this.add.graphics();
    panel.fillStyle(0x0a1628, 0.95);
    panel.fillRoundedRect(x - 220, y - 140, 440, 280, 20);
    panel.lineStyle(4, 0x3b82f6, 1);
    panel.strokeRoundedRect(x - 220, y - 140, 440, 280, 20);
    panel.setDepth(8);

    const chip = this.add.image(x, y - 70, 'chip-processor');
    chip.setScale(1.5);
    chip.setDepth(10);

    const pins = this.add.graphics();
    pins.fillStyle(0x3b82f6, 0.8);
    for (let i = 0; i < 8; i++) {
      pins.fillRect(x - 100 + (i * 25), y - 110, 4, 15);
      pins.fillRect(x - 100 + (i * 25), y - 30, 4, 15);
    }
    pins.setDepth(9);

    this.add.text(x, y, 'MODELSIM RISC', {
      fontSize: '24px',
      color: '#3b82f6',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(10);

    const features = ['⚡ 6-Stage Pipeline', '🔧 VHDL Design', '📊 Hazard Detection'];
    features.forEach((feature, i) => {
      this.add.text(x, y + 40 + (i * 22), feature, {
        fontSize: '13px',
        color: '#e2e8f0'
      }).setOrigin(0.5).setDepth(10);
    });

    const hint = this.add.text(x, y + 125, '👆 CLICK FOR PROJECT', {
      fontSize: '14px',
      color: '#3b82f6',
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

    this.tweens.add({
      targets: chip,
      scale: 1.55,
      duration: 1500,
      yoyo: true,
      repeat: -1
    });

    this.modelSimZone = this.add.zone(x, y, 440, 280).setInteractive();
    this.physics.world.enable(this.modelSimZone);
    this.modelSimZone.body.setAllowGravity(false);
    this.modelSimZone.body.moves = false;

    this.modelSimZone.on('pointerdown', () => {
      const project = projects.find(p => p.id === 5); // ✅ RISC project
      if (project && this.callbacks?.openProjectModal) {
        this.callbacks.openProjectModal(project);
      }
    });

    this.physics.add.overlap(this.player, this.modelSimZone, () => {
      this.currentInteractTarget = { type: 'modelsim' };
    });
  }

  createVHDLCollectibles() {
    const vhdlItems = [
      { x: 800, y: 400, icon: 'icon-git', label: 'Fetch' },
      { x: 1100, y: 340, icon: 'icon-linux', label: 'Decode' },
      { x: 1400, y: 300, icon: 'icon-github', label: 'Execute' },
      { x: 1700, y: 340, icon: 'icon-kubernetes', label: 'Memory' },
      { x: 2000, y: 400, icon: 'icon-nginx', label: 'Writeback' }
    ];

    this.vhdlIcons = this.physics.add.group();

    vhdlItems.forEach((item, i) => {
      const icon = this.vhdlIcons.create(item.x, item.y, item.icon);
      icon.setScale(0.6);
      icon.body.setAllowGravity(false);
      icon.setTint(0x3b82f6);

      this.tweens.add({
        targets: icon,
        y: item.y - 15,
        duration: 2000 + (i * 300),
        yoyo: true,
        repeat: -1
      });

      const glow = this.add.circle(item.x, item.y, 40, 0x3b82f6, 0.2);
      glow.setDepth(icon.depth - 1);
      this.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.05,
        duration: 1500,
        yoyo: true,
        repeat: -1
      });

      this.add.text(item.x, item.y - 50, item.label, {
        fontSize: '12px',
        color: '#3b82f6',
        backgroundColor: '#000000aa',
        padding: { x: 6, y: 3 }
      }).setOrigin(0.5);
    });

    this.physics.add.overlap(this.player, this.vhdlIcons, (player, icon) => {
      icon.disableBody(true, true);
      
      const collectText = this.add.text(icon.x, icon.y - 30, '+Pipeline Stage', {
        fontSize: '16px',
        color: '#3b82f6',
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
    this.createDoor(100, 580, '← Level 5', 0x22c55e, 'Level5Scene');
    this.createDoor(3100, 580, '→ Boss Level', 0xa855f7, 'Level7Scene');
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
    hud.fillRoundedRect(30, 30, 850, 70, 15);
    hud.lineStyle(2, 0x3b82f6, 1);
    hud.strokeRoundedRect(30, 30, 850, 70, 15);
    hud.setScrollFactor(0).setDepth(100);

    this.add.text(50, 45, '⚡ RISC PROCESSOR - CIRCUIT BOARD', {
      fontSize: '20px',
      color: '#3b82f6',
      fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(101);

    this.add.text(50, 70, 'Click Chip = Project | Watch for Disappearing Platforms | Collect Pipeline Stages', {
      fontSize: '14px',
      color: '#ffffff'
    }).setScrollFactor(0).setDepth(101);
  }

  update() {
    if (this.player?.update) this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'modelsim') {
        const project = projects.find(p => p.id === 5); // ✅ RISC
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
