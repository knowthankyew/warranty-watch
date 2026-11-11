import { describe, it, expect } from 'vitest';
import { mapHandoffToWarrantyAnalysis } from '../../src/legal/handoff-adapter';
import { KtyHandoffPayload } from '@knowthankyew/privacy-telemetry';

describe('WarrantyWatch Handoff Adapter', () => {
  const samplePayload: KtyHandoffPayload = {
    protocolVersion: '1.0.0',
    origin: 'extension',
    destinationTool: 'warranty-watch',
    domain: 'electronics-store.example.com',
    scanTimestamp: '2026-11-10T19:00:00Z',
    riskScore: 65,
    summary: 'Detected 2 unlawful warranty clauses',
    findings: [
      {
        ruleId: 'MM-TIE-IN-01',
        title: 'Unlawful Tie-In Requirement',
        statuteCode: '15 U.S.C. § 2302(c)',
        statuteTitle: 'Magnuson-Moss Warranty Act § 102(c)',
        severity: 'CRITICAL',
        category: 'WARRANTY_DISCLAIMER',
        matchedSnippet: 'Warranty is void unless original manufacturer accessories are used exclusively.',
        explanation: 'Conditioning warranty coverage on the use of branded articles violates federal law.',
        recommendation: 'Remove restriction or cite FTC waiver.',
      },
      {
        ruleId: 'MM-DISCLAIM-01',
        title: 'As-Is Disclaimer of Implied Warranties',
        statuteCode: '15 U.S.C. § 2308',
        statuteTitle: 'Magnuson-Moss Warranty Act § 108',
        severity: 'WARNING',
        category: 'WARRANTY_DISCLAIMER',
        matchedSnippet: 'All products sold as-is with all faults.',
        explanation: 'Suppliers offering written warranties may not disclaim implied warranties of merchantability.',
        recommendation: 'Ensure implied warranty coverage aligns with written warranty duration.',
      },
    ],
  };

  it('maps handoff payload into a grounded LegalAnalysisResult', () => {
    const result = mapHandoffToWarrantyAnalysis(samplePayload, 'Electronics', 'CA');

    expect(result.productType).toBe('Electronics');
    expect(result.stateCode).toBe('CA');
    expect(result.protectionScore).toBe(35); // 100 - 65
    expect(result.redFlags).toHaveLength(2);

    const tieInFlag = result.redFlags[0];
    expect(tieInFlag.severity).toBe('illegal');
    expect(tieInFlag.statute).toBe('15 U.S.C. § 2302(c)');
    expect(tieInFlag.enforceability).toBe('Unenforceable (Illegal)');

    expect(result.magnusonMossCompliance.hasIllegalTieIn).toBe(true);
    expect(result.magnusonMossCompliance.hasImpliedDisclaimer).toBe(true);
    expect(result.magnusonMossCompliance.isCompliant).toBe(false);
    expect(result.lemonLawInfo.stateCode).toBe('CA');
  });

  it('handles clean handoff payloads with high protection scores', () => {
    const cleanPayload: KtyHandoffPayload = {
      protocolVersion: '1.0.0',
      origin: 'extension',
      destinationTool: 'warranty-watch',
      domain: 'fair-merchant.example.com',
      scanTimestamp: '2026-11-10T19:00:00Z',
      riskScore: 0,
      summary: 'Clean warranty terms',
      findings: [],
    };

    const result = mapHandoffToWarrantyAnalysis(cleanPayload, 'Automotive', 'NY');
    expect(result.protectionScore).toBe(100);
    expect(result.redFlags).toHaveLength(0);
    expect(result.magnusonMossCompliance.isCompliant).toBe(true);
    expect(result.lemonLawInfo.stateCode).toBe('NY');
  });

  it('handles edge case with missing riskScore and unknown state fallback safely', () => {
    const edgePayload: KtyHandoffPayload = {
      protocolVersion: '1.0.0',
      origin: 'extension',
      destinationTool: 'warranty-watch',
      domain: '<script>alert("xss")</script>.example.com',
      scanTimestamp: 'invalid-date',
      riskScore: 0,
      summary: '',
      findings: [
        {
          ruleId: undefined as unknown as string,
          title: 'Unspecified Notice',
          statuteCode: '',
          statuteTitle: '',
          severity: 'INFO',
          category: 'WARRANTY_DISCLAIMER',
          matchedSnippet: '',
          explanation: '',
          recommendation: '',
        },
      ],
    };

    const result = mapHandoffToWarrantyAnalysis(edgePayload, 'General', 'UNKNOWN');
    expect(result.protectionScore).toBe(100);
    expect(result.redFlags).toHaveLength(1);
    expect(result.lemonLawInfo).toBeDefined();
  });
});
