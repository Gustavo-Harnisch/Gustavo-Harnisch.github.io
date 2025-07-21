const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 14;
const PADDLE_MARGIN = 18;
const PLAYER_COLOR = "#0af";
const AI_COLOR = "#fa0";
const BALL_COLOR = "#fff";
const NET_COLOR = "#444";
const FPS = 60;

// Game objects
let player = {
    x: PADDLE_MARGIN,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: PLAYER_COLOR
};

let ai = {
    x: canvas.width - PADDLE_MARGIN - PADDLE_WIDTH,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: AI_COLOR,
    speed: 5
};

let ball = {
    x: canvas.width / 2 - BALL_SIZE / 2,
    y: canvas.height / 2 - BALL_SIZE / 2,
    size: BALL_SIZE,
    speedX: 6 * (Math.random() > 0.5 ? 1 : -1),
    speedY: 4 * (Math.random() > 0.5 ? 1 : -1),
    color: BALL_COLOR
};

function resetBall() {
    ball.x = canvas.width / 2 - BALL_SIZE / 2;
    ball.y = canvas.height / 2 - BALL_SIZE / 2;
    ball.speedX = 6 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// Drawing functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
}

function drawNet() {
    ctx.fillStyle = NET_COLOR;
    const netWidth = 4;
    const netHeight = 24;
    for (let i = 0; i < canvas.height; i += netHeight * 2) {
        ctx.fillRect(canvas.width/2 - netWidth/2, i, netWidth, netHeight);
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#111");
    drawNet();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawCircle(ball.x, ball.y, ball.size, ball.color);
}

// Game logic
function update() {
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Collision with top/bottom walls
    if (ball.y <= 0 || ball.y + BALL_SIZE >= canvas.height) {
        ball.speedY = -ball.speedY;
    }

    // Collision with player paddle
    if (
        ball.x <= player.x + player.width &&
        ball.y + ball.size >= player.y &&
        ball.y <= player.y + player.height &&
        ball.x >= player.x
    ) {
        ball.speedX = -ball.speedX;
        // Add some variation depending on where it hits the paddle
        let collidePoint = (ball.y + ball.size/2) - (player.y + player.height/2);
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = ball.speedX > 0 ? 1 : -1;
        ball.speedX = direction * 6 * Math.cos(angleRad);
        ball.speedY = 6 * Math.sin(angleRad);
    }

    // Collision with AI paddle
    if (
        ball.x + ball.size >= ai.x &&
        ball.y + ball.size >= ai.y &&
        ball.y <= ai.y + ai.height &&
        ball.x + ball.size <= ai.x + ai.width + ball.size
    ) {
        ball.speedX = -ball.speedX;
        let collidePoint = (ball.y + ball.size/2) - (ai.y + ai.height/2);
        collidePoint = collidePoint / (ai.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = ball.speedX > 0 ? 1 : -1;
        ball.speedX = direction * 6 * Math.cos(angleRad);
        ball.speedY = 6 * Math.sin(angleRad);
    }

    // Score (ball goes out left/right)
    if (ball.x < 0 || ball.x + ball.size > canvas.width) {
        resetBall();
    }

    // AI movement (very simple)
    let aiCenter = ai.y + ai.height / 2;
    let ballCenter = ball.y + ball.size / 2;
    if (aiCenter < ballCenter - 10) {
        ai.y += ai.speed;
    } else if (aiCenter > ballCenter + 10) {
        ai.y -= ai.speed;
    }
    // Keep AI in bounds
    ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y));
}

// Player control
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    player.y = mouseY - player.height / 2;
    // Keep the paddle on screen
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
});

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
