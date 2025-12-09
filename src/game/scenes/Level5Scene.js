// REPLACE ENTIRE src/game/scenes/Level5Scene.js
import Phaser from 'phaser';
import Player from '../entities/Player';
import projects from '../../data/projects.json';

export default class Level5Scene extends Phaser.Scene {
  constructor() {
    super('Level5Scene');
  }

  create() {
    // Network background
    const bg = this.add.image(1600, 360, 'level6-network');
    bg.setDisplaySize(3200, 720);
    bg.setScrollFactor(0);
    bg.setAlpha(0.6);

    // Dark overlay
    this.add.rectangle(1600, 360, 3200, 720, 0x0a0a0a, 0.4).setScrollFactor(0);

    // Network grid
    this.drawNetworkGrid();

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
    this.createPacketHazards();
    this.createWiresharkDisplay();
    this.createAlgorithmCollectibles();
    this.createNavigationDoors();
    this.createInstructions();

    this.events.on('shutdown', this.cleanup, this);
  }

  cleanup() {}

  drawNetworkGrid() {
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x22c55e, 0.15);
    grid.setScrollFactor(0);

    for (let x = 0; x <= 3200; x += 80) {
      grid.lineBetween(x, 0, x, 720);
    }

    for (let y = 0; y <= 720; y += 80) {
      grid.lineBetween(0, y, 3200, y);
    }

    grid.setDepth(1);
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    const ground = this.platforms.create(1600, 690, 'ground-tile');
    ground.setScale(110, 1).refreshBody().setAlpha(0);

    const platformData = [
      { x: 500, y: 540 },
      { x: 900, y: 480 },
      { x: 1300, y: 420 },
      { x: 1700, y: 400 },
      { x: 2100, y: 450 },
      { x: 2500, y: 500 }
    ];

    platformData.forEach(p => {
      const plat = this.platforms.create(p.x, p.y, 'platform-metal');
      plat.setScale(1.8, 1).refreshBody();
      plat.setTint(0x22c55e);
    });
  }

  createTitleCard() {
    const x = 300, y = 180;

    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x020617, 0.95);
    titleBg.fillRoundedRect(x - 180, y - 90, 360, 180, 15);
    titleBg.lineStyle(3, 0x22c55e, 1);
    titleBg.strokeRoundedRect(x - 180, y - 90, 360, 180, 15);
    titleBg.setDepth(5);

    this.add.text(x, y - 50, '🌐', { fontSize: '40px' }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y, 'NETWORK IDS', {
      fontSize: '26px',
      color: '#22c55e',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(7);
    
    this.add.text(x, y + 35, 'Intrusion Detection', {
      fontSize: '15px',
      color: '#94a3b8'
    }).setOrigin(0.5).setDepth(7);
  }

  createPacketHazards() {
    this.packets = this.physics.add.group();

    const lanes = [
      { y: 520, speed: 180, color: 0xff4444 },
      { y: 450, speed: -200, color: 0xff8844 },
      { y: 380, speed: 160, color: 0xffbb44 }
    ];

    lanes.forEach((lane, i) => {
      for (let x = 400; x <= 2600; x += 700) {
        const packet = this.packets.create(x, lane.y, 'network-router');
        packet.setScale(0.5);
        packet.setTint(lane.color);
        packet.body.setAllowGravity(false);
        packet.setVelocityX(lane.speed);
        packet.setBounce(1, 1);
        packet.setCollideWorldBounds(true);

        this.tweens.add({
          targets: packet,
          alpha: 0.6,
          duration: 800,
          yoyo: true,
          repeat: -1
        });
      }
    });

    this.physics.add.collider(this.packets, this.platforms);
    this.physics.add.overlap(this.player, this.packets, () => {
      this.handlePacketHit();
    }, null, this);
  }

  handlePacketHit() {
    const hitText = this.add.text(this.player.x, this.player.y - 40, '⚠️ Packet Drop!', {
      fontSize: '16px',
      color: '#ff4444',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(100);

    this.tweens.add({
      targets: hitText,
      y: hitText.y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => hitText.destroy()
    });

    this.player.setVelocityY(-280);
  }

  createWiresharkDisplay() {
    const x = 1600, y = 380;

    const panel = this.add.graphics();
    panel.fillStyle(0x020617, 0.95);
    panel.fillRoundedRect(x - 220, y - 130, 440, 260, 20);
    panel.lineStyle(4, 0x22c55e, 1);
    panel.strokeRoundedRect(x - 220, y - 130, 440, 260, 20);
    panel.setDepth(8);

    const icon = this.add.image(x, y - 70, 'network-router');
    icon.setScale(1.2);
    icon.setDepth(10);

    this.add.text(x, y + 5, 'WIRESHARK IDS', {
      fontSize: '24px',
      color: '#22c55e',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(10);

    const features = ['🔍 Packet Analysis', '🤖 ML Detection', '📊 95% Accuracy'];
    features.forEach((feature, i) => {
      this.add.text(x, y + 40 + (i * 22), feature, {
        fontSize: '13px',
        color: '#e2e8f0'
      }).setOrigin(0.5).setDepth(10);
    });

    const hint = this.add.text(x, y + 115, '👆 CLICK FOR PROJECT', {
      fontSize: '14px',
      color: '#22c55e',
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

    this.wiresharkZone = this.add.zone(x, y, 440, 260).setInteractive();
    this.physics.world.enable(this.wiresharkZone);
    this.wiresharkZone.body.setAllowGravity(false);
    this.wiresharkZone.body.moves = false;

    this.wiresharkZone.on('pointerdown', () => {
      const project = projects.find(p => p.id === 4); // ✅ IDS project
      if (project && this.callbacks?.openProjectModal) {
        this.callbacks.openProjectModal(project);
      }
    });

    this.physics.add.overlap(this.player, this.wiresharkZone, () => {
      this.currentInteractTarget = { type: 'wireshark' };
    });
  }

  createAlgorithmCollectibles() {
    const algorithms = [
      { x: 900, y: 400, icon: 'icon-scikit', label: 'Naive Bayes' },
      { x: 1700, y: 320, icon: 'icon-numpy', label: 'KNN' },
      { x: 2500, y: 420, icon: 'icon-pandas', label: 'Data Processing' }
    ];

    this.algorithmIcons = this.physics.add.group();

    algorithms.forEach((algo, i) => {
      const icon = this.algorithmIcons.create(algo.x, algo.y, algo.icon);
      icon.setScale(0.6);
      icon.body.setAllowGravity(false);

      this.tweens.add({
        targets: icon,
        y: algo.y - 15,
        duration: 2000 + (i * 300),
        yoyo: true,
        repeat: -1
      });

      const glow = this.add.circle(algo.x, algo.y, 40, 0x22c55e, 0.2);
      glow.setDepth(icon.depth - 1);
      this.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.05,
        duration: 1500,
        yoyo: true,
        repeat: -1
      });

      this.add.text(algo.x, algo.y - 50, algo.label, {
        fontSize: '12px',
        color: '#22c55e',
        backgroundColor: '#000000aa',
        padding: { x: 6, y: 3 }
      }).setOrigin(0.5);
    });

    this.physics.add.overlap(this.player, this.algorithmIcons, (player, icon) => {
      icon.disableBody(true, true);
      
      const collectText = this.add.text(icon.x, icon.y - 30, '+Algorithm', {
        fontSize: '16px',
        color: '#22c55e',
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
    this.createDoor(3100, 580, '→ Level 6', 0x3b82f6, 'Level6Scene');
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
    hud.fillRoundedRect(30, 30, 800, 70, 15);
    hud.lineStyle(2, 0x22c55e, 1);
    hud.strokeRoundedRect(30, 30, 800, 70, 15);
    hud.setScrollFactor(0).setDepth(100);

    this.add.text(50, 45, '🌐 NETWORK IDS - PACKET ANALYSIS', {
      fontSize: '20px',
      color: '#22c55e',
      fontStyle: 'bold'
    }).setScrollFactor(0).setDepth(101);

    this.add.text(50, 70, 'Click Wireshark = Project | Dodge Red Packets | Collect Algorithms', {
      fontSize: '14px',
      color: '#ffffff'
    }).setScrollFactor(0).setDepth(101);
  }

  update() {
    if (this.player?.update) this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.interactKey) && this.currentInteractTarget) {
      if (this.currentInteractTarget.type === 'wireshark') {
        const project = projects.find(p => p.id === 4); // ✅ IDS
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
