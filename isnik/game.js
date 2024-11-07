const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Size of each block in the grid
const canvasSize = 400; // Size of the canvas (width/height)
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 8 * gridSize, y: 8 * gridSize }]; // Snake initial position
let snakeLength = 1;
let direction = "RIGHT"; // Default direction
let food = {};
let score = 0;
let gameInterval;

// Generate a random food position on the grid
function generateFood() {
  const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food = { x, y };
}

// Handle keyboard input for controlling the snake
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
});

// Update the snake's position and the game state
function updateGame() {
  // Move snake
  const head = { ...snake[0] };

  if (direction === "UP") head.y -= gridSize;
  if (direction === "DOWN") head.y += gridSize;
  if (direction === "LEFT") head.x -= gridSize;
  if (direction === "RIGHT") head.x += gridSize;

  // Check for collisions with the wall
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    gameOver();
  }

  // Check for collisions with the snake itself
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }

  // Add the new head to the snake
  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").textContent = score;
    snakeLength++;
    generateFood();
  } else {
    snake.pop(); // Remove last part of the snake if no food is eaten
  }

  // Redraw the game
  drawGame();
}

// Draw the snake and the food
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // Draw snake
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Start the game
function startGame() {
  score = 0;
  document.getElementById("score").textContent = score;
  snake = [{ x: 8 * gridSize, y: 8 * gridSize }];
  snakeLength = 1;
  direction = "RIGHT";
  generateFood();
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 100);
}

// Game Over
function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Your score was: " + score);
}

// Restart the game when the button is clicked
document.getElementById("restartButton").addEventListener("click", startGame);

// Initialize the game
startGame();
