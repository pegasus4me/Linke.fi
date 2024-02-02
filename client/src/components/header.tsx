"use client";

import { ConnectKitButton } from "connectkit";
import Linki from "../assets/Linke.fi.svg";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="mt-5 max-w-[50%] m-auto">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center">
          <Image src={Linki} alt="logo_linki" width={150} height={150} />
        </div>

        <div className="flex justify-end">
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  );
}
