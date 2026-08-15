/* ===== Shared Gallery JS ===== */

const galleryData = {};
let currentGallery = "";
let currentIndex = 0;


/* ===== Initialize all gallery sliders ===== */

document.querySelectorAll(".gallery-slider").forEach((slider, sliderNumber) => {

  const galleryName = slider.dataset.gallery || `gallery-${sliderNumber}`;
  const originalImages = Array.from(slider.querySelectorAll("img"));

  if (!originalImages.length) return;

  /* Save image sources for the modal */
  galleryData[galleryName] = originalImages.map(img => img.src);

  /* Create moving track */
  const track = document.createElement("div");
  track.className = "gallery-slider-track";

  /* Original images */
  originalImages.forEach((img, index) => {

    img.dataset.gallery = galleryName;
    img.dataset.index = index;

    img.addEventListener("click", handleGalleryClick);

    track.appendChild(img);

  });


  /* ===== Automatically create duplicates ===== */

  originalImages.forEach((img, index) => {

    const duplicate = img.cloneNode(true);

    duplicate.dataset.gallery = galleryName;
    duplicate.dataset.index = index;

    /*
      cloneNode() does not copy addEventListener(),
      so we need to attach the click event again.
    */

    duplicate.addEventListener("click", handleGalleryClick);

    track.appendChild(duplicate);

  });


  /* Replace original slider content with the track */

  slider.innerHTML = "";
  slider.appendChild(track);


  /*
    Adjust speed depending on number of images.

    More images = longer animation duration,
    so the visual movement speed stays approximately
    consistent between galleries.
  */

  const duration = Math.max(originalImages.length * 3.2, 9);

  slider.style.setProperty(
    "--gallery-duration",
    `${duration}s`
  );

});


/* ===== Handle image click ===== */

function handleGalleryClick(event) {

  const img = event.currentTarget;

  openGallery(
    img.dataset.gallery,
    Number(img.dataset.index)
  );

}


/* ===== Open modal ===== */

function openGallery(galleryName, index) {

  if (!galleryData[galleryName]) return;

  currentGallery = galleryName;
  currentIndex = index;

  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  if (!modal || !modalImg) return;

  modal.style.display = "flex";

  modalImg.src =
    galleryData[currentGallery][currentIndex];

}


/* ===== Close modal ===== */

function closeModal() {

  const modal = document.getElementById("imgModal");

  if (modal) {

    modal.style.display = "none";

  }

}


/* ===== Next image ===== */

function nextImg() {

  if (!galleryData[currentGallery]) return;

  const imgs =
    galleryData[currentGallery];

  currentIndex =
    (currentIndex + 1) % imgs.length;

  document.getElementById("modalImg").src =
    imgs[currentIndex];

}


/* ===== Previous image ===== */

function prevImg() {

  if (!galleryData[currentGallery]) return;

  const imgs =
    galleryData[currentGallery];

  currentIndex =
    (currentIndex - 1 + imgs.length) % imgs.length;

  document.getElementById("modalImg").src =
    imgs[currentIndex];

}


/* ===== Click dark background to close ===== */

const modal =
  document.getElementById("imgModal");

if (modal) {

  modal.addEventListener("click", function(event) {

    if (event.target === modal) {

      closeModal();

    }

  });

}


/* ===== Keyboard control ===== */

document.addEventListener("keydown", function(event) {

  const modal =
    document.getElementById("imgModal");

  if (
    !modal ||
    modal.style.display !== "flex"
  ) {
    return;
  }


  if (event.key === "Escape") {

    closeModal();

  }


  if (event.key === "ArrowRight") {

    nextImg();

  }


  if (event.key === "ArrowLeft") {

    prevImg();

  }

});
