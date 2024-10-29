const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
let canvasSize;
let elementsSize;
let level = 0;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = { x: undefined, y: undefined };

let enemyPosition = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + "px Verdana";
    game.textAlign = "end";

    const map = maps[level];

    if (!map) {
        
        gameWin();
        return;
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map((row) => row.trim().split(""));
    console.log({ map, mapRows, mapRowCols });

    enemyPosition=[];   
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == "O") {
                if (
                    playerPosition.x == undefined &&
                    playerPosition.y == undefined
                ) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({ posX, posY });
                }
            } else if (col == "I") {
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if (col == "X") {
                enemyPosition.push({ x: posX, y: posY });
            }

            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
}

function movePlayer() {

    const colisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const colisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftColision = colisionX && colisionY;

    if (giftColision) {
        levelWin(); 
    }

const colisionEnemy = enemyPosition.find((enemy) => {
        const colisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const colisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return colisionX && colisionY;
    });

    if (colisionEnemy) {
        console.log("hubo colision con enemigo");
    }

    game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log("Subiste de Nivel");
    level++;
    startGame();
}

function gameWin(){
    console.log("Ganaste el juego");}

window.addEventListener("keydown", moveBYKeys);

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

function moveBYKeys(event) {
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
}

function moveUp() {
    console.log("up");
    if (playerPosition.y - elementsSize < 0) return;
    playerPosition.y -= elementsSize;
    startGame();
}

function moveDown() {
    console.log("down");
    if (playerPosition.y + elementsSize > canvasSize) return;
    playerPosition.y += elementsSize;
    startGame();
}

function moveLeft() {
    console.log("left");
    if (playerPosition.x - elementsSize < 0) return;
    playerPosition.x -= elementsSize;
    startGame();
}

function moveRight() {
    console.log("right");
    if (playerPosition.x + elementsSize > canvasSize) return;
    playerPosition.x += elementsSize;
    startGame();
}
