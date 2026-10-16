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
});
