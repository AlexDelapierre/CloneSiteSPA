const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const carouselVp = document.querySelector("#carousel-vp");
const cCarouselInner = document.querySelector("#cCarousel-inner");

// Position actuelle du carousel
let leftValue = 0;

// Taille totale d’un déplacement : 1 card + gap
const item = document.querySelector(".cCarousel-item");
const itemWidth = item.getBoundingClientRect().width;
const gap = parseFloat(window.getComputedStyle(cCarouselInner).gap);
const totalMovementSize = itemWidth + gap;

// Largeur totale du conteneur interne (toutes les cards)
let carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;

/* =====================
   BOUTON PREV
   ===================== */
prev.addEventListener("click", () => {
  // On peut aller vers la gauche uniquement si leftValue < 0
  if (leftValue < 0) {
    leftValue += totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
  }
});

/* =====================
   BOUTON NEXT
   ===================== */
next.addEventListener("click", () => {
  const vpWidth = carouselVp.getBoundingClientRect().width;

  const remainingWidth = carouselInnerWidth - Math.abs(leftValue);

  // On peut aller vers la droite tant qu’il reste plus que la largeur visible
  if (remainingWidth > vpWidth) {
    leftValue -= totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
  }
});

/* =====================
   RESPONSIVE
   ===================== */
const mediaQuery510 = window.matchMedia("(max-width: 510px)");
const mediaQuery770 = window.matchMedia("(max-width: 770px)");

mediaQuery510.addEventListener("change", mediaManagement);
mediaQuery770.addEventListener("change", mediaManagement);

let oldViewportWidth = window.innerWidth;

function mediaManagement() {
  const newViewportWidth = window.innerWidth;

  // Vue élargie → on recule d’une card si possible (pour éviter un trou)
  if (newViewportWidth > oldViewportWidth && leftValue <= -totalMovementSize) {
    leftValue += totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
  }

  // Vue rétrécie → on avance d’une card si possible
  if (newViewportWidth < oldViewportWidth && leftValue <= -totalMovementSize) {
    leftValue -= totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
  }

  oldViewportWidth = newViewportWidth;
}
