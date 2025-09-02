const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["global"]: "./src/global.js",

    // Pages
    ["pages/accueil"]: "./src/pages/accueil.js",
    ["pages/pourquoi-participer/all"]: "./src/pages/pourquoi-participer/all.js",
    ["pages/devenez-participant/c-level"]:
      "./src/pages/devenez-participant/c-level.js",
    ["pages/a-propos/notre-equipe"]: "./src/pages/a-propos/notre-equipe.js",
    ["pages/a-propos/qui-sommes-nous"]:
      "./src/pages/a-propos/qui-sommes-nous.js",
    ["pages/test-page"]: "./src/test-page.js",
    ["pages/agenda"]: "./src/pages/agenda.js",
    ["pages/contact"]: "./src/pages/contact.js",
    ["pages/event-details"]: "./src/pages/event-details.js",
    ["pages/events/home"]: "./src/pages/events/home.js",
    ["pages/events/programme"]: "./src/pages/events/programme.js",
    ["pages/events/participant"]: "./src/pages/events/participant.js",
    ["pages/blog"]: "./src/pages/blog.js",
    ["pages/blog-detail"]: "./src/pages/blog-detail.js",
    ["pages/faq"]: "./src/pages/faq.js",

    // Animations
    ["animations/accordion-steps"]: "./src/animations/accordion-steps.js",
    ["animations/auto-slider"]: "./src/animations/auto-slider.js",
    ["animations/custom-cursor"]: "./src/animations/custom-cursor.js",
    ["animations/dots-section"]: "./src/animations/dots-section.js",
    ["animations/images-parallax"]: "./src/animations/images-parallax.js",
    ["animations/keyspeakers-reveal"]: "./src/animations/keyspeakers-reveal.js",
    ["animations/line-highlight"]: "./src/animations/line-highlight.js",
    ["animations/ordered-steps"]: "./src/animations/ordered-steps.js",
    ["animations/steps-reveal"]: "./src/animations/steps-reveal.js",
    ["animations/program"]: "./src/animations/program.js",
    ["animations/open-faq-question"]: "./src/animations/open-faq-question.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    clean: true,
  },
};
