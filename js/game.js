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

let player = new Player(175, 175, 75, 75, image);
let rectangle = new Rectangle(175, 175, 50, 50);

function drawCanvas() {
  config.ctx.clearRect(0, 0, canvas.width, canvas.height); // On clear le canvas à chaque frame, puis le redessine de 0

  if (speed > 0) {
    player.angle += speed;
    speed -= 0.035;
  }

  rectangle.draw()
  player.draw()
  watchPressedKeys();

  setTimeout(drawCanvas, 1000/config.framesPerSecond);
}

export default player;