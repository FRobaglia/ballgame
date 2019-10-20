import Sphere from "./Sphere.js";
import config from '../config.js';
import player from "../game.js";
import Rectangle from "./Rectangle.js";



class Player extends Sphere {
  goRight() {
    if (this.vx <= config.player.maxSpeed) {
      this.vx < config.player.initialSpeed ? this.vx = config.player.initialSpeed : this.vx += config.player.acceleration;
    }
  }

  goLeft() {
    if (this.vx >= -config.player.maxSpeed) {
      this.vx > -config.player.initialSpeed ? this.vx = -config.player.initialSpeed : this.vx -= config.player.acceleration;
    }
  }

  jump() {
    if (player.isOnGround()) {
      config.sounds.jump.play();
      this.vy = 0;
      this.vy -= config.player.jumpHeight;
    }
  }

  decelerate() {
    if (this.vx > 0.1) {
      this.vx -= config.player.deceleration;
    } else if (this.vx < -0.1) {
      this.vx += config.player.deceleration;
    } else {
      this.vx = 0;
    } 
  }
}

export default Player