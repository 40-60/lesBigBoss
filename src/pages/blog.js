require("../animations/custom-cursor.js")();

const paginationBtns = document.querySelectorAll("[pagination-btn]");
const pageBtn = document.querySelector("#pagination");

function applyArticleClasses() {
  // Nettoyer les anciennes classes
  document
    .querySelectorAll(".article_img._2, .article_item._2")
    .forEach((el) => el.classList.remove("_2"));

  const width = window.innerWidth;
  const imgs = document.querySelectorAll(".article_img");
  const items = document.querySelectorAll(".article_item");
  const totalItems = items.length;

  if (width <= 478) {
    // --- Mobile : pas de classe _2 sur les images
    imgs.forEach((img) => img.classList.remove("_2"));
  } else if (width <= 991) {
    // --- Mobile paysage : 2 par ligne avec inversion
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
      const isLast = i === totalItems - 1;
      const excludeLastIfOdd = isLast && totalItems % 2 === 1;

      if (groupIndex % 2 === 1 && !excludeLastIfOdd) {
        el.classList.add("_2");
      }
    });
  } else {
    // --- Desktop : 3 par ligne
    imgs.forEach((img, i) => {
      if (i % 2 === 1) {
        img.classList.add("_2");
      }
    });

    items.forEach((el, i) => {
      const groupIndex = Math.floor(i / 6);
      const positionInGroup = i % 6;
      const isLast = i === totalItems - 1;

      // Conditions d'exclusion
      const excludeLastIf3nPlus1 =
        width > 991 && isLast && (totalItems - 1) % 3 === 0;

      if (
        !excludeLastIf3nPlus1 &&
        positionInGroup >= 3 &&
        positionInGroup <= 5
      ) {
        el.classList.add("_2");
      }
    });
  }
}

applyArticleClasses();
window.addEventListener("resize", applyArticleClasses);

pageBtn.addEventListener("click", () => {
  console.log("Pagination button clicked");
  setTimeout(() => {
    applyArticleClasses();
  }, 400);
});
