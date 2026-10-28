# Architecture
React ? REST Express ? SQLite / Viem ? Hardhat Ethereum ? KYCRegistry.

On-chain: random bytes32 IDs, salted SHA-256 commitments, issuer addresses, issue and expiry timestamps, revocation and bank authorization. Off-chain: fictional customer fields, immutable-at-issuance snapshot, salt, application reviews, consent, audit logs and transaction receipt metadata.

Administrator account alone changes bank authorization. Bank A account issues approved applications. Issuer or administrator can revoke. Bank B reads through the consent-checked API. Customer permission is time-limited and revocable. The contract checks timestamp-based validity; no scheduled expiry transaction is needed.

API mutation order is validate ? submit genuine transaction ? await receipt ? store SQLite mapping. Failed issuance creates no local credential. Verification always reads latest chain state, not a cached local status. An independently mutable snapshot is compared with the on-chain commitment. Canonical recursive JSON serialization sorts object keys, preserves array order, and hashes salt + newline + payload.

The role header is not authentication; customer selection is a demo impersonation feature. Consent does not encrypt public Ethereum data. Signing uses unlocked local accounts only. DEMO_MODE gates administrator demo mutations. No production deployment is supported. A crash between chain confirmation and database persistence can leave an orphan chain entry; events can support manual reconciliation. Read APIs display metadata; Bank B cannot access the full customer/credential list. SQLite schema initializes automatically with foreign keys and uniqueness constraints.
