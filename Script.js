// Grab the hamburger button and the navigation menu by their IDs
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// When the hamburger is clicked, toggle the "active" class on both.
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

//  close the menu automatically after a link is tapped
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});