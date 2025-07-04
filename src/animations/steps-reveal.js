module.exports = function stepsReveal() {
  let scrollTriggerInstance = null;

  function enableArgumentReveal() {
    const argumentContents = document.querySelectorAll(".argument_content");
    const argumentImages = document.querySelectorAll(".argument_img");
    const argumentGrids = Array.from(
      document.querySelectorAll(".argument_grid")
    );
    const argumentDotWrappers = Array.from(
      document.querySelectorAll(".argument_dot_wrapper")
    );
    const section = document.querySelector(".argument_sticky_wrapper");
    if (!section || argumentGrids.length === 0) return;
    if (window.innerWidth <= 991) return;

    // Initial state
    argumentGrids.forEach((grid, idx) => {
      grid.style.position = idx === 0 ? "static" : "absolute";
      grid.style.pointerEvents = idx === 0 ? "auto" : "none";
    });
    argumentContents.forEach((el, idx) => {
      gsap.set(el, { opacity: idx === 0 ? 1 : 0, y: 0 });
    });
    argumentImages.forEach((el, idx) => {
      gsap.set(el, { opacity: idx === 0 ? 1 : 0 });
    });

    // Dots
    function createDots(numGrids) {
      argumentDotWrappers.forEach((wrapper, wrapperIdx) => {
        wrapper.innerHTML = "";
        for (let i = 0; i < numGrids; i++) {
          const dot = document.createElement("div");
          dot.className = "dot-8 cursor-pointer background-color-gs-300";
          // Ajoute background-color-velour au premier dot du premier wrapper dès la création
          if (wrapperIdx === 0 && i === 0) {
            dot.classList.remove("background-color-gs-300");
            dot.classList.add("background-color-velour");
          }
          wrapper.appendChild(dot);
        }
      });
    }
    createDots(argumentGrids.length);

    // ScrollTrigger avec gestion d'animation séquentielle
    let currentIndex = 0;
    let isAnimating = false;
    let pendingIndex = null;
    function animateToIndex(newIndex) {
      if (isAnimating || newIndex === currentIndex) return;
      isAnimating = true;
      pendingIndex = null;
      const isScrollingDown = newIndex > currentIndex;
      gsap.set(argumentContents[newIndex], {
        y: isScrollingDown ? 200 : -200,
        opacity: 0,
      });
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          currentIndex = newIndex;
          if (pendingIndex !== null && pendingIndex !== currentIndex) {
            animateToIndex(pendingIndex);
          }
        },
      });
      tl.to(argumentContents[currentIndex], {
        opacity: 0,
        y: isScrollingDown ? -300 : 300,
        duration: 0.4,
        ease: "power2.out",
      });
      tl.to(
        argumentImages[currentIndex],
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
      tl.to(
        argumentContents[newIndex],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
      tl.to(
        argumentImages[newIndex],
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
      argumentGrids.forEach((grid, idx) => {
        grid.style.pointerEvents = idx === newIndex ? "auto" : "none";
      });
      argumentDotWrappers.forEach((wrapper) => {
        const dots = wrapper.querySelectorAll(".dot-8");
        dots.forEach((dot, idx) => {
          dot.classList.toggle("background-color-velour", idx === newIndex);
          dot.classList.toggle("background-color-gs-300", idx !== newIndex);
        });
      });
    }
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: false,
      onUpdate: (self) => {
        const steps = argumentGrids.length;
        let activeIdx = Math.floor(self.progress * steps);
        activeIdx = Math.max(0, Math.min(steps - 1, activeIdx));
        if (isAnimating) {
          pendingIndex = activeIdx;
          return;
        }
        if (activeIdx !== currentIndex) {
          animateToIndex(activeIdx);
        }
      },
    });

    // Dot click scroll
    const dots = Array.from(document.querySelectorAll(".dot-8"));
    if (dots.length && section) {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionHeight = section.offsetHeight;
      const numGrids = argumentGrids.length;
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          // Pour n dots par wrapper, on veut que chaque "colonne" de dot scroll au même endroit
          // donc on prend l'index modulo le nombre de grids
          let dotIndex = i % numGrids;
          let percent = numGrids === 1 ? 0.5 : dotIndex / numGrids;
          const targetScroll = sectionTop + sectionHeight * percent;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        });
      });
    }
  }

  function disableArgumentReveal() {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    // Reset styles for < 991px
    const argumentContents = document.querySelectorAll(".argument_content");
    const argumentImages = document.querySelectorAll(".argument_img");
    const argumentGrids = document.querySelectorAll(".argument_grid");
    argumentContents.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    argumentImages.forEach((el) => {
      el.style.opacity = "1";
    });
    argumentGrids.forEach((grid) => {
      grid.style.position = "static";
      grid.style.pointerEvents = "auto";
    });
    document.querySelectorAll(".dot-8").forEach((dot) => {
      dot.classList.remove("background-color-velour");
      dot.classList.add("background-color-gs-300");
    });
  }

  function handleResize() {
    if (window.innerWidth <= 991) {
      disableArgumentReveal();
      return;
    }
    if (!scrollTriggerInstance) {
      enableArgumentReveal();
    }
  }

  // Initial check
  handleResize();
  // Listen to resize
  window.addEventListener("resize", handleResize);
};
