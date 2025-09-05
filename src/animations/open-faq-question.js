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

      // Ferme toutes les réponses, désactive toutes les icônes et réduit les .faq_dot_wrapper
      faqAnswers.forEach((el) => {
        el.classList.remove("is-active");
        el.style.height = "0px";
      });
      document.querySelectorAll(".icon-btn-wrapper.is-active").forEach((ic) => {
        ic.classList.remove("is-active");
      });
      document.querySelectorAll(".faq_dot_wrapper").forEach((dot) => {
        dot.style.width = "0";
      });

      // Si la réponse n'était pas ouverte, on l'ouvre, on active l'icône et on élargit le .faq_dot_wrapper
      if (!isOpen) {
        answer.classList.add("is-active");
        answer.style.height = `${answer.scrollHeight}px`;
        if (icon) icon.classList.add("is-active");
        const dot = question.querySelector(".faq_dot_wrapper");
        if (dot) dot.style.width = "auto";
      }
    });
  });
};
