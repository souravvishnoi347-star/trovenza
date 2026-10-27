/**
 * TROVENZA GROUP & JAI MAA TRAVELS - CENTRAL SITE CONFIGURATION & REALTIME BRIDGE
 * This module manages site-wide dynamic settings editable via the Client Admin Panel (/trilok).
 * If values are edited in the Admin Panel, they are persisted to localStorage and automatically
 * hydrated into the DOM in real-time across both websites.
 */

(function () {
  const CONFIG_STORAGE_KEY = 'trovenza_site_config';
  const LEADS_STORAGE_KEY = 'trovenza_leads';

  // 1. DEFAULT FACTORY CONFIGURATION
  const DEFAULT_CONFIG = {
    company: {
      name: "Trovenza Group",
      haridwarAddress: "No. 7, Gyan Mandir, Opp. Daksh Mandir, Haridwar, Uttarakhand - 249408",
      helpline: "+91 98765 43210",
      whatsappNumber: "919876543210",
      email: "info@trovenzatravels.com",
      announcement: "⚡ Direct Haridwar Cab & Pilgrimage Operations • Guaranteed Commercial Yellow Plate Vehicles"
    },
    fares: {
      delhiHaridwar: {
        dzire: 3600,
        ertiga: 4200,
        crysta: 5000,
        tempo: 12000,
        urbania: 15000
      },
      perKm: {
        dzire: 12,
        ertiga: 14,
        crysta: 18,
        tempo: 28,
        urbania: 38
      },
      nightDriverAllowance: 400,
      minKmPerDay: 250
    },
    packages: [
      {
        id: "auli-chopta-4n5d",
        name: "Auli + Chopta Tungnath Chandrashila Trek",
        duration: "4N/5D",
        price: 14499,
        originalPrice: 18999,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "himalayan",
        badge: "POPULAR",
        destinations: "📍 Haridwar • Chopta • Tungnath • Chandrashila • Auli Ski Slopes",
        inclusions: [
          "🍽️ MAP: Breakfast & Dinner",
          "🏨 Valley-View Mountain Chalet",
          "🚗 Private Cab Included",
          "🥾 Expert Trek Leader"
        ],
        image: "images/packages/auli-chopta-main.jpg",
        url: "packages/auli-chopta-4n5d.html",
        active: true
      },
      {
        id: "nainital-almora-kausani-5n6d",
        name: "Nainital + Almora + Kausani Himalayan Vista",
        duration: "5N/6D",
        price: 15999,
        originalPrice: 20500,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "himalayan",
        badge: "BESTSELLER",
        destinations: "📍 Kathgodam / Haridwar • Naini Lake • Almora • Kausani Tea Gardens",
        inclusions: [
          "🍽️ MAP: Daily Breakfast & Dinner",
          "🏨 Premium Scenic Hotels",
          "🚗 Dedicated Private Sedan/SUV",
          "🛶 Naini Lake Boat Ride"
        ],
        image: "images/packages/nainital-kausani-main.jpg",
        url: "packages/nainital-almora-kausani-5n6d.html",
        active: true
      },
      {
        id: "rishikesh-mussoorie-kanatal-5n6d",
        name: "Rishikesh + Mussoorie + Rafting + Kanatal + Dhanaulti",
        duration: "5N/6D",
        price: 16499,
        originalPrice: 21999,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "adventure",
        badge: "ADVENTURE",
        destinations: "📍 Haridwar • Rishikesh • Ganga Rafting • Kanatal • Dhanaulti • Mussoorie",
        inclusions: [
          "🌊 16 KM Ganga River Rafting",
          "🌲 Kanatal Eco Park Camp",
          "🏨 Mussoorie Mall Road Stays",
          "🚗 Private Fleet Cab"
        ],
        image: "images/packages/rishikesh-mussoorie-kanatal.jpg",
        url: "packages/rishikesh-mussoorie-kanatal-dhanaulti-5n6d.html",
        active: true
      },
      {
        id: "rishikesh-mussoorie-2n3d",
        name: "Rishikesh + Mussoorie Queen of Hills Escapade",
        duration: "2N/3D",
        price: 8999,
        originalPrice: 11999,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "himalayan",
        badge: "WEEKENDER",
        destinations: "📍 Haridwar • Rishikesh Ganga Aarti • Kempty Falls • Mussoorie Mall Road",
        inclusions: [
          "🍽️ MAP: Daily Breakfast & Dinner",
          "🏨 3-Star Hill Stays",
          "🚗 Private AC Cab",
          "🛕 Ganga Aarti VIP Darshan"
        ],
        image: "images/packages/rishikesh-mussoorie-main.jpg",
        url: "packages/rishikesh-mussoorie-2n3d.html",
        active: true
      },
      {
        id: "adi-kailash-om-parvat-6n7d",
        name: "Adi Kailash + Om Parvat Sacred Frontier Expedition",
        duration: "6N/7D",
        price: 34999,
        originalPrice: 42000,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "spiritual",
        badge: "EXPEDITION",
        destinations: "📍 Dharchula • Gunji • Kalapani • Om Parvat • Adi Kailash • Parvati Sarovar",
        inclusions: [
          "🪪 Inner-Line Permit & Pass",
          "🚙 4x4 Mountain Fleet",
          "🏨 Homestays & Transit Camps",
          "🍽️ Pure Satvik Meals"
        ],
        image: "images/packages/adi-kailash-om-parvat.jpg",
        url: "packages/adi-kailash-om-parvat-6n7d.html",
        active: true
      },
      {
        id: "kartik-swami-triyuginarayan-4n5d",
        name: "Kartik Swami + Triyuginarayan + Dhari Devi Circuit",
        duration: "4N/5D",
        price: 13999,
        originalPrice: 17999,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "spiritual",
        badge: "TEMPLE TRAIL",
        destinations: "📍 Haridwar • Dhari Devi Siddha Peeth • Rudraprayag • Kartik Swami • Triyuginarayan",
        inclusions: [
          "🍽️ MAP: Pure Satvik Meals",
          "🛕 360° Temple Ridge Trek",
          "🏨 Mountain Stays",
          "🚗 Private Sanitized Fleet Cab"
        ],
        image: "images/packages/kartik-swami-dhari-devi.jpg",
        url: "packages/kartik-swami-triyuginarayan-dhari-devi-4n5d.html",
        active: true
      },
      {
        id: "chopta-tungnath-2n3d",
        name: "Chopta Tungnath Deoriatal Mini Switzerland",
        duration: "2N/3D",
        price: 7499,
        originalPrice: 9999,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "himalayan",
        badge: "TREK SPECIAL",
        destinations: "📍 Haridwar • Sari Village • Deoriatal Lake • Chopta Meadows • Tungnath",
        inclusions: [
          "🍽️ MAP: Breakfast & Dinner",
          "🏕️ Meadow Swiss Cottages",
          "🚗 Haridwar-to-Haridwar Cab",
          "🥾 Trek Guide & Forest Permits"
        ],
        image: "images/packages/chopta-tungnath-main.jpg",
        url: "packages/chopta-tungnath-2n3d.html",
        active: true
      },
      {
        id: "auli-ski-resort-2n3d",
        name: "Auli Ski Resort & Cable Car Himalayan Wonderland",
        duration: "2N/3D",
        price: 9499,
        originalPrice: 12500,
        mealPlan: "MAP Plan (Breakfast & Dinner)",
        category: "himalayan",
        badge: "SNOW & SKI",
        destinations: "📍 Haridwar • Devprayag • Joshimath • Auli Ropeway • Gorson Bugyal",
        inclusions: [
          "🍽️ MAP: Breakfast & Dinner",
          "🏨 Heated Mountain Resort",
          "🚗 Private Fleet Cab",
          "🎿 Ski Instructor Assistance"
        ],
        image: "images/packages/auli-ski-resort.jpg",
        url: "packages/auli-ski-resort-2n3d.html",
        active: true
      },
      {
        id: "chardham-yatra-2026",
        name: "Char Dham Yatra 2026 (Yamunotri • Gangotri • Kedarnath • Badrinath)",
        duration: "9N/10D",
        price: 28500,
        originalPrice: 34000,
        mealPlan: "MAP Plan (Pure Satvik Meals)",
        category: "spiritual",
        badge: "CHAR DHAM 2026",
        destinations: "📍 Haridwar • Yamunotri • Gangotri • Kedarnath • Badrinath",
        inclusions: [
          "🏨 4-Star Mountain Stays",
          "🚗 Innova Crysta / Fleet",
          "🍽️ Satvik Meals",
          "🫁 O₂ Support & Biometric Pass"
        ],
        image: "images/yatra/badrinath.webp",
        url: "chardham-yatra.html",
        active: true
      },
      {
        id: "kedarnath-heli-charter",
        name: "Kedarnath Heli & VIP Darshan Express",
        duration: "2N/3D",
        price: 38500,
        originalPrice: 45000,
        mealPlan: "MAP Plan",
        category: "spiritual",
        badge: "VIP EXPRESS",
        destinations: "📍 Dehradun / Phata • Kedarnath Temple • Guptkashi",
        inclusions: [
          "🚁 Confirmed Helicopter Tickets",
          "🎟️ Sugam Darshan Pass",
          "🏨 Luxury Cottage",
          "🚗 Helipad Transfers"
        ],
        image: "images/packages/kedarnath-heli-main.jpg",
        url: "chardham-yatra.html",
        active: true
      },
      {
        id: "ayodhya-varanasi-5d4n",
        name: "Ayodhya Ram Mandir & Kashi Vishwanath Circuit",
        duration: "4N/5D",
        price: 22500,
        originalPrice: 28000,
        mealPlan: "MAP Plan",
        category: "spiritual",
        badge: "SPIRITUAL",
        destinations: "📍 Ayodhya • Prayagraj Sangam • Kashi Vishwanath",
        inclusions: [
          "🕍 VIP Darshan Passes",
          "⛵ Ganga Boat Ride",
          "🏨 4-Star Hotels",
          "🚗 AC Sedan / SUV"
        ],
        image: "images/yatra/ram-mandir.jpg",
        url: "#travelPackages",
        active: true
      },
      {
        id: "kashmir-paradise-6d5n",
        name: "Kashmir Paradise & Gulmarg Gondola",
        duration: "5N/6D",
        price: 24999,
        originalPrice: 31000,
        mealPlan: "MAP Plan",
        category: "himalayan",
        badge: "HILL STATION",
        destinations: "📍 Srinagar • Gulmarg • Pahalgam • Sonmarg",
        inclusions: [
          "⛵ Dal Lake Shikara",
          "🚠 Gondola Phase-1 Ticket",
          "🛶 Luxury Houseboat",
          "🚗 Dedicated Cab"
        ],
        image: "images/packages/kashmir.jpg",
        url: "#travelPackages",
        active: true
      },
      {
        id: "himachal-scenic-6d5n",
        name: "Himachal Scenic Escape (Shimla-Manali)",
        duration: "5N/6D",
        price: 18500,
        originalPrice: 24000,
        mealPlan: "MAP Plan",
        category: "himalayan",
        badge: "HIMALAYAN",
        destinations: "📍 Delhi • Shimla • Kullu • Manali • Solang Valley",
        inclusions: [
          "🏔️ Solang & Rohtang Trip",
          "🏨 Valley-View Hotels",
          "🍽️ Daily Breakfast & Dinner",
          "🚗 Private Cab"
        ],
        image: "images/packages/manali-solang.jpg",
        url: "#travelPackages",
        active: true
      },
      {
        id: "rajasthan-royal-7d6n",
        name: "Royal Rajasthan & Desert Safari",
        duration: "6N/7D",
        price: 26000,
        originalPrice: 32500,
        mealPlan: "MAP Plan",
        category: "heritage",
        badge: "HERITAGE",
        destinations: "📍 Jaipur • Jodhpur • Udaipur • Jaisalmer Dunes",
        inclusions: [
          "🐪 Camel Desert Safari",
          "🏰 Amber Fort & Lake Palace",
          "🎪 Swiss Tents with Folk Dance",
          "🚗 Chauffeur Sedan"
        ],
        image: "images/packages/hawa-mahal.webp",
        url: "#travelPackages",
        active: true
      },
      {
        id: "nepal-himalayan-6d5n",
        name: "Nepal Himalayan Escapade",
        duration: "5N/6D",
        price: 27500,
        originalPrice: 35000,
        mealPlan: "MAP Plan",
        category: "international",
        badge: "INTERNATIONAL",
        destinations: "📍 Kathmandu • Pokhara • Pashupatinath • Sarangkot",
        inclusions: [
          "🕍 Pashupatinath VIP Darshan",
          "🏔️ Annapurna Sunrise View",
          "⛵ Phewa Lake Boating",
          "🏨 4-Star Resort Stays"
        ],
        image: "images/packages/nepal.jpg",
        url: "#travelPackages",
        active: true
      },
      {
        id: "dubai-luxury-5d4n",
        name: "Dubai Extravaganza with Desert Safari",
        duration: "4N/5D",
        price: 42000,
        originalPrice: 52000,
        mealPlan: "Breakfast Included",
        category: "international",
        badge: "INTERNATIONAL",
        destinations: "📍 Dubai City • Marina • Desert Camp • Abu Dhabi",
        inclusions: [
          "🏙️ Burj Khalifa 124th Floor",
          "🚙 4x4 Dune Bashing & BBQ",
          "⛵ Marina Dhow Dinner Cruise",
          "🏨 4-Star Downtown Hotel"
        ],
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
        url: "#travelPackages",
        active: true
      }
    ],
    wedding: {
      name: "Triyuginarayan Vedic Destination Wedding",
      price: 400000,
      guests: "Upto 30 Guests Included",
      duration: "2 Nights / 3 Days",
      location: "Triyuginarayan Akhand Dhuni & Himalayan Luxury Resort",
      meals: "All 4 Gourmet Meals Included: Breakfast, Satvik Lunch, High Tea & Grand Wedding Dinner",
      transport: "Haridwar to Haridwar Dedicated Sanitized Fleet Travel Included",
      accommodation: "Premium Mountain Resort Double-Occupancy Rooms (2 Members / Room)",
      rituals: "Complete Haldi, Mehndi, Ring Ceremony, Wedding Mandap, Floral & Lighting Decor",
      inclusions: "Full On-Ground Management, Certified Bridal/Groom Makeup Artist, Cinematic 4K Photography & Drone, Temple Puja Fees & Priest Dakshina",
      active: true
    }
  };

  // 2. RETRIEVE CURRENT CONFIGURATION (WITH SMART AUTO-MIGRATION)
  function getConfig() {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.packages)) {
          // Merge defaults to ensure images, categories, and newly registered packages are present
          parsed.packages.forEach(pkg => {
            const defaultMatch = DEFAULT_CONFIG.packages.find(d => d.id === pkg.id);
            if (defaultMatch) {
              if (!pkg.image && defaultMatch.image) pkg.image = defaultMatch.image;
              if (!pkg.category && defaultMatch.category) pkg.category = defaultMatch.category;
              if (!pkg.destinations && defaultMatch.destinations) pkg.destinations = defaultMatch.destinations;
              if (!pkg.inclusions && defaultMatch.inclusions) pkg.inclusions = defaultMatch.inclusions;
            }
          });
          // Ensure all default packages exist
          DEFAULT_CONFIG.packages.forEach(defPkg => {
            if (!parsed.packages.some(p => p.id === defPkg.id)) {
              parsed.packages.push({ ...defPkg });
            }
          });
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read site config from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  // 3. SAVE CONFIGURATION (Called from Admin Panel)
  function saveConfig(newConfig) {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
      applyConfigToDOM(newConfig);
      return true;
    } catch (e) {
      console.error('Failed to save site config:', e);
      return false;
    }
  }

  // 4. RESET CONFIGURATION TO FACTORY
  function resetConfig() {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      applyConfigToDOM(DEFAULT_CONFIG);
      return true;
    } catch (e) {
      console.error('Failed to reset config:', e);
      return false;
    }
  }

  // 5. CLIENT-SIDE IMAGE COMPRESSION (Safe Base64 Data URL)
  function compressImage(file, maxWidth = 900, maxHeight = 650, quality = 0.82) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Please select a valid image file.'));
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image into canvas.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  }

  // 6. CAPTURE CUSTOMER INQUIRY / LEAD
  function recordLead(leadData) {
    try {
      const leads = getLeads();
      const newLead = {
        id: 'LEAD-' + Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString(),
        dateFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: leadData.name || 'Anonymous Traveler',
        phone: leadData.phone || 'N/A',
        service: leadData.service || 'General Inquiry',
        pickup: leadData.pickup || '',
        destination: leadData.destination || '',
        travelDate: leadData.travelDate || '',
        vehicle: leadData.vehicle || '',
        guests: leadData.guests || '',
        status: 'New',
        notes: leadData.notes || ''
      };
      leads.unshift(newLead);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return newLead;
    } catch (e) {
      console.warn('Failed to record lead in localStorage:', e);
      return null;
    }
  }

  function getLeads() {
    try {
      const stored = localStorage.getItem(LEADS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function updateLeadStatus(leadId, newStatus) {
    try {
      const leads = getLeads();
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        lead.status = newStatus;
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
        return true;
      }
    } catch (e) {}
    return false;
  }

  function deleteLead(leadId) {
    try {
      let leads = getLeads();
      leads = leads.filter(l => l.id !== leadId);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
      return true;
    } catch (e) {}
    return false;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 7. DOM HYDRATION BRIDGE
  function applyConfigToDOM(config) {
    if (!config) config = getConfig();

    // 7A. Update phone numbers
    if (config.company?.helpline) {
      document.querySelectorAll('[data-bind="company-phone"]').forEach(el => {
        el.textContent = config.company.helpline;
      });
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        if (!a.getAttribute('data-preserve-phone')) {
          a.setAttribute('href', 'tel:' + config.company.helpline.replace(/\s+/g, ''));
        }
      });
    }

    // 7B. Update Haridwar address
    if (config.company?.haridwarAddress) {
      document.querySelectorAll('[data-bind="company-address"]').forEach(el => {
        el.textContent = config.company.haridwarAddress;
      });
    }

    // 7C. Update WhatsApp links
    if (config.company?.whatsappNumber) {
      document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
        const currentHref = a.getAttribute('href');
        const textParam = currentHref.includes('?text=') ? currentHref.substring(currentHref.indexOf('?text=')) : '';
        a.setAttribute('href', 'https://wa.me/' + config.company.whatsappNumber + textParam);
      });
    }

    // 7D. Update Taxi Fare Display in Simulator
    if (config.fares?.delhiHaridwar && window.vehicleData) {
      ['dzire', 'ertiga', 'crysta', 'tempo', 'urbania'].forEach(veh => {
        if (window.vehicleData[veh]) {
          window.vehicleData[veh].delhiHaridwarFixed = config.fares.delhiHaridwar[veh];
          window.vehicleData[veh].rateNum = config.fares.perKm[veh];
          window.vehicleData[veh].ratePerKm = '₹' + config.fares.perKm[veh] + ' / km';
        }
      });
    }

    // 7E. HYDRATE TOUR PACKAGES & NEW PICTURES (TROVENZA & JAI MAA)
    if (Array.isArray(config.packages)) {
      const trovenzaGrid = document.querySelector('.travel-packages-grid');
      const jaimaaGrid = document.querySelector('.packages-grid');

      // Remove previously injected dynamic cards before re-injecting
      document.querySelectorAll('[data-dynamic-pkg="true"]').forEach(el => el.remove());

      const matchedPackageIds = new Set();

      // 1. Process static cards on Trovenza website
      if (trovenzaGrid) {
        const cards = trovenzaGrid.querySelectorAll('.travel-pkg-card:not([data-dynamic-pkg])');
        cards.forEach(card => {
          const pkgIdAttr = card.getAttribute('data-pkg-id');
          const linkHref = card.querySelector('a.pkg-card-btn')?.getAttribute('href') || '';
          const cardTitle = card.querySelector('.pkg-card-title')?.textContent.trim() || '';

          // Find matching package
          const pkg = config.packages.find(p => {
            if (pkgIdAttr && p.id === pkgIdAttr) return true;
            if (p.url && linkHref.includes(p.url)) return true;
            if (cardTitle && p.name && (cardTitle.includes(p.name) || p.name.includes(cardTitle))) return true;
            return false;
          });

          if (pkg) {
            matchedPackageIds.add(pkg.id);
            if (!pkgIdAttr) card.setAttribute('data-pkg-id', pkg.id);

            // Visibility
            card.style.display = pkg.active === false ? 'none' : '';

            // Update Picture
            if (pkg.image) {
              const img = card.querySelector('.pkg-card-media img');
              if (img && img.src !== pkg.image) {
                img.src = pkg.image;
              }
            }

            // Update Price
            if (pkg.price) {
              const priceEl = card.querySelector('.pkg-price-val');
              if (priceEl) priceEl.textContent = '₹' + Number(pkg.price).toLocaleString('en-IN');
            }

            // Update Duration
            if (pkg.duration) {
              const durEl = card.querySelector('.pkg-duration-badge');
              if (durEl) durEl.textContent = pkg.duration;
            }

            // Update Badge
            if (pkg.badge) {
              const badgeEl = card.querySelector('.pkg-category-badge');
              if (badgeEl) badgeEl.textContent = pkg.badge;
            }

            // Update Title
            if (pkg.name) {
              const titleEl = card.querySelector('.pkg-card-title');
              if (titleEl) titleEl.textContent = pkg.name;
            }
          }
        });
      }

      // 2. Process static cards on Jai Maa website
      if (jaimaaGrid) {
        const cards = jaimaaGrid.querySelectorAll('.pkg-card:not([data-dynamic-pkg])');
        cards.forEach(card => {
          const pkgIdAttr = card.getAttribute('data-pkg-id');
          const linkHref = card.querySelector('.pkg-btn-row a')?.getAttribute('href') || '';
          const cardTitle = card.querySelector('.pkg-title')?.textContent.trim() || '';

          const pkg = config.packages.find(p => {
            if (pkgIdAttr && p.id === pkgIdAttr) return true;
            if (p.url && linkHref.includes(p.url)) return true;
            if (cardTitle && p.name && (cardTitle.includes(p.name) || p.name.includes(cardTitle))) return true;
            return false;
          });

          if (pkg) {
            matchedPackageIds.add(pkg.id);
            if (!pkgIdAttr) card.setAttribute('data-pkg-id', pkg.id);

            // Visibility
            card.style.display = pkg.active === false ? 'none' : '';

            // Update Picture
            if (pkg.image) {
              const img = card.querySelector('.pkg-image-wrapper img');
              if (img && img.src !== pkg.image) {
                img.src = pkg.image;
              }
            }

            // Update Price
            if (pkg.price) {
              const priceEl = card.querySelector('.price-amount');
              if (priceEl) {
                priceEl.innerHTML = '₹' + Number(pkg.price).toLocaleString('en-IN') + ' <small>/ person</small>';
              }
            }

            // Update Duration
            if (pkg.duration) {
              const durEl = card.querySelector('.pkg-duration');
              if (durEl) durEl.textContent = pkg.duration;
            }

            // Update Title
            if (pkg.name) {
              const titleEl = card.querySelector('.pkg-title');
              if (titleEl) titleEl.textContent = pkg.name;
            }
          }
        });
      }

      // 3. Inject any BRAND NEW / CUSTOM packages dynamically
      config.packages.forEach(pkg => {
        if (!matchedPackageIds.has(pkg.id) && pkg.active !== false) {
          // Dynamic card for Trovenza
          if (trovenzaGrid) {
            const newCard = document.createElement('div');
            newCard.className = 'travel-pkg-card';
            newCard.setAttribute('data-dynamic-pkg', 'true');
            newCard.setAttribute('data-pkg-id', pkg.id);
            newCard.setAttribute('data-pkg-category', pkg.category || 'himalayan');

            const incHtml = Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0
              ? pkg.inclusions.map(inc => `<span>${escapeHtml(inc)}</span>`).join('')
              : `<span>🍽️ ${escapeHtml(pkg.mealPlan || 'MAP Plan')}</span><span>🚗 Private Fleet Cab</span><span>🏨 Premium Stays</span><span>🥾 Guide Support</span>`;

            const origPriceHtml = pkg.originalPrice
              ? `<span style="font-size:0.75rem; text-decoration:line-through; color:var(--text-muted); margin-left:0.4rem;">₹${Number(pkg.originalPrice).toLocaleString('en-IN')}</span>`
              : '';

            newCard.innerHTML = `
              <div class="pkg-card-media">
                <img loading="lazy" src="${pkg.image || 'images/packages/auli-chopta-main.jpg'}" alt="${escapeHtml(pkg.name)}">
                <span class="pkg-duration-badge">${escapeHtml(pkg.duration || 'Custom')}</span>
                <span class="pkg-category-badge" style="background:#0284C7;">${escapeHtml(pkg.badge || 'NEW')}</span>
              </div>
              <div class="pkg-card-body">
                <h4 class="pkg-card-title">${escapeHtml(pkg.name)}</h4>
                <div class="pkg-card-destinations">${escapeHtml(pkg.destinations || '📍 Custom Mountain Circuit')}</div>
                <div class="pkg-inclusions-list">
                  ${incHtml}
                </div>
                <div class="pkg-price-row">
                  <div>
                    <span class="pkg-price-label">Starting From</span>
                    <span class="pkg-price-val">₹${Number(pkg.price).toLocaleString('en-IN')}</span>
                    ${origPriceHtml}
                  </div>
                  <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(pkg.mealPlan || 'per person')}</span>
                </div>
                <a href="https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent('Namaste Trovenza! Interested in ' + pkg.name + ' package.')}" target="_blank" class="pkg-card-btn" style="background:var(--color-navy); color:#FFFFFF;">
                  Book Package via WhatsApp →
                </a>
              </div>
            `;
            trovenzaGrid.appendChild(newCard);
          }

          // Dynamic card for Jai Maa
          if (jaimaaGrid) {
            const newCard = document.createElement('div');
            newCard.className = 'pkg-card';
            newCard.setAttribute('data-dynamic-pkg', 'true');
            newCard.setAttribute('data-pkg-id', pkg.id);

            const incListHtml = Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0
              ? pkg.inclusions.map(inc => `<li>✓ ${escapeHtml(inc)}</li>`).join('')
              : `<li>✓ ${escapeHtml(pkg.mealPlan || 'MAP Plan')}</li><li>✓ Dedicated Private Cab</li><li>✓ Verified Stays</li>`;

            newCard.innerHTML = `
              <div class="pkg-image-wrapper">
                <img src="${pkg.image || 'images/packages/auli-chopta-main.jpg'}" alt="${escapeHtml(pkg.name)}">
                <span class="pkg-duration">${escapeHtml(pkg.duration || 'Custom')}</span>
              </div>
              <div class="pkg-content">
                <h3 class="pkg-title">${escapeHtml(pkg.name)}</h3>
                <p class="pkg-route">${escapeHtml(pkg.destinations || '📍 Custom Tour Route')}</p>
                <ul class="pkg-highlights">
                  ${incListHtml}
                </ul>
                <div class="pkg-price-box">
                  <div>
                    <span class="price-from">Starting From</span>
                    <span class="price-amount">₹${Number(pkg.price).toLocaleString('en-IN')} <small>/ person</small></span>
                  </div>
                </div>
                <div class="pkg-btn-row">
                  <a href="https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent('Namaste Jai Maa Travels! Inquiry for ' + pkg.name + ' Package')}" target="_blank" class="btn-pkg-book" style="background:#0F172A; text-align:center;">Book Package</a>
                  <a href="https://wa.me/${config.company.whatsappNumber}?text=${encodeURIComponent('Inquiry for ' + pkg.name + ' Package')}" target="_blank" class="btn-pkg-details" style="color:#25D366; border-color:#25D366; text-align:center;">WhatsApp</a>
                </div>
              </div>
            `;
            jaimaaGrid.appendChild(newCard);
          }
        }
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyConfigToDOM());
  } else {
    applyConfigToDOM();
  }

  // Export to global namespace
  window.TrovenzaConfig = {
    DEFAULT_CONFIG,
    getConfig,
    saveConfig,
    resetConfig,
    compressImage,
    recordLead,
    getLeads,
    updateLeadStatus,
    deleteLead,
    applyConfigToDOM
  };

})();
