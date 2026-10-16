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

  it('generates dispute letter for vehicle lemon law citing repair attempts and state statutes', () => {
    const sample = SAMPLE_WARRANTIES[1]; // EV charger / automotive context
    const analysis = analyzeWarrantyText(sample.text, 'Automotive', 'TX');

    const letter = generateDisputeLetter(
      {
        consumerName: 'Alex Smith',
        consumerAddress: '123 Pine St, Austin, TX 78701',
        consumerPhoneEmail: 'alex@example.com',
        companyName: 'Apex Motor Corp',
        companyAddress: '400 Motor Way, Dallas, TX 75201',
        productNameModel: 'Apex EV Charger Pro',
        purchaseDate: 'January 15, 2026',
        serialNumber: 'EV-554433',
        purchasePrice: '$899.00',
        stateCode: 'TX',
        defectDescription: 'Thermal sensor failure during Level 2 charging.',
        repairHistory: 'Four separate service visits over 45 calendar days.',
        demandedRemedy: 'Full Refund',
      },
      analysis
    );

    expect(letter).toContain('Texas');
    expect(letter).toContain('DEMANDED REMEDY: Full Refund');
    expect(letter).toContain('Full Refund');
    expect(letter).toContain('U.C.C. § 2-608');
  });

  it('safely falls back to default bracketed placeholders when form data is blank', () => {
    const analysis = analyzeWarrantyText('Standard 1 year limited warranty.', 'General', 'FL');

    const letter = generateDisputeLetter(
      {
        consumerName: '',
        consumerAddress: '',
        consumerPhoneEmail: '',
        companyName: '',
        companyAddress: '',
        productNameModel: '',
        purchaseDate: '',
        serialNumber: '',
        purchasePrice: '',
        stateCode: 'FL',
        defectDescription: '',
        repairHistory: '',
        demandedRemedy: 'Full Refund',
      },
      analysis
    );

    expect(letter).toContain('[Your Full Name]');
    expect(letter).toContain('[Manufacturer / Seller Company Name]');
    expect(letter).toContain('[Product Model Name]');
    expect(letter).toContain('[Serial Number / Order #]');
    expect(letter).toContain('Florida');
  });
});
