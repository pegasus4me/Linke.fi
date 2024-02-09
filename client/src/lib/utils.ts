import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function checker(amount:number, totalAllowance:number) : boolean {
  // checker si l'user peut swap ou a besoin d'approuve avant
  // si il approuve 100 tokens et qu'il spend 80 puis il essaye de respend 100 il pourra pas 
  // car la totalAllowance sera alors inferieure a l'amount donc il aura besoin de re-approuve
  
  if(totalAllowance < amount || totalAllowance == 0) {
    return false
  } else {
    return true
  }
}