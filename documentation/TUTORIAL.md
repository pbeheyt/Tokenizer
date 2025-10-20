# Full Project Tutorial

This document provides a comprehensive technical guide for setting up the project, understanding its architecture, and executing the development workflow from compilation to deployment and on-chain verification.

## 1. Glossary: Core Concepts & Tools

-   **Solidity**: The primary programming language for writing smart contracts on EVM-compatible blockchains like BNB Chain.
-   **BEP-20**: The token standard for fungible tokens on the BNB Smart Chain, analogous to ERC-20 on Ethereum. It defines a common interface for tokens to be interoperable.
-   **Smart Contract**: The program (`Token42.sol`) that defines the token's logic. Once deployed, it is immutable and its execution is transparently recorded on the blockchain.
-   **Hardhat**: A professional development framework used to compile, test, and deploy smart contracts. It provides a local blockchain environment for rapid testing.
-   **Ethers.js**: A JavaScript library used in our tests and deployment scripts to interact with the blockchain and smart contracts in a simple and intuitive way.
-   **Wallet (MetaMask)**: A browser extension that manages your cryptographic keys, allowing you to sign transactions and interact with decentralized applications.
-   **Blockchain Explorer (BscScan)**: A web-based tool for inspecting all blockchain data. It allows you to view transactions, accounts, and the source code of verified smart contracts.
-   **`Ownable`**: A security module from the OpenZeppelin library that restricts certain critical functions (like minting new tokens in the future) to be callable only by the contract's designated "owner".

## 2. Project Architecture Overview

The repository is structured to separate concerns, making the project clean and maintainable.

-   `code/`: Contains the Solidity smart contract source code (`Token42.sol`).
-   `deployment/`: Holds the JavaScript scripts used to deploy the contract to the blockchain.
-   `test/`: Contains the automated tests that verify the contract's functionality and security.
-   `hardhat.config.cjs`: The central configuration file for Hardhat, defining the Solidity version, network connections (e.g., BNB Testnet), and other settings.
-   `.env`: A private, local file (not committed to Git) that stores sensitive data like your wallet's private key and API keys.

## 3. Development Workflow: Setup to Deployment

This workflow guides you through every step required to get the project running.

### Step 1: Wallet Configuration

A dedicated wallet for development is a security best practice. **Do not use a personal wallet with real funds.**

1.  **Install MetaMask**: Add the extension from the [official website](https://metamask.io/).
2.  **Create a New Wallet**:
    -   Follow the on-screen instructions.
    -   **CRITICAL**: Secure the 12-word Secret Recovery Phrase on paper. It is the master key to your wallet and should never be stored digitally or shared.
3.  **Add BNB Testnet Network**:
    -   In MetaMask, navigate to "Add network" -> "Add a network manually".
    -   Enter the following configuration:
        -   **Network Name**: `BNB Smart Chain Testnet`
        -   **New RPC URL**: `https://data-seed-prebsc-1-s1.bnbchain.org:8545/`
        -   **Chain ID**: `97`
        -   **Currency Symbol**: `tBNB`
        -   **Block explorer URL**: `https://testnet.bscscan.com`
4.  **Acquire Testnet Funds (tBNB)**:
    -   Gas fees (paid in tBNB) are required to deploy contracts.
    -   Use a developer-friendly faucet like the **Bnbchain Faucet**: [tBNB Faucet](https://docs.bnbchain.org/bnb-smart-chain/developers/faucet/).
    -   Paste your wallet's `0x...` address to receive funds.

### Step 2: Environment Setup (`.env`)

Secret keys are managed via a `.env` file to prevent security leaks.

1.  **Create the file**: In the project root, create a file named `.env`.
2.  **Add content**:
    ```env
    # The RPC URL for connecting to the BNB Smart Chain Testnet.
    BSC_TESTNET_RPC_URL="https://data-seed-prebsc-1-s1.bnbchain.org:8545/"

    # The private key of the wallet you will use for deployment.
    # IMPORTANT: Must be prefixed with "0x".
    PRIVATE_KEY="0xYOUR_WALLET_PRIVATE_KEY"

    # Your API key from BscScan for automatic contract verification.
    ETHERSCAN_API_KEY="YOUR_BSCSCAN_API_KEY"
    ```
3.  **Set `PRIVATE_KEY`**: In MetaMask: `(⋮) Menu` -> `Account details` -> `Show private key`.
4.  **Set `ETHERSCAN_API_KEY`**: Create a free account at [bscscan.com](https://bscscan.com/), navigate to your user dashboard -> `API Keys`, and create a new key.

### Step 3: Execute Core Tasks

You can interact with the project in two ways. The Docker method is recommended for consistency.

#### Method A: Docker & Makefile (Recommended)

This approach uses Docker to ensure the development environment is identical for everyone. The `Makefile` provides convenient shortcuts.

1.  **Build Service**: `make build` (run once)
2.  **Compile Contracts**: `make compile`
    -   *What it does*: Converts `Token42.sol` into EVM bytecode and an ABI (Application Binary Interface), storing them in the `artifacts/` directory.
3.  **Run Tests**: `make test`
    -   *What it does*: Executes all tests in the `test/` directory against a temporary, in-memory blockchain, ensuring the contract logic is correct before deployment.
4.  **Deploy to Testnet**: `make deploy`
    -   *What it does*: Runs the `deployment/deployToken.js` script, which deploys your contract to the BNB Testnet using the credentials from your `.env` file. The output will be the deployed contract's address.

#### Method B: Local Node.js Environment

Use this method if you prefer not to use Docker.

1.  **Install Node.js**: Ensure you have Node.js (v18+) installed.
2.  **Install Dependencies**: `npm install`
3.  **Compile**: `npx hardhat compile`
4.  **Test**: `npx hardhat test`
5.  **Deploy**: `npx hardhat run deployment/deployToken.js --network bscTestnet`

## 4. Contract Verification and Interaction

Verification links the deployed bytecode to its source code on BscScan. This makes the contract transparent and enables a user-friendly interface for interaction.

The project is configured for automated verification.

1.  **Deploy the Contract**:
    Run `make deploy`. The terminal will output the contract address and a direct link to view it on BscScan.

2.  **Verify the Contract**:
    Once the deployment transaction is confirmed on the blockchain (usually within a few seconds), run the following command:
    ```shell
    make verify
    ```
    This command automatically retrieves the deployed contract's address and verifies it on BscScan.

3.  **Interact on BscScan**:
    -   Navigate to the BscScan URL provided during deployment.
    -   The "Contract" tab will now have a green checkmark.
    -   **Read Contract**: Call view functions. For example, use `balanceOf` with your address to check your token balance.
    -   **Write Contract**: Execute state-changing transactions. Connect your MetaMask wallet and use `transfer` to send tokens to another address.
