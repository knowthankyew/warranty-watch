import { describe, it, expect } from 'vitest';
import { MAGNUSON_MOSS_RULES } from '../../src/legal/magnusonMoss';

describe('Magnuson-Moss Warranty Rules & Anti-Void Provisions', () => {
  it('flags anti-tampering "void if seal broken" stickers as illegal under 15 U.S.C. § 2302(c)', () => {
    const rule = MAGNUSON_MOSS_RULES.find((r) => r.id === 'anti_tampering_sticker');
    expect(rule).toBeDefined();
    expect(rule?.severity).toBe('illegal');
    expect(rule?.statute).toContain('15 U.S.C. § 2302(c)');

    expect(rule?.pattern.test('Warranty void if seal is broken')).toBe(true);
    expect(rule?.pattern.test('Void if sticker removed or damaged')).toBe(true);
    expect(rule?.pattern.test('Do not remove seal under penalty of warranty forfeiture')).toBe(true);
  });

  it('flags third-party repair and OEM tie-in bans as illegal under 15 U.S.C. § 2302(c)', () => {
    const rule = MAGNUSON_MOSS_RULES.find((r) => r.id === 'third_party_repair_ban');
    expect(rule).toBeDefined();
    expect(rule?.severity).toBe('illegal');
    expect(rule?.statute).toContain('15 U.S.C. § 2302(c)');

    expect(rule?.pattern.test('Void if repaired by unauthorized third party')).toBe(true);
    expect(rule?.pattern.test('Must use only genuine brand parts to maintain coverage')).toBe(true);
    expect(rule?.pattern.test('Void if serviced by anyone other than an authorized center')).toBe(true);
  });

  it('flags implied warranty disclaimers as illegal under 15 U.S.C. § 2308(a)', () => {
    const rule = MAGNUSON_MOSS_RULES.find((r) => r.id === 'implied_warranty_disclaimer');
    expect(rule).toBeDefined();
    expect(rule?.severity).toBe('illegal');
    expect(rule?.statute).toContain('15 U.S.C. § 2308(a)');

    expect(rule?.pattern.test('Manufacturer disclaims all other warranties')).toBe(true);
    expect(rule?.pattern.test('No implied warranty of merchantability')).toBe(true);
    expect(rule?.pattern.test('Product is sold AS IS')).toBe(true);
  });

  it('flags mandatory registration card requirements under 16 C.F.R. § 700.7', () => {
    const rule = MAGNUSON_MOSS_RULES.find((r) => r.id === 'mandatory_registration_card');
    expect(rule).toBeDefined();
    expect(rule?.severity).toBe('deceptive');
    expect(rule?.statute).toContain('16 C.F.R. § 700.7');

    expect(rule?.pattern.test('Warranty void unless registered within 14 days of purchase')).toBe(true);
    expect(rule?.pattern.test('Must return registration card to activate warranty')).toBe(true);
  });

  it('flags mandatory shipping fees for warranty repairs under 15 U.S.C. § 2304(a)(1)', () => {
    const rule = MAGNUSON_MOSS_RULES.find((r) => r.id === 'consumer_shipping_fee_demand');
    expect(rule).toBeDefined();
    expect(rule?.statute).toContain('15 U.S.C. § 2304(a)(1)');

    expect(rule?.pattern.test('Customer must pay all shipping and handling for return')).toBe(true);
    expect(rule?.pattern.test('Owner responsible for freight costs')).toBe(true);
  });

  it('flags unreasonably short notice windows under 15 U.S.C. § 2302(a)', () => {
    const rule = MAGNUSON_MOSS_RULES.find((r) => r.id === 'unreasonable_notice_window');
    expect(rule).toBeDefined();
    expect(rule?.statute).toContain('15 U.S.C. § 2302(a)');

    expect(rule?.pattern.test('Must notify within 7 days of defect discovery')).toBe(true);
    expect(rule?.pattern.test('Claim void if not reported immediately within 10 days of delivery')).toBe(true);
  });
});
