import { DisputeLetterData, LegalAnalysisResult } from './types';

export function generateDisputeLetter(
  data: DisputeLetterData,
  analysis: LegalAnalysisResult
): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stateLaw = analysis.lemonLawInfo;
  const illegalFlags = analysis.redFlags.filter(rf => rf.severity === 'illegal');

  let statutoryReferences = `- Federal Magnuson-Moss Warranty Act, 15 U.S.C. § 2301 et seq.
- Uniform Commercial Code (UCC § 2-314) Implied Warranty of Merchantability
- ${stateLaw.stateName} State Law (${stateLaw.statuteRef})`;

  if (analysis.magnusonMossCompliance.hasIllegalVoidIf) {
    statutoryReferences += `\n- 15 U.S.C. § 2302(c) & FTC Warning Guidance regarding unlawful anti-tampering sticker/seal conditions.`;
  }
  if (analysis.magnusonMossCompliance.hasIllegalTieIn) {
    statutoryReferences += `\n- 15 U.S.C. § 2302(c) Prohibition on mandatory third-party repair bans and brand-name tie-in sales.`;
  }
  if (analysis.magnusonMossCompliance.hasImpliedDisclaimer) {
    statutoryReferences += `\n- 15 U.S.C. § 2308(a) Prohibition on disclaiming implied warranties when a written warranty is supplied.`;
  }

  let illegalClausesSection = '';
  if (illegalFlags.length > 0) {
    illegalClausesSection = `\nUNENFORCEABLE CONTRACT TERMS NOTICE:
Please take notice that the written contract/warranty supplied with this product contains terms that violate federal law (15 U.S.C. § 2302) and state statutes:
${illegalFlags.map((flag, idx) => `${idx + 1}. Quoted Clause: "${flag.quote}"
   Legal Status: ${flag.enforceability} under ${flag.statute}.
   Reasoning: ${flag.explanation}`).join('\n\n')}
`;
  }

  return `FORMAL NOTICE OF WARRANTY CLAIM & DEMAND FOR REMEDY
SENT VIA CERTIFIED MAIL WITH RETURN RECEIPT REQUESTED

Date: ${currentDate}

FROM:
${data.consumerName || '[Your Full Name]'}
${data.consumerAddress || '[Your Street Address, City, State ZIP]'}
Phone/Email: ${data.consumerPhoneEmail || '[Your Contact Info]'}

TO:
Customer Support / Legal Claims Department
${data.companyName || '[Manufacturer / Seller Company Name]'}
${data.companyAddress || '[Company Address, City, State ZIP]'}

RE: Formal Demand for Remedy Under Magnuson-Moss Warranty Act (15 U.S.C. § 2301 et seq.) and ${stateLaw.stateName} Law
Product Name / Model: ${data.productNameModel || '[Product Model Name]'}
Purchase Date: ${data.purchaseDate || '[Date of Purchase]'}
Serial Number / VIN: ${data.serialNumber || '[Serial Number / Order #]'}
Purchase Price: ${data.purchasePrice || '[Purchase Price]'}

Dear Claims Manager,

I am writing to formally request a remedy under the express warranty, implied warranty of merchantability, and applicable state and federal consumer protection statutes for the above-referenced ${data.productNameModel || 'product'} purchased on ${data.purchaseDate || '[Date]'}.

DESCRIPTION OF DEFECT & REPAIR HISTORY:
${data.defectDescription || 'The product suffers from substantial mechanical/electrical defects that impair its primary intended function.'}

Prior Repair Efforts / Communication History:
${data.repairHistory || 'The defect persists after prior attempts to resolve or service the issue.'}

APPLICABLE STATUTORY PROTECTIONS:
This demand is governed by the following federal and state statutory provisions:
${statutoryReferences}
${illegalClausesSection}
LEGAL DEMAND:
Pursuant to federal law (15 U.S.C. § 2304) and ${stateLaw.stateName} statutes (${stateLaw.statuteRef}), I hereby demand the following remedy within fourteen (14) calendar days of receipt of this notice:

DEMANDED REMEDY: ${data.demandedRemedy || 'Full Refund or Replacement'}

Please be advised that under 15 U.S.C. § 2310(d)(2) of the Magnuson-Moss Warranty Act, as well as ${stateLaw.stateName} law, if a consumer prevails in an action to enforce rights under a written or implied warranty, the court MUST award the prevailing consumer all reasonable attorney fees and actual costs incurred in bringing the action.

Please contact me at the phone number or email address provided above within 14 days to confirm arrangements for ${data.demandedRemedy.toLowerCase()}.

Sincerely,


__________________________________________
${data.consumerName || '[Your Printed Name]'}
`;
}
