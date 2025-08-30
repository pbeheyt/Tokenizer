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
});
