export type SeverityLevel = 'illegal' | 'deceptive' | 'caution' | 'valid';

export interface RedFlag {
  id: string;
  quote: string;
  title: string;
  severity: SeverityLevel;
  statute: string;
  lawName: string;
  explanation: string;
  enforceability: 'Unenforceable (Illegal)' | 'Highly Questionable' | 'Strictly Enforceable';
  consumerAdvice: string;
}

export interface CoverageItem {
  category: string;
  description: string;
  covered: boolean;
  duration?: string;
  conditions?: string;
}

export interface StateLemonLaw {
  stateCode: string;
  stateName: string;
  statuteRef: string;
  repairAttemptsThreshold: number;
  daysOutOfServiceThreshold: number;
  safetyDefectAttemptsThreshold: number;
  coveragePeriod: string;
  impliedWarrantyWaivable: boolean;
  remedies: string[];
  attorneyFeesShift: boolean;
  specialRules: string[];
}

export interface LegalAnalysisResult {
  productType: string;
  stateCode: string;
  protectionScore: number; // 0 - 100
  summary: string;
  warrantyType: 'Full' | 'Limited' | 'Disclaimed / As-Is' | 'Unspecified';
  extractedDuration: string;
  redFlags: RedFlag[];
  coverageList: CoverageItem[];
  magnusonMossCompliance: {
    isCompliant: boolean;
    violationsCount: number;
    hasIllegalVoidIf: boolean;
    hasIllegalTieIn: boolean;
    hasImpliedDisclaimer: boolean;
  };
  lemonLawInfo: StateLemonLaw;
  rawText: string;
}

export interface SampleWarranty {
  id: string;
  title: string;
  category: string;
  description: string;
  text: string;
}

export interface DisputeLetterData {
  consumerName: string;
  consumerAddress: string;
  consumerPhoneEmail: string;
  companyName: string;
  companyAddress: string;
  productNameModel: string;
  purchaseDate: string;
  serialNumber: string;
  purchasePrice: string;
  stateCode: string;
  defectDescription: string;
  repairHistory: string;
  demandedRemedy: 'Full Refund' | 'Replacement Product' | 'Free Repair Under Warranty' | 'Reimbursement for Independent Repair';
}
