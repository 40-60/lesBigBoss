module.exports = function lineHighlight() {
  // Animation chiffres sectionChiffres
  const sectionChiffres = document.querySelector(".section_chiffres");
  const highlightItems = document.querySelectorAll(".chiffres_item");
  const highlightImages = document.querySelectorAll(".chiffres_img");

  highlightImages.forEach((img) => img.classList.remove("is-active"));

  if (!sectionChiffres || highlightItems.length === 0) return;

  // Remove previous ScrollTriggers if any
  if (window.lineHighlightScrollTriggers) {
    window.lineHighlightScrollTriggers.forEach((t) => t.kill());
  }
  window.lineHighlightScrollTriggers = [];

  const itemCount = highlightItems.length;

  // Create a single ScrollTrigger for the sectionChiffres
  // Animation starts when sectionChiffres enters viewport at 20% from the bottom,
  // and ends when 20% of sectionChiffres is left in the viewport (i.e., 20% before leaving)
  ScrollTrigger.create({
    trigger: sectionChiffres,
    start: "top 50%", // 20% from bottom
    end: "bottom 50%", // 20% from top
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress; // 0 to 1 between start and end
      // Remove all if out of range
      if (progress < 0 || progress >= 1) {
        highlightItems.forEach((item) => {
          item.classList.remove("background-color-velour");
          const img = item.querySelector(".chiffres_img");
          if (img) img.classList.remove("is-active");
        });
        return;
      }
      highlightItems.forEach((item, i) => {
        const img = item.querySelector(".chiffres_img");
        const start = i / itemCount;
        const end = (i + 1) / itemCount;
        if (progress > start && progress < end) {
          item.classList.add("background-color-velour");
          if (img) img.classList.add("is-active");
        } else {
          item.classList.remove("background-color-velour");
          if (img) img.classList.remove("is-active");
        }
      });
    },
  });
};
