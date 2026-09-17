import { StateLemonLaw } from './types';

export interface ProductStatutoryProtection {
  stateCode: string;
  stateName: string;
  isVehicle: boolean;
  statuteRef: string;
  governingLawTitle: string;
  repairAttemptsThreshold: number;
  daysOutOfServiceThreshold: number;
  safetyDefectAttemptsThreshold: number;
  coveragePeriod: string;
  impliedWarrantyWaivable: boolean;
  remedies: string[];
  attorneyFeesShift: boolean;
  specialRules: string[];
}

export const STATE_LEMON_LAWS: Record<string, StateLemonLaw> = {
  CA: {
    stateCode: 'CA',
    stateName: 'California',
    statuteRef: 'Cal. Civ. Code § 1793.22 (Tanner Consumer Protection Act) & § 1790 et seq. (Song-Beverly)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '18 months / 18,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: false, // Song-Beverly Act protects ALL consumer goods
    remedies: ['Full Refund (minus reasonable offset)', 'Replacement Unit/Vehicle', 'Mandatory Attorney Fee & Cost Shift'],
    attorneyFeesShift: true,
    specialRules: [
      'Song-Beverly Act extends non-waivable implied warranty protections to ALL consumer goods in California.',
      'Prevailing consumers recover 100% of reasonable attorney fees and costs under Cal. Civ. Code § 1794(d).',
      'Civil penalty up to 2x actual damages for willful failure to repair or repurchase.'
    ]
  },
  NY: {
    stateCode: 'NY',
    stateName: 'New York',
    statuteRef: 'N.Y. Gen. Bus. Law § 198-a (New Car) & U.C.C. § 2-608 (Consumer Goods)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '2 years / 18,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: false,
    remedies: ['Full Refund including taxes & fees', 'Replacement Product', 'Attorney Fees & Costs'],
    attorneyFeesShift: true,
    specialRules: [
      'N.Y. Gen. Bus. Law § 349 prohibits deceptive warranty practices for general consumer goods.',
      'U.C.C. § 2-608 authorizes revocation of acceptance when non-conformity substantially impairs value.'
    ]
  },
  FL: {
    stateCode: 'FL',
    stateName: 'Florida',
    statuteRef: 'Fla. Stat. § 681.102 (Motor Vehicles) & U.C.C. § 672.608 (Consumer Goods)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 15,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '24 months (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund of purchase price', 'Replacement Product', 'Attorney Fees & Costs'],
    attorneyFeesShift: true,
    specialRules: [
      '15 days out of service threshold triggers lemon presumption for motor vehicles.',
      'General consumer goods governed by Fla. Stat. § 501.201 (FDUTPA) and UCC Article 2.'
    ]
  },
  TX: {
    stateCode: 'TX',
    stateName: 'Texas',
    statuteRef: 'Tex. Occ. Code § 2301.601 (Vehicles) & Tex. Bus. & Com. Code § 17.41 (DTPA)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '2 years / 24,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: true,
    remedies: ['Refund (minus usage deduction)', 'Replacement Product', 'Incidental Expenses & DTPA Damages'],
    attorneyFeesShift: true,
    specialRules: [
      'Texas Deceptive Trade Practices Act (DTPA) provides enhanced remedies for unconscionable warranty disclaimers.'
    ]
  },
  MA: {
    stateCode: 'MA',
    stateName: 'Massachusetts',
    statuteRef: 'M.G.L. c. 90 § 7N1/2 (Vehicles), c. 106 § 2-316A & c. 93A (Consumer Goods)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 15,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '1 year / 15,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: false, // MGL c. 106 § 2-316A strictly bans ANY implied warranty disclaimer for consumer goods
    remedies: ['Full Refund', 'Replacement Unit', 'Double to Treble Damages under Ch. 93A'],
    attorneyFeesShift: true,
    specialRules: [
      'M.G.L. c. 106 § 2-316A strictly bans ANY disclaimer of implied warranties of merchantability for consumer goods.',
      'Formal 93A demand letter can trigger double to treble statutory damages for refusal to honor valid warranty.'
    ]
  },
  IL: {
    stateCode: 'IL',
    stateName: 'Illinois',
    statuteRef: '815 ILCS 380/ (Vehicles) & 815 ILCS 505/ (Consumer Fraud Act)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '1 year / 12,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund', 'Replacement Product', 'Attorney Fees'],
    attorneyFeesShift: true,
    specialRules: ['Presumption applies if defect continues after 4 repair attempts or 30 cumulative calendar days.']
  },
  PA: {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    statuteRef: '73 P.S. § 1951 (Vehicles) & 73 P.S. § 201-1 (Unfair Trade Practices)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '1 year / 12,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund', 'Replacement Unit', 'Attorney Fees & Costs'],
    attorneyFeesShift: true,
    specialRules: ['Manufacturer must pay all statutory fees and consumer costs upon prevailing.']
  },
  NJ: {
    stateCode: 'NJ',
    stateName: 'New Jersey',
    statuteRef: 'N.J.S.A. 56:12-29 (Vehicles) & N.J.S.A. 56:8-1 (Consumer Fraud Act)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 20,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '2 years / 24,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: false,
    remedies: ['Full Refund', 'Replacement Product', 'Mandatory Treble Damages & Counsel Fees'],
    attorneyFeesShift: true,
    specialRules: [
      'New Jersey Consumer Fraud Act authorizes treble damages for deceptive warranty practices.',
      '20 cumulative days out of service triggers statutory lemon protections for vehicles.'
    ]
  },
  WA: {
    stateCode: 'WA',
    stateName: 'Washington',
    statuteRef: 'RCW 19.118 (Vehicles) & RCW 19.86 (Consumer Protection Act)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '2 years / 24,000 miles (Vehicles) | Express Warranty Window (Consumer Goods)',
    impliedWarrantyWaivable: false,
    remedies: ['Full Refund', 'Replacement', 'Attorney Fees & Statutory Costs'],
    attorneyFeesShift: true,
    specialRules: ['Washington Consumer Protection Act provides enhanced remedies for unlawful warranty disclaimers.']
  },
  DEFAULT: {
    stateCode: 'US',
    stateName: 'General US State Jurisdiction',
    statuteRef: 'Uniform Commercial Code (U.C.C. § 2-608 & § 2-314) & State Laws',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '1–2 years or express warranty term',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund or Fair Replacement', 'Repair of Defect', 'Incidental & Consequential Damages'],
    attorneyFeesShift: true,
    specialRules: [
      'Federal Magnuson-Moss Act governs written warranties in all 50 states.',
      'U.C.C. § 2-608 allows revocation of acceptance when non-conformity substantially impairs value.'
    ]
  }
};

export const ALL_US_STATES = [
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  { code: 'FL', name: 'Florida' },
  { code: 'TX', name: 'Texas' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'IL', name: 'Illinois' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'WA', name: 'Washington' },
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' }
];

export function getLemonLawForState(stateCode: string, productType: string = 'General'): StateLemonLaw {
  const code = stateCode.toUpperCase();
  const base = STATE_LEMON_LAWS[code] || {
    ...STATE_LEMON_LAWS.DEFAULT,
    stateCode: code,
    stateName: ALL_US_STATES.find(s => s.code === code)?.name || code
  };

  const isVehicle = /automotive|vehicle|car|truck|motorcycle|ev\s+accessory/i.test(productType);

  if (!isVehicle) {
    // Return consumer goods specific statutory details (UCC + State Consumer Goods Protection)
    return {
      ...base,
      statuteRef: `U.C.C. § 2-608 / § 2-314 & ${base.stateName} State Laws`,
      specialRules: [
        `Defective consumer goods (${productType}) are governed by U.C.C. § 2-608 (Revocation of Acceptance for Substantial Non-Conformity) and U.C.C. § 2-314 (Implied Warranty of Merchantability).`,
        ...base.specialRules
      ]
    };
  }

  return base;
}
