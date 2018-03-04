

function toMainMenu() {
  window.location.assign('/mainmenu');
}




function gameScreen(screenNumber) {
  var gameContainer = document.getElementById("gameContainer");

  var screenZeroListener = function(event) {
    if(event.which === 32) {
      toMainMenu();
      document.removeEventListener('keypress', screenZeroListener);
    }else if(event.which === 49) {
      saveProfession('Banker');
      document.removeEventListener('keypress', screenZeroListener);
    }else if(event.which === 50) {
      saveProfession('Carpenter');
      document.removeEventListener('keypress', screenZeroListener);
    }else if(event.which === 51) {
      saveProfession('Farmer');
      document.removeEventListener('keypress', screenZeroListener);
    }
  };

  var screenThreeListener = function(event) {
    if(event.which === 32) {
      toMainMenu();
      document.removeEventListener('keypress', screenThreeListener);
    }else if(event.which === 49) {
      saveStartMonth("March");
      document.removeEventListener('keypress', screenThreeListener);
    }else if(event.which === 50) {
      saveStartMonth("April");
      document.removeEventListener('keypress', screenThreeListener);
    }else if(event.which === 51) {
      saveStartMonth("May");
      document.removeEventListener('keypress', screenThreeListener);
    }else if(event.which === 52) {
      saveStartMonth("June");
      document.removeEventListener('keypress', screenThreeListener);
    }else if(event.which === 53) {
      saveStartMonth("July");
      document.removeEventListener('keypress', screenThreeListener);
    }
  };

  var screenFourListener = function(event) {
    if(event.which === 32) {
      toMainMenu();
      document.removeEventListener('keypress', screenFourListener);
    }else if(event.which === 13) {
      window.location.assign('/trail');
    }
  };

  fetch('/game/getNewGameScreen/' + screenNumber).then((res) => {
    if(res.status !== 200) {
      console.log('problem with ajax call!' + res.status + 'msg: ' + res.value);
      return;
    }
    if(screenNumber !== 4) {
      res.text().then((data) => {
        document.getElementById("gameContainer").innerHTML = data;
      })
        if(screenNumber == 0) {
          document.addEventListener('keypress', screenZeroListener);
        }else if(screenNumber == 3) {
          document.addEventListener('keypress', screenThreeListener);
        }
    }else {
      res.text().then((data) => {
        document.addEventListener('keypress', screenFourListener);

        document.getElementById("gameContainer").innerHTML = data;
        document.getElementById("settingName").innerHTML = displaySettings.playerName;
        document.getElementById("settingProfession").innerHTML = displaySettings.profession;
        document.getElementById("settingParty").innerHTML = displaySettings.party;
        document.getElementById("settingMonth").innerHTML = displaySettings.startMonth;

        document.getElementById("continue").innerHTML = "Press <em>ENTER</em> to continue to the trail!"
      })
    }
  })
}
gameScreen(0);

var displaySettings; //Holder for settings
function settings(playerName, profession, party, startMonth) {
  this.playerName = playerName;
  this.profession = profession;
  this.party = party;
  this.startMonth = startMonth;
}


function saveProfession(profession) { //Screen 0
  fetch('/game/save/profession/' + profession, {method: 'POST'});
  gameScreen(1);
}

function savePlayer(playerName) { //Screen 1
  fetch('/game/save/playerName/' + playerName, {method: 'POST'});
  gameScreen(2);
}

function saveParty() { //Screen 2
  partyMembers = new Array(
    document.getElementById('Mem1').value,
    document.getElementById('Mem2').value,
    document.getElementById('Mem3').value,
    document.getElementById('Mem4').value
  );
  fetch('/game/save/party/' + partyMembers, {method: 'POST'});
  gameScreen(3)
}

function saveStartMonth(startMonth) { //Screen 3
  fetch('/game/save/startMonth/' + startMonth, {method: 'POST'});
  showSettings();
  gameScreen(4);
}

function showSettings() { //Screen 4
  var temp = fetch('/game/getSettings').then((res) => {
    res.json().then((data) => {
      displaySettings = new settings(
        data.playerName,
        data.profession,
        data.party,
        data.startMonth
      );
    });
  });
}
