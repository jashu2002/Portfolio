/**
 * Navigation, Active Route Detection, and Mobile Drawer Controller
 */

export function initNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Set active link only in header and mobile drawer (never footer)
  document.querySelectorAll('.site-header .nav-link, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggleBtn.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header scroll appearance
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.backgroundColor = 'rgba(5, 5, 7, 0.9)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
      } else {
        header.style.backgroundColor = 'rgba(5, 5, 7, 0.75)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      }
    }, { passive: true });
  }
}
