const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-icon");
const toggleNavbar = function () {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");
  document.querySelector("body").classList.toggle("overflowHidden");
};

addEventOnElements(navTogglers, "click", toggleNavbar);


