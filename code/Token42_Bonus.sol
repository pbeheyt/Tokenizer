// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Token42_Bonus
 * @dev A BEP-20 token with an owner-only minting function for the multisig bonus.
 */
contract Token42_Bonus is ERC20, Ownable {
    /**
     * @dev Sets the values for {name}, {symbol}, and {owner}.
     * Mints 1,000,000 tokens to the `initialOwner`.
     */
    constructor(address initialOwner)
        ERC20("pbeheyt42 Bonus", "PBT42B")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1_000_000 * 10**decimals());
    }

    /**
     * @dev Creates `amount` new tokens and assigns them to `to`.
     * Can only be called by the contract owner.
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
