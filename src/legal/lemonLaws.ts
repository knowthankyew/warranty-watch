import { StateLemonLaw } from './types';

export const STATE_LEMON_LAWS: Record<string, StateLemonLaw> = {
  CA: {
    stateCode: 'CA',
    stateName: 'California',
    statuteRef: 'Cal. Civ. Code § 1793.22 (Tanner Consumer Protection Act)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '18 months or 18,000 miles (presumption window)',
    impliedWarrantyWaivable: false, // Song-Beverly Consumer Warranty Act protects consumer implied warranties
    remedies: ['Full Refund (minus reasonable mileage offset)', 'Replacement Vehicle/Product', 'Mandatory Attorney Fee & Cost Shift'],
    attorneyFeesShift: true,
    specialRules: [
      'Song-Beverly Consumer Warranty Act extends implied warranties to all consumer goods.',
      'Prevailing consumers recover 100% of reasonable attorney fees and costs.',
      'Mandatory civil penalty up to 2x damages for willful failure to repurchase.'
    ]
  },
  NY: {
    stateCode: 'NY',
    stateName: 'New York',
    statuteRef: 'N.Y. Gen. Bus. Law § 198-a (New Car) & § 198-b (Used Car)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '2 years or 18,000 miles',
    impliedWarrantyWaivable: false,
    remedies: ['Full Refund including taxes and fees', 'Replacement Item', 'Attorney Fees'],
    attorneyFeesShift: true,
    specialRules: [
      'New York law prohibits disclaiming implied warranties on new consumer items.',
      'State-run arbitration program provides binding, low-cost resolution for consumers.'
    ]
  },
  FL: {
    stateCode: 'FL',
    stateName: 'Florida',
    statuteRef: 'Fla. Stat. § 681.102 (Motor Vehicle Warranty Enforcement Act)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 15,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '24 months from original delivery',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund of purchase price', 'Replacement Product', 'Attorney Fees & Costs'],
    attorneyFeesShift: true,
    specialRules: [
      'Short 15 days out of service threshold triggers lemon presumption.',
      'Must submit dispute to Florida Attorney General Lemon Law Arbitration Board.'
    ]
  },
  TX: {
    stateCode: 'TX',
    stateName: 'Texas',
    statuteRef: 'Tex. Occ. Code § 2301.601 et seq.',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '2 years or 24,000 miles (whichever occurs first)',
    impliedWarrantyWaivable: true,
    remedies: ['Refund (minus reasonable usage deduction)', 'Replacement', 'Incidental Expenses'],
    attorneyFeesShift: true,
    specialRules: [
      'Applies to serious safety defects occurring within 1 year or 12,000 miles.',
      'Administered through Texas Department of Motor Vehicles Motor Vehicle Division.'
    ]
  },
  MA: {
    stateCode: 'MA',
    stateName: 'Massachusetts',
    statuteRef: 'Mass. Gen. Laws ch. 90, § 7N1/2 & Ch. 93A',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 15,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '1 year or 15,000 miles',
    impliedWarrantyWaivable: false, // Strictly illegal to disclaim implied warranties under MA Ch. 106 § 2-316A
    remedies: ['Full Refund', 'Replacement', 'Double to Treble Damages under Ch. 93A for unfair business practices'],
    attorneyFeesShift: true,
    specialRules: [
      'MGL Ch. 106 § 2-316A strictly bans ANY disclaimer of implied warranties of merchantability for consumer goods.',
      'Ch. 93A demand letter can trigger treble damages for failure to honor valid warranty.'
    ]
  },
  IL: {
    stateCode: 'IL',
    stateName: 'Illinois',
    statuteRef: '815 ILCS 380/ (New Vehicle Buyer Protection Act)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '1 year or 12,000 miles',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund', 'Replacement Product', 'Attorney Fees'],
    attorneyFeesShift: true,
    specialRules: ['Presumption applies if defect continues after 4 repair attempts or 30 cumulative calendar days.']
  },
  PA: {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    statuteRef: '73 P.S. § 1951 et seq. (Automobile Lemon Law)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '1 year or 12,000 miles',
    impliedWarrantyWaivable: true,
    remedies: ['Refund of full purchase price', 'Replacement', 'Attorney Fees & Costs'],
    attorneyFeesShift: true,
    specialRules: ['Manufacturer must pay all statutory fees and consumer costs upon prevailing.']
  },
  NJ: {
    stateCode: 'NJ',
    stateName: 'New Jersey',
    statuteRef: 'N.J.S.A. 56:12-29 et seq. (Motor Vehicle Lemon Law)',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 20,
    safetyDefectAttemptsThreshold: 1,
    coveragePeriod: '2 years or 24,000 miles',
    impliedWarrantyWaivable: false,
    remedies: ['Full Purchase Price Refund', 'Replacement Unit', 'Mandatory Counsel Fees'],
    attorneyFeesShift: true,
    specialRules: [
      'New Jersey Consumer Fraud Act allows treble damages for deceptive warranty practices.',
      '20 days out of service threshold triggers lemon protections.'
    ]
  },
  WA: {
    stateCode: 'WA',
    stateName: 'Washington',
    statuteRef: 'RCW 19.118 (Motor Vehicle Warranty Act)',
    repairAttemptsThreshold: 4,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '2 years or 24,000 miles',
    impliedWarrantyWaivable: false,
    remedies: ['Full Refund', 'Replacement', 'Attorney Fees & Statutory Costs'],
    attorneyFeesShift: true,
    specialRules: ['Washington Consumer Protection Act provides enhanced remedies for unlawful warranty disclaimers.']
  },
  DEFAULT: {
    stateCode: 'US',
    stateName: 'General US State Standard',
    statuteRef: 'Uniform Commercial Code (UCC § 2-314) & State Lemon Statutes',
    repairAttemptsThreshold: 3,
    daysOutOfServiceThreshold: 30,
    safetyDefectAttemptsThreshold: 2,
    coveragePeriod: '1–2 years or express warranty term',
    impliedWarrantyWaivable: true,
    remedies: ['Full Refund or Fair Market Replacement', 'Repair of Defect', 'Incidental Damages'],
    attorneyFeesShift: true,
    specialRules: [
      'Federal Magnuson-Moss Act governs written warranties in all 50 states.',
      'Prevailing consumers under Magnuson-Moss (§ 2310(d)(2)) recover attorney fees and court costs.'
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

export function getLemonLawForState(stateCode: string): StateLemonLaw {
  const code = stateCode.toUpperCase();
  if (STATE_LEMON_LAWS[code]) {
    return STATE_LEMON_LAWS[code];
  }
  return {
    ...STATE_LEMON_LAWS.DEFAULT,
    stateCode: code,
    stateName: ALL_US_STATES.find(s => s.code === code)?.name || code
  };
}
