# 📝 Based Guestbook

A retro terminal-styled on-chain guestbook built on Base. Connect your wallet, leave a message, and mint it as an event—all stored permanently on-chain.

![Based Guestbook](https://img.shields.io/badge/Base-Sepolia-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-purple)

## 🚀 Live Contract

**Deployed on Base Sepolia**: [`0x106c6F8100486a6542B99e38afeEf2E2940Cd375`](https://sepolia.basescan.org/address/0x106c6F8100486a6542B99e38afeEf2E2940Cd375)

## ✨ Features

- 🔐 **Wallet Connection** via Reown AppKit (WalletConnect v2)
- 📝 **On-Chain Messages** stored permanently on Base
- 🎨 **Retro Terminal UI** with CRT effects and scanlines
- ⚡ **Real-time Updates** using wagmi hooks
- 🔍 **Event Emissions** for indexing and analytics
- ✅ **Fully Tested** smart contracts with Hardhat
- 🌐 **Base Network** optimized (Sepolia testnet & Mainnet)

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Reown AppKit** - Multi-wallet connection
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library

### Smart Contracts
- **Solidity 0.8.24** - Smart contract language
- **Hardhat** - Development environment
- **Ethers.js** - Ethereum interactions
- **OpenZeppelin** - Security standards

## 📦 Project Structure

```
based-guestbook/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles & terminal effects
├── components/            # React components
│   ├── Terminal.tsx       # Terminal wrapper with CRT effects
│   ├── MessageForm.tsx    # Message submission form
│   └── MessageList.tsx    # Display all messages
├── contracts/            # Solidity smart contracts
│   └── Guestbook.sol     # Main guestbook contract
├── scripts/              # Deployment scripts
│   └── deploy.ts         # Contract deployment
├── test/                 # Contract tests
│   └── Guestbook.test.ts # Comprehensive test suite
├── lib/                  # Utilities and configuration
│   ├── config.ts         # Reown AppKit config
│   ├── context.tsx       # Web3 provider setup
│   ├── contract.ts       # Contract ABI and address
│   └── utils.ts          # Helper functions
└── hardhat.config.ts     # Hardhat configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or any Web3 wallet
- Base Sepolia ETH (get from [faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd based-guestbook
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Update the following variables:

```env
# Get from https://cloud.reown.com
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id

# Will be filled after deployment
NEXT_PUBLIC_GUESTBOOK_ADDRESS=0x...

# For deployment
PRIVATE_KEY=your_wallet_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

### 4. Compile Smart Contracts

```bash
npm run compile
```

### 5. Run Tests

```bash
npm test
```

### 6. Deploy Smart Contract

#### Deploy to Base Sepolia (Testnet)

```bash
npm run deploy:testnet
```

Copy the deployed contract address and update `NEXT_PUBLIC_GUESTBOOK_ADDRESS` in `.env`

#### Verify Contract on Basescan

```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
```

### 7. Run the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Smart Contract

### Guestbook.sol

The main contract includes:

- **postMessage(string)** - Post a new message (max 280 chars)
- **getMessage(uint256)** - Get a specific message by ID
- **getAllMessages()** - Retrieve all messages
- **getRecentMessages(count, offset)** - Paginated message retrieval
- **getMessageCount()** - Total message count

### Events

```solidity
event MessagePosted(
    address indexed author,
    string content,
    uint256 timestamp,
    uint256 messageId
);
```

## 🎨 UI Features

### Terminal Aesthetic
- CRT scanline effects
- Retro green monospace font
- Glowing text shadows
- Responsive design

### User Experience
- Real-time wallet connection status
- Transaction status updates
- Character counter (280 max)
- Auto-refreshing message list
- Formatted timestamps and addresses

## 🧪 Testing

Run the full test suite:

```bash
npm test
```

Tests cover:
- Message posting validation
- Empty/oversized message rejection
- Multi-user interactions
- Message retrieval functions
- Pagination

## 📤 Deployment Guide

### Deploy to Base Mainnet

1. Ensure you have ETH on Base Mainnet
2. Update `.env` with mainnet RPC if needed
3. Run deployment:

```bash
npm run deploy:mainnet
```

4. Verify the contract:

```bash
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

5. Update frontend `.env` with production contract address

### Deploy Frontend

Deploy to Vercel:

```bash
vercel deploy
```

Or any other hosting platform that supports Next.js.

## 🔒 Security Considerations

- ✅ Input validation (length checks)
- ✅ No external calls (prevents reentrancy)
- ✅ No owner privileges (fully decentralized)
- ✅ Immutable message storage
- ✅ Event emissions for transparency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Base](https://base.org/) - L2 blockchain
- [Reown](https://reown.com/) - Wallet connection infrastructure
- [Hardhat](https://hardhat.org/) - Development environment
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum

## 📞 Support

- Open an issue for bugs or feature requests
- Follow [@base](https://twitter.com/base) for updates

---

**Built with ❤️ on Base**

*Leave your mark on-chain* 🚀
