"use client";
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
import { Label } from "@/components/ui/label";
import { WriteContract } from "@/methods/writeContract";
import { ReadContract } from "@/methods/readContract";
import {Hash} from "@/methods/types/types"
import { useAccount } from "wagmi";
import { config } from "@/_libs/config";
import { checker } from "@/lib/utils";
import { parseUnits } from "viem";

const contract_address:Hash ="0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1"
const USDC_TOKEN:Hash = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"


export default function Reedem({ vShares }: { vShares: string | undefined }) {
    const account = useAccount({config})
    const [verify, setVerify] = useState<boolean>(false)
    const [shares, setVshare] = useState<string | undefined>();
    const {redeem, approuveShares} = new WriteContract()
    const {_allowanceShares} = new ReadContract()
        
    async function checkAllowance () {
        if(account.address !== undefined) {
            const shareAllowance = await _allowanceShares(account.address as `0x${string}`, contract_address )
            console.log("cococ", shareAllowance)
            const verifyAllowance = checker(Number(shares), Number(shareAllowance))
            setVerify(verifyAllowance)
        } else {
            return 
        }
 
    }
    
    useEffect(()=> {
        checkAllowance()
      },[shares])

    return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#2730F7] mt-4 text-white font-light py-3 px-8 hover:bg-[#2730A7] hover:bg-[#747AFF]">
          Reedem USDC
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>vSUsdc balance : {vShares !== undefined ? vShares : "..."}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col mb-5 mt-5 p-2 ">
          <div className="flex items-center gap-7 p-2">
            <Input
              placeholder="0.0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVshare(e.target.value)
              }
              className="rounded-none flex"
            />
          </div>
        </div>
        <DialogFooter>
          {/* check allowance approuve deposit */}

          <div className="flex">
          {
            verify  ? (
              <button className="bg-[#2730F7] text-white font-light py-3 px-8 hover:bg-[#2730A7] hover:bg-[#747AFF]"
              onClick={()=> redeem(parseUnits(shares as string, 6), account.address as `0x${string}`, contract_address,  parseUnits(vShares as string , 6)) }
              >reedem usdc</button>
            ) : (
              <button className="bg-[#2730F7] text-white font-light py-3 px-8 hover:bg-[#2730A7] hover:bg-[#747AFF]"
              onClick={() => approuveShares(parseUnits(shares as string, 6), contract_address, parseUnits(vShares as string , 6))}
              >approuve vSUsdc</button>
            )
        }
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
