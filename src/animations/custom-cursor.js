module.exports = function customCursor() {
  // Custom curseur
  if (window.innerWidth < 991) return; // 62rem in px
  const cursor = document.querySelector(".custom_cursor");
  let mouseX = 0;
  let mouseY = 0;

  if (cursor) {
    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    let cursorShown = false;
    function updateCursor(e) {
      if (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorShown) {
          gsap.to(cursor, { autoAlpha: 1, duration: 0.2 });
          cursorShown = true;
        }
      }

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: "power2.out",
      });

      const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
      const target = elementUnderCursor?.closest(".custom_cursor_trigger");

      const cursorChildren = Array.from(cursor.children);
      if (target) {
        const targetClass = [
          "event",
          "article",
          "hero",
          "argument",
          "social",
          "testimonial",
          "team",
        ].find((cls) => target.classList.contains(cls));
        const displayClass = `${targetClass}_cc`;

        cursorChildren.forEach((child) => {
          child.style.display = child.classList.contains(displayClass)
            ? "flex"
            : "none";
        });
      } else {
        cursorChildren.forEach((child) => {
          child.style.display = "none";
        });
      }
    }

    window.addEventListener("pointermove", updateCursor);
    document.addEventListener(
      "scroll",
      () => {
        updateCursor();
      },
      { passive: true }
    );
  }
};
