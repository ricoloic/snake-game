// eslint-disable-next-line max-len
/* global random, keyCode, frameRate, Snake, textSize, createCanvas, text, fill, rect, background */
/* eslint-disable no-unused-vars */

const scl = 30;

let width;
let height = 600;
let snake;
let food;
let currentScene = "start";
let lastScene = "none";
let bestScore = 0;
let currentScore = 0;
let dead = false;

function pickLocation() {
  const cols = Math.floor(width / scl);
  const rows = Math.floor(height / scl);
  return {
    x: Math.floor(random(cols)) * scl,
    y: Math.floor(random(rows)) * scl,
  };
}

function getSize() {
  const _widthToRemove = (window.innerWidth - 50) % scl;
  const _heightToRemove = (window.innerHeight - 30) % scl;
  const _width = window.innerWidth - 50 - _widthToRemove;
  const _height = window.innerHeight - 30 - _heightToRemove;
  return { _width, _height };
}

function setSize() {
  const { _width, _height } = getSize();
  width = _width;
  height = _height;
}

function setup() {
  frameRate(7);
  setSize();
  const canvas = createCanvas(width, height);
  const mainNodeDOM = canvas.parent();
  canvas.parent("canvas-container");
  mainNodeDOM.remove();
  food = pickLocation();
  snake = new Snake(1, scl);
  resetScenes();
  textSize(20);
}

function keyPressed() {
  if (keyCode === 38 || keyCode === 87)
    snake.changeDirection("up");
  else if (keyCode === 40 || keyCode === 83)
    snake.changeDirection("down");
  else if (keyCode === 37 || keyCode === 65)
    snake.changeDirection("left");
  else if (keyCode === 39 || keyCode === 68)
    snake.changeDirection("right");
}

function draw() {
  showScene();
}

function changeScene(newScene) {
  document.getElementById(
    "score"
  ).innerText = `You've eaten ${currentScore} fruit`;
  currentScore = 0;
  resetScenes();
  currentScene = newScene;
}

function showScene() {
  const isLastSceneSameAsCurrent =
    lastScene === currentScene;

  if (currentScene === "end") {
    if (!isLastSceneSameAsCurrent) {
      document.getElementById("end").style.display =
        "block";
      lastScene = currentScene;
    }
  } else if (currentScene === "start") {
    if (!isLastSceneSameAsCurrent) {
      document.getElementById("start").style.display =
        "block";
      lastScene = currentScene;
    }
  } else if (currentScene === "game") {
    if (!isLastSceneSameAsCurrent) {
      document.getElementById(
        "canvas-container"
      ).style.display = "block";
      lastScene = currentScene;
    }

    gameScene();
  }
}

function resetScenes() {
  document.getElementById(
    "canvas-container"
  ).style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("end").style.display = "none";
}

function gameScene() {
  background(34);
  snake.update();
  snake.show();

  if (snake.isSelfEating()) {
    snake.reset();
    changeScene("end");
  }

  if (snake.eat(food)) {
    currentScore += 1;

    if (currentScore >= bestScore) bestScore = currentScore;

    snake.grow();
    food = pickLocation();
  }

  text(`Current Score ${currentScore}`, 30, 40);
  text(
    `Best Score ${bestScore}`,
    width - 155 - bestScore.toString().length * 10,
    40
  );
  fill(255, 0, 85);
  rect(food.x, food.y, scl, scl);
}

document.addEventListener("swiped", (e) => {
  if (e.detail.dir) snake.changeDirection(e.detail.dir);
});
