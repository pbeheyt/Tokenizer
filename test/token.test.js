import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("Token42", function () {
  let Token42, token, owner, addr1;

  // Deploy a new contract instance before each test
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Token42Factory = await ethers.getContractFactory("Token42");
    token = await Token42Factory.deploy(owner.address);
  });

  describe("Deployment", function () {
    it("Should have the correct name", async function () {
      expect(await token.name()).to.equal("pbeheyt42");
    });

    it("Should have the correct symbol", async function () {
      expect(await token.symbol()).to.equal("PBT42");
    });

    it("Should set the deployer as the owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should mint the total supply to the owner", async function () {
      const expectedSupply = ethers.parseUnits("1000000", 18);
      const ownerBalance = await token.balanceOf(owner.address);

      expect(await token.totalSupply()).to.equal(expectedSupply);
      expect(ownerBalance).to.equal(expectedSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await token.connect(owner).transfer(addr1.address, ethers.parseUnits("50", 18));
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.parseUnits("50", 18));

      // Check owner's balance reduction
      const initialOwnerBalance = ethers.parseUnits("1000000", 18);
      const expectedOwnerBalance = initialOwnerBalance - ethers.parseUnits("50", 18);
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(expectedOwnerBalance);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(
        token.connect(addr1).transfer(owner.address, ethers.parseUnits("1", 18))
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");

      // Owner's balance should not have changed.
      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
