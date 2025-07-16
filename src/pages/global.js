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

document.querySelectorAll("[text-animation]").forEach((el) => {
  if (typeof SplitText === "undefined") {
    console.error("SplitText is not loaded.");
    return;
  }

  const split = SplitText.create(el, {
    type: "words, chars",
    mask: "words",
    wordsClass: "word",
    charsClass: "char",
  });

  gsap.set(split.chars, { opacity: 0 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // ajuste selon ton besoin
        once: true,
      },
    })
    .to(split.chars, {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      stagger: { amount: 0.8 },
    })
    .from(
      split.words,
      {
        yPercent: 110,
        duration: 0.8,
        stagger: { amount: 0.5 },
        ease: "power3.out",
      },
      "<+0.2"
    ); // "<+0.2" = décalage de 0.2s après le début de l'anim précédente
});
