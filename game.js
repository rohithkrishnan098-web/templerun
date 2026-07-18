// =========================
// Temple Run Beta v2
// Phase 2A
// =========================

// Player
const player = document.getElementById("player");

// Buttons
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");

// Score
const score = document.getElementById("score");

// Lane positions
const lanes = [70,170,270];

// Current lane
let lane = 1;

// Jump
let jumping = false;

// Score value
let scoreValue = 0;

// Update player position
function updatePlayer(){

    player.style.left = lanes[lane] + "px";

}

updatePlayer();

// ---------------------
// LEFT
// ---------------------

function moveLeft(){

    if(lane > 0){

        lane--;

        updatePlayer();

    }

}

// ---------------------
// RIGHT
// ---------------------

function moveRight(){

    if(lane < 2){

        lane++;

        updatePlayer();

    }

}

// ---------------------
// JUMP
// ---------------------

function jump(){

    if(jumping) return;

    jumping = true;

    let height = 120;

    let up = setInterval(()=>{

        height += 10;

        player.style.bottom = height + "px";

        if(height >= 260){

            clearInterval(up);

            let down = setInterval(()=>{

                height -= 10;

                player.style.bottom = height + "px";

                if(height <= 120){

                    clearInterval(down);

                    jumping = false;

                }

            },20);

        }

    },20);

}

// ---------------------
// Keyboard
// ---------------------

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft"){

        moveLeft();

    }

    if(e.key==="ArrowRight"){

        moveRight();

    }

    if(e.key==="ArrowUp"){

        jump();

    }

});

// ---------------------
// Mobile Buttons
// ---------------------

leftBtn.addEventListener("click",moveLeft);

rightBtn.addEventListener("click",moveRight);

jumpBtn.addEventListener("click",jump);

// ---------------------
// Score
// ---------------------

setInterval(()=>{

    scoreValue++;

    score.innerHTML = scoreValue;

},100);

// ---------------------
// Restart
// ---------------------

function restartGame(){

    location.reload();

}
// ===============================
// PHASE 2B
// Obstacles + Collision
// ===============================

const obstacleContainer =
document.getElementById("obstacleContainer");

let gameRunning = true;

// Create obstacle

function createObstacle(){

    if(!gameRunning) return;

    const obstacle =
    document.createElement("img");

    obstacle.src ="obstacle/obstacle.png";

    obstacle.classList.add("obstacle");

    const lane =
    Math.floor(Math.random()*3);

    obstacle.style.left =
    lanes[lane] + "px";

    obstacle.style.top =
    "-120px";

    obstacleContainer.appendChild(obstacle);

    moveObstacle(obstacle);

}

// Move obstacle

function moveObstacle(obstacle){

    let top = -120;

    let move = setInterval(()=>{

        if(!gameRunning){

            clearInterval(move);

            return;

        }

        top += 7;

        obstacle.style.top =
        top + "px";

        // Collision

        const playerRect =
        player.getBoundingClientRect();

        const obstacleRect =
        obstacle.getBoundingClientRect();

        if(

            playerRect.left <
            obstacleRect.right &&

            playerRect.right >
            obstacleRect.left &&

            playerRect.top <
            obstacleRect.bottom &&

            playerRect.bottom >
            obstacleRect.top

        ){

            clearInterval(move);

            gameOver();

        }

        // Remove obstacle

        if(top > 900){

            clearInterval(move);

            obstacle.remove();

        }

    },20);

}

// Spawn every 2 sec

setInterval(()=>{

    if(gameRunning){

        createObstacle();

    }

},2000);

// Game Over

function gameOver(){

    gameRunning = false;

    document.getElementById(
    "gameOver").style.display =
    "flex";

}
// ===============================
// PHASE 2C
// Coins + Speed + Trees
// ===============================

const coinContainer = document.getElementById("coinContainer");
const coinText = document.getElementById("coins");
const treeContainer = document.getElementById("treeContainer");

let coinValue = 0;
let obstacleSpeed = 7;

// ----------------------
// Create Coin
// ----------------------

function createCoin(){

    if(!gameRunning) return;

    const coin = document.createElement("img");

    coin.src = "assets/coin.png";

    coin.classList.add("coin");

    const lane = Math.floor(Math.random()*3);

    coin.style.left = lanes[lane] + "px";

    coin.style.top = "-80px";

    coinContainer.appendChild(coin);

    moveCoin(coin);

}

function moveCoin(coin){

    let top = -80;

    let move = setInterval(()=>{

        if(!gameRunning){

            clearInterval(move);

            return;

        }

        top += obstacleSpeed;

        coin.style.top = top + "px";

        const playerRect = player.getBoundingClientRect();

        const coinRect = coin.getBoundingClientRect();

        if(

            playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.top < coinRect.bottom &&
            playerRect.bottom > coinRect.top

        ){

            coinValue++;

            coinText.innerHTML = coinValue;

            clearInterval(move);

            coin.remove();

        }

        if(top > 900){

            clearInterval(move);

            coin.remove();

        }

    },20);

}

setInterval(()=>{

    if(gameRunning){

        createCoin();

    }

},3000);

// ----------------------
// Trees
// ----------------------

function createTree(){

    if(!gameRunning) return;

    const tree = document.createElement("img");

    tree.src = "assets/tree.png";

    tree.classList.add("tree");

    tree.style.left =
        Math.random() < 0.5 ? "10px" : "360px";

    tree.style.top = "-150px";

    treeContainer.appendChild(tree);

    let top = -150;

    let move = setInterval(()=>{

        if(!gameRunning){

            clearInterval(move);

            return;

        }

        top += obstacleSpeed;

        tree.style.top = top + "px";

        if(top > 900){

            clearInterval(move);

            tree.remove();

        }

    },20);

}

setInterval(()=>{

    if(gameRunning){

        createTree();

    }

},2500);

// ----------------------
// Speed Increase
// ----------------------

setInterval(()=>{

    if(gameRunning){

        obstacleSpeed += 0.2;

    }

},10000);