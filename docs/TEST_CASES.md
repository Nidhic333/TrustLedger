# Test cases
Run `npm test` with the local chain running and deployed. The Node test runner performs real Viem RPC calls. Run `npm run seed` afterward to restore the classroom dataset.

| Feature | Input | Expected |
|---|---|---|
| Canonical hashing | Reordered keys | Same commitment |
| Tampering / salt | Changed field or salt | Different commitment |
| Bank admin control | Non-admin authorization | Revert |
| Issuer control | Unauthorized account | Revert |
| Issuance validation | Zero ID/hash, past expiry | Revert |
| Duplicate | Existing bytes32 ID | Revert; no second SQLite record |
| Revoke | Missing or wrong issuer | Revert |
| Validity | Revoked / deauthorized issuer | False |
| Expiry | Advance EVM timestamp | False |
| Registration | Missing required fields | HTTP 400 |
| Application | Pending or rejected | Issuance rejected |
| Receipt | Approved issuance | Real successful transaction receipt |
| Consent | Missing, expired or revoked | NO_CONSENT / CONSENT_EXPIRED |
| Verification | Valid consent and chain record | VERIFIED |
| Snapshot tampering | Change stored name | INTEGRITY_MISMATCH |
| Revocation | Confirmed issuer transaction | REVOKED |
| Demo guards | Wrong role / DEMO_MODE=false | HTTP 403 |

Execution results are recorded in VALIDATION.md. Browser interaction should additionally follow DEMO_GUIDE.md; build validation alone does not verify visual behavior.
