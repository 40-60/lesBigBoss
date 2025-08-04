module.exports = function openFaqQuestion() {
  const faqQuestions = document.querySelectorAll("[faq-question]");
  const faqAnswers = document.querySelectorAll(".faq_answer");

  faqAnswers.forEach((answer) => {
    answer.classList.remove("is-active");
  });

  //   faqQuestions.forEach((question) => {
  //     question.addEventListener("click", () => {
  //       console.log("Question clicked:", question);

  //       // Remove 'is-active' from all answers
  //       document.querySelectorAll(".faq_answer.is-active").forEach((el) => {
  //         el.classList.remove("is-active");
  //       });
  //       // Add 'is-active' to the answer sibling of the clicked question
  //       const answer = question.querySelector(".faq_answer");
  //       if (answer) {
  //         answer.classList.add("is-active");
  //       }
  //     });
  //   });
};
