import Phaser from "phaser";
import { MainScene } from "./game/MainScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainScene], // ✅ Ensure the scene is listed
  physics: {
    default: "arcade",
    arcade: { gravity: { x: 0, y: 0 }, debug: true },
  },
};

new Phaser.Game(config);