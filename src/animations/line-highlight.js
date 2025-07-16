module.exports = function lineHighlight() {
  // Animation chiffres sectionChiffres
  const sectionChiffres = document.querySelector(".section_chiffres");
  const highlightItems = document.querySelectorAll(".chiffres_item");
  const highlightImages = document.querySelectorAll(".chiffres_img");

  // Remove is-active from all .chiffres_img and .line_highlight_img globally
  highlightImages.forEach((img) => img.classList.remove("is-active"));
  const lineHighlightImages = document.querySelectorAll(".line_highlight_img");
  lineHighlightImages.forEach((img) => img.classList.remove("is-active"));

  if (!sectionChiffres || highlightItems.length === 0) return;

  // Remove previous ScrollTriggers if any
  if (window.lineHighlightScrollTriggers) {
    window.lineHighlightScrollTriggers.forEach((t) => t.kill());
  }
  window.lineHighlightScrollTriggers = [];

  const itemCount = highlightItems.length;

  // Create a single ScrollTrigger for the sectionChiffres
  // Animation starts when sectionChiffres enters viewport at 50% from the top,
  // and ends when 50% of sectionChiffres is left in the viewport
  const trigger = ScrollTrigger.create({
    trigger: sectionChiffres,
    start: "top 50%",
    end: "bottom 50%",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress; // 0 to 1 between start and end
      // Remove all highlights if out of range
      if (progress < 0 || progress >= 1) {
        highlightItems.forEach((item) => {
          item.setAttribute("bg-color", "1000");
          item.classList.remove("background-color-velour");
          const img = item.querySelector(".chiffres_img");
          if (img) img.classList.remove("is-active");
          const lineImg = item.querySelector(".line_highlight_img");
          if (lineImg) lineImg.classList.remove("is-active");
        });
        return;
      }
      highlightItems.forEach((item, i) => {
        const img = item.querySelector(".chiffres_img");
        const lineImg = item.querySelector(".line_highlight_img");
        const start = i / itemCount;
        const end = (i + 1) / itemCount;
        if (progress > start && progress < end) {
          item.setAttribute("bg-color", "950");
          item.classList.add("background-color-velour");
          if (img) img.classList.add("is-active");
          if (lineImg) lineImg.classList.add("is-active");
        } else {
          item.setAttribute("bg-color", "1000");
          item.classList.remove("background-color-velour");
          if (img) img.classList.remove("is-active");
          if (lineImg) lineImg.classList.remove("is-active");
        }
      });
    },
  });
  window.lineHighlightScrollTriggers.push(trigger);
};
