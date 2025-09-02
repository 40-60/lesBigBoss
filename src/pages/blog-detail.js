require("../animations/custom-cursor.js")();

const pageUrl = encodeURIComponent(window.location.href);

const facebook = document.getElementById("facebook");
if (facebook) {
  facebook.setAttribute(
    "href",
    `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
  );
  facebook.setAttribute("target", "_blank");
}

const twitter = document.getElementById("twitter");
if (twitter) {
  twitter.setAttribute(
    "href",
    `https://twitter.com/intent/tweet?url=${pageUrl}`
  );
  twitter.setAttribute("target", "_blank");
}

const linkedin = document.getElementById("linkedin");
if (linkedin) {
  linkedin.setAttribute(
    "href",
    `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
  );
  linkedin.setAttribute("target", "_blank");
}

const link = document.getElementById("link");
if (link) {
  link.addEventListener("click", async (e) => {
    e.preventDefault(); // prevent default link behavior
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers !");
    } catch (err) {
      alert("Échec de la copie du lien");
    }
  });
}
