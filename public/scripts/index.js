
var toMainMenu = function toMainMenu() {
  window.location.assign('/mainmenu');
}

function addListeners() {
  document.getElementById("continue").addEventListener('onClick', toMainMenu);
  document.addEventListener('keypress', function(event) {
    if(event.which == 32) {
      toMainMenu();
    }
  });
}
