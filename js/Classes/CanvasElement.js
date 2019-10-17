import config from '../config.js'

class CanvasElement {
  constructor(xPos, yPos, width, height, img) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height || width;
    this.img = img || null;
    this.angle = 0; // angle de rotation de l'élément
    this.vy = 0; // la vélocité de l'élément
    this.vx = 0;
    this.canJump = false;
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
    this.angle += this.vx
  
    this.checkCollisions();
  }

  checkCollisions() {
    if (this.yPos + this.height > config.canvas.height) {
      // si l'objet rentre en collision avec le sol
      
      this.yPos = config.canvas.height - this.height;
      this.vy *= config.bounceFactor;
      this.canJump = true;
    }
  }

}


export default CanvasElement