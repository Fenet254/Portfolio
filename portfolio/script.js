
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});
const roles = [
  {
    text: "Full‑stack Web Developer",
    desc: "I craft dynamic,responsive web apps from front to back,blending clean design with smart functionality using modern tools like React, Node.js, and MySQL",
  },
  {
    text: "AI/ML Enthusiast",
    desc: "I explore the power of intelligent systems,training models, analyzing data, and building smart solutions that learn, adapt, and solve real-world problems",
  },
  {
    text: "Software Engineer",
    desc: "As a Software Engineering student, I’m passionate about building real-world systems that are scalable,efficient,and user-focused,combining theory with hands-on development.",
  },
  {
    text: " YouTuber",
    desc: " I create tech-focused content to inspire and support fellow developers — sharing tutorials, project breakdowns, and real talk for students and aspiring engineers.",
  },
];

const roleEl = document.getElementById("typed-role");
const descEl = document.getElementById("role-description");
let roleIndex = 0,
  charIndex = 0;
const typingSpeed = 90,
  erasingSpeed = 50,
  holdDuration = 2000;

function type() {
  if (charIndex < roles[roleIndex].text.length) {
    roleEl.textContent += roles[roleIndex].text.charAt(charIndex++);
    setTimeout(type, typingSpeed);
  } else {
    descEl.textContent = roles[roleIndex].desc;
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
    descEl.classList.remove("show");
    descEl.classList.add("hide");
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 400);
  }
}

setTimeout(type, 600);

/* ──────────────── 3. SERVICE CARD EFFECTS ─────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  const observer = new IntersectionObserver(
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

  cards.forEach((card) => observer.observe(card));

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      card.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  const modal = document.getElementById("service-modal");
  const mTitle = modal?.querySelector(".modal__title");
  const mBody = modal?.querySelector(".modal__body");
  const mClose = modal?.querySelector(".modal__close");

  function openModal({ title, body }) {
    mTitle.textContent = title;
    mBody.textContent = body;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (modal && mClose) {
    mClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden"))
        closeModal();
    });
    cards.forEach((card) =>
      card.addEventListener("click", () =>
        openModal({
          title: card.dataset.title || card.querySelector("h3").textContent,
          body: card.dataset.body || "Detailed description coming soon! ✨",
        })
      )
    );
  }

  /* ──────────────── 4. ABOUT-ME LINKS INTERACTION ─────────────── */
  const infoBtns = document.querySelectorAll(".info-btn");
  const infoDetails = document.querySelectorAll(".info-detail");

  infoBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      infoBtns.forEach((b) => b.classList.remove("active"));
      infoDetails.forEach((d) => d.classList.remove("show"));

      btn.classList.add("active");
      infoDetails.forEach((detail, i) => {
        if (i === index) {
          detail.classList.add("show");
          detail.style.width = "260px";
          detail.style.height = "260px";
        } else {
          detail.classList.remove("show");
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    const percent = circle.getAttribute("data-percent");
    const wave = circle.querySelector(".wave");

    wave.style.height = percent + "%";
    wave.style.transition = `height 2s ease ${index * 0.5}s`;

    // Animate each circle rising one-by-one
    setTimeout(() => {
      circle.style.opacity = "1";
    }, index * 500);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    const percent = circle.getAttribute("data-percent");
    const wave = circle.querySelector(".wave");

    // Delay entrance + fill
    wave.style.height = percent + "%";
    wave.style.transition = `height 2s ease ${index * 0.5}s`;

    setTimeout(() => {
      circle.style.opacity = "1";
    }, index * 500);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    const percent = circle.getAttribute("data-percent");
    const wave = circle.querySelector(".wave");

    // Animate wave fill
    setTimeout(() => {
      wave.style.height = percent + "%";
      circle.style.opacity = "1";
    }, index * 500);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    const percent = circle.getAttribute("data-percent");
    const wave = circle.querySelector(".wave");

    // Animate wave fill
    setTimeout(() => {
      wave.style.height = percent + "%";
      circle.style.opacity = "1";
    }, index * 500);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle, index) => {
    const percent = circle.getAttribute("data-percent") + "%";
    const wave = circle.querySelector(".wave");

    // Set target percent height as CSS variable
    wave.style.setProperty("--target-height", percent);

    // Apply fill animation
    wave.style.animation = `fillUp 2s ease-out forwards`;

    // After 2s (when fill completes), switch to waveAnimate loop
    setTimeout(() => {
      wave.style.animation = `waveAnimate 2s infinite linear`;
      wave.style.height = percent; // stay at percent height
    }, 2000 + index * 200); // Stagger animation
  });
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-bar");
    }
  });
});

document.querySelectorAll(".bar").forEach((bar) => {
  observer.observe(bar);
});
const observr = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const percent = bar.getAttribute("data-percent") + "%";
      const fill = bar.querySelector("::before");

      // Add class to trigger animation
      bar.classList.add("animate-bar");

      // Set custom width using inline style (IMPORTANT)
      bar.style.setProperty("--bar-width", percent);
    }
  });
});

document.querySelectorAll(".bar").forEach((bar) => {
  observer.observe(bar);
});

function animateCount(percentSpan, target) {
  let current = 0;
  const interval = setInterval(() => {
    if (current >= target) {
      clearInterval(interval);
      percentSpan.textContent = target + "%";
    } else {
      current++;
      percentSpan.textContent = current + "%";
    }
  }, 20); // Speed: lower = faster
}

const obserer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const percent = parseInt(bar.getAttribute("data-percent"));
      const percentSpan = bar.querySelector(".percent");

      // Animate count
      animateCount(percentSpan, percent);

      // Animate bar fill
      bar.classList.add("animate-bar");

      // Set inline CSS variable for fill width
      bar.style.setProperty("--bar-width", percent + "%");

      observer.unobserve(bar); // run once
    }
  });
});

document.querySelectorAll(".bar").forEach((bar) => {
  observer.observe(bar);
});
document.addEventListener("DOMContentLoaded", () => {
  const topProjects = document.querySelectorAll(".project-card.top");
  const bottomProjects = document.querySelectorAll(".project-card.bottom");

  const observerOptions = {
    threshold: 0.3,
  };

  const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  topProjects.forEach((proj) => {
    proj.style.animationPlayState = "paused";
    projectObserver.observe(proj);
  });

  bottomProjects.forEach((proj) => {
    proj.style.animationPlayState = "paused";
    projectObserver.observe(proj);
  });
});

  
