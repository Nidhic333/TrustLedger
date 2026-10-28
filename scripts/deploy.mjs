import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { accounts, wallet, publicClient } from '../backend/src/chain.js';
const artifact=JSON.parse(readFileSync('artifacts/blockchain/contracts/KYCRegistry.sol/KYCRegistry.json'));
const ids=await accounts();
const hash=await wallet.deployContract({abi:artifact.abi,bytecode:artifact.bytecode,account:ids[0]});
const receipt=await publicClient.waitForTransactionReceipt({hash});
mkdirSync('data',{recursive:true});
const bytecode=await publicClient.getBytecode({address:receipt.contractAddress});
writeFileSync('data/deployment.json',JSON.stringify({address:receipt.contractAddress,abi:artifact.abi,bytecode,blockNumber:Number(receipt.blockNumber),transactionHash:hash},null,2));
for(const address of ids.slice(1,3)) { const h=await wallet.writeContract({address:receipt.contractAddress,abi:artifact.abi,functionName:'authorizeBank',args:[address,true],account:ids[0]}); await publicClient.waitForTransactionReceipt({hash:h}); }
console.log('Deployed and authorized banks:',receipt.contractAddress,'Run npm run seed next.');
