import GenericCanvasElement from './GenericCanvasElement.js';
import config from '../config.js'

class Rectangle extends GenericCanvasElement {

  drawShape() {
    config.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
  }
}

export default Rectangle