import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const multisig = process.env.MULTISIG_OWNER_ADDRESS;
  if (!multisig) {
    throw new Error("MULTISIG_OWNER_ADDRESS is required for bonus deployment.");
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deploying Token42_Bonus with multisig owner:", multisig);
  console.log("Deployer account:", deployer.address);

  const Token42Bonus = await ethers.getContractFactory("Token42_Bonus");
  const token = await Token42Bonus.deploy(multisig);
  await token.waitForDeployment();

  console.log(`Token42_Bonus deployed to: ${token.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
