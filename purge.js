// purge.js
const fs = require("fs");
const path = require("path");

// Configuration
const REPO_OWNER = "40-60";
const REPO_NAME = "lesBigBoss";
const DIST_BASE_URL = `https://purge.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}/dist/`;
const SRC_BASE_URL = `https://purge.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}/src/`;

// Helper function to get all files from a directory recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Skip .DS_Store and other hidden files
      if (!file.startsWith(".")) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Helper function to make HTTP request without external dependencies
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const https = require("https");
    const http = require("http");

    const client = url.startsWith("https:") ? https : http;

    const req = client.request(url, (res) => {
      resolve({
        status: res.statusCode,
        statusText: res.statusMessage,
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

// Main purge function for dist files
async function purgeFiles(patterns = []) {
  const distPath = path.join(__dirname, "dist");

  if (!fs.existsSync(distPath)) {
    console.error("❌ dist folder not found. Make sure to build the project first.");
    return;
  }

  let filesToPurge = [];

  if (patterns.length === 0) {
    // If no patterns specified, purge all files in dist
    console.log("🔍 Scanning all files in dist folder...");
    filesToPurge = getAllFiles(distPath);
  } else {
    // Purge specific patterns
    patterns.forEach((pattern) => {
      const fullPattern = path.join(distPath, pattern);
      if (fs.existsSync(fullPattern)) {
        if (fs.statSync(fullPattern).isDirectory()) {
          filesToPurge = filesToPurge.concat(getAllFiles(fullPattern));
        } else {
          filesToPurge.push(fullPattern);
        }
      } else {
        console.warn(`⚠️  Pattern not found: ${pattern}`);
      }
    });
  }

  // Convert absolute paths to relative paths from dist
  const relativePaths = filesToPurge.map((file) => path.relative(distPath, file).replace(/\\/g, "/"));

  console.log(`🚀 Starting purge for ${relativePaths.length} files...`);
  console.log(`📍 Base URL: ${DIST_BASE_URL}`);
  console.log("");

  let successCount = 0;
  let errorCount = 0;

  for (const relativePath of relativePaths) {
    const url = DIST_BASE_URL + relativePath;
    try {
      const res = await makeRequest(url);
      if (res.status === 200) {
        console.log(`✅ ${relativePath}: ${res.status} ${res.statusText}`);
        successCount++;
      } else {
        console.log(`⚠️  ${relativePath}: ${res.status} ${res.statusText}`);
        errorCount++;
      }
    } catch (err) {
      console.error(`❌ ${relativePath}: ERROR`, err.message);
      errorCount++;
    }

    // Add small delay to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("");
  console.log(`📊 Summary: ${successCount} successful, ${errorCount} errors`);
}

// Main purge function for src files
async function purgeSrcFiles(patterns = []) {
  const srcPath = path.join(__dirname, "src");

  if (!fs.existsSync(srcPath)) {
    console.error("❌ src folder not found.");
    return;
  }

  let filesToPurge = [];

  if (patterns.length === 0) {
    // If no patterns specified, purge all files in src
    console.log("🔍 Scanning all files in src folder...");
    filesToPurge = getAllFiles(srcPath);
  } else {
    // Purge specific patterns
    patterns.forEach((pattern) => {
      const fullPattern = path.join(srcPath, pattern);
      if (fs.existsSync(fullPattern)) {
        if (fs.statSync(fullPattern).isDirectory()) {
          filesToPurge = filesToPurge.concat(getAllFiles(fullPattern));
        } else {
          filesToPurge.push(fullPattern);
        }
      } else {
        console.warn(`⚠️  Pattern not found: ${pattern}`);
      }
    });
  }

  // Convert absolute paths to relative paths from src
  const relativePaths = filesToPurge.map((file) => path.relative(srcPath, file).replace(/\\/g, "/"));

  console.log(`🚀 Starting src purge for ${relativePaths.length} files...`);
  console.log(`📍 Base URL: ${SRC_BASE_URL}`);
  console.log("");

  let successCount = 0;
  let errorCount = 0;

  for (const relativePath of relativePaths) {
    const url = SRC_BASE_URL + relativePath;
    try {
      const res = await makeRequest(url);
      if (res.status === 200) {
        console.log(`✅ ${relativePath}: ${res.status} ${res.statusText}`);
        successCount++;
      } else {
        console.log(`⚠️  ${relativePath}: ${res.status} ${res.statusText}`);
        errorCount++;
      }
    } catch (err) {
      console.error(`❌ ${relativePath}: ERROR`, err.message);
      errorCount++;
    }

    // Add small delay to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("");
  console.log(`📊 Src Summary: ${successCount} successful, ${errorCount} errors`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("🧹 Purging all files in dist folder...");
  purgeFiles();
} else if (args[0] === "--src") {
  // Handle src purge
  const srcPatterns = args.slice(1);
  if (srcPatterns.length === 0) {
    console.log("🧹 Purging all files in src folder...");
    purgeSrcFiles();
  } else {
    console.log(`🎯 Purging src patterns: ${srcPatterns.join(", ")}`);
    purgeSrcFiles(srcPatterns);
  }
} else {
  console.log(`🎯 Purging dist patterns: ${args.join(", ")}`);
  purgeFiles(args);
}

// Export for use as module
module.exports = { purgeFiles, purgeSrcFiles };
