const STORAGE_KEY = "blue-lily-cma-builder-v22";
const AUTO_SAVE_ENABLED = false;
const AGENT_SHEET_ID = "1OcpmU2rveF1s633NCvCy9BsZN--44lKocjqYSAx5wAY";
const AGENT_SHEET_NAME = "Sheet1";
const AGENT_REFRESH_MS = 5 * 60 * 1000;
const AGENT_WEBSITE = "bluelilysa.co.za";
const PDFJS_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const PROPERTY_TYPES = [
  "SECTIONAL",
  "FREEHOLD",
  "RESIDENTIAL",
  "COMMERCIAL",
  "AGRICULTURAL",
  "INDUSTRIAL",
  "VACANT LAND"
];

const FICA = {
  "": { heading: "", bullets: [] },
  "Individual": {
    heading: "FICA - Individual",
    bullets: [
      "Copy of ID document for South African citizens / passport for foreign nationals",
      "Proof of residential address less than three months old",
      "If proof of address is not in the person's name: third-party declaration, third-party ID, and third-party proof of residential address",
      "SARS document confirming income tax number",
      "Bank document confirming individual banking details less than three months old"
    ]
  },
  "Minor": {
    heading: "FICA - Minor",
    bullets: [
      "Copy of birth certificate, abridged or unabridged, or ID document",
      "Documents confirming legal guardianship, if applicable",
      "SARS document confirming income tax number of minor, if applicable",
      "Proof of residential address less than three months old",
      "Parent or guardian declaration if the minor shares the same residential address or does not have a tax number",
      "Parent or guardian ID document or passport",
      "Parent or guardian proof of residential address",
      "Parent or guardian bank document confirming banking details less than three months old"
    ]
  },
  "Non-Resident Individual": {
    heading: "FICA - Non-Resident Individual",
    bullets: [
      "Copy of foreign ID document or passport",
      "Proof of residential address less than three months old",
      "If proof of address is not in the person's name: third-party declaration, third-party ID, and third-party proof of residential address",
      "Document confirming tax registration number",
      "Bank document confirming foreign bank details less than three months old"
    ]
  },
  "Company": {
    heading: "FICA - Company",
    bullets: [
      "Company CIPC registration documents",
      "Proof of business address less than three months old, if different from registered address",
      "SARS document confirming income tax or VAT registration number for the company",
      "Resolution on company letterhead signed by all directors nominating authorised signatory or representative",
      "Bank document confirming company banking details less than three months old",
      "For authorised signatory, CEO, directors and 25% or more beneficial owners: ID and proof of address",
      "Register of shareholders or written statement showing ownership and control structure, if requested",
      "Proof of source of funds"
    ]
  },
  "Close Corporation": {
    heading: "FICA - Close Corporation",
    bullets: [
      "Copy of Founding Statement CK1 and Certificate of Incorporation",
      "CK2 for any changes to members, if applicable",
      "Proof of business address less than three months old",
      "SARS document confirming income tax or VAT registration number",
      "Resolution signed by members nominating authorised signatory or representative",
      "Bank document confirming close corporation banking details less than three months old",
      "For authorised signatory and each member: copy of ID and proof of residential address less than three months old",
      "Proof of source of funds"
    ]
  },
  "Trust": {
    heading: "FICA - Trust",
    bullets: [
      "Copy of Trust Deed and any deeds of amendment, if applicable",
      "Copy of Letters of Authority from the Master",
      "Proof of trust address less than three months old",
      "SARS document confirming tax registration number of the trust",
      "Bank document confirming trust banking details less than three months old",
      "Trustee resolution authorising the sale and nominating authorised signatory",
      "For trustees, founder, donor, protector, beneficiaries and authorised signatory: ID or passport and proof of address",
      "Proof of source of funds"
    ]
  },
  "Estate Late": {
    heading: "FICA - Estate Late",
    bullets: [
      "Death certificate of the deceased",
      "Copy of ID of the deceased",
      "Letters of Executorship or Letters of Authority",
      "Executor's copy of ID or passport",
      "Executor's proof of residential address less than three months old",
      "Estate bank document confirming banking details, if available",
      "Master's reference number",
      "Power of attorney and FICA documents if an agent signs for the executor"
    ]
  }
};

const OWNERSHIP = {
  "Full Title": {
    heading: "PROPERTY - Full Title",
    bullets: [
      "Title deed",
      "Current municipal rates statement",
      "Rates clearance figures when requested by conveyancer",
      "Approved building plans, if available",
      "Occupation certificate, if available",
      "Bond cancellation details, if property is bonded"
    ]
  },
  "Full Title Estate / HOA": {
    heading: "PROPERTY - Full Title Estate / HOA",
    bullets: [
      "Title deed",
      "Current municipal rates statement",
      "HOA constitution / rules",
      "Estate conduct rules and architectural guidelines, if applicable",
      "Latest HOA levy statement",
      "HOA levy clearance figures",
      "HOA consent to transfer / clearance certificate, if required",
      "Latest HOA financial statements, if requested by buyer, bank, or conveyancer",
      "Approved building plans, if available",
      "Bond cancellation details, if property is bonded"
    ]
  },
  "Sectional Title": {
    heading: "PROPERTY - Sectional Title",
    bullets: [
      "Title deed",
      "Current municipal rates statement",
      "Latest levy statement",
      "Levy clearance figures from managing agent or body corporate",
      "Body corporate Management Rules",
      "Body corporate Conduct Rules",
      "Latest body corporate financial statements or annual accounts",
      "Insurance schedule or insurance confirmation",
      "Sectional title plans, if available",
      "Special levy details, if applicable",
      "Minutes of latest AGM, if available",
      "Bond cancellation details, if property is bonded"
    ]
  },
  "Share Block": {
    heading: "PROPERTY - Share Block",
    bullets: [
      "Share certificate or share block certificate",
      "Use agreement or occupation agreement",
      "Share block company registration documents",
      "Company MOI or constitution",
      "Rules of the scheme",
      "Latest levy statement",
      "Clearance figures from the share block company",
      "Latest financial statements of the share block company",
      "Directors' resolution or consent to transfer, if required",
      "Proof of seller's shareholding and right of use",
      "Bond or finance settlement details, if applicable"
    ]
  },
  "Vacant Land": {
    heading: "PROPERTY - Vacant Land",
    bullets: [
      "Title deed",
      "Current municipal rates statement",
      "Rates clearance figures when requested by conveyancer",
      "Zoning certificate or zoning information, if available",
      "Approved site development plan, if applicable",
      "Service availability information, if available",
      "Bond cancellation details, if property is bonded"
    ]
  },
  "Farm / Agricultural Holding": {
    heading: "PROPERTY - Farm / Agricultural Holding",
    bullets: [
      "Title deed",
      "Current municipal rates statement",
      "Rates clearance figures when requested by conveyancer",
      "Zoning or land-use information",
      "Water rights or borehole documentation, if applicable",
      "Servitudes, access rights, and wayleave information, if applicable",
      "Approved building plans, if available",
      "Bond cancellation details, if property is bonded"
    ]
  }
};

const STANDARD_DOCS = {
  heading: "STANDARD SELLER / TRANSFER DOCUMENTS",
  bullets: [
    "Seller ID documents",
    "Marriage certificate and antenuptial contract, if applicable",
    "Divorce order / settlement agreement, if applicable",
    "Bond account details, if bonded",
    "Municipal account",
    "Rates clearance figures",
    "Signed mandate and signed sale agreement",
    "Proof of seller banking details",
    "Property condition report / disclosure document"
  ]
};

function blankRows(count){
  return Array.from({ length: count }, () => ({ plotSize: "", builtArea: "", salesPrice: "" }));
}

const COMPLIANCE = {
  electrical: {
    heading: "COMPLIANCE - Electrical Certificate of Compliance",
    bullets: [
      "Electrical Certificate of Compliance for the property",
      "Confirm that alterations or additions after previous COC are covered",
      "Keep invoice / electrician details with the certificate"
    ]
  },
  solar: {
    heading: "COMPLIANCE - Solar / Inverter / PV Installation",
    bullets: [
      "Electrical COC must include the solar, inverter or PV installation where applicable",
      "Solar installation certificate and installer details, if available",
      "Warranties, manuals and compliance documents for the installed system"
    ]
  },
  electricFence: {
    heading: "COMPLIANCE - Electric Fence Certificate",
    bullets: [
      "Electric fence system certificate from a registered installer",
      "Keep invoice / installer details with the certificate"
    ]
  },
  gas: {
    heading: "COMPLIANCE - Gas Certificate",
    bullets: [
      "Gas Certificate of Conformity for any gas installation",
      "Confirm gas bottles, lines and appliances are included where applicable"
    ]
  },
  bugs: {
    heading: "COMPLIANCE - Beetle / Bugs Certificate",
    bullets: [
      "Beetle / bugs certificate where required by province, bank, buyer or conveyancer",
      "Use a reputable provider and keep invoice details with the certificate"
    ]
  },
  water: {
    heading: "COMPLIANCE - Water Installation Certificate",
    bullets: [
      "City of Cape Town water installation certificate, if applicable",
      "Certificate to be obtained by the seller before transfer where required"
    ]
  }
};

const defaultData = {
  owner: "",
  address: "",
  preparedBy: "",
  agentFfc: "",
  agentPhone: "",
  agentEmail: "",
  agentWebsite: AGENT_WEBSITE,
  erfSize: "",
  underRoof: "",
  purchasePrice: "",
  purchaseDate: "",
  propertyType: "",
  condition: "Good",
  feature1: "",
  feature2: "",
  feature3: "",
  less1: "",
  less2: "",
  less3: "",
  marketArea: "",
  competing: "",
  recentSales: "",
  highestPrice: "",
  lowestPrice: "",
  medianPrice: "",
  avgPsm: "",
  marketValue: "",
  soldRows: blankRows(8),
  activeRows: blankRows(7),
  recommendation: "Market Value",
  recommendationText: "RECOMMENDED TO SELL AT MARKET VALUE",
  fica1: "Individual",
  fica2: "",
  ownershipType: "Full Title Estate / HOA",
  province: "Gauteng",
  solar: "No",
  electricFence: "No",
  gas: "No",
  bugs: "Auto",
  water: "No",
  standardDocs: "Yes",
  activeImages: [],
  offerImages: [],
  reportImported: false,
  reportType: ""
};

const sampleData = {
  ...defaultData,
  owner: "MARLYN FERREIRA",
  address: "1 BOOM STREET, ERMELO",
  preparedBy: "DAWIE DU TOIT",
  agentFfc: "1229447",
  agentPhone: "+271234567890",
  agentEmail: "dawie@bluelilysa.co.za",
  agentWebsite: AGENT_WEBSITE,
  reportImported: true,
  reportType: "Output Example",
  erfSize: "1000",
  underRoof: "400",
  purchasePrice: "1750000",
  purchaseDate: "2013-04-01",
  propertyType: "VACANT LAND",
  condition: "Good",
  feature1: "XXX",
  feature2: "XXXX",
  feature3: "XXXXX",
  less1: "ZZZ",
  less2: "ZZZZ",
  less3: "ZZZZZ",
  marketArea: "MONTANA",
  competing: "122",
  recentSales: "75",
  highestPrice: "1050000",
  lowestPrice: "995000",
  medianPrice: "1022500",
  avgPsm: "8894",
  marketValue: "2178291",
  soldRows: [
    { plotSize: "", builtArea: "111", salesPrice: "995000" },
    { plotSize: "", builtArea: "119", salesPrice: "1050000" },
    ...blankRows(6)
  ],
  activeRows: [
    { plotSize: "", builtArea: "123", salesPrice: "1200000" },
    { plotSize: "", builtArea: "102", salesPrice: "995000" },
    { plotSize: "", builtArea: "102", salesPrice: "995000" },
    { plotSize: "", builtArea: "105", salesPrice: "1150000" },
    ...blankRows(3)
  ],
  recommendation: "Market Value",
  recommendationText: "RECOMENDED TO SELL AT MARKET VALUE",
  fica1: "Individual",
  fica2: "",
  ownershipType: "Full Title Estate / HOA",
  province: "Gauteng",
  solar: "No",
  electricFence: "No",
  gas: "No",
  bugs: "No",
  water: "No",
  standardDocs: "Yes",
  activeImages: [],
  offerImages: []
};

let state = makeCleanState();
let agents = [];
let agentRefreshTimer = null;

function populateSelects(){
  document.querySelectorAll(".property-type-select").forEach(select => {
    select.innerHTML = `<option value="">Select property type</option>` + PROPERTY_TYPES.map(key => `<option value="${escapeHtml(key)}">${key}</option>`).join("");
  });
  document.querySelectorAll(".fica-select").forEach(select => {
    select.innerHTML = Object.keys(FICA).map(key => `<option value="${escapeHtml(key)}">${key || "None"}</option>`).join("");
  });
  document.querySelectorAll(".ownership-select").forEach(select => {
    select.innerHTML = Object.keys(OWNERSHIP).map(key => `<option value="${escapeHtml(key)}">${key}</option>`).join("");
  });
}

function populateAgentSelect(){
  document.querySelectorAll(".agent-select").forEach(select => {
    const current = state.preparedBy || select.value || "";
    const uniqueAgents = dedupeAgents(agents);
    const options = uniqueAgents.length
      ? [`<option value="">Select agent</option>`, ...uniqueAgents.map(agent => `<option value="${escapeHtml(agent.name)}">${escapeHtml(agent.name)}</option>`)]
      : [`<option value="">No agents loaded</option>`];
    select.innerHTML = options.join("");
    select.value = uniqueAgents.some(agent => normalize(agent.name) === normalize(current)) ? current : "";
  });
}

async function loadAgentsFromSheet(options = {}){
  const status = document.getElementById("agentSheetStatus");
  const silent = Boolean(options.silent);
  const csvUrl = `https://docs.google.com/spreadsheets/d/${AGENT_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(AGENT_SHEET_NAME)}&cacheBust=${Date.now()}`;
  if(status && !silent) status.textContent = "Loading agents from Google Sheet...";
  try{
    const response = await fetch(csvUrl, { cache: "no-store" });
    if(!response.ok) throw new Error(`Google Sheet returned ${response.status}`);
    const csvText = await response.text();
    const loadedAgents = parseAgentCsv(csvText);
    if(!loadedAgents.length) throw new Error("No agent records found. Check that row 1 has Name, Number, Email and FFC.");
    agents = loadedAgents;
    localStorage.setItem("blue-lily-agent-cache", JSON.stringify(agents));
    populateAgentSelect();
    updateSelectedAgentFromSheet();
    syncForm();
    saveState();
    render();
    if(status) status.textContent = `Agent list updated from Google Sheet (${agents.length} agent${agents.length === 1 ? "" : "s"}).`;
  }catch(error){
    try{
      const cached = JSON.parse(localStorage.getItem("blue-lily-agent-cache") || "[]");
      if(Array.isArray(cached) && cached.length){
        agents = cached;
        populateAgentSelect();
        updateSelectedAgentFromSheet();
        syncForm();
        render();
        if(status) status.textContent = "Using cached agent list. Check Google Sheet sharing if new agents do not appear.";
        return;
      }
    }catch(cacheError){}
    populateAgentSelect();
    if(status) status.textContent = "Could not load agent list. Make sure the Google Sheet is shared for viewing.";
    console.error("Agent sheet load failed:", error);
  }
}

function parseAgentCsv(csvText){
  const rows = parseCsv(csvText).filter(row => row.some(cell => String(cell || "").trim()));
  if(!rows.length) return [];
  const headers = rows[0].map(header => String(header || "").trim().toLowerCase());
  const index = {
    name: findHeader(headers, ["name", "agent", "prepared by", "preparedby"]),
    phone: findHeader(headers, ["number", "phone", "cell", "mobile", "contact"]),
    email: findHeader(headers, ["email", "e-mail", "mail"]),
    ffc: findHeader(headers, ["ffc", "agent ffc", "ffcnr", "ffc number"]),
  };
  return rows.slice(1).map(row => ({
    name: String(row[index.name] || "").trim(),
    phone: String(row[index.phone] || "").trim(),
    email: String(row[index.email] || "").trim(),
    ffc: String(row[index.ffc] || "").trim(),
    website: AGENT_WEBSITE
  })).filter(agent => agent.name);
}

function parseCsv(text){
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for(let i = 0; i < text.length; i += 1){
    const char = text[i];
    const next = text[i + 1];
    if(char === '"'){
      if(inQuotes && next === '"'){ cell += '"'; i += 1; }
      else inQuotes = !inQuotes;
    }else if(char === "," && !inQuotes){
      row.push(cell);
      cell = "";
    }else if((char === "\n" || char === "\r") && !inQuotes){
      if(char === "\r" && next === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    }else{
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

function findHeader(headers, candidates){
  for(const candidate of candidates){
    const exact = headers.findIndex(header => normalizeHeader(header) === normalizeHeader(candidate));
    if(exact !== -1) return exact;
  }
  for(const candidate of candidates){
    const partial = headers.findIndex(header => normalizeHeader(header).includes(normalizeHeader(candidate)));
    if(partial !== -1) return partial;
  }
  return -1;
}

function normalizeHeader(value){
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function dedupeAgents(list){
  const seen = new Set();
  return (list || []).filter(agent => {
    const key = normalize(agent.name);
    if(!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function applyAgentByName(agentName){
  const selected = agents.find(agent => normalize(agent.name) === normalize(agentName));
  if(!selected) return;
  state.preparedBy = selected.name;
  state.agentPhone = selected.phone || "";
  state.agentEmail = selected.email || "";
  state.agentFfc = selected.ffc || "";
  state.agentWebsite = AGENT_WEBSITE;
}

function updateSelectedAgentFromSheet(){
  if(!state.preparedBy) return;
  applyAgentByName(state.preparedBy);
}

function bindInputs(){
  renderComparableInputs();
  document.querySelectorAll("[data-field]").forEach(input => {
    input.addEventListener("input", () => {
      state[input.dataset.field] = input.value;
      if(input.dataset.field === "preparedBy"){
        applyAgentByName(input.value);
        syncForm();
      }
      saveState();
      render();
    });
    input.addEventListener("change", () => {
      state[input.dataset.field] = input.value;
      if(input.dataset.field === "preparedBy"){
        applyAgentByName(input.value);
        syncForm();
      }
      saveState();
      render();
    });
  });
  const reportInput = document.getElementById("propertyReportPdf");
  if(reportInput) reportInput.addEventListener("change", handlePropertyReportUpload);
  document.getElementById("activeImages").addEventListener("change", event => handleImages(event, "activeImages", 5));
  document.getElementById("offerImages").addEventListener("change", event => handleImages(event, "offerImages", 5));
  document.getElementById("loadSample").addEventListener("click", () => {
    state = { ...sampleData, soldRows: normalizeRowArray(sampleData.soldRows, 8), activeRows: normalizeRowArray(sampleData.activeRows, 7), activeImages: [], offerImages: [], reportImported: true, reportType: "Output Example" };
    resetFileInputs();
    syncForm();
    saveState();
    render();
    setReportStatus("Loaded output example. Market statistics calculations are active for this example.");
  });
  document.getElementById("clearData").addEventListener("click", () => {
    state = makeCleanState();
    resetFileInputs();
    syncForm();
    saveState();
    render();
  });
  document.getElementById("saveJson").addEventListener("click", downloadBackup);
  document.getElementById("importJson").addEventListener("change", importBackup);
  document.getElementById("exportPdf").addEventListener("click", exportPdf);
  document.getElementById("printPdf").addEventListener("click", () => { render(); applyDynamicFitting(); setTimeout(() => window.print(), 60); });
}

function handleImages(event, key, limit){
  const files = [...event.target.files].slice(0, limit);
  const readers = files.map(file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  }));
  Promise.all(readers).then(images => {
    state[key] = images;
    event.target.value = "";
    saveState();
    render();
  });
}



async function handlePropertyReportUpload(event){
  const file = event.target.files && event.target.files[0];
  if(!file) return;

  // A new property report must always start from a clean app state.
  // This prevents old owners, market rows, photos or calculations from carrying over.
  state = makeCleanState();
  resetFileInputs({ keepReportInput: true });
  syncForm();
  render();
  setReportStatus("Reading property report PDF and resetting the CMA...");

  try{
    const text = await extractPdfText(file);
    const parsed = parseImportedReportText(text);
    if(!parsed || !parsed.data || !Object.keys(parsed.data).length){
      throw new Error("The app could not recognise enough information in this PDF.");
    }
    applyImportedReport(parsed);
    const rowsLoaded = parsed.soldRows ? Math.min(parsed.soldRows.length, 8) : 0;
    const rowText = rowsLoaded ? ` ${rowsLoaded} comparable sale row${rowsLoaded === 1 ? "" : "s"} loaded.` : "";
    setReportStatus(`Imported ${parsed.type}. Market statistics calculations are now active.${rowText} You can still edit every field manually.`);
  }catch(error){
    console.error("Property report import failed:", error);
    state = makeCleanState();
    syncForm();
    render();
    setReportStatus("Could not import this PDF. The app has been reset. You can still complete the CMA manually, but market stats calculations only activate after a recognised property report PDF is imported.");
    alert("The property report could not be imported. The app has been reset.");
  }finally{
    event.target.value = "";
  }
}

async function extractPdfText(file){
  if(!window.pdfjsLib){
    throw new Error("PDF reader library did not load.");
  }
  if(window.pdfjsLib.GlobalWorkerOptions){
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
  }
  const buffer = await file.arrayBuffer();
  const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;
  const pages = [];
  for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1){
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(textContentToLines(content.items).join("\n"));
  }
  return pages.join("\n\n--- PAGE BREAK ---\n\n");
}

function textContentToLines(items){
  const bits = (items || [])
    .filter(item => item && item.str && String(item.str).trim())
    .map(item => ({
      str: String(item.str).trim(),
      x: Number(item.transform && item.transform[4]) || 0,
      y: Number(item.transform && item.transform[5]) || 0
    }))
    .sort((a, b) => Math.abs(b.y - a.y) > 2 ? b.y - a.y : a.x - b.x);

  const lines = [];
  bits.forEach(bit => {
    const current = lines[lines.length - 1];
    if(!current || Math.abs(current.y - bit.y) > 2.5){
      lines.push({ y: bit.y, parts: [bit] });
    }else{
      current.parts.push(bit);
    }
  });

  return lines.map(line => line.parts
    .sort((a, b) => a.x - b.x)
    .map(part => part.str)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
  ).filter(Boolean);
}

function parseImportedReportText(rawText){
  const text = cleanReportText(rawText);
  if(/The Virtual Agent Report|PROPERTY REPORT/i.test(text)){
    return parseTvaReport(text);
  }
  if(/Powered by LOOM|Comparative Market Analysis for/i.test(text)){
    return parseLoomReport(text);
  }

  const loom = parseLoomReport(text);
  if(Object.keys(loom.data).length) return loom;
  const tva = parseTvaReport(text);
  if(Object.keys(tva.data).length) return tva;
  return { type: "Unknown report", data: {} };
}

function applySectionalSizeRules(data){
  if(!data) return data;
  const type = normalizePropertyType(data.propertyType || data.ownershipType || "");
  if(type !== "SECTIONAL") return data;

  const land = number(data.erfSize);
  const floor = number(data.underRoof);

  if(land && floor){
    if(land === floor){
      data.erfSize = "";
      data.underRoof = String(floor);
    }else if(land < floor){
      data.erfSize = String(floor);
      data.underRoof = String(land);
    }else if(land > floor * 5){
      // Avoid using complex / scheme extent as seller land size on sectional-title imports.
      data.erfSize = "";
      data.underRoof = String(floor);
    }
  }else if(land && !floor){
    data.underRoof = String(land);
    data.erfSize = "";
  }else if(!land){
    data.erfSize = "";
  }

  return data;
}

function clearSectionalPlotSizes(rows, propertyType){
  if(normalizePropertyType(propertyType || "") !== "SECTIONAL") return rows || [];
  return (rows || []).map(row => ({ ...row, plotSize: "" }));
}

function extractLoomAddress(lines){
  const start = findLineIndex(lines, "Address");
  if(start < 0) return "";

  const stopLabels = [
    "details", "property description", "property type", "property key", "erf number",
    "unit number", "portion number", "lat long", "deeds extent", "surveyor general extent",
    "mapcode", "municipal valuation", "valuation date", "powered by", "deeds overview",
    "ownership", "bond information", "transfer history"
  ];

  const parts = [];
  const firstLine = lines[start] || "";
  const sameLine = firstLine.replace(/^\s*Address\s*[:\-]?\s*/i, "").trim();
  if(sameLine && normalizeReportLabel(sameLine) !== "address") parts.push(sameLine);

  for(let i = start + 1; i < Math.min(lines.length, start + 12); i += 1){
    const line = String(lines[i] || "").trim();
    if(!line || /^[-–]+$/.test(line)) continue;

    const norm = normalizeReportLabel(line);
    if(stopLabels.some(stop => norm === stop || norm.startsWith(stop + " ") || norm.includes(" " + stop + " "))) break;
    if(isKnownReportLabel(line)) break;
    if(/^(Property Details|Property Overview|Comparative Market Analysis|LOOM)$/i.test(line)) continue;
    if(/^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(line.replace(/\s+/g, ""))) continue;

    parts.push(line);
  }

  return uniqueAddressParts(parts).join(", ");
}

function uniqueAddressParts(parts){
  const seen = new Set();
  return (parts || [])
    .map(part => String(part || "").replace(/\s+/g, " ").replace(/^[,\s]+|[,\s]+$/g, "").trim())
    .filter(part => part && part !== "-")
    .filter(part => {
      const key = normalizeReportLabel(part);
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function isTvaSectionalReport(titleLine, street){
  const title = String(titleLine || "").trim();
  const streetValue = String(street || "").trim();
  if(/^unit\s*\d+[\s,]/i.test(title) || /^unit\s*\d+$/i.test(title)) return true;
  if(/unit\s*\d+/i.test(title) && !sameAddressPart(title, streetValue)) return true;
  return false;
}

function sameAddressPart(a, b){
  return normalizeReportLabel(a) === normalizeReportLabel(b);
}

function parseLoomReport(text){
  const lines = reportLines(text);
  const data = {};
  const soldRows = parseLoomRecentSales(lines);

  const preparedBy = lineAfter(lines, "Comparative Market Analysis for:");
  if(preparedBy) data.preparedBy = preparedBy;

  const loomAddress = extractLoomAddress(lines);
  if(loomAddress) data.address = loomAddress;

  const ownerLines = collectLinesBetween(lines, "Current Owner", ["100%", "Bond Information"]);
  if(ownerLines.length) data.owner = cleanLoomOwnerName(ownerLines);

  const propType = valueAfterLabel(lines, "Property Type");
  if(propType){
    data.propertyType = normalizePropertyType(propType);
    data.ownershipType = ownershipFromPropertyType(propType);
  }

  const deedsExtent = valueAfterLabel(lines, "Deeds Extent");
  const sgExtent = valueAfterLabel(lines, "Surveyor General Extent");
  const isSectionalLoom = normalizePropertyType(data.propertyType || "") === "SECTIONAL";

  // LOOM size rule:
  // Sectional Title: Deeds Extent = unit/floor size, so it goes to Under Roof and Erf Size stays blank.
  // Freehold / full title / vacant land: the single extent shown by LOOM is land/erf size, not floor size.
  if(isSectionalLoom){
    if(deedsExtent) data.underRoof = integerFromText(deedsExtent);
    data.erfSize = "";
  }else{
    const landSize = integerFromText(deedsExtent) || integerFromText(sgExtent);
    if(landSize){
      data.erfSize = landSize;
      data.underRoof = "";
      if(!data.propertyType || normalizePropertyType(data.propertyType) === "RESIDENTIAL") data.propertyType = "FREEHOLD";
      if(!data.ownershipType || data.ownershipType === "Full Title") data.ownershipType = "Full Title";
    }
  }

  const deedsTown = valueAfterLabel(lines, "Deeds Town");
  if(deedsTown) data.marketArea = titleCase(deedsTown);

  const purchase = extractLoomPurchase(lines);
  if(purchase.price) data.purchasePrice = String(purchase.price);
  if(purchase.date) data.purchaseDate = purchase.date;

  const avgSale = moneyAfterPattern(text, /Average Sale Price:\s*(R\s*[\d, ]+)/i);
  const estimatedAvg = valueAfterLabel(lines, "Estimated Avg Area Sale Price");
  if(estimatedAvg) data.marketValue = String(moneyToNumber(estimatedAvg));
  else if(avgSale) data.marketValue = String(avgSale);

  if(soldRows.length){
    data.recentSales = String(soldRows.length);
    const prices = soldRows.map(row => number(row.salesPrice)).filter(Boolean);
    const psm = soldRows.map(row => number(row.builtArea) && number(row.salesPrice) ? number(row.salesPrice) / number(row.builtArea) : 0).filter(Boolean);
    data.highestPrice = String(max(prices));
    data.lowestPrice = String(min(prices));
    data.medianPrice = String(median(prices));
    data.avgPsm = String(average(psm));
  }

  applySectionalSizeRules(data);
  const normalizedSoldRows = clearSectionalPlotSizes(soldRows, data.propertyType);
  return { type: "LOOM CMA report", data, soldRows: normalizedSoldRows };
}


function cleanLoomOwnerName(ownerLines){
  const raw = (Array.isArray(ownerLines) ? ownerLines : [ownerLines])
    .filter(Boolean)
    .map(line => String(line).trim())
    .filter(line => line && line !== "-" && !/^\d+%$/.test(line))
    .join(" ");

  if(!raw) return "";

  let clean = raw
    .replace(/\b\d{13}\b/g, " ")
    .replace(/\bID\s*(NO|NUMBER|NR)?\.?\s*[:#-]?\s*\d[\d\s-]{5,}\b/gi, " ")
    .replace(/\b\d{6,}\b/g, " ")
    .replace(/\b\d+%\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const maritalOrStatus = /\b(MARRIED\s+(IN|OUT)(\s+OF)?(\s+COMMUNITY)?(\s+OF)?(\s+PROPERTY)?|MARRIED\s+OUT|MARRIED\s+IN|MARRIED|UNMARRIED|SINGLE|DIVORCED|WIDOWED|WIDOW|ESTATE\s+LATE|LATE\s+ESTATE|SPOUSE|SURVIVING\s+SPOUSE)\b/i;
  const statusMatch = clean.match(maritalOrStatus);
  if(statusMatch) clean = clean.slice(0, statusMatch.index).trim();

  return clean
    .replace(/[,;:\-]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTvaReport(text){
  const lines = reportLines(text);
  const data = {};
  const soldRows = parseTvaClosestSales(lines);

  const reportIndex = findLineIndex(lines, "PROPERTY REPORT");
  const titleLine = reportIndex >= 0 ? lines[reportIndex + 1] : "";
  const user = valueAfterLabel(lines, "User:");
  if(user) data.preparedBy = titleCase(user);

  const owner = valueAfterLabel(lines, "Current Owner");
  if(owner) data.owner = titleCase(owner);

  const suburb = valueAfterLabel(lines, "Suburb");
  const street = valueAfterLabel(lines, "Street");
  const town = valueAfterLabel(lines, "Town");
  const province = valueAfterLabel(lines, "Province");
  if(province) data.province = titleCase(province);

  const titlePart = titleCase(titleLine);
  const streetPart = titleCase(street);
  const suburbPart = titleCase(suburb || town);
  const isTvaSectional = isTvaSectionalReport(titleLine, street);

  // TVA address rule:
  // Sectional/unit reports use the unit/complex line plus street plus suburb.
  // Full-title/freehold reports often repeat the street in the title and the Street field,
  // so we use the Street field once only, then suburb/town.
  const importedAddress = buildTvaAddress(titlePart, streetPart, suburbPart, isTvaSectional);
  if(importedAddress) data.address = importedAddress;

  const standSize = valueAfterLabel(lines, "Stand Size");
  if(standSize){
    const size = integerFromText(standSize);
    if(isTvaSectional){
      data.underRoof = size;
      data.erfSize = "";
    }else{
      data.erfSize = size;
      data.underRoof = "";
    }
  }

  const purchaseAmount = valueAfterLabel(lines, "Purchase Amount");
  if(purchaseAmount) data.purchasePrice = String(moneyToNumber(purchaseAmount));

  const datePurchased = valueAfterLabel(lines, "Date Purchased");
  if(datePurchased) data.purchaseDate = dateToIso(datePurchased);

  data.propertyType = isTvaSectional ? "SECTIONAL" : "FREEHOLD";
  data.ownershipType = isTvaSectional ? "Sectional Title" : "Full Title";
  data.marketArea = titleCase(suburb || town || "");

  const valuation = findAutomatedValuation(lines);
  if(valuation) data.marketValue = String(valuation);

  if(soldRows.length){
    data.recentSales = String(soldRows.length);
    const prices = soldRows.map(row => number(row.salesPrice)).filter(Boolean);
    const psm = soldRows.map(row => number(row.builtArea) && number(row.salesPrice) ? number(row.salesPrice) / number(row.builtArea) : 0).filter(Boolean);
    data.highestPrice = String(max(prices));
    data.lowestPrice = String(min(prices));
    data.medianPrice = String(median(prices));
    data.avgPsm = String(average(psm));
  }

  applySectionalSizeRules(data);
  const normalizedSoldRows = clearSectionalPlotSizes(soldRows, data.propertyType);
  return { type: "TVA Property Report", data, soldRows: normalizedSoldRows };
}

function parseLoomRecentSales(lines){
  const start = findLineIndex(lines, "Recent Sales and Registrations");
  if(start < 0) return [];
  let end = lines.length;
  const nextSections = ["Sales History in Area", "Average Quarterly Growth Rates", "LOOM Estimation", "Area Details"];
  for(const section of nextSections){
    const idx = findLineIndex(lines.slice(start + 1), section);
    if(idx >= 0) end = Math.min(end, start + 1 + idx);
  }

  const rows = [];
  for(let i = start + 1; i < end; i += 1){
    if(isLoomSaleRowStart(lines, i)){
      const block = [];
      let j = i + 1;
      while(j < end && !isLoomSaleRowStart(lines, j)){
        block.push(lines[j]);
        j += 1;
      }
      const builtLine = block.find(line => /^\d+(?:[.,]\d+)?\s*m[²2]/i.test(line));
      const priceLine = [...block].reverse().find(line => /^R\s*[\d, ]+/.test(line));
      const erfLine = block.find(line => /^\d{2,8}$/.test(line) && !/^0/.test(line));
      if(builtLine && priceLine){
        rows.push({
          plotSize: erfLine ? integerFromText(erfLine) : "",
          builtArea: integerFromText(builtLine),
          salesPrice: String(moneyToNumber(priceLine))
        });
      }
      i = j - 1;
    }
  }
  return rows.filter(row => number(row.builtArea) && number(row.salesPrice));
}

function parseTvaClosestSales(lines){
  const start = findLineIndex(lines, "Closest Most Recent Sales");
  if(start < 0) return [];
  let end = findLineIndex(lines.slice(start + 1), "Transfer History");
  end = end >= 0 ? start + 1 + end : lines.length;

  const rows = [];
  for(let i = start + 1; i < end; i += 1){
    if(/^[A-Z]$/.test(lines[i])){
      const block = [];
      let j = i + 1;
      while(j < end && !/^[A-Z]$/.test(lines[j])){
        block.push(lines[j]);
        j += 1;
      }
      const builtLine = block.find(line => /^\d+(?:[.,]\d+)?\s*m[²2]?$/i.test(line));
      const priceLine = block.find(line => /^R\s*[\d ]+(?:[.,]\d+)?$/.test(line) && moneyToNumber(line) > 50000);
      const erfPortion = block.find(line => /^\d+\s*\/\s*\d+/.test(line));
      if(builtLine && priceLine){
        rows.push({
          plotSize: erfPortion ? erfPortion.split("/")[0].trim() : "",
          builtArea: integerFromText(builtLine),
          salesPrice: String(moneyToNumber(priceLine))
        });
      }
      i = j - 1;
    }
  }
  return rows.filter(row => number(row.builtArea) && number(row.salesPrice));
}

function extractLoomPurchase(lines){
  const result = { price: "", date: "" };
  const start = findLineIndex(lines, "Transfer History");
  if(start < 0) return result;
  for(let i = start + 1; i < Math.min(lines.length, start + 30); i += 1){
    if(/^R\s*[\d, ]+/.test(lines[i])){
      result.price = moneyToNumber(lines[i]);
      for(let j = i - 1; j > start; j -= 1){
        const iso = dateToIso(lines[j]);
        if(iso){
          result.date = iso;
          break;
        }
      }
      break;
    }
  }
  return result;
}

function findAutomatedValuation(lines){
  const predictionIdx = lines.findIndex(line => /prediction/i.test(line));
  if(predictionIdx >= 0){
    for(let i = predictionIdx; i < Math.min(lines.length, predictionIdx + 8); i += 1){
      const value = moneyToNumber(lines[i]);
      if(value > 50000) return value;
    }
  }

  const streetIdx = findLineIndex(lines, "Street Summary");
  const suburbIdx = findLineIndex(lines, "Suburb Summary");
  if(streetIdx >= 0){
    const end = suburbIdx > streetIdx ? suburbIdx : Math.min(lines.length, streetIdx + 80);
    const rows = [];
    for(let i = streetIdx + 1; i < end; i += 1){
      if(/^\d{4}$/.test(lines[i])){
        const block = lines.slice(i, Math.min(end, i + 12));
        const moneyValues = block.map(moneyToNumber).filter(value => value > 50000);
        if(moneyValues.length >= 5){
          rows.push({ year: Number(lines[i]), median: moneyValues[moneyValues.length - 1], average: moneyValues[moneyValues.length - 2] });
        }
      }
    }
    if(rows.length){
      rows.sort((a, b) => b.year - a.year);
      return rows[0].median || rows[0].average;
    }
  }
  return 0;
}

function applyImportedReport(parsed){
  state.reportImported = true;
  state.reportType = parsed.type || "Property Report";
  state.soldRows = blankRows(8);
  state.activeRows = blankRows(7);
  state.activeImages = [];
  state.offerImages = [];
  const incoming = parsed.data || {};
  const simpleFields = [
    "owner", "address", "erfSize", "underRoof", "purchasePrice", "purchaseDate",
    "propertyType", "marketArea", "competing", "recentSales", "highestPrice",
    "lowestPrice", "medianPrice", "avgPsm", "marketValue", "ownershipType",
    "province"
  ];

  simpleFields.forEach(field => {
    if(incoming[field] !== undefined && incoming[field] !== null && String(incoming[field]).trim() !== ""){
      state[field] = incoming[field];
    }
  });

  if(incoming.preparedBy && agents.length){
    const matchingAgent = agents.find(agent => normalize(agent.name) === normalize(incoming.preparedBy));
    if(matchingAgent){
      state.preparedBy = matchingAgent.name;
      applyAgentByName(matchingAgent.name);
    }
  }

  if(Array.isArray(parsed.soldRows) && parsed.soldRows.length){
    state.soldRows = normalizeImportedRows(parsed.soldRows, 8);
  }
  if(Array.isArray(parsed.activeRows) && parsed.activeRows.length){
    state.activeRows = normalizeImportedRows(parsed.activeRows, 7);
  }

  lockWebsite();
  state.propertyType = normalizePropertyType(state.propertyType);
  state.address = sanitizeAddressForOutput(state.address);
  applySectionalSizeRules(state);
  if(state.propertyType === "SECTIONAL"){
    state.soldRows = clearSectionalPlotSizes(state.soldRows, state.propertyType);
    state.activeRows = clearSectionalPlotSizes(state.activeRows, state.propertyType);
  }
  syncForm();
  saveState();
  render();
}

function normalizeImportedRows(rows, length){
  const cleaned = (rows || []).map(row => ({
    plotSize: row.plotSize || "",
    builtArea: row.builtArea || "",
    salesPrice: row.salesPrice || ""
  })).filter(row => row.builtArea || row.salesPrice || row.plotSize);
  while(cleaned.length < length) cleaned.push({ plotSize: "", builtArea: "", salesPrice: "" });
  return cleaned.slice(0, length);
}

function cleanReportText(text){
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\r/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function reportLines(text){
  return cleanReportText(text).split(/\n+/).map(line => line.trim()).filter(Boolean);
}

function findLineIndex(lines, label){
  const target = normalizeReportLabel(label);
  return (lines || []).findIndex(line => normalizeReportLabel(line).includes(target));
}

function valueAfterLabel(lines, label){
  const target = normalizeReportLabel(label);
  for(let i = 0; i < lines.length; i += 1){
    const lineNorm = normalizeReportLabel(lines[i]);
    if(lineNorm === target || lineNorm.startsWith(`${target} `)){
      const sameLineValue = lines[i].slice(label.length).replace(/^[:\s-]+/, "").trim();
      if(sameLineValue && normalizeReportLabel(sameLineValue) !== target) return sameLineValue;
      for(let j = i + 1; j < Math.min(lines.length, i + 7); j += 1){
        if(!lines[j] || normalizeReportLabel(lines[j]) === target) continue;
        if(isKnownReportLabel(lines[j])) continue;
        return lines[j];
      }
    }
  }
  return "";
}

function lineAfter(lines, containsText){
  const idx = findLineIndex(lines, containsText);
  if(idx >= 0 && lines[idx + 1]) return lines[idx + 1];
  return "";
}

function collectLinesBetween(lines, startLabel, stopLabels){
  const start = findLineIndex(lines, startLabel);
  if(start < 0) return [];
  const stops = (stopLabels || []).map(normalizeReportLabel);
  const collected = [];
  for(let i = start + 1; i < lines.length; i += 1){
    const norm = normalizeReportLabel(lines[i]);
    if(stops.some(stop => norm.includes(stop))) break;
    if(lines[i] && !/^[-–]+$/.test(lines[i])) collected.push(lines[i]);
  }
  return collected;
}

function isKnownReportLabel(value){
  const label = normalizeReportLabel(value);
  const known = [
    "province", "suburb", "street", "erf", "current owner", "purchase amount",
    "stand size", "town", "extension", "portion", "date purchased",
    "coordinates lat long", "municipality valuation", "municipal valuation date",
    "report id", "user", "property description", "deeds extent",
    "surveyor general extent", "mapcode", "property type", "valuation date",
    "property key", "erf number", "unit number", "portion number", "lat long",
    "deeds overview", "title deed number", "capture date", "registration date",
    "transaction date", "transaction amount", "deeds town", "deeds office",
    "bond information", "transfer history", "registration date transaction date transaction amount"
  ];
  return known.includes(label);
}

function isLoomSaleRowStart(lines, index){
  const line = lines[index] || "";
  const next = lines[index + 1] || "";
  return /^[1-9]\d?$/.test(line)
    && next
    && !/^R\s/i.test(next)
    && !/^\d+(?:[.,]\d+)?\s*m[²2]/i.test(next)
    && !/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(next)
    && !/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/.test(next)
    && !/^(Powered by|Property Address|Building Extent|Average Sale Price)/i.test(next);
}

function normalizeReportLabel(value){
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function integerFromText(value){
  const match = String(value || "").replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? String(Math.round(Number(match[0]))) : "";
}

function moneyToNumber(value){
  const raw = String(value || "");
  if(!/[Rr]\s*\d/.test(raw) && !/^\d[\d\s,]+$/.test(raw)) return 0;
  return number(raw);
}

function moneyAfterPattern(text, pattern){
  const match = String(text || "").match(pattern);
  return match ? moneyToNumber(match[1] || match[0]) : 0;
}

function dateToIso(value){
  const text = String(value || "").trim();
  if(!text) return "";
  const iso = text.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if(iso){
    return `${iso[1]}-${String(iso[2]).padStart(2, "0")}-${String(iso[3]).padStart(2, "0")}`;
  }
  const wordDate = text.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if(wordDate){
    const months = {
      jan:"01", january:"01", feb:"02", february:"02", mar:"03", march:"03",
      apr:"04", april:"04", may:"05", jun:"06", june:"06", jul:"07", july:"07",
      aug:"08", august:"08", sep:"09", sept:"09", september:"09", oct:"10", october:"10",
      nov:"11", november:"11", dec:"12", december:"12"
    };
    const month = months[wordDate[2].toLowerCase()];
    if(month) return `${wordDate[3]}-${month}-${String(wordDate[1]).padStart(2, "0")}`;
  }
  return "";
}

function ownershipFromPropertyType(value){
  const clean = normalizePropertyType(value);
  if(clean === "SECTIONAL") return "Sectional Title";
  if(clean === "FREEHOLD") return "Full Title";
  if(clean === "VACANT LAND") return "Vacant Land";
  if(clean === "AGRICULTURAL") return "Farm / Agricultural Holding";
  return "Full Title";
}

function titleCase(value){
  return String(value || "")
    .toLowerCase()
    .replace(/\b([a-z])/g, char => char.toUpperCase())
    .replace(/\bPty\b/g, "Pty")
    .replace(/\bLtd\b/g, "Ltd")
    .replace(/\bCc\b/g, "CC");
}

function setReportStatus(message){
  const status = document.getElementById("propertyReportStatus");
  if(status) status.textContent = message;
}

function syncForm(){
  lockWebsite();
  state.propertyType = normalizePropertyType(state.propertyType);
  ensureRows();
  document.querySelectorAll("[data-field]").forEach(input => {
    input.value = state[input.dataset.field] ?? "";
  });
  renderComparableInputs();
}

function syncStateFromForm(){
  document.querySelectorAll("[data-field]").forEach(input => {
    const field = input.dataset.field;
    if(field === "preparedBy"){
      const hasLoadedAgentOptions = Array.from(input.options || []).some(option => option.value && option.value !== "Loading agents...");
      if(!hasLoadedAgentOptions && state.preparedBy) return;
    }
    state[field] = input.value;
  });
  if(state.preparedBy && agents.length) applyAgentByName(state.preparedBy);
  lockWebsite();
  state.propertyType = normalizePropertyType(state.propertyType);
  ensureRows();
}

function render(){
  syncStateFromForm();
  const view = computedView();
  document.querySelectorAll("[data-out]").forEach(el => {
    const field = el.dataset.out;
    let value = view[field] ?? state[field] ?? "";
    if(el.dataset.money === "true") value = money(value);
    el.textContent = value;
  });
  document.querySelectorAll(".condition-option").forEach(item => {
    item.classList.toggle("active", normalize(item.dataset.condition) === normalize(state.condition));
  });
  document.querySelectorAll("[data-price]").forEach(el => {
    el.textContent = money(view.prices[el.dataset.price]);
  });
  renderImages("activeCollage", state.activeImages || [], 5);
  renderImages("offerCollage", state.offerImages || [], 5);
  renderThumbs("activeList", state.activeImages || [], "activeImages");
  renderThumbs("offerList", state.offerImages || [], "offerImages");
  renderCalculatedFields(view);
  updateComparableOutputs(view);
  renderFica();
  applyDynamicFitting();
}

function computedView(){
  ensureRows();
  const canCalculateMarketStats = Boolean(state.reportImported);
  const sold = canCalculateMarketStats ? normalizeComparableRows(state.soldRows) : normalizeComparableRows(state.soldRows).map(row => ({ ...row, pricePsm: 0 }));
  const active = canCalculateMarketStats ? normalizeComparableRows(state.activeRows) : normalizeComparableRows(state.activeRows).map(row => ({ ...row, pricePsm: 0 }));

  const soldPrices = canCalculateMarketStats ? sold.map(row => row.salesPrice).filter(Boolean) : [];
  const activePrices = canCalculateMarketStats ? active.map(row => row.salesPrice).filter(Boolean) : [];
  const soldPsm = canCalculateMarketStats ? sold.map(row => row.pricePsm).filter(Boolean) : [];
  const activePsm = canCalculateMarketStats ? active.map(row => row.pricePsm).filter(Boolean) : [];
  const underRoof = number(state.underRoof);

  const soldEstimateHigh = canCalculateMarketStats && underRoof && soldPsm.length ? underRoof * max(soldPsm) : 0;
  const soldEstimateLow = canCalculateMarketStats && underRoof && soldPsm.length ? underRoof * min(soldPsm) : 0;
  const activeEstimateHigh = canCalculateMarketStats && underRoof && activePsm.length ? underRoof * max(activePsm) : 0;
  const activeEstimateLow = canCalculateMarketStats && underRoof && activePsm.length ? underRoof * min(activePsm) : 0;

  const recommendedValues = canCalculateMarketStats ? [
    ...soldPrices,
    ...activePrices,
    soldEstimateHigh,
    soldEstimateLow,
    activeEstimateHigh,
    activeEstimateLow
  ].filter(Boolean) : [];

  const calculatedMarketValue = canCalculateMarketStats ? average(recommendedValues) : 0;
  const manualMarket = canCalculateMarketStats ? number(state.marketValue) : 0;
  const market = canCalculateMarketStats ? (calculatedMarketValue || manualMarket || number(state.medianPrice) || 0) : 0;
  const recentSales = canCalculateMarketStats ? number(state.recentSales) : 0;
  const competing = canCalculateMarketStats ? number(state.competing) : 0;
  const soldPerMonth = recentSales ? recentSales / 12 : 0;
  const api = competing ? soldPerMonth / competing : 0;
  const marketType = canCalculateMarketStats && api ? (api > 0.2 ? "Sellers Market" : (api < 0.15 ? "Buyers Market" : "Shifting Market")) : "";

  const recommendation = state.recommendation === "Custom" && state.recommendationText.trim()
    ? state.recommendationText.trim()
    : state.recommendationText.trim() || `RECOMMENDED TO SELL AT ${String(state.recommendation || "Market Value").toUpperCase()}`;

  return {
    purchaseDateFormatted: formatDate(state.purchaseDate),
    recommendationFinal: recommendation,
    highestPrice: canCalculateMarketStats ? (max(soldPrices) || number(state.highestPrice)) : "",
    lowestPrice: canCalculateMarketStats ? (min(soldPrices) || number(state.lowestPrice)) : "",
    medianPrice: canCalculateMarketStats ? (median(soldPrices) || number(state.medianPrice)) : "",
    avgPsm: canCalculateMarketStats ? (average(soldPsm) || number(state.avgPsm)) : "",
    marketValue: market,
    calculatedMarketValue,
    soldRows: sold,
    activeRows: active,
    soldHighestSales: canCalculateMarketStats ? max(soldPrices) : "",
    soldHighestPsm: canCalculateMarketStats ? max(soldPsm) : "",
    soldAveragePsm: canCalculateMarketStats ? average(soldPsm) : "",
    soldLowestSales: canCalculateMarketStats ? min(soldPrices) : "",
    soldAveragePrice: canCalculateMarketStats ? average(soldPrices) : "",
    soldMedianPrice: canCalculateMarketStats ? median(soldPrices) : "",
    activeHighestPrice: canCalculateMarketStats ? max(activePrices) : "",
    activeLowestPrice: canCalculateMarketStats ? min(activePrices) : "",
    activeHighestPsm: canCalculateMarketStats ? max(activePsm) : "",
    soldEstimateHigh,
    soldEstimateLow,
    activeEstimateHigh,
    activeEstimateLow,
    soldPerMonth: canCalculateMarketStats ? soldPerMonth : "",
    api: canCalculateMarketStats ? api : "",
    apiPercent: canCalculateMarketStats && api ? `${Math.round(api * 100)}%` : "",
    marketType,
    priceNames: {
      below15: "Fixer Upper",
      below10: "Needs Some Work",
      market: "Recommended",
      above10: "Good",
      above15: "Exceptional"
    },
    prices: {
      below15: market * 0.85,
      below10: market * 0.9,
      market,
      above10: market * 1.1,
      above15: market * 1.15
    }
  };
}

function renderComparableInputs(){
  ensureRows();
  const configs = [
    { key: "soldRows", target: "soldRows", label: "Sold" },
    { key: "activeRows", target: "activeRows", label: "Active" }
  ];
  configs.forEach(config => {
    const target = document.getElementById(config.target);
    if(!target) return;
    target.innerHTML = state[config.key].map((row, index) => `
      <div class="comp-row" data-table="${config.key}" data-index="${index}">
        <input data-comp-field="plotSize" type="number" min="0" placeholder="Plot" value="${escapeHtml(row.plotSize || "")}" />
        <input data-comp-field="builtArea" type="number" min="0" placeholder="Built" value="${escapeHtml(row.builtArea || "")}" />
        <input data-comp-field="salesPrice" type="number" min="0" step="1000" placeholder="Price" value="${escapeHtml(row.salesPrice || "")}" />
        <span class="comp-psm" data-psm="${config.key}-${index}"></span>
      </div>
    `).join("");
    target.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", () => {
        const rowEl = input.closest(".comp-row");
        const table = rowEl.dataset.table;
        const rowIndex = Number(rowEl.dataset.index);
        const field = input.dataset.compField;
        state[table][rowIndex][field] = input.value;
        saveState();
        render();
      });
    });
  });
}

function renderCalculatedFields(view){
  document.querySelectorAll("[data-calc]").forEach(el => {
    const key = el.dataset.calc;
    let value = view[key] ?? "";
    if(el.dataset.percent === "true") value = value ? `${Math.round(number(value) * 100)}%` : "";
    if(el.dataset.money === "true") value = money(value);
    if(el.dataset.integer === "true") value = value ? Math.round(number(value)).toString() : "";
    if(el.tagName === "INPUT") el.value = value;
    else el.textContent = value;
  });
}

function updateComparableOutputs(view){
  ["soldRows", "activeRows"].forEach(key => {
    (view[key] || []).forEach((row, index) => {
      const target = document.querySelector(`[data-psm="${key}-${index}"]`);
      if(target) target.textContent = row.pricePsm ? money(row.pricePsm) : "";
    });
  });
}

function normalizeComparableRows(rows){
  return (rows || []).map(row => {
    const builtArea = number(row.builtArea);
    const salesPrice = number(row.salesPrice);
    return {
      plotSize: number(row.plotSize),
      builtArea,
      salesPrice,
      pricePsm: builtArea && salesPrice ? salesPrice / builtArea : 0
    };
  });
}

function ensureRows(){
  state.soldRows = normalizeRowArray(state.soldRows, 8);
  state.activeRows = normalizeRowArray(state.activeRows, 7);
}

function normalizeRowArray(rows, length){
  const source = Array.isArray(rows) ? rows : [];
  const cleaned = source.map(row => ({
    plotSize: row?.plotSize ?? "",
    builtArea: row?.builtArea ?? "",
    salesPrice: row?.salesPrice ?? ""
  }));
  while(cleaned.length < length) cleaned.push({ plotSize: "", builtArea: "", salesPrice: "" });
  return cleaned.slice(0, length);
}

function makeCleanState(){
  return {
    ...defaultData,
    agentWebsite: AGENT_WEBSITE,
    soldRows: blankRows(8),
    activeRows: blankRows(7),
    activeImages: [],
    offerImages: [],
    reportImported: false,
    reportType: ""
  };
}

function renderImages(targetId, images, limit){
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  for(let i = 0; i < limit; i += 1){
    if(images[i]){
      const img = document.createElement("img");
      img.className = `collage-img img${i + 1}`;
      img.src = images[i];
      target.appendChild(img);
    }
  }
}

function renderThumbs(targetId, images, key){
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "thumb-button";
    button.title = "Click to remove";
    button.innerHTML = `<img src="${src}" alt="Uploaded image ${index + 1}" />`;
    button.addEventListener("click", () => {
      state[key].splice(index, 1);
      saveState();
      render();
    });
    target.appendChild(button);
  });
}

function lockWebsite(){
  state.agentWebsite = AGENT_WEBSITE;
}

function applyDynamicFitting(){
  fitElement(document.querySelector('[data-fit="address"]'), 27, 6.2, {
    lineHeight: 0.98,
    minLineHeight: 0.82,
    step: 0.2
  });
  fitElement(document.querySelector('[data-fit="fica"]'), 13.2, 6.8, {
    lineHeight: 1.17,
    minLineHeight: 1.02,
    step: 0.2
  });
}

function fitElement(el, startSize, minSize, options = {}){
  if(!el) return;
  const step = options.step || 0.5;
  const startLineHeight = options.lineHeight || 1.1;
  const minLineHeight = options.minLineHeight || startLineHeight;
  let size = startSize;
  let lineHeight = startLineHeight;

  el.style.fontSize = `${size}px`;
  el.style.lineHeight = String(lineHeight);
  el.style.overflow = "hidden";
  el.style.whiteSpace = "normal";
  el.style.overflowWrap = "anywhere";
  void el.offsetHeight;

  const overflows = () => (
    el.scrollHeight > el.clientHeight + 1 ||
    el.scrollWidth > el.clientWidth + 1
  );

  while(size > minSize && overflows()){
    size = Math.max(minSize, size - step);
    el.style.fontSize = `${size}px`;
    void el.offsetHeight;
  }

  while(lineHeight > minLineHeight && overflows()){
    lineHeight = Math.max(minLineHeight, lineHeight - 0.01);
    el.style.lineHeight = String(lineHeight);
    void el.offsetHeight;
  }
}

function renderFica(){
  syncStateFromForm();
  const sections = [];

  const addSection = section => {
    if(!section || !section.heading) return;
    sections.push(section);
  };

  [state.fica1, state.fica2].forEach(key => {
    if(key && FICA[key]) addSection(FICA[key]);
  });

  if(state.ownershipType && OWNERSHIP[state.ownershipType]) addSection(OWNERSHIP[state.ownershipType]);

  addSection(COMPLIANCE.electrical);
  if(state.solar === "Yes") addSection(COMPLIANCE.solar);
  if(state.electricFence === "Yes") addSection(COMPLIANCE.electricFence);
  if(state.gas === "Yes") addSection(COMPLIANCE.gas);

  const province = String(state.province || "").trim();
  const needsBugs = state.bugs === "Yes" || (state.bugs === "Auto" && ["Western Cape", "KwaZulu-Natal"].includes(province));
  if(needsBugs) addSection(COMPLIANCE.bugs);

  const needsWater = state.water === "Yes" || (state.water === "Auto" && province === "Western Cape");
  if(needsWater) addSection(COMPLIANCE.water);

  if(state.standardDocs === "Yes") addSection(STANDARD_DOCS);

  const target = document.getElementById("ficaOutput");
  if(!target) return;
  target.innerHTML = sections.map(section => `
    <div class="fica-section">
      <h2>${escapeHtml(section.heading)}</h2>
      <ul>${section.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `).join("");
  target.dataset.sectionCount = String(sections.length);
}

function saveState(){
  // Disabled so each new app load starts clean.
  if(AUTO_SAVE_ENABLED){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

function loadState(){
  // Always start clean. Do not restore previous owners, reports, photos or form inputs.
  localStorage.removeItem(STORAGE_KEY);
  state = makeCleanState();
  ensureRows();
}

function downloadBackup(){
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeName(state.owner || "blue-lily-cma")}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importBackup(event){
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const imported = JSON.parse(reader.result);
      state = { ...defaultData, ...imported, agentWebsite: AGENT_WEBSITE, propertyType: normalizePropertyType(imported.propertyType) };
      ensureRows();
      syncForm();
      saveState();
      render();
    }catch(error){
      alert("The selected file is not a valid CMA backup JSON file.");
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}

async function exportPdf(){
  syncStateFromForm();
  render();
  applyDynamicFitting();
  await nextPaint();
  applyDynamicFitting();

  const report = document.getElementById("pdfReport");
  const pages = report ? [...report.querySelectorAll(".pdf-page")] : [];
  if(!report || !pages.length){
    window.print();
    return;
  }

  const html2canvasFn = getHtml2Canvas();
  const JsPDF = getJsPDF();
  if(!html2canvasFn || !JsPDF){
    window.print();
    return;
  }

  const fileName = `${safeName(state.owner || "Blue-Lily-CMA")}.pdf`;
  const exportButton = document.getElementById("exportPdf");
  const exportStatus = document.getElementById("exportStatus");
  const originalButtonText = exportButton ? exportButton.textContent : "";
  const exportStage = createPdfExportStage();

  try{
    if(exportButton){
      exportButton.disabled = true;
      exportButton.textContent = "Preparing PDF...";
    }
    if(exportStatus) exportStatus.textContent = "Preparing mobile-safe PDF export...";

    document.body.appendChild(exportStage);
    await nextPaint();

    const pdf = new JsPDF({
      unit: "px",
      format: [768, 1024],
      orientation: "portrait",
      compress: true,
      hotfixes: ["px_scaling"]
    });

    for(let index = 0; index < pages.length; index += 1){
      if(exportButton) exportButton.textContent = `Exporting ${index + 1}/${pages.length}`;
      if(exportStatus) exportStatus.textContent = `Exporting PDF page ${index + 1} of ${pages.length}...`;

      const pageClone = pages[index].cloneNode(true);
      preparePageForExport(pageClone);
      exportStage.replaceChildren(pageClone);
      await waitForImages(exportStage);
      await nextPaint();

      const canvas = await renderExportPageToCanvas(html2canvasFn, pageClone);

      if(index > 0){
        pdf.addPage([768, 1024], "portrait");
      }

      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, 768, 1024, "F");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 768, 1024, undefined, "FAST");

      canvas.width = 1;
      canvas.height = 1;
      await nextPaint();
    }

    if(exportStatus) exportStatus.textContent = "PDF ready. It should contain one page per CMA sheet, with no black pages.";
    pdf.save(fileName);
  }catch(error){
    console.error("PDF export failed:", error);
    if(exportStatus) exportStatus.textContent = "Direct export failed. Use Print / Save PDF as the fallback.";
    alert("The direct PDF export failed. The app will open Print / Save PDF instead.");
    window.print();
  }finally{
    exportStage.remove();
    if(exportButton){
      exportButton.disabled = false;
      exportButton.textContent = originalButtonText || "Export PDF";
    }
  }
}

function getHtml2Canvas(){
  if(window.html2canvas) return window.html2canvas;
  if(typeof html2canvas !== "undefined") return html2canvas;
  return null;
}

function getJsPDF(){
  if(window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if(window.jsPDF) return window.jsPDF;
  return null;
}

function nextPaint(){
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function createPdfExportStage(){
  const stage = document.createElement("div");
  stage.id = "pdfExportStage";
  stage.setAttribute("aria-hidden", "true");
  stage.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "width:768px",
    "height:1024px",
    "margin:0",
    "padding:0",
    "background:#ffffff",
    "z-index:2147483647",
    "overflow:hidden",
    "pointer-events:none"
  ].join(";");
  return stage;
}

function preparePageForExport(page){
  page.style.width = "768px";
  page.style.height = "1024px";
  page.style.minWidth = "768px";
  page.style.minHeight = "1024px";
  page.style.maxWidth = "768px";
  page.style.maxHeight = "1024px";
  page.style.margin = "0";
  page.style.padding = "0";
  page.style.display = "block";
  page.style.position = "relative";
  page.style.overflow = "hidden";
  page.style.transform = "none";
  page.style.transformOrigin = "top left";
  page.style.boxShadow = "none";
  page.style.background = "#ffffff";
  page.style.pageBreakAfter = "auto";
  page.style.breakAfter = "auto";
}

async function renderExportPageToCanvas(html2canvasFn, page){
  const attempts = getCanvasExportScales().map(scale => ({ scale }));
  let lastError = null;

  for(const attempt of attempts){
    try{
      const canvas = await html2canvasFn(page, {
        backgroundColor: "#ffffff",
        scale: attempt.scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: 768,
        height: 1024,
        windowWidth: 768,
        windowHeight: 1024,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        imageTimeout: 8000,
        removeContainer: true
      });

      if(canvasLooksBlack(canvas)){
        canvas.width = 1;
        canvas.height = 1;
        throw new Error("Canvas rendered as a black page. Retrying at a safer scale.");
      }

      return canvas;
    }catch(error){
      lastError = error;
      await nextPaint();
    }
  }

  throw lastError || new Error("Could not render PDF page.");
}

function getCanvasExportScales(){
  const ua = navigator.userAgent || "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua) || Math.min(window.innerWidth || 0, window.innerHeight || 0) < 820;
  return isMobile ? [1, 0.85] : [1.5, 1];
}

function canvasLooksBlack(canvas){
  try{
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if(!context) return false;

    const width = canvas.width;
    const height = canvas.height;
    const sampleSize = 10;
    let blackSamples = 0;
    let checkedSamples = 0;

    for(let y = 0; y < height; y += Math.max(1, Math.floor(height / sampleSize))){
      for(let x = 0; x < width; x += Math.max(1, Math.floor(width / sampleSize))){
        const pixel = context.getImageData(x, y, 1, 1).data;
        const alpha = pixel[3];
        const brightness = pixel[0] + pixel[1] + pixel[2];
        checkedSamples += 1;
        if(alpha > 240 && brightness < 35) blackSamples += 1;
      }
    }

    return checkedSamples > 0 && blackSamples / checkedSamples > 0.82;
  }catch(error){
    return false;
  }
}

function waitForImages(root){
  const images = [...root.querySelectorAll("img")];
  if(!images.length) return Promise.resolve();

  return Promise.all(images.map(img => new Promise(resolve => {
    if(img.complete && img.naturalWidth !== 0){
      resolve();
      return;
    }
    const finish = () => resolve();
    img.addEventListener("load", finish, { once: true });
    img.addEventListener("error", finish, { once: true });
    setTimeout(finish, 8000);
  })));
}

function average(values){
  const nums = values.map(number).filter(value => value !== 0 && Number.isFinite(value));
  if(!nums.length) return 0;
  return nums.reduce((sum, value) => sum + value, 0) / nums.length;
}

function median(values){
  const nums = values.map(number).filter(value => value !== 0 && Number.isFinite(value)).sort((a, b) => a - b);
  if(!nums.length) return 0;
  const middle = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[middle] : (nums[middle - 1] + nums[middle]) / 2;
}

function max(values){
  const nums = values.map(number).filter(value => value !== 0 && Number.isFinite(value));
  return nums.length ? Math.max(...nums) : 0;
}

function min(values){
  const nums = values.map(number).filter(value => value !== 0 && Number.isFinite(value));
  return nums.length ? Math.min(...nums) : 0;
}

function number(value){
  if(value === null || value === undefined || value === "") return 0;
  const clean = String(value).replace(/[^0-9.-]/g, "");
  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value){
  const n = number(value);
  if(!n) return "";
  return "R\u00A0" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

function formatDate(value){
  if(!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if(Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" });
}

function normalizePropertyType(value){
  const clean = String(value || "").trim().toUpperCase();
  const aliases = {
    "VACANT": "VACANT LAND",
    "VACANT LAND": "VACANT LAND",
    "SECTIONAL": "SECTIONAL",
    "SECTIONAL TITLE": "SECTIONAL",
    "RESIDENTIAL": "RESIDENTIAL",
    "FREEHOLD": "FREEHOLD",
    "FREE HOLD": "FREEHOLD",
    "FULL TITLE": "FREEHOLD",
    "FULLTITLE": "FREEHOLD",
    "COMMERCIAL": "COMMERCIAL",
    "FARM": "AGRICULTURAL",
    "AGRICULTURAL": "AGRICULTURAL",
    "AGRICULTURAL HOLDING": "AGRICULTURAL",
    "INDUSTRIAL": "INDUSTRIAL",
    "TOWNHOUSE": "SECTIONAL",
    "APARTMENT": "SECTIONAL"
  };
  return aliases[clean] || (PROPERTY_TYPES.includes(clean) ? clean : value || "");
}

function normalize(value){
  return String(value || "").trim().toLowerCase();
}

function safeName(value){
  return String(value).trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "Blue-Lily-CMA";
}


function resetFileInputs(options = {}){
  document.querySelectorAll('input[type="file"]').forEach(input => {
    if(options.keepReportInput && input.id === "propertyReportPdf") return;
    input.value = "";
  });
  const reportStatus = document.getElementById("propertyReportStatus");
  if(reportStatus){
    reportStatus.textContent = "No property report imported. Manual entry is available, but market stats calculations only activate after a recognised LOOM/TVA property report PDF is uploaded.";
  }
}

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char]));
}

populateSelects();
bindInputs();
loadState();
resetFileInputs();
syncForm();
render();
loadAgentsFromSheet();
agentRefreshTimer = window.setInterval(() => loadAgentsFromSheet({ silent: true }), AGENT_REFRESH_MS);
window.addEventListener("focus", () => loadAgentsFromSheet({ silent: true }));

// v23 robust address sanitising and TVA/full-title address build
function addressKey(value){
  return normalizeReportLabel(value)
    .replace(/\bstreet\b/g, "st")
    .replace(/\broad\b/g, "rd")
    .replace(/\bavenue\b/g, "ave")
    .replace(/\bdrive\b/g, "dr")
    .replace(/\blane\b/g, "ln")
    .replace(/\bplace\b/g, "pl");
}

function cleanAddressPart(part){
  let value = String(part || "")
    .replace(/\s+/g, " ")
    .replace(/^[,\s]+|[,\s]+$/g, "")
    .trim();
  if(!value) return "";

  const words = value.split(/\s+/);
  for(let len = Math.floor(words.length / 2); len >= 2; len -= 1){
    const first = words.slice(0, len).join(" ");
    const second = words.slice(len, len * 2).join(" ");
    if(addressKey(first) && addressKey(first) === addressKey(second)){
      value = [first, ...words.slice(len * 2)].join(" ").trim();
      break;
    }
  }
  return value;
}

function uniqueAddressParts(parts){
  const seen = new Set();
  return (parts || [])
    .map(part => cleanAddressPart(part))
    .filter(part => part && part !== "-")
    .filter(part => {
      const key = addressKey(part);
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function sanitizeAddressForOutput(value){
  const rawParts = String(value || "")
    .replace(/\n+/g, ", ")
    .split(",")
    .map(part => cleanAddressPart(part))
    .filter(Boolean);

  const cleaned = [];
  rawParts.forEach(part => {
    let current = cleanAddressPart(part);
    if(!current) return;

    const previous = cleaned[cleaned.length - 1];
    if(previous){
      const prevKey = addressKey(previous);
      const currentKey = addressKey(current);
      if(currentKey === prevKey) return;
      if(prevKey && currentKey.startsWith(prevKey + " ")){
        const possibleRemainder = current.slice(previous.length).replace(/^[,\s-]+/, "").trim();
        current = cleanAddressPart(possibleRemainder);
        if(!current) return;
      }
    }

    if(cleaned.some(existing => addressKey(existing) === addressKey(current))) return;
    cleaned.push(current);
  });

  return cleaned.join(", ");
}

function buildTvaAddress(titlePart, streetPart, suburbPart, isSectional){
  const title = cleanAddressPart(titlePart);
  const street = cleanAddressPart(streetPart);
  const suburb = cleanAddressPart(suburbPart);
  const parts = isSectional ? [title, street, suburb] : [street || title, suburb];
  return sanitizeAddressForOutput(uniqueAddressParts(parts).join(", "));
}
