// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice Base Sepolia rehearsal asset. It is not Circle USDC and must never
/// be referenced by the mainnet configuration.
contract MockUSDC is ERC20 {
    constructor(address recipient, uint256 amount) ERC20("XQNT Mock USDC", "mUSDC") {
        require(recipient != address(0), "zero recipient");
        _mint(recipient, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
