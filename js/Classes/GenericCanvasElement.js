import config from "../config.js";

class GenericCanvasElement {
  constructor(xPos, yPos, width, height, img) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height || width;
    this.img = img || null;
    this.angle = 0; // angle de rotation de l'élément
    this.vy = 0; // la vélocité de l'élément
    this.vx = 0;

    this.oldState = {
      xPos: xPos,
      yPos: yPos,
      vx: 0,
      vy: 0
    }

    console.log(`L'élément ${this.constructor.name} vient d'être instancié`);
  }

  draw() {
    this.applyGravity();
    config.ctx.save();
    config.ctx.translate(
      this.xPos + this.width / 2,
      this.yPos + this.width / 2
    );
    config.ctx.rotate((Math.PI / 180) * this.angle);
    this.drawShape();
    config.ctx.translate(this.xPos, this.yPos);
    config.ctx.restore();
  }

  applyGravity() {
    this.saveState();
    this.vy += config.gravity; // si l'élément est en chute libre, il devient de plus en plus rapide (vélocité)
    this.yPos += this.vy; // la position Y de l'élément est directement impactée par sa vélocité
    this.xPos += this.vx; // la position X de l'élément est directement impactée par sa vélocité
    this.angle += 1.3 * this.vx;

    if (this.angle > 360) {
      this.angle -= 360;
    } else if (this.angle < -360) {
      this.angle += 360;
    }

    this.checkCollisions();
  }

  wallCollide() {
    if (this.xPos + this.width > config.canvas.width || this.xPos < 0) {
      return true;
    }
    return false;
  }

  checkCollisions() {
    if (this.wallCollide()) {
      this.getOutsideWall();
    }

    this.isOnGround = false;

    if (this.yPos + this.height >= config.canvas.height) {
      this.isOnGround = true;
    }
    if (this.isOnGround) {
      // si l'objet rentre en collision avec le sol
      this.bounce(config.canvas.height);
    }
    config.obstacles.rectangles.forEach(element => {
      if (this.isColliding(element)) {
        this.getOutside(element);
      }
    });
  }

  isColliding(element) {
    if (element === this) {
      return false; // un élément ne peut pas collide avec lui-même
    }
    if (
      element.xPos < this.xPos + this.width &&
      element.xPos + element.width > this.xPos &&
      element.yPos < this.yPos + this.height &&
      element.height + element.yPos > this.yPos
    ) {
      return true;
    }

    return false;
  }

  getOutside(element) {

    if (this.wasOver(element) || this.wasUnder(element)) {
      if (this.vy > 0) {
        this.bounce(element.yPos)
      } else if (this.vy < 0) {
        this.yPos = element.yPos - element.height
      }
    } 
    else {
      if (this.vx > 0) {
        this.xPos = element.xPos - this.width;
      } else if (this.vx < 0) {
        this.xPos = element.xPos + element.width
      }
      config.sounds.collideX.play();
      this.vx = -this.vx / config.player.speedLossOnCollision;
    }
  }

  wasOver(element) {
    if (element.yPos - this.height >= this.oldState.yPos) {
      return true; // this était au dessus de l'élément en argument à la frame d'avant
    }
    return false;
  }

  wasUnder(element) {
    if (this.oldState.yPos >= element.yPos + element.height + this.height) {
      return true; // this était en dessous de l'élément en argument à la frame d'avant
    }
    return false;
  }

  bounce(elementYPos) {
    this.isOnGround = true;
    this.yPos = elementYPos - this.height;
    if (this.vy !== 0) {
      if (this.vy * config.bounceFactor < config.minimumBounce) {
        config.sounds.bounce.cloneNode(true).play();
        this.vy *= config.bounceFactor;
      } else {
        this.vy = 0;
      }
    }
  }

  getOutsideWall() {
    config.sounds.collideX.play();
    this.vx = -this.vx / config.player.speedLossOnCollision;
    if (this.xPos < 0) {
      this.xPos = 0;
    } else if (this.xPos + this.width > config.canvas.width) {
      this.xPos = config.canvas.width - this.width;
    }
  }

  saveState() {
    this.oldState.xPos = this.xPos;
    this.oldState.yPos = this.yPos;
    this.oldState.vy = this.vy;
    this.oldState.vx = this.vx;
  }
}

export default GenericCanvasElement;
