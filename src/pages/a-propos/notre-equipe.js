require("../../animations/custom-cursor.js")();

// Au chargement de la page, récupère le 1er élément .team_item et met à jour les éléments actifs
const allTeamItems = document.querySelectorAll(".team_item");
const teamLayout = document.querySelector(".team_layout");

const setActiveProfile = (item) => {
  const name = item.querySelector("[member-name]");
  const job = item.querySelector("[member-job]");
  const linkedin = item.querySelector("[member-linkedin]");
  const img = item.querySelector("[member-img]");
  // const activeDetails = document.querySelector("[active-member-details]");
  const activeName = document.querySelector("[active-member-name]");
  const activeJob = document.querySelector("[active-member-job]");
  const activeLinkedin = document.querySelector("[active-member-linkedin]");
  const activeImg = document.querySelector("[active-member-img]");

  // setTimeout(() => {
  activeName.textContent = name.textContent;
  activeJob.textContent = job.textContent;
  activeImg.src = img.src;
  if (linkedin.href.includes("linkedin.com/in/")) {
    activeLinkedin.href = linkedin.href;

    activeLinkedin.classList.remove("hide");
    console.log("LinkedIn URL found for this member:", linkedin.href);
  } else {
    activeLinkedin.classList.add("hide");
  }
  // }, 200);
};

allTeamItems.forEach((item) => {
  item.addEventListener("click", function () {
    const img = item.querySelector("[member-img]");
    const wrapper = document.querySelector("[active-member-img-wrapper]");
    if (!img || !wrapper) return;
    const activeImg = wrapper.querySelector("[active-member-img]");
    if (activeImg && activeImg.src === img.src) return; // Ne rien faire si déjà actif

    const newImg = document.createElement("img");
    newImg.src = img.src;
    newImg.setAttribute("active-member-img", "");
    newImg.className = "fullsize";
    newImg.style.transform = "translateY(0)";
    const oldImg = wrapper.querySelector("[active-member-img]");
    wrapper.appendChild(newImg);
    if (window.gsap) {
      if (oldImg) {
        window.gsap.to(oldImg, {
          y: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
          clearProps: "transform",
          onComplete: function () {
            wrapper.removeChild(oldImg);
          },
        });
      }
      window.gsap.to(newImg, {
        y: "-=100%",
        duration: 0.6,
        ease: "power3.inOut",
        clearProps: "transform",
        onComplete: function () {
          newImg.style.transform = "translateY(0)";
        },
      });
    } else {
      if (oldImg) wrapper.removeChild(oldImg);
      newImg.style.transform = "translateY(0)";
    }
    setActiveProfile(item);
  });
});

function randomizeEmptyDivs() {
  const teamGrid = document.querySelector(".team_grid");
  if (!teamGrid) return;
  // Supprime tous les divs .empty
  teamGrid.querySelectorAll(".empty").forEach((div) => div.remove());
  const items = Array.from(teamGrid.querySelectorAll(".team_item"));
  let i = 0;
  let lastStep = 0;
  while (i < items.length) {
    // Choisit aléatoirement un step différent du précédent (1, 2 ou 3)
    let step;
    do {
      step = Math.floor(Math.random() * 3) + 1;
    } while (step === lastStep);
    lastStep = step;
    i += step;
    if (i < items.length) {
      // Vérifie qu'il n'y a pas déjà un div vide juste avant
      const prev = items[i - 1].nextElementSibling;
      if (!prev || !prev.classList || !prev.classList.contains("empty")) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty";
        teamGrid.insertBefore(emptyDiv, items[i]);
      }
    }
  }
}

// Initial call
randomizeEmptyDivs();
setActiveProfile(document.querySelector(".team_item"));

// Ajoute le reset sur les .filter-radio
document.querySelectorAll(".filter-radio").forEach((radio) => {
  radio.addEventListener("click", () => {
    teamLayout.classList.add("opacity-0");
    setTimeout(() => {
      setActiveProfile();
    }, 300);

    setTimeout(() => {
      randomizeEmptyDivs();
      teamLayout.classList.remove("opacity-0");
    }, 500);
  });
});
