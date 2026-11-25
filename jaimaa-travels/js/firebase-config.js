/**
 * TROVENZA GROUP & JAI MAA TRAVELS - CLOUD FIREBASE & GOOGLE SHEETS LIVE BRIDGE
 * 
 * Automatically captures website leads and syncs them to:
 * 1. Firebase Cloud Firestore (trovenza-travels-2026)
 * 2. Live Google Sheets Webhook
 * 3. Client Admin Center (/trilok)
 */

window.TrovenzaFirebase = (function () {
  const firebaseConfig = {
    projectId: "trovenza-travels-2026",
    appId: "1:981395412514:web:467b22d84c442b38de5c7b",
    storageBucket: "trovenza-travels-2026.firebasestorage.app",
    apiKey: "AIzaSyDD-3kkAiOzsallpyCbf2gusew8tMwyuE0",
    authDomain: "trovenza-travels-2026.firebaseapp.com",
    messagingSenderId: "981395412514",
    projectNumber: "981395412514"
  };

  // Google Sheets Webhook URL (Connected & Live)
  let GOOGLE_SHEETS_WEBHOOK_URL = localStorage.getItem('trovenza_sheets_webhook') || 'https://script.google.com/macros/s/AKfycbyFa7KxxLy1nCp9twuhd4Tx2ZTFtH4cnswNiABaLCaZ-hDRmqvTQm8GZLtyokFN8cNLBA/exec';

  let db = null;
  let isInitialized = false;

  // Initialize Firebase Firestore SDK if available
  function initFirebase() {
    if (window.firebase && window.firebase.apps && !window.firebase.apps.length) {
      try {
        window.firebase.initializeApp(firebaseConfig);
        db = window.firebase.firestore();
        isInitialized = true;
        console.log('[Trovenza] Firebase Firestore connected to trovenza-travels-2026');
      } catch (err) {
        console.warn('[Trovenza] Firebase init notice:', err);
      }
    }
  }

  // Save Lead to Firestore & Google Sheets
  async function submitLeadToCloud(leadData) {
    const payload = {
      name: leadData.name || 'Traveler',
      phone: leadData.phone || '',
      service: leadData.service || 'Travel Inquiry',
      pickup: leadData.pickup || '',
      destination: leadData.destination || '',
      vehicle: leadData.vehicle || '',
      guests: leadData.guests || '',
      travelDate: leadData.travelDate || '',
      status: 'New',
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      source: window.location.pathname
    };

    // 1. Send to Firestore if connected
    if (db) {
      try {
        const docRef = await db.collection('leads').add(payload);
        payload.id = docRef.id;
        console.log('[Trovenza] Lead saved to Cloud Firestore:', docRef.id);
      } catch (e) {
        console.warn('[Trovenza] Firestore push failed, continuing fallback:', e);
      }
    }

    // 2. Send to Google Sheets Webhook if configured
    const webhook = GOOGLE_SHEETS_WEBHOOK_URL || localStorage.getItem('trovenza_sheets_webhook');
    if (webhook) {
      try {
        fetch(webhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(() => console.log('[Trovenza] Lead logged to Google Sheet.'))
          .catch(err => console.warn('[Trovenza] Google Sheet sync notice:', err));
      } catch (err) {
        console.warn('[Trovenza] Webhook dispatch error:', err);
      }
    }

    return payload;
  }

  // Fetch Live Leads from Firestore (for Admin Portal /trilok)
  async function fetchCloudLeads() {
    if (!db) return null;
    try {
      const snapshot = await db.collection('leads').orderBy('timestamp', 'desc').limit(100).get();
      const leads = [];
      snapshot.forEach(doc => {
        leads.push({ id: doc.id, ...doc.data() });
      });
      return leads;
    } catch (e) {
      console.warn('[Trovenza] Could not fetch Firestore leads:', e);
      return null;
    }
  }

  // Update Lead Status in Firestore
  async function updateLeadStatusInCloud(leadId, newStatus) {
    if (!db || !leadId) return false;
    try {
      await db.collection('leads').doc(leadId).update({ status: newStatus });
      return true;
    } catch (e) {
      console.warn('[Trovenza] Could not update Firestore lead status:', e);
      return false;
    }
  }

  // Set Google Sheets Webhook URL
  function setGoogleSheetsWebhook(url) {
    GOOGLE_SHEETS_WEBHOOK_URL = url ? url.trim() : '';
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      localStorage.setItem('trovenza_sheets_webhook', GOOGLE_SHEETS_WEBHOOK_URL);
    } else {
      localStorage.removeItem('trovenza_sheets_webhook');
    }
  }

  return {
    init: initFirebase,
    submitLead: submitLeadToCloud,
    fetchLeads: fetchCloudLeads,
    updateStatus: updateLeadStatusInCloud,
    setGoogleSheetsWebhook: setGoogleSheetsWebhook,
    getConfig: () => firebaseConfig
  };
})();

// Auto-initialize when window loads
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if (window.TrovenzaFirebase) {
      window.TrovenzaFirebase.init();
    }
  });
}
