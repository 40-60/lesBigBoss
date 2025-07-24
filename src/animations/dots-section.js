function initGlowingInteractiveDotsGrid() {
  document
    .querySelectorAll("[data-dots-container-init]")
    .forEach((container) => {
      const colors = { base: "#ffffff", active: "#FF4D64" };
      const threshold = 200;
      const speedThreshold = 100;
      const shockRadius = 325;
      const shockPower = 5;
      const maxSpeed = 5000;
      const centerHole = false; // removed the hole

      let dots = [];
      let dotCenters = [];

      function buildGrid() {
        container.innerHTML = "";
        dots = [];
        dotCenters = [];

        const style = getComputedStyle(container);
        const dotPx = parseFloat(style.fontSize);
        const gapPx = dotPx * 0.3;
        const contW = container.clientWidth;
        const contH = container.clientHeight;

        const cols = Math.floor((contW + gapPx) / (dotPx + gapPx));
        const rows = Math.floor((contH + gapPx) / (dotPx + gapPx));
        const total = cols * rows;

        // Remove hole logic
        for (let i = 0; i < total; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          // No hole
          const d = document.createElement("div");
          d.classList.add("dot");
          gsap.set(d, { x: 0, y: 0, backgroundColor: colors.base });
          d._inertiaApplied = false;
          container.appendChild(d);
          dots.push(d);
        }

        requestAnimationFrame(() => {
          dotCenters = dots.map((d) => {
            const r = d.getBoundingClientRect();
            return {
              el: d,
              x: r.left + window.scrollX + r.width / 2,
              y: r.top + window.scrollY + r.height / 2,
            };
          });
        });
      }

      window.addEventListener("resize", buildGrid);
      buildGrid();

      let lastTime = 0,
        lastX = 0,
        lastY = 0;

      window.addEventListener("mousemove", (e) => {
        const now = performance.now();
        const dt = now - lastTime || 16;
        let dx = e.pageX - lastX;
        let dy = e.pageY - lastY;
        let vx = (dx / dt) * 1000;
        let vy = (dy / dt) * 1000;
        let speed = Math.hypot(vx, vy);

        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          vx *= scale;
          vy *= scale;
          speed = maxSpeed;
        }

        lastTime = now;
        lastX = e.pageX;
        lastY = e.pageY;

        requestAnimationFrame(() => {
          dotCenters.forEach(({ el, x, y }) => {
            const dist = Math.hypot(x - e.pageX, y - e.pageY);
            const t = Math.max(0, 1 - dist / threshold);
            const col = gsap.utils.interpolate(colors.base, colors.active, t);
            gsap.set(el, { backgroundColor: col });

            if (
              speed > speedThreshold &&
              dist < threshold &&
              !el._inertiaApplied
            ) {
              el._inertiaApplied = true;
              const pushX = x - e.pageX + vx * 0.005;
              const pushY = y - e.pageY + vy * 0.005;

              gsap.to(el, {
                inertia: { x: pushX, y: pushY, resistance: 750 },
                onComplete() {
                  gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 1.5,
                    ease: "elastic.out(1,0.75)",
                  });
                  el._inertiaApplied = false;
                },
              });
            }
          });
        });
      });

      window.addEventListener("click", (e) => {
        dotCenters.forEach(({ el, x, y }) => {
          const dist = Math.hypot(x - e.pageX, y - e.pageY);
          if (dist < shockRadius && !el._inertiaApplied) {
            el._inertiaApplied = true;
            const falloff = Math.max(0, 1 - dist / shockRadius);
            const pushX = (x - e.pageX) * shockPower * falloff;
            const pushY = (y - e.pageY) * shockPower * falloff;

            gsap.to(el, {
              inertia: { x: pushX, y: pushY, resistance: 750 },
              onComplete() {
                gsap.to(el, {
                  x: 0,
                  y: 0,
                  duration: 1.5,
                  ease: "elastic.out(1,0.75)",
                });
                el._inertiaApplied = false;
              },
            });
          }
        });
      });
    });
}

// Initialize Glowing Interactive Dots Grid
document.addEventListener("DOMContentLoaded", function () {
  initGlowingInteractiveDotsGrid();
});
