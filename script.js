/* =========================================================
   PORTFOLIO SCRIPT — Stanley Okumu
   Handles: mobile menu toggle, footer year, active nav link
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── FOOTER YEAR ─── */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ─── MOBILE MENU TOGGLE ─── */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      // Swap hamburger icon between closed/open state
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close the menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', (e) => {
      const isInsideNav = navLinks.contains(e.target);
      const isToggle = menuToggle.contains(e.target);
      if (!isInsideNav && !isToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });
  }

  /* ─── ACTIVE NAV LINK ON SCROLL ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // highlights when section is near top
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(anchor => {
            const isActive = anchor.getAttribute('href') === `#${id}`;
            anchor.style.color = isActive ? 'var(--primary)' : '';
            anchor.style.fontWeight = isActive ? '700' : '';
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  /* ─── SMOOTH SCROLL WITH STICKY HEADER OFFSET ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ─── REVEAL ANIMATIONS (subtle fade-in on scroll) ─── */
  const revealEls = document.querySelectorAll(
    '.info-card, .skill-card, .project-card, .experience-card'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }

});