module.exports = function orderedSteps() {
  const formatsLinks = document.querySelectorAll(
    ".meeting_formats_grid .heading-style-overline"
  );
  const formatsSteps = document.querySelectorAll(
    ".meeting_formats_grid .heading-style-display-medium"
  );
  const formatsStepsWrapper = document.querySelector(".meeting_formats_steps");
  const orderedStepsHeadings = document.querySelectorAll(
    ".ordered_steps_headings"
  );

  formatsStepsWrapper.style.overflow = "hidden"; // Ensure overflow is hidden

  // Early exit if no steps or links
  if (!formatsLinks.length || !formatsSteps.length) return;

  // Set initial state: all steps at y=0
  formatsSteps.forEach((el) => {
    el.style.transform = `translateY(0%)`;
  });
  formatsLinks[0].classList.add("text-color-corail");
  formatsLinks[0].setAttribute("text-color", "300");
  if (orderedStepsHeadings[0]) {
    orderedStepsHeadings[0].classList.add("text-color-corail");
    orderedStepsHeadings[0].setAttribute("text-color", "300");
  }

  ScrollTrigger.create({
    trigger: document.querySelector(".meeting_formats_grid"),
    start: "top 25%",
    end: "bottom 25%",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const stepsCount = formatsSteps.length;
      let activeIndex = Math.floor(progress * stepsCount);
      if (activeIndex >= stepsCount) activeIndex = stepsCount - 1;

      // Only update if changed
      if (!formatsLinks[activeIndex].classList.contains("is-active")) {
        formatsLinks.forEach((el, idx) => {
          if (idx === activeIndex) {
            el.classList.add("text-color-corail");
            el.classList.remove("text-color-gs-300");
          } else {
            el.classList.remove("text-color-corail");
            el.classList.add("text-color-gs-300");
          }
          el.setAttribute("text-color", idx === activeIndex ? "300" : "");
        });
      }
      // Move all steps together
      const y = -activeIndex * 100;
      formatsSteps.forEach((el) => {
        el.style.transform = `translateY(${y}%)`;
      });
      orderedStepsHeadings.forEach((el, idx) => {
        el.classList.toggle("text-color-corail", idx === activeIndex);
        el.setAttribute("text-color", idx === activeIndex ? "300" : "");
      });
    },
  });
};
