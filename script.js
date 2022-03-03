const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const finalScoreContainer = document.getElementById("finalScoreContainer");
const playersFinalScore = document.getElementById("playersFinalScore");
const closeFinalScore = document.getElementById("closeFinalScore");

let lastHole, time, level, score, timeUp, hole;
let btn = document.getElementById("btn");
let mode = document.getElementById("mode");

function start() {
  mode.textContent = "Easy";
  finalScoreContainer.style.display = "none";
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  level = "easy";
  btn.textContent = "Start The Game!";
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  console.log(level);
  if (level === "easy") {
    time = randomTime(900, 1000);
  }
  if (level === "hard") {
    time = randomTime(200, 1000);
  }
 hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function changeButton() {
  if (timeUp === false) {
    btn.textContent = "Whack!";
  }
}

function showFinalScore() {
  finalScoreContainer.style.display = "block";
  playersFinalScore.textContent = score;
  timeUp = true;
  closeFinalScore.addEventListener("click", function () {
    start();
  });
}

function startGame() {
  timeUp = false;
  peep();
  changeButton();
  setTimeout(() => showFinalScore(), 10000);
}

function whack(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", whack));

var checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    mode.textContent = "Hard";
    console.log("Checked");
    level = "hard";
  } else {
    console.log("Not checked");
    mode.textContent = "Easy";
    level = "easy";
  }
});

start();
