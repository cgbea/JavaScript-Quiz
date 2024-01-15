var timerElement = document.querySelector("#time");
var startButton = document.querySelector("#start");
var finalScore = document.querySelector("#final-score");
var submit = document.querySelector("#submit");
var yaySound = new Audio("./assets/sfx/correct.wav");
var booSound = new Audio("./assets/sfx/incorrect.wav");
var timerCount;

function startGame() {
  timerCount = 75;
  startButton.disabled = true;
  startTimer();
  removeStartScreen();
  toggleQuestions();
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount === 0) {
      clearInterval(timer);
      alert("You ran out of time! Refresh the page to start again.");
    }
  }, 1000);
}

function removeStartScreen() {
  var startScreen = document.querySelector("#start-screen");
  startScreen.classList.replace("start", "hide");
}

function toggleQuestions() {
  var toggleQs = document.getElementById("questions");
  toggleQs.classList.toggle("hide");
}

function toggleFB() {
  var toggleFB = document.getElementById("feedback");
  toggleFB.classList.toggle("hide");
}

startButton.addEventListener("click", startGame);

let currentQuestion = 0;

function showQuestion() {
  const questionTitle = document.getElementById("question-title");
  questionTitle.textContent = questions[currentQuestion].question;
  const choices = document.querySelectorAll(".choice");
  choices.forEach(function (choice, i) {
    choice.textContent = questions[currentQuestion].choices[i];
  });
  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
}

function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  if (selected === questions[currentQuestion].correct) {
    feedback.textContent = "Correct!";
    toggleFB();
    yaySound.play();
  } else {
    feedback.textContent = "Incorrect!";
    toggleFB();
    timerCount = timerCount - 10;
    booSound.play();
  }

  setTimeout(function () {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      toggleFB();
      showQuestion();
    } else {
      toggleQuestions();
      toggleFB();
      toggleEnd();
      clearInterval(timer);
    }
  }, 1000);
}

function toggleEnd() {
  var toggleEnd = document.getElementById("end-screen");
  toggleEnd.classList.toggle("hide");
  finalScore.textContent = timerCount;
}

submit.addEventListener("click", saveHighScore);

function getInitials() {
  return localStorage.getItem("userInitials");
}

function getScore() {
  return localStorage.getItem("score");
}

var initials = document.getElementById("initials");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighscores = 5;

function saveHighScore() {
  var score = {
    score: timerCount,
    initials: initials.value,
  };

  highScores.push(score);
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  highScores.splice(maxHighscores);

  localStorage.setItem("highScores", JSON.stringify(highScores));
}
