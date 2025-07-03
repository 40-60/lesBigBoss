// Accordion steps animation with GSAP ScrollTrigger
module.exports = function accordionSteps() {
  if (
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    console.error(
      "GSAP or ScrollTrigger not found. Make sure they are loaded globally."
    );
    return;
  }

  const section = document.querySelector(".section_accordion");
  const stickyWrapper = document.querySelector(".accordion_sticky_wrapper");
  if (!section || !stickyWrapper) return;

  const overlines = section.querySelectorAll(".heading-style-overline");
  const svgs = section.querySelectorAll(".svg.text-color-gs-300");
  const accordionContents = section.querySelectorAll(".accordion_content");
  const accordionProgress = section.querySelectorAll(".accordion_progress");
  const steps = accordionContents.length;
  const accordionImages = section.querySelectorAll(".accordion_img");

  // Initial state
  overlines.forEach((el, idx) =>
    el.classList.toggle("text-color-prune", idx === 0)
  );
  svgs.forEach((el, idx) =>
    el.classList.toggle("text-color-corail", idx === 0)
  );
  accordionContents.forEach(
    (el, idx) => (el.style.height = idx === 0 ? "auto" : "0px")
  );
  accordionProgress.forEach((el) => (el.style.width = "0%"));
  if (window.innerWidth > 991) {
    accordionImages.forEach((el) => {
      el.style.position = "absolute";
    });
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      accordionImages.forEach((el) => {
        el.style.position = "absolute";
      });
    } else {
      accordionImages.forEach((el) => {
        el.style.position = "static";
      });
    }
  });

  // GSAP ScrollTrigger
  window.ScrollTrigger.create({
    trigger: stickyWrapper,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const segment = 1 / steps;
      let activeIdx = Math.floor(progress / segment);
      if (activeIdx < 0) activeIdx = 0;
      if (activeIdx >= steps) activeIdx = steps - 1;

      overlines.forEach((el, idx) =>
        el.classList.toggle("text-color-prune", idx === activeIdx)
      );
      svgs.forEach((el, idx) =>
        el.classList.toggle("text-color-corail", idx === activeIdx)
      );
      accordionContents.forEach(
        (el, idx) => (el.style.height = idx === activeIdx ? "auto" : "0px")
      );
      accordionProgress.forEach((el, idx) => {
        let start = idx * segment;
        let end = (idx + 1) * segment;
        let width = 0;
        if (progress >= end) {
          width = 100;
        } else if (progress > start) {
          width = ((progress - start) / segment) * 100;
        }
        el.style.width = width + "%";
      });
    },
  });

  // Add click-to-scroll for [accordion-link] elements (short version)
  document.querySelectorAll("[accordion-link]").forEach((link, idx) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const steps = accordionContents.length;
      const progress = steps === 1 ? 0 : idx / (steps - 1);
      const rect = stickyWrapper.getBoundingClientRect();
      const targetY =
        rect.top +
        window.scrollY +
        (stickyWrapper.offsetHeight - window.innerHeight) * progress;
      if (
        window.gsap &&
        window.gsap.to &&
        window.gsap.plugins &&
        window.gsap.plugins.ScrollToPlugin
      ) {
        window.gsap.to(window, {
          scrollTo: { y: targetY },
          duration: 1,
          ease: "power2.out",
        });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    });
  });
};
