/* ===================================================
   PORTFOLIO SCRIPT  –  Saif Al-Ashmay
=================================================== */

/* ─── PARTICLES ─────────────────────────────────── */
(function createParticles() {
  const container = document.getElementById("bgParticles");
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 20 + 15}s;
      animation-delay:${Math.random() * 15}s;
      opacity:${Math.random() * 0.6 + 0.2};
      background:${Math.random() > 0.5 ? "rgba(79,158,255,.5)" : "rgba(168,85,247,.5)"};
    `;
    container.appendChild(p);
  }
})();

/* ─── NAVBAR SCROLL ──────────────────────────────── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  updateActiveNav();
});

/* ─── MOBILE HAMBURGER ───────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger &&
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
document.querySelectorAll(".nav-link").forEach((l) => {
  l.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
});

/* ─── ACTIVE NAV ON SCROLL ───────────────────────── */
function updateActiveNav() {
  const sections = ["home", "about", "skills", "projects", "contact"];
  const scrollY = window.scrollY + 120;
  let active = "home";
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) active = id;
  });
  document.querySelectorAll(".nav-link").forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === "#" + active);
  });
}

/* ─── TYPEWRITER ─────────────────────────────────── */
const phrases = [
  "Graphic Designer",
  "Brand Creator",
  "Visual Storyteller",
  "Ad Campaign Expert",
];
let phraseIdx = 0,
  charIdx = 0,
  deleting = false;
const typeEl = document.getElementById("typewriter");

function type() {
  if (!typeEl) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.substring(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.substring(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

/* ─── COUNTER ANIMATION ──────────────────────────── */
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach((el) => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (target >= 10 ? "+" : "");
      if (current >= target) clearInterval(timer);
    }, 50);
  });
}

/* ─── SCROLL REVEAL ──────────────────────────────── */
const revealElements = [];

function addReveal(selector) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = i * 0.08 + "s";
    revealElements.push(el);
  });
}

addReveal(".skill-card");
addReveal(".project-card");
addReveal(".about-grid > *");
addReveal(".contact-grid > *");
addReveal(".section-header");
addReveal(".about-highlights .highlight-item");

let countersStarted = false;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (!countersStarted && entry.target.closest("#home")) {
          countersStarted = true;
          animateCounters();
        }
      }
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((el) => observer.observe(el));

/* auto-start counters after 500ms on load */
setTimeout(() => {
  if (!countersStarted) {
    countersStarted = true;
    animateCounters();
  }
}, 500);

/* ─── SKILL BARS ─────────────────────────────────── */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-fill").forEach((fill) => {
          fill.style.width = fill.dataset.pct + "%";
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const skillsSection = document.getElementById("skills");
if (skillsSection) skillObserver.observe(skillsSection);

/* ─── PROJECTS GRID ──────────────────────────────── */
const projects = [
  {
    file: "jezzera.png",
    title: "Al-Jazeera Academy – Social",
    category: "Social Media",
  },
  {
    file: "sparrow.png",
    title: "Captain Jack Sparrow Poster",
    category: "Illustration",
  },
  {
    file: "port 1.png",
    title: "Toyota GR-Yaris Editorial",
    category: "Print Design",
  },
  {
    file: "port 2.png",
    title: "Al-Jamal Infographic",
    category: "Social Media",
  },
  {
    file: "port 3.png",
    title: "Riyadh Metro Campaign",
    category: "Advertising",
  },
  {
    file: "sumer.png",
    title: "Ma Sante Medical – Summer",
    category: "Advertising",
  },
  { file: "tfra.png", title: "Tafra – Boost Your Sales", category: "Branding" },
  { file: "sscrs.png", title: "SSCRS × ESCRS Event Design", category: "Event" },
  {
    file: "ttttt.png",
    title: "ElMaleka Ramadan Campaign",
    category: "Advertising",
  },
  {
    file: "Screenshot 2026-09-12 150243.png",
    title: "Waseem Aalam Medical Infographic",
    category: "Social Media",
  },
];

const grid = document.getElementById("projectsGrid");
if (grid) {
  projects.forEach((proj, idx) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.style.transitionDelay = (idx % 3) * 0.1 + "s";
    card.innerHTML = `
      <div class="project-thumb">
        <img src="project_images/${proj.file}" alt="${proj.title}" loading="lazy" />
        <div class="project-overlay">
          <div class="overlay-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="white" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="project-info">
        <h3>${proj.title}</h3>
        <p>${proj.category}</p>
      </div>
    `;
    card.addEventListener("click", () =>
      openLightboxFile(proj.file, proj.title),
    );
    observer.observe(card);
    grid.appendChild(card);
  });
}

/* ─── LIGHTBOX ───────────────────────────────────── */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCap = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

function openLightboxFile(fileName, title) {
  if (!lightbox || !lightboxImg || !lightboxCap) return;
  const safeFile = fileName || "";
  lightboxImg.src = `project_images/${safeFile}`;
  lightboxImg.alt = title;
  lightboxCap.textContent = title;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}
lightboxClose && lightboxClose.addEventListener("click", closeLightbox);
lightbox &&
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ─── CONTACT FORM ───────────────────────────────── */
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");
form &&
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".form-submit");
    btn.textContent = "Sending...";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
      btn.disabled = false;
      success.classList.add("show");
      form.reset();
      setTimeout(() => success.classList.remove("show"), 5000);
    }, 1200);
  });

/* ─── SMOOTH SCROLL ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
