
export type Hash = `0x${string}`;

export interface IReadContract {
    _entryFee() : Promise<number | void>
    _previewDeposit(assets:  bigint) : Promise<bigint | void>
    _previewWithdraw(shares : bigint) : Promise<bigint | void>
    _allowance(owner : Hash , spender : Hash) : Promise<bigint | void>
    _allowanceShares(owner: Hash, spender: Hash): Promise<bigint | void>
    _tvl() : Promise<number | void>
    _underlinedToken() : Promise<Hash | void>
  
}

export interface IWriteContract {
    approuve(assets : bigint , spender : Hash, Current_balance:bigint | undefined) : Promise<void>
    approuveShares(assets :bigint, spender : Hash, Current_balance : bigint) : Promise<void> 
    deposit(assets: bigint, receiver: Hash, Current_balance:bigint | undefined): Promise<number | void>;
    withdraw(assets : bigint,  receiver: Hash, owner : Hash): Promise<number | void>;
    redeem(shares : bigint, receiver: Hash, owner : Hash, Current_balance:bigint | undefined): Promise<number | void>;
    mint(shares : bigint, receiver: Hash): Promise<number | void>;
}

export interface IVaultStrucure {
    pool : string | undefined
    vPool : string | undefined
    tvl :  string | undefined 
    apy : string | undefined
    booster : string | undefined
    vShares : string | undefined
    staked : string | undefined
}

export interface ITransaction {
    name : string
    tvl : string
    ratio : string
    approuve : () => void
    deposit : () => void
    allowance : ()=> void
}

// | (() => Promise<string | void>)

