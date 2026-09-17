import { LegalAnalysisResult, RedFlag, CoverageItem } from './types';
import { MAGNUSON_MOSS_RULES } from './magnusonMoss';
import { getLemonLawForState } from './lemonLaws';

export function analyzeWarrantyText(text: string, productType: string = 'General', stateCode: string = 'CA'): LegalAnalysisResult {
  const cleanText = text || '';
  const lowerText = cleanText.toLowerCase();

  // 1. Detect Warranty Designation
  let warrantyType: 'Full' | 'Limited' | 'Disclaimed / As-Is' | 'Unspecified' = 'Unspecified';
  if (/sold\s+"?as\s*is"?|no\s+warranty|without\s+warranty/i.test(cleanText)) {
    warrantyType = 'Disclaimed / As-Is';
  } else if (/full\s+(one|two|three|five|1|2|3|5|10)?\s*(-|\s*)year\s+warranty|full\s+warranty/i.test(cleanText)) {
    warrantyType = 'Full';
  } else if (/limited\s+warranty/i.test(cleanText)) {
    warrantyType = 'Limited';
  }

  // 2. Extract Duration
  let extractedDuration = 'Not Explicitly Stated';
  const durationMatch = cleanText.match(/(\d+|\b(one|two|three|four|five|ten|lifetime)\b)\s*(-|\s*)(year|month|day|yr|mth)s?\b/i);
  if (durationMatch) {
    extractedDuration = durationMatch[0].replace(/-/g, ' ');
  } else if (/lifetime/i.test(cleanText)) {
    extractedDuration = 'Lifetime';
  }

  // 3. Flag Red Flags & Legal Violations
  const redFlags: RedFlag[] = [];
  let violationsCount = 0;
  let hasIllegalVoidIf = false;
  let hasIllegalTieIn = false;
  let hasImpliedDisclaimer = false;

  MAGNUSON_MOSS_RULES.forEach((rule) => {
    const match = cleanText.match(rule.pattern);
    if (match) {
      const quote = match[0].trim();
      redFlags.push({
        id: rule.id + '_' + Math.random().toString(36).substr(2, 5),
        quote: quote.length > 120 ? quote.substring(0, 117) + '...' : quote,
        title: rule.title,
        severity: rule.severity,
        statute: rule.statute,
        lawName: rule.lawName,
        explanation: rule.explanation,
        enforceability: rule.enforceability,
        consumerAdvice: rule.consumerAdvice
      });

      if (rule.severity === 'illegal') {
        violationsCount++;
      }
      if (rule.id === 'anti_tampering_sticker') hasIllegalVoidIf = true;
      if (rule.id === 'third_party_repair_ban') hasIllegalTieIn = true;
      if (rule.id === 'implied_warranty_disclaimer') hasImpliedDisclaimer = true;
    }
  });

  // State specific implied warranty override check (e.g. MA, MD, ME, MS, NJ, NY, etc.)
  const stateLaw = getLemonLawForState(stateCode);
  if (!stateLaw.impliedWarrantyWaivable && lowerText.includes('as is') && !hasImpliedDisclaimer) {
    redFlags.push({
      id: 'state_implied_override_' + stateCode,
      quote: 'AS IS / Disclaimer Clause',
      title: `Illegal Implied Warranty Disclaimer in ${stateLaw.stateName}`,
      severity: 'illegal',
      statute: `${stateLaw.stateName} State Consumer Protection Code (${stateLaw.statuteRef})`,
      lawName: `${stateLaw.stateName} Non-Waivable Implied Warranty Statute`,
      explanation: `Under ${stateLaw.stateName} law, sellers and manufacturers cannot disclaim implied warranties of merchantability on consumer goods, even if marked "AS IS".`,
      enforceability: 'Unenforceable (Illegal)',
      consumerAdvice: `In ${stateLaw.stateName}, you retain implied warranty protection for at least 1 year regardless of contractual disclaimers.`
    });
    violationsCount++;
    hasImpliedDisclaimer = true;
  }

  // 4. Extract Coverage Breakdown
  const coverageList: CoverageItem[] = [];

  // Parts Coverage
  const partsMatch = /parts|component|hardware|defect\s+in\s+material/i.test(lowerText);
  coverageList.push({
    category: 'Parts & Components',
    description: partsMatch ? 'Covered against defects in materials and workmanship.' : 'Not explicitly detailed or conditional.',
    covered: partsMatch,
    duration: extractedDuration
  });

  // Labor Coverage
  const laborMatch = /labor|repair\s+services|service\s+charge/i.test(lowerText) && !/labor\s+not\s+included/i.test(lowerText);
  coverageList.push({
    category: 'Labor & Repairs',
    description: laborMatch ? 'Covered by warrantor during warranty window.' : 'Labor charges may be billed to consumer or unspecified.',
    covered: laborMatch,
    duration: extractedDuration
  });

  // Battery / Consumable
  if (/battery|cell|consumable/i.test(lowerText)) {
    const batteryExcluded = /battery\s+(is\s+)?(excluded|not\s+covered)/i.test(lowerText);
    coverageList.push({
      category: 'Battery & Consumables',
      description: batteryExcluded ? 'Explicitly excluded from standard coverage.' : 'Subject to limited warranty conditions.',
      covered: !batteryExcluded,
      duration: '90 Days to 1 Year typical'
    });
  }

  // Normal Wear & Tear Exclusion
  const wearTearExcluded = /normal\s+wear\s+and\s+tear|cosmetic\s+damage|scratches/i.test(lowerText);
  coverageList.push({
    category: 'Normal Wear & Tear',
    description: wearTearExcluded ? 'Excluded from coverage.' : 'Standard exclusion applies.',
    covered: false,
    conditions: 'Standard industry exclusion'
  });

  // Accidental Damage / Water Damage
  const accidentCovered = /accidental\s+damage|liquid\s+damage|spills|drops/i.test(lowerText) && !/not\s+covered|excludes/i.test(lowerText);
  coverageList.push({
    category: 'Accidental & Liquid Damage',
    description: accidentCovered ? 'Covered under specialized accidental protection.' : 'Standard exclusion unless optional protection purchased.',
    covered: accidentCovered
  });

  // 5. Calculate Consumer Protection Score (0 to 100)
  let score = 100;
  redFlags.forEach(rf => {
    if (rf.severity === 'illegal') score -= 25;
    else if (rf.severity === 'deceptive') score -= 15;
    else if (rf.severity === 'caution') score -= 10;
  });

  if (warrantyType === 'Disclaimed / As-Is') score -= 30;
  if (warrantyType === 'Limited') score -= 5;
  if (!laborMatch) score -= 10;

  const protectionScore = Math.max(0, Math.min(100, Math.round(score)));

  // Executive Summary text
  let summary = `This ${warrantyType.toLowerCase()} warranty was analyzed for ${productType} products in ${stateLaw.stateName}. `;
  if (redFlags.length === 0) {
    summary += `No unlawful clauses were found under the Magnuson-Moss Warranty Act. Standard express coverage applies.`;
  } else {
    summary += `Identified ${redFlags.length} clause(s) of interest, including ${violationsCount} illegal term(s) under federal Magnuson-Moss provisions (15 U.S.C. § 2302) or state statutes.`;
  }

  return {
    productType,
    stateCode,
    protectionScore,
    summary,
    warrantyType,
    extractedDuration,
    redFlags,
    coverageList,
    magnusonMossCompliance: {
      isCompliant: violationsCount === 0,
      violationsCount,
      hasIllegalVoidIf,
      hasIllegalTieIn,
      hasImpliedDisclaimer
    },
    lemonLawInfo: stateLaw,
    rawText: cleanText
  };
}
