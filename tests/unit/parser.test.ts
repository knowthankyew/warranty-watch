import { describe, it, expect } from 'vitest';
import { analyzeWarrantyText } from '../../src/legal/parser';
import { SAMPLE_WARRANTIES } from '../../src/legal/sampleWarranties';

describe('Warranty Parser & Legal Engine', () => {
  it('detects void-if-seal-broken sticker, disclaimer, and 3rd-party repair bans in electronics sample', () => {
    const sample = SAMPLE_WARRANTIES[0]; // Laptop sticker warranty
    const result = analyzeWarrantyText(sample.text, 'Electronics', 'CA');

    expect(result.warrantyType).toBe('Limited');
    expect(result.extractedDuration.toLowerCase()).toContain('year');
    expect(result.magnusonMossCompliance.hasIllegalVoidIf).toBe(true);
    expect(result.magnusonMossCompliance.hasIllegalTieIn).toBe(true);
    expect(result.magnusonMossCompliance.hasImpliedDisclaimer).toBe(true);
    expect(result.redFlags.some((rf) => rf.id.startsWith('anti_tampering_sticker'))).toBe(true);
    expect(result.protectionScore).toBeLessThan(60);
  });

  it('detects tie-in accessories mandate and AS-IS disclaimer in EV charger sample', () => {
    const sample = SAMPLE_WARRANTIES[1]; // EV charger
    const result = analyzeWarrantyText(sample.text, 'Automotive', 'CA');

    expect(result.magnusonMossCompliance.hasIllegalTieIn).toBe(true);
    expect(result.magnusonMossCompliance.hasImpliedDisclaimer).toBe(true);
    expect(result.redFlags.some((rf) => rf.id.startsWith('third_party_repair_ban'))).toBe(true);
  });

  it('detects mandatory registration card clause in appliance sample under 16 C.F.R. § 700.7', () => {
    const sample = SAMPLE_WARRANTIES[2]; // Air purifier
    const result = analyzeWarrantyText(sample.text, 'Appliances', 'NY');

    expect(result.redFlags.some((rf) => rf.id.startsWith('mandatory_registration_card'))).toBe(true);
  });

  it('handles a clean, compliant full warranty with high protection score', () => {
    const compliantText = `
FULL TWO (2) YEAR WARRANTY
Acme Audio warrants this speaker against all defects for two years.
Acme Audio will repair or replace defective units free of charge.
No registration required.
    `;
    const result = analyzeWarrantyText(compliantText, 'Electronics', 'CA');

    expect(result.warrantyType).toBe('Full');
    expect(result.magnusonMossCompliance.violationsCount).toBe(0);
    expect(result.protectionScore).toBeGreaterThanOrEqual(85);
  });
});
