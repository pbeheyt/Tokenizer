# pbeheyt42 Token (PBT42) - 42 Tokenizer Project

This repository contains the source code, tests, and deployment scripts for the `pbeheyt42` token, a BEP-20 compliant fungible token developed for the École 42 "Tokenizer" curriculum. The contract is deployed and verified on the BNB Smart Chain Testnet.

This document outlines the project's technical specifications, deployment details, and the justifications behind its architectural choices.

---

## Deployment Details

-   **Network**: BNB Smart Chain Testnet
-   **Contract Address**: `0xb61cA2C2E29c700a56Bd2ca4168ca5da62371257`
-   **BscScan Link**: [**View Verified Contract**](https://testnet.bscscan.com/address/0xb61cA2C2E29c700a56Bd2ca4168ca5da62371257)

---

## Core Concepts

-   **Smart Contract**: The program that runs on the blockchain, defining the token's logic. The source is located in `code/Token42.sol`.
-   **BEP-20**: The token standard for fungible tokens on the BNB Smart Chain. It ensures interoperability with wallets, exchanges, and other applications within the BSC ecosystem. It is the BSC implementation of the Ethereum ERC-20 standard.
-   **EVM (Ethereum Virtual Machine)**: The runtime environment for smart contracts. BNB Smart Chain's EVM compatibility enables the use of the mature Ethereum development ecosystem, including the Solidity language and Hardhat framework.
-   **Hardhat**: A professional development environment used to manage the entire smart contract lifecycle: compilation, testing, deployment, and verification.

---

## Technical Architecture & Justifications

The technology stack was selected to align with industry best practices for security, reliability, and developer efficiency.

### Blockchain: BNB Smart Chain (BSC)

BSC was chosen as the target blockchain for the following reasons:
-   **EVM Compatibility**: Allows for the use of Solidity and the extensive Ethereum tooling ecosystem (Hardhat, ethers.js), which are the de-facto standards for smart contract development.
-   **Performance & Low Cost**: The testnet offers a high-performance, low-cost environment suitable for rapid development and iterative testing cycles.
-   **Project Requirement**: The project is a designated component of the 42 and BNB Chain partnership.

### Development Framework: Hardhat

Hardhat provides a complete, integrated environment for professional smart contract development.
-   **Reproducible Environment**: Manages project dependencies and scripts, ensuring consistent setup and execution across different machines.
-   **Robust Testing Capabilities**: Includes a built-in local blockchain network that allows for a comprehensive suite of automated tests. A test-driven development (TDD) approach was used to validate contract logic and security before deployment.
-   **Extensible Tooling**: The Hardhat ecosystem includes essential plugins like `hardhat-verify`, which was used to automate the source code verification process on BscScan, a critical step for ensuring transparency.

### Contract Standard & Security: OpenZeppelin

In smart contract development, leveraging audited and community-vetted code is paramount for security. This project relies exclusively on OpenZeppelin's library of base contracts.
-   **Security**: OpenZeppelin contracts are the industry standard for secure, reusable smart contract components. They are professionally audited and protect against a wide range of known vulnerabilities.
-   **`ERC20.sol`**: Inheritance from this contract provides a complete, standard-compliant BEP-20 implementation, including all necessary functions (`transfer`, `balanceOf`, `approve`, etc.). This guarantees compatibility with the broader BSC ecosystem.
-   **`Ownable.sol`**: This extension implements a proven and secure ownership model. It designates the contract deployer as the sole "owner," providing an administrative layer for privileged actions and fulfilling a key security requirement of the project.

---

## Project Usage

### Prerequisites

-   Node.js (v18+)
-   npm

### Installation

1.  Clone the repository: `git clone <your-repo-url>`
2.  Install dependencies: `cd Tokenizer && npm install`

### Configuration

Create a `.env` file in the project root. It is git-ignored by default.

```env
BSC_TESTNET_RPC_URL="https://data-seed-prebsc-1-s1.bnbchain.org:8545/"
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
```

### Core Commands

-   **Compile Contracts**:
    ```shell
    npx hardhat compile
    ```
-   **Run Automated Tests**:
    ```shell
    npx hardhat test
    ```
-   **Deploy to BNB Testnet**:
    ```shell
    npx hardhat run deployment/deployToken.js --network bscTestnet
