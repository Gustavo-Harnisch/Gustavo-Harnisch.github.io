const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paddle settings
const paddleWidth = 15;
const paddleHeight = 100;
const paddleSpeed = 7;

// Ball settings
const ballRadius = 12;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVX = 6 * (Math.random() > 0.5 ? 1 : -1);
let ballVY = 4 * (Math.random() > 0.5 ? 1 : -1);

// Player paddles
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Keyboard control
let upPressed = false;
let downPressed = false;

// Score
let leftScore = 0;
let rightScore = 0;

function drawPaddle(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawNet() {
  ctx.strokeStyle = "#fff";
  ctx.setLineDash([10, 15]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawScore() {
  ctx.font = "40px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(leftScore, canvas.width / 2 - 80, 50);
  ctx.fillText(rightScore, canvas.width / 2 + 80, 50);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballVX = 6 * (Math.random() > 0.5 ? 1 : -1);
  ballVY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// Rebote con ángulo aleatorio en los frames superior e inferior
function randomBounceAngle(isTop) {
  // Ángulo entre 30° y 60° en radianes
  const minDeg = 30, maxDeg = 60;
  const min = minDeg * Math.PI / 180;
  const max = maxDeg * Math.PI / 180;
  let theta = Math.random() * (max - min) + min;
  // A la derecha o izquierda según el sentido actual
  const horizontalSign = Math.sign(ballVX) || (Math.random() > 0.5 ? 1 : -1);
  // Hacia abajo si rebota arriba, hacia arriba si rebota abajo
  const verticalSign = isTop ? 1 : -1;
  // Mantener la velocidad de la bola
  const speed = Math.sqrt(ballVX * ballVX + ballVY * ballVY);
  ballVX = horizontalSign * Math.cos(theta) * speed;
  ballVY = verticalSign * Math.sin(theta) * speed;
}

function updateBall() {
  ballX += ballVX;
  ballY += ballVY;

  // Rebote en los bordes superior e inferior CON ÁNGULO ALEATORIO
  if (ballY - ballRadius < 0) {
    ballY = ballRadius;
    randomBounceAngle(true); // rebota hacia abajo
  }
  if (ballY + ballRadius > canvas.height) {
    ballY = canvas.height - ballRadius;
    randomBounceAngle(false); // rebota hacia arriba
  }

  // Rebote en paddle izquierdo
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballX = paddleWidth + ballRadius;
    ballVX *= -1;
  }

  // Rebote en paddle derecho
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballX = canvas.width - paddleWidth - ballRadius;
    ballVX *= -1;
  }

  // Gol para derecha
  if (ballX - ballRadius < 0) {
    rightScore++;
    resetBall();
  }

  // Gol para izquierda
  if (ballX + ballRadius > canvas.width) {
    leftScore++;
    resetBall();
  }
}

function updateRightPaddleAI() {
  // Simple IA: sigue la bola
  const paddleCenter = rightPaddleY + paddleHeight / 2;
  if (paddleCenter < ballY - 15) rightPaddleY += paddleSpeed;
  else if (paddleCenter > ballY + 15) rightPaddleY -= paddleSpeed;
  rightPaddleY = Math.max(Math.min(rightPaddleY, canvas.height - paddleHeight), 0);
}

function updateLeftPaddle() {
  if (upPressed) leftPaddleY -= paddleSpeed;
  if (downPressed) leftPaddleY += paddleSpeed;
  leftPaddleY = Math.max(Math.min(leftPaddleY, canvas.height - paddleHeight), 0);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth, rightPaddleY);
  drawBall();
  drawScore();
}

function gameLoop() {
  updateLeftPaddle();
  updateRightPaddleAI();
  updateBall();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(e) {
  if (e.code === 'ArrowUp') upPressed = true;
  if (e.code === 'ArrowDown') downPressed = true;
});
document.addEventListener('keyup', function(e) {
  if (e.code === 'ArrowUp') upPressed = false;
  if (e.code === 'ArrowDown') downPressed = false;
});

gameLoop();
