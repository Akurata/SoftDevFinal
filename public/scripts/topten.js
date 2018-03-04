
//var mysql = require('mysql');

var toMainMenu = function toMainMenu() {
  window.location.assign('/mainmenu');
};


function score(name, score, date) {
  this.name = name;
  this.score = score;
  this.date = date;
};

/*
var con = mysql.createConnection({
  host: 'localhost',
  user: 'alexander.kurata1@marist.edu',
  password: 'Ak906254'
});

con.connect(function(err) {
  if(err) {
    throw err;
  }
  console.log("Connected to SQL...");
});
*/

var scores = new Array(
  new score("John Doe", 3000, new Date('1980-11-10')),
  new score("FirstName LastName", 4200, new Date('1984-04-28')),
  new score("John Jackson", 5296, new Date('1988-11-14')),
  new score("Kathy Gordon", 1698, new Date('1989-03-19')),
  new score("Johnny Solorzano", 10202, new Date('1990-02-16')),
  new score("Myron Fernandez", 5852, new Date('1995-08-25')),
  new score("Angelina Weatherly", 1188, new Date('1999-12-07')),
  new score("Donald Dillow", 11006, new Date('2007-08-07')),
  new score("Philomena O'Brian", 6339, new Date('2010-07-04')),
  new score("Donald Benedict", 11496, new Date('2012-12-30'))
);


window.onload = function() {
  scores.sort((a, b) => {return a.score - b.score});
  scores.reverse();
  for (var i = 0; i < scores.length; i++) { //Filling Names
    document.getElementById("nameList")
      .innerHTML += ("<li>" + scores[i].name + "</li>");
    document.getElementById("scoreList")
      .innerHTML += ("<li>" + scores[i].score + "</li>");
    document.getElementById("dateList")
      .innerHTML += ("<li>" + scores[i].date.getDate() +
        " - " + scores[i].date.getMonth() +
        " - " + scores[i].date.getFullYear() + "</li>");
    }
};



document.getElementById("return").addEventListener('onClick', toMainMenu);
document.addEventListener('keypress', function(event) {
  if(event.which == 32) {
    toMainMenu();
  }
})
