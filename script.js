
const astronaut = document.getElementById('astronaut');
let isJumping = false;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space' && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let position = 0;
  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        astronaut.style.bottom = 50 + position + 'px';
      }, 20);
    }
    position += 5;
    astronaut.style.bottom = 50 + position + 'px';
  }, 20);
}
