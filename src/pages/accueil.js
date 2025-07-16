// === Import des animations globales ===
require("../animations/custom-cursor.js")();
require("../animations/line-highlight.js")();
require("../animations/images-parallax.js")();

// === Sélection des éléments principaux ===
const viewportHeight = window.innerHeight;
const video = document.querySelector(".home_hero_video");
const heading1 = document.querySelector("#heading-h1-1");
const headingCorailWrapper = document.querySelector(".heading_corail_wrapper");
const heroVideo = document.querySelector(".home_hero_video");
const scrollText = document.querySelector("#scroll-text");

const start = Date.now();

const interval = setInterval(() => {
  document.documentElement.scrollTop = 0; // Chrome, Firefox, etc.
  document.body.scrollTop = 0; // Safari fallback

  if (Date.now() - start > 3000) {
    clearInterval(interval);
  }
}, 10); // every 10ms (adjust if needed)

// Sécurité : stoppe si un élément clé manque
if (!video || !heading1 || !headingCorailWrapper) {
  console.error("Missing one or more required elements");
  return;
}

// === Préparation du layout ===
headingCorailWrapper.style.overflow = "hidden";
heroVideo.style.height = "0vh";
heading1.style.height = "9vw";

// === Animation d'entrée du heading1 ===
const splitHeading1 = SplitText.create(heading1, {
  type: "words, chars",
  mask: "words",
  wordsClass: "word",
  charsClass: "char",
});
gsap.set(splitHeading1.chars, { opacity: 0 });

const tlHeading1 = gsap.timeline();
tlHeading1.to(splitHeading1.chars, {
  opacity: 1,
  duration: 1,
  ease: "power1.out",
  stagger: { amount: 0.8 },
});
gsap.from(splitHeading1.words, {
  yPercent: 110,
  delay: 0.2,
  duration: 0.8,
  stagger: { amount: 0.5 },
  ease: "power3.out",
});

// === Animation d'entrée du premier .heading-style-display_hero dans headingCorailWrapper ===
const firstHeroHeading = headingCorailWrapper.querySelector(
  ".heading-style-display_hero"
);
if (firstHeroHeading) {
  const splitHero = SplitText.create(firstHeroHeading, {
    type: "words, chars",
    mask: "words",
    wordsClass: "word",
    charsClass: "char",
  });
  gsap.set(splitHero.chars, { opacity: 0 });
  gsap.to(splitHero.chars, {
    opacity: 1,
    duration: 1,
    ease: "power1.out",
    stagger: { amount: 0.8 },
  });
  gsap.from(splitHero.words, {
    yPercent: 110,
    delay: 0.2,
    duration: 0.8,
    stagger: { amount: 0.5 },
    ease: "power3.out",
  });
}

// === Animation scale/translate des éléments principaux ===
const commonAnimationSettings = {
  duration: 1.3,
  ease: "power3.inOut",
};

tlHeading1.fromTo(
  heading1,
  { scale: 0.5 },
  { scale: 1, ...commonAnimationSettings },
  1
);
tlHeading1.fromTo(
  headingCorailWrapper,
  { height: 0 },
  {
    height: "9vw",
    ...commonAnimationSettings,
    onComplete: () => (headingCorailWrapper.style.height = "9vw"),
  },
  1
);
tlHeading1.fromTo(
  ".home_hero_video",
  { height: "0vh" },
  { height: "30vh", ...commonAnimationSettings },
  2.5
);

// === Fade in du scroll-text ===
if (scrollText) {
  gsap.set(scrollText, { opacity: 0 });
  tlHeading1.to(
    scrollText,
    { opacity: 1, duration: 1.3, ease: "power3.inOut" },
    1
  );
}

// === ScrollTrigger : animations déclenchées après 3.3s ===
const scrollTriggerSettings = {
  trigger: ".section_home_hero",
  start: "top top",
  end: () => `bottom-=${viewportHeight} bottom`,
  scrub: true,
};

setTimeout(() => {
  document.body.classList.remove("no-scroll");

  gsap.fromTo(
    ".home_hero_video",
    { borderRadius: "30rem" },
    { borderRadius: "1.5rem", scrollTrigger: scrollTriggerSettings }
  );
  gsap.fromTo(
    ".home_hero_video",
    { height: "30vh" },
    { height: "90vh", scrollTrigger: scrollTriggerSettings }
  );
  gsap.fromTo(
    [heading1, headingCorailWrapper, scrollText],
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: ".section_home_hero",
        start: "top top",
        end: "40% bottom",
        scrub: true,
      },
    }
  );
  gsap.fromTo(
    [heading1, headingCorailWrapper],
    { height: "9vw" },
    {
      height: "0vw",
      scrollTrigger: {
        trigger: ".section_home_hero",
        start: "40% bottom",
        end: "41% bottom",
        scrub: true,
      },
    }
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
}, 3500);

// === Carrousel de headings ===
const headings = document.querySelectorAll(
  ".heading-style-display_hero.text-color-corail"
);
let currentStep = 0;
const totalSteps = 3; // nombre de "slides" avant de reset
const delayBetween = 2; // en secondes (1s anim + 1s pause)

function animateStep() {
  currentStep++;
  if (currentStep > totalSteps) {
    gsap.set(headings, { yPercent: 0 });
    currentStep = 1;
  }
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
}, 100);
