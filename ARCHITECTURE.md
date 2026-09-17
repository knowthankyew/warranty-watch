# WarrantyWatch Architecture Specification

**WarrantyWatch** is a 100% local-first, privacy-respecting ("knowthankyew" style) web application licensed under the MIT License as a Public Good. It provides consumers with instant, plain-English legal breakdowns of product manuals, warranty cards, and consumer contracts under the **Magnuson-Moss Warranty Act** (15 U.S.C. § 2301 et seq.) and 50-state lemon laws.

---

## 1. Core Principles & Privacy Model

- **100% Local Client-Side Execution**: All natural language processing, legal rule matching, image OCR, state law matching, and report generation occur strictly inside the user's web browser.
- **Zero External Network Requests**: No telemetry, no remote APIs, no user data collection, no analytics, no cloud storage.
- **Public Good**: Free, open-source software (MIT License) designed for consumer empowerment.

---

## 2. Technical Stack & Layout

```
                        ┌──────────────────────────────────────────────┐
                        │          WarrantyWatch React SPA             │
                        └──────────────────────┬───────────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
  ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
  │   Client-Side OCR       │     │   Legal Rules Engine    │     │ State Lemon Law DB      │
  │ (Tesseract.js WASM/JS)  │     │ (Magnuson-Moss 15 USC)  │     │ (50 US States + DC)     │
  └────────────┬────────────┘     └────────────┬────────────┘     └────────────┬────────────┘
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │    Dispute Letter Generator & PDF/MD Export   │
                        └──────────────────────────────────────────────┘
```

- **Framework**: Vite + React 18 + TypeScript.
- **Styling**: Tailwind CSS + Custom CSS (dark mode glassmorphism, responsive visual design).
- **Icons**: Lucide React icons (embedded SVG).
- **OCR Engine**: Tesseract.js (WASM / Web Worker client-side text recognition for warranty stickers and manual photos).
- **Exporting**: Local Markdown exporter & print-optimized PDF renderer.

---

## 3. Component Architecture

### 3.1 Legal Rules & Heuristics Engine (`src/legal/`)

1. **`magnusonMoss.ts`**:
   - **15 U.S.C. § 2302(c) (Tie-In Sales Prohibition)**: Flags illegal clauses mandating official brand repair services or OEM-only replacement parts, as well as "Void if sticker removed / seal broken" anti-tampering badges.
   - **15 U.S.C. § 2304 (Full Warranty Minimum Standards)**: Flags full warranties imposing repair fees, shipping costs, or restrictive remedy limits.
   - **15 U.S.C. § 2308 (Implied Warranty Disclaimer Ban)**: Flags illegal "AS IS" or implied warranty disclaimers when a written warranty is supplied.
   - **FTC Rule 16 C.F.R. § 700.7 (Registration Cards)**: Flags clauses asserting warranty invalidity if registration cards are not returned.

2. **`lemonLaws.ts`**:
   - Structured dataset for 50 US States + DC detailing repair attempt limits (e.g. 3–4 attempts, 30 cumulative out-of-service days), safety defect thresholds, eligibility windows, and non-waivable implied warranty state overrides (MA, MD, ME, MS, NH, NJ, NY, OR, VT, WV).

3. **`parser.ts`**:
   - Regular expression pattern matchers & keyword distance analyzers to score overall Consumer Protection (0–100), extract active coverage terms, and flag enforceable vs. illegal terms.

4. **`ocr.ts`**:
   - Client-side Tesseract OCR integration for document images and photo uploads.

5. **`disputeLetter.ts`**:
   - Legal demand letter builder pre-populating statutory citations, consumer details, seller info, and specific defect notices.

### 3.2 User Interface Components (`src/components/`)

- **`Header.tsx`**: Navigation, offline status, MIT License indicator, sample preset loader.
- **`WarrantyInput.tsx`**: Drag-and-drop text & image upload zone with OCR status indicators.
- **`ExecutiveSummary.tsx`**: Protection score visualizer, total red flags counter, and statutory compliance status.
- **`RedFlagsList.tsx`**: Interactive cards detailing illegal terms, statutory citations, and consumer action steps.
- **`CoverageBreakdown.tsx`**: Plain-English breakdown of parts, labor, timeline, and exclusions.
- **`StateLemonLawCard.tsx`**: State-specific legal rights based on selected US state.
- **`DisputeLetterGenerator.tsx`**: Dynamic demand letter creator with copy/print capabilities.
- **`ExportModal.tsx`**: Exporting analysis reports to Markdown or PDF.

---

## 4. Git & Release Workflow

1. Initial commit contains `ARCHITECTURE.md` (Commit Message: `ARCHITECTURE`).
2. Full codebase implementation with 100% offline verification.
3. MIT License declaration in `LICENSE` and UI footer.
