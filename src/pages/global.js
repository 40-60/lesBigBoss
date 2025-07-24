require("../animations/auto-slider.js")();

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
