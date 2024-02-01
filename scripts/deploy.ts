import { ethers } from "hardhat";

const USDC_TOKEN: string = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
async function main() {

  const vault = await ethers.deployContract('Vault', [
    USDC_TOKEN,
    50,
    50
  ]);

  await vault.waitForDeployment();

  console.log(
      `Vault contract deployed at ${vault.target}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
