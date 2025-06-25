exports.default = function argumentReveal() {
  const contents = document.querySelectorAll(".argument_content");
  const images = document.querySelectorAll(".argument_img");

  // État initial : seul le premier visible
  contents.forEach((el, index) => {
    gsap.set(el, {
      opacity: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 200,
    });
  });

  // État initial : seul le premier visible
  images.forEach((el, index) => {
    gsap.set(el, {
      opacity: index === 0 ? 1 : 0,
    });
  });

  contents[0].style.position = "absolute";
  contents[1].style.position = "absolute";

  let currentIndex = 0;
  let isAnimating = false;

  ScrollTrigger.create({
    trigger: "#argument-container",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (isAnimating) return;

      const progress = self.progress;
      let targetIndex;

      if (progress < 0.2) {
        targetIndex = 0;
      } else if (progress < 0.5) {
        targetIndex = 1;
      } else {
        targetIndex = 2;
      }

      if (targetIndex !== currentIndex) {
        animateToIndex(targetIndex);
      }
    },
  });

  function animateToIndex(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;

    isAnimating = true;
    const isScrollingDown = newIndex > currentIndex;

    // Préparer la position initiale du nouvel élément
    gsap.set(contents[newIndex], {
      y: isScrollingDown ? 200 : -200, // Vient du bas si scroll down, du haut si scroll up
      opacity: 0,
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
        currentIndex = newIndex;
      },
    });

    // Faire disparaître l'élément actuel
    timeline.to(contents[currentIndex], {
      opacity: 0,
      y: isScrollingDown ? -300 : 300, // Sort vers le haut si scroll down, vers le bas si scroll up
      duration: 0.4,
      ease: "power2.out",
    });

    // Faire disparaître l'image actuelle en même temps
    timeline.to(
      images[currentIndex],
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Faire apparaître le nouvel élément
    timeline.to(
      contents[newIndex],
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.4"
    ); // Démarre en même temps que la disparition

    // Faire apparaître la nouvelle image en même temps
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
};
