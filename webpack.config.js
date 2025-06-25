const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["global"]: "./src/global.js",
    ["accueil"]: "./src/accueil.js",
    ["pourquoi-participer/business"]: "./src/pourquoi-participer/business.js",
    ["test-page"]: "./src/test-page.js",
    ["contact"]: "./src/contact.js",
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
