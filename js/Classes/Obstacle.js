import GenericCanvasElement from './GenericCanvasElement.js';
import config from '../config.js'

class Obstacle {
  constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height || width
    }

  draw() {
    config.ctx.save();
    config.ctx.translate(
      this.xPos + this.width / 2,
      this.yPos + this.width / 2
    );
    config.ctx.rotate((Math.PI / 180) * this.angle);
    config.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    config.ctx.translate(this.xPos, this.yPos);
    config.ctx.restore();
  }
}

export default Obstacle