import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("player", "logo.png"); // Make sure "logo.png" exists in "public/"
  }

  create() {
    console.log("Scene created");

    // ✅ Create the player only once
    this.player = this.physics.add.sprite(4, 3, "logo.png");
    this.player.setCollideWorldBounds(true);
    this.player.setVisible(true); // Ensure player is visible

    // ✅ Set up keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    } else {
      console.error("Keyboard input not available!");
    }

    // Create a simple ground platform
    const ground = this.physics.add.staticGroup();
    ground.create(40, 80, "player").setScale(2).refreshBody(); // Make it double wide to act as a platform
    
    // Player collides with the ground
    this.physics.add.collider(this.player, ground);
  }

  update() {
    if (!this.player) {
      console.error("Player is undefined in update!");
      return;
    }

    if (!this.cursors) return;

    // Reset velocity
    this.player.setVelocity(0);

    // Movement controls
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    }
  }
}
