// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {Script, console2} from "forge-std/Script.sol";
import {MockUSDC} from "../src/mocks/MockUSDC.sol";

contract DeployMockUSDC is Script {
    function run() external returns (MockUSDC mock) {
        require(block.chainid == 84532 || block.chainid == 31337, "mock is testnet-only");
        address liquiditySafe = vm.envAddress("LIQUIDITY_SAFE");

        vm.startBroadcast();
        mock = new MockUSDC(liquiditySafe, 10_000 * 1e6);
        vm.stopBroadcast();

        console2.log("Mock USDC:", address(mock));
        console2.log("Recipient:", liquiditySafe);
    }
}
