/**
 * SMART WHATSAPP AUTO-CONCIERGE & LEAD CAPTURE
 * Generates automated interactive routing for travelers before sending to WhatsApp.
 */
(function () {
  const CONCIERGE_HTML = `
  <div id="waConciergeModal" style="display:none; position:fixed; bottom:95px; right:25px; width:340px; max-width:90vw; background:#FFFFFF; border-radius:16px; box-shadow:0 12px 35px rgba(0,0,0,0.22); border:1px solid #E2E8F0; z-index:999999; overflow:hidden; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; animation:slideUpWa 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg, #0A192F 0%, #1E293B 100%); color:#FFFFFF; padding:1rem 1.15rem; display:flex; align-items:center; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:0.65rem;">
        <div style="position:relative;">
          <img src="images/logo.png" onerror="this.src='../images/logo.png'" style="width:38px; height:38px; border-radius:50%; border:2px solid #D97706; background:#FFFFFF; object-fit:contain;" alt="Support Desk">
          <span style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:#10B981; border:2px solid #FFFFFF; border-radius:50%;"></span>
        </div>
        <div>
          <div style="font-weight:700; font-size:0.92rem; color:#FFFFFF;">Haridwar Yatra Concierge</div>
          <div style="font-size:0.74rem; color:#94A3B8;">Led by Founder Trilok Rana • Active Now</div>
        </div>
      </div>
      <button type="button" id="closeWaConciergeBtn" style="background:none; border:none; color:#94A3B8; font-size:1.3rem; cursor:pointer; padding:0; line-height:1;">&times;</button>
    </div>

    <!-- Body -->
    <div style="padding:1rem 1.15rem; max-height:360px; overflow-y:auto; background:#F8FAFC;">
      <!-- Step 1: Greeting -->
      <div style="background:#FFFFFF; border-radius:12px; padding:0.85rem; box-shadow:0 1px 3px rgba(0,0,0,0.06); margin-bottom:0.85rem; font-size:0.86rem; color:#1E293B; line-height:1.5;">
        🙏 <strong>Namaste!</strong> Welcome to our direct Haridwar travel desk. Select your requirement for instant tailored quote:
      </div>

      <!-- Quick Option Buttons -->
      <div id="waConciergeStep1" style="display:flex; flex-direction:column; gap:0.5rem;">
        <button type="button" class="wa-opt-btn" data-intent="Kedarnath VIP Helicopter Charter">
          🚁 Kedarnath Heli & VIP Darshan (2N/3D)
        </button>
        <button type="button" class="wa-opt-btn" data-intent="Char Dham Yatra 2026 Package">
          🛕 Char Dham Yatra Complete Circuit (9N/10D)
        </button>
        <button type="button" class="wa-opt-btn" data-intent="Haridwar to Delhi Cab / Outstation Taxi">
          🚕 Delhi-Haridwar Taxi & Mountain Fleet
        </button>
        <button type="button" class="wa-opt-btn" data-intent="Triyuginarayan Vedic Destination Wedding">
          💒 Triyuginarayan Temple Destination Wedding
        </button>
        <button type="button" class="wa-opt-btn" data-intent="Direct Inquiry for Founder Trilok Rana">
          👤 Direct Connect with Founder Trilok Rana
        </button>
      </div>

      <!-- Step 2: Pax selection (Hidden initially) -->
      <div id="waConciergeStep2" style="display:none;">
        <div style="font-size:0.82rem; font-weight:700; color:#0A192F; margin-bottom:0.5rem;" id="waStep2Title">
          How many travelers / passengers?
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; margin-bottom:0.85rem;">
          <button type="button" class="wa-pax-btn" data-pax="1-2 Pax (Couples / Solo)">1 - 2 Persons</button>
          <button type="button" class="wa-pax-btn" data-pax="3-4 Pax (Small Family)">3 - 4 Persons</button>
          <button type="button" class="wa-pax-btn" data-pax="5-7 Pax (Innova / Ertiga)">5 - 7 Persons</button>
          <button type="button" class="wa-pax-btn" data-pax="8-17 Pax (Urbania / Tempo)">8+ Persons (Group)</button>
        </div>
        <button type="button" id="waBackStepBtn" style="background:none; border:none; color:#64748B; font-size:0.78rem; font-weight:600; cursor:pointer; padding:0;">← Choose different service</button>
      </div>
    </div>

    <!-- Footer Note -->
    <div style="background:#FFFFFF; border-top:1px solid #E2E8F0; padding:0.65rem 1.15rem; font-size:0.74rem; color:#64748B; text-align:center;">
      🔒 100% Commercial Fleet • Zero Booking Commission
    </div>
  </div>

  <style>
    @keyframes slideUpWa {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .wa-opt-btn {
      width: 100%;
      text-align: left;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 0.6rem 0.85rem;
      font-size: 0.82rem;
      font-weight: 600;
      color: #0A192F;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .wa-opt-btn:hover {
      background: #EFF6FF;
      border-color: #3B82F6;
      color: #1D4ED8;
      transform: translateX(2px);
    }
    .wa-pax-btn {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 0.55rem;
      font-size: 0.78rem;
      font-weight: 700;
      color: #1E293B;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .wa-pax-btn:hover {
      background: #25D366;
      border-color: #25D366;
      color: #FFFFFF;
    }
  </style>
  `;

  function initConcierge() {
    // Append modal container to body
    const div = document.createElement('div');
    div.innerHTML = CONCIERGE_HTML;
    document.body.appendChild(div);

    let selectedService = '';

    const modal = document.getElementById('waConciergeModal');
    const closeBtn = document.getElementById('closeWaConciergeBtn');
    const step1 = document.getElementById('waConciergeStep1');
    const step2 = document.getElementById('waConciergeStep2');
    const backBtn = document.getElementById('waBackStepBtn');

    // Toggle Modal on WhatsApp button clicks
    document.querySelectorAll('.floating-wa-btn-wrap a, a.floating-wa-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal.style.display === 'none' || !modal.style.display) {
          modal.style.display = 'block';
          step1.style.display = 'flex';
          step2.style.display = 'none';
        } else {
          modal.style.display = 'none';
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Step 1: User selects service
    modal.querySelectorAll('.wa-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedService = btn.getAttribute('data-intent');
        step1.style.display = 'none';
        step2.style.display = 'block';
        document.getElementById('waStep2Title').textContent = `For: ${selectedService} — How many travelers?`;
      });
    });

    // Back button
    backBtn.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'flex';
    });

    // Step 2: User selects pax count -> Open WhatsApp
    modal.querySelectorAll('.wa-pax-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pax = btn.getAttribute('data-pax');
        const config = window.TrovenzaConfig ? window.TrovenzaConfig.getConfig() : null;
        const phone = config?.company?.whatsappNumber || '919876543210';

        const message = `Namaste! I am interested in:\n• Service: ${selectedService}\n• Group Size: ${pax}\n• Departure: Haridwar\n\nPlease share customized itinerary quote, available dates, and vehicle options.`;

        // Log lead automatically in client CRM
        if (window.TrovenzaConfig && window.TrovenzaConfig.recordLead) {
          window.TrovenzaConfig.recordLead({
            name: 'WhatsApp Concierge Visitor',
            phone: 'Via WhatsApp',
            service: selectedService,
            route: 'Haridwar Operations (' + pax + ')',
            vehicle: pax.includes('Innova') ? 'crysta' : (pax.includes('Urbania') ? 'urbania' : 'dzire'),
            amount: 0,
            status: 'New'
          });
        }

        modal.style.display = 'none';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConcierge);
  } else {
    initConcierge();
  }
})();
