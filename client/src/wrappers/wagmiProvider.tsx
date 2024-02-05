"use client"
import { WagmiProvider } from 'wagmi'
import { config } from '@/_libs/config'
export default function Provider({children}:{children : React.ReactNode}) : JSX.Element {
    return <WagmiProvider config={config}>
        {children}
    </WagmiProvider>
}