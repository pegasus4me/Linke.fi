"use client"

import Structure from "./structure";
import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { WriteContract} from "@/methods/writeContract";
import { ReadContract } from "@/methods/readContract";
import { useToken } from 'wagmi'
import { Hash } from "@/methods/types/types";
import PopUp from "./popup";
// functions ou l'user peut creer des vaults avec des underlined tokens personnalisés : soon 
const VUSDC:Hash  = "0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1"
const USDC_TOKEN:Hash = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"



export default function Main() {
    const [Clicked, setClicked] = useState<boolean>(false)
    console.log(Clicked)
    const {_underlinedToken, _allowance, _tvl, _entryFee} = new ReadContract()
    const {deposit, approuve, withdraw, redeem} = new WriteContract()
    
    // recuperer l'underline token et extraire son nom 
    const vToken = useToken({
        address :  VUSDC
    })
    const underlined = useToken({
        address : USDC_TOKEN
    })



    return (
        <>
         
        <Structure 
        pool={underlined.data?.symbol} 
        tvl={''} 
        apy={""} 
        booster={""}
        vPool={vToken.data?.symbol} />

        </>
    )
}