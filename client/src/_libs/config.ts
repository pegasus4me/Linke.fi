
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
        "https://sepolia.infura.io/v3/ee62e7e92a4b4e3cbb0efac6d92b950a"
      ),
      [mainnet.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: "3aeb9c91b76920c2c9d58e9afd364758" as string,

    // Required App Info
    appName: "Linke.fi",

    // Optional App Info
    appDescription: "Linke_fi",
    appUrl: "", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);
