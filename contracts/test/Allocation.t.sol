// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {Test} from "forge-std/Test.sol";
import {XQNTToken} from "../src/XQNTToken.sol";
import {XQNTTeamVesting} from "../src/XQNTTeamVesting.sol";
import {LaunchConstants} from "../src/LaunchConstants.sol";

contract AllocationTest is Test {
    function test_AllocationTotalsAndPublicLiquidity() external {
        address distributionSafe = makeAddr("distribution");
        address communitySafe = makeAddr("community");
        address liquiditySafe = makeAddr("liquidity");
        address treasurySafe = makeAddr("treasury");
        address teamSafe = makeAddr("team");
        address reserveSafe = makeAddr("reserve");

        XQNTToken token = new XQNTToken(distributionSafe);
        XQNTTeamVesting vesting = new XQNTTeamVesting(teamSafe, uint64(block.timestamp));

        vm.startPrank(distributionSafe);
        token.transfer(communitySafe, LaunchConstants.COMMUNITY_ALLOCATION);
        token.transfer(liquiditySafe, LaunchConstants.LIQUIDITY_ALLOCATION);
        token.transfer(treasurySafe, LaunchConstants.TREASURY_ALLOCATION);
        token.transfer(address(vesting), LaunchConstants.TEAM_ALLOCATION);
        token.transfer(reserveSafe, LaunchConstants.RESERVE_ALLOCATION);
        vm.stopPrank();

        assertEq(token.balanceOf(distributionSafe), 0);
        assertEq(token.balanceOf(communitySafe), 400_000_000 ether);
        assertEq(token.balanceOf(liquiditySafe), 200_000_000 ether);
        assertEq(token.balanceOf(treasurySafe), 200_000_000 ether);
        assertEq(token.balanceOf(address(vesting)), 150_000_000 ether);
        assertEq(token.balanceOf(reserveSafe), 50_000_000 ether);
        assertEq(token.totalSupply(), LaunchConstants.TOTAL_SUPPLY);
        assertEq(LaunchConstants.INITIAL_POOL_XQNT, 100_000_000 ether);
    }

    function test_BaseLaunchConstants() external pure {
        assertEq(LaunchConstants.BASE_USDC, 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913);
        assertEq(LaunchConstants.BASE_UNISWAP_V3_FACTORY, 0x33128a8fC17869897dcE68Ed026d694621f6FDfD);
        assertEq(LaunchConstants.BASE_POSITION_MANAGER, 0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1);
        assertEq(LaunchConstants.POOL_FEE, 3_000);
        assertEq(LaunchConstants.TICK_LOWER, -887_220);
        assertEq(LaunchConstants.TICK_UPPER, 887_220);
        assertEq(LaunchConstants.INITIAL_POOL_USDC, 1_000e6);
    }
}
