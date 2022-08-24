document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground-moving');

    let birdLeft = 220;     // left most position of bird
    let birdBottom = 200;     // down most position of bird 
    let gravity = 2.5;
    let isGameOver = false;
    let gap = 430;
    let score = 0;

    function startGame() {
        document.addEventListener('keyup', function(e) {

        })
    }

    function inGame() {
        birdBottom -=gravity;   // the bird is dropping
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(inGame, 20);  // every 20ms, the bird drops 1 time

    function jump(e) {
        if(e.keyCode===32) {    // every spacebar pressed
            if(birdBottom<500) birdBottom +=50; // the bird jumps
            bird.style.bottom = birdBottom + 'px';
        }
    }
    document.addEventListener('keyup', jump);

    function generateObstacle() {
        let obstacleLeft = 500; // left most position of obstacle
        let randomHeight = Math.random() * 150;
        let obstacleBottom = randomHeight;  // down most position of obstacle
        const obstacleBelow = document.createElement('div'); // the below obstacle 
        const obstacleAbove = document.createElement('div'); // the above obstacle
        if(!isGameOver) {   
            obstacleBelow.classList.add('obstacleBelow');
            obstacleAbove.classList.add('obstacleAbove');
        }
        gameDisplay.appendChild(obstacleBelow);
        gameDisplay.appendChild(obstacleAbove);
        obstacleBelow.style.left = obstacleLeft + 'px';
        obstacleBelow.style.bottom = obstacleBottom + 'px';
        obstacleAbove.style.left = obstacleLeft + 'px';
        obstacleAbove.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeft -=2;   // obstacles move left
            obstacleAbove.style.left = obstacleLeft + 'px';
            obstacleBelow.style.left = obstacleLeft + 'px';

            if(obstacleLeft===-60) {    // when obstacles disappear
                clearInterval(timerId);
                gameDisplay.removeChild(obstacleBelow);
                gameDisplay.removeChild(obstacleAbove);
            }

            if(obstacleLeft===160) {    // if the bird flies through 1 pair of obs
                score +=1;
                document.getElementById("score").innerHTML = score;
            }

            if(obstacleLeft>200 && obstacleLeft<280 && birdLeft===220 &&
                (birdBottom<obstacleBottom+153 || birdBottom>obstacleBottom+gap-200)
                || birdBottom<=0)  // if the bird hit obstacles or ground or sky
            {
                gameOver();
                clearInterval(timerId);
            }
        }
        let timerId = setInterval(moveObstacle, 20); // every 20ms, the obstacles move left 1 time
        if(!isGameOver) setTimeout(generateObstacle, 3000); // every 3s, a pair of obs is generated
    }
    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        const text = document.createElement('div'); // "game over" appears
        text.innerText = "game over";
        text.classList.add('text');
        gameDisplay.appendChild(text);

        document.removeEventListener('keyup', jump);
        ground.classList.add('ground');
        ground.classList.remove('ground-moving');
        document.addEventListener('keyup', function(e) {    // restart game
            this.location.reload();
        })
    }
})