// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title XQNT Coin
/// @notice Fixed-supply ERC-20 with no owner, administrator, taxes, pause,
/// blacklist, proxy, upgrade or post-deployment mint capability.
contract XQNTToken is ERC20 {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 ether;

    error InvalidDistributionSafe();

    constructor(address distributionSafe) ERC20("XQNT Coin", "XQNT") {
        if (distributionSafe == address(0)) revert InvalidDistributionSafe();
        _mint(distributionSafe, MAX_SUPPLY);
    }
}
