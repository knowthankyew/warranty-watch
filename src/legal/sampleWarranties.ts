import { SampleWarranty } from './types';

export const SAMPLE_WARRANTIES: SampleWarranty[] = [
  {
    id: 'laptop_sticker',
    title: 'Laptop / Electronics — "Void If Seal Broken" Clause',
    category: 'Electronics',
    description: 'Features an illegal anti-tampering sticker clause and short 14-day defect notification window.',
    text: `LIMITED WARRANTY - APEX TECH LABS

Apex Tech Labs warrants this ApexBook Pro laptop against defects in materials and workmanship for a period of ONE (1) YEAR from original date of purchase.

IMPORTANT WARRANTY CONDITIONS & RESTRICTIONS:
1. WARRANTY VOID IF SEAL IS BROKEN OR REMOVED. Opening the laptop casing or removing the holographic factory security sticker automatically voids all express and implied warranties.
2. DISCLAIMS ALL OTHER WARRANTIES. Apex Tech Labs disclaims all implied warranties of merchantability and fitness for a particular purpose. This item is provided in lieu of all other warranties, express or implied.
3. UNAUTHORIZED SERVICE: Warranty void if repaired or serviced by third party or non-factory technicians. Customer must use only genuine Apex OEM replacement parts.
4. NOTICE WINDOW: All defect claims must be submitted in writing within 14 days of defect discovery or warranty claim is permanently waived.
5. Customer is responsible for all shipping and handling charges to send the unit to our service center.`
  },
  {
    id: 'ev_accessory',
    title: 'EV Charger / Auto Accessory — Third-Party Repair Ban & Implied Disclaimer',
    category: 'Automotive / EV',
    description: 'Features illegal tie-in sales requirements and an illegal AS-IS disclaimer under Magnuson-Moss.',
    text: `VOLTDRIVE HOME EV CHARGER 3-YEAR LIMITED WARRANTY

VoltDrive Inc. provides a 3-Year Limited Warranty covering internal electrical components of the VoltDrive Pro 48A Charging Station.

EXCLUSIONS & MANDATORY REQUIREMENTS:
- VOID IF REPAIRED BY UNAUTHORIZED SHOP: Any attempt to install, service, or modify the charger by anyone other than an authorized VoltDrive technician will void this warranty immediately.
- TIE-IN SALES RESTRICTION: Must use only genuine VoltDrive brand cable accessories and mounting brackets. Use of third-party charging cables voids warranty.
- NO IMPLIED WARRANTY: Sold AS IS without any implied warranty of merchantability or fitness for specific vehicle models.
- Consumer agrees to mandatory binding arbitration in Wilmington, DE and waives all rights to join class action proceedings.`
  },
  {
    id: 'smart_appliance',
    title: 'Smart Home Appliance — Mandatory Registration Card Requirement',
    category: 'Home Appliances',
    description: 'Features an illegal mandatory warranty registration card requirement under FTC Rule 16 C.F.R. § 700.7.',
    text: `PUREAIR SMART AIR PURIFIER WARRANTY & REGISTRATION CARD

PureAir LLC warrants the PureAir Tower Filter for 2 Years from purchase date against mechanical failure.

CRITICAL COVERAGE REQUIREMENT:
THIS WARRANTY IS VOID UNLESS REGISTERED WITHIN 30 DAYS OF PURCHASE. You MUST mail the attached postage-paid Warranty Registration Card or complete online registration at pureair.example.com within 30 days of purchase date. Failure to submit registration card completely invalidates all warranty rights.

WHAT IS NOT COVERED:
- Consumable HEPA filter replacements.
- Cosmetic scratches or normal wear and tear.
- Damage caused by power surges, floods, or improper voltage.`
  },
  {
    id: 'power_tool',
    title: 'Commercial Power Tool — Commercial Use Exclusion & Shipping Fees',
    category: 'Tools & Equipment',
    description: 'Demonstrates standard limited warranty exclusions for heavy commercial use and shipping charges.',
    text: `TITAN PRO 20V CORDLESS IMPACT DRIVER 5-YEAR LIMITED WARRANTY

Titan Tools warrants this power tool for 5 Years for residential consumer use.

COVERAGE DETAILS:
- Motor, housing, and gearbox covered for 5 years against manufacturing defects.
- Lithium-Ion Battery pack covered for 2 years.

LIMITATIONS & EXCLUSIONS:
- Commercial, industrial, or rental use reduces warranty period to 90 Days.
- Customer must pay all freight and shipping charges to ship the tool to Titan Central Repair Facility.
- Does not cover damage caused by misuse, dropping, overloading, or lack of routine maintenance.`
  }
];
