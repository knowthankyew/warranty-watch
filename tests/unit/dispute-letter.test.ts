import { describe, it, expect } from 'vitest';
import { generateDisputeLetter } from '../../src/legal/disputeLetter';
import { analyzeWarrantyText } from '../../src/legal/parser';
import { SAMPLE_WARRANTIES } from '../../src/legal/sampleWarranties';

describe('Warranty Dispute Letter Generator', () => {
  it('generates a formal dispute letter citing Magnuson-Moss 15 U.S.C. § 2301 et seq.', () => {
    const sample = SAMPLE_WARRANTIES[0]; // Electronics warranty with void sticker and 3rd party ban
    const analysis = analyzeWarrantyText(sample.text, 'Electronics & Computers', 'CA');

    const letter = generateDisputeLetter(
      {
        consumerName: 'Morgan Davis',
        consumerAddress: '789 Oak Ave, San Francisco, CA 94102',
        consumerPhoneEmail: 'morgan@example.com',
        companyName: 'Apex Electronics Inc',
        companyAddress: '100 Silicon Way, San Jose, CA 95110',
        productNameModel: 'Apex ProBook 15',
        purchaseDate: 'June 1, 2026',
        serialNumber: 'APX-987654321',
        purchasePrice: '$1,499.00',
        stateCode: 'CA',
        defectDescription: 'Motherboard failure after 4 months of normal use.',
        repairHistory: 'Contacted support; denied warranty service due to broken tamper sticker.',
        demandedRemedy: 'Free Repair Under Warranty',
      },
      analysis
    );

    expect(letter).toContain('FORMAL NOTICE OF WARRANTY CLAIM & DEMAND FOR REMEDY');
    expect(letter).toContain('15 U.S.C. § 2301');
    expect(letter).toContain('15 U.S.C. § 2302(c)');
    expect(letter).toContain('Morgan Davis');
    expect(letter).toContain('Apex ProBook 15');
    expect(letter).toContain('California');
  });
});
