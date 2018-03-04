

function enviroment(daysOnTrail, milesTraveled, currentWeather, currentHealth, healthStatus, currentPace, currentTerrain, partyAlive) {
  this.daysOnTrail = daysOnTrail;
  this.milesTraveled = milesTraveled;
  this.currentWeather = currentWeather;
  this.currentHealth = currentHealth;
  this.currentPace = currentPace;
  this.currentTerrain = currentTerrain;
  this.partyAlive = partyAlive;
};
var currentEnviroment;




var dayCycle = function(event) {
  if(event.which === 13) {
    document.removeEventListener('keypress', dayCycle);

    fetch('/trail/dayCycle').then((res) => {
      res.json().then((data) => {
        playerDead = data.playerDead;

        if(data.gameOver === true) {
          end();
        }else if(playerDead) {
          showMessage("A member of the party is Dead");
        }
      });
    });
    updateStatus();
  }
}
function startDay() {
  if(currentEnviroment.daysOnTrail === 0) {
    showMessage("Press Enter to Begin...");
  }else {
    showMessage("Press Enter to Continue");
  }
  document.addEventListener('keypress', dayCycle);
};



function updateStatus() {
  fetch('/trail/getEnviroment').then((res) => {
    res.json().then((data) => {
      currentEnviroment = data;

      document.getElementById('daysOnTrail').innerHTML = currentEnviroment.daysOnTrail;
      document.getElementById('milesTraveled').innerHTML = currentEnviroment.milesTraveled;
      document.getElementById('currentWeather').innerHTML = currentEnviroment.currentWeather;
      document.getElementById('currentHealth').innerHTML = currentEnviroment.currentHealth;
      document.getElementById('healthStatus').innerHTML = currentEnviroment.healthStatus;
      document.getElementById('currentPace').innerHTML = currentEnviroment.currentPace;
      document.getElementById('currentTerrain').innerHTML = currentEnviroment.currentTerrain;
      document.getElementById('partyAlive').innerHTML = currentEnviroment.partyAlive;


      document.getElementById("start").innerHTML = currentEnviroment.milesTraveled;


      document.getElementById("terrainImage").src =
        "../images/" + currentEnviroment.currentTerrain + ".jpg";

      moveCart(currentEnviroment.milesTraveled);
      startDay();
    });
  });
}



function sendNewEnv(envName, envValue) {
  fetch('/trail/updateEnviroment/' + envName + '/' + envValue,
    {method: 'POST'}).then((res) => {
      res.json().then((data) => {
        var change = document.getElementById(envName);
        currentEnviroment = data;

        change.innerHTML = envValue;
      })
    });

}


//Change Pace
document.addEventListener('keypress', (event) => {
  if(event.which === 32) { //if SPACE
    var pace = new Array(
      'Steady',
      'Strenuous',
      'Grueling',
      'Resting'
    );
    var index = pace.indexOf(currentEnviroment.currentPace) + 1;
    if(index >= pace.length) {
      index = 0;
    }
    sendNewEnv('currentPace', pace[index]);
  }
});

function end() {
  console.log("Game Over");
  window.location.assign('/end');
}





function showMessage(messageContent) {
  var messageBox = document.getElementById("messageWindow");
  messageBox.innerHTML = messageContent;
  messageBox.style.display = 'inline';
  messageBox.style.opacity = 1;
}
function closeMessage() {
  var messageBox = document.getElementById("messageWindow");
  messageBox.style.display = 'none';
  messageBox.style.opacity = 0;
}




function moveCart(dist) {
  var wagon = document.getElementById("wagon");
  var pix = (dist * 220) / 100;

  wagon.style = "left: " + pix + "px";


  var rotate = ((pix / 1320) * 2520)

  //Spin wheels
  document.getElementById("leftCross").style.transform = "rotate(" + (rotate) + "deg)";
  document.getElementById("rightCross").style.transform = "rotate(" + (rotate) + "deg)";
}

updateStatus(); //Initial fill onload
