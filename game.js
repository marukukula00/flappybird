// Get the canvas element
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Define some game constants
const GRAVITY = 0.5;
const FLAP_SPEED = 10;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_GAP = 150;
const BIRD_WIDTH = 30;
const BIRD_HEIGHT = 30;

// Define the bird object
let bird = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vy: 0,
  width: BIRD_WIDTH,
  height: BIRD_HEIGHT,
};

// Define the obstacle array
let obstacles = [];

// Define the score
let score = 0;

// Main game loop
function update() {
  // Update the bird's velocity
  bird.vy += GRAVITY;

  // Update the bird's position
  bird.y += bird.vy;

  // Check for collisions with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (checkCollision(bird, obstacle)) {
      // Game over!
      alert("Game Over! Score: " + score);
      return;
    }
  }

  // Check if the bird has fallen off the screen
  if (bird.y + bird.height > canvas.height) {
    // Game over!
    alert("Game Over! Score: " + score);
    return;
  }
  // Generate new obstacles
  if (Math.random() < 0.1) {
    const obstacle = {
      x: canvas.width,
      y: Math.random() * (canvas.height - OBSTACLE_HEIGHT),
    };
    obstacles.push(obstacle);
  }
  // Update obstacle positions
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.x -= 2; // Move the obstacle 2 pixels to the left
    if (obstacle.x < -OBSTACLE_WIDTH) {
      // Remove the obstacle if it's off the screen
      obstacles.splice(i, 1);
    }
  }


  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird(bird);
  drawObstacles(obstacles);

  // Update the score
  score++;

  // Request the next frame
  requestAnimationFrame(update);
}

// Draw the bird
function drawBird(bird) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Draw the obstacles
function drawObstacles(obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
  }
}

// Check for collisions between the bird and an obstacle
function checkCollision(bird, obstacle) {
  if (
    bird.x + bird.width > obstacle.x &&
    bird.x < obstacle.x + OBSTACLE_WIDTH &&
    bird.y + bird.height > obstacle.y &&
    bird.y < obstacle.y + OBSTACLE_HEIGHT
  ) {
    return true;
  }
  return false;
}

// Handle flap input
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    bird.vy = -FLAP_SPEED;
  }
});

// Start the game
update();