import { LOADED_MAGNUSON_MOSS_RULES } from './policy-loader';

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

export const MAGNUSON_MOSS_RULES: MagnusonMossRule[] = LOADED_MAGNUSON_MOSS_RULES;
