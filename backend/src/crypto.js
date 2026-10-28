import { randomBytes, createHash, randomUUID } from 'node:crypto';
export const uuid=()=>randomUUID();
export const randomHex=()=> '0x'+randomBytes(32).toString('hex');
export function canonical(value) { if(Array.isArray(value)) return '['+value.map(canonical).join(',')+']'; if(value && typeof value==='object') return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}'; return JSON.stringify(value); }
export const commitment=(payload,salt)=>'0x'+createHash('sha256').update(salt+'\n'+canonical(typeof payload==='string'?JSON.parse(payload):payload)).digest('hex');
export function required(body,fields) { for(const key of fields) if(typeof body[key]!=='string'||!body[key].trim()||body[key].length>150) { const e=Error('Invalid required field: '+key); e.status=400; throw e; } }
