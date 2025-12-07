// src/game/entities/Player.js
import Phaser from 'phaser';

const WALK_SPEED = 220;
const JUMP_VELOCITY = -600;  // ✅ CHANGED! (was -420)

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'krishna-idle');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0.1);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  }

  handleInput() {
    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.W) ||
      Phaser.Input.Keyboard.JustDown(this.keys.SPACE);

    const down = this.cursors.down.isDown || this.keys.S.isDown;

    if (left) {
      this.setVelocityX(-WALK_SPEED);
      this.setFlipX(true);
    } else if (right) {
      this.setVelocityX(WALK_SPEED);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (jumpPressed && this.body.blocked.down) {
      this.setVelocityY(JUMP_VELOCITY);
    }

    if (down && !this.body.blocked.down) {
      this.setVelocityY(this.body.velocity.y + 20);
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.handleInput();
  }
}
