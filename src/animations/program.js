module.exports = function orderedSteps() {
  // Animation GSAP ScrollTrigger sur .section_program
  if (
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    console.error("GSAP ou ScrollTrigger non trouvés");
    return;
  }
  const section = document.querySelector(".section_program");
  const items = section
    ? section.querySelectorAll(".program_content_item")
    : [];
  if (!section || items.length === 0) {
    console.warn("section_program ou program_content_item manquant");
    return;
  }
  const steps = items.length;
  let lastIdx = -1;
  // Initialisation des classes selon la position du scroll au chargement
  if (section && items.length > 0) {
    // Calcul de l'index actif selon la position du scroll
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;
    const sectionHeight = section.offsetHeight;
    const segmentHeight = sectionHeight / steps;
    let activeIdx = Math.floor(
      (window.scrollY - sectionTop + segmentHeight / 2) / segmentHeight
    );
    if (activeIdx < 0) activeIdx = 0;
    if (activeIdx >= steps) activeIdx = steps - 1;
    items.forEach((item, idx) => {
      item.classList.remove("is-active", "is-coming", "is-past");
      if (idx < activeIdx) {
        item.classList.add("is-past");
      } else if (idx === activeIdx) {
        item.classList.add("is-active");
      } else {
        item.classList.add("is-coming");
      }
    });
    lastIdx = activeIdx;
  }
  // Scroll au bon segment lors du clic sur .program_time
  const times = section.querySelectorAll(".program_time");
  times.forEach((timeEl, idx) => {
    timeEl.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionHeight = section.offsetHeight;
      const steps = times.length;
      const segmentHeight = sectionHeight / steps;
      // Calcul de la position cible
      const targetY = sectionTop + idx * segmentHeight;
      if (
        window.gsap &&
        window.gsap.to &&
        window.gsap.plugins &&
        window.gsap.plugins.ScrollToPlugin
      ) {
        window.gsap.to(window, {
          scrollTo: { y: targetY },
          duration: 1,
          ease: "power2.out",
        });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    });
  });
  window.ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const segment = 1 / steps;
      let activeIdx = Math.floor(progress / segment);
      if (activeIdx < 0) activeIdx = 0;
      if (activeIdx >= steps) activeIdx = steps - 1;
      if (activeIdx !== lastIdx) {
        // Gestion des couleurs sur les titres
        const times = section.querySelectorAll(".program_time");
        times.forEach((timeEl, idx) => {
          const h3 = timeEl.querySelector(".heading-style-h3");
          if (h3) {
            if (idx === activeIdx) {
              h3.classList.add("text-color-corail");
              h3.classList.remove("text-color-gs-400");
            } else {
              h3.classList.remove("text-color-corail");
              h3.classList.add("text-color-gs-400");
            }
          }
          const dot = timeEl.querySelector(".program_dot");
          if (dot) {
            if (idx === activeIdx) {
              dot.classList.add("is-active");
            } else {
              dot.classList.remove("is-active");
            }
          }
        });
        // Gestion des classes sur les .program_content_item
        items.forEach((item, idx) => {
          item.classList.remove("is-active", "is-coming", "is-past");
          if (idx < activeIdx) {
            item.classList.add("is-past");
          } else if (idx === activeIdx) {
            item.classList.add("is-active");
          } else {
            item.classList.add("is-coming");
          }
        });
        // Animation verticale des images
        const imgs = section.querySelectorAll(".program_img");
        const y = -activeIdx * 100;
        if (window.gsap) {
          imgs.forEach((img) => {
            window.gsap.to(img, {
              yPercent: y,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        } else {
          imgs.forEach((img) => {
            img.style.transform = `translateY(${y}%)`;
          });
        }
        console.log("ScrollTrigger étape:", activeIdx + 1, "/", steps);
        lastIdx = activeIdx;
      }
    },
  });
};
