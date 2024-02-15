
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import env from "dotenv"
env.config
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia, mainnet],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(
        `${process.env.NEXT_PUBLIC_INFURA_RPC}`
      ),
      [mainnet.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,

    // Required App Info
    appName: "Linke.fi",

    // Optional App Info
    appDescription: "Linke_fi",
    appUrl: "", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);
