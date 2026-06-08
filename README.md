# Blue Lily Complex Report Builder V2

A clean rebuild of the Blue Lily Complex Report app.

## What this version does

- Uses one upload only: TVA Property Report PDF.
- Uses the new Blue Lily Properties logo from `assets/blue-lily-logo.jpg`.
- Creates the PDF letterhead dynamically inside the app, so the old logo cannot remain in the export.
- Always adds a `Prepared by` agent block on page 1.
- Lets you select or edit agent name, cell, email and PPRA FFC before export.
- Excludes owner names and owner ID numbers from the exported PDF.
- Extracts and edits:
  - Complex / sectional scheme name
  - Suburb / town
  - Municipality
  - Street address
  - Scheme number
  - Number of units
  - Age of scheme
  - Transfer information
  - Period of ownership
  - Age of owners
- Captures Growth and Activity charts without duplicating the Period of Ownership section.
- Generates fallback Blue Lily styled charts from transfer data when chart capture is not available.
- Dynamically paginates long transfer tables.

## Run locally

Do not open `index.html` directly from your file browser. Run a local server:

```bash
cd blue-lily-complex-report
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploy to Netlify

Drag the full `blue-lily-complex-report` folder into Netlify. No build command is needed.

## Agent sheet setup

The app can use:

1. Built-in editable agent details.
2. A public Google Sheet CSV URL.
3. A private Google Sheet through the optional Apps Script bridge in `google-apps-script/Code.gs`.

Recommended agent sheet columns:

```text
Name, Cell, Email, FFC
```

or

```text
First Name, Surname, Cell Phone, Email Address, FFC Number
```

## Notes

TVA report layouts can change. This V2 parser supports both the old table-style transfer layout and the newer block-style transfer layout. If registration dates are not present in the TVA PDF, the app marks the registration date column as `-`.
