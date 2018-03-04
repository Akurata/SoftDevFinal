var exports = module.exports = {};
exports.startGameScreens = [];

var startGame0 = '<p>Many kind of people made the trip to Oregon.</p>'
  + "<p>You may:</p>"
  + "<ol id=\"setupQuestions1\">"
  + "<li id=\"bankerMenuItem\" onClick=\'saveProfession(\"Banker\")\'>1. Be a Banker from Boston</li>"
  + "<li id=\"carpenterMenuItem\" onClick=\'saveProfession(\"Carpenter\")\'>2. Be a carpenter from Ohio</li>"
  + "<li ​​id=\"farmerMenuItem\" onClick=\'saveProfession(\"Farmer\")\'>3. Be ​a​ ​farmer ​​from​​ Illinois</li>"
  + "<li​​ id=\"differencesMenuItem\">4. Find​​ out​​ the ​​differences between​​ the choices</li>"
  + "</ol>"
  + "<div ​​id=\"selectedOption\">What ​​is ​​your​​ choice?</div>";

exports.startGameScreens.push(startGame0);


var startGame1 = '<p>What is the first name of the Wagon Leader?</p>'
  + '<div>Leader Name: </div>'
  + '<input type=\'text\' id=\'name\'/>'
  + '<input type=\'button\' onclick=\'savePlayer(document.getElementById(\"name\").value)\' value=\'Next\'/>';

exports.startGameScreens.push(startGame1);


var startGame2 = '<p>What are the first names of the other members of your party?</p>'
  + '<div>Player Name: <input type=\'text\' id=\"Mem1\"/></div>'
  + '<div>Player Name: <input type=\'text\' id=\"Mem2\"/></div>'
  + '<div>Player Name: <input type=\'text\' id=\"Mem3\"/></div>'
  + '<div>Player Name: <input type=\'text\' id=\"Mem4\"/></div>'
  + '<input type=\'button\' onclick=\'saveParty()\' value=\'Next\'/>';

exports.startGameScreens.push(startGame2);


var startGame3 = '<p>It is 1848. Your jumping off place for Oregon is Independence, Missouri.'
  + 'You must decide which month to leave Independence.</p>'
  + '<ol id=\"months\">'
  + '<li onClick=\'saveStartMonth(\"March\")\'>1. March</li>'
  + '<li onClick=\'saveStartMonth(\"April\")\'>2. April</li>'
  + '<li onClick=\'saveStartMonth(\"May\")\'>3. May</li>'
  + '<li onClick=\'saveStartMonth(\"June\")\'>4. June</li>'
  + '<li onClick=\'saveStartMonth(\"July\")\'>5. July</li>'
  + '</ol>'
  + '<div>What is your choice?</div>';

exports.startGameScreens.push(startGame3);


var startGame4 = '<p>Congradulations! You are ready to start your journey!</p>'
  + '<p>Here are your settings you selected for the game.</p>'
  + '<ul style="text-align:left; padding-left:2em; text-decoration:none;">'
  + '<li>Name: <span id="settingName"></span></li>'
  + '<li>Profession: <span id="settingProfession"></span></li>'
  + '<li>Party: <span id="settingParty"></span></li>'
  + '<li">Month: <span id="settingMonth"></span></li>'
  + '</ol>'

exports.startGameScreens.push(startGame4);
