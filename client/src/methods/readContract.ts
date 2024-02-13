import { readContract } from '@wagmi/core'
import { config } from "@/_libs/config";
import { abi } from "@/_libs/abi";
import { Hash } from './types/types';
import { IReadContract } from './types/types';

/// UNDERLINED CONTRACT ADDRESS UDSDC CIRCLE
const contractAddress: Hash = "0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1";
// approuve USDC trading 
const USDC_TOKEN:Hash = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

export class ReadContract implements IReadContract {



    async _entryFee(): Promise<number | void> {
        try {
           readContract(config,{
            abi,
            address : contractAddress,
            functionName : "entryFeeBasisPoints",
           })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }

    async _previewDeposit(assets : bigint): Promise<bigint | void> {
         try {
           const previewDeposit = readContract(config,{
            abi,
            address : contractAddress,
            functionName : "previewDeposit",
            args :  [
                assets
            ]
           })
           return previewDeposit;
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
    async _previewWithdraw(shares: bigint): Promise<bigint | void> {
         try {
           const previewWithdraw  = readContract(config,{
            abi,
            address : contractAddress,
            functionName : "previewWithdraw",
            args : [
                shares
            ]
           })
           return previewWithdraw;
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }

    // check the allowance after the approuve step is completed 
    async _allowance(owner: Hash, spender: Hash): Promise<bigint | void> {
        try {
            const a = readContract(config,{
             abi,
             address : USDC_TOKEN,
             functionName : "allowance",
             args : [
                owner, 
                spender
             ]
            })
            return a;
         } catch (error) {
             let message = "Unknow error";
             if (error instanceof Error) message = error.message;
             throw new Error(message);
         }
    }

    async _allowanceShares(owner: Hash, spender: Hash): Promise<bigint | void> {
        try {
            const a = readContract(config,{
             abi,
             address : contractAddress,
             functionName : "allowance",
             args : [
                owner, 
                spender
             ]
            })
            return a;
         } catch (error) {
             let message = "Unknow error";
             if (error instanceof Error) message = error.message;
             throw new Error(message);
         }
    }


    async _tvl(): Promise<number | void> {
         try {
           readContract(config,{
            abi,
            address : contractAddress,
            functionName : "totalAssets",
           })

        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
     async _underlinedToken(): Promise<Hash | void> {
        try {
            readContract(config,{
             abi,
             address : contractAddress,
             functionName : "asset",
            })
 
         } catch (error) {
             let message = "Unknow error";
             if (error instanceof Error) message = error.message;
             throw new Error(message);
         }
    }
  
}
