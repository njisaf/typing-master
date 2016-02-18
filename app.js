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
  elSubmit: document.getElementById("formAll"),
  elUserText: document.getElementById("formText"),
  elStartButton: document.getElementById("startButton"),

  gameStarter: function() {
    Game.elStartButton.hidden = false;
    Game.elStartButton.innerHTML = "Click to Start.";
    Game.elStartButton.addEventListener("click", function() {
      Game.gamePlayer();
      Game.elStartButton.hidden = true;
    });
    Game.elTextBlock.innerHTML = "Get to ready to start! Click the button to start.";
  },


  gamePlayer: function() {
    Game.renderTextBlock();
    // delay display
    Game.elSubmit.addEventListener("submit", function(e) {
      e.preventDefault();
      Game.textB = e.target.formText.value;
      console.log("textTwo is now: " + Game.textA);
      Game.results = compare(Game.textA, Game.textB);
      Game.elResults.innerHTML = Game.results;
      resultsArray.push(Game.results);
      console.log(resultsArray);
      e.target.formText.value = null;
      Game.winOrLose();
    });
    Game.roundNumber++;
    console.log("roundNumber: " + Game.roundNumber);
  },

  renderTextBlock: function() {
    Game.elTextBlock.innerHTML = textSource[Game.roundNumber];
    Game.textA = textSource[Game.roundNumber];
  },

  winOrLose: function() {
    console.log("winOrLose working");
    if (Game.results < 10) {
      Game.elStartButton.hidden = false;
      Game.elStartButton.innerHTML = "YOU WIN! Click for next round.";
      // Game.gamePlayer();
    } else if (Game.results >= 10) {
      // Game.elResults.innerHTML = "You lose! Try again, LOSER."
      Game.elStartButton.hidden = false;
      Game.elStartButton.innerHTML = "LOSER! Click to try again.";
      Game.elStartButton.addEventListener("click", Game.gameStarter);
      Game.elResults.innerHTML = "";
      Game.roundNumber = 0;
      resultsArray = [];
    };
  },
}

window.onload = Game.gameStarter();

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
