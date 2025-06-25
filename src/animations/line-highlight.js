// Animation chiffres section
const items = document.querySelectorAll(".chiffres_item");

if (items.length >= 3) {
  // 1er item : bottom bottom -> top center
  ScrollTrigger.create({
    trigger: items[0],
    start: "bottom+=100 bottom",
    end: "top center",
    onEnter: () => items[0].classList.add("background-color-velour"),
    onLeave: () => items[0].classList.remove("background-color-velour"),
    onEnterBack: () => items[0].classList.add("background-color-velour"),
    onLeaveBack: () => items[0].classList.remove("background-color-velour"),
  });

  // 2e item : 1-top center -> 3-center center
  ScrollTrigger.create({
    trigger: items[0],
    start: "top center",
    endTrigger: items[2],
    end: "top center",
    onEnter: () => items[1].classList.add("background-color-velour"),
    onLeave: () => items[1].classList.remove("background-color-velour"),
    onEnterBack: () => items[1].classList.add("background-color-velour"),
    onLeaveBack: () => items[1].classList.remove("background-color-velour"),
  });

  // 3e item : center center -> top top
  ScrollTrigger.create({
    trigger: items[2],
    start: "top center",
    end: "top top",
    onEnter: () => items[2].classList.add("background-color-velour"),
    onLeave: () => items[2].classList.remove("background-color-velour"),
    onEnterBack: () => items[2].classList.add("background-color-velour"),
    onLeaveBack: () => items[2].classList.remove("background-color-velour"),
  });
}
