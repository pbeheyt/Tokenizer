import pkg from "hardhat";
const { run, network } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  // 1. Read deployment information
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
  console.log(`Deployer address: ${deployerAddress}`);

  // 2. Run the Hardhat verify task
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [deployerAddress],
    });
    console.log("Contract verification successful!");
  } catch (error) {
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
