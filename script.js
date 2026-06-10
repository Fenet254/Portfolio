const roles = [
  {
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

(function initPortfolioJs() {
 
  const navLinks = document.querySelectorAll(".nav-link");
  if (navLinks && navLinks.length) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  
  const roleEl = document.getElementById("typed-role");
  const descEl = document.getElementById("role-description");

  if (roleEl && descEl && roles.length) {
    let roleIndex = 0;
    let charIndex = 0;

    const typingSpeed = 90;
    const erasingSpeed = 50;
    const holdDuration = 2000;

    function type() {
      if (charIndex < roles[roleIndex].text.length) {
        roleEl.textContent += roles[roleIndex].text.charAt(charIndex++);
        setTimeout(type, typingSpeed);
      } else {
        descEl.textContent = roles[roleIndex].desc;
        // Toggle description safely (class names are controlled by CSS: .role-desc.show/.role-desc.hide)
        descEl.classList.remove("hide");
        descEl.classList.add("show");
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
  }


  const onReady = () => {
    initServiceReveal();
    initAboutPanel();
    initAboutTabs();
    initPortfolioReveal();
    initSkillsAnimation();
    initContactForm();
  };

  document.addEventListener("DOMContentLoaded", onReady);

  function initServiceReveal() {

    const cards = document.querySelectorAll(".service-card");
    if (!cards || !cards.length || typeof IntersectionObserver === "undefined") return;

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
  }

  function initAboutPanel() {
    const moreBtn = document.getElementById("more-about-me");
    const aboutPanel = document.getElementById("about-panel");
    const closeBtn = document.getElementById("close-about");

    if (!moreBtn || !aboutPanel || !closeBtn) return;

    moreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      aboutPanel.style.display = "flex";
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      aboutPanel.style.display = "none";
    });

    // Close modal when clicking outside
    aboutPanel.addEventListener("click", (e) => {
      if (e.target === aboutPanel) {
        aboutPanel.style.display = "none";
      }
    });
  }

  function initSkillsAnimation() {
    const section = document.getElementById("skills");
    if (!section) return;

    const bars = document.querySelectorAll(".technical-skills .bar");
    const circles = document.querySelectorAll(".circle");

    let animated = false;

    function animateSkills() {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75 && !animated) {
        animated = true;

        bars.forEach((bar, i) => {
          const percent = parseInt(bar.dataset.percent, 10);

          bar.style.setProperty("--bar-width", "0%");
          bar.classList.add("animate-bar");
          bar.style.opacity = "1";
          bar.style.transform = "translateY(0)";

          setTimeout(() => {
            bar.style.setProperty("--bar-width", percent + "%");
          }, i * 300);

          const span = bar.querySelector(".percent");
          if (!span || Number.isNaN(percent)) return;

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

        circles.forEach((circle, i) => {
          const wave = circle.querySelector(".wave");
          const percent = circle.dataset.percent;
          if (!wave || !percent) return;

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
    animateSkills();
  }

  function initPortfolioReveal() {
    if (typeof IntersectionObserver === "undefined") return;

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
  }

  function initAboutTabs() {
    const infoBtns = document.querySelectorAll(".info-btn");
    if (!infoBtns || !infoBtns.length) return;

    infoBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // remove active + hide all
        document.querySelectorAll(".info-btn").forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".info-detail")
          .forEach((detail) => detail.classList.remove("show"));

        // show clicked
        const targetId = btn.dataset.target;
        if (targetId) {
          btn.classList.add("active");
          const detailEl = document.getElementById(targetId);
          if (detailEl) detailEl.classList.add("show");
        }
      });
    });
  }

  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    const toast = document.getElementById("toast");
    if (!contactForm || !toast) return;

    function showToast(message, type) {
      toast.textContent = message;
      toast.className = `toast ${type}`;
      toast.style.display = "block";

      setTimeout(() => {
        toast.style.display = "none";
      }, 4000);
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const topic = document.getElementById("topic")?.value;
      const subject = document.getElementById("subject")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      // Basic validation
      if (!name || !email || !phone || !topic || !subject || !message) {
        showToast("Please fill in all fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }

      // Phone validation (basic)
      if (phone.length < 7) {
        showToast("Please enter a valid phone number.", "error");
        return;
      }

      // Let Formspree handle sending (the form has action/method).
      // NOTE: because we preventDefault(), we must submit via fetch.
      const formData = new FormData(contactForm);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: { "Accept": "application/json" },
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`Request failed: ${res.status}`);
          return res.json().catch(() => ({}));
        })
        .then(() => {
          showToast("Message sent successfully! I'll get back to you soon.", "success");
          contactForm.reset();
        })
        .catch(() => {
          showToast("Message not sent. Please try again.", "error");
        })
        .finally(() => {
          const btn = contactForm.querySelector('button[type="submit"]');
          if (btn) btn.disabled = false;
        });
    });
  }
})();

