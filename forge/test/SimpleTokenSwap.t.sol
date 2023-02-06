// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SimpleTokenSwap.sol";
import { IWETH, IERC20 } from "../src/SimpleTokenSwap.sol";

contract SimpleTokenSwapTest is Test {
    SimpleTokenSwap public swapper;
    IWETH weth = IWETH(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    IERC20 dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    address exchangeProxy = 0xDef1C0ded9bec7F1a1670819833240f027b25EfF;
    
    function setUp() public {
        swapper = new SimpleTokenSwap(weth, payable(exchangeProxy));
    }

    function testFillQuote() public {
        // add weth to sender
        deal(address(weth), address(this), type(uint256).max);
        
        // try filling quote
        uint256 wethBalBefore = weth.balanceOf(address(this));
        uint256 daiBalBefore = dai.balanceOf(address(this));
        bytes memory data = "0xd9627aa400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000005723cebfe858b6615000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000000000000000009ceb4a77f963e11ba6";
        swapper.fillQuote(weth, dai, exchangeProxy, payable(exchangeProxy), data);
        uint256 wethBalAfter = weth.balanceOf(address(this));
        uint256 daiBalAfter = dai.balanceOf(address(this));
        assertEq(wethBalBefore, wethBalAfter - 1e18);
        assertEq(daiBalAfter, daiBalBefore + 1e18);
    }
}
