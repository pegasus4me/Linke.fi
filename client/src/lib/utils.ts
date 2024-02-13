import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseUnits } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function checker(amount:number, totalAllowance:number) : boolean {
  // checker si l'user peut swap ou a besoin d'approuve avant
  // si il approuve 100 tokens et qu'il spend 80 puis il essaye de respend 100 il pourra pas 
  // car la totalAllowance sera alors inferieure a l'amount donc il aura besoin de re-approuve
  
  // j'ai 18 decimales il me faut que je convertisse mes input coté client en 18 decimales
  if(!Number.isNaN(amount)) {
    
    if(totalAllowance < parseUnits(String(amount), 6) || totalAllowance == 0) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
 
}