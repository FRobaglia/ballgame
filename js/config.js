const canvas = document.getElementById('canvas')

const config = {
  canvas: canvas,
  ctx: canvas.getContext('2d'),
  framesPerSecond: 60,
  
  gravity: 1, // force de gravité, plus elle est élevée plus les objets sont attirés vers le sol
  bounceFactor: -0.65,

  player: {
    initialSpeed: 3.2, // Quand une touche est appuyée, la vitesse du joueur s'initilaise à initialSpeed
    acceleration: 0.2, // puis sa vitesse monte de acceleration toutes les frames, jusqu'à atteindre playerMaxSpeed
    maxSpeed: 9, // Vitesse maximum du joueur
    deceleration: 0.06, // Vitesse à laquelle le joueur ralentit une fois les touches droite ou gauche lâchées
    jumpSpeed: 1.5, // Vitesse de saut
    jumpHeight: 11 // Hauteur des sauts, plus la hauteur est élevé plus le joueur peut sauter haut
  }
}

export default config