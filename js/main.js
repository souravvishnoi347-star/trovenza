/**
 * TROVENZA GROUP - LUXURY WHITE TRAVEL PORTAL INTERACTIVE LOGIC
 * Features:
 * 1. Mobile Navigation & Sticky Bottom Action Bar
 * 2. Hero Console Tabs & Mode Switcher
 * 3. Interactive Fleet Showcase Simulator (Urbania, Crysta, Ertiga, Dzire, Tempo, Hycross)
 * 4. Dual-Mode Live Taxi Fare Engine (10+ Fixed Routes + Custom KM Estimator)
 * 5. Instant WhatsApp Booking Dispatch Routing
 * 6. Animated Counter Numbers
 * 7. Travel Packages Category Filter
 * 8. FAQ Accordion Interaction
 * 9. Triyuginarayan Royal Wedding Menu Tabs
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-pills-list') || document.querySelector('.nav-menu-pills');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
      }
    });
  }

  // 2. Hero Console Tabs & Mode Switcher
  const consoleTabs = document.querySelectorAll('.b-card-tab, .console-tab');
  const consolePanes = document.querySelectorAll('.booking-pane, .console-pane');
  const modePills = document.querySelectorAll('.service-pill-btn, .mode-pill-btn');

  const switchTab = (targetId) => {
    consoleTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-pane') === targetId);
    });

    consolePanes.forEach(p => {
      p.classList.toggle('active', p.id === targetId);
    });

    modePills.forEach(m => {
      const mode = m.getAttribute('data-mode');
      m.classList.remove('active-taxi', 'active-yatra', 'active-govt');
      if (mode === 'taxi' && targetId === 'paneTaxi') m.classList.add('active-taxi');
      if (mode === 'yatra' && targetId === 'paneYatra') m.classList.add('active-yatra');
      if (mode === 'govt' && targetId === 'paneGovt') m.classList.add('active-govt');
    });
  };

  if (consoleTabs.length > 0) {
    consoleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-pane');
        switchTab(targetId);
      });
    });
  }

  if (modePills.length > 0) {
    modePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const mode = pill.getAttribute('data-mode');
        if (mode === 'taxi') switchTab('paneTaxi');
        if (mode === 'yatra') switchTab('paneYatra');
        if (mode === 'govt') switchTab('paneGovt');
      });
    });
  }

  // 3. Interactive Fleet Showcase Simulator
  const vehicleData = {
    crysta: {
      name: "Toyota Innova Crysta (Captain Seats)",
      category: "Executive Long-Distance MPV",
      image: "images/fleet/toyota-crysta.webp",
      desc: "India's unquestioned benchmark for mountain terrain and highway endurance. Equipped with plush ottoman captain loungers, individual climate vents, and high luggage clearance.",
      ratePerKm: "₹18 / km",
      seating: "6+1 Executive Captain",
      luggage: "4 Suitcases + 2 Bags",
      rateNum: 18,
      delhiHaridwarFixed: 5000
    },
    urbania: {
      name: "Force Urbania (16 Pax Ultra-Luxury)",
      category: "VIP Delegation & Wedding Cruiser",
      image: "images/fleet/urbania.png",
      desc: "Next-generation aerodynamic luxury cruiser with 16 individual plush reclining seats, panoramic individual AC vents, sealed quiet cabin, and massive luggage hold.",
      ratePerKm: "₹38 / km",
      seating: "16+1 Executive Pushback",
      luggage: "16 Large Suitcases",
      rateNum: 38,
      delhiHaridwarFixed: 15000
    },
    ertiga: {
      name: "Maruti / Toyota Ertiga (6 Seater)",
      category: "Economical Family MPV",
      image: "images/fleet/toyota-crysta.webp",
      desc: "Affordable and fuel-efficient 6-seater family MPV, ideal for small groups, airport runs, and plains-to-hills trips.",
      ratePerKm: "₹14 / km",
      seating: "6+1 Family Seating",
      luggage: "3 Suitcases + Hand Bags",
      rateNum: 14,
      delhiHaridwarFixed: 4200
    },
    dzire: {
      name: "Maruti Swift Dzire (Executive Sedan)",
      category: "Punctual City & Outstation Sedan",
      image: "images/fleet/swift-dzire.avif",
      desc: "Smooth, silent, fuel-efficient highway sedan for couples and business executives. Chilled air conditioning and immaculate clean boot space.",
      ratePerKm: "₹12 / km",
      seating: "4+1 Sedan Cabin",
      luggage: "2 Medium Bags + 2 Duffels",
      rateNum: 12,
      delhiHaridwarFixed: 3600
    },
    tempo: {
      name: "Force Tempo Traveller (12/17 Luxury)",
      category: "Group & Family Pilgrimage Coach",
      image: "images/fleet/tempo-traveller.jpg",
      desc: "Spacious custom coach tailored for Char Dham yatras and wedding entourages. High ceiling, 1x1 Maharaja pushback recliner seats, and expansive separate luggage rack.",
      ratePerKm: "₹28 / km",
      seating: "12-17 Pushback Seats",
      luggage: "15+ Bags (Dedicated Trunk)",
      rateNum: 28,
      delhiHaridwarFixed: 12000
    },
    hycross: {
      name: "Toyota Innova Hycross Hybrid",
      category: "Luxury Hybrid Lounge",
      image: "images/fleet/innova-hycross.jpg",
      desc: "Ultra-quiet self-charging electric hybrid propulsion with panoramic glass roof, ventilated ottoman seating, and presidential highway poise.",
      ratePerKm: "₹22 / km",
      seating: "6+1 Ottoman Lounge",
      luggage: "4 Large Bags",
      rateNum: 22,
      delhiHaridwarFixed: 6500
    }
  };

  const carPills = document.querySelectorAll('.car-pill-card, .car-selector-pill');
  const stageImg = document.getElementById('stageCarImg');
  const stageCategory = document.getElementById('stageCarCategory');
  const stageTitle = document.getElementById('stageCarTitle');
  const stageDesc = document.getElementById('stageCarDesc');
  const stageRate = document.getElementById('stageCarRate');
  const stageSeating = document.getElementById('stageCarSeating');
  const stageLuggage = document.getElementById('stageCarLuggage');
  const stageBookBtn = document.getElementById('stageBookBtn');

  if (carPills.length > 0) {
    carPills.forEach(pill => {
      pill.addEventListener('click', () => {
        carPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const key = pill.getAttribute('data-car');
        const v = vehicleData[key];
        if (!v) return;

        if (stageImg) stageImg.src = v.image;
        if (stageCategory) stageCategory.textContent = v.category;
        if (stageTitle) stageTitle.textContent = v.name;
        if (stageDesc) stageDesc.textContent = v.desc;
        if (stageRate) stageRate.textContent = v.ratePerKm;
        if (stageSeating) stageSeating.textContent = v.seating;
        if (stageLuggage) stageLuggage.textContent = v.luggage;

        if (stageBookBtn) {
          stageBookBtn.href = `https://wa.me/919876543210?text=Namaste%20Trovenza!%20I%20want%20to%20reserve%20${encodeURIComponent(v.name)}.`;
        }
      });
    });
  }

  // 4. DUAL-MODE LIVE TAXI FARE ESTIMATOR ENGINE
  // Mode Tab Switcher (Fixed Popular Routes vs Custom KM)
  const calcNavTabs = document.querySelectorAll('.calc-nav-tab');
  const calcModePanes = document.querySelectorAll('.calc-mode-pane');

  if (calcNavTabs.length > 0) {
    calcNavTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        calcNavTabs.forEach(t => t.classList.remove('active'));
        calcModePanes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPaneId = tab.getAttribute('data-calc-pane');
        const targetPane = document.getElementById(targetPaneId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  // 10+ Popular Routes Data Matrix
  const popularRoutes = {
    delhi_haridwar: {
      name: "Delhi ⇄ Haridwar / Rishikesh",
      km: 240,
      toll: 480,
      fixed: { dzire: 3600, ertiga: 4200, crysta: 5000, hycross: 6500, tempo: 12000, urbania: 15000 }
    },
    delhi_mussoorie: {
      name: "Delhi ⇄ Mussoorie (Queen of Hills)",
      km: 300,
      toll: 550,
      fixed: { dzire: 4500, ertiga: 5500, crysta: 6800, hycross: 8200, tempo: 14500, urbania: 18500 }
    },
    delhi_nainital: {
      name: "Delhi ⇄ Nainital (Lake City)",
      km: 320,
      toll: 480,
      fixed: { dzire: 4800, ertiga: 5800, crysta: 7200, hycross: 8600, tempo: 15200, urbania: 19200 }
    },
    delhi_agra: {
      name: "Delhi ⇄ Agra (Taj Expressway)",
      km: 210,
      toll: 650,
      fixed: { dzire: 2800, ertiga: 3800, crysta: 4900, hycross: 6200, tempo: 10500, urbania: 14000 }
    },
    delhi_jaipur: {
      name: "Delhi ⇄ Jaipur (Pink City)",
      km: 280,
      toll: 520,
      fixed: { dzire: 3200, ertiga: 4200, crysta: 5500, hycross: 6800, tempo: 11500, urbania: 15500 }
    },
    delhi_dehradun: {
      name: "Delhi ⇄ Dehradun (Expressway)",
      km: 250,
      toll: 490,
      fixed: { dzire: 3500, ertiga: 4200, crysta: 5200, hycross: 6600, tempo: 12000, urbania: 15000 }
    },
    ded_rishikesh: {
      name: "Dehradun Airport (Jolly Grant) ⇄ Rishikesh",
      km: 35,
      toll: 100,
      fixed: { dzire: 1200, ertiga: 1600, crysta: 2200, hycross: 2800, tempo: 4500, urbania: 6500 }
    },
    ded_mussoorie: {
      name: "Dehradun Airport ⇄ Mussoorie",
      km: 60,
      toll: 120,
      fixed: { dzire: 2200, ertiga: 2800, crysta: 3600, hycross: 4400, tempo: 6800, urbania: 9000 }
    },
    haridwar_chopta: {
      name: "Haridwar ⇄ Chopta (Mini Switzerland)",
      km: 210,
      toll: 150,
      fixed: { dzire: 4200, ertiga: 5200, crysta: 6500, hycross: 7800, tempo: 13500, urbania: 17000 }
    },
    haridwar_kedarnath: {
      name: "Haridwar ⇄ Phata / Guptkashi (Kedarnath Base)",
      km: 215,
      toll: 180,
      fixed: { dzire: 4500, ertiga: 5500, crysta: 6800, hycross: 8200, tempo: 14000, urbania: 17500 }
    },
    haridwar_badrinath: {
      name: "Haridwar ⇄ Badrinath Dham",
      km: 320,
      toll: 220,
      fixed: { dzire: 6500, ertiga: 7800, crysta: 9600, hycross: 11500, tempo: 18500, urbania: 24000 }
    }
  };

  // Fixed Route Calculator Handler
  const routeSelect = document.getElementById('calcRouteSelect');
  const carTypeSelect = document.getElementById('calcCarSelect');
  const tripTypeSelect = document.getElementById('calcTripType');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcDistDisplay = document.getElementById('calcDistDisplay');
  const calcTollDisplay = document.getElementById('calcTollDisplay');
  const calcDriverDisplay = document.getElementById('calcDriverDisplay');
  const calcBookWaBtn = document.getElementById('calcBookWaBtn');

  const updateFixedFareCalc = () => {
    if (!routeSelect || !carTypeSelect) return;
    const routeKey = routeSelect.value;
    const carKey = carTypeSelect.value;
    const tripType = tripTypeSelect ? tripTypeSelect.value : 'oneway';

    const r = popularRoutes[routeKey] || popularRoutes.delhi_haridwar;
    const v = vehicleData[carKey] || vehicleData.crysta;

    let baseFare = (r.fixed && r.fixed[carKey]) ? r.fixed[carKey] : (r.km * v.rateNum + r.toll + 400);
    let totalFare = baseFare;
    let distanceLabel = `${r.km} km (One-Way)`;
    let tripTypeName = "One-Way Drop";

    if (tripType === 'roundtrip') {
      tripTypeName = "Round-Trip (2 Days)";
      totalFare = Math.round(baseFare * 1.85); // round trip package pricing with driver allowance
      distanceLabel = `${r.km * 2} km (Round-Trip Circuit)`;
    }

    if (calcPriceDisplay) calcPriceDisplay.textContent = `₹${totalFare.toLocaleString('en-IN')}`;
    if (calcDistDisplay) calcDistDisplay.textContent = distanceLabel;
    if (calcTollDisplay) calcTollDisplay.textContent = (routeKey === 'delhi_haridwar' && tripType === 'oneway') ? 'Included in Fixed Fare' : `₹${r.toll} Included`;
    if (calcDriverDisplay) calcDriverDisplay.textContent = 'Included (Day Allowance)';

    if (calcBookWaBtn) {
      const msg = `Namaste Trovenza! 🚖 Instant Fare Quote Inquiry:%0A` +
        `• Route: ${r.name}%0A` +
        `• Trip Type: ${tripTypeName}%0A` +
        `• Vehicle: ${v.name} (${v.seating})%0A` +
        `• Estimated Fixed Tariff: ₹${totalFare.toLocaleString('en-IN')}%0A` +
        `• Distance: ${distanceLabel}%0A` +
        `Please confirm vehicle availability and driver details.`;
      calcBookWaBtn.href = `https://wa.me/919876543210?text=${msg}`;
    }
  };

  if (routeSelect && carTypeSelect) {
    routeSelect.addEventListener('change', updateFixedFareCalc);
    carTypeSelect.addEventListener('change', updateFixedFareCalc);
    if (tripTypeSelect) tripTypeSelect.addEventListener('change', updateFixedFareCalc);
    updateFixedFareCalc();
  }

  // Custom KM Trip Estimator Handler
  const customKmInput = document.getElementById('customKmInput');
  const customTripType = document.getElementById('customTripType');
  const customCarSelect = document.getElementById('customCarSelect');
  const customDaysInput = document.getElementById('customDaysInput');
  const customPriceDisplay = document.getElementById('customPriceDisplay');
  const customDistDisplay = document.getElementById('customDistDisplay');
  const customRateDisplay = document.getElementById('customRateDisplay');
  const customDriverDisplay = document.getElementById('customDriverDisplay');
  const customTollDisplay = document.getElementById('customTollDisplay');
  const customBookWaBtn = document.getElementById('customBookWaBtn');
  const kmPresetButtons = document.querySelectorAll('.km-preset-btn');

  const updateCustomKmCalc = () => {
    if (!customKmInput || !customCarSelect) return;
    const km = Math.max(20, parseInt(customKmInput.value) || 150);
    const carKey = customCarSelect.value;
    const tripType = customTripType ? customTripType.value : 'oneway';
    const days = Math.max(1, parseInt(customDaysInput ? customDaysInput.value : 1) || 1);

    const v = vehicleData[carKey] || vehicleData.crysta;
    let billedKm = km;
    let driverAllowance = 400 * days;
    let estimatedTolls = Math.round(km * 1.5);
    let tripTypeName = "One-Way Custom Trip";

    if (tripType === 'roundtrip') {
      tripTypeName = `Round-Trip (${days} Day${days > 1 ? 's' : ''})`;
      // Standard outstation round-trip rule: minimum 250 km per day or 2x distance
      billedKm = Math.max(km * 2, days * 250);
      estimatedTolls = Math.round(km * 2.2);
    }

    const vehicleBaseCost = billedKm * v.rateNum;
    const grandTotal = vehicleBaseCost + driverAllowance + estimatedTolls;

    if (customPriceDisplay) customPriceDisplay.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    if (customDistDisplay) customDistDisplay.textContent = `${billedKm} km (Billed)`;
    if (customRateDisplay) customRateDisplay.textContent = `₹${v.rateNum} / km`;
    if (customDriverDisplay) customDriverDisplay.textContent = `₹${driverAllowance} (${days} Day${days > 1 ? 's' : ''})`;
    if (customTollDisplay) customTollDisplay.textContent = `₹${estimatedTolls} (Est. Toll/Tax)`;

    if (customBookWaBtn) {
      const msg = `Namaste Trovenza! 📏 Custom KM Fare Estimate Inquiry:%0A` +
        `• Type: ${tripTypeName}%0A` +
        `• Est. Distance: ${km} km (Billed: ${billedKm} km)%0A` +
        `• Vehicle: ${v.name} (Rate: ₹${v.rateNum}/km)%0A` +
        `• Driver Allowance: ₹${driverAllowance}%0A` +
        `• Estimated Tolls: ₹${estimatedTolls}%0A` +
        `• Total Estimated Quote: ₹${grandTotal.toLocaleString('en-IN')}%0A` +
        `Please confirm booking.`;
      customBookWaBtn.href = `https://wa.me/919876543210?text=${msg}`;
    }
  };

  if (customKmInput && customCarSelect) {
    customKmInput.addEventListener('input', updateCustomKmCalc);
    customCarSelect.addEventListener('change', updateCustomKmCalc);
    if (customTripType) customTripType.addEventListener('change', updateCustomKmCalc);
    if (customDaysInput) customDaysInput.addEventListener('input', updateCustomKmCalc);

    kmPresetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const addKm = parseInt(btn.getAttribute('data-km'));
        if (btn.hasAttribute('data-set-km')) {
          customKmInput.value = addKm;
        } else {
          customKmInput.value = (parseInt(customKmInput.value) || 0) + addKm;
        }
        updateCustomKmCalc();
      });
    });

    updateCustomKmCalc();
  }

  // 5. Hero Console Forms Dispatcher (WhatsApp)
  const heroTaxiForm = document.getElementById('heroTaxiForm');
  if (heroTaxiForm) {
    heroTaxiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pickup = document.getElementById('heroTaxiPickup')?.value || '';
      const drop = document.getElementById('heroTaxiDrop')?.value || '';
      const vehicle = document.getElementById('heroTaxiVehicle')?.value || '';
      const date = document.getElementById('heroTaxiDate')?.value || '';

      const msg = `Namaste Trovenza! 🚖 Instant Taxi Dispatch Request:%0A` +
        `• Pickup: ${pickup}%0A` +
        `• Destination: ${drop}%0A` +
        `• Vehicle: ${vehicle}%0A` +
        `• Travel Date: ${date}%0A` +
        `Please send nearest driver details and confirmed quote.`;
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    });
  }

  const heroYatraForm = document.getElementById('heroYatraForm');
  if (heroYatraForm) {
    heroYatraForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const circuit = document.getElementById('heroYatraCircuit')?.value || '';
      const guests = document.getElementById('heroYatraGuests')?.value || '';
      const month = document.getElementById('heroYatraMonth')?.value || '';

      const msg = `Namaste Trovenza! 🕉️ 2026 Char Dham Registration Inquiry:%0A` +
        `• Selected Circuit: ${circuit}%0A` +
        `• Number of Pilgrims: ${guests}%0A` +
        `• Month: ${month}%0A` +
        `Please send full day-by-day itinerary and helicopter availability.`;
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    });
  }

  const heroGovtForm = document.getElementById('heroGovtForm');
  if (heroGovtForm) {
    heroGovtForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const org = document.getElementById('heroGovtOrg')?.value || '';
      const fleet = document.getElementById('heroGovtFleet')?.value || '';
      const duration = document.getElementById('heroGovtDuration')?.value || '';

      const msg = `Namaste Trovenza Institutional Directorate! 🏛️ Vehicle Tender RFP:%0A` +
        `• Procuring Entity: ${org}%0A` +
        `• Fleet Category: ${fleet}%0A` +
        `• Contract Duration: ${duration}%0A` +
        `Please share GeM vendor compliance profile and rate sheet.`;
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    });
  }

  // 6. Animated Counter Numbers
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseFloat(entry.target.getAttribute('data-counter-target'));
          const suffix = entry.target.getAttribute('data-counter-suffix') || '';
          let count = 0;
          const step = target / 40;

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              entry.target.textContent = target + suffix;
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.floor(count) + suffix;
            }
          }, 35);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => observer.observe(el));
  }

  // 7. Travel Packages Category Filter
  const pkgFilterPills = document.querySelectorAll('.pkg-filter-pill');
  const pkgCards = document.querySelectorAll('.travel-pkg-card');

  if (pkgFilterPills.length > 0 && pkgCards.length > 0) {
    pkgFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const targetCategory = pill.getAttribute('data-pkg-filter');

        // Update active pill styling
        pkgFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Filter cards with smooth fade
        pkgCards.forEach(card => {
          const cardCat = card.getAttribute('data-pkg-category');
          if (targetCategory === 'all' || cardCat === targetCategory) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.35s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question-btn');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isCurrentlyActive = item.classList.contains('active');
          // Collapse others for clean accordion feel
          faqItems.forEach(other => {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          });

          if (!isCurrentlyActive) {
            item.classList.add('active');
            questionBtn.setAttribute('aria-expanded', 'true');
          } else {
            questionBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  // 9. Triyuginarayan Wedding Menu Tabs
  const weddingMenuBtns = document.querySelectorAll('.wedding-menu-pill-btn');
  const weddingMenuPanes = document.querySelectorAll('.wedding-menu-pane');

  if (weddingMenuBtns.length > 0 && weddingMenuPanes.length > 0) {
    weddingMenuBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        weddingMenuBtns.forEach(b => b.classList.remove('active'));
        weddingMenuPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetMenuId = btn.getAttribute('data-menu-pane');
        const targetPane = document.getElementById(targetMenuId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

});
