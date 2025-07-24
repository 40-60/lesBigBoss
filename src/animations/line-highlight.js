module.exports = function lineHighlight() {
  if (window.innerWidth <= 991) return;

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

  // Remove previous event listeners if any
  highlightItems.forEach((item) => {
    item.onmouseenter = null;
    item.onmouseleave = null;
  });

  // Add hover and mousemove listeners to each highlightItem
  let animationFrame;
  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0;
  let hoveredItem = null;

  function animateImgs() {
    // Smoothly interpolate current position towards target
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    highlightItems.forEach((item) => {
      const img = item.querySelector(".chiffres_img");
      if (img) {
        img.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;
      }
    });
    animationFrame = requestAnimationFrame(animateImgs);
  }

  highlightItems.forEach((item) => {
    let mouseMoveHandler;
    item.addEventListener("mouseenter", (e) => {
      hoveredItem = item;
      item.setAttribute("bg-color", "950");
      item.classList.add("background-color-velour");
      // Only keep is-active on hovered item, remove from others
      highlightItems.forEach((otherItem) => {
        const otherImg = otherItem.querySelector(".chiffres_img");
        if (otherImg) {
          if (otherItem === item) {
            otherImg.classList.add("is-active");
            otherImg.style.pointerEvents = "none";
          } else {
            otherImg.classList.remove("is-active");
          }
        }
      });
      // Center on initial mouse position
      const rect = item.getBoundingClientRect();
      targetX = currentX = e.clientX - rect.left;
      targetY = currentY = e.clientY - rect.top;
      // Start animation if not already running
      if (!animationFrame) animateImgs();
      const lineImg = item.querySelector(".line_highlight_img");
      if (lineImg) lineImg.classList.add("is-active");
      // Make all .chiffres_img follow cursor smoothly
      mouseMoveHandler = function (ev) {
        const rect = item.getBoundingClientRect();
        targetX = ev.clientX - rect.left;
        targetY = ev.clientY - rect.top;
      };
      item.addEventListener("mousemove", mouseMoveHandler);
    });
    item.addEventListener("mouseleave", () => {
      hoveredItem = null;
      item.setAttribute("bg-color", "1000");
      item.classList.remove("background-color-velour");
      // Remove is-active only from this item's image
      const img = item.querySelector(".chiffres_img");
      if (img) {
        img.classList.remove("is-active");
      }
      const lineImg = item.querySelector(".line_highlight_img");
      if (lineImg) lineImg.classList.remove("is-active");
      if (mouseMoveHandler) {
        item.removeEventListener("mousemove", mouseMoveHandler);
        mouseMoveHandler = null;
      }
      // Stop animation if not hovering any item
      if (!document.querySelector(".chiffres_item:hover")) {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      }
    });
  });
};
