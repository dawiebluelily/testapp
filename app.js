/* Blue Lily Complex Report Builder V2
   Clean rebuild: one TVA PDF upload, editable fields, agent info on page 1, no owner names/IDs, dynamic PDF pagination.
*/

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const BUILT_IN_AGENTS = [
  { name: "Dawie du Toit", cell: "084 062 4865", email: "dawie@bluelilysa.co.za", ffc: "1227449" },
  { name: "Ronel Coetzee", cell: "067 719 5527", email: "ronel@bluelilysa.co.za", ffc: "0285198" }
];

const els = {
  agentSheetUrl: document.getElementById("agentSheetUrl"),
  loadAgentsBtn: document.getElementById("loadAgentsBtn"),
  agentStatus: document.getElementById("agentStatus"),
  agentSelect: document.getElementById("agentSelect"),
  agentName: document.getElementById("agentName"),
  agentCell: document.getElementById("agentCell"),
  agentEmail: document.getElementById("agentEmail"),
  agentFfc: document.getElementById("agentFfc"),
  tvaPdf: document.getElementById("tvaPdf"),
  parseReportBtn: document.getElementById("parseReportBtn"),
  demoBtn: document.getElementById("demoBtn"),
  statusBadge: document.getElementById("statusBadge"),
  reportTitle: document.getElementById("reportTitle"),
  schemeName: document.getElementById("schemeName"),
  suburb: document.getElementById("suburb"),
  municipality: document.getElementById("municipality"),
  streetAddress: document.getElementById("streetAddress"),
  schemeNumber: document.getElementById("schemeNumber"),
  numberUnits: document.getElementById("numberUnits"),
  schemeAge: document.getElementById("schemeAge"),
  transferTableBody: document.querySelector("#transferTable tbody"),
  addTransferRowBtn: document.getElementById("addTransferRowBtn"),
  ownLess5: document.getElementById("ownLess5"),
  own5: document.getElementById("own5"),
  own8: document.getElementById("own8"),
  own11: document.getElementById("own11"),
  age18: document.getElementById("age18"),
  age35: document.getElementById("age35"),
  age50: document.getElementById("age50"),
  age65: document.getElementById("age65"),
  graphPage: document.getElementById("graphPage"),
  extractGraphBtn: document.getElementById("extractGraphBtn"),
  clearGraphBtn: document.getElementById("clearGraphBtn"),
  graphStatus: document.getElementById("graphStatus"),
  graphPreview: document.getElementById("graphPreview"),
  previewPdfBtn: document.getElementById("previewPdfBtn"),
  downloadPdfBtn: document.getElementById("downloadPdfBtn"),
  saveJsonBtn: document.getElementById("saveJsonBtn"),
  jsonFile: document.getElementById("jsonFile"),
  pdfPreview: document.getElementById("pdfPreview"),
  downloadLink: document.getElementById("downloadLink")
};

const state = {
  agents: [],
  tvaPdfBytes: null,
  tvaPages: [],
  graphImageDataUrl: null,
  currentPdfUrl: null,
  currentPdfFilename: null
};

const demoData = {
  agent: BUILT_IN_AGENTS[0],
  report: {
    title: "Blue Lily Complex Report",
    schemeName: "THE ZONE",
    suburb: "UMHLANGA ROCKS",
    municipality: "ETHEKWINI",
    streetAddress: "12 SOLSTICE ROAD",
    schemeNumber: "527",
    numberUnits: "66",
    schemeAge: "16 / 2006"
  },
  transferRows: [
    { unit: "21", size: "77", regDate: "-", purchaseDate: "2019-05-19", purchasePrice: "R 1 430 000" },
    { unit: "22", size: "87", regDate: "-", purchaseDate: "2019-03-16", purchasePrice: "R 1 200 000" },
    { unit: "28", size: "87", regDate: "-", purchaseDate: "2020-05-11", purchasePrice: "R 1 350 000" },
    { unit: "35", size: "87", regDate: "-", purchaseDate: "2021-10-08", purchasePrice: "R 1 370 000" },
    { unit: "37", size: "87", regDate: "-", purchaseDate: "2019-06-23", purchasePrice: "R 1 600 000" },
    { unit: "39", size: "86", regDate: "-", purchaseDate: "2020-09-08", purchasePrice: "R 1 400 000" },
    { unit: "56", size: "104", regDate: "-", purchaseDate: "2019-01-03", purchasePrice: "R 2 050 000" },
    { unit: "62", size: "78", regDate: "-", purchaseDate: "2018-12-18", purchasePrice: "R 1 465 000" }
  ],
  ownership: { ownLess5: "17", own5: "18", own8: "6", own11: "24" },
  ageOwners: { age18: "5", age35: "20", age50: "25", age65: "7" }
};

function setStatus(message, mode = "neutral") {
  els.statusBadge.textContent = message;
  els.statusBadge.className = "status-badge";
  if (mode === "error") els.statusBadge.classList.add("error");
  if (mode === "success") els.statusBadge.classList.add("success");
}
function setAgentStatus(message, mode = "neutral") {
  els.agentStatus.textContent = message;
  els.agentStatus.className = "pill";
  if (mode === "error") els.agentStatus.classList.add("error");
  if (mode === "success") els.agentStatus.classList.add("success");
}
function setGraphStatus(message, mode = "neutral") {
  els.graphStatus.textContent = message;
  els.graphStatus.className = "pill";
  if (mode === "error") els.graphStatus.classList.add("error");
  if (mode === "success") els.graphStatus.classList.add("success");
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}
function safeText(value) {
  return String(value || "").replace(/\u2013/g, "-").replace(/\u2014/g, "-").replace(/\u00a0/g, " ");
}
function titleCase(value) {
  return cleanText(value).toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}
function normalKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
function formatMoney(value) {
  const digits = String(value || "").replace(/[^0-9]/g, "");
  if (!digits) return "";
  return "R " + Number(digits).toLocaleString("en-ZA").replace(/,/g, " ");
}
function parseNumber(value) {
  const n = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function populateAgentDropdown(agents) {
  state.agents = Array.isArray(agents) && agents.length ? agents : BUILT_IN_AGENTS;
  els.agentSelect.innerHTML = "";
  state.agents.forEach((agent, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = agent.name || agent.email || `Agent ${index + 1}`;
    els.agentSelect.appendChild(option);
  });
  els.agentSelect.value = "0";
  applySelectedAgent();
}
function applySelectedAgent() {
  const agent = state.agents[Number(els.agentSelect.value)] || BUILT_IN_AGENTS[0];
  els.agentName.value = agent.name || "";
  els.agentCell.value = agent.cell || "";
  els.agentEmail.value = agent.email || "";
  els.agentFfc.value = agent.ffc || "";
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') { value += '"'; i += 1; }
    else if (char === '"') inQuotes = !inQuotes;
    else if (char === "," && !inQuotes) { row.push(value.trim()); value = ""; }
    else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; value = "";
    } else value += char;
  }
  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}
function rowsToObjects(rows) {
  if (!rows || !rows.length) return [];
  if (!Array.isArray(rows[0]) && typeof rows[0] === "object") return rows;
  const headers = rows[0].map(normalKey);
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i] || "");
    return obj;
  }).filter(obj => Object.values(obj).some(Boolean));
}
function findRowValue(row, keys) {
  const wanted = keys.map(normalKey);
  for (const key of wanted) if (row[key]) return row[key];
  for (const [header, value] of Object.entries(row)) {
    if (wanted.some(key => header.includes(key) || key.includes(header))) return value;
  }
  return "";
}
function mapAgentRows(rows) {
  return rowsToObjects(rows).map((row, index) => {
    const first = findRowValue(row, ["first name", "firstname"]);
    const surname = findRowValue(row, ["surname", "last name", "lastname"]);
    const full = findRowValue(row, ["agent name", "full name", "name"]);
    const name = full || [first, surname].filter(Boolean).join(" ");
    return {
      id: `agent-${index}`,
      name: cleanText(name),
      cell: cleanText(findRowValue(row, ["cell", "cell phone", "cellphone", "phone", "contact", "mobile", "telephone", "number"])),
      email: cleanText(findRowValue(row, ["email", "email address", "e mail"])),
      ffc: cleanText(findRowValue(row, ["ffc", "ffc number", "ppra", "ppra ffc", "fidelity fund certificate"]))
    };
  }).filter(agent => agent.name || agent.cell || agent.email || agent.ffc);
}
function googleSheetCsvUrl(input) {
  const url = new URL(input);
  const id = (url.pathname.match(/\/spreadsheets\/d\/([^/]+)/) || [])[1];
  if (!id) return input;
  const gid = url.searchParams.get("gid") || (url.hash.match(/gid=(\d+)/) || [null, "0"])[1] || "0";
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
}
async function loadJsonpAgents(url) {
  return new Promise((resolve, reject) => {
    const cb = `blueLilyAgents_${Date.now()}`;
    const script = document.createElement("script");
    window[cb] = payload => { delete window[cb]; script.remove(); resolve(payload.agents || payload.data || payload || []); };
    script.onerror = () => { delete window[cb]; script.remove(); reject(new Error("Could not load Apps Script endpoint.")); };
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${cb}`;
    document.body.appendChild(script);
  });
}
async function loadAgentsFromUrl() {
  const input = (els.agentSheetUrl.value || "").trim();
  if (!input) {
    populateAgentDropdown(BUILT_IN_AGENTS);
    setAgentStatus("Built-in list ready", "success");
    return;
  }
  els.loadAgentsBtn.disabled = true;
  setAgentStatus("Loading...");
  try {
    let payload;
    if (input.includes("script.google.com")) payload = await loadJsonpAgents(input);
    else {
      const res = await fetch(googleSheetCsvUrl(input));
      if (!res.ok) throw new Error("Sheet is not public or cannot be read.");
      payload = parseCsv(await res.text());
    }
    const agents = mapAgentRows(payload);
    if (!agents.length) throw new Error("No agents found.");
    populateAgentDropdown(agents);
    setAgentStatus(`${agents.length} agent(s) loaded`, "success");
  } catch (err) {
    console.warn(err);
    populateAgentDropdown(BUILT_IN_AGENTS);
    setAgentStatus("Built-in list loaded", "error");
    setStatus("Agent sheet could not be read. Built-in agents loaded. Use Apps Script for private sheets.", "error");
  } finally {
    els.loadAgentsBtn.disabled = false;
  }
}

async function extractPdf(file) {
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(" ").replace(/\s+/g, " ").trim();
    pages.push({ pageNumber: i, text });
  }
  return { bytes, pages, pageCount: pdf.numPages };
}
function between(text, label, stops) {
  const labelEsc = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stopEsc = stops.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const match = text.match(new RegExp(`${labelEsc}\\s+(.+?)(?:\\s+(?:${stopEsc})|$)`, "i"));
  return cleanText(match ? match[1] : "");
}
function parseFields(pages) {
  const all = pages.map(p => p.text).join(" ");
  return {
    schemeName: between(all, "Sectional Scheme Name", ["Sectional Scheme Number", "Town", "Township"]),
    schemeNumber: between(all, "Sectional Scheme Number", ["Town", "Township", "Municipality"]),
    suburb: between(all, "Town", ["Municipality", "Township/TownshipGroup", "Township / Township Group"]),
    municipality: between(all, "Municipality", ["Township/TownshipGroup", "Township / Township Group", "ERF#", "Street Address"]),
    streetAddress: between(all, "Street Address", ["Age of Sectional Scheme", "Number of Units", "Coordinates"]),
    schemeAge: between(all, "Age of Sectional Scheme", ["Number of Units", "Coordinates"]),
    numberUnits: between(all, "Number of Units", ["Coordinates", "Owners in Sectional Scheme", "PAGE"])
  };
}
function parseTransferRows(pages) {
  const all = pages.map(p => p.text).join(" ");
  const rows = [];

  // New TVA block format: Unit 21 Size 77 Purchase Price 1430000 Purchase Date 2019-05-19
  const blockRegex = /Unit\s+(\d{1,4})\s+Size\s+(\d+(?:\.\d+)?)\s+Purchase\s+Price\s+R?\s*([\d\s,]+?)\s+Purchase\s+Date\s+(\d{4}-\d{2}-\d{2})/gi;
  let match;
  while ((match = blockRegex.exec(all)) !== null) {
    rows.push({ unit: match[1], size: match[2].replace(/\.00$/, ""), regDate: "-", purchaseDate: match[4], purchasePrice: formatMoney(match[3]) });
  }

  // Older TVA table format with registration date.
  const tableStart = all.search(/Transfer Information/i);
  if (tableStart > -1) {
    let block = all.slice(tableStart);
    const stop = block.search(/Growth and Activit|Period of Ownership|Age of Owners|Sectional Scheme Ranking|Lending by Institution|Amenities/i);
    if (stop > -1) block = block.slice(0, stop);
    const tableRegex = /\b(\d{1,4})\s+(\d+(?:\.\d+)?)\s+(\d{4}-\d{2}-\d{2})\s+(\d{4}-\d{2}-\d{2})\s+R\s*([\d\s,]+?)(?=\s+(?:ST\d|[A-Z]{2}\d|\*{3}|\d{1,4}\s+\d+(?:\.\d+)?\s+\d{4}-\d{2}-\d{2})|$)/gi;
    while ((match = tableRegex.exec(block)) !== null) {
      rows.push({ unit: match[1], size: match[2].replace(/\.00$/, ""), regDate: match[3], purchaseDate: match[4], purchasePrice: formatMoney(match[5]) });
    }
  }

  const seen = new Set();
  return rows.filter(row => {
    const key = [row.unit, row.size, row.regDate, row.purchaseDate, row.purchasePrice].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function parseOwnership(pages) {
  const all = pages.map(p => p.text).join(" ");
  let m = all.match(/Period\s+Of\s+Ownership\s+<\s*5\s*Years\s+(\d+)\s+5\s*[–-]\s*7\s*Years\s+(\d+)\s+8\s*[–-]\s*10\s*Years\s+(\d+)\s+>\s*11\s*Years\s+(\d+)/i);
  if (m) return { ownLess5: m[1], own5: m[2], own8: m[3], own11: m[4] };
  m = all.match(/11\s*Years\s*and\s*more\s+8\s*[–-]\s*10\s*Years\s+5\s*[–-]\s*7\s*Years\s+Less\s*than\s*5\s*Years\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/i);
  if (m) return { own11: m[1], own8: m[2], own5: m[3], ownLess5: m[4] };
  return {};
}
function parseAgeOwners(pages) {
  const all = pages.map(p => p.text).join(" ");
  const m = all.match(/Age\s+Of\s+Owners\s+18\s*[–-]\s*35\s+(\d+)\s+35\s*[–-]\s*49\s+(\d+)\s+50\s*[–-]\s*64\s+(\d+)\s+65\+\s+(\d+)/i);
  if (m) return { age18: m[1], age35: m[2], age50: m[3], age65: m[4] };
  return {};
}
function guessGrowthPage(pages) {
  const exact = pages.find(p => /Growth\s+and\s+Activit/i.test(p.text));
  if (exact) return exact.pageNumber;
  const charts = pages.find(p => /Median Price/i.test(p.text) && /Number of Registrations/i.test(p.text));
  return charts ? charts.pageNumber : "";
}
function applyParsedData(parsed) {
  const fields = parsed.fields || {};
  if (fields.schemeName) els.schemeName.value = fields.schemeName;
  if (fields.suburb) els.suburb.value = fields.suburb;
  if (fields.municipality) els.municipality.value = fields.municipality;
  if (fields.streetAddress) els.streetAddress.value = fields.streetAddress;
  if (fields.schemeNumber) els.schemeNumber.value = fields.schemeNumber;
  if (fields.numberUnits) els.numberUnits.value = fields.numberUnits;
  if (fields.schemeAge) els.schemeAge.value = fields.schemeAge;
  if (parsed.transferRows && parsed.transferRows.length) setTransferRows(parsed.transferRows);
  const o = parsed.ownership || {};
  if (o.ownLess5 !== undefined) els.ownLess5.value = o.ownLess5;
  if (o.own5 !== undefined) els.own5.value = o.own5;
  if (o.own8 !== undefined) els.own8.value = o.own8;
  if (o.own11 !== undefined) els.own11.value = o.own11;
  const a = parsed.ageOwners || {};
  if (a.age18 !== undefined) els.age18.value = a.age18;
  if (a.age35 !== undefined) els.age35.value = a.age35;
  if (a.age50 !== undefined) els.age50.value = a.age50;
  if (a.age65 !== undefined) els.age65.value = a.age65;
  if (parsed.graphPage) els.graphPage.value = parsed.graphPage;
}
async function parseReport() {
  const file = els.tvaPdf.files[0];
  if (!file) { setStatus("Upload the TVA report PDF first.", "error"); return; }
  els.parseReportBtn.disabled = true;
  setStatus("Capturing TVA report data...");
  try {
    const extracted = await extractPdf(file);
    state.tvaPdfBytes = extracted.bytes;
    state.tvaPages = extracted.pages;
    const parsed = {
      fields: parseFields(extracted.pages),
      transferRows: parseTransferRows(extracted.pages),
      ownership: parseOwnership(extracted.pages),
      ageOwners: parseAgeOwners(extracted.pages),
      graphPage: guessGrowthPage(extracted.pages)
    };
    applyParsedData(parsed);
    await renderGraphFromPdfBytes();
    setStatus("Report captured. Check editable data before export.", "success");
  } catch (err) {
    console.error(err);
    setStatus(`Capture failed: ${err.message}`, "error");
  } finally {
    els.parseReportBtn.disabled = false;
  }
}
function addTransferRow(data = {}) {
  const tr = document.createElement("tr");
  ["unit", "size", "regDate", "purchaseDate", "purchasePrice"].forEach(field => {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.dataset.field = field;
    input.value = data[field] || "";
    td.appendChild(input);
    tr.appendChild(td);
  });
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Remove";
  btn.className = "remove-row";
  btn.addEventListener("click", () => tr.remove());
  td.appendChild(btn);
  tr.appendChild(td);
  els.transferTableBody.appendChild(tr);
}
function setTransferRows(rows) {
  els.transferTableBody.innerHTML = "";
  (rows || []).forEach(addTransferRow);
  if (!rows || !rows.length) addTransferRow();
}
function collectTransferRows() {
  return [...els.transferTableBody.querySelectorAll("tr")].map(tr => {
    const row = {};
    tr.querySelectorAll("input").forEach(input => row[input.dataset.field] = input.value.trim());
    return row;
  }).filter(row => Object.values(row).some(Boolean));
}
function collectData() {
  return {
    agent: { name: els.agentName.value.trim(), cell: els.agentCell.value.trim(), email: els.agentEmail.value.trim(), ffc: els.agentFfc.value.trim() },
    report: {
      title: els.reportTitle.value.trim() || "Blue Lily Complex Report",
      schemeName: els.schemeName.value.trim(),
      suburb: els.suburb.value.trim(),
      municipality: els.municipality.value.trim(),
      streetAddress: els.streetAddress.value.trim(),
      schemeNumber: els.schemeNumber.value.trim(),
      numberUnits: els.numberUnits.value.trim(),
      schemeAge: els.schemeAge.value.trim()
    },
    transferRows: collectTransferRows(),
    ownership: { ownLess5: els.ownLess5.value, own5: els.own5.value, own8: els.own8.value, own11: els.own11.value },
    ageOwners: { age18: els.age18.value, age35: els.age35.value, age50: els.age50.value, age65: els.age65.value },
    graphImageDataUrl: state.graphImageDataUrl
  };
}
function applyFullData(data) {
  if (data.agent) {
    els.agentName.value = data.agent.name || "";
    els.agentCell.value = data.agent.cell || "";
    els.agentEmail.value = data.agent.email || "";
    els.agentFfc.value = data.agent.ffc || "";
  }
  const r = data.report || {};
  els.reportTitle.value = r.title || "Blue Lily Complex Report";
  els.schemeName.value = r.schemeName || "";
  els.suburb.value = r.suburb || "";
  els.municipality.value = r.municipality || "";
  els.streetAddress.value = r.streetAddress || "";
  els.schemeNumber.value = r.schemeNumber || "";
  els.numberUnits.value = r.numberUnits || "";
  els.schemeAge.value = r.schemeAge || "";
  setTransferRows(data.transferRows || []);
  const o = data.ownership || {};
  els.ownLess5.value = o.ownLess5 || ""; els.own5.value = o.own5 || ""; els.own8.value = o.own8 || ""; els.own11.value = o.own11 || "";
  const a = data.ageOwners || {};
  els.age18.value = a.age18 || ""; els.age35.value = a.age35 || ""; els.age50.value = a.age50 || ""; els.age65.value = a.age65 || "";
  if (data.graphImageDataUrl) setGraphImage(data.graphImageDataUrl); else clearGraphImage();
}

function viewportPointY(viewport, item) {
  if (!item || !item.transform) return null;
  const point = viewport.convertToViewportPoint(item.transform[4], item.transform[5]);
  return point[1];
}
function findItem(items, regex) {
  return items.find(item => regex.test(String(item.str || "")));
}
async function renderGraphFromPdfBytes() {
  if (!state.tvaPdfBytes) {
    const file = els.tvaPdf.files[0];
    if (!file) { setStatus("Upload the TVA report PDF first.", "error"); return; }
    state.tvaPdfBytes = await file.arrayBuffer();
  }
  els.extractGraphBtn.disabled = true;
  setGraphStatus("Capturing...");
  try {
    const pdf = await pdfjsLib.getDocument({ data: state.tvaPdfBytes.slice(0) }).promise;
    let pageNumber = Number(els.graphPage.value);
    if (!pageNumber) {
      if (!state.tvaPages.length && els.tvaPdf.files[0]) state.tvaPages = (await extractPdf(els.tvaPdf.files[0])).pages;
      pageNumber = Number(guessGrowthPage(state.tvaPages)) || Math.min(9, pdf.numPages);
      els.graphPage.value = String(pageNumber);
    }
    pageNumber = Math.max(1, Math.min(pdf.numPages, pageNumber));
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2.5 });
    const fullCanvas = document.createElement("canvas");
    fullCanvas.width = viewport.width; fullCanvas.height = viewport.height;
    await page.render({ canvasContext: fullCanvas.getContext("2d"), viewport }).promise;
    const content = await page.getTextContent();
    const items = content.items || [];
    const median = findItem(items, /Median\s+Price/i);
    const registrations = findItem(items, /Number\s+of\s+Registrations/i);
    const period = findItem(items, /Period\s+of\s+Ownership/i);
    const medianY = viewportPointY(viewport, median);
    const registrationsY = viewportPointY(viewport, registrations);
    const chartTopCandidates = [medianY, registrationsY].filter(Number.isFinite);
    let cropY = chartTopCandidates.length ? Math.max(0, Math.round(Math.min(...chartTopCandidates) - 28)) : Math.round(fullCanvas.height * 0.26);
    let cropBottomY = Math.round(fullCanvas.height * 0.62);
    const periodY = viewportPointY(viewport, period);
    if (Number.isFinite(periodY) && periodY > cropY + 80) cropBottomY = Math.min(cropBottomY, Math.round(periodY - 20));
    cropBottomY = Math.max(cropY + 180, Math.min(fullCanvas.height, cropBottomY));
    const cropH = cropBottomY - cropY;
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = fullCanvas.width; cropCanvas.height = cropH;
    const ctx = cropCanvas.getContext("2d");
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);
    ctx.drawImage(fullCanvas, 0, cropY, fullCanvas.width, cropH, 0, 0, cropCanvas.width, cropCanvas.height);
    setGraphImage(cropCanvas.toDataURL("image/png", 0.95));
    setGraphStatus(`Page ${pageNumber} charts captured`, "success");
  } catch (err) {
    console.error(err);
    setGraphStatus("Generated chart mode", "error");
    clearGraphImage();
    setStatus("Chart capture failed. The PDF will generate Blue Lily fallback charts.", "error");
  } finally {
    els.extractGraphBtn.disabled = false;
  }
}
function setGraphImage(dataUrl) {
  state.graphImageDataUrl = dataUrl;
  els.graphPreview.innerHTML = "";
  const img = document.createElement("img");
  img.src = dataUrl;
  img.alt = "Growth and Activity chart capture";
  els.graphPreview.appendChild(img);
}
function clearGraphImage() {
  state.graphImageDataUrl = null;
  els.graphPreview.innerHTML = "<span>Generated Blue Lily chart will be used</span>";
  setGraphStatus("Generated chart mode", "success");
}

async function getLogoBytes() {
  const res = await fetch("assets/blue-lily-logo.jpg");
  if (!res.ok) throw new Error("Logo could not be loaded. Run this app from a local server or Netlify.");
  return res.arrayBuffer();
}
function dataUrlToBytes(dataUrl) {
  const base64 = dataUrl.split(",")[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
function wrapByWidth(text, font, size, width) {
  const words = safeText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > width && line) { lines.push(line); line = word; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}
function rowsByYear(rows) {
  const map = new Map();
  rows.forEach(row => {
    const year = String(row.purchaseDate || "").slice(0, 4);
    const price = parseNumber(row.purchasePrice);
    if (!/^\d{4}$/.test(year) || !price) return;
    if (!map.has(year)) map.set(year, []);
    map.get(year).push(price);
  });
  return [...map.entries()].sort((a, b) => Number(a[0]) - Number(b[0])).map(([year, prices]) => ({
    year,
    count: prices.length,
    median: prices.slice().sort((a, b) => a - b)[Math.floor(prices.length / 2)]
  }));
}
async function buildPdfBytes() {
  const data = collectData();
  const { PDFDocument, StandardFonts, rgb } = PDFLib;
  const pdfDoc = await PDFDocument.create();
  const logo = await pdfDoc.embedJpg(await getLogoBytes());
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const serif = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const serifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const pageSize = [595.28, 841.89];
  const navy = rgb(0.02, 0.10, 0.23);
  const navy2 = rgb(0.06, 0.20, 0.38);
  const blue = rgb(0.07, 0.62, 0.86);
  const gold = rgb(0.70, 0.55, 0.31);
  const goldSoft = rgb(0.96, 0.93, 0.86);
  const text = rgb(0.11, 0.14, 0.20);
  const muted = rgb(0.39, 0.42, 0.48);
  const line = rgb(0.86, 0.88, 0.91);
  const paper = rgb(0.98, 0.97, 0.94);
  let page, width, height, y;
  const margin = 44;
  const footerH = 62;
  const headerH = 92;

  function addPage() {
    page = pdfDoc.addPage(pageSize);
    ({ width, height } = page.getSize());
    drawLetterhead();
    y = height - headerH - 28;
  }
  function drawLetterhead() {
    page.drawRectangle({ x: 0, y: height - headerH, width, height: headerH, color: navy });
    page.drawRectangle({ x: 0, y: height - headerH - 5, width, height: 5, color: gold });
    page.drawRectangle({ x: 0, y: height - headerH - 7, width, height: 2, color: blue });
    const logoW = 190;
    const logoH = logoW * (logo.height / logo.width);
    page.drawRectangle({ x: margin, y: height - 74, width: logoW + 18, height: logoH + 16, color: rgb(1, 1, 1), borderColor: line, borderWidth: 0.4 });
    page.drawImage(logo, { x: margin + 9, y: height - 66, width: logoW, height: logoH });
    page.drawText("COMPLEX REPORT", { x: width - margin - 160, y: height - 44, size: 10, font: bold, color: gold, characterSpacing: 0.9 });
    page.drawText("Blue Lily Properties", { x: width - margin - 160, y: height - 62, size: 15, font: serifBold, color: rgb(1, 1, 1) });

    page.drawRectangle({ x: 0, y: 0, width, height: footerH, color: navy });
    page.drawLine({ start: { x: margin, y: footerH - 14 }, end: { x: width - margin, y: footerH - 14 }, thickness: 0.8, color: gold });
    page.drawText("087 265 4784", { x: margin, y: 34, size: 8, font, color: rgb(1,1,1) });
    page.drawText("www.bluelilysa.co.za", { x: margin + 130, y: 34, size: 8, font, color: rgb(1,1,1) });
    page.drawText("info@bluelilysa.co.za", { x: margin + 285, y: 34, size: 8, font, color: rgb(1,1,1) });
    page.drawText("The Workspace, Hazelwood, Pretoria", { x: margin + 415, y: 34, size: 7, font, color: rgb(1,1,1) });
  }
  function ensureSpace(required) {
    if (y - required < footerH + 30) addPage();
  }
  function sectionTitle(title) {
    ensureSpace(34);
    page.drawText(title.toUpperCase(), { x: margin, y, size: 8.8, font: bold, color: gold, characterSpacing: 0.7 });
    y -= 9;
    page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 0.75, color: gold });
    y -= 18;
  }
  function preparedByBlock() {
    const h = 58;
    page.drawRectangle({ x: margin, y: y - h, width: width - margin * 2, height: h, color: goldSoft, borderColor: line, borderWidth: 0.5 });
    page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1.2, color: gold });
    page.drawText("PREPARED BY", { x: margin + 14, y: y - 16, size: 7.6, font: bold, color: gold, characterSpacing: 0.7 });
    page.drawText(safeText(data.agent.name || "Blue Lily Properties"), { x: margin + 14, y: y - 37, size: 14, font: serifBold, color: navy });
    const right1 = [data.agent.cell, data.agent.email].filter(Boolean).join("   |   ");
    const right2 = data.agent.ffc ? `PPRA FFC: ${safeText(data.agent.ffc)}` : "";
    const rightWidth = Math.max(font.widthOfTextAtSize(right1, 8), bold.widthOfTextAtSize(right2, 8));
    const rx = width - margin - rightWidth - 14;
    if (right1) page.drawText(safeText(right1), { x: rx, y: y - 22, size: 8, font, color: text });
    if (right2) page.drawText(right2, { x: rx, y: y - 39, size: 8, font: bold, color: navy2 });
    y -= h + 26;
  }
  function drawKeyValue(label, value, x, yy, w, h = 42) {
    page.drawRectangle({ x, y: yy - h, width: w, height: h, color: paper, borderColor: line, borderWidth: 0.45 });
    page.drawText(label.toUpperCase(), { x: x + 10, y: yy - 13, size: 6.8, font: bold, color: gold });
    const lines = wrapByWidth(value || "-", bold, 8.6, w - 20).slice(0, 2);
    page.drawText(lines[0] || "-", { x: x + 10, y: yy - 28, size: 8.6, font: bold, color: text });
    if (lines[1]) page.drawText(lines[1], { x: x + 10, y: yy - 39, size: 7.7, font, color: text });
  }
  function detailGrid() {
    sectionTitle("Property Details");
    const gap = 10;
    const colW = (width - margin * 2 - gap) / 2;
    let yy = y;
    drawKeyValue("Complex / Scheme", data.report.schemeName, margin, yy, colW);
    drawKeyValue("Suburb / Town", data.report.suburb, margin + colW + gap, yy, colW);
    yy -= 48;
    drawKeyValue("Street Address", data.report.streetAddress, margin, yy, colW, 50);
    drawKeyValue("Municipality", data.report.municipality, margin + colW + gap, yy, colW, 50);
    yy -= 56;
    drawKeyValue("Scheme Number", data.report.schemeNumber, margin, yy, colW);
    drawKeyValue("Number of Units", data.report.numberUnits, margin + colW + gap, yy, colW);
    yy -= 48;
    drawKeyValue("Age of Scheme", data.report.schemeAge, margin, yy, colW);
    y = yy - 58;
  }
  function transferTable() {
    const rows = data.transferRows || [];
    if (!rows.length) return;
    sectionTitle("Transfer Information");
    const tableW = width - margin * 2;
    const cols = [
      { label: "Unit", x: margin, w: 45, key: "unit" },
      { label: "Size", x: margin + 48, w: 56, key: "size" },
      { label: "Registration Date", x: margin + 110, w: 105, key: "regDate" },
      { label: "Purchase Date", x: margin + 220, w: 105, key: "purchaseDate" },
      { label: "Purchase Price", x: margin + 330, w: 125, key: "purchasePrice" }
    ];
    function header(continued = false) {
      ensureSpace(50);
      if (continued) { page.drawText("Transfer Information Continued", { x: margin, y, size: 8.5, font: bold, color: gold }); y -= 15; }
      page.drawRectangle({ x: margin, y: y - 18, width: tableW, height: 24, color: navy2 });
      cols.forEach(c => page.drawText(c.label, { x: c.x + 5, y: y - 10, size: 7, font: bold, color: rgb(1,1,1) }));
      y -= 26;
    }
    header(false);
    rows.forEach((row, i) => {
      if (y - 20 < footerH + 28) { addPage(); header(true); }
      if (i % 2 === 0) page.drawRectangle({ x: margin, y: y - 13, width: tableW, height: 20, color: paper });
      cols.forEach(c => {
        const value = c.key === "size" && row[c.key] && row[c.key] !== "-" ? `${row[c.key]} m²` : (row[c.key] || "-");
        page.drawText(safeText(String(value)).slice(0, 34), { x: c.x + 5, y: y - 6, size: 8, font, color: text });
      });
      y -= 20;
    });
    y -= 24;
  }
  function drawOwnership() {
    sectionTitle("Period of Ownership");
    const items = [
      ["Less than 5 years", data.ownership.ownLess5], ["5 - 7 years", data.ownership.own5],
      ["8 - 10 years", data.ownership.own8], ["11 years and more", data.ownership.own11]
    ];
    const gap = 8;
    const cardW = (width - margin * 2 - gap * 3) / 4;
    items.forEach(([label, value], i) => {
      const x = margin + i * (cardW + gap);
      page.drawRectangle({ x, y: y - 50, width: cardW, height: 54, color: goldSoft, borderColor: line, borderWidth: 0.45 });
      page.drawText(label, { x: x + 8, y: y - 13, size: 6.8, font: bold, color: navy2 });
      page.drawText(String(value || "0"), { x: x + 8, y: y - 39, size: 20, font: serifBold, color: gold });
    });
    y -= 78;
  }
  function drawSimpleBarChart(title, items, x, yy, w, h) {
    page.drawRectangle({ x, y: yy - h, width: w, height: h, color: rgb(1,1,1), borderColor: line, borderWidth: 0.45 });
    page.drawText(title, { x: x + 12, y: yy - 18, size: 9, font: bold, color: navy });
    const max = Math.max(1, ...items.map(item => parseNumber(item.value)));
    const chartX = x + 16;
    const chartY = yy - h + 34;
    const chartH = h - 70;
    const gap = 10;
    const barW = (w - 32 - gap * (items.length - 1)) / items.length;
    items.forEach((item, i) => {
      const val = parseNumber(item.value);
      const bh = Math.max(2, chartH * val / max);
      const bx = chartX + i * (barW + gap);
      page.drawRectangle({ x: bx, y: chartY, width: barW, height: bh, color: blue });
      page.drawText(String(val), { x: bx + 2, y: chartY + bh + 4, size: 6.5, font: bold, color: navy2 });
      const label = String(item.label).slice(0, 8);
      page.drawText(label, { x: bx, y: yy - h + 14, size: 6.3, font, color: muted });
    });
  }
  async function growthActivity() {
    sectionTitle("Growth and Activity");
    const blockW = width - margin * 2;
    if (data.graphImageDataUrl) {
      const bytes = dataUrlToBytes(data.graphImageDataUrl);
      const image = data.graphImageDataUrl.includes("image/jpeg") ? await pdfDoc.embedJpg(bytes) : await pdfDoc.embedPng(bytes);
      const maxH = 210;
      const scale = Math.min(blockW / image.width, maxH / image.height);
      const iw = image.width * scale;
      const ih = image.height * scale;
      ensureSpace(ih + 42);
      page.drawRectangle({ x: margin, y: y - ih - 12, width: blockW, height: ih + 20, color: rgb(1,1,1), borderColor: line, borderWidth: 0.45 });
      page.drawImage(image, { x: margin + (blockW - iw) / 2, y: y - ih - 2, width: iw, height: ih });
      y -= ih + 34;
    }
    const yearRows = rowsByYear(data.transferRows || []);
    ensureSpace(180);
    const colW = (blockW - 12) / 2;
    const countItems = yearRows.length ? yearRows.map(r => ({ label: r.year, value: r.count })) : [
      { label: "2020", value: 0 }, { label: "2021", value: 0 }, { label: "2022", value: 0 }
    ];
    const medianItems = yearRows.length ? yearRows.map(r => ({ label: r.year, value: Math.round(r.median / 1000) })) : [
      { label: "2020", value: 0 }, { label: "2021", value: 0 }, { label: "2022", value: 0 }
    ];
    drawSimpleBarChart("Registrations from captured transfers", countItems.slice(-6), margin, y, colW, 150);
    drawSimpleBarChart("Median price from captured transfers (R'000)", medianItems.slice(-6), margin + colW + 12, y, colW, 150);
    y -= 180;
  }

  addPage();
  preparedByBlock();
  page.drawText(safeText((data.report.title || "Blue Lily Complex Report").toUpperCase()), { x: margin, y, size: 10, font: bold, color: gold, characterSpacing: 0.9 });
  y -= 28;
  page.drawText(safeText(data.report.schemeName || "COMPLEX REPORT"), { x: margin, y, size: 30, font: serifBold, color: navy });
  y -= 28;
  const subtitle = [data.report.suburb, data.report.municipality].filter(Boolean).join(" | ");
  if (subtitle) { page.drawText(safeText(subtitle), { x: margin, y, size: 9.5, font, color: muted }); y -= 26; }
  detailGrid();
  transferTable();
  drawOwnership();
  await growthActivity();

  const pages = pdfDoc.getPages();
  pages.forEach((p, idx) => {
    p.drawText(`Page ${idx + 1} of ${pages.length}`, { x: width - margin - 58, y: 16, size: 7, font, color: rgb(1,1,1) });
  });
  const outputBytes = await pdfDoc.save();
  const fileSafe = (data.report.schemeName || "Blue Lily Complex Report").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return { outputBytes, filename: `${fileSafe}-Blue-Lily-Complex-Report.pdf` };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
async function previewPdf(download = false) {
  if (!els.schemeName.value.trim()) { setStatus("Capture data first or load the demo.", "error"); return; }
  const btn = download ? els.downloadPdfBtn : els.previewPdfBtn;
  btn.disabled = true;
  setStatus(download ? "Building PDF download..." : "Building PDF preview...");
  try {
    const { outputBytes, filename } = await buildPdfBytes();
    const blob = new Blob([outputBytes], { type: "application/pdf" });
    if (state.currentPdfUrl) URL.revokeObjectURL(state.currentPdfUrl);
    state.currentPdfUrl = URL.createObjectURL(blob);
    state.currentPdfFilename = filename;
    els.pdfPreview.src = state.currentPdfUrl;
    els.downloadLink.href = state.currentPdfUrl;
    els.downloadLink.download = filename;
    els.downloadLink.classList.remove("hidden");
    if (download) downloadBlob(blob, filename);
    setStatus(download ? "PDF downloaded and preview updated." : "PDF preview ready.", "success");
  } catch (err) {
    console.error(err);
    setStatus(`PDF failed: ${err.message}`, "error");
  } finally {
    btn.disabled = false;
  }
}
function downloadJson() {
  const data = collectData();
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), "blue-lily-complex-report-data.json");
}
async function loadJson(file) {
  if (!file) return;
  try {
    applyFullData(JSON.parse(await file.text()));
    setStatus("Editable JSON loaded.", "success");
  } catch (err) {
    setStatus(`JSON load failed: ${err.message}`, "error");
  }
}

els.loadAgentsBtn.addEventListener("click", loadAgentsFromUrl);
els.agentSelect.addEventListener("change", applySelectedAgent);
els.parseReportBtn.addEventListener("click", parseReport);
els.demoBtn.addEventListener("click", () => { populateAgentDropdown([demoData.agent]); applyFullData(demoData); setStatus("Demo data loaded.", "success"); });
els.addTransferRowBtn.addEventListener("click", () => addTransferRow());
els.extractGraphBtn.addEventListener("click", renderGraphFromPdfBytes);
els.clearGraphBtn.addEventListener("click", clearGraphImage);
els.previewPdfBtn.addEventListener("click", () => previewPdf(false));
els.downloadPdfBtn.addEventListener("click", () => previewPdf(true));
els.saveJsonBtn.addEventListener("click", downloadJson);
els.jsonFile.addEventListener("change", e => loadJson(e.target.files[0]));

populateAgentDropdown(BUILT_IN_AGENTS);
setTransferRows([]);
