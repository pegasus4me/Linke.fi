"use client";

import { ConnectKitButton } from "connectkit";
import Linki from "../assets/Linke.fi.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="mt-5 max-w-[50%] m-auto">
      <div className="flex justify-end ">
          <ConnectKitButton 
          showBalance={true}
          />
        </div>
      <div className="flex justify-center items-center p-2 flex-col gap-4 "> 
        <div className="flex items-center">
          <Image src={Linki} alt="logo_linki" width={150} height={150} />
        </div>

        <div>
            <ul className="flex gap-4">
                <Link href={"/"} className="focus:bg-neutral-100 focus:p-1 focus:rounded-md">vaults</Link>
                <Link href={"/"} className="focus:bg-neutral-100 focus:p-1 focus:rounded-md">dashboard</Link>
                <Link href={"/"} className="focus:bg-neutral-100 focus:p-1 focus:rounded-md">stats</Link>
                <Link href={"/"}  className="focus:bg-neutral-100 focus:p-1 focus:rounded-md">restake</Link>
            </ul>
        </div>
      </div>
      
    </nav>
  );
}
