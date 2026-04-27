# Blue Lily CMA Online App - v5

This version includes the Sheet 1 calculation logic from the original Excel workbook.

## What is included

- 10-page Blue Lily CMA PDF preview and export.
- Property type dropdown matching the original sheet:
  - SECTIONAL
  - RESIDENTIAL
  - COMMERCIAL
  - AGRICULTURAL
  - INDUSTRIAL
  - VACANT LAND
- Market calculator for:
  - Sold comparable properties
  - Currently on the market properties
  - Price per m² per comparable
  - Lowest sold price
  - Average sold price
  - Median price
  - Highest sold price
  - Average price per m²
  - Recommended market value
  - 15% below, 10% below, market value, 10% above and 15% above
  - Absorption Based Price Index (API)
  - Buyer / shifting / seller market indicator
- On-market image upload page.
- Under-offer screenshot upload page.
- Seller FICA and compliance page.
- Export PDF button.
- Backup/import JSON option.

## Formula logic added

The app follows the same logic as Sheet 1:

- Sold price per m² = Sales Price / Built Area
- Highest sold price = MAX of sold comparable sales prices
- Lowest sold price = MIN of sold comparable sales prices
- Average sold price = AVERAGE of sold comparable sales prices
- Median = MEDIAN of sold comparable sales prices
- Average price per m² = AVERAGE of sold comparable price per m² values
- Active price per m² = Sales Price / Built Area
- Active highest advertised = MAX of active listing sales prices
- Active lowest advertised = MIN of active listing sales prices
- Active highest price per m² = MAX of active listing price per m² values
- Client estimated values = Client under-roof size x comparable price per m² highs/lows
- Recommended price = AVERAGE of sold prices, active advertised prices and client estimated values
- API = (Recent Sales / 12) / Competing Properties
- Market type:
  - API above 20% = Sellers Market
  - API below 15% = Buyers Market
  - API between 15% and 20% = Shifting Market

## Deployment

Upload the full folder to Netlify, GitHub Pages or any static hosting provider.
Open `index.html` locally to test.

## Version 6 updates
- Website output is locked to bluelilysa.co.za for all agents.
- Address and Seller FICA / Compliance output auto-shrinks to fit the PDF template area.
- Competition image pages now allow up to 5 images per page section and preserve image aspect ratio without cropping/stretching.

## Version 7 updates
- Prepared By is now loaded dynamically from the Google Sheet backend.
- The app expects the Google Sheet to have these headers in row 1: Name, Number, Email, FFC.
- When an agent name is selected, Number, Email and FFC auto-populate from the same row.
- The app refreshes the agent list on page load, when the browser window regains focus, and every 5 minutes while open.
- Website remains locked to bluelilysa.co.za for all agents.

## Google Sheet backend
Current sheet ID wired into app.js:
1OcpmU2rveF1s633NCvCy9BsZN--44lKocjqYSAx5wAY

The sheet must be shared so the deployed app can view it. Add new agents to Sheet1 under the existing columns and they will appear in the Prepared By dropdown after refresh.

## Version 8 updates
- Fixed FICA / Compliance live syncing so dropdown changes are pulled into the PDF preview before export.
- Seller FICA and Compliance Certificates output now refreshes from the current form values every time the PDF preview renders.
- Export PDF now forces one final form sync and text fit before generating the PDF.
- FICA / Compliance page text colour has been changed to Blue Lily blue instead of black.
- FICA / Compliance text fitting has been tightened to fit the allocated PDF area better.


## v9 - Optional Property Report / CMA PDF Import

This version adds an optional PDF importer at the top of the form.

Supported import layouts:
- LOOM Comparative Market Analysis reports
- TVA Property Report PDFs

How it works:
1. Upload a supported PDF in the "Optional Property Report / CMA Import" section.
2. The app reads the PDF in the browser.
3. It pre-populates the available fields, including owner, address, property size, purchase information, property type, market area and recent comparable sales.
4. All imported fields remain editable.
5. The upload is optional. The app can still be completed fully manually without a property report.

Notes:
- The app loads up to 8 comparable sale rows into the calculator to match the current CMA calculator layout.
- Agent website remains locked to bluelilysa.co.za.
- Prepared By details still come from the Google Sheet agent backend when a matching agent is selected.


## v10 update
- Strengthened the cover-page address auto-fit for imported LOOM and TVA reports.
- Address text now shrinks further and line-height tightens before export/print, so long imported addresses fit inside the allocated cover-page area.


## Branding update
- Header now shows the Blue Lily logo next to the app name.
- Favicon, Apple touch icon, and Android app icons are included.
- `manifest.json` is included so installed/PWA shortcuts use the Blue Lily icon across supported devices.


## Clean-start update
- The app no longer restores previous form data, imported reports or uploaded images on reload.
- Every new page load starts blank and clean.
- The agent list still refreshes from the Google Sheet backend.
- To keep work intentionally, use Download backup and Import backup.


## v15 update
- LOOM owner import now keeps only the owner name text.
- ID numbers, marital status, spouse/status wording and ownership percentages are removed before the owner field is populated.
- The app still starts clean on every fresh load.


## v16 owner import fix
- LOOM owner import now strips ID numbers and marital/status wording before populating the owner field.
- Example: `BARNARD CHRISTINA HELENA 6004060089089 MARRIED OUT` becomes `BARNARD CHRISTINA HELENA`.
