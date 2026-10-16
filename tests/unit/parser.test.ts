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

  it('handles empty or whitespace text without crashing or producing NaN', () => {
    const emptyResult = analyzeWarrantyText('', 'General', 'CA');
    expect(emptyResult.warrantyType).toBe('Unspecified');
    expect(emptyResult.extractedDuration).toBe('Not Explicitly Stated');
    expect(emptyResult.protectionScore).toBeGreaterThanOrEqual(0);
    expect(emptyResult.protectionScore).toBeLessThanOrEqual(100);
    expect(Number.isFinite(emptyResult.protectionScore)).toBe(true);

    const whitespaceResult = analyzeWarrantyText('   \n\t  ', 'Electronics', 'NY');
    expect(whitespaceResult.warrantyType).toBe('Unspecified');
    expect(Number.isFinite(whitespaceResult.protectionScore)).toBe(true);
  });

  it('clamps protection score within 0 to 100 even with extreme compounding violations', () => {
    const egregiousText = `
      SOLD AS IS WITHOUT ANY WARRANTY WHATSOEVER.
      Manufacturer disclaims all implied warranties.
      Warranty void if seal is broken or label removed.
      Must use only genuine brand replacement parts. Void if repaired by unauthorized third party.
      Must return registration card within 7 days.
      Customer must pay all shipping and handling charges.
      Labor not included.
      Claim void if not reported immediately within 5 days of delivery.
    `;
    const result = analyzeWarrantyText(egregiousText, 'Electronics', 'CA');
    expect(result.protectionScore).toBeGreaterThanOrEqual(0);
    expect(result.protectionScore).toBeLessThanOrEqual(30);
    expect(Number.isFinite(result.protectionScore)).toBe(true);
  });

  it('flags non-waivable implied warranty violation under Massachusetts law when AS IS is present', () => {
    const asIsText = 'Equipment provided as is with limited 90 day parts coverage.';
    const result = analyzeWarrantyText(asIsText, 'Appliances', 'MA');

    expect(result.magnusonMossCompliance.hasImpliedDisclaimer).toBe(true);
    expect(result.redFlags.some((rf) => rf.id.startsWith('state_implied_override_MA'))).toBe(true);
    expect(result.lemonLawInfo.impliedWarrantyWaivable).toBe(false);
  });
});
