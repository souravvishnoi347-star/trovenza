/**
 * JAI MAA TOUR & TRAVELS - INTERACTIVE SCRIPT
 * Handles WhatsApp Inquiry Dispatch and Day-by-Day Modal Itineraries
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. WhatsApp Inquiry Dispatch
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tour = document.getElementById('tourSelect').value;
      const name = document.getElementById('custName').value;
      const phone = document.getElementById('custPhone').value;
      const persons = document.getElementById('custPersons').value;
      const month = document.getElementById('custMonth').value;

      const message = `Namaste Jai Maa Tour & Travels! 🚩%0A%0A` +
        `*New Website Tour Inquiry (12 Year Portal)*%0A` +
        `• *Package:* ${tour}%0A` +
        `• *Client Name:* ${name}%0A` +
        `• *Phone:* ${phone}%0A` +
        `• *Number of Persons:* ${persons}%0A` +
        `• *Travel Month:* ${month}%0A%0A` +
        `Please send full day-by-day itinerary and best discounted quote.`;

      window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    });
  }

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  // FAQ Accordion
  initFaqAccordion();

  // Fare Estimator
  initFareEstimator();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});


// Itineraries Data
const itineraries = {
  chardham: `
    <h3 style="font-family:'Outfit',sans-serif; color:#0F172A; margin-bottom:0.75rem; font-size:1.45rem;">Maha Char Dham Yatra (10 Days / 9 Nights)</h3>
    <p style="color:#64748B; font-size:0.9rem; margin-bottom:1.5rem;">Standard / Deluxe Haridwar Departure Circuit</p>
    
    <div style="display:flex; flex-direction:column; gap:1rem; font-size:0.9rem;">
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 1:</strong> Haridwar to Barkot via Mussoorie / Kempty Falls (220 km / 7-8 hrs). Overnight at Barkot.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 2:</strong> Barkot to Yamunotri Dham Darshan (Janki Chatti trek 6 km) & return. Overnight at Barkot.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 3:</strong> Barkot to Uttarkashi (100 km / 4 hrs). Visit Kashi Vishwanath Temple Uttarkashi.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 4:</strong> Uttarkashi to Gangotri Dham Darshan & return via Harsil Valley. Overnight at Uttarkashi.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 5:</strong> Uttarkashi to Guptkashi / Sitapur (220 km / 8 hrs). Mandatory biometric check.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 6:</strong> Guptkashi to Kedarnath Dham (Helicopter / 16 km trek from Sonprayag). Evening Aarti & Night Stay at Kedarnath.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 7:</strong> Kedarnath Morning Darshan to Guptkashi / Chopta descent. Overnight stay.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 8:</strong> Guptkashi to Badrinath Dham via Joshimath (190 km / 7 hrs). Evening Aarti & Tapt Kund snan.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 9:</strong> Badrinath Darshan, Mana Village (Vyas Gufa, Bhim Pul) to Rudraprayag / Srinagar.
      </div>
      <div style="border-left:3px solid #D97706; padding-left:1rem;">
        <strong>Day 10:</strong> Rudraprayag to Haridwar / Rishikesh drop via Devprayag Sangam. Tour ends with divine blessings.
      </div>
    </div>

    <div style="margin-top:2rem; text-align:center;">
      <a href="https://wa.me/919876543210?text=Namaste!%20Please%20send%20PDF%20brochure%20for%2010D9N%20Char%20Dham." target="_blank" class="btn-submit" style="display:inline-flex; width:auto; padding:0.75rem 2rem;">
        Download Detailed PDF via WhatsApp
      </a>
    </div>
  `,

  dodham: `
    <h3 style="font-family:'Outfit',sans-serif; color:#0F172A; margin-bottom:0.75rem; font-size:1.45rem;">Sacred Do Dham (Kedarnath & Badrinath - 5 Days / 4 Nights)</h3>
    <p style="color:#64748B; font-size:0.9rem; margin-bottom:1.5rem;">Shiva-Vishnu Express Pilgrimage</p>
    
    <div style="display:flex; flex-direction:column; gap:1rem; font-size:0.9rem;">
      <div style="border-left:3px solid #0284C7; padding-left:1rem;">
        <strong>Day 1:</strong> Haridwar / Dehradun to Guptkashi / Phata base. Overnight hotel stay.
      </div>
      <div style="border-left:3px solid #0284C7; padding-left:1rem;">
        <strong>Day 2:</strong> Guptkashi to Kedarnath Dham (Helipad / Trek). VIP Darshan, evening aarti & stay at Top.
      </div>
      <div style="border-left:3px solid #0284C7; padding-left:1rem;">
        <strong>Day 3:</strong> Kedarnath to Guptkashi descent, then drive to Pipalkoti / Joshimath.
      </div>
      <div style="border-left:3px solid #0284C7; padding-left:1rem;">
        <strong>Day 4:</strong> Drive to Sri Badrinath Dham, Darshan, Mana Village sightseeing & drive to Srinagar.
      </div>
      <div style="border-left:3px solid #0284C7; padding-left:1rem;">
        <strong>Day 5:</strong> Srinagar to Rishikesh / Haridwar drop with Devprayag & Ram Jhula visit.
      </div>
    </div>

    <div style="margin-top:2rem; text-align:center;">
      <a href="https://wa.me/919876543210?text=Namaste!%20Please%20send%20PDF%20brochure%20for%205D4N%20Do%20Dham." target="_blank" class="btn-submit" style="display:inline-flex; width:auto; padding:0.75rem 2rem;">
        Book Do Dham on WhatsApp
      </a>
    </div>
  `,

  heli: `
    <h3 style="font-family:'Outfit',sans-serif; color:#0F172A; margin-bottom:0.75rem; font-size:1.45rem;">Kedarnath Heli & VIP Darshan (3 Days / 2 Nights)</h3>
    <p style="color:#64748B; font-size:0.9rem; margin-bottom:1.5rem;">Comfortable express package with zero strenuous trekking</p>
    
    <div style="display:flex; flex-direction:column; gap:1rem; font-size:0.9rem;">
      <div style="border-left:3px solid #DC2626; padding-left:1rem;">
        <strong>Day 1:</strong> Dehradun Airport (Jolly Grant) / Haridwar pickup in Innova Crysta, drive to luxury resort at Phata / Sersi.
      </div>
      <div style="border-left:3px solid #DC2626; padding-left:1rem;">
        <strong>Day 2:</strong> Early morning helicopter flight to Kedarnath helipad (8 mins flight). Priority Sugam Darshan pass, puja rituals, and return heli flight or night cottage stay.
      </div>
      <div style="border-left:3px solid #DC2626; padding-left:1rem;">
        <strong>Day 3:</strong> Relaxed return drive to Dehradun Airport or Haridwar Railway Station.
      </div>
    </div>

    <div style="margin-top:2rem; text-align:center;">
      <a href="https://wa.me/919876543210?text=Namaste!%20Please%20check%20Helicopter%20slots%20for%20Kedarnath." target="_blank" class="btn-submit" style="display:inline-flex; width:auto; padding:0.75rem 2rem;">
        Check Slot Availability on WhatsApp
      </a>
    </div>
  `
};

function openDetailsModal(key) {
  const modal = document.getElementById('itineraryModal');
  const content = document.getElementById('modalContent');
  if (modal && content && itineraries[key]) {
    content.innerHTML = itineraries[key];
    modal.classList.add('active');
  }
}

function closeDetailsModal() {
  const modal = document.getElementById('itineraryModal');
  if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('itineraryModal');
  if (e.target === modal) {
    modal.classList.remove('active');
  }
  const policyModal = document.getElementById('policyModal');
  if (e.target === policyModal) {
    policyModal.classList.remove('active');
  }
});

function openPolicyModal() {
  const modal = document.getElementById('policyModal');
  if (modal) modal.classList.add('active');
}

function closePolicyModal() {
  const modal = document.getElementById('policyModal');
  if (modal) modal.classList.remove('active');
}

// Interactive FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!isAlreadyActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Comprehensive Uttarakhand & Delhi Circuit Fare Estimator Database
const fareDatabase = {
  "delhi-haridwar-oneway": {
    name: "Delhi ➔ Haridwar / Rishikesh (One-Way)",
    distance: "220 km (approx. 4.5 hrs via Meerut Expressway)",
    rates: {
      dzire: { price: "₹3,600", desc: "Maruti Swift Dzire • 4 Passengers • AC Sedan • Highway Tolls Included" },
      ertiga: { price: "₹4,200", desc: "Maruti / Toyota Ertiga • 6 Passengers • Family MPV • Extra Luggage" },
      crysta: { price: "₹5,000", desc: "Toyota Innova Crysta • 6/7 Passengers • Executive Captain Loungers" },
      urbania: { price: "₹15,000", desc: "Force Urbania 16 Pax Luxury • VIP Pushback Recliners • Monocoque Quiet Ride" },
      tempo: { price: "₹12,000", desc: "Force Tempo Traveller • 17 Pushback Seats • Large Dedicated Boot" }
    }
  },
  "delhi-haridwar-round": {
    name: "Delhi ⇄ Haridwar / Rishikesh (Same Day Round Trip)",
    distance: "450 km (Same Day Ganga Aarti Return)",
    rates: {
      dzire: { price: "₹5,500", desc: "Maruti Swift Dzire • 4 Passengers • Fuel & Driver DA Included" },
      ertiga: { price: "₹6,800", desc: "Maruti / Toyota Ertiga • 6 Passengers • Economical Family Ride" },
      crysta: { price: "₹8,200", desc: "Toyota Innova Crysta • 6/7 Passengers • Supreme Luxury Comfort" },
      urbania: { price: "₹22,000", desc: "Force Urbania 16 Pax Luxury • Corporate & Large Family VIP Travel" },
      tempo: { price: "₹17,500", desc: "Force Tempo Traveller • 17 Passengers • Dedicated Coach" }
    }
  },
  "haridwar-kedarnath-round": {
    name: "Haridwar ⇄ Sonprayag / Phata (Kedarnath Base) (4 Days)",
    distance: "500 km Mountain Circuit • 4 Days / 3 Nights",
    rates: {
      dzire: { price: "₹14,000", desc: "Maruti Dzire • Hill Certified Driver • Green Tax & Tolls Included" },
      ertiga: { price: "₹18,000", desc: "Maruti / Toyota Ertiga • 6 Pax • High Hill Ground Clearance" },
      crysta: { price: "₹24,000", desc: "Toyota Innova Crysta • King of Himalayan Roads • Senior Friendly" },
      urbania: { price: "₹55,000", desc: "Force Urbania 16 Pax Luxury • Monocoque Coil Suspension • Panoramic View" },
      tempo: { price: "₹42,000", desc: "Force Tempo Traveller • 17 Pax • Large Luggage Hold" }
    }
  },
  "haridwar-badrinath-round": {
    name: "Haridwar ⇄ Sri Badrinath Dham (4 Days)",
    distance: "640 km Himalayan Highway • 4 Days / 3 Nights",
    rates: {
      dzire: { price: "₹15,500", desc: "Maruti Dzire • Joshimath & Mana Village Sightseeing" },
      ertiga: { price: "₹19,500", desc: "Maruti / Toyota Ertiga • 6 Pax • Complete Mountain Route" },
      crysta: { price: "₹26,000", desc: "Toyota Innova Crysta • Deluxe Reclining Captain Loungers" },
      urbania: { price: "₹58,000", desc: "Force Urbania 16 Pax Luxury • Aircraft-Style AC & Reading Lights" },
      tempo: { price: "₹45,000", desc: "Force Tempo Traveller • 17 Pax • Group Pilgrimage Coach" }
    }
  },
  "haridwar-dodham-round": {
    name: "Haridwar ⇄ Do Dham (Kedarnath + Badrinath) (5 Days)",
    distance: "750 km High Altitude Circuit • 5 Days / 4 Nights",
    rates: {
      dzire: { price: "₹19,500", desc: "Maruti Dzire • Complete Shiva & Vishnu Pilgrimage" },
      ertiga: { price: "₹24,500", desc: "Maruti / Toyota Ertiga • 6 Pax • Tested Mountain Driver" },
      crysta: { price: "₹32,000", desc: "Toyota Innova Crysta • Unmatched Comfort for Parents" },
      urbania: { price: "₹72,000", desc: "Force Urbania 16 Pax Luxury • Premier Himalayan Commuter" },
      tempo: { price: "₹56,000", desc: "Force Tempo Traveller • 17 Pax • Large Luggage Space" }
    }
  },
  "haridwar-chardham-round": {
    name: "Haridwar ⇄ Maha Char Dham Yatra (10 Days)",
    distance: "1,600 km Complete Sacred Circuit • 10 Days / 9 Nights",
    rates: {
      dzire: { price: "₹38,000", desc: "Maruti Dzire • All 4 Shrines Covered • Driver Allowance Included" },
      ertiga: { price: "₹48,000", desc: "Maruti / Toyota Ertiga • 6 Pax • 10 Days Dedicated Taxi" },
      crysta: { price: "₹62,000", desc: "Toyota Innova Crysta • 6/7 Pax • Top Rated Yatra Ride" },
      urbania: { price: "₹1,45,000", desc: "Force Urbania 16 Pax Luxury • Flagship Ultra-Luxury Experience" },
      tempo: { price: "₹1,10,000", desc: "Force Tempo Traveller • 17 Pax • Custom Maharaja Coach" }
    }
  },
  "haridwar-triyugi-wedding": {
    name: "Haridwar ⇄ Triyuginarayan Temple Wedding Transit (3 Days)",
    distance: "520 km Wedding Transit • 3 Days / 2 Nights",
    rates: {
      dzire: { price: "₹12,500", desc: "Maruti Dzire • Bride & Groom Private Sedan" },
      ertiga: { price: "₹15,500", desc: "Maruti / Toyota Ertiga • 6 Pax • Family Wedding Taxi" },
      crysta: { price: "₹21,000", desc: "Toyota Innova Crysta • VVIP Family Lounge" },
      urbania: { price: "₹48,000", desc: "Force Urbania 16 Pax Luxury • Flagship Baraat Luxury Cruiser" },
      tempo: { price: "₹36,000", desc: "Force Tempo Traveller • 17 Pax • Baraat Transit Coach" }
    }
  },
  "delhi-mussoorie-round": {
    name: "Delhi ⇄ Dehradun & Mussoorie Weekend (3 Days)",
    distance: "600 km Hill Station Route • 3 Days / 2 Nights",
    rates: {
      dzire: { price: "₹11,500", desc: "Maruti Dzire • Kempty Falls & Mall Road Sightseeing" },
      ertiga: { price: "₹14,000", desc: "Maruti / Toyota Ertiga • 6 Pax • Family Mountain Ride" },
      crysta: { price: "₹18,500", desc: "Toyota Innova Crysta • Executive Mountain Comfort" },
      urbania: { price: "₹42,000", desc: "Force Urbania 16 Pax Luxury • Corporate & Group Weekend Tour" },
      tempo: { price: "₹32,000", desc: "Force Tempo Traveller • 17 Pax • Group Hill Holiday" }
    }
  }
};

function initFareEstimator() {
  const circuitSelect = document.getElementById('calcCircuit');
  const vehicleSelect = document.getElementById('calcVehicle');
  const priceDisplay = document.getElementById('calcPrice');
  const descDisplay = document.getElementById('calcDesc');
  const routeDisplay = document.getElementById('calcRouteTitle');
  const bookBtn = document.getElementById('calcBookBtn');

  if (!circuitSelect || !vehicleSelect || !priceDisplay || !descDisplay || !bookBtn) return;

  function updateFare() {
    const circuitKey = circuitSelect.value;
    const vehicleKey = vehicleSelect.value;
    const circuitData = fareDatabase[circuitKey];

    if (circuitData && circuitData.rates[vehicleKey]) {
      const rateInfo = circuitData.rates[vehicleKey];
      priceDisplay.textContent = rateInfo.price;
      descDisplay.textContent = rateInfo.desc;
      if (routeDisplay) {
        routeDisplay.textContent = `${circuitData.name} • ${circuitData.distance}`;
      }
      const vehicleNames = {
        dzire: "Maruti Swift Dzire (4 Pax Sedan)",
        ertiga: "Maruti / Toyota Ertiga (6 Pax MPV)",
        crysta: "Toyota Innova Crysta (6/7 Pax Luxury)",
        urbania: "Force Urbania (16 Pax Luxury Van)",
        tempo: "Force Tempo Traveller (17 Pax Coach)"
      };
      const vName = vehicleNames[vehicleKey] || vehicleKey;
      const waText = encodeURIComponent(
        `Namaste Jai Maa Tour & Travels! 🚖\n\n` +
        `*Taxi & Yatra Fare Inquiry*\n` +
        `• *Selected Circuit:* ${circuitData.name}\n` +
        `• *Vehicle Chosen:* ${vName}\n` +
        `• *Estimated Tariff:* ${rateInfo.price}\n\n` +
        `Please confirm vehicle availability, pickup schedule, and advance booking steps.`
      );
      bookBtn.href = `https://wa.me/919876543210?text=${waText}`;
    }
  }

  circuitSelect.addEventListener('change', updateFare);
  vehicleSelect.addEventListener('change', updateFare);
  updateFare();
}
