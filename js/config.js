const canvas = document.getElementById('canvas')


const config = {
  canvas: canvas,
  ctx: canvas.getContext('2d'),
  framesPerSecond: 60, // framerate du jeu, doit toujours rester à 60. si on le divise par 2, le jeu sera 2x plus lent, mais tout fonctionnera de la même façon
  
  gravity: 1, // force de gravité, plus elle est élevée plus les objets sont attirés vers le sol
  bounceFactor: -0.7, // un élément rebondira à 70% de sa vitesse initiale (1 -> 0.70, 0.70 -> 0.49, jusqu'à 0..)
  minimumBounce: -2, // on arrête de faire rebondir un élément si son rebond sera inférieur à minimumBounce

  sounds: {
    mainTheme: new Audio('../assets/sounds/maintheme.wav'),
    collideX: new Audio('../assets/sounds/collideX.wav'),
    jump: new Audio('../assets/sounds/jump.wav'),
    bounce: new Audio('../assets/sounds/bounce.wav'),
  },

  obstacles: {
    rectangles: [],
  },

  player: {
    initialSpeed: 5, // Quand une touche est appuyée, la vitesse du joueur s'initialise à initialSpeed
    acceleration: 0.5, // puis sa vitesse monte de acceleration toutes les frames, jusqu'à atteindre playerMaxSpeed
    maxSpeed: 10, // Vitesse maximum du joueur
    deceleration: 0.03, // Vitesse à laquelle le joueur ralentit une fois les touches droite ou gauche lâchées
    jumpHeight: 20, // Hauteur d'un saut, plus la hauteur est élevé plus le joueur peut sauter haut
    speedLossOnCollision: 1.3 // valeur par laquelle la vitesse du joueur est divisée lorsqu'il heurte un obstacle. si inférieur à 1, la vitesse du joueur augmentera au contact d'un mur
  }
}

config.sounds.collideX.volume = 0.4;
config.sounds.bounce.volume = 0.6;

export default config