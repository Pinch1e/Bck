const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "src", "admin", "dist");
const destination = path.join(__dirname, "build", "admin");

fs.mkdirSync(destination, { recursive: true });

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(source, destination);

console.log("Admin panel copied to build/admin");
