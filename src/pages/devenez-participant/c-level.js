require("../../animations/custom-cursor.js")();
require("../../animations/line-highlight.js")();
require("../../animations/steps-reveal.js")();
require("../../animations/accordion-steps.js")();

$(".slider-component").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: 750,
    loop: true,
    autoHeight: false,
    centeredSlides: false,
    followFinger: true,
    freeMode: false,
    slidesPerView: "auto",
    // autoplay: {
    //   delay: 1500,
    //   disableOnInteraction: false,
    // },
    disableOnInteraction: false,
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: "auto",
      },
      // tablet
      768: {
        slidesPerView: "auto",
      },
      // desktop
      992: {
        slidesPerView: "auto",
      },
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true,
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
    scrollbar: {
      el: $(this).find(".swiper-drag-wrapper")[0],
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true,
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active",
  });
  //

  swiper.on("activeIndexChange", function (e) {
    let cardLabel = $(e.slides[e.activeIndex]).attr("CardLabel");
    let cardColor = $(e.slides[e.activeIndex]).attr("CardColor");
    $(".active-card-label").text(cardLabel);
    $(".active-card-label").css("color", cardColor);
  });
});
