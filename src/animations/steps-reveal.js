module.exports = function stepsReveal() {
  let scrollTriggerInstance = null;

  function enableArgumentReveal() {
    const contents = document.querySelectorAll(".argument_content");
    const images = document.querySelectorAll(".argument_img");
    const argumentGrids = document.querySelectorAll(".argument_grid");

    argumentGrids.forEach((grid, index) => {
      if (index !== 0) {
        grid.style.position = "absolute";
      }
    });

    contents.forEach((el, index) => {
      gsap.set(el, {
        opacity: index === 0 ? 1 : 0,
        y: index === 0 ? 0 : 200,
      });
    });

    images.forEach((el, index) => {
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

      gsap.set(contents[newIndex], {
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
        },
      });

      timeline.to(contents[currentIndex], {
        opacity: 0,
        y: isScrollingDown ? -300 : 300,
        duration: 0.4,
        ease: "power2.out",
      });

      timeline.to(
        images[currentIndex],
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );

      timeline.to(
        contents[newIndex],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      );

      timeline.to(
        images[newIndex],
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
    const contents = document.querySelectorAll(".argument_content");
    const images = document.querySelectorAll(".argument_img");
    const argumentGrids = document.querySelectorAll(".argument_grid");

    contents.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    images.forEach((el) => {
      el.style.opacity = "1";
    });
    argumentGrids.forEach((grid) => {
      grid.style.position = "static";
    });
  }

  module.exports = function argumentReveal() {
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

    // Ajout du scroll sur clic des .dot-8
    const dots = document.querySelectorAll(".dot-8");
    const section = document.querySelector(".section_argument");
    if (dots.length && section) {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionHeight = section.offsetHeight;

      [0, 1, 2].forEach((i) => {
        if (dots[i]) {
          dots[i].addEventListener("click", () => {
            let percent = 0;
            if (i === 1) percent = 0.33;
            if (i === 2) percent = 0.66;
            const targetScroll = sectionTop + sectionHeight * percent;
            gsap.to(window, {
              scrollTo: { y: targetScroll, autoKill: false },
              duration: 1,
              ease: "power2.out",
            });
          });
        }
      });
    }

    // Optionally: return a cleanup function if needed
  };
};
