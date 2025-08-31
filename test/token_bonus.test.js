import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("Token42_Bonus", function () {
  let token, owner, addr1;
  const initialSupply = ethers.parseUnits("1000000", 18);

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const Token42BonusFactory = await ethers.getContractFactory("Token42_Bonus");
    token = await Token42BonusFactory.deploy(owner.address);
  });

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      expect(await token.name()).to.equal("pbeheyt42 Bonus");
      expect(await token.symbol()).to.equal("PBT42B");
    });

    it("Should assign the initial supply to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(initialSupply);
      expect(ownerBalance).to.equal(initialSupply);
    });
  });

  describe("Minting", function () {
    it("Should allow the owner to mint new tokens", async function () {
      const mintAmount = ethers.parseUnits("500", 18);
      await token.connect(owner).mint(addr1.address, mintAmount);

      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(mintAmount);

      const newTotalSupply = initialSupply + mintAmount;
      expect(await token.totalSupply()).to.equal(newTotalSupply);
    });

    it("Should NOT allow a non-owner to mint new tokens", async function () {
      const mintAmount = ethers.parseUnits("500", 18);
      await expect(
        token.connect(addr1).mint(addr1.address, mintAmount)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount")
       .withArgs(addr1.address);
    });
  });
});
