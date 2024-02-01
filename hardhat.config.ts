import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import env from "dotenv"
env.config()

const {API_KEY, PRIVATE_KEY, ETHERSCAN_API} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks : {
        sepolia : {
            url :API_KEY,
            accounts : [`0x${PRIVATE_KEY}`]
        }
  },
  
  etherscan : {
    apiKey : ETHERSCAN_API
  }
};

export default config;
