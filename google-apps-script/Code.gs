/* Blue Lily Complex Report - Agent Sheet JSONP Bridge
   Use this only if your Google Sheet is private and the browser cannot read the CSV directly.

   Sheet columns supported:
   Name, First Name, Surname, Cell, Cell Phone, Email, Email Address, FFC, FFC Number, PPRA FFC

   Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone with the link
   Then paste the Web App URL into the app's optional agent sheet URL field.
*/

const SHEET_NAME = 'Agents';

function doGet(e) {
  const callback = e && e.parameter && e.parameter.callback;
  const agents = getAgents_();
  const payload = JSON.stringify({ agents });
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + payload + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}

function getAgents_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();
  if (!values.length) return [];
  const headers = values.shift().map(normalize_);
  return values
    .filter(row => row.some(cell => String(cell || '').trim()))
    .map(row => {
      const obj = {};
      headers.forEach((header, i) => obj[header] = String(row[i] || '').trim());
      const first = find_(obj, ['firstname', 'first']);
      const surname = find_(obj, ['surname', 'lastname', 'last']);
      const fullName = find_(obj, ['name', 'agentname', 'fullname']) || [first, surname].filter(Boolean).join(' ');
      return {
        name: fullName,
        cell: find_(obj, ['cell', 'cellphone', 'phone', 'mobile', 'contactnumber']),
        email: find_(obj, ['email', 'emailaddress']),
        ffc: find_(obj, ['ffc', 'ffcnumber', 'ppraffc', 'ppra'])
      };
    })
    .filter(agent => agent.name || agent.cell || agent.email || agent.ffc);
}

function normalize_(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function find_(obj, keys) {
  for (const key of keys) {
    if (obj[key]) return obj[key];
  }
  for (const header in obj) {
    if (keys.some(key => header.indexOf(key) !== -1 || key.indexOf(header) !== -1)) return obj[header];
  }
  return '';
}
