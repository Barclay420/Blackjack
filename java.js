var timer;
document.addEventListener("DOMContentLoaded", function(){
const start = document.getElementById('start');
const game = document.getElementById('game');
var counter = 0;
//var scoreboard = document.getElementById('scoreboard');
var clock = document.getElementById('clock');

var currenttime = 0;

start.onclick = function() {
    console.log('hej');
    let i = 0;

    let timerid = setInterval (function(){
console.log('!')
    }, 1000);
    game.classList.add('gaming');
    currentTime = 0;
    

    
};


});
function updatetime(){
    currenttime++;
    clock.innerHTML = max - currenttime;
    if(currentTime == maxtime){
    game.classList.remove('gaming');
    }
    console.log('trick');
}


