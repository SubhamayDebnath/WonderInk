const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const menuBtn = document.querySelector(".menu-btn");
const header = document.querySelector(".header");
const toggleNavbar = function () {
  menuBtn.classList.toggle("active");
  document.querySelector("body").classList.toggle("overflow-hidden");
};
