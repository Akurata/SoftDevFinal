
fetch('/game/getSettings').then((res) => {
  res.json().then((data) => {
    document.getElementById("name").innerHTML = data.playerName;
    document.getElementById("profession").innerHTML = data.profession;
    document.getElementById("party").innerHTML = data.party;
  })
});
fetch('/trail/getEnviroment').then((res) => {
  res.json().then((data) => {
    if(data.milesTraveled >= 500) { //Determine reason game ended
      document.getElementById("causeOfDeath").innerHTML = "Congradulations on completing the trail!";
    }else if(data.daysOnTrail > 45) {
      document.getElementById("causeOfDeath").innerHTML = "Your party became lost in the mountains and ate eachother...";
      document.getElementById("causeOfDeath").style.color = "#8d230f";
    }else if(data.currentHealth <= 0) {
      document.getElementById("causeOfDeath").innerHTML = "All members of your party died of dysentery...";
      document.getElementById("causeOfDeath").style.color = "#8d230f";
    }

    if(data.daysOnTrail > 45) {
      document.getElementById("daysOnTrail").innerHTML = 45;
    }else {
      document.getElementById("daysOnTrail").innerHTML = data.daysOnTrail;
    }
    if(data.milesTraveled > 500) {
      document.getElementById("milesTraveled").innerHTML = 500;
    }else {
      document.getElementById("milesTraveled").innerHTML = data.milesTraveled;
    }

    //Fill score
    document.getElementById("score").innerHTML = parseInt(data.currentHealth) + (500 - (parseInt(data.daysOnTrail)));
  })
});



document.addEventListener('keypress', function(event) {
  if(event.which == 32) {
    window.location.assign('/mainmenu');
  }
})
