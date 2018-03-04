var express = require('express');
const app = express();
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

var game = require('../controllers/gameController');
var settings = require('../controllers/settingsController');
var enviroment = require('../controllers/trailController');
var index = require('../scripts/index.js');

app.use(express.static('../'));
app.use(bodyParser.json({ type: 'application/json' }));
//Set HTML to view depending on path.
app.get('/', (req, res) => {
  res.sendFile(path.resolve('../views/index.html'));
  //checkSound();
});
app.get('/mainmenu', (req, res) => {
  res.sendFile(path.resolve('../views/mainmenu.html'));
  //checkSound();
});
app.get('/topten', (req, res) => {
  res.sendFile(path.resolve('../views/topten.html'));
  //checkSound();
});
app.get('/game', (req, res) => {
  res.sendFile(path.resolve('../views/game.html'));
  //checkSound();
});
app.get('/trail', (req, res) => {
  res.sendFile(path.resolve('../views/trail.html'));
});
//Keypress keys:
//Space = 32
//1 = 49
//2 = 50
//3 = 51
//4 = 52
//5 = 53
//Enter = 13
//P = 112

//Game Screens
app.get('/game/getNewGameScreen/:screenId', (req, res) => {
  var gameScreen = game.startGameScreens[req.params.screenId];
  res.setHeader('Content-Type', 'text/html');
  res.send(gameScreen);
});

app.route('/game/save/:settingName/:settingValue')
  .post(settings.saveSettings);

app.route('/game/getSettings')
  .get(settings.getSettings);
//End Game Screens


//Trail Screens
app.route('/trail/updateEnviroment/:enviromentName/:enviromenValue')
  .post(enviroment.updateEnviroment)
  .get(enviroment.getEnviroment);
app.route('/trail/getEnviroment')
  .get(enviroment.getEnviroment);
app.route('/trail/getMetaInfo')
  .get(enviroment.getMetaInfo);

app.route('/trail/dayCycle')
  .get(enviroment.day);

app.get('/end', (req, res) => {
  res.sendFile(path.resolve('../views/end.html'));
})


app.route('/trail/demoSettings') //Demo settings for debug purposes
  .post(settings.demoSettings);


app.get('/trail/:imgName', (req, res) => {
  res.sendFile(path.resolve('../images/' + req.params.imgName + '.jpg'));
})
//End Trail Screens



app.listen(1337, (err) => {
  console.log('This shit should be working on port 1337');
});
