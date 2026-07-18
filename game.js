let player = document.getElementById("player");
let road = document.getElementById("road");
let points = document.getElementById("points");

let lane = 1;
let score = 0;
let jumping = false;

const lanePosition = [30,130,230];

player.style.left = lanePosition[lane] + "px";

// LEFT & RIGHT
document.addEventListener("keydown", function(e){

    if(e.key=="ArrowLeft" && lane>0){
        lane--;
        player.style.left = lanePosition[lane]+"px";
    }

    if(e.key=="ArrowRight" && lane<2){
        lane++;
        player.style.left = lanePosition[lane]+"px";
    }

    if(e.key=="ArrowUp"){
        jump();
    }

});

function jump(){

    if(jumping) return;

    jumping=true;

    let pos=20;

    let up=setInterval(function(){

        if(pos>=150){

            clearInterval(up);

            let down=setInterval(function(){

                if(pos<=20){

                    clearInterval(down);
                    jumping=false;

                }else{

                    pos-=5;
                    player.style.bottom=pos+"px";

                }

            },20);

        }else{

            pos+=5;
            player.style.bottom=pos+"px";

        }

    },20);

}

// CREATE OBSTACLES

function createObstacle(){

    let obstacle=document.createElement("div");

    obstacle.classList.add("obstacle");

    let randomLane=Math.floor(Math.random()*3);

    obstacle.style.left=lanePosition[randomLane]+"px";

    obstacle.style.top="-40px";

    road.appendChild(obstacle);

    let move=setInterval(function(){

        let top=parseInt(obstacle.style.top);

        top+=5;

        obstacle.style.top=top+"px";

        // COLLISION

        if(top>500 && top<570){

            if(randomLane==lane && !jumping){

                alert("Game Over!\nScore : "+score);

                location.reload();

            }

        }

        if(top>620){

            clearInterval(move);

            obstacle.remove();

            score++;

            points.innerText=score;

        }

    },20);

}

setInterval(createObstacle,1500);

function restartGame(){

    location.reload();

}