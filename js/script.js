// ======================================================
// HERO SWIPER
// ======================================================
/*
const swiper = new Swiper(".heroSwiper", {
  loop: true,

  speed: 1200,

  effect: "fade",

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});*/

// ======================================================
// AOS ANIMATIONS
// ======================================================
/*
AOS.init({
  duration: 1200,
  once: true,
  offset: 120,
});
*/

// ======================================================
// NAVBAR SCROLL EFFECT
// ======================================================

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.padding = "14px 7%";

    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";

    navbar.style.background = "rgba(255,255,255,0.92)";
  } else {
    navbar.style.padding = "18px 7%";

    navbar.style.boxShadow = "none";

    navbar.style.background = "rgba(65, 17, 17, 0.8)";
  }
});

// ======================================================
// IMPACT MARQUEE PAUSE ON HOVER
// ======================================================

const impactTrack = document.querySelector(".impact-track");

if (impactTrack) {
  impactTrack.addEventListener("mouseenter", () => {
    impactTrack.style.animationPlayState = "paused";
  });

  impactTrack.addEventListener("mouseleave", () => {
    impactTrack.style.animationPlayState = "running";
  });
}
/* COUNTER */

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");

    const c = +counter.innerText;

    const increment = target / 100;

    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;

      setTimeout(updateCounter, 30);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
/* DIVISION SWITCHER */

function showDivision(id) {
  const contents = document.querySelectorAll(".division-content");

  contents.forEach((content) => {
    content.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.background = "#111";
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  } else {
    navbar.style.background = "#111";
    navbar.style.boxShadow = "none";
  }
});
