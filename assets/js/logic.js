var timerElement = document.querySelector("#time");
var startButton = document.querySelector("#start");

var timerCount;
// The startGame function is called when the start button is clicked
function startGame() {
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
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
        alert("if okay, change this function into displayScore");
      }
    }, 1000);
  }
  
  // Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);
