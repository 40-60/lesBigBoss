document.addEventListener("DOMContentLoaded", () => {
  // --- Appliquer les classes _2 sur certains articles ---
  function applyArticleClasses() {
    // Nettoyer les anciennes classes
    document
      .querySelectorAll(".article_img._2, .article_item._2")
      .forEach((el) => el.classList.remove("_2"));

    const width = window.innerWidth;

    const imgs = document.querySelectorAll(".article_img");
    const items = document.querySelectorAll(".article_item");

    if (width <= 478) {
      // --- Mobile : toutes les images ont _2, aucun bloc
      imgs.forEach((img) => img.classList.add("_2"));
    } else if (width <= 767) {
      // --- Mobile landscape : 2 par ligne avec inversion toutes les 2 lignes
      const itemsPerRow = 2;
      imgs.forEach((img, i) => {
        const groupIndex = Math.floor(i / itemsPerRow);
        const positionInGroup = (i % itemsPerRow) + 1;
        const isReversed = groupIndex % 2 === 1;

        if (
          (!isReversed && positionInGroup === 2) ||
          (isReversed && positionInGroup === 1)
        ) {
          img.classList.add("_2");
        }
      });

      items.forEach((el, i) => {
        const groupIndex = Math.floor(i / itemsPerRow);
        if (groupIndex % 2 === 1) {
          el.classList.add("_2");
        }
      });
    } else {
      // --- Tablette & Desktop : 3 par ligne, 1 sur 2 pour les images, blocs spécifiques
      imgs.forEach((img, i) => {
        if (i % 2 === 1) {
          img.classList.add("_2");
        }
      });

      // Blocs _2 de 4 à 6, 10 à 12, etc. (index 3–5, 9–11, etc.)
      items.forEach((el, i) => {
        const groupIndex = Math.floor(i / 6);
        const positionInGroup = i % 6;
        if (positionInGroup >= 3 && positionInGroup <= 5) {
          el.classList.add("_2");
        }
      });
    }
  }

  applyArticleClasses();
  window.addEventListener("resize", applyArticleClasses);
});
