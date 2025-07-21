// 🎯 Configuración
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 7;
const BALL_RADIUS = 12;
const INITIAL_BALL_SPEED_X = 6;
const INITIAL_BALL_SPEED_Y = 4;
const MIN_BOUNCE_ANGLE = 30 * Math.PI / 180;
const MAX_BOUNCE_ANGLE = 60 * Math.PI / 180;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Estado del juego
let leftPaddleY = (canvas.height - PADDLE_HEIGHT) / 2;
let rightPaddleY = (canvas.height - PADDLE_HEIGHT) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVX = getRandomDirection(INITIAL_BALL_SPEED_X);
let ballVY = getRandomDirection(INITIAL_BALL_SPEED_Y);

let upPressed = false;
let downPressed = false;
let leftScore = 0;
let rightScore = 0;

// ✅ Helpers
function getRandomDirection(speed) {
  return speed * (Math.random() > 0.5 ? 1 : -1);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

// 🎨 Dibujo
function drawPaddle(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
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

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - PADDLE_WIDTH, rightPaddleY);
  drawBall();
  drawScore();
}

// ⚡ Lógica
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballVX = getRandomDirection(INITIAL_BALL_SPEED_X);
  ballVY = getRandomDirection(INITIAL_BALL_SPEED_Y);
}

function applyRandomBounce(isTop) {
  const angle = Math.random() * (MAX_BOUNCE_ANGLE - MIN_BOUNCE_ANGLE) + MIN_BOUNCE_ANGLE;
  const speed = Math.hypot(ballVX, ballVY);
  const horizontalSign = Math.sign(ballVX) || getRandomDirection(1);
  const verticalSign = isTop ? 1 : -1;

  ballVX = horizontalSign * Math.cos(angle) * speed;
  ballVY = verticalSign * Math.sin(angle) * speed;
}

function updateBall() {
  ballX += ballVX;
  ballY += ballVY;

  // Bordes verticales
  if (ballY - BALL_RADIUS < 0) {
    ballY = BALL_RADIUS;
    applyRandomBounce(true);
  }
  if (ballY + BALL_RADIUS > canvas.height) {
    ballY = canvas.height - BALL_RADIUS;
    applyRandomBounce(false);
  }

  // Rebote izquierda
  if (ballX - BALL_RADIUS < PADDLE_WIDTH &&
      ballY > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) {
    ballX = PADDLE_WIDTH + BALL_RADIUS;
    ballVX *= -1;
  }

  // Rebote derecha
  if (ballX + BALL_RADIUS > canvas.width - PADDLE_WIDTH &&
      ballY > rightPaddleY && bal
