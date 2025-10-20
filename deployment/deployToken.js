import pkg from "hardhat";
const { ethers } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("Deploying contract with the account:", deployer.address);

  const tokenFactory = await ethers.getContractFactory("Token42");
  const token = await tokenFactory.deploy(deployer.address);

  await token.waitForDeployment();

  const contractAddress = token.target;
  console.log(`Token deployed to: ${contractAddress}`);

  // Display BscScan URL
  if (network.name === "bscTestnet" || network.chainId === 97) {
    console.log(
      `🔍 Verify on BscScan: https://testnet.bscscan.com/address/${contractAddress}`
    );
  }

  // Save deployment info for the verification script
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
