import { KtyHandoffPayload } from '@knowthankyew/privacy-telemetry';
import { LegalAnalysisResult, RedFlag, SeverityLevel } from './types';
import { getLemonLawForState } from './lemonLaws';

/**
 * Transforms an incoming KnowThankYew handoff payload into a fully-grounded
 * LegalAnalysisResult, bypassing manual document intake and dropzones.
 */
export function mapHandoffToWarrantyAnalysis(
  payload: KtyHandoffPayload,
  productType = 'Electronics',
  stateCode = 'CA'
): LegalAnalysisResult {
  const redFlags: RedFlag[] = (payload.findings || []).map((f, idx) => {
    let severity: SeverityLevel = 'caution';
    let enforceability: 'Unenforceable (Illegal)' | 'Highly Questionable' | 'Strictly Enforceable' = 'Highly Questionable';
    if (f.severity === 'CRITICAL') {
      severity = 'illegal';
      enforceability = 'Unenforceable (Illegal)';
    } else if (f.severity === 'WARNING') {
      severity = 'deceptive';
      enforceability = 'Highly Questionable';
    }

    const ruleKey = typeof f.ruleId === 'string' && f.ruleId.trim() ? f.ruleId.trim() : 'item';
    return {
      id: `handoff-flag-${ruleKey}-${idx}`,
      quote: f.matchedSnippet || f.title || 'Warranty clause',
      title: f.title || 'Unspecified Warranty Term',
      severity,
      statute: f.statuteCode || 'Magnuson-Moss Statutory Standard',
      lawName: f.statuteTitle || 'Consumer Warranty Protection',
      explanation: f.explanation || 'Statutory review required under applicable warranty laws.',
      enforceability,
      consumerAdvice: f.recommendation || 'Consult your state attorney general or consumer protection agency.',
    };
  });

  const illegalCount = redFlags.filter((r) => r.severity === 'illegal').length;
  const deceptiveCount = redFlags.filter((r) => r.severity === 'deceptive').length;
  const violationsCount = illegalCount + deceptiveCount;
  const rawScore = Number.isFinite(payload.riskScore) ? payload.riskScore : 0;
  const protectionScore = Math.max(0, Math.min(100, Math.round(100 - rawScore)));

  const lemonLawInfo = getLemonLawForState(stateCode, productType);

  const hasIllegalVoidIf = payload.findings.some(
    (f) => f.ruleId?.includes('VOID') || /16\s*C\.?F\.?R\.?\s*§?\s*700\.7|seal\s*broken|void\s*if\s*(?:removed|broken)/i.test(`${f.title} ${f.matchedSnippet}`)
  );
  const hasIllegalTieIn = payload.findings.some(
    (f) => f.ruleId?.includes('TIE-IN') || /2302\s*\(\s*c\s*\)|tie-in|brand\s*only|genuine\s*parts\s*only/i.test(`${f.title} ${f.matchedSnippet}`)
  );
  const hasImpliedDisclaimer = payload.findings.some(
    (f) => f.ruleId?.includes('DISCLAIM') || /2308|as-is|disclaim\w*\s+implied\s+warrant/i.test(`${f.title} ${f.matchedSnippet}`)
  );

  return {
    productType,
    stateCode,
    protectionScore,
    summary: `Live Reality Engine analysis for ${payload.domain}. Extracted ${payload.findings.length} findings with ${violationsCount} potential statutory red flags under Magnuson-Moss and state consumer protection standards.`,
    warrantyType: illegalCount > 0 ? 'Disclaimed / As-Is' : 'Limited',
    extractedDuration: 'Refer to terms',
    redFlags,
    coverageList: [
      {
        category: 'Defects in Material & Workmanship',
        description: 'Statutory coverage under Magnuson-Moss and state implied warranty of merchantability.',
        covered: true,
      },
    ],
    magnusonMossCompliance: {
      isCompliant: violationsCount === 0,
      violationsCount,
      hasIllegalVoidIf,
      hasIllegalTieIn,
      hasImpliedDisclaimer,
    },
    lemonLawInfo,
    rawText: payload.findings.map((f) => `[${f.title}]: ${f.matchedSnippet}`).join('\n\n'),
  };
}
