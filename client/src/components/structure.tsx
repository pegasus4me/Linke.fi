"use client";
import { IVaultStrucure } from "@/methods/types/types";
import { Skeleton } from "@/components/ui/skeleton"

export default function Structure({
  tvl,
  pool,
  booster,
  apy,
  vPool
}: IVaultStrucure): JSX.Element {
  return (
    <article className="">
      <div className=" border border-neutral-300 border-2 flex justify-between p-3 items-center z-1000 max-w-[90%] m-auto">
        <div>
        <legend className="font-light text-sm">pool</legend>
        {pool !== undefined ? <p className="font-semibold">{pool}/{vPool}</p> : <Skeleton className="w-[100px] h-[20px] rounded-sm" />}
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
        
        <button className="bg-[#2730F7] text-white font-light py-3 px-8 hover:bg-white hover:bg-[#747AFF]">
          stake
        </button>
      </div>
    </article>
  );
}
