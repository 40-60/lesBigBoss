module.exports = function autoSlider() {
  if (typeof window.gsap === "undefined")
    document.documentElement.classList.add("gsap-not-found");

  // --- Animation automatique avec variation selon la vitesse du scroll ---
  const sliders = document.querySelectorAll(".slider_auto_wrapper");
  const timelines = [];
  let scrollTimeout;

  sliders.forEach((wrapper) => {
    const baseSpeed = 75;
    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      wrapper,
      { xPercent: 0 },
      { xPercent: -100, ease: "linear", duration: baseSpeed }
    );
    tl.timeScale(1);
    timelines.push(tl);
  });

  let scrubObject = { value: 1 };

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const velocity = gsap.utils.clamp(
        0,
        15,
        Math.abs(self.getVelocity()) * 0.03
      );
      const targetTimeScale = 1 + velocity;

      clearTimeout(scrollTimeout);

      // Accélération rapide dès qu'on scrolle
      gsap.to(scrubObject, {
        value: targetTimeScale,
        duration: 0.3,
        ease: "power3.out",
        onUpdate: () =>
          timelines.forEach((tl) => tl.timeScale(scrubObject.value)),
        overwrite: "auto",
      });

      // Ralentissement progressif après 100 ms d'inactivité
      scrollTimeout = setTimeout(() => {
        gsap.to(scrubObject, {
          value: 1,
          duration: 4,
          ease: "power3.out",
          onUpdate: () =>
            timelines.forEach((tl) => tl.timeScale(scrubObject.value)),
          overwrite: "auto",
        });
      }, 100);
    },
  });
};
