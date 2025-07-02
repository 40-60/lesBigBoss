module.exports = function orderedSteps() {
  const formatsLinks = document.querySelectorAll(
    ".meeting_formats_grid .heading-style-overline"
  );
  const formatsSteps = document.querySelectorAll(".meeting_formats_step");
  const orderedStepsHeadings = document.querySelectorAll(
    ".ordered_steps_headings"
  );

  // Early exit if no steps or links
  if (!formatsLinks.length || !formatsSteps.length) return;

  // Reset all steps and set initial state
  formatsSteps.forEach((el, idx) => {
    el.classList.remove("is-active");
    el.style.position = "absolute";
    if (orderedStepsHeadings[idx]) {
      orderedStepsHeadings[idx].classList.remove("text-color-corail");
    }
    if (formatsLinks[idx]) {
      formatsLinks[idx].classList.remove("is-active");
    }
  });

  formatsSteps[0].classList.add("is-active");
  formatsLinks[0].classList.add("is-active");
  if (orderedStepsHeadings[0]) {
    orderedStepsHeadings[0].classList.add("text-color-corail");
  }

  ScrollTrigger.create({
    trigger: document.querySelector(".meeting_formats_grid"),
    start: "top 50%",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const stepsCount = formatsSteps.length;
      let activeIndex = Math.floor(progress * stepsCount);
      if (activeIndex >= stepsCount) activeIndex = stepsCount - 1;

      // Only update if changed
      if (
        !formatsSteps[activeIndex].classList.contains("is-active") ||
        !formatsLinks[activeIndex].classList.contains("is-active")
      ) {
        formatsLinks.forEach((el, idx) => {
          el.classList.toggle("is-active", idx === activeIndex);
        });
        formatsSteps.forEach((el, idx) => {
          el.classList.toggle("is-active", idx === activeIndex);
          if (orderedStepsHeadings[idx]) {
            orderedStepsHeadings[idx].classList.toggle(
              "text-color-corail",
              idx === activeIndex
            );
          }
        });
      }
    },
  });
};
