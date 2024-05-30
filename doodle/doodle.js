// Content Load Complete
document.addEventListener('DOMContentLoaded', () => {
  let player = new Player(170, 0)
  let doodler = document.createElement('div')
  let grid = document.querySelector('.grid');
  let floorCount = 5;
  let jumpCount = 0;
  let upTimer
  let downTimer

  doodler.classList.add('doodler')
  doodler.style.bottom = player.y
  doodler.style.left = player.x
  grid.appendChild(doodler)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && player.y < 20) {
      jump();
    }
  })

  for (let i = 0; i < floorCount; i ++) {
    let floorGap = 600 / floorCount;
    let floorBottom = 100 + i * floorGap;
    let floor = document.createElement('div');
    floor.classList.add('floor')
    floor.style.bottom = floorBottom
    floor.style.left = Math.random() * 315;
    grid.appendChild(floor)
  }

  // jump
  const jump = () => {
    console.log('jump');
    upTimer = setInterval(() => {
      player.y = player.y + 5
      doodler.style.bottom = player.y
      jumpCount += 5;
      if (jumpCount > 300) {
        fall();
      }
    }, 10)
  }

  const fall = () => {
    clearInterval(upTimer)
    downTimer = setInterval(() => {
      player.y = player.y - 3
      doodler.style.bottom = player.y
      jumpCount -= 3;
      if (player.y < 1) {
        gameOver();
      }
    }, 10)
  }

  const gameOver = () => {
    clearInterval(upTimer)
    clearInterval(downTimer)
    doodler.style.bottom = player.y
  }
})

class Player {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
