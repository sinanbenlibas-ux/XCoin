// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

library LaunchConstants {
    uint256 internal constant TOTAL_SUPPLY = 1_000_000_000 ether;
    uint256 internal constant COMMUNITY_ALLOCATION = 400_000_000 ether;
    uint256 internal constant LIQUIDITY_ALLOCATION = 200_000_000 ether;
    uint256 internal constant TREASURY_ALLOCATION = 200_000_000 ether;
    uint256 internal constant TEAM_ALLOCATION = 150_000_000 ether;
    uint256 internal constant RESERVE_ALLOCATION = 50_000_000 ether;
    uint256 internal constant INITIAL_POOL_XQNT = 100_000_000 ether;
    uint256 internal constant INITIAL_POOL_USDC = 1_000 * 1e6;

    uint24 internal constant POOL_FEE = 3_000;
    int24 internal constant TICK_LOWER = -887_220;
    int24 internal constant TICK_UPPER = 887_220;

    address internal constant BASE_USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    address internal constant BASE_UNISWAP_V3_FACTORY = 0x33128a8fC17869897dcE68Ed026d694621f6FDfD;
    address internal constant BASE_POSITION_MANAGER = 0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1;
}
