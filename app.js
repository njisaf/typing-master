var textSource = [
  "In a distant and second-hand set of dimensions, in an astral plane that was never meant to fly, the curling star-mists waver and part.",
  "Great A'Tuin the turtle comes, swimming slowly through the interstellar gulf, hydrogen frost on his ponderous limbs, his huge and ancient shell pocked with meteor craters.",
  "Through sea-sized eyes that are crusted with rheum and asteroid dust He stares fixedly at the Destination.",
  "In a brain bigger than a city, with geological slowness, He thinks only of the Weight.",
  "Most of the weight is of course accounted for by Berilia, Tubul, Great T'Phon and Jerakeen, the four giant elephants."
];
var resultsArray = [];

var Game = {
  roundNumber: 0,
  characterCount: 0,
  results: 0,

  textA: null,
  textB: null,

  elTextBlock: document.getElementById("textBlock"),
  elResults: document.getElementById("formResults"),
  elSubmit: document.getElementById("formText"),
  elButton: document.getElementById("buttonHolder"),

  gameStarter: function() {
    Buttons.begin();
    Game.elTextBlock.innerHTML = "Get to ready to start! Click the button to start.";
  },


  gamePlayer: function(e) {
    if (Game.roundNumber === textSource.length) {
      Buttons.again();
      Game.elTextBlock.innerHTML = "YOU WIN! Game over. Click the button to play again."
      Game.elResults.innerHTML = "";
    } else {
    console.log("gamePlayer triggered.")
    Buttons.kill();
    Game.renderTextBlock();
    // delay display
    Game.elSubmit.addEventListener("keypress", Game.captureText, true);
  };
  },

  captureText: function(e) {
    e.preventDefault();
    var key = e.which || e.keyCode;
    if (key === 13) {
      Game.elSubmit.removeEventListener("keypress");
      Game.textB = e.currentTarget.value;
      console.log("textB is now: " + Game.textB);
      e.currentTarget.value = null;
      Game.winOrLose();
    };
  },


  renderTextBlock: function() {
    console.log("renderTextBlock triggered.")
    Game.elTextBlock.innerHTML = textSource[Game.roundNumber];
    Game.textA = textSource[Game.roundNumber];
    console.log("textA is now: " + Game.textA);
  },

  winOrLose: function() {
    console.log("winOrLose triggered.");
    Game.results = compare(Game.textA, Game.textB);
    Game.elResults.innerHTML = Game.results;
    resultsArray.push(Game.results);
    console.log(resultsArray);
    if (Game.results < 10) {
      Game.elSubmit.removeEventListener("keypress");
      console.log("roundNumber " + Game.roundNumber + " is WON.")
      Game.roundNumber += 1;
      console.log("roundNumber: " + Game.roundNumber);
      Buttons.nextround();
    } else if (Game.results >= 10) {
      Game.elSubmit.removeEventListener("keypress");
      console.log("roundNumber " + Game.roundNumber + " is LOST.")
      Buttons.loser();
      Game.elResults.innerHTML = "";
      Game.roundNumber = 0;
      console.log("roundNumber: " + Game.roundNumber);
      resultsArray = [];
      console.log(resultsArray);
    };
  },
}

var Buttons = {

  begin: function() {
    Game.elButton.innerHTML = "<button id=\"buttonActual\" onclick=\"Game.gamePlayer()\">Click to Start!</button>";
  },
  nextround: function() {
    Game.elButton.innerHTML = "<button id=\"buttonActual\" onclick=\"Game.gamePlayer()\">Click for Next Round!</button>";
  },
  loser: function() {
    Game.elButton.innerHTML = "<button id=\"buttonActual\" onclick=\"Game.gameStarter()\">YOU LOST! Try Again, LOSER!</button>";
  },
  again: function() {
    Game.elButton.innerHTML = "<button id=\"buttonActual\" onclick=\"Game.gameStarter()\">Click to Play Again!</button>";
  },
  kill: function() {
    Game.elButton.innerHTML = "";
  },

}


window.onload = function() {
  console.log("window.onload triggered.")
  Game.gameStarter();
};
/*
Copyright (c) 2011 Andrei Mackenzie
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function compare(a, b) {
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};
