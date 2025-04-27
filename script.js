const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const background = new Image();
background.src = 'space_runner.png';

const rock = new Image();
rock.src = 'rock.png';

const astronaut = new Image();
astronaut.src = 'astronaut.png';

// Astronaut position
let astronautX = 100;
let astronautY = 300;
let astronautSpeed = 5;

// Rock position
let rockX = 800;
let rockY = Math.random() * 550;

// Background scroll
let backgroundX = 0;

function updateGame() {
    rockX -= 5;
    if (rockX < -50) {
        rockX = 800;
        rockY = Math.random() * 550;
    }
    backgroundX -= 2;
    if (backgroundX <= -canvas.width) {
        backgroundX = 0;
    }
}

function drawGame() {
    ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(background, backgroundX + canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(astronaut, astronautX, astronautY, 50, 50);
    ctx.drawImage(rock, rockX, rockY, 50, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') astronautY -= astronautSpeed;
    if (e.key === 'ArrowDown') astronautY += astronautSpeed;
});

gameLoop();