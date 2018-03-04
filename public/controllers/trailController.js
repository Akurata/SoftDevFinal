var exports = module.exports = {};

function enviroment(daysOnTrail, milesTraveled, currentWeather, currentHealth, healthStatus, currentPace, currentTerrain, partyAlive) {
  this.daysOnTrail = daysOnTrail;
  this.milesTraveled = milesTraveled;
  this.currentWeather = currentWeather;
  this.currentHealth = currentHealth;
  this.healthStatus = healthStatus;
  this.currentPace = currentPace;
  this.currentTerrain = currentTerrain;
  this.partyAlive = partyAlive;
}

//Default for new game
var currentEnviroment = new enviroment(0, 0, 'Warm', 100, 'Good', 'Resting', 'Plains', 4);


//Info Getters and Setters
exports.updateEnviroment = function(req, res) {
  if(req.params.enviromentName) {
    if(req.params.enviromentName === 'daysOnTrail') {
      currentEnviroment.daysOnTrail = req.params.enviromenValue;
    }
    if(req.params.enviromentName === 'milesTraveled') {
      currentEnviroment.milesTraveled = req.params.enviromenValue;
    }
    if(req.params.enviromentName === 'currentWeather') {
      currentEnviroment.currentWeather = req.params.enviromenValue;
    }
    if(req.params.enviromentName === 'currentHealth') {
      currentEnviroment.currentHealth = req.params.enviromenValue;
    }
    /* Can only be changes through checkHealth()
    if(req.params.enviromentName === 'healthStatus') {
      currentEnviroment.healthStatus = req.params.enviromenValue;
    }
    */
    if(req.params.enviromentName === 'currentPace') {
      currentEnviroment.currentPace = req.params.enviromenValue;
    }
    if(req.params.enviromentName === 'currentTerrain') {
      currentEnviroment.currentTerrain = req.params.enviromenValue;
    }
    if(req.params.enviromentName === 'partyAlive') {
      currentEnviroment.partyAlive = req.params.enviromenValue;
    }
  }

  console.log(req.params);
  console.log(currentEnviroment);

  res.setHeader('Content-Type', 'application/JSON');
  res.send(currentEnviroment);
}

function enviromentMeta(playerDead, gameOver, success) {
  this.playerDead = playerDead;
  this.gameOver = gameOver;
  this.success = success;
}
var metaInfo = new enviromentMeta(null, false, false);

exports.getMetaInfo = function(req, res) {
  res.setHeader('Content-Type', 'application/JSON');
  res.send(metaInfo);
}


exports.getEnviroment = function(req, res) {
  res.setHeader('Content-Type', 'application/JSON');
  res.send(currentEnviroment);
}




//Game Functionality

exports.day = function(req, res) {
  if(currentEnviroment.daysOnTrail >= 45) { //See if theres no more days
    endGame(false);
  }
  if(currentEnviroment.milesTraveled >= 500) { //See if they made it
    endGame(true);
  }
  healthChange(); //Apply changes to health from day
  checkHealth(); //Check health
  if(currentEnviroment.partyAlive == 0) {
    endGame(false);
  }

  currentEnviroment.currentTerrain = getNewTerrain(); //Set new Terrain
  currentEnviroment.currentWeather = getNewWeather(); //Set New Weather


//Caculate past middaay
  currentEnviroment.milesTraveled = parseInt(currentEnviroment.milesTraveled) + determinePace();
  currentEnviroment.daysOnTrail = parseInt(currentEnviroment.daysOnTrail) + 1;


  res.setHeader('Content-Type', 'application/JSON');
  res.send(metaInfo);
}


function determinePace() {
  var whichPace = pace.filter(function(obj) {
    return obj.type == currentEnviroment.currentPace;
  })[0];

  var whichWeather = weather.filter(function(obj) {
    return obj.type == currentEnviroment.currentWeather;
  })[0];

  return parseInt(whichPace.speed * whichWeather.mileChange);
}

//Check day
//Check Miles traveled
//Check terrain / if need to change terrain
//Set weather
//Check health, make sure no one is dead;

//Determine pace ++ be able to recalculate pace upon changing

function healthChange() {
  var whichPace = pace.filter(function(obj) {
    return obj.type == currentEnviroment.currentPace;
  })[0];

  var whichWeather = weather.filter(function(obj) {
    return obj.type == currentEnviroment.currentWeather;
  })[0];

  var totalChange = whichPace.healthEffect + whichWeather.healthChange;

  currentEnviroment.currentHealth = currentEnviroment.currentHealth + totalChange;
}


function checkHealth(oldNumAive) {
  var groupHealth = currentEnviroment.currentHealth;
  var healthStatus = currentEnviroment.healthStatus;


  if(groupHealth >= 80) {
    currentEnviroment.healthStatus = 'Good';
  }else if(groupHealth >= 50 && groupHealth < 80) {
    currentEnviroment.healthStatus = 'Fair';
  }else if(groupHealth >= 20 && groupHealth < 50) {
    currentEnviroment.healthStatus = 'Poor';
    for(var i = 0; i < currentEnviroment.partyAlive; i++) {
      var deathChance = Math.floor(Math.random() * 100) + 1;
      if(deathChance < 4) {
        currentEnviroment.partyAlive = currentEnviroment.partyAlive - 1;
        metaInfo.playerDead = i;
      }
    }
  }else if(groupHealth > 0 && groupHealth < 20) {
    currentEnviroment.healthStatus = 'Very Poor';
    for(var i = 0; i < currentEnviroment.partyAlive; i++) {
      var deathChance = Math.floor(Math.random() * 100) + 1;
      if(deathChance < 11) {
        currentEnviroment.partyAlive = currentEnviroment.partyAlive - 1;
        metaInfo.playerDead = i;
      }
    }
  }else if(groupHealth <= 0) {
    currentEnviroment.partyAlive = 0;
  }
}

function weathers(type, healthChange, mileChange, probability) {
 this.type = type;
 this.healthChange = healthChange;
 this.mileChange = mileChange;
 this.probability = probability;
};

var weather = new Array(
  new weathers('Very Hot', -8, .7, .1), //0:1-10
  new weathers('Hot', -3, .9, .1), //1:11-20
  new weathers('Warm', 1, 1, .2), //2:21-40
  new weathers('Cool', 1, .95, .1), //3:41-50
  new weathers('Cold', -5, .8, .1), //4:51-60
  new weathers('Very Cold', -12, .7, .1), //5:61-70
  new weathers('Rain', -4, .6, .1), //6:71-80
  new weathers('Heavy Rain', -8, .4, .05), //7:81-85
  new weathers('Snow', -5, .4, .05), //8:86-90
  new weathers('Blizzard', -30, .1, .05), //9:91-95
  new weathers('Heavy Fog', -3, .5, .05) //10:96-100
);

function getNewWeather() {
  var weatherChance = Math.floor(Math.random() * 100) + 1;
  if(weatherChance <= 10) {
    return 'Very Hot';
  }else if(weatherChance <= 20) {
    return 'Hot';
  }else if(weatherChance <= 40) {
    return 'Warm';
  }else if(weatherChance <= 50) {
    return 'Cool';
  }else if(weatherChance <= 60) {
    return 'Cold';
  }else if(weatherChance <= 70) {
    return 'Very Cold';
  }else if(weatherChance <= 80) {
    return 'Rain';
  }else if(weatherChance <= 85) {
    return 'Heavy Rain';
  }else if(weatherChance <= 90) {
    return 'Snow';
  }else if(weatherChance <= 95) {
    return 'Blizzard';
  }else {
    return 'Heavy Fog';
  }
}

function paces(type, speed, healthEffect) {
  this.type = type;
  this.speed = speed;
  this.healthEffect = healthEffect;
};

var pace = new Array(
  new paces('Steady', 20, 0),
  new paces('Strenuous', 25, -3),
  new paces('Grueling', 30, -8),
  new paces('Resting', 0, 5)
);

var terrain = new Array(
  'Mountains',
  'Grassland',
  'Plains',
  'Forest',
  'Desert'
);

function getNewTerrain() {
  var terrainChance = Math.floor(Math.random() * 5);
  if(terrainChance === 0) {
    return 'Mountains';
  }else if(terrainChance === 1) {
    return 'Grassland';
  }else if(terrainChance === 2) {
    return 'Plains';
  }else if(terrainChance === 3) {
    return 'Forest';
  }else if(terrainChance === 4) {
    return 'Desert';
  }
};

function endGame(success) {
  metaInfo.gameOver = true;
  metaInfo.success = false;
}
