"use client"
import Structure from "./structure";
import { useState, useEffect } from "react";
import { ReadContract } from "@/methods/readContract";
import { useAccount, useBalance, useToken } from 'wagmi'
import { Hash } from "@/methods/types/types";
import { config } from "@/_libs/config";
import PopUp from "./popup";
// functions ou l'user peut creer des vaults avec des underlined tokens personnalisés : soon 
const VUSDC:Hash  = "0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1"
const USDC_TOKEN:Hash = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"



export default function Main() {
    const {_underlinedToken, _allowance, _tvl, _entryFee} = new ReadContract()
    const account = useAccount({config})
    // recuperer l'underline token et extraire son nom 
    const vToken = useToken({
        address :  VUSDC
    })
    const underlined = useToken({
        address : USDC_TOKEN
    })
    // vSharesBalance
    const VSharesUsdcBalance = useBalance({
        address : account.address,
        token : VUSDC
    })
    const USDCBalance = useBalance({
        address : account.address,
        token : USDC_TOKEN
    })

    async function TVL() {
    const tvl = await _tvl()
    console.log("igo",tvl)
}
TVL()
    
    return (
        <>
         
        <Structure 
        pool={underlined.data?.symbol} 
        tvl={''} 
        apy={"3.5"} 
        booster={"1.4"}
        vPool={vToken.data?.symbol} 
        vShares={VSharesUsdcBalance.data?.formatted}
        staked={USDCBalance.data?.formatted}
        />

        </>
    )
}