const fs = require('fs');
const path = require('path');

const map = {
  "adi-kailash-om-parvat-6n7d.html": "adi-kailash-om-parvat-6n7d",
  "auli-chopta-4n5d.html": "auli-chopta-4n5d",
  "auli-ski-resort-2n3d.html": "auli-ski-resort-2n3d",
  "chopta-tungnath-2n3d.html": "chopta-tungnath-2n3d",
  "kartik-swami-triyuginarayan-dhari-devi-4n5d.html": "kartik-swami-triyuginarayan-4n5d",
  "nainital-almora-kausani-5n6d.html": "nainital-almora-kausani-5n6d",
  "rishikesh-mussoorie-2n3d.html": "rishikesh-mussoorie-2n3d",
  "rishikesh-mussoorie-kanatal-dhanaulti-5n6d.html": "rishikesh-mussoorie-kanatal-5n6d",
  "triyuginarayan-wedding-2n3d.html": "triyuginarayan-wedding"
};

const dirs = ["packages", "jaimaa-travels/packages"];

dirs.forEach(dir => {
  for (const [file, pkgId] of Object.entries(map)) {
    const fullPath = path.join(__dirname, "..", dir, file);
    if (!fs.existsSync(fullPath)) continue;
    let content = fs.readFileSync(fullPath, "utf8");
    if (content.includes('<section class="package-gallery-grid">')) {
      content = content.replace('<section class="package-gallery-grid">', `<section class="package-gallery-grid" data-pkg-id="${pkgId}">`);
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`Updated ${fullPath} with data-pkg-id="${pkgId}"`);
    }
  }
});
