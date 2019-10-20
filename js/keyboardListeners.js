import player from './game.js';
import config from './config.js';

let pressedKeys = {};

window.addEventListener(
  "keydown",
  event => {
    pressedKeys[event.keyCode] = true;
  },
  true
);
window.addEventListener(
  "keyup",
  event => {
    pressedKeys[event.keyCode] = false;
  },
  true
);

function watchPressedKeys() {
  if (pressedKeys[38] || pressedKeys[32]) {
    player.jump();
  }
  if (pressedKeys[39]) {
    player.goRight();
  }
  if (pressedKeys[37]) {
    player.goLeft();
  }
  if (!pressedKeys[37] && !pressedKeys[39]) {
    player.decelerate()
  }
}

/* jouer le thème principale une fois que l'utilisateur a interagi */

document.addEventListener('keydown', function() {
  config.sounds.mainTheme.loop = true;
  config.sounds.mainTheme.play();
}, {once: true})


export default watchPressedKeys;