const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.project-shots-frame').forEach(frame => {
  const scroller = frame.querySelector('.project-shots, .project-charts');
  const prev = frame.querySelector('.shots-prev');
  const next = frame.querySelector('.shots-next');
  const update = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const atStart = scroller.scrollLeft <= 2;
    const atEnd = scroller.scrollLeft >= max - 2;
    prev.hidden = atStart;
    next.hidden = atEnd || max <= 2;
    frame.classList.toggle('can-prev', !atStart);
    frame.classList.toggle('can-next', !atEnd && max > 2);
  };
  const step = () => {
    const figure = scroller.querySelector('figure');
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    return figure ? figure.getBoundingClientRect().width + gap : scroller.clientWidth / 2;
  };
  prev.addEventListener('click', () => {
    scroller.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  next.addEventListener('click', () => {
    scroller.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  scroller.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

const termTyped = document.getElementById('termTyped');
if (termTyped && termTyped.dataset.full && !reduceMotion) {
  const full = termTyped.dataset.full;
  let i = 0;
  const type = () => {
    i += 1;
    termTyped.textContent = full.slice(0, i);
    if (i < full.length) setTimeout(type, 26);
  };
  setTimeout(type, 400);
}
