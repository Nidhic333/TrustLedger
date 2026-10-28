# Workflow
1. Bank A submits fictional fields; customer UUID and PENDING application are created atomically in SQLite.
2. Simulated approval or rejection is recorded. Only APPROVED applications may issue once.
3. Issuance generates a canonical snapshot, random salt and opaque identifier, calculates SHA-256 and sends a Bank A transaction. Only a successful receipt creates the local mapping.
4. Customer chooses credential, bank and hours of consent. Permission can expire or be revoked.
5. Bank B checks permission first. It then reads chain existence, issuer authorization, revocation and expiry; compares the recomputed commitment; and receives minimal metadata only on success.
6. Bank A revokes on-chain. Subsequent verification reads REVOKED regardless of local database fields.
7. Administrator demo tampering alters only the off-chain snapshot. Valid-consent verification returns INTEGRITY_MISMATCH. Restore snapshots repairs that experiment; revoked records remain revoked.
8. Corrected attestations require a new application and new random credential ID; old chain records are never overwritten.
