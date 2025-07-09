/* =======================================================================
   main.js  — Service cards + About‑Me tabs
   ======================================================================= */
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
document.addEventListener("DOMContentLoaded", () => {
  /* ───────────────────── 1. SERVICE‑CARD FEATURES ───────────────────── */

  const cards = document.querySelectorAll(".service-card");

  /* 1‑a. Scroll‑reveal (staggered, plays once) */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${idx * 0.15}s`;
          entry.target.classList.add("reveal");
          obs.unobserve(entry.target); // keep visible forever
        }
      });
    },
    { threshold: 0.25 }
  );
  cards.forEach((card) => revealObserver.observe(card));

  /* 1‑b. 3‑D tilt hover */
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotX = ((y - height / 2) / (height / 2)) * -6; // −6°‥6°
      const rotY = ((x - width / 2) / (width / 2)) * 6;
      card.style.setProperty("--rx", rotX.toFixed(2) + "deg");
      card.style.setProperty("--ry", rotY.toFixed(2) + "deg");
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  /* 1‑c. Modal */
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

    /* attach click‑to‑open on each card */
    cards.forEach((card) =>
      card.addEventListener("click", () =>
        openModal({
          title: card.dataset.title || card.querySelector("h3").textContent,
          body: card.dataset.body || "Detailed description coming soon! ✨",
        })
      )
    );
  }

  /* ───────────────────── 2. ABOUT‑ME TAB SWITCHER ───────────────────── */

  const navLinks = document.querySelectorAll(".about-nav .nav-link");
  const tabPanels = document.querySelectorAll(".tab-content");

  navLinks.forEach((btn) =>
    btn.addEventListener("click", () => {
      /* nav button state */
      navLinks.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      /* show / hide panels */
      tabPanels.forEach((panel) => {
        panel.style.display =
          panel.id === btn.dataset.target ? "block" : "none";
      });

      /* trigger card shuffle animation */
      const grid = document
        .getElementById(btn.dataset.target)
        .querySelector(".card-grid");
      grid.classList.remove("animate"); // reset
      void grid.offsetWidth; // force reflow
      grid.classList.add("animate"); // play again
    })
  );

  /* optional: make sure default tab is visible on first load */
  document
    .getElementById("skills")
    ?.querySelector(".card-grid")
    ?.classList.add("animate");
});
