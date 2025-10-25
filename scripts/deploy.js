const hre = require("hardhat");

async function main() {
  console.log("Deploying Guestbook contract to Base Sepolia...");
  console.log("Network:", hre.network.name);

  // Get the deployer
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("Deployer account has no funds! Get testnet ETH from https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
  }

  const Guestbook = await hre.ethers.getContractFactory("Guestbook");
  const guestbook = await Guestbook.deploy();

  await guestbook.waitForDeployment();

  const address = await guestbook.getAddress();

  console.log(`\n✅ Guestbook deployed to: ${address}`);
  console.log("\nTo verify on Basescan:");
  console.log(`npx hardhat verify --network baseSepolia ${address}`);
  console.log("\nAdd this to your .env file:");
  console.log(`NEXT_PUBLIC_GUESTBOOK_ADDRESS=${address}`);

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
