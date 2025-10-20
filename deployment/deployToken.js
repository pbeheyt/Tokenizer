/**
 * @file This script deploys the Token42 contract to the configured network.
 * It also saves the deployment information to a file for later use by the
 * verification script.
 */
import pkg from "hardhat";
const { ethers } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  // 1. Get the deployer account
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("Deploying contract with the account:", deployer.address);

  // 2. Get the contract factory and deploy
  const tokenFactory = await ethers.getContractFactory("Token42");
  const token = await tokenFactory.deploy(deployer.address);

  await token.waitForDeployment();

  const contractAddress = token.target;
  console.log(`Token deployed to: ${contractAddress}`);

  // 3. Display BscScan URL for easy access
  if (network.name === "bscTestnet" || network.chainId === 97) {
    console.log(
      `Verify on BscScan: https://testnet.bscscan.com/address/${contractAddress}`
    );
  }

  // 4. Save deployment info for the verification script
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
  };
  fs.writeFileSync(
    path.join(process.cwd(), ".deployment-info.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
