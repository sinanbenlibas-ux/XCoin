// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {StdInvariant, Test} from "forge-std/Test.sol";
import {XQNTToken} from "../src/XQNTToken.sol";

contract TransferHandler is Test {
    XQNTToken public immutable token;
    address[] internal actors;

    constructor(XQNTToken token_) {
        token = token_;
        actors.push(makeAddr("actor-0"));
        actors.push(makeAddr("actor-1"));
        actors.push(makeAddr("actor-2"));
    }

    function transfer(uint256 fromSeed, uint256 toSeed, uint256 amount) external {
        address from = actors[fromSeed % actors.length];
        address to = actors[toSeed % actors.length];
        if (to == address(0)) return;
        amount = bound(amount, 0, token.balanceOf(from));
        vm.prank(from);
        token.transfer(to, amount);
    }

    function actor(uint256 index) external view returns (address) {
        return actors[index];
    }
}

contract XQNTInvariantTest is StdInvariant, Test {
    XQNTToken internal token;
    TransferHandler internal handler;

    function setUp() external {
        token = new XQNTToken(address(this));
        handler = new TransferHandler(token);
        token.transfer(handler.actor(0), 400_000_000 ether);
        token.transfer(handler.actor(1), 350_000_000 ether);
        token.transfer(handler.actor(2), 250_000_000 ether);
        targetContract(address(handler));
    }

    function invariant_TotalSupplyNeverChanges() external view {
        assertEq(token.totalSupply(), 1_000_000_000 ether);
    }

    function invariant_ActorBalancesSumToSupply() external view {
        uint256 total =
            token.balanceOf(handler.actor(0)) + token.balanceOf(handler.actor(1)) + token.balanceOf(handler.actor(2));
        assertEq(total, token.totalSupply());
    }
}
