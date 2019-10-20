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
  if (pressedKeys[38]) {
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

document.addEventListener('keyup', function(e) {
  if (e.keyCode === 38) {
  }
})

export default watchPressedKeys;