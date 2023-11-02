const path = require("path");
const fs = require("fs");

const {generateHash} = require("./checksum.js");

const distPath = path.join(__dirname, "..", "dist");
const distPackPath = path.join(distPath, "bundle");

console.log("preparing dist folder...");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

if (!fs.existsSync(distPackPath)) {
  fs.mkdirSync(distPackPath);
}

console.log("generating checksum...");
const hash = generateHash();
fs.writeFileSync(path.join(distPath, "checksum.sha256"), hash);

console.log("copying files...");
fs.copyFileSync(path.join(__dirname, "..", "Meta.json"), path.join(distPackPath, "Meta.json"));

fs.readdirSync(path.join(__dirname, "..")).forEach((file) => {
    const isDir = fs.lstatSync(path.join(__dirname, "..", file)).isDirectory();
    if (isDir && file !== "dist" && file !== "scripts") {
        fs.cpSync(path.join(__dirname, "..", file), path.join(distPackPath, file), {recursive: true});
    }
});

console.log("done!");