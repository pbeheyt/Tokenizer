import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("Token42_Bonus with multisig-like owner", function () {
  it("EOA non-owner cannot mint; owner (contract mock) can mint via delegated call", async function () {
    const [deployer, addr1] = await ethers.getSigners();

    // Deploy the mock "multisig" executor first
    const ExecutorFactory = await ethers.getContractFactory("SafeMintExecutorMock");
    const executor = await ExecutorFactory.deploy();
    await executor.waitForDeployment();

    // Deploy Token42_Bonus with owner set to the executor contract
    const Token42BonusFactory = await ethers.getContractFactory("Token42_Bonus");
    const token = await Token42BonusFactory.deploy(executor.target);
    await token.waitForDeployment();

    // 1) EOA (deployer) is not owner -> revert
    const mintAmount = ethers.parseUnits("1000", 18);
    await expect(
      token.connect(deployer).mint(addr1.address, mintAmount)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
     .withArgs(deployer.address);

    // 2) Owner (executor contract) calls token.mint() via its executeMint (msg.sender == executor)
    await executor.executeMint(token.target, addr1.address, mintAmount);

    const balance = await token.balanceOf(addr1.address);
    expect(balance).to.equal(mintAmount);

    const totalSupply = await token.totalSupply();
    const initialSupply = ethers.parseUnits("1000000", 18);
    expect(totalSupply).to.equal(initialSupply + mintAmount);
  });
});
