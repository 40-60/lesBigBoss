module.exports = function imageParallax() {
  // gsap.to(".img_parallax_heading", {
  //   autoAlpha: 0,
  //   duration: 0.2,
  //   scrollTrigger: {
  //     trigger: ".mwg_effect033",
  //     start: "top top",
  //     end: "top top-=1",
  //     toggleActions: "play none reverse none",
  //   },
  // });

  const W = window.innerWidth;
  const H = window.innerHeight;

  const container = document.querySelector(".mwg_effect033 .container");
  const medias = container.querySelectorAll(".media");

  const randomClasses = [
    "gallery_round",
    "gallery_gelule_vertical",
    "gallery_gelule_horizontal",
    "gallery_rectangle",
  ];

  // console.log("Hey");

  medias.forEach((media) => {
    const randomClass =
      randomClasses[Math.floor(Math.random() * randomClasses.length)];
    media.classList.add(randomClass);

    gsap.set(media, {
      x: (Math.random() - 0.5) * 0.16 * W,
      y: (Math.random() - 0.5) * 0.1 * W,
    });
  });

  // Réduit la distance pour que l'arrivée soit plus tôt
  const distance = (container.clientWidth - document.body.clientWidth) * 1;
  const scrollTween = gsap.to(container, {
    x: -distance, // Translation along the x-axis
    ease: "none", // Linear movement
    scrollTrigger: {
      trigger: container.parentNode, // We listen to the position of the parent
      pin: true, // We pin the parent
      scrub: true, // Progresses with the scroll
      end: "+=" + distance, // We unpin the parent at the end of the animation
    },
  });

  medias.forEach((media) => {
    gsap.from(media, {
      rotation: (Math.random() - 0.5) * 80, // Between -40 and 40
      yPercent: (Math.random() - 0.5) * 300, // Between -150 and 150
      xPercent: Math.random() * 400, // Between 0 and 400
      ease: "power1.out",
      scrollTrigger: {
        trigger: media,
        containerAnimation: scrollTween, // Contains the translation tween
        start: "left 110%", // Starts when its left edge is at 110% of the viewport
        end: "left 65%", // Ends when its left edge is at 65% of the viewport
        scrub: true, // Progresses with the scroll
      },
    });

    gsap.fromTo(
      media,
      {
        // Starts with the image unmodified
        rotation: 0,
        yPercent: 0,
        xPercent: 0,
      },
      {
        rotation: (Math.random() - 0.5) * 80, // Between -40 and 40
        yPercent: (Math.random() - 0.5) * 300, // Between -150 and 150
        xPercent: -Math.random() * 400, // Between 0 and -400
        ease: "power1.in",
        scrollTrigger: {
          trigger: media,
          containerAnimation: scrollTween, // Contains the translation tween
          start: "right 35%", // Starts when its right edge is at 35% of the viewport
          end: "right -10%", // Ends when its right edge is at -10% of the viewport
          scrub: true, // Progresses with the scroll
        },
      }
    );
  });
};
