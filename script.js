// ---------- Mobile Nav Toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---------- Scroll Reveal Animation ----------
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

// ---------- Hero Typing Effect ----------
const roles = [
  'Full-Stack Software Engineer',
  'Building with React & Node.js',
  'Exploring AI & Machine Learning',
  'Shipping Real Products'
];
const typedTextEl = document.getElementById('typedText');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    typedTextEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typedTextEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

// ---------- Parallax Blob Background on Scroll ----------
const blobBg = document.getElementById('blobBg');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  lastScroll = window.scrollY;
  blobBg.style.transform = `translateY(${lastScroll * 0.15}px)`;
});

// ---------- Subtle Blob Movement on Mouse Move (desktop only) ----------
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobBg.style.marginLeft = `${x}px`;
    blobBg.style.marginTop = `${y}px`;
  });
}

// ---------- Navbar Background on Scroll ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(10,10,15,0.85)';
  } else {
    navbar.style.background = 'rgba(10,10,15,0.6)';
  }
});

// ---------- Footer Year ----------
document.getElementById('year').textContent = new Date().getFullYear();
