const fs = require('fs');
const path = require('path');

const existingMap = {
  "auli-chopta-4n5d.html": {
    id: "auli-chopta-4n5d",
    name: "Auli + Chopta Tungnath Chandrashila Trek",
    hero: "../images/packages/auli-chopta-main.jpg"
  },
  "nainital-almora-kausani-5n6d.html": {
    id: "nainital-almora-kausani-5n6d",
    name: "Nainital + Almora + Kausani Himalayan Vista",
    hero: "../images/packages/nainital-kausani-main.jpg"
  },
  "rishikesh-mussoorie-kanatal-dhanaulti-5n6d.html": {
    id: "rishikesh-mussoorie-kanatal-5n6d",
    name: "Rishikesh + Mussoorie + Rafting + Kanatal + Dhanaulti",
    hero: "../images/packages/rishikesh-mussoorie-kanatal.jpg"
  },
  "rishikesh-mussoorie-2n3d.html": {
    id: "rishikesh-mussoorie-2n3d",
    name: "Rishikesh + Mussoorie Queen of Hills Escapade",
    hero: "../images/packages/rishikesh-mussoorie-main.jpg"
  },
  "adi-kailash-om-parvat-6n7d.html": {
    id: "adi-kailash-om-parvat-6n7d",
    name: "Adi Kailash + Om Parvat Sacred Frontier Expedition",
    hero: "../images/packages/adi-kailash-om-parvat.jpg"
  },
  "kartik-swami-triyuginarayan-dhari-devi-4n5d.html": {
    id: "kartik-swami-triyuginarayan-4n5d",
    name: "Kartik Swami + Triyuginarayan + Dhari Devi Circuit",
    hero: "../images/packages/kartik-swami-dhari-devi.jpg"
  },
  "chopta-tungnath-2n3d.html": {
    id: "chopta-tungnath-2n3d",
    name: "Chopta Tungnath Deoriatal Mini Switzerland",
    hero: "../images/packages/chopta-tungnath-main.jpg"
  },
  "auli-ski-resort-2n3d.html": {
    id: "auli-ski-resort-2n3d",
    name: "Auli Ski Resort & Cable Car Himalayan Wonderland",
    hero: "../images/packages/auli-ski-resort.jpg"
  },
  "triyuginarayan-wedding-2n3d.html": {
    id: "triyuginarayan-wedding",
    name: "Triyuginarayan Temple Destination Wedding",
    hero: "../images/wedding/mandap.jpg"
  }
};

const dirs = ["packages", "jaimaa-travels/packages"];

dirs.forEach(dir => {
  for (const [file, info] of Object.entries(existingMap)) {
    const fullPath = path.join(__dirname, "..", dir, file);
    if (!fs.existsSync(fullPath)) continue;
    let content = fs.readFileSync(fullPath, "utf8");

    if (content.includes(`data-pkg-id="${info.id}"`)) {
      console.log(`Already has gallery HTML: ${fullPath}`);
      continue;
    }

    const heroImg = info.hero;
    const galleryHtml = `
    <!-- Top 4-Photo Collage Gallery Grid (Image 2 Style) -->
    <section class="package-gallery-grid" data-pkg-id="${info.id}">
      <!-- Slot 1: Large Featured Landscape (Left) -->
      <div class="gallery-item gallery-item-hero" data-gallery-slot="1">
        <img src="${heroImg}" alt="${info.name} Hero View" loading="lazy" onerror="this.src='../images/logo.png'">
      </div>

      <!-- Slot 2: Portrait / Sightseeing (Middle) -->
      <div class="gallery-item gallery-item-portrait" data-gallery-slot="2">
        <div class="gallery-item-placeholder">
          <div class="gallery-placeholder-icon">📷</div>
          <div class="gallery-placeholder-title">Sightseeing & Activity Photo</div>
          <div class="gallery-placeholder-sub">+ Add Photo via Admin (/trilok)</div>
        </div>
      </div>

      <!-- Slot 3: Stay & Hotel / Landscape (Top Right) -->
      <div class="gallery-item gallery-item-top-right" data-gallery-slot="3">
        <div class="gallery-item-placeholder">
          <div class="gallery-placeholder-icon">🏨</div>
          <div class="gallery-placeholder-title">Resort & Scenic Stay</div>
          <div class="gallery-placeholder-sub">+ Add Photo via Admin (/trilok)</div>
        </div>
      </div>

      <!-- Slot 4: Culture / Food / Memory (Bottom Right) -->
      <div class="gallery-item gallery-item-bottom-right" data-gallery-slot="4">
        <div class="gallery-item-placeholder">
          <div class="gallery-placeholder-icon">✨</div>
          <div class="gallery-placeholder-title">Experience & Highlights</div>
          <div class="gallery-placeholder-sub">+ Add Photo via Admin (/trilok)</div>
        </div>
      </div>
    </section>
`;

    // Insert right after </section> of .hero-package
    const heroEndIdx = content.indexOf('</section>');
    if (heroEndIdx !== -1) {
      const insertPos = heroEndIdx + '</section>'.length;
      content = content.slice(0, insertPos) + galleryHtml + content.slice(insertPos);
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`Successfully injected gallery HTML into: ${fullPath}`);
    } else {
      console.warn(`Could not find </section> in: ${fullPath}`);
    }
  }
});
