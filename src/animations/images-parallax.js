module.exports = function imagesParallax() {
  window.addEventListener("DOMContentLoaded", () => {
    let incr = 0;

    const col1 = document.querySelectorAll(".img_parallax_col")[0];
    // Half of the total height of the column
    const half1 = col1.clientHeight / 2;
    const wrap1 = gsap.utils.wrap(-half1, 0);
    const yTo1 = gsap.quickTo(col1, "y", {
      duration: 0.5, // Changes over 0.5s
      ease: "power3", // Non-linear
      modifiers: {
        y: gsap.utils.unitize(wrap1),
      },
    });

    const col2 = document.querySelectorAll(".img_parallax_col")[1];
    // Half of the total height of the column
    const half2 = col2.clientHeight / 2;
    const wrap2 = gsap.utils.wrap(-half2, 0);
    const yTo2 = gsap.quickTo(col2, "y", {
      duration: 0.8, // Changes over 0.8s
      ease: "power3", // Non-linear
      modifiers: {
        y: gsap.utils.unitize(wrap2),
      },
    });

    const col3 = document.querySelectorAll(".img_parallax_col")[2];
    // Half of the total height of the column
    const half3 = col3.clientHeight / 2;
    const wrap3 = gsap.utils.wrap(-half3, 0);
    const yTo3 = gsap.quickTo(col3, "y", {
      duration: 0.6, // Changes over 0.6s
      ease: "power3", // Non-linear
      modifiers: {
        y: gsap.utils.unitize(wrap3),
      },
    });

    const col4 = document.querySelectorAll(".img_parallax_col")[3];
    // Half of the total height of the column
    const half4 = col4.clientHeight / 2;
    const wrap4 = gsap.utils.wrap(-half4, 0);
    const yTo4 = gsap.quickTo(col4, "y", {
      duration: 0.2, // Changes over 0.2s
      ease: "power3", // Non-linear
      modifiers: {
        y: gsap.utils.unitize(wrap4),
      },
    });

    const col5 = document.querySelectorAll(".img_parallax_col")[4];
    // Half of the total height of the column
    const half5 = col5.clientHeight / 2;
    const wrap5 = gsap.utils.wrap(-half5, 0);
    const yTo5 = gsap.quickTo(col5, "y", {
      duration: 0.4, // Changes over 0.4s
      ease: "power3", // Non-linear
      modifiers: {
        y: gsap.utils.unitize(wrap5),
      },
    });

    window.addEventListener(
      "wheel",
      (e) => {
        incr -= e.deltaY / 2; // Dividing by 2 to slow down the movement
        yTo1(incr);
        yTo2(incr);
        yTo3(incr);
        yTo4(incr);
        yTo5(incr);
      },
      { passive: true }
    );
  });
};
