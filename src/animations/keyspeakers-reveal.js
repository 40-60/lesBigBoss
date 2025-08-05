module.exports = function keyspeakersReveal() {
  // Sélection des éléments
  const details = document.querySelectorAll(".keyspeakers_details");
  const pills = document.querySelectorAll(".keyspeakers_img_pill");

  // Fonction pour reset l'état mobile
  function resetMobileState() {
    details.forEach((detail) => {
      const displayMedium = detail.querySelector(
        ".heading-style-display-medium"
      );
      if (displayMedium) {
        // .keyspeakers_job juste avant
        const job = displayMedium.previousElementSibling;
        if (job && job.classList.contains("keyspeakers_job")) {
          job.classList.remove("is-active");
        }
        // .keyspeakers_img_wrapper juste après
        const imgWrapper = displayMedium.nextElementSibling;
        if (
          imgWrapper &&
          imgWrapper.classList.contains("keyspeakers_img_wrapper")
        ) {
          imgWrapper.classList.remove("is-active");
        }
        displayMedium.style.color = "";
      }
    });
  }

  // Initialisation selon la largeur
  function setInitialState() {
    if (window.innerWidth > 767) {
      details.forEach((detail, i) => {
        const overline = detail.querySelector(".heading-style-overline");
        if (overline) {
          gsap.set(overline, {
            opacity: i === 0 ? 1 : 0,
            display: "block",
          });
        }
        const displayMedium = detail.querySelector(
          ".heading-style-display-medium"
        );
        if (displayMedium) {
          gsap.set(displayMedium, { x: i === 0 ? "3rem" : "0rem" });
          displayMedium.style.color = i === 0 ? "white" : "";
        }
      });
      pills.forEach((pill, i) => gsap.set(pill, { opacity: i === 0 ? 1 : 0 }));
    } else {
      // Mobile: reset tout
      resetMobileState();
    }
  }

  setInitialState();

  // Logique d'interaction
  details.forEach((detail, i) => {
    const overline = detail.querySelector(".heading-style-overline");
    const displayMedium = detail.querySelector(".heading-style-display-medium");
    // Desktop: hover
    detail.addEventListener("mouseenter", () => {
      if (window.innerWidth > 767) {
        // Reset all others
        details.forEach((otherDetail, j) => {
          if (otherDetail !== detail) {
            const otherOverline = otherDetail.querySelector(
              ".heading-style-overline"
            );
            if (otherOverline) {
              gsap.to(otherOverline, { opacity: 0, duration: 0 });
            }
            const otherDisplayMedium = otherDetail.querySelector(
              ".heading-style-display-medium"
            );
            if (otherDisplayMedium) {
              gsap.to(otherDisplayMedium, { x: "0rem", duration: 0 });
              otherDisplayMedium.style.color = "";
            }
          }
        });
        // Animation de l'overline
        if (overline) {
          gsap.to(overline, { opacity: 1, duration: 0 });
        }
        // Déplacement de .heading-style-display-medium de 3rem vers la droite
        if (displayMedium) {
          gsap.to(displayMedium, { x: "3rem", duration: 0 });
          displayMedium.style.color = "white";
        }
        // Affichage du pill correspondant
        pills.forEach((pill, j) => {
          gsap.to(pill, { opacity: j === i ? 1 : 0, duration: 0 });
        });
      }
    });
    // Mobile: click
    if (displayMedium) {
      displayMedium.addEventListener("click", function () {
        if (window.innerWidth <= 767) {
          resetMobileState();
          // .keyspeakers_job juste avant
          const job = displayMedium.previousElementSibling;
          if (job && job.classList.contains("keyspeakers_job")) {
            job.classList.add("is-active");
          }
          // .keyspeakers_img_wrapper juste après
          const imgWrapper = displayMedium.nextElementSibling;
          if (
            imgWrapper &&
            imgWrapper.classList.contains("keyspeakers_img_wrapper")
          ) {
            imgWrapper.classList.add("is-active");
          }
          displayMedium.style.color = "white";
        }
      });
    }
  });

  // Réinitialiser à chaque resize
  window.addEventListener("resize", setInitialState);
};
