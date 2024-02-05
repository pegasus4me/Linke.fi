import { readContract } from '@wagmi/core'
import { config } from "@/_libs/config";
import { abi } from "@/_libs/abi";
import { Hash } from './types/types';
import { IReadContract } from './types/types';

/// UNDERLINED CONTRACT ADDRESS UDSDC CIRCLE
const contractAddress: Hash = "0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1";


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

    async _previewDeposit(assets : bigint): Promise<number | void> {
         try {
           readContract(config,{
            abi,
            address : contractAddress,
            functionName : "previewDeposit",
            args :  [
                assets
            ]
           })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
    async _previewWithdraw(shares: bigint): Promise<number | void> {
         try {
           readContract(config,{
            abi,
            address : contractAddress,
            functionName : "previewWithdraw",
            args : [
                shares
            ]
           })

        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }

    // check the allowance after the approuve step is completed
    async _allowance(owner: Hash, spender: Hash): Promise<void> {
        try {
            readContract(config,{
             abi,
             address : contractAddress,
             functionName : "allowance",
             args : [
                owner, 
                spender
             ]
            })
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
