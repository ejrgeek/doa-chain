# Smart Contract - DoaChain

[`Versão em Português`](README-br.md)

DoaChain is a **smart contract** for a donation platform,
designed to meet various fundraising needs,
such as NGO campaigns, individual and emergency crowdfunding.

## Contract Features

### 1. Campaign Creation
- Automatic validations to ensure the quality and integrity of campaigns:
    - Author name, title, description and financial goals.
    - End date calculated based on the parameters provided.
- IDs automatically generated via `keccak256`.

### 2. Donations
- Any user can donate ETH to active campaigns.
- Donations recorded in the contract with details:
    - **Campaign ID**, **Donor wallet**, **Donated amount** and **Timestamp**.

### 3. Withdrawals
- Campaign creators can withdraw the amounts raised if:
    - The financial goal is reached.
    - All validation conditions are fulfilled.
- A fixed fee (`campaignFee`) is charged by the platform and transferred to the contract creator, which may change in the future.

### 4. Return of Donations
- If the campaign does not reach the financial goal by the end date, the amounts donated may be automatically returned to the donors.

### 5. Automatic Campaign Monitoring
- The contract automatically checks and updates the status of campaigns based on the end date.

### 6. Listing and Consultation
- Functions for:
    - Querying campaigns by ID.
    - Querying campaigns by AuthorWallet.
    - Listing all existing campaigns.
    - Returning IDs of registered campaigns.

---

## Security Measures

- **Multi-Function Validations**: Ensures that only authorized users or those with specific permissions can perform important actions.
- **Reentrancy Protection**: While protection is not explicit, critical functions use approaches that mitigate this risk. **(Subject to future analysis)**.
- **Flow Control**: Clear restrictions on withdrawals, refunds, and interactions with inactive or completed campaigns.

---

## Implantation

### Deployment Network
DoaChain is currently configured to be used on a local node, with deployment planned on an Ethereum **testnet** in the future.

### Local Deployment Requirements
- **Truffle** for compilation and deployment.
- **Foundry** for testing and simulation in a local environment.

---

## Using the Contract

### Creating Campaigns
Users can create campaigns with the following parameters:
- Author's name.
- Title and description.
- URL of video and image related to the campaign.
- Financial goal and duration in days.

### Donations
- Donors can send ETH to any active campaign.
- The minimum donation amount is set in the contract. **[See code for details](contracts/DoaChain.sol)**.

### Withdrawals and Returns
- Creators can withdraw funds if they reach the goal.
- Donations are automatically returned if the campaign does not reach the goal by the end date.

---

## Test Plan for DoaChain

### 🧪 Structured Tests

The tests will cover the following scenarios:

1. Campaign Creation:
    - Verify that a campaign is created correctly with the data provided.
    - Test validations (e.g.: short title, goal less than 0, etc.).

2. Donations
    - Ensure that donations are added to the total raised.
    - Test the minimum balance for donations.
    - Confirm that donations to inactive campaigns are rejected.

3. Fund Withdrawals
    - Test that the campaign creator can withdraw when the goal is reached.
    - Verify that the remaining amount is correctly transferred to the creator and administrator.

4. State Validations
    - Verify that inactive or expired campaigns are correctly identified.
    - Test the refund logic in case of campaigns that did not reach the goal.

5. Security Tests
    - Ensure that malicious users cannot:
        - Create invalid campaigns.
        - Make improper withdrawals.
        - Manipulate amounts outside the restrictions.

6. Configure Auditing:
    - Use tools like [MythX](https://mythx.io/) or [Slither](https://github.com/crytic/slither) for automated contract auditing.

---

## Credits

- **Tools used**:
- [Solidity](https://soliditylang.org/)
- [Truffle](https://trufflesuite.com/)
- [Foundry](https://getfoundry.sh/)
- Developer: *Erlon Dantas da Nobrega Junior*

