const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const finalScoreContainer = document.getElementById("finalScoreContainer");
const playersFinalScore = document.getElementById("playersFinalScore");
const closeFinalScore = document.getElementById("closeFinalScore");
const displayHighScore = document.getElementById("highScores");
const newHighScore = document.getElementById("newHighScore");
const finalScoreTitle = document.getElementById("playersFinalScoreTitle");
let lastHole, time, level, score, timeUp, holehighScoreH, highScoreE;
let btn = document.getElementById("btn");
let mode = document.getElementById("mode");
let checkbox = document.querySelector('input[type="checkbox"]');
const footer = document.getElementById("footer");
const header = document.getElementById("header");

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setLevel() {
  if (level === undefined) {
    level = "easy";
  }
}

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    mode.textContent = "Hard";
    level = "hard";
    checkHighScore(level);
  } else {
    mode.textContent = "Easy";
    level = "easy";
    checkHighScore(level);
  }
});

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
  if (level === "easy") {
    time = randomTime(900, 1000);
  }
  if (level === "hard") {
    time = randomTime(500, 1000);
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
  header.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
  finalScoreContainer.style.display = "block";
  playersFinalScore.textContent = score;
  timeUp = true;
  checkHighScore(level);
  closeFinalScore.addEventListener("click", function () {
    start();
  });
}

function startGame() {
  timeUp = false;
  peep();
  changeButton();
  footer.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
  setTimeout(() => showFinalScore(level), 10000);
}

function whack(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", whack));

function getHighScore() {
  highScoreE = localStorage.getItem("highScoreE");
  highScoreH = localStorage.getItem("highScoreH");
}

// High Score
function checkHighScore(level) {
  if (level === "easy") {
    if (highScoreE === null || highScoreE === "0") {
      localStorage.setItem("highScoreE", "0");
      finalScoreTitle.style.display = "block";
      displayHighScore.textContent = "0";
    }
    if (score <= highScoreE) {
      displayHighScore.textContent = highScoreE;
    }
    if (score > highScoreE) {
      localStorage.setItem("highScoreE", score);
      finalScoreTitle.style.display = "none";
      newHighScore.style.display = "block";
      displayHighScore.textContent = score;
    }
  }
  if (level === "hard") {
    if (highScoreH === null || highScoreH === "0") {
      localStorage.setItem("highScoreH", "0");
      finalScoreTitle.style.display = "block";
      displayHighScore.textContent = "0";
    }
    if (score > highScoreH) {
      localStorage.setItem("highScoreH", score);
      finalScoreTitle.style.display = "none";
      newHighScore.style.display = "block";
      displayHighScore.textContent = score;
    } else {
      displayHighScore.textContent = highScoreH;
    }
  }
}

function start() {
  mode.textContent = "Easy";
  finalScoreContainer.style.display = "none";
  newHighScore.style.display = "none";
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  setLevel();
  getHighScore();
  btn.textContent = "Start The Game!";
}

start();

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  checkHighScore(level);
}
