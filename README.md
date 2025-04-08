# CrowdCoin - Decentralized Crowdfunding Platform built on Ethereum

A blockchain-based crowdfunding platform built on Ethereum where campaign creators can raise funds and contributors have oversight on how funds are spent.

## Project Overview

CrowdCoin solves the traditional crowdfunding problem of trust by using smart contracts to manage funds. Campaign creators can't spend the money without approval from contributors, ensuring transparency and accountability.

## Features

- Create campaigns with minimum contribution requirements
- Contribute to existing campaigns
- View campaign details and metrics
- Create spending requests as campaign managers
- Approve spending requests as contributors
- Finalize and process spending requests

## Technology Stack

- **Frontend**: React.js with Next.js framework
- **UI Components**: Semantic UI React
- **Blockchain Interaction**: Web3.js
- **Smart Contracts**: Solidity
- **Testing**: Mocha
- **Ethereum Network**: Sepolia Testnet

## Smart Contracts

- **Campaign Factory**: Creates new campaign instances
- **Campaign**: Manages contributions and spending requests

Factory contract deployed at: `0x782F00C1Bf1E12a916f53643198Bf57500Be5436` on Sepolia testnet

## Project Structure

```
crowdcoin-web3/
├── .github/workflows/     # Workflows for the repo
|   └──deploy_factory.yaml # Workflow to deploy a new factory contract
├── components/            # React components
│   ├── ContributeForm.js  # Form to contribute to campaigns
│   ├── Header.js          # Application header with navigation
│   ├── Layout.js          # Common layout wrapper
│   └── RequestRow.js      # Component for displaying request details
├── ethereum/              # Ethereum related code
│   ├── build/             # Compiled contracts
│   ├── contracts/         # Smart contracts
│   │   └── Campaign.sol
│   ├── campaign.js        # Campaign contract instance
│   ├── compile.js         # Contract compilation script
│   ├── deploy.js          # Contract deployment script
│   ├── factory.js         # Factory contract instance
│   └── web3.js            # Web3 configuration
├── pages/                 # Next.js pages
│   ├── campaigns/         # Campaign related pages
│   │   ├── new.js         # Create new campaign
│   │   ├── show.js        # Campaign details
│   │   └── requests/      # Request related pages
│   │       ├── index.js   # List of requests
│   │       └── new.js     # Create new request
│   └── index.js           # Homepage with campaigns list
├── routes.js              # Custom routes configuration
└── server.js              # Custom server configuration
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- Metamask browser extension
- Ethereum account with Sepolia ETH

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd crowdcoin-web3
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Create a .env file with your configuration using .env.example for guidance
```
NODE_ENV=development
MNEMONIC="your mnemonic phrase ..."
NEXT_PUBLIC_INFURA_URL="https://sepolia.infura.io/v3/12345678990..."
NEXT_PUBLIC_FACTORY_ADDRESS="0x782F00C1Bf1E12a916f53643198Bf57500Be5436"
```

4. Compile the smart contracts (optional - already compiled)
```bash
node ethereum/compile.js
```

5. Deploy contracts to the network (optional - already deployed)
```bash
node ethereum/deploy.js
```

6. Run the development server
```bash
npm run dev
```

7. Access the application at `http://localhost:3000`

## Usage

1. Connect your Metamask wallet to the application
2. Create a new campaign or contribute to existing ones
3. Campaign managers can create spending requests
4. Contributors can approve requests
5. Campaign managers can finalize approved requests to transfer funds

## Testing

Run the test suite with:
```bash
npm run test
```

## Troubleshooting

If you encounter any errors when accessing the application, make sure:
- You're connected to the Sepolia network and your .env file is set up correctly
- Your MetaMask is properly configured and you're logged in
- You're accessing a valid campaign address
