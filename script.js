// ------------------------ Navbar et Top-bar ------------------------
const topBar = document.getElementById('top-bar');
const navbar = document.getElementById('main-navbar');
const carousel = document.getElementById('carousel');
const navbarOffset = navbar.offsetTop;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Cacher ou afficher la top-bar
  if (scrollY > 50) {
    topBar.style.transform = 'translateY(-100%)';
    topBar.style.transition = 'transform 0.3s';
  } else {
    topBar.style.transform = 'translateY(0)';
  }

  // Rendre la navbar fixe après avoir scrollé
  if (scrollY > navbarOffset) {
    navbar.classList.add('fixed-top');
    navbar.style.top = '0';
    // Ajuster le margin-top du carousel pour qu'il ne soit pas caché
    carousel.style.marginTop = navbar.offsetHeight + 'px';
  } else {
    navbar.classList.remove('fixed-top');
    navbar.style.top = '';
    carousel.style.marginTop = '0';
  }
});

// ------------------------ Carousel Bootstrap ------------------------
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 10000,
    ride: 'carousel',
    pause: false
  });

  // Réinitialiser tous les textes
  const allTexts = carousel.querySelectorAll('.animated-text');
  allTexts.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(50px)';
    t.style.transition = 'all 1s ease';
  });

  // Fonction pour animer le texte
  function animateText(slide) {
    const text = slide.querySelector('.animated-text');
    if (text) {
      // Forcer un reset rapide pour relancer l'animation
      text.style.opacity = '0';
      text.style.transform = 'translateY(50px)';
      requestAnimationFrame(() => {
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      });
    }
  }

  // Animer la première slide après que le DOM et le rendu soient prêts
    const firstSlide = carousel.querySelector('.carousel-item.active');
    setTimeout(() => {
    requestAnimationFrame(() => {
        animateText(firstSlide);
    });
    }, 100);

  // Réinitialiser le texte avant la transition
  carousel.addEventListener('slide.bs.carousel', (e) => {
    const nextSlide = e.relatedTarget;
    const nextText = nextSlide.querySelector('.animated-text');
    if (nextText) {
      nextText.style.opacity = '0';
      nextText.style.transform = 'translateY(50px)';
    }
  });

  // Animer le texte une fois la slide active
  carousel.addEventListener('slid.bs.carousel', (e) => {
    const activeSlide = e.target.querySelector('.carousel-item.active');
    animateText(activeSlide);
  });

  // --- Drag & drop pour le carousel ---
  let isDown = false;
  let startX = 0;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    carousel.classList.add('dragging');
    e.preventDefault();
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const moveX = e.pageX - startX;
    if (moveX > 50) {
      carouselInstance.prev();
      isDown = false;
    } else if (moveX < -50) {
      carouselInstance.next();
      isDown = false;
    }
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
  });

  carousel.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].pageX - startX;
    if (moveX > 50) {
      carouselInstance.prev();
      startX = e.touches[0].pageX;
    } else if (moveX < -50) {
      carouselInstance.next();
      startX = e.touches[0].pageX;
    }
  });
});
