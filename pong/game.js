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

// Speed constants
const INITIAL_SPEED = 5;
const SPEED_INCREMENT = 0.9;
const MAX_SPEED = 20;

// Game state
let playerScore = 0;
let aiScore = 0;
let currentSpeed = INITIAL_SPEED;
let hitCount = 0;

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
    speedX: INITIAL_SPEED * (Math.random() > 0.5 ? 1 : -1),
    speedY: (INITIAL_SPEED * 0.6) * (Math.random() > 0.5 ? 1 : -1),
    color: BALL_COLOR
};

function resetBall() {
    ball.x = canvas.width / 2 - BALL_SIZE / 2;
    ball.y = canvas.height / 2 - BALL_SIZE / 2;
    
    // Reset speed and hit count
    currentSpeed = INITIAL_SPEED;
    hitCount = 0;
    
    ball.speedX = currentSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = (currentSpeed * 0.6) * (Math.random() > 0.5 ? 1 : -1);
}

function increaseSpeed() {
    if (currentSpeed < MAX_SPEED) {
        currentSpeed += SPEED_INCREMENT;
        hitCount++;
    }
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

function drawSpeedometer() {
    ctx.fillStyle = "#888";
    ctx.font = "12px 'Press Start 2P', monospace";
    ctx.textAlign = "left";
    
    // Speed indicator
    ctx.fillText(`SPEED: ${currentSpeed.toFixed(1)}`, 20, canvas.height - 40);
    
    // Hit counter
    ctx.fillText(`HITS: ${hitCount}`, 20, canvas.height - 20);
    
    // Speed bar
    const barWidth = 200;
    const barHeight = 8;
    const barX = canvas.width - barWidth - 20;
    const barY = canvas.height - 30;
    
    // Background bar
    ctx.fillStyle = "#333";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Speed bar fill
    const speedPercentage = (currentSpeed - INITIAL_SPEED) / (MAX_SPEED - INITIAL_SPEED);
    const fillWidth = barWidth * speedPercentage;
    
    // Color gradient based on speed
    if (speedPercentage < 0.5) {
        ctx.fillStyle = "#0af";
    } else if (speedPercentage < 0.8) {
        ctx.fillStyle = "#fa0";
    } else {
        ctx.fillStyle = "#f00";
    }
    
    ctx.fillRect(barX, barY, fillWidth, barHeight);
    
    // Speed bar label
    ctx.fillStyle = "#fff";
    ctx.font = "10px 'Press Start 2P', monospace";
    ctx.textAlign = "right";
    ctx.fillText("MAX SPEED", canvas.width - 20, canvas.height - 35);
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
    drawSpeedometer();
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
        // Increase speed on paddle hit
        increaseSpeed();
        
        // Add angle variation based on where ball hits paddle
        let collidePoint = (ball.y + ball.size/2) - (player.y + player.height/2);
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint * 0.5;
        
        ball.speedX = currentSpeed * Math.cos(angleRad);
        ball.speedY = currentSpeed * Math.sin(angleRad);
        
        // Ensure ball moves away from paddle
        if (ball.speedX < 0) ball.speedX = -ball.speedX;
    }

    // Collision with AI paddle
    if (collision(ball, ai) && ball.speedX > 0) {
        // Increase speed on paddle hit
        increaseSpeed();
        
        // Add angle variation
        let collidePoint = (ball.y + ball.size/2) - (ai.y + ai.height/2);
        collidePoint = collidePoint / (ai.height/2);
        let angleRad = (Math.PI/4) * collidePoint * 0.5;
        
        ball.speedX = -currentSpeed * Math.cos(angleRad);
        ball.speedY = currentSpeed * Math.sin(angleRad);
        
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

    // AI movement (adjust speed based on ball speed for better gameplay)
    let aiCenter = ai.y + ai.height / 2;
    let ballCenter = ball.y + ball.size / 2;
    let aiSpeed = ai.speed + (currentSpeed - INITIAL_SPEED) * 0.3; // AI gets slightly faster too
    
    if (aiCenter < ballCenter - 35) {
        ai.y += aiSpeed;
    } else if (aiCenter > ballCenter + 35) {
        ai.y -= aiSpeed;
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

// Keyboard controls (optional - for better control at high speeds)
let keys = {};
document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

// Update player with keyboard (optional)
function updateKeyboard() {
    const keyboardSpeed = 8;
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        player.y -= keyboardSpeed;
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        player.y += keyboardSpeed;
    }
    
    // Keep the paddle on screen
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

// Main game loop
function gameLoop() {
    updateKeyboard(); // Optional keyboard controls
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
