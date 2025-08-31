# Bonus: Multisig Owner (Safe) on BNB Testnet

This bonus secures privileged actions (e.g., mint) by assigning a multisig (Safe) as the owner at deployment time. Configure a Safe with your desired threshold (e.g., 2-of-3), then pass its address as the constructor's `initialOwner`.

## Prerequisites
- Create a Safe on BNB Smart Chain Testnet, choose owners and a threshold.
- Add MULTISIG_OWNER_ADDRESS="0x...SAFE" to your .env (never commit it).

## Deploy with multisig owner
- Bonus token: `npx hardhat run deployment/deployBonus.js --network bscTestnet`
- Regular token with optional multisig: `npx hardhat run deployment/deployToken.js --network bscTestnet`

## Verify with constructor argument
- Example: `npx hardhat verify --network bscTestnet <TOKEN_ADDRESS> <SAFE_ADDRESS>`

## Execute privileged calls
- In the Safe UI, create a Contract Interaction to call `mint(to, amount)` on the token, collect signatures, then execute.
