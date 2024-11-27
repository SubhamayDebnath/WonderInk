window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.classList.add("h-[3rem]");
    header.classList.remove("h-14");
  } else {
    header.classList.add("h-14");
    header.classList.remove("h-[3rem]");
  }
});

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
