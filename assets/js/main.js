console.log("Website loaded");

const heroImages = [
  "img/hero1.jpg",
  "img/hero2.jpg",
  "img/hero3.jpg",
  "img/hero4.jpg",
  "img/hero5.jpg"
];

let current = 0;
const hero = document.getElementById("hero");

function changeHero(){
  hero.classList.add("fade-out");

  setTimeout(()=>{
    hero.style.backgroundImage = `url('${heroImages[current]}')`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";

    hero.classList.remove("fade-out");
    hero.classList.add("fade-in");

    current = (current + 1) % heroImages.length;
  }, 1000); // thời gian fade-out
}

changeHero(); 
setInterval(changeHero, 5000); // 5 giây đổi ảnh
