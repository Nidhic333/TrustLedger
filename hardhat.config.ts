import { defineConfig } from "hardhat/config";
export default defineConfig({ solidity: "0.8.28", paths: { sources: "./blockchain/contracts" }, networks: { localhost: { type: "http", url: "http://127.0.0.1:8545", chainId: 31337 } } });
