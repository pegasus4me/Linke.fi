
export type Hash = `0x${string}`;

export interface IReadContract {
    _entryFee() : Promise<number | void>
    _previewDeposit(assets:  bigint) : Promise<number | void>
    _previewWithdraw(shares : bigint) : Promise<number | void>
    _allowance(owner : Hash , spender : Hash) : Promise<number | void>
    _tvl() : Promise<number | void>
    _underlinedToken() : Promise<Hash | void>
  
}

export interface IWriteContract {
    approuve(assets : bigint , spender : Hash) : Promise<void>
    deposit(assets: bigint, receiver: Hash): Promise<number | void>;
    withdraw(assets : bigint,  receiver: Hash, owner : Hash): Promise<number | void>;
    redeem(shares : bigint, receiver: Hash, owner : Hash ): Promise<number | void>;
    mint(shares : bigint, receiver: Hash): Promise<number | void>;
}

export interface IVaultStrucure {
    pool : string | undefined
    vPool : string | undefined
    tvl :  string | undefined
    apy : string | undefined
    booster : string | undefined
}

