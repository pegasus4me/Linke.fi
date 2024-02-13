"use client";
import { IVaultStrucure } from "@/methods/types/types";
import { Skeleton } from "@/components/ui/skeleton"
import InitiateTransaction from "./popup";
import { WriteContract } from "@/methods/writeContract";
import { Hash } from "@/methods/types/types";
import Reedem from "./reedem";

export default function Structure({
  tvl,
  pool,
  booster,
  apy,
  vPool,
  vShares,
  staked
}: IVaultStrucure): JSX.Element {


  return (
    <article className="">
      <div className=" border border-neutral-300 flex flex-col z-1000 max-w-[90%] m-auto">
          <div className="flex justify-between p-3 items-center  flex-wrap">
            <div>
            <legend className="font-light text-sm">pool</legend>
            {pool !== undefined ? <p className="font-semibold">{pool}/ {vPool}</p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}
            </div>
            <div>
            <legend className="font-light text-sm">total value locked</legend>
            {tvl !== ""  ? <p className="font-semibold">{tvl} usdc</p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}
            </div>
            <div>
            <legend className="font-light text-sm">apy (fixed)</legend>
            {apy !== ""  ? <p className="font-semibold">{apy}%</p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}
            </div>
            <div>
            <legend className="font-light text-sm">boost</legend>
            {booster !== "" ? <p className="font-semibold text-[#2730F7]">x{booster}</p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}
            </div>
            <InitiateTransaction name="usdc" />
            
          </div>
      <div className="p-3">
        {staked !== undefined ? <p className="font-medium text-sm">staked <span className="font-light">{staked} usdc </span></p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}
        {vShares !== undefined ? <p className="font-medium text-sm">staked <span className="font-light">{vShares} usdc </span></p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}

        <Reedem vShares={vShares}/>
      </div>
      </div>
      
    </article>
  );
}
