// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20 || ^0.8.19;

// import "hardhat/console.sol";

import "./utils/vaultFee.sol";

contract Vault is ERC4626Fee {
    
    address payable public vaultOwner;
    uint256 public entryFeeBasisPoints;
    uint256 public exitFeeBasisPoints;

    constructor(IERC20 _asset, uint256 _basisPoints, uint256 _exitBasisPoints) ERC4626(_asset) ERC20("vUscd", "vUSDC"){
        vaultOwner = payable(msg.sender);
        entryFeeBasisPoints = _basisPoints;
        exitFeeBasisPoints = _exitBasisPoints;
    }

    /** @dev See {IERC4626-deposit}. */    
    
    function deposit(uint256 assets, address receiver) public virtual override returns (uint256) {
        require(assets <= maxDeposit(receiver), "ERC4626: deposit more than max");

        uint256 shares = previewDeposit(assets);
        _deposit(_msgSender(), receiver, assets, shares);
        afterDeposit(assets, shares);

        return shares;
    }

    /** @dev See {IERC4626-mint}.
     *
     * As opposed to {deposit}, minting is allowed even if the vault is in a state where the price of a share is zero.
     * In this case, the shares will be minted without requiring any assets to be deposited.
     */
    
    function mint(uint256 shares, address receiver) public virtual override returns (uint256) {
        require(shares <= maxMint(receiver), "ERC4626: mint more than max");

        uint256 assets = previewMint(shares);
        _deposit(_msgSender(), receiver, assets, shares);
        afterDeposit(assets, shares);

        return assets;
    }

    /** @dev See {IERC4626-redeem}. */
    function redeem(uint256 shares, address receiver, address owner) public virtual override returns (uint256) {
        require(shares <= maxRedeem(owner), "ERC4626: redeem more than max");

        uint256 assets = previewRedeem(shares);
        beforeWithdraw(assets, shares);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return assets;
    }

     /** @dev See {IERC4626-withdraw}. */
    function withdraw(uint256 assets, address receiver, address owner) public virtual override returns (uint256) {
        require(assets <= maxWithdraw(owner), "ERC4626: withdraw more than max");

        uint256 shares = previewWithdraw(assets);
        beforeWithdraw(assets, shares);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return shares;
    }

    ///@dev entry fee override from {vaultFee}
    
    function _entryFeeBasisPoints() internal view override returns (uint256) {
        return entryFeeBasisPoints;
    }

    function _entryFeeRecipient() internal view override returns (address) {
        return vaultOwner;
    }

    ///@dev Exit fee overddide from {vaultFee}

    function _exitFeeBasisPoints() internal view override returns (uint256) {
        return exitFeeBasisPoints;
    }



    /*//////////////////////////////////////////////////////////////
                          INTERNAL HOOKS LOGIC
    //////////////////////////////////////////////////////////////*/

    function afterDeposit(uint256 assets, uint256 shares) internal virtual {}
    
    function beforeWithdraw(uint256 assets, uint256 shares) internal virtual {}

}
