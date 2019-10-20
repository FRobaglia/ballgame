import GenericCanvasElement from './GenericCanvasElement.js';
import config from '../config.js'

class Sphere extends GenericCanvasElement {
  drawShape() {    
    config.ctx.save();
    if (this.img) {
      config.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    }
    config.ctx.globalCompositeOperation='destination-in';
    config.ctx.beginPath();
    config.ctx.scale(1, this.height / this.width)
    config.ctx.arc(0, 0, this.width / 2, 2 * Math.PI, false);
    config.ctx.fill();
    config.ctx.globalCompositeOperation='source-over';
    config.ctx.restore();
  }
}

export default Sphere