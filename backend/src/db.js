import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
mkdirSync('data',{recursive:true});
export const db=new DatabaseSync(process.env.DB_PATH || 'data/kyc.sqlite');
db.exec(`PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS banks(id INTEGER PRIMARY KEY,name TEXT NOT NULL,ethereum_address TEXT NOT NULL UNIQUE,local_demo_role TEXT);
CREATE TABLE IF NOT EXISTS customers(id TEXT PRIMARY KEY,customer_reference TEXT NOT NULL UNIQUE,full_name TEXT NOT NULL,country TEXT NOT NULL,demo_document_type TEXT NOT NULL,demo_document_reference TEXT NOT NULL,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS kyc_applications(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),issuing_bank_id INTEGER NOT NULL REFERENCES banks(id),review_status TEXT NOT NULL CHECK(review_status IN ('PENDING','APPROVED','REJECTED')),reviewed_at TEXT,review_notes TEXT,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS credentials(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),application_id TEXT NOT NULL UNIQUE REFERENCES kyc_applications(id),issuing_bank_id INTEGER NOT NULL REFERENCES banks(id),blockchain_credential_id TEXT NOT NULL UNIQUE,credential_reference TEXT NOT NULL UNIQUE,canonical_payload TEXT NOT NULL,original_payload TEXT NOT NULL,commitment_salt TEXT NOT NULL,commitment_hash TEXT NOT NULL,issuance_tx_hash TEXT NOT NULL,issue_timestamp INTEGER NOT NULL,expiry_timestamp INTEGER NOT NULL,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS consents(id TEXT PRIMARY KEY,customer_id TEXT NOT NULL REFERENCES customers(id),credential_id TEXT NOT NULL REFERENCES credentials(id),verifying_bank_id INTEGER NOT NULL REFERENCES banks(id),granted_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,revoked_at INTEGER);
CREATE TABLE IF NOT EXISTS verification_requests(id TEXT PRIMARY KEY,customer_id TEXT REFERENCES customers(id),credential_id TEXT REFERENCES credentials(id),bank_id INTEGER REFERENCES banks(id),created_at TEXT);
CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY,actor_role TEXT,action TEXT,credential_id TEXT,result TEXT,timestamp TEXT,details TEXT);
CREATE TABLE IF NOT EXISTS transactions(hash TEXT PRIMARY KEY,block_number INTEGER,actor TEXT,type TEXT,timestamp INTEGER,credential_reference TEXT);`);
export const all=(s,...p)=>db.prepare(s).all(...p);
export const one=(s,...p)=>db.prepare(s).get(...p);
export const run=(s,...p)=>db.prepare(s).run(...p);
export function audit(role,action,result,details='',credential='') { run('INSERT INTO audit_logs(actor_role,action,credential_id,result,timestamp,details) VALUES(?,?,?,?,?,?)',role,action,credential,result,new Date().toISOString(),details); }
