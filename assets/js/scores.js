const highScoresList = document.getElementById("highscores");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const clearButton = document.getElementById("clear");

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
