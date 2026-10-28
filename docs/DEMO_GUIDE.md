# Faculty demo guide
1. Run the three-terminal setup in README. Dashboard shows actual counts and confirmed receipt history.
2. Choose Issuing Bank (selects Bank A). Register Rahul Sharma / CUST101 / India / Demo Identity Document / DEMO-ID-101. Seeded Rahul has a different customer reference.
3. Click Approve KYC on CUST101. Explain this is a simulated document review.
4. Click Issue on blockchain. Wait for confirmation; copy the KYC reference from the issued card. The transaction hash is a real local receipt.
5. Choose Verify KYC. Paste the reference. Click Verify KYC: NO_CONSENT. Click Request permission.
6. Choose Customer Portal, select Rahul / CUST101, choose the credential, select Demo City Bank, enter 24 hours, Grant consent. The request is visible below.
7. Return to Verify KYC and verify: VERIFIED, issuer, timestamps and transaction reference appear. This proves a bank attestation, not independent document authenticity.
8. Choose Issuing Bank, find the new credential, Revoke on-chain. Verify again as Bank B: REVOKED.
9. For tampering use the separate seeded Rahul / DEMO-CUST-1 active credential. Select it in Fraud Lab. Tamper snapshot, then Verify as Bank B and Verify KYC: INTEGRITY_MISMATCH (seeded consent already exists).
10. Return to Fraud Lab, Restore snapshots. Verify again: VERIFIED. Attempt duplicate ID: the actual contract rejects it without another database credential.
11. Seeded Priya is revoked; seeded Arjun is expired. Their seeded consents allow the failure results to be demonstrated. Meera is pending and Vikram rejected.
12. Bank Registry deactivation of Bank A causes otherwise active records to return UNTRUSTED_ISSUER. Reauthorize afterward.
13. Blockchain Explorer shows hashes, blocks, contract address and current status. Admin registry shows application audit history.
14. Reset demo data creates new randomized records and genuine chain transactions. Restart chain, redeploy and seed for a full clean reset.

Customer consent is an off-chain application access rule. Public blockchain metadata remains readable. Never present this prototype as real or compliant banking KYC.
