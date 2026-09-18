import { describe, it, expect } from 'vitest';
import { STATE_LEMON_LAWS } from '../../src/legal/lemonLaws';

describe('State Lemon Laws & Warranty Protections', () => {
  describe('California (Song-Beverly & Tanner Acts)', () => {
    const ca = STATE_LEMON_LAWS.CA;

    it('sets 4 repair attempts and 30 days out-of-service thresholds', () => {
      expect(ca.repairAttemptsThreshold).toBe(4);
      expect(ca.daysOutOfServiceThreshold).toBe(30);
    });

    it('protects consumer goods with non-waivable implied warranty', () => {
      expect(ca.impliedWarrantyWaivable).toBe(false);
      expect(ca.attorneyFeesShift).toBe(true);
      expect(ca.statuteRef).toContain('Song-Beverly');
    });
  });

  describe('New York (N.Y. Gen. Bus. Law § 198-a)', () => {
    const ny = STATE_LEMON_LAWS.NY;

    it('sets 4 repair attempts and 30 days out-of-service thresholds', () => {
      expect(ny.repairAttemptsThreshold).toBe(4);
      expect(ny.daysOutOfServiceThreshold).toBe(30);
      expect(ny.statuteRef).toContain('N.Y. Gen. Bus. Law § 198-a');
    });
  });

  describe('Florida (Fla. Stat. § 681.102)', () => {
    const fl = STATE_LEMON_LAWS.FL;

    it('sets 3 repair attempts and 15 days out-of-service thresholds', () => {
      expect(fl.repairAttemptsThreshold).toBe(3);
      expect(fl.daysOutOfServiceThreshold).toBe(15);
      expect(fl.statuteRef).toContain('Fla. Stat. § 681.102');
    });
  });

  describe('Texas (Tex. Occ. Code § 2301.604)', () => {
    const tx = STATE_LEMON_LAWS.TX;

    it('sets 4 repair attempts and 30 days out-of-service thresholds', () => {
      expect(tx.repairAttemptsThreshold).toBe(4);
      expect(tx.daysOutOfServiceThreshold).toBe(30);
      expect(tx.statuteRef).toContain('Tex. Occ. Code');
    });
  });
});
