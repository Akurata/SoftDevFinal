
var toGame = function toGame() {
  window.location.assign('/game');
}

var toTopTen = function toTopTen() {
  window.location.assign('/topten');
}

var audio = new Audio('/music/music.mp3');
function checkSound() {
  var currentSound = sessionStorage.getItem('soundStatus');
  if(currentSound == "true") {
    //Start music
    audio.play();
  }else {
    //Stop music
    audio.pause();
  }
}
checkSound();

function toggleSound() {
  var currentSound = sessionStorage.getItem('soundStatus');
  var off = document.getElementById('offText');
  var on = document.getElementById('onText');
   if(currentSound == "true") {
       currentSound = "false";
       on.className = '';
       off.className = 'active';
   }
   else {
       currentSound = "true";
       off.className = '';
       on.className = 'active';
   }
   sessionStorage.setItem('soundStatus', currentSound);
    checkSound();
};

window.onload = function addListeners() {
  document.getElementById("toGame").addEventListener('onClick', toGame);
  document.getElementById("toTopTen").addEventListener('onClick', toTopTen);
  document.getElementById("toggleSound").addEventListener('onClick', toggleSound());

  document.addEventListener('keypress', function(event) {
    if(event.which == 49) { //Press 1 and directs to game
      toGame();
    }else if(event.which == 51) { //Press 3 and directs to topten
      toTopTen();
    }else if(event.which == 52){
      toggleSound();
    }
  });
};
