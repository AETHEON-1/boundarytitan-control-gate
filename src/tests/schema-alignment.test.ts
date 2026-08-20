import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { receiptMissingRequiredFields } from '../fixtures/invalid-shapes';
import { validConsequenceReceipt, validOwnerAssignment } from '../fixtures/valid-shapes';

function readFrozenSchema(filename: string): object {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../', filename), 'utf8')) as object;
}

const ajv = new Ajv2020({ strict: true });
addFormats(ajv);
const validateReceipt = ajv.compile(readFrozenSchema('consequence-receipt.schema.json'));
const validateOwnerAssignment = ajv.compile(readFrozenSchema('owner-role.schema.json'));
const validateAuditEvent = ajv.compile(readFrozenSchema('audit-event.schema.json'));

describe('frozen RC1 consequence-receipt schema compatibility', () => {
  test('accepts the schema-compatible receipt fixture', () => {
    expect(validateReceipt(validConsequenceReceipt)).toBe(true);
  });

  test('rejects a receipt missing required fields and with empty evidence', () => {
    expect(validateReceipt(receiptMissingRequiredFields)).toBe(false);
    expect(validateReceipt.errors).toBeTruthy();
  });

  test('rejects an undeclared field', () => {
    expect(validateReceipt({ ...validConsequenceReceipt, consequence_class: 'unsupported' })).toBe(false);
  });

  test('accepts the owner-assignment fixture against the frozen owner schema', () => {
    expect(validateOwnerAssignment(validOwnerAssignment)).toBe(true);
  });

  test('accepts a static audit-event shape against the frozen audit schema', () => {
    const auditEvent = {
      id: '550e8400-e29b-41d4-a716-446655440009',
      event_type: 'fixture-created',
      actor: 'test-runner',
      object_type: 'fixture',
      object_id: '550e8400-e29b-41d4-a716-446655440007',
      timestamp: '2026-08-20T10:05:00Z',
    };
    expect(validateAuditEvent(auditEvent)).toBe(true);
  });
});
