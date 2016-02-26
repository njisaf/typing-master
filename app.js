window.onload = function() {
  console.log("window.onload triggered.")
  Minions.buildMinions();
  Game.gameStarter();
};

var Minions = {

  minionArray: [],

  Builder: function(name, image, attBounce, attPop, attSurf, attSlow, attCrazy) {
    this.name = name;
    this.path = "images/" + image;
    this.attBounce = "images/" + attBounce;
    this.attPop = "images/" + attPop;
    this.attSurf = "images/" + attSurf;
    this.attSlow = attSlow;
    this.attCrazy = attCrazy;
    Minions.minionArray.push(this);
  },

  buildMinions: function() {
    var rat = new Minions.Builder("Ratchet Rodent", "rat.jpg", "rat_attack.png", "blank.png", "blank.png", "", "");
    var bunny = new Minions.Builder("Bizarre Bunny", "bunny.jpg", "carrot_attack.png", "blank.png", "blank.png", "", "");
    var ogre = new Minions.Builder("Obsessive Ogre", "ogre.jpg", "ogre_club.png", "shrek.jpg", "rubberduck.jpg", "", "");
    var wizard = new Minions.Builder("Whispering Wizard", "wizard.jpg", "wizard_attack.png", "blank.png", "blank.png", "shake-slow", "");
    var spectre = new Minions.Builder("Spangley Spectre", "spectre.jpg", "surf_attack.png", "blank.png", "blank.png", "shake-slow", "shake-crazy");
  },

  renderMinion: function() {
    console.log("renderMinion triggered.")
    Game.elTextBlock.innerHTML = textSource[Game.roundNumber];
    Game.elMinionImg.src = Minions.minionArray[Game.roundNumber].path;
    Game.elBounce.data = Minions.minionArray[Game.roundNumber].attBounce;
    Game.elPop.data = Minions.minionArray[Game.roundNumber].attPop;
    Game.elSurf.data = Minions.minionArray[Game.roundNumber].attSurf;
    Game.elTextBlock.className = Minions.minionArray[Game.roundNumber].attSlow;
    Game.elMinionImg.className = Minions.minionArray[Game.roundNumber].attCrazy;
    Game.textA = textSource[Game.roundNumber];
    Game.minionAttack();
    Minions.startAttack();
    console.log("textA is now: " + Game.textA);
  },

  startAttack: function() {
    Game.elBounce.hidden = false;
    Game.elPop.hidden = false;
    Game.elSurf.hidden = false;
  },

  endAttack: function() {
    Game.elBounce.hidden = true;
    Game.elPop.hidden = true;
    Game.elSurf.hidden = true;
  },

};

var timerEl = document.getElementById("timer");

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
  roundRunning: true,
  characterCount: 0,
  results: 0,

  textA: null,
  textB: null,

  elTextBlock: document.getElementById("textBlock"),
  elResults: document.getElementById("formResults"),
  elSubmit: document.getElementById("formText"),
  elMinionImg: document.getElementById("minionHolder"),
  elBounce: document.getElementById("bounceAttack"),
  elPop: document.getElementById("popAttack"),
  elSurf: document.getElementById("surfAttack"),
  elButton: document.getElementById("buttonHolder"),
  elBody: document.getElementById("mainBody"),

    gameStarter: function() {
    Buttons.begin();
    Game.elTextBlock.innerHTML = "Get to ready to start! Click the button to start.";
    Game.elSubmit.disabled = true;
  },

  gamePlayer: function(e) {
    Game.roundRunning = true;
    if (Game.roundNumber === textSource.length) {
      Buttons.again();
      Game.elResults.innerHTML = "";
    } else {
      console.log("gamePlayer triggered.")
      Buttons.kill();
      Game.elSubmit.addEventListener("keypress", Game.captureText, true);
      console.log("start clock");
      Minions.renderMinion();
      startClock();
      console.log("start clock");
    };
  },

  captureText: function(e) {
    if (e.keyCode === 13 || e.which === 13) {
      console.log("stop clock");
      clearInterval(sInterval);
      clearInterval(atkInterval);
      Game.textB = e.currentTarget.value;
      console.log("textB is now: " + Game.textB);
      e.currentTarget.value = null;
      Minions.endAttack();
      Game.winOrLose();
      Game.elSubmit.removeEventListener("keypress", Game.captureText, true);
    };
  },

  // renderMinion: function() {
  //   console.log("renderMinion triggered.")
  //   Game.elTextBlock.innerHTML = textSource[Game.roundNumber];
  //   Game.elMinion.innerHTML = Minions.minionArray[Game.roundNumber].name;
    // Game.minionAttack();
  //   Game.textA = textSource[Game.roundNumber];
  //   console.log("textA is now: " + Game.textA);
  // },

  minionAttack: function() {
    if (Game.roundRunning = true) {
      atkInterval = setInterval(Game.attackDetect, Minions.minionArray[Game.roundNumber].speed);
    } else if (Game.roundRunning = false) {
      console.log("Game is not running")
      // Game.elBody.className = "background_white";
    } else {
      console.log("minionAttack is broken");
    }

  },

  // attackDetect: function() {
  //   if (Game.elBody.classList.contains("background_white")) {
  //     Game.elBody.className = Minions.minionArray[Game.roundNumber].attack1;
  //     // Game.minionAttack();
  //   } else if (Game.elBody.classList.contains(Minions.minionArray[Game.roundNumber].attack1)) {
  //     Game.elBody.className = Minions.minionArray[Game.roundNumber].attack2;
  //     Game.minionAttack();
  //   } else if (Game.elBody.classList.contains(Minions.minionArray[Game.roundNumber].attack2)) {
  //     Game.elBody.className = Minions.minionArray[Game.roundNumber].attack1;
  //     Game.minionAttack();
  //   } else {
  //     console.log("attackDetect is broken.")
  //   }
  // },

  winOrLose: function() {
    console.log("winOrLose triggered.");
    Game.results = compare(Game.textA, Game.textB);
    Game.elResults.innerHTML = "You have: " + Game.results + " errors.";
    resultsArray.push(Game.results);
    console.log(resultsArray);
    if (Game.results < 10) {
      // Game.elSubmit.removeEventListener("keypress");
      Game.elTextBlock.innerHTML = "YOU WIN! Click the button to start the next round.";
      console.log("roundNumber " + Game.roundNumber + " is WON.");
      Game.roundNumber += 1;
      console.log("roundNumber: " + Game.roundNumber);
      Game.roundRunning = false;
      Buttons.nextround();
      // Game.elSubmit.disabled = true;
    } else if (Game.results >= 10) {
      Game.elTextBlock.innerHTML = "You Lose! Too many errors, please type the text exactly as you see it here.";
      console.log("Round lost.");
      Game.lose();
    } else {
      console.log("WHY BROKEN?");
    };
  },

  lose: function() {
    // Game.elSubmit.removeEventListener("keypress");
    console.log("roundNumber " + Game.roundNumber + " is LOST.")
    Game.roundRunning = false;
    Buttons.loser();
    // Game.elResults.innerHTML = "";
    Game.roundNumber = 0;
    console.log("roundNumber: " + Game.roundNumber);
    resultsArray = [];
    console.log(resultsArray);
  },
};

function startClock(){

  to1 = function(){
    setTimeout("timerEl.innerHTML = 'Get Ready'", 250);
  };
  to2 = function(){
    setTimeout("timerEl.innerHTML = 'Get Set!'", 2000);
  };
  to3 = function(){
    setTimeout("timerEl.innerHTML = 'TYPE!'", 3000);
  };
  to4 = function(){
    setTimeout("startTimer()", 4000);
  };
  to1();
  to2();
  to3();
  to4();
};

function myTimer(duration, display) {
  console.log("timer running");
    var timer = duration, minutes, seconds;
    function tick() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            console.log("Time's Up");
            Game.elTextBlock.innerHTML = "Times Up! You were to slow"
            clearInterval(sInterval);
            Game.lose();
        }
    };
    sInterval = setInterval(tick, 1000)
}

function startTimer() {
  Game.elSubmit.disabled = false;
  Game.elSubmit.focus();
  var characterCount = Game.textA.length / 1.5;
  var difficulty = (Game.roundNumber * 1.25 + 10) * .01;
  var setDuration = characterCount - Math.floor(difficulty * characterCount);
      display = timerEl;
  console.log("difficulty " + difficulty);
  console.log("Time " + setDuration);
  myTimer(setDuration, display);
};

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
