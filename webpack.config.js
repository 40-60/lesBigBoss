const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["global"]: "./src/pages/global.js",
    ["accueil"]: "./src/pages/accueil.js",
    ["pourquoi-participer/business"]:
      "./src/pages/pourquoi-participer/business.js",
    ["devenez-participant/c-level"]:
      "./src/pages/devenez-participant/c-level.js",
    ["a-propos/notre-equipe"]: "./src/pages/a-propos/notre-equipe.js",
    ["a-propos/qui-sommes-nous"]: "./src/pages/a-propos/qui-sommes-nous.js",
    ["test-page"]: "./src/test-page.js",
    ["agenda"]: "./src/pages/agenda.js",
    ["contact"]: "./src/pages/contact.js",
    ["event-details"]: "./src/pages/event-details.js",
    ["events/home"]: "./src/pages/events/home.js",
    ["events/programme"]: "./src/pages/events/programme.js",
    ["events/participant"]: "./src/pages/events/participant.js",
    ["blog"]: "./src/pages/blog.js",
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
