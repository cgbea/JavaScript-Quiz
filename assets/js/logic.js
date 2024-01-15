var timerElement = document.querySelector("#time");
var startButton = document.querySelector("#start");
var finalScore = document.querySelector("#final-score")
var submit = document.querySelector("#submit")

var timerCount;
// The startGame function is called when the start button is clicked
function startGame() {
  timerCount = 75;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer();
  removeStartScreen();
  toggleQuestions();
}


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    //   if (timerCount >= 0) {
    //     // Tests if win condition is met
    //     if (isWin && timerCount > 0) {
    //       // Clears interval and stops timer
    //       clearInterval(timer);
    //       winGame();
    //     }
    //   }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
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
// function toggleFeedback(){
//   var toggleFB = document.getElementById("feedback");
//   toggleFB.classList.toggle("hide");
// }
// Attach event listener to start button to call startGame function on click
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
  } else {
    feedback.textContent = "Incorrect!"
    toggleFB();
    timerCount = timerCount - 10;
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
  toggleFB;
}

showQuestion();

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
// function updateHTML() {
//   var initials = getInitials();
//   var score = getScore();
//   document.getElementById("highscores").innerHTML = initals + " scored " + score;
// }

var initials = document.getElementById("initials");


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const maxHighscores = 5;

function saveHighScore() {
  var score = {
      score: timerCount,
      initials: initials.value,
  };
  
  highScores.push(score);
  highScores.sort(function(a, b) {
      return b.score - a.score;
  });
  highScores.splice(maxHighscores);

  localStorage.setItem('highScores', JSON.stringify(highScores));
}


// function getInput() {
//   // Gets input value

//   }
//   // Saves data to retrieve later
//   localStorage.setItem("userInitials", initials);
//   localStorage.setItem("userScore", timerCount)
//   // https://stackoverflow.com/questions/52505323/save-input-value-to-local-storage-and-retrieve-it-on-a-different-page
//   // // Updates HTML
//   updateHTML();
// }