console.log("Website loaded");

const heroImages = [
  "assets/img/hero1.jpg",
  "assets/img/hero2.jpg",
  "assets/img/hero3.jpg"
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
