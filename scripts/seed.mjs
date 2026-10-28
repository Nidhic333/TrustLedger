import 'dotenv/config';
import { seed } from '../backend/src/service.js';
if(process.env.DEMO_MODE!=='true') throw Error('Set DEMO_MODE=true in .env before seeding');
console.log(await seed());
