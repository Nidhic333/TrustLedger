# Validation — 22 October 2026

Environment: Windows PowerShell, Node 22.21.0, npm 10.9.4. Installed Hardhat 3.20.0 and Vite 7.3.7 (exact dependency versions in package-lock.json).

Executed successfully:
- npm install: 168 packages installed, zero reported vulnerabilities.
- npm run compile: Solidity 0.8.28, one contract compiled.
- node scripts/deploy.mjs: actual registry deployed and two banks authorized with confirmed local transactions.
- npm test: 3 top-level tests passed, zero failed. These contain the contract access-control/lifecycle assertions, deterministic hashing assertions and integrated REST workflow assertions described in TEST_CASES.md.
- npm run seed: actual active, revoked and expired credential records created; pending and rejected applications seeded.
- npm run build: React production bundle built successfully.
- npm run dev: Vite and Express started on loopback.
- HTTP smoke checks: frontend index and transformed JSX returned 200; API health returned ok; dashboard returned 5 customers, 1 pending, 3 approved, 1 active, 1 revoked, 1 expired.

The managed execution sandbox initially blocked Hardhat's user-level compiler cache and Vite dependency resolution. Compilation, npm test and dev startup succeeded with elevated tool execution. This was an execution-sandbox restriction; standard local PowerShell commands are documented in README.

No browser automation or visual screenshot tool was available. The React build and HTTP delivery were verified, but the exact click-by-click UI sequence and responsive appearance still need manual browser review using DEMO_GUIDE.md. Do not interpret these results as production security or regulatory compliance validation.
