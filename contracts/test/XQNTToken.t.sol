// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {Test} from "forge-std/Test.sol";
import {XQNTToken} from "../src/XQNTToken.sol";

contract XQNTTokenTest is Test {
    address internal distributionSafe = makeAddr("distribution-safe");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");
    XQNTToken internal token;

    function setUp() external {
        token = new XQNTToken(distributionSafe);
    }

    function test_MetadataAndFixedSupply() external view {
        assertEq(token.name(), "XQNT Coin");
        assertEq(token.symbol(), "XQNT");
        assertEq(token.decimals(), 18);
        assertEq(token.totalSupply(), 1_000_000_000 ether);
        assertEq(token.balanceOf(distributionSafe), token.totalSupply());
    }

    function test_RevertsForZeroDistributionSafe() external {
        vm.expectRevert(XQNTToken.InvalidDistributionSafe.selector);
        new XQNTToken(address(0));
    }

    function test_TransferAndAllowance() external {
        vm.prank(distributionSafe);
        token.transfer(alice, 10 ether);
        assertEq(token.balanceOf(alice), 10 ether);

        vm.prank(alice);
        token.approve(bob, 4 ether);
        vm.prank(bob);
        token.transferFrom(alice, bob, 4 ether);

        assertEq(token.balanceOf(alice), 6 ether);
        assertEq(token.balanceOf(bob), 4 ether);
        assertEq(token.allowance(alice, bob), 0);
        assertEq(token.totalSupply(), 1_000_000_000 ether);
    }

    function test_NoAdministrativeEntryPoints() external view {
        bytes4[] memory forbidden = new bytes4[](8);
        forbidden[0] = bytes4(keccak256("mint(address,uint256)"));
        forbidden[1] = bytes4(keccak256("pause()"));
        forbidden[2] = bytes4(keccak256("unpause()"));
        forbidden[3] = bytes4(keccak256("blacklist(address)"));
        forbidden[4] = bytes4(keccak256("owner()"));
        forbidden[5] = bytes4(keccak256("upgradeToAndCall(address,bytes)"));
        forbidden[6] = bytes4(keccak256("permit(address,address,uint256,uint256,uint8,bytes32,bytes32)"));
        forbidden[7] = bytes4(keccak256("setFee(uint256)"));

        for (uint256 i; i < forbidden.length; ++i) {
            (bool ok,) = address(token).staticcall(abi.encodeWithSelector(forbidden[i]));
            assertFalse(ok, "forbidden selector unexpectedly callable");
        }
    }

    function testFuzz_TransfersNeverChangeSupply(address recipient, uint256 amount) external {
        vm.assume(recipient != address(0));
        amount = bound(amount, 0, token.totalSupply());
        vm.prank(distributionSafe);
        token.transfer(recipient, amount);
        assertEq(token.totalSupply(), 1_000_000_000 ether);
    }
}
