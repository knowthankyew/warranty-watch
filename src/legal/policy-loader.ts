import { MagnusonMossRule } from './magnusonMoss';
import { StateLemonLaw } from './types';

import federalPolicy from '../../policies/jurisdictions/federal.json';
import caPolicy from '../../policies/jurisdictions/CA.json';
import nyPolicy from '../../policies/jurisdictions/NY.json';
import flPolicy from '../../policies/jurisdictions/FL.json';
import txPolicy from '../../policies/jurisdictions/TX.json';
import maPolicy from '../../policies/jurisdictions/MA.json';
import ilPolicy from '../../policies/jurisdictions/IL.json';
import paPolicy from '../../policies/jurisdictions/PA.json';
import njPolicy from '../../policies/jurisdictions/NJ.json';
import waPolicy from '../../policies/jurisdictions/WA.json';

interface FederalRuleRaw {
  id: string;
  pattern: string;
  title: string;
  severity: 'illegal' | 'deceptive' | 'caution';
  statute: string;
  lawName: string;
  explanation: string;
  enforceability: 'Unenforceable (Illegal)' | 'Highly Questionable' | 'Strictly Enforceable';
  consumerAdvice: string;
}

interface StateLemonRaw {
  jurisdiction: {
    code: string;
    name: string;
    type: string;
  };
  metadata: {
    statuteRef: string;
  };
  lemonLaw: {
    repairAttemptsThreshold: number;
    daysOutOfServiceThreshold: number;
    safetyDefectAttemptsThreshold: number;
    coveragePeriod: string;
    impliedWarrantyWaivable: boolean;
    remedies: string[];
    attorneyFeesShift: boolean;
    specialRules: string[];
  };
}

// 1. Build Magnuson-Moss Rules
export const LOADED_MAGNUSON_MOSS_RULES: MagnusonMossRule[] = (federalPolicy.federalRules as FederalRuleRaw[]).map((r) => ({
  id: r.id,
  pattern: new RegExp(r.pattern, 'i'),
  title: r.title,
  severity: r.severity,
  statute: r.statute,
  lawName: r.lawName,
  explanation: r.explanation,
  enforceability: r.enforceability,
  consumerAdvice: r.consumerAdvice,
}));

// 2. Build State Lemon Laws
function policyToLemonLaw(raw: StateLemonRaw): StateLemonLaw {
  return {
    stateCode: raw.jurisdiction.code,
    stateName: raw.jurisdiction.name,
    statuteRef: raw.metadata.statuteRef,
    repairAttemptsThreshold: raw.lemonLaw.repairAttemptsThreshold,
    daysOutOfServiceThreshold: raw.lemonLaw.daysOutOfServiceThreshold,
    safetyDefectAttemptsThreshold: raw.lemonLaw.safetyDefectAttemptsThreshold,
    coveragePeriod: raw.lemonLaw.coveragePeriod,
    impliedWarrantyWaivable: raw.lemonLaw.impliedWarrantyWaivable,
    remedies: raw.lemonLaw.remedies,
    attorneyFeesShift: raw.lemonLaw.attorneyFeesShift,
    specialRules: raw.lemonLaw.specialRules,
  };
}

export const LOADED_STATE_LEMON_LAWS: Record<string, StateLemonLaw> = {
  DEFAULT: policyToLemonLaw(federalPolicy as unknown as StateLemonRaw),
  CA: policyToLemonLaw(caPolicy as unknown as StateLemonRaw),
  NY: policyToLemonLaw(nyPolicy as unknown as StateLemonRaw),
  FL: policyToLemonLaw(flPolicy as unknown as StateLemonRaw),
  TX: policyToLemonLaw(txPolicy as unknown as StateLemonRaw),
  MA: policyToLemonLaw(maPolicy as unknown as StateLemonRaw),
  IL: policyToLemonLaw(ilPolicy as unknown as StateLemonRaw),
  PA: policyToLemonLaw(paPolicy as unknown as StateLemonRaw),
  NJ: policyToLemonLaw(njPolicy as unknown as StateLemonRaw),
  WA: policyToLemonLaw(waPolicy as unknown as StateLemonRaw),
};
