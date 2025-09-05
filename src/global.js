require("./animations/auto-slider.js")();

// Smooth scrolling with Lenis
const lenis = new Lenis({
  smooth: true,
  lerp: 0.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Scroll de 1px pour les heading dans la hero
// window.scrollBy(0, 10);

// Check if GSAP and plugins are loaded
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.gsap === "undefined")
    document.documentElement.classList.add("gsap-not-found");
  gsap.registerPlugin(ScrollTrigger, SplitText);
});

// Prevent flickering for elements with attributes
gsap.set(
  "[prevent-flicker], [text-animation], [text-animation-hero], [circle-hero]",
  { visibility: "visible" }
);

// Fonction pour trouver l'index du .nav_dropdown contenant un lien correspondant à l'URL actuelle
function activeNavLink() {
  const dropdowns = document.querySelectorAll(".nav_link");
  const currentUrl = window.location.pathname.replace(/\/$/, ""); // retire le slash final

  dropdowns.forEach((dropdown, idx) => {
    const links = dropdown.querySelectorAll("a[href]");

    for (const link of links) {
      // On compare le pathname du lien sans slash final
      const linkPath = link.pathname.replace(/\/$/, "");
      if (linkPath === currentUrl) {
        const toggle = document.querySelectorAll(".nav_dropdown_toggle")[idx];
        toggle.classList.add("is-active");
        toggle.setAttribute("text-color", "400");
      }
    }
  });
}

// Après le chargement du Lottie
const lottieContainer = document.querySelector(".burger_icon svg");
if (lottieContainer) {
  lottieContainer.style.color = "currentColor";
  // Pour forcer tous les fills à suivre currentColor
  lottieContainer.querySelectorAll("[fill]").forEach((el) => {
    el.setAttribute("fill", "currentColor");
  });
}

activeNavLink();
