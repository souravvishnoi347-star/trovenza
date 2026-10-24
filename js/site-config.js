/**
 * TROVENZA GROUP & JAI MAA TRAVELS - CENTRAL SITE CONFIGURATION & REALTIME BRIDGE
 * This module manages site-wide dynamic settings editable via the Client Admin Panel (/admin).
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
      // Fixed Delhi to Haridwar One-Way Drops (INR)
      delhiHaridwar: {
        dzire: 3600,
        ertiga: 4200,
        crysta: 5000,
        tempo: 12000,
        urbania: 15000
      },
      // Per Kilometer Rates (INR / km)
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
        badge: "POPULAR",
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
        badge: "BESTSELLER",
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
        badge: "ADVENTURE",
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
        badge: "WEEKENDER",
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
        badge: "SPIRITUAL EXPEDITION",
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
        badge: "DIVINE TEMPLE TRAIL",
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
        badge: "TREK SPECIAL",
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
        badge: "SNOW & SKI",
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
        badge: "CHAR DHAM 2026",
        url: "chardham-yatra.html",
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

  // 2. RETRIEVE CURRENT CONFIGURATION
  function getConfig() {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read site config from localStorage:', e);
    }
    return DEFAULT_CONFIG;
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

  // 5. CAPTURE CUSTOMER INQUIRY / LEAD
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
        status: 'New', // New, Contacted, Converted, Closed
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

  // 6. DOM HYDRATION BRIDGE
  // Dynamically updates DOM elements if they have data-config bindings
  function applyConfigToDOM(config) {
    if (!config) config = getConfig();

    // Update phone numbers
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

    // Update Haridwar address
    if (config.company?.haridwarAddress) {
      document.querySelectorAll('[data-bind="company-address"]').forEach(el => {
        el.textContent = config.company.haridwarAddress;
      });
    }

    // Update WhatsApp links
    if (config.company?.whatsappNumber) {
      document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
        const currentHref = a.getAttribute('href');
        const textParam = currentHref.includes('?text=') ? currentHref.substring(currentHref.indexOf('?text=')) : '';
        a.setAttribute('href', 'https://wa.me/' + config.company.whatsappNumber + textParam);
      });
    }

    // Update Taxi Fare Display in Simulator
    if (config.fares?.delhiHaridwar && window.vehicleData) {
      if (window.vehicleData.dzire) {
        window.vehicleData.dzire.delhiHaridwarFixed = config.fares.delhiHaridwar.dzire;
        window.vehicleData.dzire.rateNum = config.fares.perKm.dzire;
        window.vehicleData.dzire.ratePerKm = '₹' + config.fares.perKm.dzire + ' / km';
      }
      if (window.vehicleData.ertiga) {
        window.vehicleData.ertiga.delhiHaridwarFixed = config.fares.delhiHaridwar.ertiga;
        window.vehicleData.ertiga.rateNum = config.fares.perKm.ertiga;
        window.vehicleData.ertiga.ratePerKm = '₹' + config.fares.perKm.ertiga + ' / km';
      }
      if (window.vehicleData.crysta) {
        window.vehicleData.crysta.delhiHaridwarFixed = config.fares.delhiHaridwar.crysta;
        window.vehicleData.crysta.rateNum = config.fares.perKm.crysta;
        window.vehicleData.crysta.ratePerKm = '₹' + config.fares.perKm.crysta + ' / km';
      }
      if (window.vehicleData.tempo) {
        window.vehicleData.tempo.delhiHaridwarFixed = config.fares.delhiHaridwar.tempo;
        window.vehicleData.tempo.rateNum = config.fares.perKm.tempo;
        window.vehicleData.tempo.ratePerKm = '₹' + config.fares.perKm.tempo + ' / km';
      }
      if (window.vehicleData.urbania) {
        window.vehicleData.urbania.delhiHaridwarFixed = config.fares.delhiHaridwar.urbania;
        window.vehicleData.urbania.rateNum = config.fares.perKm.urbania;
        window.vehicleData.urbania.ratePerKm = '₹' + config.fares.perKm.urbania + ' / km';
      }
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
    recordLead,
    getLeads,
    updateLeadStatus,
    deleteLead,
    applyConfigToDOM
  };

})();
