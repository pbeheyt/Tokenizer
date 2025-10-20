/**
 * @file This script verifies the deployed Token42 contract on BscScan.
 * It reads the contract address from a file generated during deployment,
 * making the process automatic and error-proof.
 */
import pkg from "hardhat";
const { run } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  // 1. Read deployment information from the JSON file
  let deploymentInfo;
  try {
    const filePath = path.join(process.cwd(), ".deployment-info.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    deploymentInfo = JSON.parse(fileContent);
  } catch (error) {
    console.error(
      "Error: Could not read deployment info. Please run the deploy script first."
    );
    process.exit(1);
  }

  const { contractAddress, deployerAddress } = deploymentInfo;

  if (!contractAddress || !deployerAddress) {
    console.error("Error: Invalid deployment info in .deployment-info.json");
    process.exit(1);
  }

  console.log(`Verifying contract at: ${contractAddress}`);
  console.log(`Deployer address (constructor argument): ${deployerAddress}`);

  // 2. Run the Hardhat verify task programmatically
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [deployerAddress],
    });
    console.log("Contract verification successful!");
  } catch (error) {
    // Handle the case where the contract is already verified
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified.");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
