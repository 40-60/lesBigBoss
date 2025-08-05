module.exports = function openFaqQuestion() {
  const faqQuestions = document.querySelectorAll("[faq-question]");
  const faqAnswers = document.querySelectorAll(".faq_answer");

  // Initial state: toutes les réponses sont cachées et transition appliquée
  faqAnswers.forEach((answer) => {
    answer.classList.remove("is-active");
    setTimeout(() => {
      answer.style.transition = "height 0.4s ease-in-out";
    }, 400);
  });

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".icon-btn-wrapper");
      const isOpen = answer.classList.contains("is-active");

      // Ferme toutes les réponses et désactive toutes les icônes
      faqAnswers.forEach((el) => {
        el.classList.remove("is-active");
        el.style.height = "0px";
      });
      document.querySelectorAll(".icon-btn-wrapper.is-active").forEach((ic) => {
        ic.classList.remove("is-active");
      });

      // Si la réponse n'était pas ouverte, on l'ouvre et on active l'icône
      if (!isOpen) {
        answer.classList.add("is-active");
        answer.style.height = `${answer.scrollHeight}px`;
        if (icon) icon.classList.add("is-active");
      }
    });
  });
};
