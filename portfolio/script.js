// ────── NAVBAR ACTIVE STATE ──────
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// ────── ROLE TYPING EFFECT ──────
const roles = [
  {
    text: "Full‑stack Web Developer",
    desc: "I craft dynamic, responsive web apps from front to back using React, Node.js, and MySQL.",
  },
  {
    text: "AI/ML Enthusiast",
    desc: "I explore intelligent systems, train models, and build adaptive solutions.",
  },
  {
    text: "Software Engineer",
    desc: "As a Software Engineering student, I build scalable, efficient, user-focused systems.",
  },
  {
    text: "YouTuber",
    desc: "I create tech content to inspire developers with tutorials and project breakdowns.",
  },
];
let roleIndex = 0,
  charIndex = 0;
const typingSpeed = 90,
  erasingSpeed = 50,
  holdDuration = 2000;
const roleEl = document.getElementById("typed-role"),
  descEl = document.getElementById("role-description");
function type() {
  if (charIndex < roles[roleIndex].text.length) {
    roleEl.textContent += roles[roleIndex].text.charAt(charIndex++);
    setTimeout(type, typingSpeed);
  } else {
    descEl.textContent = roles[roleIndex].desc;
    descEl.classList.replace("hide", "show");
    setTimeout(erase, holdDuration);
  }
}
function erase() {
  if (charIndex > 0) {
    roleEl.textContent = roles[roleIndex].text.substring(0, --charIndex);
    setTimeout(erase, erasingSpeed);
  } else {
    descEl.classList.replace("show", "hide");
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 400);
  }
}
setTimeout(type, 600);

// ────── SERVICE CARD REVEAL ──────
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  const serviceObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${idx * 0.15}s`;
          entry.target.classList.add("reveal");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  cards.forEach((card) => serviceObs.observe(card));

  // ────── ABOUT PANEL ──────
  const moreBtn = document.getElementById("more-about-me"),
    aboutPanel = document.getElementById("about-panel"),
    closeBtn = document.getElementById("close-about");
  if (moreBtn && aboutPanel && closeBtn) {
    moreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      aboutPanel.style.display = "block";
      aboutPanel.style.animation = "slideIn 0.4s ease forwards";
    });
    closeBtn.addEventListener("click", () => {
      aboutPanel.style.animation = "slideOut 0.3s ease forwards";
      setTimeout(() => (aboutPanel.style.display = "none"), 300);
    });
  }
});

// ────── SKILLS SECTION ANIMATION ──────
window.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("skills");
  const bars = document.querySelectorAll(".technical-skills .bar");
  const circles = document.querySelectorAll(".circle");
  let animated = false;

  function animateSkills() {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75 && !animated) {
      animated = true;

      // Animate bars
      bars.forEach((bar, i) => {
        const percent = parseInt(bar.dataset.percent);
        bar.style.setProperty("--bar-width", "0%");
        bar.classList.add("animate-bar");
        bar.style.opacity = "1";
        bar.style.transform = "translateY(0)";

        // Animate blue fill gradually
        setTimeout(() => {
          bar.style.setProperty("--bar-width", percent + "%");
        }, i * 300);

        const span = bar.querySelector(".percent");
        let count = 0;
        const interval = setInterval(() => {
          if (count <= percent) {
            span.textContent = count + "%";
            count++;
          } else {
            clearInterval(interval);
          }
        }, 20);
      });

      // Animate professional skills
      circles.forEach((circle, i) => {
        const wave = circle.querySelector(".wave");
        const percent = circle.dataset.percent;
        setTimeout(() => {
          circle.style.opacity = "1";
          circle.style.transform = "scale(1)";
          wave.style.height = percent + "%";
          wave.style.animation = "waveAnimate 2s infinite ease-in-out";
        }, i * 300);
      });
    }
  }

  window.addEventListener("scroll", animateSkills);
  animateSkills(); // Run on load too
});

// ────── PORTFOLIO CARDS REVEAL ──────
(function () {
  const topProjects = document.querySelectorAll(".project-card.top");
  const bottomProjects = document.querySelectorAll(".project-card.bottom");
  const projObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  topProjects.forEach((p) => {
    p.style.animationPlayState = "paused";
    projObs.observe(p);
  });
  bottomProjects.forEach((p) => {
    p.style.animationPlayState = "paused";
    projObs.observe(p);
  });
})();
// inside your scroll handler, after detecting #skills visible
bars.forEach((bar, i) => {
  const pct = bar.dataset.percent + '%';
  bar.style.setProperty('--bar-width', pct);
  setTimeout(() => bar.classList.add('animate-bar'), i * 200);
});
