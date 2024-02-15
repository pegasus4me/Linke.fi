'use client'
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ITransaction } from "@/methods/types/types";
import { Hash } from "viem";
import {config} from "@/_libs/config"
import { useAccount } from "wagmi";
import { checker } from "@/lib/utils";
import { WriteContract } from "@/methods/writeContract";
import { ReadContract } from "@/methods/readContract";
import { useBalance } from 'wagmi'
// import { parseEther } from 'viem'
import { parseUnits } from 'viem'
// ///////////////////////////////
const contract_address:Hash ="0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1"
const USDC_TOKEN:Hash = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

 export default function InitiateTransaction({name, tvl} : ITransaction) : JSX.Element {

  const [amount, setAmount] = useState<string>("0")
  const [verify, setVerify] = useState<boolean>(false)
  const { approuve, deposit } = new WriteContract()
  const {_allowance}  = new ReadContract()
  const account = useAccount({config})
  const usdcBalance = useBalance({
    address : account.address,
    token : USDC_TOKEN
  })
  // verifie si l'allowance est superieure au montant entrée par l'user
  async function allowanceCheker(){
    if(account.address !== undefined) {
      const TAllowance = await _allowance(account.address as `0x${string}`, contract_address as `0x${string}`)
      const verify =  checker(parseFloat(amount),Number(TAllowance));
      setVerify(verify)
    } else {
      return 
    }
    
  }

  useEffect(()=> {
    allowanceCheker()
  },[amount])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#2730F7] mt-4 text-white font-light py-3 px-8 hover:bg-[#2730A7] hover:bg-[#747AFF]">Stake {name}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>vault tvl {tvl}</DialogTitle>
          <DialogDescription>
            Stake yours USDC and earn juicy real word 3.5% APY
          </DialogDescription>
        </DialogHeader>
  
        <div className="flex flex-col mb-5 mt-5 p-2 ">
          <div className="">
            <label className="text-sm font-medium p-2 mt-2">estimated apy : 3.5%</label>
          </div>
          <div className="flex items-center gap-7 p-2">
            
            <Input placeholder="0.0" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setAmount(e.target.value)}
            className="rounded-none flex"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="text-xs font-base text-end">{usdcBalance.data?.formatted} usdc</label>
            <label className="text-sm font-medium p-2 mt-2">you will get {amount === "0"  || amount === undefined ? "0" : parseFloat(amount) - 0.05} vUSDC</label>
          </div>
        </div>
        <DialogFooter>
        
        {/* check allowance approuve deposit */}
        
        <div className="flex">
        {
            verify  ? (
              <button className="bg-[#2730F7] text-white font-light py-3 px-8 hover:bg-[#2730A7] hover:bg-[#747AFF]"
              onClick={()=> deposit(parseUnits(amount, 6), account.address as `0x${string}`, parseUnits(usdcBalance.data?.formatted as string, 6))}
              >deposit</button>
            ) : (
              <button className="bg-[#2730F7] text-white font-light py-3 px-8 hover:bg-[#2730A7] hover:bg-[#747AFF]"
              onClick={() => approuve(parseUnits(amount, 6), contract_address, parseUnits(usdcBalance.data?.formatted as string, 6))}
              >approuve</button>
            )
        }
        </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
