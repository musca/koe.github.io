window.addEventListener("load", init, false);
function init() {
  var greeting = document.querySelector(".greeting"),
      now = new Date(),
      h = now.getHours();
  // Show Greeting
  if (h > 0 && h < 4) {
    greeting.innerHTML = 'Have a great night';
  } else if (h >= 4 && h < 12) {
    greeting.innerHTML = 'Good morning';
  } else if (h >= 12 && h < 18) {
    greeting.innerHTML = 'Good afternoon';
  } else {
    greeting.innerHTML = 'Good evening';
  }
  document.documentElement.removeAttribute("id");
};