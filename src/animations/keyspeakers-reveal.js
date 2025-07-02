module.exports = function keyspeakersReveal() {
  // Sélection des éléments
  const details = document.querySelectorAll(".keyspeakers_details");
  const pills = document.querySelectorAll(".keyspeakers_img_pill");

  // État initial
  details.forEach((detail, i) => {
    const overline = detail.querySelector(".heading-style-overline");
    if (overline) {
      gsap.set(overline, {
        opacity: i === 0 ? 1 : 0,
        display: "block",
      });
    }
    const displayMedium = detail.querySelector(".heading-style-display-medium");
    if (displayMedium) {
      gsap.set(displayMedium, { x: i === 0 ? "3rem" : "0rem" });
    }
  });
  pills.forEach((pill, i) => gsap.set(pill, { opacity: i === 0 ? 1 : 0 }));

  // Logique de survol
  details.forEach((detail, i) => {
    const overline = detail.querySelector(".heading-style-overline");
    const displayMedium = detail.querySelector(".heading-style-display-medium");
    detail.addEventListener("mouseenter", () => {
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
      }
      // Affichage du pill correspondant
      pills.forEach((pill, j) => {
        gsap.to(pill, { opacity: j === i ? 1 : 0, duration: 0 });
      });
    });
  });
};
