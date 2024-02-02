import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = process.env.WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [sepolia],
  connectors : [
    walletConnect({
      projectId : projectId as string,
      
      metadata: { 
        name: 'line', 
        description: 'create vaults and unlock tokens to earn yield', 
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
        url : ""
      } 
    })
  ],
  transports: {
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`),
  },

  
})
