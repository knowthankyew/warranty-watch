import { StateLemonLaw } from './types';
import { LOADED_STATE_LEMON_LAWS } from './policy-loader';

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

export const STATE_LEMON_LAWS: Record<string, StateLemonLaw> = LOADED_STATE_LEMON_LAWS;

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
