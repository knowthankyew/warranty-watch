import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  KtyHandoffPayload,
  KTY_HANDOFF_SESSION_KEY,
  validateHandoffPayload,
} from '@knowthankyew/privacy-telemetry';
import { useKTYHandoff } from '@knowthankyew/privacy-telemetry/react';
import { mapHandoffToWarrantyAnalysis } from '../../src/legal/handoff-adapter';

const reactHarness = vi.hoisted(() => {
  const states: unknown[] = [];
  let stateIndex = 0;
  let pendingEffects: Array<() => void | (() => void)> = [];
  let cleanups: Array<() => void> = [];

  return {
    reset() {
      for (const cleanup of cleanups) cleanup();
      states.length = 0;
      stateIndex = 0;
      pendingEffects = [];
      cleanups = [];
    },
    renderHook<T>(hookFn: () => T): T {
      stateIndex = 0;
      pendingEffects = [];
      let result = hookFn();
      if (pendingEffects.length > 0) {
        const effects = pendingEffects;
        pendingEffects = [];
        for (const eff of effects) {
          const cleanup = eff();
          if (typeof cleanup === 'function') cleanups.push(cleanup);
        }
        stateIndex = 0;
        result = hookFn();
      }
      return result;
    },
    useState<T>(initial: T | (() => T)): [T, (next: T | ((prev: T) => T)) => void] {
      const idx = stateIndex++;
      if (!(idx in states)) {
        states[idx] = typeof initial === 'function' ? (initial as () => T)() : initial;
      }
      const setState = (next: T | ((prev: T) => T)) => {
        const prev = states[idx] as T;
        states[idx] = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      };
      return [states[idx] as T, setState];
    },
    useEffect(fn: () => void | (() => void)) {
      pendingEffects.push(fn);
    },
    useCallback<T extends (...args: never[]) => unknown>(fn: T): T {
      return fn;
    },
  };
});

vi.mock('react', () => ({
  useState: reactHarness.useState,
  useEffect: reactHarness.useEffect,
  useCallback: reactHarness.useCallback,
}));

function createValidWarrantyPayload(overrides: Partial<KtyHandoffPayload> = {}): KtyHandoffPayload {
  return {
    version: '1.0',
    originApp: 'knowthankyew-extension',
    domain: 'megacorp-electronics.com',
    scanTimestamp: '2026-11-10T12:00:00.000Z',
    riskScore: 40,
    summary: { critical: 1, warning: 0, info: 0 },
    findings: [
      {
        ruleId: 'KTY-WARRANTY-VOID-001',
        title: 'Illegal Void-If-Removed Warranty Sticker',
        category: 'WARRANTY_DISCLAIMER',
        severity: 'CRITICAL',
        statuteCode: '15 U.S.C. § 2302(c) / 16 C.F.R. § 700.10',
        statuteTitle: 'Magnuson-Moss Anti-Tie-In & Repair Restriction',
        matchedSnippet: 'Warranty is void if the factory seal is broken or repaired by a third party.',
        explanation: 'Manufacturers cannot void warranties simply because a tamper seal was broken.',
        recommendation: 'Assert your Magnuson-Moss rights and demand warranty service.',
      },
    ],
    primaryLegalLink: null,
    targetTool: 'warranty-watch',
    ...overrides,
  };
}

function stubHandoffGlobals(initialPayload?: KtyHandoffPayload) {
  const store = new Map<string, string>();
  if (initialPayload) {
    store.set(KTY_HANDOFF_SESSION_KEY, JSON.stringify(initialPayload));
  }
  vi.stubGlobal('sessionStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v); },
    removeItem: (k: string) => { store.delete(k); },
  });
  vi.stubGlobal('window', {
    location: { search: '?kty_handoff=1', pathname: '/' },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    history: { replaceState: vi.fn() },
  });
}

describe('WarrantyWatch Cross-Engine Handoff Adapter', () => {
  beforeEach(() => {
    reactHarness.reset();
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    reactHarness.reset();
    vi.unstubAllGlobals();
  });

  it('validates fixture against KtyHandoffPayload and does not misclassify void-if-removed CRITICAL finding as Disclaimed / As-Is', () => {
    const payload = createValidWarrantyPayload();
    expect(validateHandoffPayload(payload)).toBe(true);

    const result = mapHandoffToWarrantyAnalysis(payload, 'Electronics & Laptops', 'NY');

    expect(result.productType).toBe('Electronics & Laptops');
    expect(result.stateCode).toBe('NY');
    expect(result.protectionScore).toBe(60);
    expect(result.warrantyType).toBe('Unspecified');
    expect(result.magnusonMossCompliance.isCompliant).toBe(false);
    expect(result.magnusonMossCompliance.violationsCount).toBe(1);
    expect(result.magnusonMossCompliance.hasIllegalVoidIf).toBe(true);
    expect(result.magnusonMossCompliance.hasIllegalTieIn).toBe(false);
    expect(result.redFlags).toHaveLength(1);
    expect(result.redFlags[0].severity).toBe('illegal');
    expect(result.redFlags[0].statute).toBe('15 U.S.C. § 2302(c) / 16 C.F.R. § 700.10');
    expect(result.lemonLawInfo.stateName).toBe('New York');
  });

  it('does not count WARNING findings toward magnusonMossCompliance.violationsCount', () => {
    const payload = createValidWarrantyPayload({
      riskScore: 20,
      summary: { critical: 0, warning: 1, info: 0 },
      findings: [
        {
          ruleId: 'KTY-WARRANTY-WARN-001',
          title: 'Ambiguous Service Window Disclosure',
          category: 'WARRANTY_DISCLAIMER',
          severity: 'WARNING',
          statuteCode: '15 U.S.C. § 2302',
          statuteTitle: 'Magnuson-Moss Disclosure Standard',
          matchedSnippet: 'Service timelines may vary by regional distributor.',
          explanation: 'Warning-level clarity concern.',
          recommendation: 'Request written turnaround estimates.',
        },
      ],
    });
    expect(validateHandoffPayload(payload)).toBe(true);

    const result = mapHandoffToWarrantyAnalysis(payload);
    expect(result.productType).toBe('General Consumer Product');
    expect(result.stateCode).toBe('DEFAULT');
    expect(result.warrantyType).toBe('Unspecified');
    expect(result.redFlags).toHaveLength(1);
    expect(result.redFlags[0].severity).toBe('deceptive');
    expect(result.magnusonMossCompliance.violationsCount).toBe(0);
    expect(result.magnusonMossCompliance.isCompliant).toBe(true);
  });

  it('sets warrantyType to Disclaimed / As-Is only for blanket disclaimers and excludes qualified coverage exclusions', () => {
    const excludedDamagePayload = createValidWarrantyPayload({
      riskScore: 15,
      summary: { critical: 0, warning: 1, info: 0 },
      findings: [
        {
          ruleId: 'KTY-WARRANTY-EXCL-001',
          title: 'Accidental Damage Coverage Exclusion (No Warranty Disclaimer Title Test)',
          category: 'WARRANTY_DISCLAIMER',
          severity: 'WARNING',
          statuteCode: '15 U.S.C. § 2302',
          statuteTitle: 'Magnuson-Moss Disclosure Standard',
          matchedSnippet: 'There is no warranty coverage for accidental damage.',
          explanation: 'Coverage exclusions must be conspicuously disclosed.',
          recommendation: 'Review covered perils in the written limited warranty.',
        },
      ],
    });
    expect(validateHandoffPayload(excludedDamagePayload)).toBe(true);
    const exclusionResult = mapHandoffToWarrantyAnalysis(excludedDamagePayload, 'Home Appliances', 'TX');
    expect(exclusionResult.warrantyType).toBe('Unspecified');
    expect(exclusionResult.magnusonMossCompliance.violationsCount).toBe(0);

    const payload = createValidWarrantyPayload({
      riskScore: 60,
      findings: [
        {
          ruleId: 'KTY-WARRANTY-DISCLAIM-001',
          title: 'Implied Warranty Disclaimed As-Is',
          category: 'WARRANTY_DISCLAIMER',
          severity: 'CRITICAL',
          statuteCode: '15 U.S.C. § 2308',
          statuteTitle: 'Implied Warranties Limitation',
          matchedSnippet: 'Product is sold AS IS with all faults and no warranty of merchantability.',
          explanation: 'Attempted blanket as-is disclaimer of implied warranties.',
          recommendation: 'Check state UCC § 2-316 restrictions against implied warranty disclaimers.',
        },
      ],
    });
    expect(validateHandoffPayload(payload)).toBe(true);

    const result = mapHandoffToWarrantyAnalysis(payload, 'Home Appliances', 'TX');
    expect(result.warrantyType).toBe('Disclaimed / As-Is');
    expect(result.magnusonMossCompliance.hasImpliedDisclaimer).toBe(true);
    expect(result.magnusonMossCompliance.violationsCount).toBe(1);
  });

  it('accepts matching targetTool via useKTYHandoff("warranty-watch") and leaves mismatched targetTool returning null', () => {
    const matchingPayload = createValidWarrantyPayload({ targetTool: 'warranty-watch' });
    expect(validateHandoffPayload(matchingPayload)).toBe(true);
    stubHandoffGlobals(matchingPayload);

    const matched = reactHarness.renderHook(() => useKTYHandoff('warranty-watch'));
    expect(matched.isHandoffActive).toBe(true);
    expect(matched.payload?.domain).toBe('megacorp-electronics.com');

    reactHarness.reset();
    const otherToolPayload = createValidWarrantyPayload({ targetTool: 'lease-audit' });
    expect(validateHandoffPayload(otherToolPayload)).toBe(true);
    stubHandoffGlobals(otherToolPayload);

    const mismatched = reactHarness.renderHook(() => useKTYHandoff('warranty-watch'));
    expect(mismatched.payload).toBeNull();
    expect(mismatched.isHandoffActive).toBe(false);
  });
});
