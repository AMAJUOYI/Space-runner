const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let astronautImg = new Image();
astronautImg.src = './assets/astronaut.png';
let rockImg = new Image();
rockImg.src = './assets/rock.png';
let spaceStationImg = new Image();
spaceStationImg.src = './assets/space_station.png';

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2
  });
}

let astronaut = { x: 100, y: canvas.height / 2, width: 50, height: 50, dy: 0 };
let obstacles = [];
let score = 0;
let gravity = 0.5;
let jumpStrength = -10;

function drawStars() {
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawAstronaut() {
  ctx.drawImage(astronautImg, astronaut.x, astronaut.y, astronaut.width, astronaut.height);
}

function drawObstacles() {
  obstacles.forEach(ob => {
    let img = ob.type === 'rock' ? rockImg : spaceStationImg;
    ctx.drawImage(img, ob.x, ob.y, ob.width, ob.height);
  });
}

function updateObstacles() {
  if (Math.random() < 0.02) {
    let type = Math.random() < 0.5 ? 'rock' : 'station';
    obstacles.push({
      x: canvas.width,
      y: Math.random() * (canvas.height - 60),
      width: 50,
      height: 50,
      type: type
    });
  }
  obstacles.forEach(ob => ob.x -= 5);
  obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function updateAstronaut() {
  astronaut.dy += gravity;
  astronaut.y += astronaut.dy;

  if (astronaut.y + astronaut.height > canvas.height) {
    astronaut.y = canvas.height - astronaut.height;
    astronaut.dy = 0;
  }
  if (astronaut.y < 0) {
    astronaut.y = 0;
    astronaut.dy = 0;
  }
}

function checkCollisions() {
  obstacles.forEach(ob => {
    if (
      astronaut.x < ob.x + ob.width &&
      astronaut.x + astronaut.width > ob.x &&
      astronaut.y < ob.y + ob.height &&
      astronaut.y + astronaut.height > ob.y
    ) {
      alert('Game Over! Your Score: ' + score);
      document.location.reload();
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawAstronaut();
  drawObstacles();
  updateAstronaut();
  updateObstacles();
  checkCollisions();
  score++;
  document.getElementById('score').innerText = 'Score: ' + score;
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    astronaut.dy = jumpStrength;
  }
});

gameLoop();
