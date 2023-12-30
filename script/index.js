const obstacle1 = document.getElementById('obstacle1')
const obstacle2 = document.getElementById('obstacle2')
const obstacle3 = document.getElementById('obstacle3')
const obstacle4 = document.getElementById('obstacle4')
const obstacle5 = document.getElementById('obstacle5')
const obstacle6 = document.getElementById('obstacle6')
const audioJump = document.getElementById('audioJump')
const audioGame = document.getElementById('audioGame')
audioJump.playbackRate = 2.5;
const obstacles = document.querySelectorAll('.obstacle');
const oiseau = document.getElementById('oiseau');
const levelElement = document.getElementById('level')
const scoreElement = document.getElementById('score')
const modal = document.getElementsByClassName('modal')[0]
const modalContent = document.getElementsByClassName('modal-content')[0]
const button = document.createElement('button');
const div = document.createElement('div');
const image = document.createElement('img');
let animationDuration
let score
let lastSpeedIncreaseScore
let obstaclesPassed
let level
let scoreInterval
function initialPos() {
    oiseau.style.marginLeft= "100px";
    oiseau.style.top = '40%';
}

function addImage(img) {
    image.setAttribute("src", img)
}

function isOverlapping(element1, element2, margin = 77) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    // Ajuster les rectangles pour les marges
    rect1.x += margin;
    rect1.width -= margin * 2;
    rect1.y += margin;
    rect1.height -= margin * 2;

    rect2.x += margin;
    rect2.width -= margin * 2;
    rect2.y += margin;
    rect2.height -= margin * 2;

    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}


function run() {
    audioGame.pause()
    levelElement.textContent = level
    scoreElement.textContent = score
    initialPos();
    oiseau.appendChild(image);
    oiseau.style.display = "block"
    addImage("./assets/image/stable.png");
    modal.style.display = "none";
    for (let i = 1; i <= 6; i++) {
        document.getElementById('obstacle' + i).style.display = "block"
    }
    let i = 1000;
    
    setTimeout(() => {
        addImage('./assets/image/stable.png')
        addImage('./assets/image/down.png');
        image.style.width = "30%";
        oiseau.style.top = i + 'px';
        oiseau.style.transition = "4s";
    }, 500)
    document.addEventListener('keydown', eventBird);

    document.addEventListener('mousedown', eventBird)

    scoreInterval = setInterval(() => {
        score++;
        scoreElement.textContent = score
        if (score > lastSpeedIncreaseScore + 10) {
            animationDuration = Math.max(0.5, animationDuration - 0.5);
            obstacles.forEach(obstacle => {
                obstacle.style.animationDuration = `${animationDuration}s`;
            });
            lastSpeedIncreaseScore = score;
            level++;
            levelElement.textContent = level;
        }
    }, 1000)

    setInterval(async() => {
        if (isOverlapping(oiseau, obstacle1) || isOverlapping(oiseau, obstacle2) || isOverlapping(oiseau, obstacle3) || isOverlapping(oiseau, obstacle4) || isOverlapping(oiseau, obstacle5) || isOverlapping(oiseau, obstacle6) || oiseau.getBoundingClientRect().bottom > 1000) {
            clearInterval(scoreInterval)
            stop("replay");
        }
    }, 10)
}
let timer;
function eventBird(event){
    
    clearTimeout(timer);

        if (event.code === 'Space' || event.which === 1) {
            addImage('./assets/image/stable.png')
            addImage('./assets/image/up.png');
            image.style.width = "30%";
            oiseau.style.top = '0px';
            oiseau.style.transition = "4s";
            audioJump.play()
        }

        timer = setTimeout(function () {
            addImage('./assets/image/stable.png')
            addImage('./assets/image/down.png');
            image.style.width = "30%";
            oiseau.style.top = 1000 + 'px';
            oiseau.style.transition = "4s";
            audioJump.stop()
        }, 500);
}

function modalText(etat) {
    if (etat == "play") {
        div.textContent = "Vous voulez jouer?"
        modalContent.appendChild(div)
        console.log(modalContent);
    } else if (etat == "replay") {
        audioGame.play()
        const text = `Game over<br>Vous voulez recommencer?`
        div.innerHTML = text
        modalContent.appendChild(div)

    }
}

function moveUp() {
    addImage('./assets/image/up.png')
}

function moveDown() {
    addImage('./assets/image/down.png')
}

function stop(text) {
    animationDuration = 3
    score = 0
    lastSpeedIncreaseScore = 0
    obstaclesPassed = 0;
    level = 1;
    obstacles.forEach(obstacle => {
        obstacle.style.animationDuration = `${animationDuration}s`;
    });
    modal.style.display = "block"
    oiseau.style.display = "none"
    for (let i = 1; i <= 6; i++) {
        document.getElementById('obstacle' + i).style.display = "none"
    }
    modalText(text)
    modalContent.appendChild(button)
    button.textContent = "Commencer"
    button.onclick = function () {
        run()
    }
}

function main() {
    stop("play")
}

main()

