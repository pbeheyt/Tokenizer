// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Token42
 * @dev A simple BEP-20 token for the 42 project.
 * The initial supply is minted to the contract deployer, who becomes the owner.
 */
contract Token42 is ERC20, Ownable {
    /**
     * @dev Sets the values for {name}, {symbol}, and {owner}.
     * Mints 1,000,000 tokens to the `initialOwner`.
     */
    constructor(address initialOwner)
        ERC20("pbeheyt42", "PBT42")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1_000_000 * 10**decimals());
    }
}
