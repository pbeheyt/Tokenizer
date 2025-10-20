# Guide to JavaScript Deployment & Verification Scripts

This document explains the role of the JavaScript scripts located in the `deployment/` directory and breaks down the key concepts from the **Ethers.js** library that make them work.

---

### 1. The Role of Scripts in a Hardhat Project

While Solidity is used to write the smart contract, we need a way to interact with the blockchain to deploy it. Hardhat uses JavaScript (or TypeScript) scripts for this purpose. These scripts act as a bridge between our local development environment and the target blockchain network (e.g., BNB Testnet).

---

### 2. Core Concepts with Ethers.js

Ethers.js is a powerful JavaScript library that provides a simple and intuitive API to interact with EVM-compatible blockchains. Our scripts heavily leverage it. Here are the key functions we use:

-   **`ethers.getSigners()`**:
    -   **What it does**: Retrieves a list of wallet accounts that Hardhat has access to. In our case, it gets the account corresponding to the `PRIVATE_KEY` specified in the `.env` file. This "signer" object is used to authorize (sign) transactions, such as the deployment transaction.

-   **`ethers.getContractFactory("ContractName")`**:
    -   **What it does**: This function acts like a template or a "factory" for creating instances of our smart contract. It knows the contract's ABI (the interface) and bytecode (the compiled code) and prepares it for deployment.

-   **`contractFactory.deploy(...args)`**:
    -   **What it does**: This is the function that actually initiates the deployment. It sends a transaction to the blockchain containing the contract's bytecode. Any arguments passed to `deploy()` are forwarded to the contract's `constructor`.

-   **`contract.waitForDeployment()`**:
    -   **What it does**: Deployment is not instantaneous; it requires a transaction to be mined and included in a block. This function pauses the script's execution until the deployment is complete, ensuring we don't try to use the contract before it's ready.

-   **`contract.target`**:
    -   **What it does**: Once deployed, this property holds the final, permanent address of our smart contract on the blockchain.

---

### 3. Script Breakdown: `deployToken.js`

This script handles the deployment of the `Token42` contract.

**Logical Flow**:
1.  **Get Deployer Account**: It starts by calling `ethers.getSigners()` to get the wallet that will pay for the deployment.
2.  **Prepare Contract**: It uses `ethers.getContractFactory("Token42")` to create a factory for our token.
3.  **Deploy**: It calls `tokenFactory.deploy(deployer.address)`, passing the deployer's address to the `constructor` of our `Token42` contract.
4.  **Wait & Log**: It waits for the deployment to be confirmed and then logs the new contract's address to the console, along with a helpful BscScan link.
5.  **Save Info**: Finally, it writes the new contract address and the deployer's address into a `.deployment-info.json` file. This is crucial for the `verify.js` script to work without manual input.

---

### 4. Script Breakdown: `verify.js`

This script automates the process of verifying the contract on BscScan.

**Logical Flow**:
1.  **Read Deployment Info**: It reads the `.deployment-info.json` file to get the contract address and the deployer address that were saved during deployment.
2.  **Handle Errors**: If the file doesn't exist, it exits gracefully with an informative error message.
3.  **Run Verification Task**: It programmatically runs Hardhat's built-in `verify:verify` task, passing the required arguments: the contract address and the constructor arguments (`[deployerAddress]`).
4.  **Manage Existing Verification**: It includes logic to detect if the contract has already been verified, preventing unnecessary errors.
