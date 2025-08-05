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
window.scrollBy(0, 10);

// Check if GSAP and plugins are loaded
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.gsap === "undefined")
    document.documentElement.classList.add("gsap-not-found");
  gsap.registerPlugin(ScrollTrigger, SplitText);
});

// Prevent flickering for elements with attributes
gsap.set("[prevent-flicker], [text-animation]", { visibility: "visible" });

// Fonction pour trouver l'index du .nav_dropdown contenant un lien correspondant à l'URL actuelle
function logNavDropdownIndexWithCurrentUrl() {
  const dropdowns = document.querySelectorAll(".nav_link");
  const currentUrl = window.location.pathname.replace(/\/$/, ""); // retire le slash final

  dropdowns.forEach((dropdown, idx) => {
    const links = dropdown.querySelectorAll("a[href]");

    for (const link of links) {
      // On compare le pathname du lien sans slash final
      const linkPath = link.pathname.replace(/\/$/, "");
      if (linkPath === currentUrl) {
        document
          .querySelectorAll(".nav_dropdown_toggle")
          [idx].classList.add("is-active");
      }
    }
  });
}

logNavDropdownIndexWithCurrentUrl();
