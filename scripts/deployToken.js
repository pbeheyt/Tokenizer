import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const tokenFactory = await ethers.getContractFactory("Token42");
  const token = await tokenFactory.deploy(deployer.address);

  await token.waitForDeployment();

  console.log(`Token deployed to: ${token.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
