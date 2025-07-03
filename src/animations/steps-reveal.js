module.exports = function stepsReveal() {
  let scrollTriggerInstance = null;

  function enableArgumentReveal() {
    const argumentContents = document.querySelectorAll(".argument_content");
    const argumentImages = document.querySelectorAll(".argument_img");
    const argumentGrids = Array.from(
      document.querySelectorAll(".argument_grid")
    );

    if (window.innerWidth <= 991) {
      return;
    }

    function setGridPointerEvents(activeIdx) {
      argumentGrids.forEach((grid, idx) => {
        grid.style.pointerEvents = idx === activeIdx ? "auto" : "none";
      });
    }

    setGridPointerEvents(0);

    argumentGrids.forEach((grid, index) => {
      if (index !== 0) {
        grid.style.position = "absolute";
      } else {
        grid.style.pointerEvents = "auto";
      }
    });

    argumentContents.forEach((el, index) => {
      gsap.set(el, {
        opacity: index === 0 ? 1 : 0,
        y: index === 0 ? 0 : 200,
      });
    });

    argumentImages.forEach((el, index) => {
      gsap.set(el, {
        opacity: index === 0 ? 1 : 0,
      });
    });

    let currentIndex = 0;
    let isAnimating = false;
    let pendingIndex = null;

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".section_argument",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (isAnimating) {
          pendingIndex = getTargetIndex(self.progress);
          return;
        }
        const targetIndex = getTargetIndex(self.progress);
        if (targetIndex !== currentIndex) {
          animateToIndex(targetIndex, self);
        }
      },
    });

    function getTargetIndex(progress) {
      if (progress < 0.33) {
        return 0;
      } else if (progress < 0.66) {
        return 1;
      } else {
        return 2;
      }
    }

    function animateToIndex(newIndex, self) {
      if (isAnimating || newIndex === currentIndex) return;

      isAnimating = true;
      pendingIndex = null;
      const isScrollingDown = newIndex > currentIndex;

      gsap.set(argumentContents[newIndex], {
        y: isScrollingDown ? 200 : -200,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          currentIndex = newIndex;
          if (pendingIndex !== null && pendingIndex !== currentIndex) {
            animateToIndex(pendingIndex);
          }
          // Set pointer-events for argument_grids
          setGridPointerEvents(currentIndex);
        },
      });

      timeline.to(argumentContents[currentIndex], {
        opacity: 0,
        y: isScrollingDown ? -300 : 300,
        duration: 0.4,
        ease: "power2.out",
      });

      timeline.to(
        argumentImages[currentIndex],
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );

      timeline.to(
        argumentContents[newIndex],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );

      timeline.to(
        argumentImages[newIndex],
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }
  }

  function disableArgumentReveal() {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    // Remettre les styles à l'état normal si < 991px
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

  // Dynamically create dots based on the number of argument_grids
  const argumentDotWrappers = Array.from(
    document.querySelectorAll(".argument_dot_wrapper")
  );
  const argumentGrids = Array.from(document.querySelectorAll(".argument_grid"));
  const numGrids = argumentGrids.length;

  function createDots(numGrids) {
    argumentDotWrappers.forEach((wrapper, wrapperIdx) => {
      wrapper.innerHTML = "";
      for (let i = 0; i < numGrids; i++) {
        const dot = document.createElement("div");
        dot.className = "dot-8 cursor-pointer background-color-gs-300";
        if (i === wrapperIdx) {
          dot.classList.remove("background-color-gs-300");
          dot.classList.add("background-color-velour");
        }
        wrapper.appendChild(dot);
      }
    });
  }

  createDots(argumentGrids.length);

  // Ajout du scroll sur clic des .dot-8
  const dots = Array.from(document.querySelectorAll(".dot-8"));
  const section = document.querySelector(".section_argument");
  if (dots.length && section) {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    const sectionHeight = section.offsetHeight;
    const numGrids = argumentGrids.length;
    const minPercent = 0.1;
    const maxPercent = 0.6;

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        const gridIndex = i % numGrids;
        const percent =
          numGrids === 1
            ? 0.5
            : minPercent +
              (maxPercent - minPercent) * (gridIndex / (numGrids - 1));
        const targetScroll = sectionTop + sectionHeight * percent;
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      });
    });
  }

  enableArgumentReveal();
};
