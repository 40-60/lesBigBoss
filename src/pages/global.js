require("../animations/auto-slider.js")();

// ScrollSmoother.create({
//   //   wrapper: ".page-wrapper",
//   //   content: ".main-wrapper",
//   smooth: 1.2, // smoothness factor (higher = smoother)
//   effects: true, // enable ScrollTrigger-based effects
// });

const lenis = new Lenis({
  smooth: true,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
