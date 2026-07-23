// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {VestingWallet} from "@openzeppelin/contracts/finance/VestingWallet.sol";

/// @title XQNT Team Vesting
/// @notice Team allocation is locked for 365 days after launch, then vests
/// linearly for 1,095 days. The beneficiary is the 2-of-3 Team Safe.
contract XQNTTeamVesting is VestingWallet {
    uint64 public constant CLIFF_DURATION = 365 days;
    uint64 public constant LINEAR_DURATION = 1_095 days;
    uint64 public immutable launchTimestamp;

    error InvalidLaunchTimestamp();

    constructor(address teamSafe, uint64 launchTimestamp_)
        VestingWallet(teamSafe, launchTimestamp_ + CLIFF_DURATION, LINEAR_DURATION)
    {
        if (launchTimestamp_ == 0) revert InvalidLaunchTimestamp();
        launchTimestamp = launchTimestamp_;
    }
}
