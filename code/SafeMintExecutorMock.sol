// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IToken42Bonus {
    function mint(address to, uint256 amount) external;
}

// This contract simulates a multisig that owns the token and executes privileged calls.
contract SafeMintExecutorMock {
    function executeMint(address token, address to, uint256 amount) external {
        IToken42Bonus(token).mint(to, amount);
    }
}
