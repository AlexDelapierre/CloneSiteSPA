const topBar = document.getElementById('top-bar');
  const navbar = document.getElementById('main-navbar');
  const subHeader = document.getElementById('sub-header');
  const navbarOffset = navbar.offsetTop;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Cacher ou afficher la top-bar
    if(scrollY > 50) {
      topBar.style.transform = 'translateY(-100%)';
      topBar.style.transition = 'transform 0.3s';
    } else {
      topBar.style.transform = 'translateY(0)';
    }

    // Rendre la navbar fixe après avoir scrollé
    if(scrollY > navbarOffset) {
      navbar.classList.add('fixed-top');
      navbar.style.top = '0';
      // Ajuster le margin-top de la sub-header pour qu'il ne soit pas caché
      subHeader.style.marginTop = navbar.offsetHeight + 'px';
    } else {
      navbar.classList.remove('fixed-top');
      navbar.style.top = '';
      subHeader.style.marginTop = '0';
    }
  });