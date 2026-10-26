<!-- diagram-meta
  last-validated: 2026-10-26
  validated-commit: ab363e2
  covers: [src/**]
  generated-by: manual
-->

# Architecture & Invariants Specification: Warranty Watch Reality Engine

> Client-side consumer warranty auditor, Magnuson-Moss Act validator, anti-tying detector, and state lemon law dispute studio.

---

## 1. Executive Summary

`warranty-watch` is a client-side reality engine in the `knowthankyew` portfolio built to protect consumers against defective products and deceptive warranty terms. Operating under zero-egress local processing, it audits product warranty agreements, receipts, and repair histories against federal protections (Magnuson-Moss Warranty Act, 15 U.S.C. § 2301; FTC Anti-Tying Rule, 16 CFR Part 700) and state Lemon Laws (such as California Song-Beverly, New York, and Florida statutes), generating legally grounded warranty breach and refund demands.

---

## 2. System Architecture & Component Interactions

### A. Execution Sandbox & Trust Boundary

```mermaid
flowchart LR
    subgraph ClientEnvironment["Client Browser Sandbox (Air-Gapped)"]
        User["👤 Consumer / Buyer"]

        subgraph Ingestion["1. Ingestion Layer"]
            DocInput["📄 Warranty / Receipt Input<br/><i>(Text, PDF, Image)</i>"]
            LocalOCR["📷 Local OCR Engine<br/><code>src/legal/ocr.ts</code>"]
            Parser["✂️ Warranty Parser<br/><code>src/legal/parser.ts</code>"]
        end

        subgraph CoreEngine["2. Local Evaluation Core"]
            MMWarranty["⚖️ Magnuson-Moss Engine<br/><code>src/legal/magnusonMoss.ts</code>"]
            LemonLaw["🍋 State Lemon Law Engine<br/><code>src/legal/lemonLaws.ts</code>"]
            PolicyPack["📦 @knowthankyew/policy-packs/warranties<br/><i>(15 U.S.C. § 2301, 16 CFR 700, UCC)</i>"]
            DisputeGen["📜 Dispute Notice Generator<br/><code>src/legal/disputeLetter.ts</code>"]
        end

        subgraph Presentation["3. React 19 UI & Controls"]
            Workspace["💻 Warranty Workspace"]
            ViolationGrid["⚠️ Statutory Violations Grid"]
            LemonBarometer["📊 Lemon Law Barometer"]
            DisputeStudio["📝 Dispute Notice Studio"]
            PrivacyModal["🛡️ Privacy Audit Modal"]
            BurnCtrl["🔥 Hard Burn Controller"]
        end

        subgraph TelemetryStore["4. Volatile Telemetry"]
            TelemBuffer["🧠 In-Memory Circular Buffer<br/><i>(Zero Network Egress)</i>"]
        end
    end

    %% Ingestion flow
    User -->|"Uploads Warranty / Receipt / Repair Log"| DocInput
    DocInput --> LocalOCR
    LocalOCR --> Parser
    DocInput --> Parser

    Parser -->|"Extracted Clauses & Repair Counts"| MMWarranty & LemonLaw
    PolicyPack -.->|"Statutory Warranty Baselines"| MMWarranty & LemonLaw

    MMWarranty & LemonLaw -->|"Anti-Tying & Lemon Violations"| Workspace & ViolationGrid & LemonBarometer
    MMWarranty & LemonLaw -->|"Statutory Citations & Remedies"| DisputeGen
    DisputeGen --> DisputeStudio

    Workspace & LemonBarometer -->|"Review Warranty Status"| User
    DisputeStudio -->|"Export Warranty Demand Letter"| User

    %% Telemetry & Burn
    Parser & MMWarranty -.->|"Allowlisted Spans"| TelemBuffer
    TelemBuffer -.->|"Inspect Real-Time Events"| PrivacyModal
    BurnCtrl -->|"Purges Memory & DOM State"| TelemBuffer
    BurnCtrl -->|"Wipes Warranty State"| Parser & Workspace

    classDef client fill:#0f172a,stroke:#64748b,stroke-width:1px,color:#f8fafc;
    classDef comp fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef pkg fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#f8fafc;
    classDef burn fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#f8fafc;

    class DocInput,LocalOCR,Parser,MMWarranty,LemonLaw,DisputeGen,Workspace,ViolationGrid,LemonBarometer,DisputeStudio,PrivacyModal comp;
    class PolicyPack pkg;
    class TelemBuffer,BurnCtrl burn;
```

### B. Warranty Audit & Claim Notice Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Consumer as Consumer / Buyer
    participant UI as React UI (App.tsx)
    participant Parser as Warranty Parser & OCR
    participant Legal as Warranty & Lemon Law Core
    participant Warranties as Policy Packs (Warranties)
    participant Dispute as Dispute Letter Generator
    participant Telem as Telemetry Buffer

    Consumer->>UI: Upload warranty terms, purchase receipt, or repair history
    UI->>Parser: parseWarrantyDocument(input)
    Parser->>Parser: Extract terms, disclaimer clauses, purchase date, and repair attempts
    UI->>Legal: auditWarranty(terms, repairAttempts, jurisdiction)
    Legal->>Warranties: Query Magnuson-Moss requirements & state lemon law repair thresholds
    Warranties-->>Legal: Prohibited terms (unlawful tie-ins, implied warranty disclaimers) & lemon thresholds (e.g. 4 attempts / 30 days)
    Legal->>Legal: Check tie-in clauses (16 CFR Part 700) and lemon status
    Legal-->>UI: Return audit findings & lemon barometer status
    UI->>Telem: Record scan metric (clause_count, duration_ms)
    UI-->>Consumer: Display Violation Cards & Lemon Law Barometer

    Consumer->>UI: Select "Generate Statutory Warranty Demand"
    UI->>Dispute: buildDisputeLetter(violations, manufacturerName, serialNumber)
    Dispute-->>UI: Formatted demand letter citing 15 U.S.C. § 2310(d) and state lemon statutes
    UI-->>Consumer: Render editable formal claim notice

    Consumer->>UI: Click "Burn Local Data"
    UI->>Telem: Purge circular buffer
    UI->>Parser: Dereference all serial numbers, receipts, and warranty text
    UI-->>Consumer: Clean amnesiac reset
```

---

## 3. Core Architectural Invariants

| # | Invariant | Enforcement & Guarantee |
|:--|:----------|:------------------------|
| 1 | **Zero Document Egress** | Product receipts, serial numbers, warranty terms, and repair histories never leave the browser sandbox. |
| 2 | **Volatile Memory Telemetry** | Operational events are held strictly in an in-memory ring buffer for the local privacy modal; zero network export in consumer builds. |
| 3 | **Strict Key Allowlists** | Telemetry sanitizes properties against `SAFE_ALLOWLIST_KEYS`; product names, serial numbers, and purchase costs are redacted. |
| 4 | **Compile-Time Dead Code Shims** | Enterprise network telemetry exporter code is excised at compile time for public consumer builds. |
| 5 | **Amnesiac State Purge (Hard Burn)** | Complete memory purge removing all warranty terms, receipt scans, and OCR canvases. |

---

## 4. Directory Structure

```
warranty-watch/
├── docs/
│   ├── ARCHITECTURE.md          # Architecture, data flow & invariant specification
│   └── PRIVACY_TELEMETRY_SCHEMA.md # Telemetry contract specification
├── src/
│   ├── App.tsx                  # Root application view & workflow orchestration
│   ├── main.tsx                 # Entrypoint
│   ├── index.css                # Tailwind CSS v4 styling
│   ├── components/              # UI components (Workspace, ViolationGrid, LemonBarometer, DisputeStudio)
│   └── legal/
│       ├── parser.ts            # Warranty text & repair log parser
│       ├── magnusonMoss.ts      # Magnuson-Moss Act & FTC Anti-Tying rules
│       ├── lemonLaws.ts         # State lemon law thresholds (CA Song-Beverly, NY, etc.)
│       ├── policy-loader.ts     # Ingestion of @knowthankyew/policy-packs/warranties
│       ├── disputeLetter.ts     # Formal warranty breach / lemon claim generator
│       ├── ocr.ts               # Local OCR engine for paper warranties & receipts
│       ├── sampleWarranties.ts  # Synthetic test warranty terms
│       ├── telemetry.ts         # In-memory privacy telemetry controller
│       └── types.ts             # TypeScript domain definitions
├── tests/                       # Vitest unit test suites
└── vite.config.ts               # Air-gapped bundler configuration
```
