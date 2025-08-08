require("../../animations/custom-cursor.js")();
require("../../animations/line-highlight.js")();
require("../../animations/ordered-steps.js")();

// -----Animation des textes de Gregory Amar
if (window.innerWidth >= 992) {
  document.querySelectorAll(".about_quote_item").forEach((item) => {
    // Remove is-hover class on load and set min-height to initial height
    const initialHeight = item.offsetHeight;
    item.style.minHeight = initialHeight + "px";
    item.classList.remove("is-hover");

    // Also remove is-hover from child elements
    const img = item.querySelector(".about_quote_img_wrapper");
    const text = item.querySelector(".about_quote_text");
    if (img) img.classList.remove("is-hover");
    if (text) text.classList.remove("is-hover");

    item.addEventListener("mouseenter", () => {
      item.classList.add("is-hover");
      if (img) img.classList.add("is-hover");
      if (text) text.classList.add("is-hover");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("is-hover");
      if (img) img.classList.remove("is-hover");
      if (text) text.classList.remove("is-hover");
    });
  });
}

// -----Animation de la citation
const quote = document.querySelector("#quote");
const text = quote.textContent;
quote.innerHTML = "";

// Découper le texte en mots
text.split(/(\s+)/).forEach((wordOrSpace, wordIdx) => {
  if (/^\s+$/.test(wordOrSpace)) {
    // Si c'est un espace, l'ajouter tel quel
    quote.appendChild(document.createTextNode(wordOrSpace));
  } else {
    // Créer un span pour chaque mot
    const wordSpan = document.createElement("span");
    wordSpan.style.whiteSpace = "nowrap";
    // Pour chaque lettre du mot, créer un span animé
    wordOrSpace.split("").forEach((char, i) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.style.opacity = "0.3";
      charSpan.style.display = "inline-block";
      charSpan.style.transition = "opacity 0.3s";
      wordSpan.appendChild(charSpan);
    });
    quote.appendChild(wordSpan);
  }
});

// Sélectionner tous les spans de lettres
const spans = quote.querySelectorAll("span span");

// Animation GSAP sur chaque lettre
spans.forEach((span, i) => {
  gsap.to(span, {
    opacity: 1,
    scrollTrigger: {
      trigger: quote,
      start: "top 90%",
      end: "bottom 50%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const threshold = i / spans.length;
        span.style.opacity = progress > threshold ? "1" : "0.3";
      },
    },
  });
});
