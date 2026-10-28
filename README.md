# TrustLedger — Blockchain-Based Multi-Bank KYC

A locally executable third-year academic project demonstrating reusable bank attestations, customer consent, salted commitments and tamper evidence. All customers and documents are fictional. This does not verify government identities or provide legally compliant banking KYC.

## Problem and objectives
Repeated collection of KYC data creates friction between banks. This prototype lets an authorized bank attest to a simulated identity review, and another bank verify the attestation after customer permission. Ethereum records the issuer, cryptographic commitment, expiry and revocation; SQLite holds private demo data.

## Technologies and structure
- `blockchain/contracts/KYCRegistry.sol`: Solidity registry, compiled using Hardhat 3.
- `backend/src`: Express REST service, Viem and Node's built-in persistent SQLite driver.
- `frontend/src`: React, Vite and responsive navy dashboard.
- `scripts`: deployment and reproducible demo seeding.
- `tests`: real RPC contract tests and integrated REST tests using Node's test runner.
- `docs`: architecture, workflow, faculty demo and test cases.

## Windows / VS Code setup
Install Node.js 22.13+ (tested environment: 22.21.0), npm and VS Code. Open this folder in VS Code. No Docker, wallet extension, paid API or public-chain funds are required.

```powershell
npm install
Copy-Item .env.example .env
```

Terminal 1 (leave running):
```powershell
npm run chain
```
Terminal 2:
```powershell
npm run deploy
npm run seed
```
Terminal 3 (leave running):
```powershell
npm run dev
```
Open **http://127.0.0.1:5173**. API: http://127.0.0.1:3001/api/health.

Validation, while Terminal 1 is running and after deployment:
```powershell
npm test
npm run build
npm run seed
```
Tests mutate local demo data and advance blockchain time. Seed again after tests. Tests should be run with no concurrent UI mutations.

Deployment writes the actual ABI, address, receipt reference and runtime bytecode into ignored `data/deployment.json`. Signing uses unlocked Hardhat node accounts over loopback RPC; no private key is stored in source or sent to the browser. Account 0 administers the registry, account 1 issues as Bank A, account 2 represents Bank B.

## Faculty demonstration
See [docs/DEMO_GUIDE.md](docs/DEMO_GUIDE.md). Register a new Rahul with reference CUST101, approve, issue, copy the confirmed credential reference, attempt verification before consent, grant permission through the customer portal, verify, revoke and verify again. Use the separately seeded active Rahul credential for tampering. Seeded records are labeled DEMO-CUST-*.

## Reset
`npm run seed` clears the application dataset and creates fresh random credential IDs and real transactions. It does not erase Ethereum history. For a completely clean chain stop Terminal 1, restart `npm run chain`, then run `npm run deploy` and `npm run seed`. Never reuse stale SQLite state after a chain reset. Fraud Lab's Restore snapshots reverses off-chain tampering without reversing immutable revocations; Reset demo data creates fresh examples.

## Troubleshooting
- Blockchain unavailable: ensure port 8545 is running, deploy, then seed. Start from this project root.
- Port occupied: stop the older local process; frontend must run on 5173 for configured CORS.
- Missing deployment: run `npm run deploy` after starting the chain.
- `node:sqlite` warning: the built-in SQLite API is experimental in Node 22; this warning is expected.
- Demo controls denied: `.env` must contain `DEMO_MODE=true` and the UI role must be Administrator.
- npm/solc download failure: allow npm registry and Solidity compiler downloads through your network, then retry installation/compilation.
- Invalid document reference: use a fictional value beginning `DEMO-`, never a real government number.

## Limitations
The role selector and role headers are demonstration controls, not authentication. The server and Hardhat node bind only to loopback. Do not expose this app or unlocked node to a network. Consent controls access to the application verification service; Ethereum participants can still independently read on-chain records. Bank A's review is simulated, and successful verification proves an attestation and commitment, not an independently verified real identity. Real banks require independent compliance procedures and cannot universally skip mandatory KYC because another bank issued a credential. Duplicate credential IDs are prevented; real-world duplicate identities are not detected. Cross-database atomicity is not guaranteed: a process crash after a chain receipt but before the SQLite insert requires reconciliation from chain events. Do not submit concurrent mutations in this single-operator academic demo.

## Screenshots
Capture Dashboard, Issuing Bank, Customer Portal, successful/failed verification, Blockchain Explorer and Fraud Lab after completing the guide. Screenshot placeholders: `docs/screenshots/` (add your own screenshots).

Hardhat configuration follows [official Hardhat 3 documentation](https://hardhat.org/docs/getting-started).
