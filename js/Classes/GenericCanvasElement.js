import config from '../config.js'

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

    console.log(`L'élément ${this.constructor.name} vient d'être instancié`)
  }

  draw() {
    this.applyGravity();
    config.ctx.save();
    config.ctx.translate(this.xPos + this.width / 2, this.yPos + this.width / 2)  
    config.ctx.rotate((Math.PI / 180) * this.angle)
    this.drawShape();
    config.ctx.translate(this.xPos, this.yPos)  
    config.ctx.restore();
  }

  applyGravity() {
    this.vy += config.gravity; // si l'élément est en chute libre, il devient de plus en plus rapide (vélocité)
    this.yPos += this.vy; // la position Y de l'élément est directement impactée par sa vélocité
    this.xPos += this.vx; // la position X de l'élément est directement impactée par sa vélocité
    this.angle += 1.3*this.vx
    
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

  isOnGround() {
    if (this.yPos + this.height >= config.canvas.height) {
      return true;
    }
    return false;
  }

  checkCollisions() {
    
    if (this.wallCollide()) {
      this.getOutsideWall()
    }

    if (this.isOnGround()) {
      // si l'objet rentre en collision avec le sol
      this.bounce();
    }
    config.obstacles.rectangles.forEach(element => {
      if (this.isColliding(element)) {
        this.getOutside(element)
      }
    });

  }
  
  isColliding(element) {
    if (element.xPos < this.xPos + this.width &&
      element.xPos + element.width > this.xPos &&
      element.yPos < this.yPos + this.height &&
      element.height + element.yPos > this.yPos && element !== this) {
      return true;
    }
    return false;
  }

  getOutside(element) {

    if (this.yPosIsBetween(element)) {
      if (this.vx > 0) {
        this.xPos = element.xPos - this.width;
      } else if (this.vx < 0) {
        this.xPos = element.xPos + element.width;
      }
    }

    this.vx = (-this.vx)/config.player.speedLossOnCollision;
    config.sounds.bounce.play();
  }

  yPosIsBetween(element) {
    if (this.yPos < element.yPos - this.height || this.yPos > element.yPos + element.height) {
      return false;
    }
    return true;
  }


  bounce() {
    this.yPos = config.canvas.height - this.height;
    if (this.vy * config.bounceFactor < config.minimumBounce) {
      this.vy *= config.bounceFactor;
    } else {
      this.vy = 0;
    }
  }

  getOutsideWall() {
    config.sounds.bounce.play();
    this.vx = (-this.vx)/config.player.speedLossOnCollision;
    if (this.xPos < 0) { 
      this.xPos = 0;
    } else if (this.xPos + this.width > config.canvas.width) {
      this.xPos = config.canvas.width - this.width
    }
  }
}


export default GenericCanvasElement