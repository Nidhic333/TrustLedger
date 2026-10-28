import { createPublicClient, createWalletClient, http } from 'viem';
import { hardhat } from 'viem/chains';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
export const publicClient = createPublicClient({ chain: hardhat, transport: http('http://127.0.0.1:8545') });
export const wallet = createWalletClient({ chain: hardhat, transport: http('http://127.0.0.1:8545') });
export function deployment() { return JSON.parse(readFileSync('data/deployment.json','utf8')); }
export async function accounts() { const ids = await wallet.getAddresses(); if ((await publicClient.getChainId()) !== 31337) throw Error('Local Hardhat chain required'); return ids; }
export async function read(functionName,args=[]) { const d=deployment(); if(await publicClient.getBytecode({address:d.address}) !== d.bytecode) throw Error('Deployment is stale. Run npm run deploy and npm run seed.'); return publicClient.readContract({address:d.address,abi:d.abi,functionName,args}); }
export async function write(functionName,args,actor=1) { const d=deployment(); await read('administrator'); const ids=await accounts(); const hash=await wallet.writeContract({address:d.address,abi:d.abi,functionName,args,account:ids[actor]}); const receipt=await publicClient.waitForTransactionReceipt({hash}); if(receipt.status!=='success') throw Error('Blockchain transaction reverted'); return receipt; }
