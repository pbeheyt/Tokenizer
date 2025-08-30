# Full Project Tutorial: Setup, Deployment, and Verification

This document is a step-by-step technical guide for setting up the project environment, deploying the smart contract, and interacting with it on the BNB Smart Chain Testnet.

## 1. Foundational Concepts

-   **Wallet (MetaMask)**: A browser extension that manages your cryptographic keys. It is used to authorize (sign) transactions and interact with decentralized applications.
-   **Smart Contract**: The program that defines the token's logic, written in Solidity. It is deployed to the blockchain and its execution is final and transparent.
-   **Blockchain Explorer (BscScan)**: A web-based tool for inspecting blockchain data. It allows you to view transactions, accounts, and the source code of verified smart contracts.

## 2. Local Environment Setup

1.  **Install Node.js**: The project requires Node.js (v18+). Download from [nodejs.org](https://nodejs.org/).
2.  **Clone Repository**: `git clone <your-repo-url> && cd Tokenizer`
3.  **Install Dependencies**: This command downloads the required packages listed in `package.json`.
    ```shell
    npm install
    ```

## 3. Wallet Management

A dedicated wallet for development is a security best practice. **Do not use a personal wallet with real funds.**

1.  **Install MetaMask**: Add the extension from the [official website](https://metamask.io/).
2.  **Create a New Wallet**:
    -   Select "Create a new wallet".
    -   Create a password for browser access.
    -   **Secure the Secret Recovery Phrase**: Write down the 12-word phrase on paper. This is the master key to the wallet and is required for recovery on any device. It should never be stored digitally or shared.
3.  **Add BNB Testnet**:
    -   Navigate to "Add network" in MetaMask and select "Add a network manually".
    -   Enter the following configuration:
        -   **Network Name**: `BNB Smart Chain Testnet`
        -   **New RPC URL**: `https://data-seed-prebsc-1-s1.bnbchain.org:8545/`
        -   **Chain ID**: `97`
        -   **Currency Symbol**: `tBNB`
        -   **Block explorer URL**: `https://testnet.bscscan.com`
4.  **Acquire Testnet Funds (tBNB)**:
    -   Transaction fees ("gas") are required for deployment.
    -   Use a developer-friendly faucet that does not require mainnet funds, such as the **Triangle Platform Faucet**: [faucet.triangleplatform.com/bnb/testnet](https://faucet.triangleplatform.com/bnb/testnet).
    -   Paste your wallet's `0x...` address to receive funds.

## 4. Configuring Environment Variables (.env)

Secret keys are managed via a `.env` file, which is excluded from version control by `.gitignore` to prevent security leaks.

1.  **Create the file**: In the project root, create a file named `.env`.
2.  **Add content**:
    ```env
    BSC_TESTNET_RPC_URL="https://data-seed-prebsc-1-s1.bnbchain.org:8545/"
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
    ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
    ```
3.  **Set `PRIVATE_KEY`**:
    -   In MetaMask: `(⋮) Menu` -> `Account details` -> `Show private key`.
    -   Copy the raw hexadecimal key and paste it as the value.
4.  **Set `ETHERSCAN_API_KEY`**:
    -   Create a free account at [etherscan.io](https://etherscan.io/).
    -   Navigate to your user dashboard -> `API Keys` and create a new key.
    -   Copy the key and paste it as the value.

## 5. Development Workflow

1.  **Compile**: Converts Solidity source files into EVM bytecode and ABI.
    ```shell
    npx hardhat compile
    ```
2.  **Test**: Executes the automated test suite in `test/` against a local, in-memory blockchain instance.
    ```shell
    npx hardhat test
    ```
3.  **Deploy**: Executes the deployment script against the configured network (BNB Testnet).
    ```shell
    npx hardhat run deployment/deployToken.js --network bscTestnet
    ```
    The output will be the deployed contract's address.

## 6. Contract Verification and Interaction

Verification links the deployed bytecode to its source code, enabling transparency and UI-based interaction on BscScan.

1.  **Run Verification**: Execute the `verify` task, providing the contract address and any constructor arguments.
    ```shell
    # Replace addresses with your own from the deployment step
    npx hardhat verify --network bscTestnet <YOUR_CONTRACT_ADDRESS> <YOUR_WALLET_ADDRESS>
    ```
2.  **Interact on BscScan**:
    -   Navigate to the contract address on BscScan.
    -   The "Contract" tab will now have a green checkmark and display the source code.
    -   **Read Contract**: Use this tab to call read-only functions. For example, use `balanceOf` with your address to query your token balance.
    -   **Write Contract**: Use this tab to execute state-changing transactions. Connect your MetaMask wallet and use `transfer` to send tokens to another address.