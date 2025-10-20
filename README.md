# pbeheyt42 Token (PBT42) - 42 Tokenizer Project

This repository contains the source code, tests, and deployment scripts for the `pbeheyt42` token, a BEP-20 compliant fungible token developed for the École 42 "Tokenizer" curriculum. The contract is deployed and verified on the BNB Smart Chain Testnet.

This document outlines the project's technical specifications and architectural justifications.

**Key Documentation**:
-   [**FULL TUTORIAL**](documentation/TUTORIAL.md): A complete guide on project setup, configuration, and deployment.
-   [**SOLIDITY GUIDE**](documentation/SOLIDITY_GUIDE.md): A detailed breakdown of the Solidity syntax used in the smart contract.
-   [**JS SCRIPTS GUIDE**](documentation/JS_SCRIPTS_GUIDE.md): An explanation of the deployment and verification scripts and the Ethers.js concepts they use.

---

## Deployment Details

-   **Network**: BNB Smart Chain Testnet
-   **Contract Address**: `0xb61cA2C2E29c700a56Bd2ca4168ca5da62371257`
-   **BscScan Link**: [**View Verified Contract**](https://testnet.bscscan.com/address/0xb61cA2C2E29c700a56Bd2ca4168ca5da62371257)

---

## Technical Architecture & Justifications

The technology stack was selected to align with industry best practices for security, reliability, and developer efficiency.

### Blockchain: BNB Smart Chain (BSC)
BSC was chosen as the target blockchain for its full EVM compatibility, high performance, and its role as the designated platform for the 42 and BNB Chain partnership. This allows the use of the standard Ethereum tooling ecosystem.

### Development Framework: Hardhat
Hardhat provides a complete, integrated environment for professional smart contract development, including a robust local testing network and an extensible plugin system. A test-driven development (TDD) approach was used to validate all contract logic before deployment.

### Contract Standard & Security: OpenZeppelin
To ensure maximum security, the contract inherits from OpenZeppelin's professionally audited and community-vetted base contracts.
-   **`ERC20.sol`**: Provides a standard-compliant BEP-20 implementation, guaranteeing ecosystem compatibility.
-   **`Ownable.sol`**: Implements a proven and secure ownership model, fulfilling a key security requirement of the project.

---

## Development Workflow

This project is fully containerized using Docker, ensuring a consistent and reproducible development environment. A `Makefile` simplifies the entire workflow into easy-to-use commands.

**Prerequisites**:
-   Docker must be installed and running.

**Usage**:

1.  **Build and Start Service**: Builds the Docker image and starts the container. Run this once initially.
    ```shell
    make build
    ```

2.  **Core Commands**:
    -   `make compile`: Compiles smart contracts.
    -   `make test`: Runs the automated test suite.
    -   `make deploy`: Deploys the contract to BNB Testnet.
    -   `make shell`: Opens an interactive shell inside the container.

3.  **Stop Service**: Stops and removes the container.
    ```shell
    make clean
    ```
