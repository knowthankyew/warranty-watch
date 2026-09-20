#!/usr/bin/env node
// ==============================================================================
// validate-policies.mjs - Automated Schema & Invariant Validator for Warranty Policies
// ==============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const POLICIES_DIR = path.join(ROOT_DIR, 'policies', 'jurisdictions');
const SCHEMA_FILE = path.join(ROOT_DIR, 'policies', 'schemas', 'warranty-policy.schema.json');

console.log('\n=== Validating Statutory Warranty & Lemon Law Policy Packs ===\n');

if (!fs.existsSync(SCHEMA_FILE)) {
  console.error(`❌ Schema file not found: ${SCHEMA_FILE}`);
  process.exit(1);
}

const files = fs.readdirSync(POLICIES_DIR).filter(f => f.endsWith('.json'));

let errors = 0;
let validated = 0;

for (const file of files) {
  const filePath = path.join(POLICIES_DIR, file);
  process.stdout.write(`  Checking ${file.padEnd(20)} ... `);
  
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const policy = JSON.parse(raw);

    // Validate jurisdiction & metadata
    if (!policy.jurisdiction || !policy.jurisdiction.code || !policy.jurisdiction.name) {
      throw new Error('Missing jurisdiction.code or jurisdiction.name');
    }
    if (!policy.metadata || !policy.metadata.statuteRef) {
      throw new Error('Missing metadata.statuteRef');
    }
    if (policy.metadata.officialSourceUrl && !policy.metadata.officialSourceUrl.startsWith('http')) {
      throw new Error('officialSourceUrl must be a valid http/https URL');
    }

    // If federalRules are present, validate regexes
    if (policy.federalRules) {
      if (!Array.isArray(policy.federalRules)) {
        throw new Error('federalRules must be an array');
      }
      for (const rule of policy.federalRules) {
        if (!rule.id || !rule.title || !rule.pattern) {
          throw new Error(`Rule missing required fields (id, title, pattern): ${JSON.stringify(rule)}`);
        }
        // Test compile regex
        new RegExp(rule.pattern, 'i');
      }
    }

    // If lemonLaw is present, validate thresholds
    if (policy.lemonLaw) {
      const ll = policy.lemonLaw;
      if (typeof ll.repairAttemptsThreshold !== 'number' || ll.repairAttemptsThreshold <= 0) {
        throw new Error('lemonLaw.repairAttemptsThreshold must be a positive number');
      }
      if (typeof ll.daysOutOfServiceThreshold !== 'number' || ll.daysOutOfServiceThreshold <= 0) {
        throw new Error('lemonLaw.daysOutOfServiceThreshold must be a positive number');
      }
      if (typeof ll.safetyDefectAttemptsThreshold !== 'number' || ll.safetyDefectAttemptsThreshold <= 0) {
        throw new Error('lemonLaw.safetyDefectAttemptsThreshold must be a positive number');
      }
      if (typeof ll.impliedWarrantyWaivable !== 'boolean') {
        throw new Error('lemonLaw.impliedWarrantyWaivable must be boolean');
      }
      if (!Array.isArray(ll.remedies) || ll.remedies.length === 0) {
        throw new Error('lemonLaw.remedies must be a non-empty array');
      }
    }

    console.log('\x1b[32mPASS\x1b[0m');
    validated++;
  } catch (err) {
    console.log(`\x1b[31mFAIL: ${err.message}\x1b[0m`);
    errors++;
  }
}

console.log(`\nResults: ${validated} policy packs validated, ${errors} error(s).\n`);
if (errors > 0) {
  process.exit(1);
}
