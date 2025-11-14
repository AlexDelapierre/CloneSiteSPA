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

/* =============================
   GESTION DES DOTS (petits points)
   ============================= */

// Nombre total d’items dans le carousel
const items = document.querySelectorAll(".cCarousel-item");
const itemCount = items.length;

// Conteneur des dots
const dotsContainer = document.querySelector("#carousel-dots");

// Création des dots
for (let i = 0; i < itemCount; i++) {
  const dot = document.createElement("div");
  dot.classList.add("carousel-dot");
  if (i === 0) dot.classList.add("active"); // premier actif
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".carousel-dot");

/* =============================
   Fonction pour mettre à jour les dots
   ============================= */
function updateDots() {
  const index = Math.abs(leftValue / totalMovementSize);

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

/* =============================
   Clic sur un dot → aller à cette card
   ============================= */
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);

    leftValue = -index * totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";

    updateDots();
  });
});

/* =============================
   On met à jour les dots après
   chaque clic sur prev / next
   ============================= */
prev.addEventListener("click", updateDots);
next.addEventListener("click", updateDots);

