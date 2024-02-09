import { writeContract } from '@wagmi/core'
import { config } from "@/_libs/config";
import { abi } from "@/_libs/abi";
import { Hash } from './types/types';
import { IWriteContract } from './types/types';
const contractAddress: Hash = "0x58Fa02924312CFd1300714daEc48D4f05Ef7f2e1";



export class WriteContract implements IWriteContract {
    // # apporouve contract spender 
    async approuve(assets :bigint, spender : Hash, Current_balance : bigint) : Promise<void> {
        try {
        
            // checkpoint pour s'assurer que l'user n'essaye pas de stake plus que ça currentBalance
            if(assets > Current_balance) {
            throw new Error("you cant stake more than your balance")
            }
            
            writeContract(config,{
                    abi,
                    address : contractAddress,
                    functionName : "approve",
                    args : [
                        spender,
                        assets,
                    ]
            })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }

    // # deposit underlined asset into the contract and get vShares at 1:1 ratio

    async deposit(assets: bigint, receiver:Hash, Current_balance : bigint ): Promise<number | void> {
        
        if(assets > Current_balance) {
            throw new Error("you cant stake more than your balance")
        }
        
        try {

            writeContract(config,{
                    abi,
                    address : contractAddress,
                    functionName : "deposit",
                    args : [
                        assets,
                        receiver
                    ]
            })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
    // # withdraw underlined asset from the contract to the caller exchange burn their shares and sent it their asset
    async withdraw(assets: bigint, receiver:Hash , owner:Hash ): Promise<number | void> {
        try {
            writeContract(config,{
                    abi,
                    address : contractAddress,
                    functionName : "withdraw",
                    args : [
                        assets,
                        receiver,
                        owner
                    ]
            })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
    // # redeem underlined asset from the contract to the caller exchange burn their shares and sent it their asset
    async redeem(shares: bigint, receiver:Hash , owner:Hash ): Promise<number | void> {
        try {
            writeContract(config,{
                    abi,
                    address : contractAddress,
                    functionName : "redeem",
                    args : [
                        shares,
                        receiver,
                        owner
                    ]
            })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
    
    /** @dev See {IERC4626-mint}.
     *
     * As opposed to {deposit}, minting is allowed even if the vault is in a state where the price of a share is zero.
     * In this case, the shares will be minted without requiring any assets to be deposited.
    */
    async mint(shares: bigint, receiver: Hash): Promise<number | void> {
        try {
            writeContract(config,{
                    abi,
                    address : contractAddress,
                    functionName : "mint",
                    args : [
                        shares,
                        receiver,
                    ]
            })
        } catch (error) {
            let message = "Unknow error";
            if (error instanceof Error) message = error.message;
            throw new Error(message);
        }
    }
  
}
