const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const JAIMAA_PACKAGES_DIR = path.join(__dirname, '..', 'jaimaa-travels', 'packages');

if (!fs.existsSync(PACKAGES_DIR)) fs.mkdirSync(PACKAGES_DIR, { recursive: true });
if (!fs.existsSync(JAIMAA_PACKAGES_DIR)) fs.mkdirSync(JAIMAA_PACKAGES_DIR, { recursive: true });

// Common CSS for Collage Gallery Grid
const GALLERY_CSS = `
    /* Top 4-Photo Collage Gallery Grid (Image 2 Style) */
    .package-gallery-grid {
      display: grid;
      grid-template-columns: 2fr 1.25fr 1fr;
      grid-template-rows: 195px 195px;
      gap: 0.75rem;
      margin: 1.5rem 0 2rem 0;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .gallery-item {
      position: relative;
      background: #F1F5F9;
      border-radius: var(--radius-sm);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-light);
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.35s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.04);
    }
    .gallery-item-hero {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }
    .gallery-item-portrait {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
    .gallery-item-top-right {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }
    .gallery-item-bottom-right {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }
    .gallery-item-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      text-align: center;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px dashed #CBD5E1;
      border-radius: var(--radius-sm);
    }
    .gallery-item-placeholder:hover {
      background: #EFF6FF;
      border-color: #3B82F6;
      color: #1D4ED8;
    }
    .gallery-placeholder-icon {
      font-size: 1.8rem;
      margin-bottom: 0.35rem;
      opacity: 0.75;
    }
    .gallery-placeholder-title {
      font-size: 0.85rem;
      font-weight: 700;
      line-height: 1.3;
    }
    .gallery-placeholder-sub {
      font-size: 0.72rem;
      opacity: 0.85;
      margin-top: 0.2rem;
    }
    @media (max-width: 900px) {
      .package-gallery-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 220px 140px;
      }
      .gallery-item-hero {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
      }
      .gallery-item-portrait {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }
      .gallery-item-top-right {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
      .gallery-item-bottom-right {
        display: none;
      }
    }
    @media (max-width: 600px) {
      .package-gallery-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 230px;
      }
      .gallery-item-portrait, .gallery-item-top-right, .gallery-item-bottom-right {
        display: none;
      }
    }
`;

function generateGalleryHTML(pkgId, heroImg, pkgName) {
  return `
    <!-- Top 4-Photo Collage Gallery Grid (Image 2 Style) -->
    <section class="package-gallery-grid" data-pkg-id="${pkgId}">
      <!-- Slot 1: Large Featured Landscape (Left) -->
      <div class="gallery-item gallery-item-hero" data-gallery-slot="1">
        ${heroImg ? `
          <img src="${heroImg}" alt="${pkgName} Hero View" loading="lazy">
        ` : `
          <div class="gallery-item-placeholder">
            <div class="gallery-placeholder-icon">📸</div>
            <div class="gallery-placeholder-title">Featured Destination View</div>
            <div class="gallery-placeholder-sub">+ Add Photo via Admin (/trilok)</div>
          </div>
        `}
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
}

// 1. DATA FOR 8 NEW PACKAGES
const NEW_PACKAGES = [
  {
    id: "kedarnath-heli-charter",
    filename: "kedarnath-heli-vip-charter-2n3d.html",
    title: "Kedarnath VIP Helicopter Charter & Sugam Darshan",
    subtitle: "Skip the 16km Mountain Trek • Confirmed Round-Trip Helipad Charter & Sugam Darshan",
    badge: "VIP EXPRESS • 2N/3D",
    plan: "✓ MAP Plan",
    rating: "★ 4.9/5 (580+ Yatris Blessed)",
    fleet: "Guaranteed Commercial Helipad Shuttle",
    duration: "2 Nights / 3 Days",
    mealPlan: "MAP (Satvik Breakfast & Dinner)",
    pickupDrop: "Haridwar / Dehradun / Phata Helipad",
    maxElevation: "Kedarnath: 11,755 ft",
    bestSeason: "May to June & Sep to Nov",
    price: 38500,
    origPrice: 45000,
    heroImage: "../images/packages/kedarnath-heli-main.jpg",
    route: "Haridwar / Dehradun • Phata / Sersi Helipad • Kedarnath Temple • Guptkashi",
    highlights: [
      "Confirmed round-trip helicopter charter tickets from Phata, Sersi, or Guptkashi helipads",
      "Sugam Darshan VIP Pass to avoid hours of waiting queues inside the temple sanctum",
      "Sanitized private chauffeur cab for Haridwar/Dehradun to helipad transfers",
      "Deluxe cottage stays in Guptkashi/Phata with pure Satvik Garhwali meals",
      "24x7 Haridwar ops team support & biometric Yatra registration pass clearance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Dehradun to Guptkashi / Phata Valley Drive",
        desc: "Meet our executive driver at Haridwar Railway Station or Dehradun Airport. Embark on a scenic drive along the holy Alaknanda and Mandakini rivers, passing Devprayag Sangam and Rudraprayag. Arrive at Guptkashi/Phata, check into your luxury valley-view cottage, and undergo the mandatory biometric Yatra QR pass check and helicopter briefing.",
        meal: "🍽️ Dinner Included",
        stay: "🏨 Guptkashi Valley Cottage"
      },
      {
        day: 2,
        title: "Helicopter Flight to Holy Kedarnath Temple & VIP Darshan",
        desc: "Early morning transfer to the helipad. Board your scheduled 8-minute scenic chopper ride soaring over deep mountain gorges directly to the Kedarnath helipad (11,755 ft). Walk just 500 meters to the 8th-century stone temple. Perform sacred Rudrabhishek with Sugam Darshan access. Soak in the spiritual vibrations of Kedar Valley surrounded by the snow-capped Kedar Dome. Evening flight back to Phata.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Phata / Guptkashi Resort"
      },
      {
        day: 3,
        title: "Morning Blessings & Scenic Return Drive to Haridwar / Dehradun",
        desc: "After breakfast, enjoy a peaceful morning amidst Himalayan mist. Drive back towards Haridwar/Dehradun, stopping at Dhari Devi Siddhapeeth on the riverbank for darshan. Drop-off at Haridwar Railway Station or Jolly Grant Airport with divine blessings of Baba Kedar.",
        meal: "🍽️ Breakfast Included",
        stay: "🚗 Departure Convoy"
      }
    ]
  },
  {
    id: "ayodhya-varanasi-5d4n",
    filename: "ayodhya-kashi-varanasi-4n5d.html",
    title: "Ayodhya Ram Mandir & Kashi Vishwanath Circuit",
    subtitle: "Divine Yatra to Lord Rama's Birthplace, Triveni Sangam & The Eternal City of Lord Shiva",
    badge: "SPIRITUAL TRAIL • 4N/5D",
    plan: "✓ Pure Satvik MAP Plan",
    rating: "★ 4.95/5 (650+ Yatris Rated)",
    fleet: "AC Sedan / Innova Crysta",
    duration: "4 Nights / 5 Days",
    mealPlan: "MAP (Daily Breakfast & Satvik Dinner)",
    pickupDrop: "Ayodhya Airport / Railway / Varanasi",
    maxElevation: "Gangetic Plains Heritage Circuit",
    bestSeason: "October to April (Ideal Weather)",
    price: 22500,
    origPrice: 28000,
    heroImage: "../images/yatra/ram-mandir.jpg",
    route: "Ayodhya • Prayagraj Sangam • Varanasi Kashi Vishwanath • Sarnath",
    highlights: [
      "VIP Sugam Darshan passes at the grand newly consecrated Shri Ram Janmabhoomi Mandir",
      "Evening Saryu River Maha Aarti & historic Hanumangarhi Temple blessings",
      "Holy dip at Triveni Sangam (Ganga, Yamuna, Saraswati) with private boat in Prayagraj",
      "Kashi Vishwanath Corridor VIP Darshan & hypnotic Dashashwamedh Ghat Ganga Aarti",
      "Morning Subah-e-Banaras sunrise wooden boat ride along historic river ghats"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Holy Ayodhya – Shri Ram Janmabhoomi & Saryu Aarti",
        desc: "Arrive at Ayodhya Maharishi Valmiki International Airport or Ayodhya Dham Railway Station. Welcome by private chauffeur and hotel check-in. In the afternoon, visit the magnificent Ram Mandir for VIP Darshan of Ram Lalla. Evening serene boat ride on the sacred Saryu River and witness the grand Saryu Aarti.",
        meal: "🍽️ Satvik Dinner Included",
        stay: "🏨 4-Star Ayodhya Hotel"
      },
      {
        day: 2,
        title: "Hanumangarhi, Kanak Bhawan & Drive to Prayagraj (Triveni Sangam)",
        desc: "Morning blessings at Hanumangarhi Temple and the gold-adorned Kanak Bhawan. Drive 3.5 hours across the historic Awadh plains to Prayagraj. Check in, and take a private boat to the holy Triveni Sangam for a sacred dip where Ganga, Yamuna, and mythical Saraswati unite. Visit Anand Bhawan and Bade Hanuman Ji (reclining Hanuman temple).",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Prayagraj Heritage Hotel"
      },
      {
        day: 3,
        title: "Prayagraj to Kashi – Dashashwamedh Ghat Grand Ganga Aarti",
        desc: "After breakfast, drive 2.5 hours to Varanasi (Kashi), the world's oldest living city. Check in, rest, and head to Dashashwamedh Ghat at dusk. Experience the world-renowned Ganga Aarti from a reserved riverboat as brass lamps illuminate the holy waters and conch shells reverberate.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Varanasi Riverside Hotel"
      },
      {
        day: 4,
        title: "Kashi Vishwanath VIP Darshan, Kal Bhairav & Sarnath Buddhist Stupa",
        desc: "Early morning VIP Darshan at the sacred Kashi Vishwanath Golden Temple and Annapurna Temple via the newly built corridor. Visit Kal Bhairav (Kotwal of Varanasi). Afternoon excursion to Sarnath where Lord Buddha delivered his first sermon; explore Dhamek Stupa and the Ashoka Pillar museum.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Varanasi Riverside Hotel"
      },
      {
        day: 5,
        title: "Subah-e-Banaras Sunrise Boat Ride & Departure",
        desc: "Witness the magical Subah-e-Banaras sunrise boat ride floating past Manikarnika, Harishchandra, and Assi Ghats. Savor authentic Banarasi Kachori and Malaiyo. Transfer to Varanasi Airport (VNS) or Cantt Railway Station for your return journey.",
        meal: "🍽️ Breakfast Included",
        stay: "✈️ Departure Transfer"
      }
    ]
  },
  {
    id: "kashmir-paradise-6d5n",
    filename: "kashmir-paradise-gulmarg-5n6d.html",
    title: "Kashmir Paradise & Gulmarg Gondola Escapade",
    subtitle: "Dal Lake Shikara, World's Highest Cable Car & Snow Meadows of Pahalgam",
    badge: "PARADISE SPECIAL • 5N/6D",
    plan: "✓ MAP Plan (Bfast + Dinner)",
    rating: "★ 4.98/5 (720+ Travelers)",
    fleet: "Dedicated AC Cab with Local Chauffeur",
    duration: "5 Nights / 6 Days",
    mealPlan: "MAP (Daily Kashmiri Breakfast & Dinner)",
    pickupDrop: "Srinagar International Airport (SXR)",
    maxElevation: "Gulmarg Apharwat: 13,780 ft",
    bestSeason: "Round the Year (Snow: Dec-Mar | Blooms: Apr-Oct)",
    price: 24999,
    origPrice: 31000,
    heroImage: "../images/packages/kashmir.jpg",
    route: "Srinagar • Dal Lake • Gulmarg Gondola • Pahalgam • Sonmarg Glacier",
    highlights: [
      "1-Hour romantic Shikara boat cruise on Dal Lake & stay in a handcrafted luxury cedar houseboat",
      "Gulmarg Gondola Phase-1 cable car ride to Kongdoori mountain ridge (optional Phase-2 Apharwat)",
      "Pahalgam excursion to Betaab Valley, Aru Valley & Chandanwari along the sparkling Lidder River",
      "Full-day scenic excursion to Sonmarg (Meadow of Gold) & Thajiwas Glacier pony trail",
      "Visit royal Mughal Gardens: Shalimar Bagh, Nishat Bagh & Chashme Shahi"
    ],
    itinerary: [
      {
        day: 1,
        title: "Srinagar Airport Arrival – Dal Lake Shikara & Luxury Houseboat",
        desc: "Arrive at Srinagar Sheikh ul-Alam International Airport. Chauffeur reception and transfer to your luxury cedar houseboat docked on Dal Lake or Nigeen Lake. In the evening, enjoy a sunset Shikara ride gliding past floating gardens and lotus wetlands. Relish a warm cup of traditional Kashmiri Kahwa.",
        meal: "🍽️ Dinner Included",
        stay: "🛶 Dal Lake Luxury Houseboat"
      },
      {
        day: 2,
        title: "Srinagar to Meadow of Flowers Gulmarg – Gondola Cable Car",
        desc: "Drive 1.5 hours through weeping willow lanes and pine forests to Gulmarg (8,690 ft). Board the renowned Gulmarg Gondola cable car up to Kongdoori. Enjoy snow sports, ATV rides, and sweeping views of Pir Panjal mountain range. Check in to your alpine resort and stroll across Gulmarg golf course.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Gulmarg Alpine Resort"
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam (Valley of Shepherds) via Saffron Fields",
        desc: "Morning scenic drive to Pahalgam (7,200 ft). Drive past the legendary saffron fields of Pampore and historic Awantipora ruins. In Pahalgam, listen to the roaring turquoise Lidder River. Explore local pine trails, stroll through Pahalgam market, and check into your valley hotel.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Pahalgam Riverside Hotel"
      },
      {
        day: 4,
        title: "Pahalgam Betaab & Aru Valley Tour – Return to Srinagar",
        desc: "Visit picturesque Betaab Valley (named after the Bollywood classic) and Aru Valley. Enjoy pony rides to Baisaran (Mini Switzerland). In the afternoon, drive back to Srinagar and visit the majestic Nishat and Shalimar Mughal Gardens built by Emperor Jahangir.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Srinagar Boutique Hotel"
      },
      {
        day: 5,
        title: "Excursion to Sonmarg Meadow of Gold & Thajiwas Glacier",
        desc: "Day trip to Sonmarg (8,950 ft) along the Sindh River valley surrounded by towering jagged peaks. Take a scenic pony or trek to Thajiwas Glacier where snow remains year-round. Sample fresh river trout or local delicacies before returning to Srinagar.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Srinagar Boutique Hotel"
      },
      {
        day: 6,
        title: "Srinagar Lal Chowk Shopping & Airport Departure",
        desc: "After breakfast, shop for authentic Kashmiri pashmina shawls, saffron, and dry fruits. Chauffeur transfer to Srinagar Airport for your onward journey with unforgettable memories of Jannat-e-Kashmir.",
        meal: "🍽️ Breakfast Included",
        stay: "✈️ Flight Departure"
      }
    ]
  },
  {
    id: "himachal-scenic-6d5n",
    filename: "himachal-shimla-manali-5n6d.html",
    title: "Himachal Scenic Escape: Shimla, Kullu & Manali",
    subtitle: "Colonial Charm of Queen of Hills, Solang Valley Snow & Beas River Vistas",
    badge: "HIMALAYAN CLASSIC • 5N/6D",
    plan: "✓ MAP Plan",
    rating: "★ 4.9/5 (810+ Travelers)",
    fleet: "Private Sedan / SUV with Hill Expert Driver",
    duration: "5 Nights / 6 Days",
    mealPlan: "MAP (Daily Breakfast & Mountain Dinner)",
    pickupDrop: "Delhi Airport / Chandigarh / Kalka",
    maxElevation: "Atal Tunnel / Solang: 10,075 ft",
    bestSeason: "Round the Year (Snow: Dec-Mar | Summer: Apr-Jul)",
    price: 18500,
    origPrice: 24000,
    heroImage: "../images/packages/manali-solang.jpg",
    route: "Delhi / Chandigarh • Shimla • Kufri • Kullu • Manali • Solang • Atal Tunnel",
    highlights: [
      "Stroll along historic colonial Mall Road, Ridge, and Christ Church in Shimla",
      "Panoramic Himalayan viewpoints and amusement rides at Kufri snow slopes",
      "Scenic highway drive along Beas River and visit to Kullu Shawl weaving factories",
      "Old Manali hippie culture, ancient Hadimba Temple & Vashisht sulfur hot springs",
      "Adrenaline-pumping snow activities at Solang Valley and engineering marvel Atal Tunnel"
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi / Chandigarh to Shimla – Colonial Queen of Hills",
        desc: "Pickup from Delhi Airport or Chandigarh Railway Station. Enjoy a winding mountain climb through the Shivalik foothills to Shimla (7,200 ft). Check into your hotel. Evening walk along the famous Ridge, Lakkar Bazaar, and Mall Road.",
        meal: "🍽️ Dinner Included",
        stay: "🏨 Shimla Valley Hotel"
      },
      {
        day: 2,
        title: "Shimla Kufri Snow View, Himalayan Nature Park & Jakhoo Temple",
        desc: "Post breakfast, excursion to Kufri. Enjoy yak rides, visit the Himalayan Wildlife Zoo, and view snow peaks from Mahasu Peak. Later, visit Jakhoo Hill, home to the towering 108-foot Lord Hanuman statue overlooking the town.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Shimla Valley Hotel"
      },
      {
        day: 3,
        title: "Scenic Drive from Shimla to Manali via Pandoh Dam & Kullu",
        desc: "A breathtaking 7-hour drive descending to Mandi and tracing the Beas River up to Kullu Valley. Stop at Pandoh Dam, Hanogi Mata Temple, and authentic Kullu handloom shawl weaving centers. Arrive in Manali (6,725 ft) and check in.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Manali Mountain Resort"
      },
      {
        day: 4,
        title: "Manali Local Sightseeing – Hadimba, Vashisht & Mall Road",
        desc: "Explore the ancient wooden Hadimba Devi Temple nestled inside a cedar forest, the Manu Temple, Tibetan Monasteries, and Vashisht Village with natural hot springs. Evening leisure at Mall Road for cafe hopping.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Manali Mountain Resort"
      },
      {
        day: 5,
        title: "Solang Valley Thrill & Atal Tunnel to Sissu (Lahaul)",
        desc: "Full-day excursion to Solang Valley. Indulge in paragliding, zorbing, and quad biking. Drive through the historic 9.02 km Atal Tunnel to cross into the barren, breathtaking landscape of Sissu in Lahaul Valley and marvel at Sissu Waterfall.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Manali Mountain Resort"
      },
      {
        day: 6,
        title: "Beas River Rafting in Kullu & Drive to Chandigarh / Delhi",
        desc: "Check out after breakfast. Stop for white water river rafting on the Beas River at Kullu before your scenic highway return drive to Chandigarh or Delhi for your onward flight or train.",
        meal: "🍽️ Breakfast Included",
        stay: "🚗 Return Transfer"
      }
    ]
  },
  {
    id: "rajasthan-royal-7d6n",
    filename: "rajasthan-royal-heritage-6n7d.html",
    title: "Royal Rajasthan Heritage & Thar Desert Safari",
    subtitle: "Majestic Forts of Jaipur, Blue City Jodhpur, Golden Sands of Jaisalmer & Udaipur Lakes",
    badge: "ROYAL HERITAGE • 6N/7D",
    plan: "✓ MAP Plan (Royal Feasts)",
    rating: "★ 4.95/5 (620+ Guests)",
    fleet: "Chauffeur Driven AC Sedan / SUV",
    duration: "6 Nights / 7 Days",
    mealPlan: "MAP (Breakfast & Royal Rajasthani Dinner)",
    pickupDrop: "Jaipur Airport (JAI) / Udaipur Airport (UDR)",
    maxElevation: "Aravalli Range & Thar Dunes",
    bestSeason: "September to April",
    price: 26000,
    origPrice: 32500,
    heroImage: "../images/packages/hawa-mahal.webp",
    route: "Jaipur • Jodhpur • Jaisalmer Dunes • Ranakpur • Udaipur",
    highlights: [
      "Ascend Amber Fort on elephant or jeep and admire the honeycomb facade of Hawa Mahal",
      "Marvel at the impenetrable Mehrangarh Fort towering above the blue houses of Jodhpur",
      "Sunset camel safari on Thar Desert sand dunes and night stay in luxury Swiss tents with folk Kalbelia dance",
      "Walk the living golden stone fort of Jaisalmer and intricately carved Patwon Ki Haveli",
      "Sunset boat cruise on Lake Pichola past the floating Lake Palace in Venice of the East Udaipur"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pink City Jaipur Arrival – Amber Fort & Jal Mahal",
        desc: "Welcome to Rajasthan. Chauffeur reception at Jaipur International Airport. Visit the monumental Amber Fort with its sparkling Sheesh Mahal (Mirror Palace). Photo stop at Jal Mahal floating on Man Sagar Lake. Check in and visit Birla Mandir.",
        meal: "🍽️ Royal Dinner Included",
        stay: "🏨 Jaipur Heritage Haveli"
      },
      {
        day: 2,
        title: "City Palace, Jantar Mantar & Drive to Sun City Jodhpur",
        desc: "Morning tour of City Palace museum and the astronomical instruments of Jantar Mantar (UNESCO site). Drive 5 hours across desert highways to the blue city of Jodhpur. Check into your heritage hotel.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Jodhpur Heritage Hotel"
      },
      {
        day: 3,
        title: "Mehrangarh Fort, Jaswant Thada & Drive to Jaisalmer",
        desc: "Tour the colossal Mehrangarh Fort perched on a cliff 400 feet high, with preserved cannons and royal palanquins. Visit the white marble cenotaph Jaswant Thada. Scenic drive across Thar desert sands to Jaisalmer (The Golden City).",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Jaisalmer Desert Resort"
      },
      {
        day: 4,
        title: "Jaisalmer Fort & Thar Desert Camel Safari in Sam Dunes",
        desc: "Explore Jaisalmer Fort (Sonar Qila) where people still reside inside stone ramparts, and ornate merchant havelis. In the afternoon, head to Sam Sand Dunes. Enjoy a camel safari over sweeping dunes, Rajasthani folk dances, and stay in luxury Swiss tents.",
        meal: "🍽️ Breakfast & Desert Camp Feast",
        stay: "⛺ Sam Sand Dunes Swiss Tent"
      },
      {
        day: 5,
        title: "Jaisalmer to Udaipur via 1444-Pillared Ranakpur Temple",
        desc: "Depart desert dunes and drive towards the City of Lakes Udaipur. En route, tour the 15th-century Ranakpur Jain Temple, famous for its 1,444 uniquely carved marble pillars. Arrive in romantic Udaipur and check into your lake resort.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Udaipur Lake-Facing Resort"
      },
      {
        day: 6,
        title: "Udaipur City Palace & Lake Pichola Luxury Boat Cruise",
        desc: "Tour Rajasthan's largest royal palace complex: Udaipur City Palace, Saheliyon Ki Bari fountain gardens, and Jagdish Temple. In the evening, take a private boat cruise on Lake Pichola watching Jag Mandir and Lake Palace glow at sunset.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Udaipur Lake-Facing Resort"
      },
      {
        day: 7,
        title: "Udaipur Old Bazaar Stroll & Airport Departure",
        desc: "Savor a leisurely royal breakfast. Shop for miniature paintings, bandhani sarees, and silver jewelry before transfer to Udaipur Maharana Pratap Airport (UDR) for your onward journey.",
        meal: "🍽️ Breakfast Included",
        stay: "✈️ Flight Departure"
      }
    ]
  },
  {
    id: "nepal-himalayan-6d5n",
    filename: "nepal-himalayan-escapade-5n6d.html",
    title: "Nepal Himalayan Escapade: Kathmandu + Pokhara",
    subtitle: "Pashupatinath Blessings, Phewa Lake Reflections & Majestic Annapurna Sunrise",
    badge: "INTERNATIONAL • 5N/6D",
    plan: "✓ MAP Plan",
    rating: "★ 4.9/5 (540+ Travelers)",
    fleet: "Private AC Cab / Tourist Coach",
    duration: "5 Nights / 6 Days",
    mealPlan: "MAP (Daily Buffet Breakfast & Dinner)",
    pickupDrop: "Kathmandu Tribhuvan Airport (KTM)",
    maxElevation: "Sarangkot Viewpoint: 5,250 ft",
    bestSeason: "September to May",
    price: 27500,
    origPrice: 35000,
    heroImage: "../images/packages/nepal.jpg",
    route: "Kathmandu • Pashupatinath • Pokhara • Phewa Lake • Sarangkot",
    highlights: [
      "VIP Darshan at the sacred UNESCO World Heritage Pashupatinath Temple on Bagmati River",
      "Circumambulate the massive stupas of Boudhanath and ancient hilltop Swayambhunath (Monkey Temple)",
      "Peaceful wooden boat cruise on emerald Phewa Lake with Tal Barahi island temple",
      "Pre-dawn sunrise from Sarangkot overlooking Machapuchare (Fishtail) and Annapurna peaks",
      "Explore roaring Davis Fall, mystical Gupteshwor Mahadev Cave & Tibetan refugee settlement"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu – The Valley of Gods",
        desc: "Welcome to Nepal! Reception at Tribhuvan International Airport (KTM) with a traditional Rudraksha garland. Chauffeur transfer to your hotel. Rest or take a leisurely evening walk through the vibrant cafes and trekking shops of Thamel.",
        meal: "🍽️ Dinner Included",
        stay: "🏨 Kathmandu 4-Star Hotel"
      },
      {
        day: 2,
        title: "Sacred Pashupatinath Temple, Boudhanath & Swayambhunath",
        desc: "Morning VIP Darshan at Pashupatinath Temple, one of the supreme Shiva temples on Earth. Continue to Boudhanath Stupa, center of Tibetan Buddhism. In the afternoon, ascend Swayambhunath for 360-degree vistas of Kathmandu Valley.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Kathmandu 4-Star Hotel"
      },
      {
        day: 3,
        title: "Scenic Mountain Highway to Pokhara – Lake City of Nepal",
        desc: "Drive 6 hours along the Trishuli River highway (optional river rafting stop) or 25-minute scenic flight to Pokhara (2,700 ft). Arrive at Pokhara and check into your lakeside resort. Evening relaxing boat ride on Phewa Lake.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Pokhara Lakeside Resort"
      },
      {
        day: 4,
        title: "Sarangkot Annapurna Sunrise, Davis Falls & Gupteshwor Cave",
        desc: "Early morning drive to Sarangkot to witness the breathtaking golden sunrise over Mount Dhaulagiri, Annapurna I-IV, and Machapuchare. Return for breakfast, then tour Davis Fall, the subterranean Gupteshwor Cave, and the Peace Pagoda.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Pokhara Lakeside Resort"
      },
      {
        day: 5,
        title: "Pokhara to Kathmandu – Durbar Square & Souvenir Shopping",
        desc: "Scenic journey back to Kathmandu. Visit Kathmandu Durbar Square or Patan Durbar Square to admire Newari pagoda architecture, ancient stone statues, and royal courtyards. Shop for authentic singing bowls and thangka paintings.",
        meal: "🍽️ Breakfast & Dinner",
        stay: "🏨 Kathmandu 4-Star Hotel"
      },
      {
        day: 6,
        title: "Farewell Nepal & Flight Departure",
        desc: "Relish your final Himalayan breakfast with mountain views. Chauffeur transfer to Kathmandu Tribhuvan International Airport for your flight back home with fond memories.",
        meal: "🍽️ Breakfast Included",
        stay: "✈️ Airport Transfer"
      }
    ]
  },
  {
    id: "dubai-luxury-5d4n",
    filename: "dubai-luxury-extravaganza-4n5d.html",
    title: "Dubai Luxury Extravaganza with Desert Safari",
    subtitle: "Burj Khalifa 124th Floor, Red Dunes 4x4 Safari, Marina Cruise & Abu Dhabi Grand Mosque",
    badge: "INTERNATIONAL GLAMOUR • 4N/5D",
    plan: "✓ Breakfast + Desert Camp BBQ",
    rating: "★ 4.95/5 (920+ Travelers)",
    fleet: "Luxury AC Van & 4x4 Land Cruiser Convoy",
    duration: "4 Nights / 5 Days",
    mealPlan: "Daily 4-Star Buffet Breakfast + Grand Desert BBQ Feast",
    pickupDrop: "Dubai International Airport (DXB)",
    maxElevation: "Burj Khalifa: 1,821 ft (Level 124)",
    bestSeason: "October to April",
    price: 42000,
    origPrice: 52000,
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    route: "Dubai DXB • Downtown Dubai • Marina • Red Dunes • Abu Dhabi",
    highlights: [
      "Access to Burj Khalifa 124th & 125th floor observation decks with high-speed double-decker elevator",
      "Thrill-packed 4x4 Land Cruiser desert dune bashing on red sands, sandboarding & camel riding",
      "BBQ dinner buffet with live Tanoura dance, fire show & belly dance under Arabian stars",
      "Marina Dhow cruise with 5-star international dinner buffet and panoramic skyscraper views",
      "Full-day Abu Dhabi excursion: magnificent Sheikh Zayed Grand Mosque & BAPS Hindu Mandir"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai – Marina Luxury Dhow Cruise with Dinner",
        desc: "Arrive at Dubai International Airport (DXB). Meet our executive representative and transfer to your 4-star downtown hotel. In the evening, board a traditional Arabian wooden Dhow at Dubai Marina. Enjoy an international buffet dinner while cruising past illuminated illuminated glass skyscrapers and luxury yachts.",
        meal: "🍽️ Buffet Dinner on Cruise",
        stay: "🏨 4-Star Downtown Hotel"
      },
      {
        day: 2,
        title: "Dubai City Tour, Burj Khalifa 124th Floor & Dubai Mall Fountains",
        desc: "Morning panoramic city tour covering Dubai Frame, Zabeel Palace, Jumeirah Beach with Burj Al Arab photo stop. In the afternoon, explore the massive Dubai Mall and ascend to the 124th & 125th floors of the Burj Khalifa for 360-degree skyline views. Witness the dancing Dubai Fountain show.",
        meal: "🍽️ Breakfast Included",
        stay: "🏨 4-Star Downtown Hotel"
      },
      {
        day: 3,
        title: "Morning Souk Leisure & Thrilling Red Dunes 4x4 Safari with BBQ",
        desc: "Morning visit to Dubai Gold & Spice Souks across Dubai Creek on an authentic Abra boat. At 3 PM, luxury 4x4 Land Cruisers pick you up for heart-thumping dune bashing in the Lahbab desert. Enjoy sunset photography, sandboarding, camel rides, shisha, and a lavish BBQ dinner with live entertainment.",
        meal: "🍽️ Breakfast & Desert BBQ Dinner",
        stay: "🏨 4-Star Downtown Hotel"
      },
      {
        day: 4,
        title: "Full-Day Abu Dhabi Tour: Sheikh Zayed Mosque & BAPS Mandir",
        desc: "Full-day tour to UAE's capital Abu Dhabi. Visit the awe-inspiring Sheikh Zayed Grand Mosque with pure white Macedonian marble and the world's largest hand-knotted carpet. Tour the architectural marvel BAPS Hindu Mandir, Corniche drive, and Ferrari World photo stop.",
        meal: "🍽️ Breakfast Included",
        stay: "🏨 4-Star Downtown Hotel"
      },
      {
        day: 5,
        title: "Morning Duty Free Shopping & Airport Departure",
        desc: "Savor a leisurely buffet breakfast. Last-minute luxury shopping at Mall of the Emirates or Dubai Mall. Private luxury transfer to Dubai International Airport for your flight back home.",
        meal: "🍽️ Breakfast Included",
        stay: "✈️ Flight Departure"
      }
    ]
  },
  {
    id: "chardham-yatra-2026",
    filename: "chardham-yatra-9n10d.html",
    title: "Maha Char Dham Yatra 2026 (All 4 Sacred Dhams)",
    subtitle: "Complete Sanctified Pilgrimage to Yamunotri, Gangotri, Kedarnath & Badrinath",
    badge: "CHAR DHAM 2026 • 9N/10D",
    plan: "✓ Pure Satvik MAP Plan",
    rating: "★ 4.97/5 (1,450+ Yatris Blessed)",
    fleet: "Innova Crysta / Force Urbania Fleet",
    duration: "9 Nights / 10 Days",
    mealPlan: "MAP (Pure Satvik Breakfast & Dinner)",
    pickupDrop: "Haridwar Railway Station / Dehradun Airport",
    maxElevation: "Kedarnath: 11,755 ft | Badrinath: 10,279 ft",
    bestSeason: "May to June & September to November",
    price: 28500,
    origPrice: 34000,
    heroImage: "../images/yatra/badrinath.webp",
    route: "Haridwar • Barkot (Yamunotri) • Uttarkashi (Gangotri) • Guptkashi (Kedarnath) • Badrinath • Rishikesh",
    highlights: [
      "All 4 Sacred Dhams covered in strict clock-wise Vedic sequence with zero operational stress",
      "Guaranteed commercial yellow-plate sanitized vehicles with seasoned hill chauffeurs",
      "Government Biometric Yatra QR registration and helicopter slot booking assistance",
      "Pure Satvik onion-garlic-free wholesome vegetarian meals served hot twice daily",
      "Emergency oxygen cylinders and 24x7 dedicated Haridwar on-ground control room"
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Dehradun to Barkot via Kempty Falls Mussoorie",
        desc: "Meet our pilgrimage manager at Haridwar Railway Station. Scenic drive ascending through Mussoorie and stopping at Kempty Falls. Continue through Yamuna Valley to Barkot (4,200 ft). Check into your mountain resort with views of Bandarpoonch peak.",
        meal: "🍽️ Satvik Dinner Included",
        stay: "🏨 Barkot Mountain Resort"
      },
      {
        day: 2,
        title: "Barkot to Yamunotri Dham Darshan & Sacred Surya Kund",
        desc: "Drive to Janki Chatti and commence the 6 km trek (or pony/doli) to holy Yamunotri Dham. Take a holy bath in hot sulfur springs of Jamunabai Kund, cook rice prasadam in Surya Kund, and receive blessings of Goddess Yamuna. Trek back to Janki Chatti and return to Barkot.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Barkot Mountain Resort"
      },
      {
        day: 3,
        title: "Barkot to Uttarkashi – Kashi Vishwanath Temple Darshan",
        desc: "Drive 4 hours along the Bhagirathi River to Uttarkashi (3,800 ft), known as the Kashi of the Himalayas. Visit the ancient Kashi Vishwanath Temple and the legendary 6-meter-tall divine Shakti Trishul.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Uttarkashi Riverside Hotel"
      },
      {
        day: 4,
        title: "Uttarkashi to Gangotri Dham & Submerged Shivling",
        desc: "Scenic drive through Harsil Valley apple orchards. Arrive at holy Gangotri Dham (10,200 ft). Take a holy dip in the crystal Bhagirathi River, attend the Ganga Puja in the white granite temple, and view the submerged rock Shivling. Return to Uttarkashi.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Uttarkashi Riverside Hotel"
      },
      {
        day: 5,
        title: "Uttarkashi to Guptkashi / Sitapur via Mandakini Valley",
        desc: "Drive 7 hours across Tehri Dam reservoir and through Tilwara to Guptkashi / Sitapur in the Mandakini valley. Check in and prepare for the sacred Kedarnath darshan with medical and helipad clearances.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Guptkashi / Sitapur Cottage"
      },
      {
        day: 6,
        title: "Guptkashi to Kedarnath Dham – Trek or Helicopter & Evening Aarti",
        desc: "Early transfer to Sonprayag/Gaurikund for the 16 km trek, or board your scheduled helicopter flight from Phata/Sersi. Arrive at holy Kedarnath (11,755 ft). Attend the divine Sandhya Aarti as temple bells echo against the icy Kedar Dome.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Kedarnath Shrine Cottage / Camp"
      },
      {
        day: 7,
        title: "Morning Kedarnath Darshan, Trek Down & Drive to Pipalkoti",
        desc: "Perform morning Rudrabhishek in the 8th-century temple. Descend to Gaurikund or fly down to Phata. Drive through Chopta / Chamoli to Pipalkoti or Joshimath for an overnight valley rest.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Pipalkoti Mountain Hotel"
      },
      {
        day: 8,
        title: "Drive to Sri Badrinath Dham, Tapt Kund Snan & Evening Aarti",
        desc: "Ascend past Joshimath and Vishnuprayag to Sri Badrinath Dham (10,279 ft). Take a holy bath in the natural hot springs of Tapt Kund. Enter the colorful temple for Lord Badri Vishal darshan. Evening Swarna Aarti.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Badrinath Deluxe Hotel"
      },
      {
        day: 9,
        title: "Mana Village (Last Indian Village) & Drive to Rudraprayag",
        desc: "Visit Mana Village: Vyas Gufa where Mahabharata was dictated, Ganesh Gufa, Bhim Pul over the roaring Saraswati River. Afternoon scenic descent past Nandaprayag and Karnaprayag to Rudraprayag.",
        meal: "🍽️ Satvik Breakfast & Dinner",
        stay: "🏨 Rudraprayag Riverside Resort"
      },
      {
        day: 10,
        title: "Devprayag Sangam & Rishikesh Ganga Aarti – Haridwar Drop",
        desc: "Visit the holy confluence of Bhagirathi and Alaknanda at Devprayag to see the birth of Mother Ganga. Stop at Rishikesh Ram Jhula and Triveni Ghat before your evening drop-off at Haridwar Railway Station.",
        meal: "🍽️ Satvik Breakfast Included",
        stay: "🚗 Departure Convoy"
      }
    ]
  }
];

// Helper to build a complete Standalone Itinerary Page HTML
function buildPackagePageHTML(pkg) {
  const highlightsHTML = pkg.highlights.map(h => `
              <div class="highlight-card">
                <span class="highlight-icon">✦</span>
                <span class="highlight-text">${h}</span>
              </div>
  `).join('');

  const itineraryHTML = pkg.itinerary.map(item => `
          <div class="itinerary-day-box">
            <div class="itinerary-header">
              <span class="day-badge">DAY ${item.day}</span>
              <h3 class="day-title">${item.title}</h3>
            </div>
            <p class="day-desc">${item.desc}</p>
            <div class="day-footer">
              <span class="day-meal-pill">${item.meal}</span>
              <span class="day-stay-pill">${item.stay}</span>
            </div>
          </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pkg.title} | Trovenza Group</title>
  <meta name="description" content="Book ${pkg.title} with Trovenza Group. ${pkg.subtitle}. Price ₹${pkg.price.toLocaleString('en-IN')}. Guaranteed best rates, private cab & verified stays.">
  <link rel="canonical" href="https://www.trovenzatravels.com/packages/${pkg.filename}">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Central Dynamic Site Configuration Bridge -->
  <script src="../js/site-config.js"></script>

  <style>
    :root {
      --bg-pure: #FFFFFF;
      --bg-subtle: #F8FAFC;
      --bg-muted: #F1F5F9;
      --color-gold: #D97706;
      --color-gold-hover: #B45309;
      --color-gold-light: #FEF3C7;
      --color-navy: #0A192F;
      --color-navy-dark: #060D1A;
      --color-navy-light: #1E293B;
      --color-green: #16A34A;
      --color-green-light: #DCFCE7;
      --color-red: #DC2626;
      --color-red-light: #FEE2E2;
      --text-primary: #0F172A;
      --text-secondary: #334155;
      --text-muted: #64748B;
      --border-light: #E2E8F0;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.07);
      --shadow-lg: 0 10px 30px rgba(0,0,0,0.09);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 18px;
      --font-brand: 'Cinzel', Georgia, serif;
      --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-body);
      color: var(--text-primary);
      background-color: var(--bg-subtle);
      line-height: 1.6;
      font-size: 16px;
      overflow-x: hidden;
      padding-bottom: 70px;
    }

    a {
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }

    /* Top Strip */
    .top-strip {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-light);
      font-size: 0.82rem;
      padding: 0.5rem 0;
      color: var(--text-muted);
    }
    .top-strip-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .top-strip a {
      color: var(--color-navy);
      font-weight: 600;
    }
    .top-strip a:hover {
      color: var(--color-gold);
    }
    .sister-pill {
      background: var(--color-gold-light);
      color: var(--color-gold-hover);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.76rem;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
    }

    /* Main Header */
    .site-header {
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-light);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }
    .header-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem 0;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .brand-logo {
      height: 44px;
      width: auto;
      object-fit: contain;
    }
    .brand-info h1, .brand-info .brand-title {
      font-family: var(--font-brand);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-navy);
      letter-spacing: 0.5px;
      line-height: 1.2;
    }
    .brand-info span {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: block;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .btn-call {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.55rem 1rem;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--color-navy);
      background: #FFFFFF;
    }
    .btn-header-wa {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.55rem 1.15rem;
      background: #16A34A;
      color: #FFFFFF;
      font-size: 0.88rem;
      font-weight: 700;
      border-radius: var(--radius-sm);
      box-shadow: 0 2px 8px rgba(22, 163, 74, 0.2);
    }

    /* Breadcrumbs */
    .breadcrumb-nav {
      padding: 1rem 0 0.5rem;
      font-size: 0.82rem;
      color: var(--text-muted);
    }
    .breadcrumb-nav ol {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .breadcrumb-nav li:not(:last-child)::after {
      content: "/";
      margin-left: 0.4rem;
      color: #CBD5E1;
    }
    .breadcrumb-nav a:hover {
      color: var(--color-gold);
    }

    /* Hero Section */
    .hero-package {
      background: #FFFFFF;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 2rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-sm);
    }
    .hero-badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .badge-primary {
      background: var(--color-gold-light);
      color: var(--color-gold-hover);
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .badge-plan {
      background: var(--color-green-light);
      color: var(--color-green);
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
    }
    .badge-rating {
      background: var(--bg-muted);
      color: var(--text-secondary);
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .package-main-title {
      font-family: var(--font-heading);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--color-navy);
      line-height: 1.25;
      margin-bottom: 0.4rem;
    }
    .package-sub-title {
      font-size: 1.05rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .hero-meta-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      padding: 1.2rem;
      background: var(--bg-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      margin-bottom: 1.5rem;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .meta-label {
      font-size: 0.74rem;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.5px;
    }
    .meta-value {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-navy);
    }

    .hero-booking-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-light);
    }
    .price-box {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
    }
    .price-current {
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--color-navy);
      font-family: var(--font-heading);
    }
    .price-strike {
      font-size: 1.2rem;
      color: var(--text-muted);
      text-decoration: line-through;
    }
    .price-note {
      font-size: 0.8rem;
      color: var(--color-green);
      font-weight: 700;
      background: var(--color-green-light);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .hero-cta-buttons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .btn-wa-large {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #16A34A;
      color: #FFFFFF;
      padding: 0.85rem 1.6rem;
      font-weight: 700;
      font-size: 0.98rem;
      border-radius: var(--radius-md);
      box-shadow: 0 4px 14px rgba(22, 163, 74, 0.25);
    }
    .btn-call-large {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #FFFFFF;
      color: var(--color-navy);
      border: 1.5px solid var(--border-light);
      padding: 0.85rem 1.4rem;
      font-weight: 700;
      font-size: 0.98rem;
      border-radius: var(--radius-md);
    }

    /* Page Layout: Main + Sidebar */
    .page-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 1.75rem;
      align-items: start;
    }
    @media (max-width: 992px) {
      .page-layout {
        grid-template-columns: 1fr;
      }
    }

    /* Content Cards */
    .content-card {
      background: #FFFFFF;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 2rem;
      margin-bottom: 1.75rem;
      box-shadow: var(--shadow-sm);
    }
    .section-title-wrap {
      margin-bottom: 1.25rem;
    }
    .section-eyebrow {
      font-size: 0.78rem;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--color-gold);
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 0.2rem;
    }
    .section-heading {
      font-family: var(--font-heading);
      font-size: 1.55rem;
      font-weight: 800;
      color: var(--color-navy);
    }

    /* Highlights Grid */
    .highlights-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    .highlight-card {
      background: var(--bg-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 0.85rem 1.15rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .highlight-icon {
      color: var(--color-gold);
      font-weight: 900;
      font-size: 1.1rem;
    }
    .highlight-text {
      font-size: 0.94rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    /* Itinerary Day Box */
    .itinerary-day-box {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin-bottom: 1.25rem;
      background: #FFFFFF;
      box-shadow: var(--shadow-sm);
    }
    .itinerary-header {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.65rem;
    }
    .day-badge {
      background: var(--color-navy);
      color: #FFFFFF;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 0.2rem 0.65rem;
      border-radius: 4px;
    }
    .day-title {
      font-family: var(--font-heading);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-navy);
    }
    .day-desc {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .day-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      padding-top: 0.65rem;
      border-top: 1px dashed var(--border-light);
      font-size: 0.8rem;
    }
    .day-meal-pill {
      background: var(--color-green-light);
      color: var(--color-green);
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
    }
    .day-stay-pill {
      background: #EFF6FF;
      color: #1D4ED8;
      font-weight: 600;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
    }

    /* Sticky Sidebar */
    .sticky-sidebar {
      position: sticky;
      top: 90px;
    }
    .sidebar-card {
      background: #FFFFFF;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      box-shadow: var(--shadow-md);
    }
    .sidebar-price-label {
      font-size: 0.78rem;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--text-muted);
    }
    .sidebar-price-amount {
      font-size: 2rem;
      font-weight: 900;
      color: var(--color-navy);
      font-family: var(--font-heading);
      margin: 0.2rem 0 1rem;
    }
    .sidebar-features {
      list-style: none;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .sidebar-btn-wa {
      display: block;
      text-align: center;
      background: #16A34A;
      color: #FFFFFF;
      font-weight: 700;
      padding: 0.85rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.6rem;
    }
    .sidebar-btn-call {
      display: block;
      text-align: center;
      background: var(--bg-muted);
      color: var(--color-navy);
      font-weight: 700;
      padding: 0.8rem;
      border-radius: var(--radius-sm);
    }

    /* Footer */
    .site-footer {
      background: var(--color-navy);
      color: #94A3B8;
      padding: 3rem 0 1.5rem;
      margin-top: 3rem;
      font-size: 0.88rem;
    }

    ${GALLERY_CSS}
  </style>
</head>
<body>

  <!-- Top Announcement Bar -->
  <div class="top-strip">
    <div class="container top-strip-flex">
      <div>
        📞 24x7 Booking Helpline: <a href="tel:+919876543210" data-bind="company-phone">+91 98765 43210</a>
        <span style="margin: 0 0.5rem;">|</span>
        <span class="sister-pill">🤝 Sister Brand: <a href="../jaimaa-travels/index.html">Jai Maa Tour & Travels</a></span>
      </div>
      <div>
        <span>📍 Dedicated Haridwar & Rishikesh Departure Operations</span>
      </div>
    </div>
  </div>

  <!-- Main Navigation Header -->
  <header class="site-header">
    <div class="container header-flex">
      <a href="../index.html" class="brand-box" aria-label="Trovenza Group">
        <img src="../images/logo.png" alt="Trovenza Group Logo" class="brand-logo">
        <div class="brand-info">
          <div class="brand-title">Trovenza Group</div>
          <span>Taxi Services • Curated Tours • Govt Fleets</span>
        </div>
      </a>

      <div class="header-actions">
        <a href="tel:+919876543210" class="btn-call" data-bind="company-phone">
          📞 +91 98765 43210
        </a>
        <a href="https://wa.me/919876543210?text=Namaste%20Trovenza!%20Interested%20in%20${encodeURIComponent(pkg.title)}." target="_blank" class="btn-header-wa">
          💬 WhatsApp Booking
        </a>
      </div>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <div class="container">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../index.html#travelPackages">Holiday Packages</a></li>
        <li aria-current="page">${pkg.title}</li>
      </ol>
    </nav>
  </div>

  <!-- Hero Package Banner -->
  <main class="container">
    <section class="hero-package">
      <div class="hero-badge-row">
        <span class="badge-primary">${pkg.badge}</span>
        <span class="badge-plan">${pkg.plan}</span>
        <span class="badge-rating">${pkg.rating}</span>
        <span class="badge-rating">🛡️ ${pkg.fleet}</span>
      </div>

      <h1 class="package-main-title">${pkg.title}</h1>
      <p class="package-sub-title">${pkg.subtitle}</p>

      <div class="hero-meta-bar">
        <div class="meta-item">
          <span class="meta-label">Duration</span>
          <span class="meta-value">⏱️ ${pkg.duration}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Meal Plan</span>
          <span class="meta-value">🍽️ ${pkg.mealPlan}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Pickup & Drop</span>
          <span class="meta-value">🚗 ${pkg.pickupDrop}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Max Elevation</span>
          <span class="meta-value">🏔️ ${pkg.maxElevation}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Best Season</span>
          <span class="meta-value">☀️ ${pkg.bestSeason}</span>
        </div>
      </div>

      <div class="hero-booking-strip">
        <div class="price-box">
          <span class="price-current">₹${pkg.price.toLocaleString('en-IN')}</span>
          <span class="price-strike">₹${pkg.origPrice.toLocaleString('en-IN')}</span>
          <span class="price-note">✓ Zero Booking Commission</span>
        </div>

        <div class="hero-cta-buttons">
          <a href="https://wa.me/919876543210?text=Namaste%20Trovenza!%20Interested%20in%20${encodeURIComponent(pkg.title)}." target="_blank" class="btn-wa-large">
            💬 Book Instantly on WhatsApp
          </a>
          <a href="tel:+919876543210" class="btn-call-large">
            📞 Call Travel Specialist
          </a>
        </div>
      </div>
    </section>

    ${generateGalleryHTML(pkg.id, pkg.heroImage, pkg.title)}

    <!-- Two Column Layout: Main Content + Sticky Booking Sidebar -->
    <div class="page-layout">
      <!-- Main Left Column -->
      <div class="main-content-col">

        <!-- Trip Highlights -->
        <section class="content-card">
          <div class="section-title-wrap">
            <span class="section-eyebrow">Curated Experience</span>
            <h2 class="section-heading">Key Trip Highlights</h2>
          </div>
          <div class="highlights-grid">
            ${highlightsHTML}
          </div>
        </section>

        <!-- Day-Wise Tour Itinerary -->
        <section class="content-card">
          <div class="section-title-wrap">
            <span class="section-eyebrow">Detailed Journey</span>
            <h2 class="section-heading">Day-Wise Tour Itinerary</h2>
          </div>
          ${itineraryHTML}
        </section>

        <!-- Inclusions & Exclusions -->
        <section class="content-card">
          <div class="section-title-wrap">
            <span class="section-eyebrow">Clarity & Trust</span>
            <h2 class="section-heading">Package Inclusions & Exclusions</h2>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
            <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:1.2rem;">
              <h4 style="color:#16A34A; margin-bottom:0.75rem; font-size:1rem;">✓ What is Included</h4>
              <ul style="padding-left:1.2rem; font-size:0.88rem; color:#14532D; display:flex; flex-direction:column; gap:0.4rem;">
                <li>Dedicated commercial private cab for all transfers & sightseeing</li>
                <li>Verified mountain resort/hotel twin-sharing accommodations</li>
                <li>Daily hot breakfast and multi-course chef dinner (MAP Plan)</li>
                <li>All toll taxes, state tourist permits, parking and driver allowances</li>
                <li>24x7 Haridwar control room on-ground operational support</li>
              </ul>
            </div>
            <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:8px; padding:1.2rem;">
              <h4 style="color:#DC2626; margin-bottom:0.75rem; font-size:1rem;">✕ What is Excluded</h4>
              <ul style="padding-left:1.2rem; font-size:0.88rem; color:#991B1B; display:flex; flex-direction:column; gap:0.4rem;">
                <li>Airfare or train tickets to/from arrival city</li>
                <li>Personal expenses, laundry, telephone calls and tips</li>
                <li>Pony, doli, porter charges or special adventure sports tickets</li>
                <li>5% GST or anything not specifically mentioned in inclusions</li>
              </ul>
            </div>
          </div>
        </section>

      </div>

      <!-- Right Sticky Sidebar -->
      <aside class="sidebar-col">
        <div class="sticky-sidebar">
          <div class="sidebar-card">
            <div class="sidebar-price-label">Starting From</div>
            <div class="sidebar-price-amount">₹${pkg.price.toLocaleString('en-IN')} <span style="font-size:0.85rem; font-weight:600; color:var(--text-muted);">/ person</span></div>

            <ul class="sidebar-features">
              <li>✓ <strong>Duration:</strong> ${pkg.duration}</li>
              <li>✓ <strong>Plan:</strong> ${pkg.mealPlan}</li>
              <li>✓ <strong>Route:</strong> ${pkg.route}</li>
              <li>✓ <strong>Vehicle:</strong> Private Dedicated Fleet</li>
              <li>✓ <strong>Support:</strong> 24x7 Haridwar Helpline</li>
            </ul>

            <a href="https://wa.me/919876543210?text=Namaste%20Trovenza!%20Interested%20in%20${encodeURIComponent(pkg.title)}." target="_blank" class="sidebar-btn-wa">
              💬 Instant WhatsApp Booking
            </a>
            <a href="tel:+919876543210" class="sidebar-btn-call" data-bind="company-phone">
              📞 Call +91 98765 43210
            </a>
          </div>
        </div>
      </aside>
    </div>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container" style="text-align:center;">
      <p style="margin-bottom:0.5rem;"><strong>Trovenza Group</strong> • Premier Cab & Pilgrimage Specialist</p>
      <p style="font-size:0.8rem; color:#64748B;">Haridwar Head Office: No. 7, Gyan Mandir, Opp. Daksh Mandir, Haridwar, Uttarakhand - 249408</p>
      <p style="font-size:0.75rem; color:#475569; margin-top:1rem;">© 2026 Trovenza Group. All Rights Reserved.</p>
    </div>
  </footer>

</body>
</html>`;
}

// 2. BUILD THE 8 NEW PAGES
console.log('Generating 8 new package pages...');
NEW_PACKAGES.forEach(pkg => {
  const html = buildPackagePageHTML(pkg);
  
  // Save in trovenza packages
  const destPath = path.join(PACKAGES_DIR, pkg.filename);
  fs.writeFileSync(destPath, html, 'utf8');
  console.log('Created: ' + destPath);

  // Save in jaimaa packages (with relative path to site-config adjusted)
  const jaimaaHtml = html.replace('<script src="../js/site-config.js"></script>', '<script src="../site-config.js"></script>');
  const jaimaaDestPath = path.join(JAIMAA_PACKAGES_DIR, pkg.filename);
  fs.writeFileSync(jaimaaDestPath, jaimaaHtml, 'utf8');
  console.log('Created Jai Maa: ' + jaimaaDestPath);
});

// 3. UPDATE EXISTING 9 PACKAGE PAGES TO INJECT GALLERY
console.log('Injecting Collage Gallery into existing package pages...');

const EXISTING_PAGES = [
  { file: 'auli-chopta-4n5d.html', id: 'auli-chopta-4n5d', name: 'Auli + Chopta Tungnath Chandrashila Trek', hero: '../images/packages/auli-chopta-main.jpg' },
  { file: 'nainital-almora-kausani-5n6d.html', id: 'nainital-almora-kausani-5n6d', name: 'Nainital + Almora + Kausani Kumaon Scenic Tour', hero: '../images/packages/nainital-kausani-main.jpg' },
  { file: 'rishikesh-mussoorie-kanatal-dhanaulti-5n6d.html', id: 'rishikesh-mussoorie-kanatal-5n6d', name: 'Rishikesh + Mussoorie + Rafting + Kanatal + Dhanaulti', hero: '../images/packages/rishikesh-mussoorie-kanatal.jpg' },
  { file: 'rishikesh-mussoorie-2n3d.html', id: 'rishikesh-mussoorie-2n3d', name: 'Rishikesh + Mussoorie Queen of Hills Escapade', hero: '../images/packages/rishikesh-mussoorie-main.jpg' },
  { file: 'adi-kailash-om-parvat-6n7d.html', id: 'adi-kailash-om-parvat-6n7d', name: 'Adi Kailash + Om Parvat Sacred Frontier Expedition', hero: '../images/packages/adi-kailash-om-parvat.jpg' },
  { file: 'kartik-swami-triyuginarayan-dhari-devi-4n5d.html', id: 'kartik-swami-triyuginarayan-4n5d', name: 'Kartik Swami + Triyuginarayan + Dhari Devi Circuit', hero: '../images/packages/kartik-swami-dhari-devi.jpg' },
  { file: 'chopta-tungnath-2n3d.html', id: 'chopta-tungnath-2n3d', name: 'Chopta Tungnath Deoriatal Mini Switzerland', hero: '../images/packages/chopta-tungnath-main.jpg' },
  { file: 'auli-ski-resort-2n3d.html', id: 'auli-ski-resort-2n3d', name: 'Auli Ski Resort & Cable Car Himalayan Wonderland', hero: '../images/packages/auli-ski-resort.jpg' },
  { file: 'triyuginarayan-wedding-2n3d.html', id: 'triyuginarayan-wedding', name: 'Triyuginarayan Vedic Destination Wedding', hero: '../images/packages/triyuginarayan-wedding.png' }
];

EXISTING_PAGES.forEach(item => {
  const filePath = path.join(PACKAGES_DIR, item.file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if site-config is included
  if (!content.includes('site-config.js')) {
    content = content.replace('</head>', '  <script src="../js/site-config.js"></script>\n</head>');
  }

  // Check if GALLERY_CSS is included
  if (!content.includes('.package-gallery-grid')) {
    content = content.replace('</style>', `${GALLERY_CSS}\n  </style>`);
  }

  // Check if gallery grid is already injected
  if (!content.includes('package-gallery-grid')) {
    const galleryHtml = generateGalleryHTML(item.id, item.hero, item.name);
    // Insert right after </section> of hero-package
    if (content.includes('</section>')) {
      const idx = content.indexOf('</section>');
      content = content.slice(0, idx + 10) + '\n\n' + galleryHtml + '\n' + content.slice(idx + 10);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated existing: ' + item.file);

  // Copy to Jai Maa with script path adjusted
  const jaimaaFilePath = path.join(JAIMAA_PACKAGES_DIR, item.file);
  const jaimaaContent = content.replace('<script src="../js/site-config.js"></script>', '<script src="../site-config.js"></script>');
  fs.writeFileSync(jaimaaFilePath, jaimaaContent, 'utf8');
  console.log('Updated existing Jai Maa: ' + item.file);
});

console.log('All package pages successfully built and synchronized!');
