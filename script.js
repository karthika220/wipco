/* ============================================================
   WIPCO – script.js
   ============================================================ */

// ===================== NAVBAR SCROLL EFFECT =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ===================== HAMBURGER / MOBILE NAV =====================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  // Animate hamburger
  hamburger.querySelectorAll('span').forEach((s, i) => {
    s.style.transform = mobileNav.classList.contains('open')
      ? (i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(5px, -5px)')
      : '';
    s.style.opacity = mobileNav.classList.contains('open') && i === 1 ? '0' : '';
  });
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});


// ===================== SCROLL FADE-UP (IntersectionObserver) =====================
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));




// ===================== FAQ ACCORDION =====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


// ===================== TESTIMONIALS SLIDER =====================
const track = document.getElementById('tTrack');
const prevBtn = document.getElementById('tPrev');
const nextBtn = document.getElementById('tNext');

if (track && prevBtn && nextBtn) {
  let currentIndex = 0;
  const cards = track.querySelectorAll('.t-card');

  const visibleCount = () =>
    window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;

  const getMaxIndex = () => Math.max(0, cards.length - visibleCount());

  function updateSlider() {
    // Use the card's rendered width + gap for precise translation
    const cardW = cards[0].getBoundingClientRect().width;
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? 0 : -50;
    const offset = currentIndex * (cardW + gap);

    track.style.transform = `translateX(-${offset}px)`;

    // Update button opacity
    prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
    nextBtn.style.opacity = currentIndex >= getMaxIndex() ? '0.4' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    nextBtn.style.pointerEvents = currentIndex >= getMaxIndex() ? 'none' : 'auto';
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateSlider(); }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < getMaxIndex()) { currentIndex++; updateSlider(); }
  });

  // Auto-play every 5 seconds
  let autoPlay = setInterval(() => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }, 5000);

  // Pause auto-play on manual interaction
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(() => {
        if (currentIndex < getMaxIndex()) currentIndex++;
        else currentIndex = 0;
        updateSlider();
      }, 5000);
    });
  });

  window.addEventListener('resize', () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    updateSlider();
  });

  // Initialize after layout renders
  requestAnimationFrame(updateSlider);
}


// ===================== COATING SYSTEMS – SMOOTH SCROLL SYNC =====================
// Ensure the sticky left panel works well
// (the CSS sticky does the heavy lifting – no extra JS needed unless we want animations)


// ===================== SMOOTH ANCHOR SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 90; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ===================== HERO PARALLAX (subtle) =====================
const heroBg = document.querySelector('.hero-bg-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy < window.innerHeight) {
      heroBg.style.transform = `translateY(${sy * 0.3}px)`;
    }
  }, { passive: true });
}
