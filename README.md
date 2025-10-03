# pbeheyt42 Token (PBT42) - 42 Tokenizer Project

This repository contains the source code, tests, and deployment scripts for the `pbeheyt42` token, a BEP-20 compliant fungible token developed for the École 42 "Tokenizer" curriculum. The contract is deployed and verified on the BNB Smart Chain Testnet.

This document outlines the project's technical specifications and architectural justifications.

**For a complete, step-by-step guide on project setup, configuration, and deployment, refer to the [FULL TUTORIAL](documentation/TUTORIAL.md).**

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

## Docker-Based Workflow

This project is fully containerized using Docker and Docker Compose, ensuring a consistent and reproducible development environment. A `Makefile` provides simple commands to manage the entire workflow.

**Prerequisites**:
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Usage**:

1.  **Build and Start the Service**: This command builds the Docker image and starts the container in the background. It only needs to be run once initially or after modifying `Dockerfile` or `package.json`.
    ```shell
    make build
    ```

2.  **Run Core Commands**:
    -   **Compile Contracts**: `make compile`
    -   **Run Automated Tests**: `make test`
    -   **Deploy to BNB Testnet**: `make deploy`
    -   **Open a Shell in the Container**: `make shell` (for running ad-hoc commands)

3.  **Stop the Service**: When you're done, this command stops and removes the container.
    ```shell
    make clean
    ```
