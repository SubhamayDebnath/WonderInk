const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
  
  
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const menu = document.querySelector(".menu");
  
  const toggleNavbar = function () {
    menu.classList.toggle("show");
   
  }
  
  addEventOnElements(navTogglers, "click", toggleNavbar);