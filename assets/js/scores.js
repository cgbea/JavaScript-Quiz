var highScoresList = document.getElementById("highscores");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var clearButton = document.getElementById("clear");

// Creating the leaderboard out of the localStorage array
highScoresList.innerHTML = highScores
  .map(function (score) {
    return (
      '<li class="high-score">' +
      score.initials +
      " scored " +
      score.score +
      "</li>"
    );
  })
  .join("");

// Clearing the highscore table/localStorage
clearButton.addEventListener("click", function () {
  localStorage.clear();
  highScoresList.innerHTML = "";
});
