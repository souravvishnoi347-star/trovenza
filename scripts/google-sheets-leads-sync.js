/**
 * GOOGLE APPS SCRIPT - TROVENZA & JAI MAA TRAVELS REALTIME LEADS SYNC
 * 
 * INSTRUCTIONS TO SET UP (Takes 2 minutes):
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In Row 1, create these column headers:
 *    [A: Timestamp] [B: Date] [C: Name] [D: Phone] [E: Service] [F: Route / Destination] [G: Vehicle / Guests] [H: Travel Date] [I: Status]
 * 3. Click "Extensions" > "Apps Script" in top menu
 * 4. Delete any sample code and paste this ENTIRE file into the editor
 * 5. Click "Deploy" (top right blue button) > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set:
 *    - Description: "Trovenza Lead Capture"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial so the website can post leads)
 * 8. Click "Deploy", authorize access, and COPY the Web App URL (starts with https://script.google.com/macros/s/...)
 * 9. Paste this URL into your Trovenza Admin Panel (/trilok) under Settings > Google Sheets Webhook!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var dateFormatted = data.dateFormatted || Utilities.formatDate(timestamp, "Asia/Kolkata", "dd MMM yyyy, hh:mm a");
    var name = data.name || "Website Traveler";
    var phone = data.phone || "";
    var service = data.service || "Travel Inquiry";
    var route = data.pickup ? (data.pickup + " → " + data.destination) : (data.destination || "");
    var vehicleOrGuests = data.vehicle || data.guests || "";
    var travelDate = data.travelDate || "";
    var status = data.status || "New";

    sheet.appendRow([
      timestamp,
      dateFormatted,
      name,
      phone,
      service,
      route,
      vehicleOrGuests,
      travelDate,
      status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Lead recorded" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Trovenza Leads Sync Webhook is Active.");
}
