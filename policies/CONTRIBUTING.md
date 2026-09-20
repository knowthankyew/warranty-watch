# Contributing Statutory Warranty Policies to Warranty-Watch

Welcome! You can contribute or update state lemon laws, warranty protections, and federal regulations without writing or modifying any TypeScript code.

## How to Add or Update a Jurisdiction

1. **Locate or Create the Policy File**:
   - Files are stored in `policies/jurisdictions/<STATE_CODE>.json` (e.g. `policies/jurisdictions/CO.json`).
   - If adding a new state, copy `policies/templates/jurisdiction-template.json` to `policies/jurisdictions/<STATE_CODE>.json`.

2. **Update the Fields**:
   - `jurisdiction.code`: State code (e.g., `"CO"`).
   - `jurisdiction.name`: Full name (e.g., `"Colorado"`).
   - `metadata.statuteRef`: Statutory citation (e.g., `"C.R.S. § 42-10-101"`).
   - `metadata.officialSourceUrl`: Official legislative or attorney general URL.
   - `lemonLaw.repairAttemptsThreshold`: Repair attempts before lemon presumption (e.g., 3 or 4).
   - `lemonLaw.daysOutOfServiceThreshold`: Days out of service threshold (e.g., 30).
   - `lemonLaw.safetyDefectAttemptsThreshold`: Attempts for serious safety defects (e.g., 1 or 2).
   - `lemonLaw.coveragePeriod`: Statutory coverage window.
   - `lemonLaw.impliedWarrantyWaivable`: Whether the state allows "as-is" disclaimer of implied warranties for consumer goods.
   - `lemonLaw.remedies`: Statutory remedies available to prevailing consumers.
   - `lemonLaw.attorneyFeesShift`: Whether the statute shifts attorney fees and costs to the manufacturer.

3. **Validate Your Changes**:
   ```bash
   npm run validate:policies
   ```

4. **Submit a Pull Request**:
   Open a PR against `main`. Our CI will validate the policy against the schema.
