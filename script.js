const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

const box = 40;
let score = 0;

// Snake starts in the center
let snake = [{ x: 200, y: 200 }];

// Food starts randomly
let food = {
  x: Math.floor(Math.random() * 10) * box,
  y: Math.floor(Math.random() * 10) * box
};

// Snake is still at start
let speedX = 0;
let speedY = 0;
let gameStarted = false;

// Game interval
let game = null;

// Keyboard input
document.addEventListener("keydown", moveSnake);

function moveSnake(event) {
  event.preventDefault();
  gameStarted = true;

  if (event.key === "ArrowUp" && speedY === 0) {
    speedX = 0;
    speedY = -box;
  } else if (event.key === "ArrowDown" && speedY === 0) {
    speedX = 0;
    speedY = box;
  } else if (event.key === "ArrowLeft" && speedX === 0) {
    speedX = -box;
    speedY = 0;
  } else if (event.key === "ArrowRight" && speedX === 0) {
    speedX = box;
    speedY = 0;
  }
}

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake and food if game hasn't started
  if (!gameStarted) {
    ctx.fillStyle = "lime";
    ctx.fillRect(snake[0].x, snake[0].y, box, box);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    return;
  }

  // New head position
  let newHead = {
    x: snake[0].x + speedX,
    y: snake[0].y + speedY
  };

  // Wall collision
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= canvas.width ||
    newHead.y >= canvas.height
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    window.location.reload();
    return;
  }

  // Self collision
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      clearInterval(game);
      alert("Game Over! Score: " + score);
      window.location.reload();
      return;
    }
  }

  // Add new head
  snake.unshift(newHead);

  // Eat food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    scoreText.textContent = score;

    food = {
      x: Math.floor(Math.random() * 10) * box,
      y: Math.floor(Math.random() * 10) * box
    };
  } else {
    snake.pop();
  }

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// Start the game interval
game = setInterval(startGame, 150);