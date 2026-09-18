export interface MagnusonMossRule {
  id: string;
  pattern: RegExp;
  title: string;
  severity: 'illegal' | 'deceptive' | 'caution';
  statute: string;
  lawName: string;
  explanation: string;
  enforceability: 'Unenforceable (Illegal)' | 'Highly Questionable' | 'Strictly Enforceable';
  consumerAdvice: string;
}

export const MAGNUSON_MOSS_RULES: MagnusonMossRule[] = [
  {
    id: 'anti_tampering_sticker',
    pattern: /(void\s+if\s+(removed|broken|damaged|tampered|seal|sticker|label))|(warranty\s+void\s+if\s+seal\s+is\s+broken)|(do\s+not\s+remove\s+seal)/i,
    title: 'Illegal Anti-Tampering / Void-If-Sticker Clause',
    severity: 'illegal',
    statute: '15 U.S.C. § 2302(c) & FTC Enforcement Guidance',
    lawName: 'Magnuson-Moss Warranty Act § 102(c)',
    explanation: 'Under federal law (15 U.S.C. § 2302(c)), warrantors cannot condition warranty coverage on keeping a sticker, seal, or label intact. The FTC has repeatedly issued warning letters confirming that "Void If Seal Broken" stickers are illegal unless the manufacturer provides the service or parts for free.',
    enforceability: 'Unenforceable (Illegal)',
    consumerAdvice: 'You can legally open your device or break warranty seals without forfeiting your warranty rights, unless the manufacturer proves your action directly caused the defect.'
  },
  {
    id: 'third_party_repair_ban',
    pattern: /(void\s+if\s+(?:repaired|serviced|opened|altered|modified)(?:\s+or\s+\w+)*\s+by\s+(?:unauthorized|third\s*party|non-factory|anyone\s+other\s+than))|(must\s+use\s+only\s+genuine\s+(?:\w+\s+)?(?:parts|components|accessories))|(void\s+if\s+non-oem\s+parts)/i,
    title: 'Illegal Tie-In Sales & Third-Party Repair Ban',
    severity: 'illegal',
    statute: '15 U.S.C. § 2302(c)',
    lawName: 'Magnuson-Moss Anti-Tie-In Provision',
    explanation: 'Warrantors are strictly prohibited from requiring consumers to use specific brand-name parts or authorized repair shops to maintain warranty coverage, unless those parts or services are provided completely free of charge under the warranty.',
    enforceability: 'Unenforceable (Illegal)',
    consumerAdvice: 'Using independent repair shops or third-party compatible replacement parts does NOT invalidate your product warranty.'
  },
  {
    id: 'implied_warranty_disclaimer',
    pattern: /(disclaims?\s+all\s+(other\s+)?warranties)|(no\s+implied\s+warranty\s+of\s+merchantability)|(sold\s+"?as\s*is"?)|(in\s+lieu\s+of\s+all\s+other\s+warranties,\s+express\s+or\s+implied)/i,
    title: 'Illegal Disclaimer of Implied Warranties',
    severity: 'illegal',
    statute: '15 U.S.C. § 2308(a)',
    lawName: 'Magnuson-Moss § 108 Prohibition on Disclaimers',
    explanation: 'If a seller or manufacturer gives a written warranty (or enters a service contract), federal law strictly forbids them from disclaiming implied warranties of merchantability and fitness for a particular purpose.',
    enforceability: 'Unenforceable (Illegal)',
    consumerAdvice: 'Even if the contract says "No Implied Warranties" or "AS IS", the seller remains legally bound by the implied warranty of merchantability because a written warranty was supplied.'
  },
  {
    id: 'mandatory_registration_card',
    pattern: /(must\s+(return|mail|submit)\s+(registration|warranty)\s+card)|(warranty\s+(?:is\s+)?void\s+unless\s+registered\s+within)|(registration\s+required\s+for\s+coverage)/i,
    title: 'Illegal Mandatory Registration Card Clause',
    severity: 'deceptive',
    statute: '16 C.F.R. § 700.7',
    lawName: 'FTC Disclosure Rule 16 C.F.R. § 700.7',
    explanation: 'A warrantor cannot condition warranty coverage on the consumer returning a warranty registration card, unless the warranty is designated as a Full Warranty and the requirement is explicitly disclosed.',
    enforceability: 'Unenforceable (Illegal)',
    consumerAdvice: 'Failure to mail back a registration card or fill out an online registration form does not void your warranty rights if you have proof of purchase.'
  },
  {
    id: 'consumer_shipping_fee_demand',
    pattern: /(customer\s+must\s+pay\s+all\s+shipping\s+and\s+handling)|(owner\s+responsible\s+for\s+freight\s+costs)|(shipping\s+fees\s+non-refundable)/i,
    title: 'Shipping Fee Requirement Under Warranty',
    severity: 'caution',
    statute: '15 U.S.C. § 2304(a)(1)',
    lawName: 'Magnuson-Moss Full Warranty Standards',
    explanation: 'If a warranty is labeled as a "Full Warranty", requiring the consumer to pay shipping or handling fees to receive warranty service violates federal full warranty standards. Under a Limited Warranty, shipping fees may be assessed only if clearly disclosed.',
    enforceability: 'Highly Questionable',
    consumerAdvice: 'If the warranty claims to be a "Full Warranty", challenge any request to pay shipping or diagnostic fees.'
  },
  {
    id: 'unreasonable_notice_window',
    pattern: /(must\s+notify\s+within\s+(5|7|10|14)\s+days\s+of\s+(purchase|defect|delivery))|(claim\s+void\s+if\s+not\s+reported\s+immediately)/i,
    title: 'Deceptive Short Notice Window',
    severity: 'deceptive',
    statute: '15 U.S.C. § 2302(a)',
    lawName: 'Magnuson-Moss Clear Disclosure Mandate',
    explanation: 'Imposing extremely short notification windows (e.g. 5–14 days) to report hidden defects creates an unreasonable duty on consumers and is routinely rejected by courts as unconscionable.',
    enforceability: 'Highly Questionable',
    consumerAdvice: 'You are legally entitled to report a covered defect within a reasonable timeframe during the warranty period, regardless of strict 10-day notice clauses.'
  },
  {
    id: 'forced_binding_arbitration',
    pattern: /(mandatory\s+binding\s+arbitration)|(waives?\s+(all\s+)?right\s+to\s+jury\s+trial)|(no\s+class\s+action)/i,
    title: 'Mandatory Binding Arbitration & Class Waiver',
    severity: 'caution',
    statute: '15 U.S.C. § 2310(a) & FAA Case Law',
    lawName: 'Magnuson-Moss Informal Dispute Settlement Rules',
    explanation: 'While federal courts allow arbitration clauses in written consumer contracts, Magnuson-Moss encourages informal dispute settlement procedures and protects statutory consumer remedies.',
    enforceability: 'Strictly Enforceable',
    consumerAdvice: 'Check if the clause includes an opt-out window (often 30 days from purchase) allowing you to mail an opt-out letter to preserve your right to go to court.'
  }
];
