// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {Test} from "forge-std/Test.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {LaunchConstants} from "../src/LaunchConstants.sol";

contract InfrastructureForkTest is Test {
    address internal constant BASE_SEPOLIA_FACTORY = 0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24;
    address internal constant BASE_SEPOLIA_POSITION_MANAGER = 0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2;

    function test_BaseOfficialInfrastructureWhenRpcConfigured() external {
        string memory rpc = vm.envOr("BASE_RPC_URL", string(""));
        if (bytes(rpc).length == 0) return;

        vm.createSelectFork(rpc);
        assertEq(block.chainid, 8453);
        assertEq(IERC20Metadata(LaunchConstants.BASE_USDC).decimals(), 6);
        assertGt(LaunchConstants.BASE_UNISWAP_V3_FACTORY.code.length, 0);
        assertGt(LaunchConstants.BASE_POSITION_MANAGER.code.length, 0);
    }

    function test_BaseSepoliaInfrastructureWhenRpcConfigured() external {
        string memory rpc = vm.envOr("BASE_SEPOLIA_RPC_URL", string(""));
        if (bytes(rpc).length == 0) return;

        vm.createSelectFork(rpc);
        assertEq(block.chainid, 84532);
        assertGt(BASE_SEPOLIA_FACTORY.code.length, 0);
        assertGt(BASE_SEPOLIA_POSITION_MANAGER.code.length, 0);
    }
}
