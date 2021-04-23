const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");


class SnakePart{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//Game Loop
function drawGame(){
  changeSnakePosition();
  let result = isGameOver();
  if(result) {
    return;
  }

  clearScreen();


  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score > 2) {
    speed = 11;
  }
  if (score > 5) {
    speed = 15;
  }

  setTimeout(drawGame, 1000/ speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0) {
    gameOver = true;
  }
  else if (headX >= tileCount) {
    gameOver = true;
  }
  else if (headY < 0) {
    gameOver = true;
  }
  else if (headY >= tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if(part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    c.fillStyle = "white";
    c.font = "50px Verdana";
    c.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore(){
  c.fillStyle = "white";
  c.font = "10px Verdana";
  c.fillText("Score " + score, canvas.width - 50, 10)
}

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

  c.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    c.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
  }

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  c.fillStyle = "orange";
  c.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  c.fillStyle = "red";
  c.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
  if (event.keyCode == 38) {
    if (yVelocity == 1) {
      return;
    }
    yVelocity = -1;
    xVelocity = 0;
  }
  if (event.keyCode == 40) {
    if (yVelocity == -1) {
      return;
    }
    yVelocity = 1;
    xVelocity = 0;
  }
  if (event.keyCode == 37) {
    if (xVelocity == 1) {
      return;
    }
    yVelocity = 0;
    xVelocity = -1;
  }
  if (event.keyCode == 39) {
    if (xVelocity == -1) {
      return;
    }
    yVelocity = 0;
    xVelocity = 1;
  }
}




drawGame();
