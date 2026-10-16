/**
 * TROVENZA GROUP - CRISP WHITE TRAVEL PORTAL INTERACTIVE LOGIC
 * Features:
 * 1. Interactive 3D/HD Fleet Simulator with Live Route Fare Engine
 * 2. Multi-Service Hero Tab & Mode Controller
 * 3. Pre-filled WhatsApp Dispatch Routing
 * 4. Animated Counters & Mobile Drawer
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
      image: "images/fleet/tempo-traveller.jpg",
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

  // 4. Interactive Live Route Fare Estimator Engine
  const routeSelect = document.getElementById('calcRouteSelect');
  const carTypeSelect = document.getElementById('calcCarSelect');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcDistDisplay = document.getElementById('calcDistDisplay');
  const calcTollDisplay = document.getElementById('calcTollDisplay');
  const calcBookWaBtn = document.getElementById('calcBookWaBtn');

  const routes = {
    delhi_haridwar: { name: "Delhi ⇄ Haridwar / Rishikesh", km: 240, toll: 480 },
    delhi_agra:     { name: "Delhi ⇄ Agra (Taj Expressway)", km: 210, toll: 650 },
    delhi_jaipur:   { name: "Delhi ⇄ Jaipur (Pink City)", km: 280, toll: 520 },
    delhi_dehradun: { name: "Delhi ⇄ Dehradun (Expressway)", km: 250, toll: 490 },
    ded_rishikesh:  { name: "Dehradun Airport ⇄ Rishikesh", km: 35,  toll: 100 }
  };

  const updateFareCalc = () => {
    if (!routeSelect || !carTypeSelect) return;
    const selectedRouteKey = routeSelect.value;
    const selectedCarKey = carTypeSelect.value;

    const r = routes[selectedRouteKey] || routes.delhi_haridwar;
    const v = vehicleData[selectedCarKey] || vehicleData.crysta;

    let totalEst = 0;
    if (selectedRouteKey === 'delhi_haridwar' && v.delhiHaridwarFixed) {
      totalEst = v.delhiHaridwarFixed;
    } else {
      const baseFare = r.km * v.rateNum;
      const driverAllowance = 400;
      totalEst = baseFare + r.toll + driverAllowance;
    }

    if (calcPriceDisplay) calcPriceDisplay.textContent = `₹${totalEst.toLocaleString('en-IN')}`;
    if (calcDistDisplay) calcDistDisplay.textContent = `Approx. ${r.km} km (${r.name})`;
    if (calcTollDisplay) calcTollDisplay.textContent = selectedRouteKey === 'delhi_haridwar' ? 'Toll extra at actuals' : `₹${r.toll}`;

    if (calcBookWaBtn) {
      const msg = `Namaste Trovenza! 🚖 Fare Calculation Inquiry:%0A` +
        `• Route: ${r.name}%0A` +
        `• Vehicle: ${v.name}%0A` +
        `• Estimated Fare: ₹${totalEst}%0A` +
        `Please confirm driver allotment.`;
      calcBookWaBtn.href = `https://wa.me/919876543210?text=${msg}`;
    }
  };

  if (routeSelect && carTypeSelect) {
    routeSelect.addEventListener('change', updateFareCalc);
    carTypeSelect.addEventListener('change', updateFareCalc);
    updateFareCalc(); // Initial run
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

});

