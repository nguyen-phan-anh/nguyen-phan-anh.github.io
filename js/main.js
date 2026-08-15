console.log("Website loaded");

// ===== Load Sidebar =====
const sidebar = document.getElementById("sidebar");

if (sidebar) {
  fetch("/sidebar.html")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Sidebar not found: " + response.status);
      }

      return response.text();
    })
    .then(function (data) {
      sidebar.innerHTML = data;

      // ===== Active Menu =====
      const currentPath =
        window.location.pathname.replace(/\/$/, "") || "/";

      const menuLinks = sidebar.querySelectorAll(".menu a");

      menuLinks.forEach(function (link) {
        const linkPath =
          new URL(link.href, window.location.origin)
            .pathname
            .replace(/\/$/, "") || "/";

        if (linkPath === currentPath) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    })
    .catch(function (error) {
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

    setTimeout(function () {
      hero.style.backgroundImage =
        "url('" + heroImages[current] + "')";

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

// ===== Load Contact Form =====
const currentPage =
  window.location.pathname.replace(/\/$/, "") || "/";

if (currentPage !== "/") {

  fetch("/contact.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Contact form not found: " + response.status);
      }

      return response.text();
    })
    .then(data => {

      const contactContainer = document.createElement("aside");

      contactContainer.className = "contact-sidebar";

      contactContainer.innerHTML = data;

      document.body.appendChild(contactContainer);

    })
    .catch(error => {
      console.error("Failed to load contact form:", error);
    });

}
