console.log("Website loaded");

// ===== Load Sidebar =====
const sidebar = document.getElementById("sidebar");

if (sidebar) {
  fetch("/sidebar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Sidebar not found: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      sidebar.innerHTML = data;
    })
    .catch(error => {
      console.error("Failed to load sidebar:", error);
    });
}


// ===== Hero Slideshow =====
const hero = document.getElementById("hero");

if (hero) {
  const heroImages = [
    "img/hero1.jpg",
    "img/hero2.jpg",
    "img/hero3.jpg",
    "img/hero4.jpg",
    "img/hero5.jpg"
  ];

  let current = 0;

  function changeHero() {
    hero.classList.add("fade-out");

    setTimeout(() => {
      hero.style.backgroundImage = `url('${heroImages[current]}')`;
      hero.style.backgroundSize = "cover";
      hero.style.backgroundPosition = "center";

      hero.classList.remove("fade-out");
      hero.classList.add("fade-in");

      current = (current + 1) % heroImages.length;
    }, 1000);
  }

  changeHero();
  setInterval(changeHero, 5000);
}
