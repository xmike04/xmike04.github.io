import test from 'node:test';
import assert from 'node:assert/strict';
import { auditEvidence } from './audit-evidence.mjs';

const ledger = [
 '# Evidence','## sample-claim','- Wording: One observed result.',
 '- Verification: artifact-backed','- Source: [Retained report](https://example.com/report)',
 '- Revision: abcdef0123456789abcdef0123456789abcdef01','- Scope: One controlled experiment.',
 '- Limits: Does not establish production behavior.','- Checked: 2026-10-26','',
].join('\n');
const options = { now: new Date('2026-10-26T12:00:00Z') };

test('a qualified and recently checked claim passes', async () => {
 assert.deepEqual(await auditEvidence(ledger, options), []);
});
test('stale, impossible, and future review dates fail', async () => {
 for(const date of ['2025-10-26','2027-10-26','2026-02-31']){
  assert.ok((await auditEvidence(ledger.replace('2026-10-26',date), options)).some(error=>error.includes('Checked')));
 }
});
test('missing qualifications fail', async () => {
 assert.ok((await auditEvidence(ledger.replace('- Limits: Does not establish production behavior.\n',''),options)).some(error=>error.includes('Limits')));
});
test('inaccessible sources identify the owning claim', async () => {
 const errors=await auditEvidence(ledger,{...options,probeLink:async()=>({ok:false,status:404})});
 assert.ok(errors.some(error=>error.includes('sample-claim')&&error.includes('404')));
});
test('attested credentials can state the absence of a public verification URL', async () => {
 const attested=ledger.replace('artifact-backed','user-attested').replace('[Retained report](https://example.com/report)','Owner confirmation; no public verification URL supplied.');
 assert.deepEqual(await auditEvidence(attested,options),[]);
});
test('duplicate IDs and missing linked IDs fail',async()=>{
 const errors=await auditEvidence(ledger+ledger,{...options,requiredIds:['missing-claim']});
 assert.ok(errors.some(error=>error.includes('duplicate')));
 assert.ok(errors.some(error=>error.includes('missing-claim')));
});
