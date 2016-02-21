window.onload = function() {
  console.log("window.onload triggered.")
  Game.gameStarter();
};

  var minionArray = [];

  var ogre = new Minion("Obsessive Ogre", "20000", "discworld", "background_red", "background_blue");
  var rat = new Minion("Ratchet Rodent", "20000", "storm", "background_yellow", "background_green");
  var wizard = new Minion("Wispering Wizard", "20000", "discworld", "background_red", "background_yellow");
  var bunny = new Minion("Bizarre Bunny", "20000", "storm", "background_blue", "background_green");
  var spectre = new Minion("Spangley Spectre", "20000", "discworld", "background_red", "background_white");
  console.log(minionArray);

  function Minion(name, speed, textsrc, attack1, attack2) {
    this.name = name;
    this.speed = speed;
    this.textsrc = textsrc;
    this.attack1 = attack1;
    this.attack2 = attack2;
    minionArray.push(this);
  };


var TextBuilder = {

  // sentences is the number of full sentences (period to period) will be returned.
  sentences: 2,
  stringArray: [],
  startIndex: 0,
  endIndex: 0,

  runThis: function() {
    TextBuilder.splitter();
    TextBuilder.findStartEnd();
    console.log("startIndex is: " + TextBuilder.startIndex);
    console.log("endIndex is: " + TextBuilder.endIndex);
    TextBuilder.buildSentences();
    console.log("textA is now: " + Game.textA);
  },

  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  splitter: function() {
    var findTextSrc = minionArray[Game.roundNumber].textsrc;
    var re = /\./g;
    console.log(findTextSrc);
    if (findTextSrc === "discworld") {
      var loadTextSrc = TextSource.discworld.replace(re, " .");
      console.log(loadTextSrc);
      TextBuilder.stringArray = loadTextSrc.split(" ");
      console.log("discworld loaded into stringArray");
    } else if (findTextSrc === "storm") {
      var loadTextSrc = TextSource.storm.replace(re, " .");
      console.log(loadTextSrc);
      TextBuilder.stringArray = loadTextSrc.split(" ");
      console.log("storm loaded into stringArray");
    } else {
      console.log("TextBuilder splitter is broken.")
    };
  },

  findStartEnd: function() {
    var indices = [];
    var element = ".";
    var index = TextBuilder.stringArray.indexOf(element);
      while (index != -1) {
        indices.push(index);
        index = TextBuilder.stringArray.indexOf(element, index + 1);
      };
    console.log("Indices found: " + indices);
    var indicesRandom = indices[TextBuilder.getRandom(0, indices.length)];
    var indicesRandomIndex = indices.indexOf(indicesRandom);
    console.log("indicesRandomIndex: " + indicesRandomIndex);
    var indicesEnd = indicesRandomIndex + (TextBuilder.sentence + 1);
    TextBuilder.startIndex = indicesRandom;
    TextBuilder.endIndex = indices[indicesEnd];
  },

  buildSentences: function() {
    var sentenceArray = TextBuilder.stringArray.slice(TextBuilder.startIndex, TextBuilder.endIndex);
    console.log("sentenceArray: " + sentenceArray);
    Game.textA = sentenceArray.join(" ");
  },
};

// var textSource = [
//   "In a distant and second-hand set of dimensions, in an astral plane that was never meant to fly, the curling star-mists waver and part.",
//   "Great A'Tuin the turtle comes, swimming slowly through the interstellar gulf, hydrogen frost on his ponderous limbs, his huge and ancient shell pocked with meteor craters.",
//   "Through sea-sized eyes that are crusted with rheum and asteroid dust He stares fixedly at the Destination.",
//   "In a brain bigger than a city, with geological slowness, He thinks only of the Weight.",
//   "Most of the weight is of course accounted for by Berilia, Tubul, Great T'Phon and Jerakeen, the four giant elephants."
// ];
var resultsArray = [];

var Game = {
  roundNumber: 0,
  roundRunning: true,
  characterCount: 0,
  results: 0,

  textA: null,
  textB: null,

  elTextBlock: document.getElementById("textBlock"),
  elResults: document.getElementById("formResults"),
  elSubmit: document.getElementById("formText"),
  elMinion: document.getElementById("minionHolder"),
  elButton: document.getElementById("buttonHolder"),
  elBody: document.getElementById("mainBody"),

  gameStarter: function() {
    Buttons.begin();
    Game.elTextBlock.innerHTML = "Get to ready to start! Click the button to start.";
    Game.elMinion.innerHTML = "Minion Hole";
  },


  gamePlayer: function(e) {
    Game.roundRunning = true;
    // game is counting minions to determine how many rounds there are overall. May need to tweak!!!
    if (Game.roundNumber === minionArray.length) {
      Buttons.again();
      Game.elTextBlock.innerHTML = "YOU WIN! Game over. Click the button to play again."
      Game.elResults.innerHTML = "";
    } else {
    console.log("gamePlayer triggered.")
    Buttons.kill();
    Game.renderMinion();
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

  renderMinion: function() {
    console.log("renderMinion triggered.")
    TextBuilder.runThis();
    Game.elTextBlock.innerHTML = Game.textA;
    Game.elMinion.innerHTML = minionArray[Game.roundNumber].name;
    Game.minionAttack();
    // Game.textA = textSource[Game.roundNumber];
    // console.log("textA is now: " + Game.textA);
  },

  minionAttack: function() {
    if (Game.roundRunning = true) {
      setInterval(Game.attackDetect, minionArray[Game.roundNumber].speed);
    } else if (Game.roundRunning = false) {
      Game.elBody.className = "background_white";
    } else {
      console.log("minionAttack is broken");
    }

  },

  attackDetect: function() {
    if (Game.elBody.classList.contains("background_white")) {
      Game.elBody.className = minionArray[Game.roundNumber].attack1;
      Game.minionAttack();
    } else if (Game.elBody.classList.contains(minionArray[Game.roundNumber].attack1)) {
      Game.elBody.className = minionArray[Game.roundNumber].attack2;
      Game.minionAttack();
    } else if (Game.elBody.classList.contains(minionArray[Game.roundNumber].attack2)) {
      Game.elBody.className = minionArray[Game.roundNumber].attack1;
      Game.minionAttack();
    } else {
      console.log("attackDetect is broken.")
    }
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
      Game.roundRunning = false;
      Buttons.nextround();
    } else if (Game.results >= 10) {
      Game.elSubmit.removeEventListener("keypress");
      console.log("roundNumber " + Game.roundNumber + " is LOST.")
      Game.roundRunning = false;
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