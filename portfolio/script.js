document.addEventListener("DOMContentLoaded", () => {
  /* ── 1.  NAVBAR ACTIVE‑LINK HANDLER  ─────────────────── */
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  /* ── 2.  TYPEWRITER + DESCRIPTION CAROUSEL  ─────────── */
  const roles = [
    {
      text: "Full‑stack Web Developer",
      desc: "f bulding an end to end functional website on my own lorem  i am full stak web developer with both front end an backeng skills  and capable of bulding an end to end functional website on my own lorem ",
    },
    {
      text: "YouTuber",
      desc: "keng skills  and capable of bulding an end to end functional website on my own lorem  i am full stak web developer with both front end an backeng skills  and capable of bulding an end to end functional website on my own lorem ",
    },
    {
      text: "Graphics Designer",
      desc: "Ioper with both front end an backeng skills  and capable of bulding an end to end functional website on my own lorem  i am full stak web developer with both front end an backeng skills   functional website on my own lorem ",
    },
    {
      text: "Web Designer",
      desc: " website on my own lorem  i am full stak web developer with both front end an backeng skills  and capable of bulding an end to end functional website on my own lorem  i am full stak web",
    },
  ];

  const roleEl = document.getElementById("typed-role");
  const descEl = document.getElementById("role-description");

  /* timings (ms) */
  const typingSpeed = 90;
  const erasingSpeed = 50;
  const holdDuration = 2000;

  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < roles[roleIndex].text.length) {
      roleEl.textContent += roles[roleIndex].text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      /* finished typing current role */
      descEl.textContent = roles[roleIndex].desc;
      descEl.classList.remove("hide");
      descEl.classList.add("show"); // slide in
      setTimeout(erase, holdDuration);
    }
  }

  function erase() {
    if (charIndex > 0) {
      roleEl.textContent = roles[roleIndex].text.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      /* finished erasing current role */
      descEl.classList.remove("show");
      descEl.classList.add("hide"); // slide out
      roleIndex = (roleIndex + 1) % roles.length; // next skill
      setTimeout(type, 400);
    }
  }

  /* kick things off */
  setTimeout(type, 600);

  /* ── 3.  “More About Me” OFF‑CANVAS PANEL  ───────────── */
  const moreBtn = document.querySelector(".more-btn"); // button in hero
  const panel = document.getElementById("about-panel");
  const closeBtn = document.getElementById("close-about");

  if (moreBtn && panel && closeBtn) {
    moreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      panel.classList.add("open"); // slides in from right (CSS handles)
    });

    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open"); // slides back out
    });
  }
});
