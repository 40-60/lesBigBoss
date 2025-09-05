const path = require("path");
const fs = require("fs");

// Fonction pour scanner récursivement le dossier src
function getEntryPoints(dir, baseDir = dir) {
  const entries = {};

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Récursion pour les sous-dossiers
      Object.assign(entries, getEntryPoints(fullPath, baseDir));
    } else if (file.endsWith(".js")) {
      // Créer le nom d'entrée basé sur le chemin relatif
      const relativePath = path.relative(baseDir, fullPath);
      const entryName = relativePath.replace(/\\/g, "/").replace(/\.js$/, "");

      entries[entryName] = fullPath;
    }
  });

  return entries;
}

// Générer automatiquement tous les points d'entrée
const srcPath = path.resolve(__dirname, "src");
const entries = getEntryPoints(srcPath);

module.exports = {
  mode: "production",
  entry: entries,
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
