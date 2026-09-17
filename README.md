# WarrantyWatch 🛡️

> Plain-English legal analyzer for product manuals, warranty cards, and consumer contracts under the **Magnuson-Moss Warranty Act** (15 U.S.C. § 2301 et seq.) and 50-state lemon/UCC laws.

[![MIT License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Offline%20%26%20Air--Gapped-teal.svg)](#100-local-first--zero-telemetry-architecture)
[![Ethos](https://img.shields.io/badge/Ethos-knowthankyew%20Public%20Good-cyan.svg)](#knowthankyew-ethos)

---

## 📹 Interactive Demo

![WarrantyWatch Functionality Demo](demo.gif)

*Watch `demo.mp4` recorded via Playwright to see WarrantyWatch analyze an illegal "void if seal broken" laptop warranty, cross-reference Massachusetts non-waivable implied warranty protections, and generate a formal statutory demand letter.*

---

## 💡 What is WarrantyWatch?

**WarrantyWatch** is an offline, privacy-first legal deconstruction tool designed to empower consumers against unconscionable warranty clauses, deceptive fine print, and unlawful disclaimers. 

Paste a product manual, service contract, or upload a photo/scan of a physical warranty card to receive:
1. **Consumer Protection Rating (0–100)**: Visual gauge evaluating contract fairness and statutory compliance.
2. **Federal Red Flags & Unenforceable Term Alerts**: Identifies illegal anti-tampering sticker bans, third-party repair restrictions, mandatory registration card rules, and disclaimed implied warranties under **15 U.S.C. § 2302(c)** and **FTC Rule 16 C.F.R. § 700.7**.
3. **50-State Lemon & UCC Law Protections**: Dynamic statutory guidance based on state jurisdiction—differentiating automotive lemon laws from general consumer goods protections under **U.C.C. § 2-608** (Revocation of Acceptance) and non-waivable state acts (e.g. California Song-Beverly Act, Massachusetts M.G.L. c. 106 § 2-316A).
4. **Statutory Demand Letter Generator**: Prefills a formal dispute demand letter citing federal and state statutes with 1-click copying and print-to-PDF formatting.
5. **Client-Side WASM OCR**: Embedded offline Tesseract.js engine for scanning physical warranty stickers and document photos without sending data to remote servers.

---

## 🔒 100% Local-First & Zero-Telemetry Architecture

Built in accordance with the **knowthankyew** public-good standard:
- **Air-Gapped Operation**: 100% client-side execution in the browser.
- **Zero Third-Party Requests**: WebAssembly OCR binaries (`/public/ocr/`), UI fonts, and icons are bundled locally; zero calls to external CDNs, analytics, or remote LLM endpoints.
- **In-Memory Privacy**: No warranty contracts, addresses, or serial numbers are saved to remote servers or local storage.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18+) & npm

### Running Locally

```bash
# Clone repository
git clone https://github.com/knowthankyew/warranty-watch.git
cd warranty-watch

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building Production Bundle

```bash
npm run build
```

---

## 🎬 Playwright Video Recording Script

Generate a clean Playwright browser demo video (`demo.mp4` and `demo.gif`) automatically:

```bash
# Execute automated Playwright recording script
bash scripts/record-demo.sh
```

---

## ⚖️ Educational Legal Disclaimer

> **Legal Disclaimer**: WarrantyWatch is an automated informational and educational tool built as a local-first public good. It is not an attorney, law firm, or substitute for professional legal counsel. Use of this application does not establish an attorney-client relationship. Generated dispute letters, statutory breakdowns, and legal ratings are self-help reference templates intended for consumer education. Consumer rights vary by jurisdiction and factual circumstance.

---

## 📄 License

Licensed under the open-source [MIT License](LICENSE) — free public good software for consumer empowerment.
