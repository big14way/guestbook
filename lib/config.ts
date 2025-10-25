import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, baseSepolia } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

if (!projectId) {
  console.warn("NEXT_PUBLIC_PROJECT_ID is not set");
}

export const networks = [base, baseSepolia];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
