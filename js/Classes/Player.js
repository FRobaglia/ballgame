import Sphere from "./Sphere.js";
import config from '../config.js';



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
    if (this.canJump) {
      console.log(`${this.constructor.name} vient de sauter`)
      this.vy -= config.player.jumpSpeed;
      if (this.vy < -config.player.jumpHeight) {
        this.canJump = false;
      }
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