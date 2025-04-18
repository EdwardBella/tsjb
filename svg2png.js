const svg2png = require("svg2png");
const fs = require("fs");

const files = fs.readdirSync("./src/assets/images/file");

files
  .filter((filename) => filename.indexOf(".svg") > -1)
  .forEach((filename) => {
    const file = fs.readFileSync(`./src/assets/images/file/${filename}`);
    console.log(svg2png(file));
    svg2png(file).then((buffer) => {
      fs.writeFileSync(`./src/assets/images/file/${filename.replace(".svg", ".png")}`, buffer);
    });
  });
