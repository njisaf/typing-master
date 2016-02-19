// function compare(a, b){
//   if(a.length == 0) return b.length;
//   if(b.length == 0) return a.length;

//   var matrix = [];

//   // increment along the first column of each row
//   var i;
//   for(i = 0; i <= b.length; i++){
//     matrix[i] = [i];
//   }

//   // increment each column in the first row
//   var j;
//   for(j = 0; j <= a.length; j++){
//     matrix[0][j] = j;
//   }

//   // Fill in the rest of the matrix
//   for(i = 1; i <= b.length; i++){
//     for(j = 1; j <= a.length; j++){
//       if(b.charAt(i-1) == a.charAt(j-1)){
//         matrix[i][j] = matrix[i-1][j-1];
//       } else {
//         matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
//                                 Math.min(matrix[i][j-1] + 1, // insertion
//                                          matrix[i-1][j] + 1)); // deletion
//       }
//     }
//   }

//   return matrix[b.length][a.length];
// };

// var textOne = "Apples and Oranges";

// var textTwo = "Apples and Oranges";

// console.log(compare(textOne, textTwo));

// var levelMod = 1.5;
// var characterCount = 1000;

// var distractions = {
//   distractionOne: setInterval(effectOne, 5000 * levelMod), 
//   distractionTwo: setInterval(effectOne, 12500 * levelMod),
// }

var timerStartEl = document.getElementById("timerStart");
var timerStopEl = document.getElementById("timerStop")
var timerEl = document.getElementById("timer");

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
            console.log("Time's Up")
        }
    };
    sInterval = setInterval(tick, 1000)
}

function startTimer() {
    var setDuration = 60 * .25,
        display = timerEl;
    myTimer(setDuration, display);
};
timerStopEl.addEventListener("click", function(){
  console.log("stop click");
  clearInterval(sInterval)
})

timerStartEl.addEventListener("click", function(){
  console.log("start click");
  startTimer();
});

// var givenTime = 10000
// var timeLimit = 90000
// var clockInterval = 10
// resetClock()
// function updateClock(){
//     var now = new Date().getTime(); 
//     if (now < timeLimit){
//       var currentTime = timeLimit - now;
//       timerEl.textContent = currentTime;
//     } else {
//       clearInterval(clockInterval)
//     };
// };
// function resetClock(){
//     timeLimit = new Date().getTime() + givenTime
//     clearInterval(clockInterval);
//     clockInterval = setInterval(updateClock,10);
//     console.log("reset");
// };

// timerStartEl.addEventListener("click", resetClock());
