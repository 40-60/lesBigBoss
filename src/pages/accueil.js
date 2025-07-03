require("../animations/custom-cursor.js")();
require("../animations/line-highlight.js")();
require("../animations/images-parallax.js")();

// --- Animation du hero ---
const viewportHeight = window.innerHeight;

const video = document.querySelector(".home_hero_video");
const heading1 = document.querySelector(".heading-style-display_hero._1");
const heading2 = document.querySelector(".heading_corail_wrapper");
const headingCorailWrapper = document.querySelector(".heading_corail_wrapper");

headingCorailWrapper.style.overflow = "hidden";

if (!video || !heading1 || !heading2) {
  console.error("Missing one or more required elements");
  return;
}

// Découpe heading1 en lettres avec SplitText (nouvelle API)
const split = SplitText.create(heading1, { type: "chars" });

// Timeline pour heading1 : fade-in lettres puis scale + translateY container heading1 + heading2 + vidéo
const tlHeading1 = gsap.timeline();

// Lettres invisibles au départ
gsap.set(split.chars, { opacity: 0 });

// 1. Fade-in lettres avec stagger (durée 2s)
tlHeading1.to(split.chars, {
  opacity: 1,
  duration: 2,
  ease: "power1.out",
  stagger: { amount: 0.8 },
});

// 2. Scale + translateY + heading2 + vidéo commencent à 1s (avant la fin du fade-in donc)
const commonAnimationSettings = {
  duration: 1.3,
  ease: "power3.inOut",
};

tlHeading1.fromTo(
  heading1,
  { scale: 0.5, y: "20vh" },
  { scale: 1, y: "0vh", ...commonAnimationSettings },
  1.5
);

tlHeading1.fromTo(
  heading2,
  { height: 0 },
  {
    height: "9vw",
    ...commonAnimationSettings,
    onComplete: () => (heading2.style.height = "9vw"),
  },
  1.5
);

tlHeading1.fromTo(
  ".home_hero_video_player",
  { height: "0%" },
  { height: "100%", ...commonAnimationSettings },
  1.5
);

// Fade in #scroll-text at the same time as video scale up
const scrollText = document.querySelector("#scroll-text");
scrollText.style.opacity = 0;
if (scrollText) {
  gsap.set(scrollText, { opacity: 0 });
  tlHeading1.to(
    scrollText,
    { opacity: 1, duration: 1.3, ease: "power3.inOut" },
    1.5
  );
}

// Scroll-trigger animations
const scrollTriggerSettings = {
  trigger: ".section_home_hero",
  start: "top top",
  end: () => `bottom-=${viewportHeight} bottom`,
  scrub: true,
};

gsap.fromTo(
  ".home_hero_video",
  { borderRadius: "30rem" },
  { borderRadius: "1.5rem", scrollTrigger: scrollTriggerSettings }
);

gsap.fromTo(
  ".home_hero_video",
  { height: "30vh" },
  { height: "70vh", scrollTrigger: scrollTriggerSettings }
);

gsap.fromTo(
  ".home_mask",
  { yPercent: 50, scaleY: 0 },
  {
    yPercent: 50,
    scaleY: 8,
    ease: "none",
    scrollTrigger: {
      trigger: "#round-shape-trigger",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
);

const headings = document.querySelectorAll(
  ".heading-style-display_hero.text-color-corail"
);

let currentStep = 0;
const totalSteps = 3; // nombre de "slides" avant de reset
const delayBetween = 2; // en secondes (1s anim + 1s pause)

function animateStep() {
  currentStep++;

  if (currentStep > totalSteps) {
    // Reset à 0
    gsap.set(headings, { yPercent: 0 });
    currentStep = 1;
  }

  // Applique l'anim à chaque heading individuellement
  headings.forEach((el) => {
    gsap.to(el, {
      yPercent: -100 * currentStep,
      duration: 0.8,
      ease: "power3.inOut",
    });
  });
}

// Démarre le carrousel
animateStep();
setTimeout(() => {
  setInterval(animateStep, delayBetween * 1000);
}, 10);
