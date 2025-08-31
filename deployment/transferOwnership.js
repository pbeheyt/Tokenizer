import pkg from "hardhat";
const { ethers } = pkg;

// Usage:
// MULTISIG_OWNER_ADDRESS=0xSafe... TOKEN_ADDRESS=0xToken... npx hardhat run deployment/transferOwnership.js --network bscTestnet
// or: npx hardhat run deployment/transferOwnership.js --network bscTestnet 0xToken... 0xSafe...
async function main() {
  const [deployer] = await ethers.getSigners();
  const tokenAddress = process.env.TOKEN_ADDRESS || process.argv[3];
  const newOwner = process.env.MULTISIG_OWNER_ADDRESS || process.argv[4];

  if (!tokenAddress || !newOwner) {
    throw new Error("Usage: TOKEN_ADDRESS and MULTISIG_OWNER_ADDRESS must be provided (env or argv).");
  }

  console.log("Transferring ownership of", tokenAddress, "to", newOwner, "from", deployer.address);

  const Token42Bonus = await ethers.getContractFactory("Token42_Bonus");
  const token = Token42Bonus.attach(tokenAddress);

  const tx = await token.transferOwnership(newOwner);
  console.log("transferOwnership tx sent:", tx.hash);
  await tx.wait();
  console.log("Ownership transferred.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
