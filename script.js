
const astronaut = document.getElementById('astronaut');
let isJumping = false;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space' && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  astronaut.style.bottom = '200px';
  setTimeout(() => {
    astronaut.style.bottom = '50px';
    isJumping = false;
  }, 500);
}

function createRock() {
  const rock = document.createElement('img');
  rock.src = 'images/rock.png';
  rock.classList.add('rock');
  document.getElementById('game').appendChild(rock);

  let rockPosition = window.innerWidth;

  const rockInterval = setInterval(() => {
    if (rockPosition < -50) {
      clearInterval(rockInterval);
      rock.remove();
    } else {
      rockPosition -= 5;
      rock.style.left = rockPosition + 'px';
    }
    rock.style.bottom = '50px';
  }, 20);
}
setInterval(createRock, 2000);

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * window.innerWidth + 'px';
  document.getElementById('game').appendChild(star);

  let starPosition = window.innerHeight;

  const starInterval = setInterval(() => {
    if (starPosition < -10) {
      clearInterval(starInterval);
      star.remove();
    } else {
      starPosition -= 2;
      star.style.top = starPosition + 'px';
    }
  }, 30);
}
setInterval(createStar, 500);

function createSpaceStation() {
  const station = document.createElement('img');
  station.src = 'images/space_station.png';
  station.classList.add('station');
  document.getElementById('game').appendChild(station);

  let stationPosition = window.innerWidth;

  const stationInterval = setInterval(() => {
    if (stationPosition < -100) {
      clearInterval(stationInterval);
      station.remove();
    } else {
      stationPosition -= 3;
      station.style.left = stationPosition + 'px';
    }
    station.style.bottom = '200px';
  }, 20);
}
setInterval(createSpaceStation, 20000);

let score = 0;
setInterval(() => {
  score++;
  document.getElementById('score').innerText = "Score: " + score;
}, 1000);
