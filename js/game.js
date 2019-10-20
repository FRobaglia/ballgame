import GenericCanvasElement from './Classes/GenericCanvasElement.js';
import Rectangle from './Classes/Rectangle.js';
import Sphere from './Classes/Sphere.js';
import Player from './Classes/Player.js';
import config from './config.js';
import watchPressedKeys from './keyboardListeners.js';

let speed = 5;

let image = new Image();
image.onload = drawCanvas;
image.src="../assets/images/ball.jpg";

let player = new Player(65, 65, 75, 75, image);
let rectangle = new Rectangle(0, 0, 50, 50);
let rectangle2 = new Rectangle(150, 0, 150, 150);
let rectangle3 = new Rectangle(350, 0, 150, 150);
config.obstacles.rectangles.push(rectangle, rectangle2, rectangle3)




function drawCanvas() {
  config.ctx.clearRect(0, 0, canvas.width, canvas.height); // On clear le canvas à chaque frame, puis le redessine de 0

  if (speed > 0) {
    player.angle += speed;
    speed -= 0.035;
  }

  player.draw()
  rectangle.draw()
  rectangle2.draw()
  rectangle3.draw()
  watchPressedKeys();

  setTimeout(drawCanvas, 1000/config.framesPerSecond);
}

export default player;