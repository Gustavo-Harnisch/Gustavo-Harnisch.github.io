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

// Game state
let playerScore = 0;
let aiScore = 0;

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
    speed: 4
};

let ball = {
    x: canvas.width / 2 - BALL_SIZE / 2,
    y: canvas.height / 2 - BALL_SIZE / 2,
    size: BALL_SIZE,
    speedX: 5 * (Math.random() > 0.5 ? 1 : -1),
    speedY: 3 * (Math.random() > 0.5 ? 1 : -1),
    color: BALL_COLOR
};

function resetBall() {
    ball.x = canvas.width / 2 - BALL_SIZE / 2;
    ball.y = canvas.height / 2 - BALL_SIZE / 2;
    ball.speedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 3 * (Math.random() > 0.5 ? 1 : -1);
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

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "36px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText(playerScore, canvas.width/4, 60);
    ctx.fillText(aiScore, 3*canvas.width/4, 60);
}

function draw() {
    // Clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#111");
    
    // Draw game elements
    drawNet();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawCircle(ball.x, ball.y, ball.size, ball.color);
    drawScore();
}

// Collision detection helper
function collision(ball, paddle) {
    return ball.x < paddle.x + paddle.width &&
           ball.x + ball.size > paddle.x &&
           ball.y < paddle.y + paddle.height &&
           ball.y + ball.size > paddle.y;
}

// Game logic
function update() {
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Collision with top/bottom walls
    if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
        ball.speedY = -ball.speedY;
    }

    // Collision with player paddle
    if (collision(ball, player) && ball.speedX < 0) {
        ball.speedX = -ball.speedX;
        
        // Add angle variation based on where ball hits paddle
        let collidePoint = (ball.y + ball.size/2) - (player.y + player.height/2);
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint * 0.5;
        
        let speed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
        ball.speedX = speed * Math.cos(angleRad);
        ball.speedY = speed * Math.sin(angleRad);
        
        // Ensure ball moves away from paddle
        if (ball.speedX < 0) ball.speedX = -ball.speedX;
    }

    // Collision with AI paddle
    if (collision(ball, ai) && ball.speedX > 0) {
        ball.speedX = -ball.speedX;
        
        // Add angle variation
        let collidePoint = (ball.y + ball.size/2) - (ai.y + ai.height/2);
        collidePoint = collidePoint / (ai.height/2);
        let angleRad = (Math.PI/4) * collidePoint * 0.5;
        
        let speed = Math.sqrt(ball.speedX * ball.speedX + ball.speedY * ball.speedY);
        ball.speedX = -speed * Math.cos(angleRad);
        ball.speedY = speed * Math.sin(angleRad);
        
        // Ensure ball moves away from paddle
        if (ball.speedX > 0) ball.speedX = -ball.speedX;
    }

    // Score detection
    if (ball.x < 0) {
        aiScore++;
        resetBall();
    } else if (ball.x + ball.size > canvas.width) {
        playerScore++;
        resetBall();
    }

    // AI movement
    let aiCenter = ai.y + ai.height / 2;
    let ballCenter = ball.y + ball.size / 2;
    
    if (aiCenter < ballCenter - 35) {
        ai.y += ai.speed;
    } else if (aiCenter > ballCenter + 35) {
        ai.y -= ai.speed;
    }
    
    // Keep AI paddle in bounds
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

// Touch support for mobile
canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    let touchY = e.touches[0].clientY - rect.top;
    player.y = touchY - player.height / 2;
    
    // Keep the paddle on screen
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
});

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
