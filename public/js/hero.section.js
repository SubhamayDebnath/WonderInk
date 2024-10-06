const titles = [
    "The Journey of Self-Discovery",
    "Embrace Change and Growth",
    "Find Joy in Every Moment",
    "Unlock Your True Potential",
  ];
  
  const descriptions = [
    "Exploring thoughts, adventures, and the art of living fully.",
    "Growth happens outside of your comfort zone.",
    "Every moment is an opportunity for joy.",
    "Your potential is limitless; pursue it.",
  ];
  
  let currentIndex = 0;
  
  function changeContent() {
    currentIndex = (currentIndex + 1) % titles.length;
    document.getElementById("hero-title").textContent = titles[currentIndex];
    document.getElementById("hero-description").textContent =
      descriptions[currentIndex];
  }
  
  setInterval(changeContent, 5000);
  