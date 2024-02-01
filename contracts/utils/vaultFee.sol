// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20 || ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

// extention de mon contract de base ERC4626 ou on va implementer la gestion de fee sur le vault au deposit et au reedem

/* :::::::::

c'est comment un token ERC20 sauf qu'il agit comme un vault on set le token underline qu'il va recevoir 
il reçoit() ces tokens avec la function deposit() je vais recevoir en retour les vShares sur un ratio 1:1
des tokens que j'ai deposit.

si je veut recuper mes tokens j'appelle la function withdraw() qui va burn mes vShares et me envoyer mes tokens
l'implementation des fees est importante sur le deposit previewDeposit() et deposit() et sur le withdraw previewWithdraw() withdraw()  

l'user va aussi voir ses tokens s'apprecier sur le withdraw bob depose 100 USDC => il recoit 99vSUSDC avec des fee set a 1%
en prenant compte de la durée et de la % que representes ses participations dans le vault
lors du withdraw il se verra reçevoir + de usdc ex avec 10% d'appreciation il recevera 110 USDC 
 
:::::::::::::::*/

abstract contract ERC4626Fee is ERC4626 {
    uint256 private constant _BASIS_POINT_SCALE = 1e4;
    using Math for uint256;
    // === Overrides ===

    /// @dev Preview taking an entry fee on deposit. See {IERC4626-previewDeposit}.
    function previewDeposit(uint256 assets) public view virtual override returns (uint256) {
        uint256 fee = _feeOnTotal(assets, _entryFeeBasisPoints());
        return super.previewDeposit(assets - fee);
    }

    /// @dev Preview adding an entry fee on mint. See {IERC4626-previewMint}.
    function previewMint(uint256 shares) public view virtual override returns (uint256) {
        uint256 assets = super.previewMint(shares);
        return assets + _feeOnRaw(assets, _entryFeeBasisPoints());
    }

    /// @dev Preview adding an exit fee on withdraw. See {IERC4626-previewWithdraw}.
    function previewWithdraw(uint256 assets) public view virtual override returns (uint256) {
        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        return super.previewWithdraw(assets + fee);
    }

    /// @dev Preview taking an exit fee on redeem. See {IERC4626-previewRedeem}.
    function previewRedeem(uint256 shares) public view virtual override returns (uint256) {
        uint256 assets = super.previewRedeem(shares);
        return assets - _feeOnTotal(assets, _exitFeeBasisPoints());
    }


    /// @dev Send entry fee to {_entryFeeRecipient}. See {IERC4626-_deposit}.
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 shares
    ) internal virtual override {
        /// @dev set les fee
        uint256 fee = _feeOnTotal(assets, _entryFeeBasisPoints());
        /// @dev treasury address where fee are collected
        address recipient = _entryFeeRecipient();
        
        return super._deposit(caller, receiver, assets, shares);

        if (fee > 0 && recipient != address(this)) {
            SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
        }
    }

    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal virtual override {
        
        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        address recipient = _exitFeeRecipient();
        
        return super._withdraw(caller, receiver, owner, assets, shares);
        
        if (fee > 0 && recipient != address(this)) {
            SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
        }
    }

    /** @dev See {IERC4626-convertToShares}. */
    // function convertToShares(uint256 assets) public view override returns (uint256) {
    //     uint256 entryFee = _feeOnTotal(assets, _entryFeeBasisPoints());
    //     return _convertToShares(assets - entryFee);
    // }

    // /** @dev See {IERC4626-convertToAssets}. */
    // function convertToAssets(uint256 shares) public view override returns (uint256) {
    //     uint256 exitFee = _feeOnRaw(shares, _exitFeeBasisPoints());
    //     return _convertToAssets(shares - exitFee);
    // } 
    
    // === Fee configuration ===


    function _entryFeeBasisPoints() internal view virtual returns (uint256) {
        return 0; // replace with e.g. 100 for 1%
    }

    function _exitFeeBasisPoints() internal view virtual returns (uint256) {
        return 0; // replace with e.g. 100 for 1%
    }

    function _entryFeeRecipient() internal view virtual returns (address) {
        return address(0); // replace with e.g. a treasury address
    }

    function _exitFeeRecipient() internal view virtual returns (address) {
        return  address(0); // replace with e.g. a treasury address
    }

    /// @dev Calculates the fees that should be added to an amount `assets` that does not already include fees.
    /// Used in {IERC4626-mint} and {IERC4626-withdraw} operations.
    function _feeOnRaw(
        uint256 assets,
        uint256 feeBasisPoints
    ) private pure returns (uint256) {
        return
            assets.mulDiv(feeBasisPoints, _BASIS_POINT_SCALE, Math.Rounding.Ceil);
    }

    /// @dev Calculates the fee part of an amount `assets` that already includes fees.
    /// Used in {IERC4626-deposit} and {IERC4626-redeem} operations.
    function _feeOnTotal(
        uint256 assets,
        uint256 feeBasisPoints
    ) private pure returns (uint256) {
        return
            assets.mulDiv(
                feeBasisPoints,
                feeBasisPoints + _BASIS_POINT_SCALE,
                Math.Rounding.Ceil
            );
    }
}
