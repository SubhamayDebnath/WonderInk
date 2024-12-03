const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const menu = document.querySelector(".menu");

const toggleNavbar = function () {
  menu.classList.toggle("show");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

const navHeaderTogglers = document.querySelectorAll("[data-nav-header-toggler]");
const menuHeader = document.querySelector(".menu-header")

const toggleNavbarHeader = function () {
  menuHeader.classList.toggle("show");
};

addEventOnElements(navHeaderTogglers, "click", toggleNavbarHeader);