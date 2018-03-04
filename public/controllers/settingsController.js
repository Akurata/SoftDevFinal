var exports = module.exports = {};

function setting(playerName, profession, party, startMonth) {
  this.playerName = playerName;
  this.profession = profession;
  this.party = party;
  this.startMonth = startMonth;
}

var settings = new setting();

exports.saveSettings = function(req, res) {
  if(req.params.settingName) {
    if(req.params.settingName === 'playerName') {
      settings.playerName = req.params.settingValue;
    }
    if(req.params.settingName === 'profession') {
      settings.profession = req.params.settingValue;
    }
    if(req.params.settingName === 'party') {
      settings.party = req.params.settingValue;
    }
    if(req.params.settingName === 'startMonth') {
      settings.startMonth = req.params.settingValue;
    }
  }

  console.log(req.params)

  res.setHeader('Content-Type', 'application/JSON');
  res.send(settings);
}

exports.getSettings = function(req, res) {
  res.setHeader('Content-Type', 'application/JSON');
  res.send(settings);
}

//Fill Demo Settings For Debug
exports.demoSettings = function(req, res) {
  settings = new setting(
    'PlayerName',
    'Banker',
    ['Party0', 'Party1', 'Party2', 'Party3'],
    'March'
  );
}
