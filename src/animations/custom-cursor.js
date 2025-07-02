module.exports = function customCursor() {
  // Custom curseur
  const cursor = document.querySelector(".custom_cursor");
  let mouseX = 0;
  let mouseY = 0;

  if (cursor) {
    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    function updateCursor(e) {
      if (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.2,
        ease: "power2.out",
      });

      const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
      const target = elementUnderCursor?.closest(".custom_cursor_trigger");

      if (target) {
        const cursorChildren = Array.from(cursor.children);
        const targetClass = [
          "event",
          "article",
          "hero",
          "argument",
          "social",
          "testimonial",
        ].find((cls) => target.classList.contains(cls));
        const displayClass = `${targetClass}_cc`;

        cursorChildren.forEach((child) => {
          child.style.display = child.classList.contains(displayClass)
            ? "flex"
            : "none";
        });

        gsap.to(cursor, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(cursor, { autoAlpha: 0, duration: 0.3, ease: "power2.out" });
      }
    }

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener(
      "scroll",
      () => {
        updateCursor();
      },
      { passive: true }
    );
  }
};
