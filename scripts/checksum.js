const path = require("path");
const fs = require("fs");

const { createHash } = require("crypto");

const IGNORED_FILES = ["LICENSE", "README.md", "scripts", ".git", "dist", ".gitignore"];

const hash = createHash("sha256");
const files = fs.readdirSync(path.join(__dirname, ".."));

function generateHash() {
  files.forEach((file) => {
    if (IGNORED_FILES.includes(file)) {
      return;
    }

    const fullPath = path.join(__dirname, "..", file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      const dirFiles = fs.readdirSync(fullPath);
      dirFiles.forEach((dirFile) => {
        hash.update(fs.readFileSync(path.join(fullPath, dirFile)));
      });
    } else {
        hash.update(fullPath);
    }
  });

  return hash.digest("hex");
}

module.exports = {generateHash};