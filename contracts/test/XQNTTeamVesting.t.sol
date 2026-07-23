// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {XQNTToken} from "../src/XQNTToken.sol";
import {XQNTTeamVesting} from "../src/XQNTTeamVesting.sol";

contract XQNTTeamVestingTest is Test {
    uint64 internal constant LAUNCH = 2_000_000_000;
    uint256 internal constant TEAM_ALLOCATION = 150_000_000 ether;
    address internal distributionSafe = makeAddr("distribution-safe");
    address internal teamSafe = makeAddr("team-safe");
    XQNTToken internal token;
    XQNTTeamVesting internal vesting;

    function setUp() external {
        token = new XQNTToken(distributionSafe);
        vesting = new XQNTTeamVesting(teamSafe, LAUNCH);
        vm.prank(distributionSafe);
        token.transfer(address(vesting), TEAM_ALLOCATION);
    }

    function test_VestingSchedule() external view {
        assertEq(vesting.owner(), teamSafe);
        assertEq(vesting.launchTimestamp(), LAUNCH);
        assertEq(vesting.start(), LAUNCH + 365 days);
        assertEq(vesting.duration(), 1_095 days);
        assertEq(vesting.vestedAmount(address(token), LAUNCH), 0);
        assertEq(vesting.vestedAmount(address(token), LAUNCH + 365 days - 1), 0);
        assertEq(vesting.vestedAmount(address(token), LAUNCH + 365 days + 1_095 days / 2), TEAM_ALLOCATION / 2);
        assertEq(vesting.vestedAmount(address(token), LAUNCH + 365 days + 1_095 days), TEAM_ALLOCATION);
    }

    function test_ReleaseOnlyVestedAmount() external {
        vm.warp(LAUNCH + 365 days + 1_095 days / 2);
        vesting.release(address(token));
        assertEq(token.balanceOf(teamSafe), TEAM_ALLOCATION / 2);
        assertEq(token.balanceOf(address(vesting)), TEAM_ALLOCATION / 2);

        vm.warp(LAUNCH + 365 days + 1_095 days);
        vesting.release(address(token));
        assertEq(token.balanceOf(teamSafe), TEAM_ALLOCATION);
        assertEq(token.balanceOf(address(vesting)), 0);
    }

    function test_RevertsForInvalidInputs() external {
        vm.expectRevert(abi.encodeWithSignature("OwnableInvalidOwner(address)", address(0)));
        new XQNTTeamVesting(address(0), LAUNCH);

        vm.expectRevert(XQNTTeamVesting.InvalidLaunchTimestamp.selector);
        new XQNTTeamVesting(teamSafe, 0);
    }
}
