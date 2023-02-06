// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/SimpleTokenSwap.sol";
import { IWETH, IERC20 } from "../contracts/SimpleTokenSwap.sol";

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

        // data is taken from 0x API quote
        bytes memory data = "0x6af479b20000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000008d81961eeaa295c1c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f46b175474e89094c44da98b954eedeac495271d0f000000000000000000000000000000000000000000869584cd0000000000000000000000001000000000000000000000000000000000000011000000000000000000000000000000000000000000000033c4e1d12b63e1275b";
        swapper.fillQuote(weth, dai, exchangeProxy, payable(exchangeProxy), data);
        
        uint256 wethBalAfter = weth.balanceOf(address(this));
        uint256 daiBalAfter = dai.balanceOf(address(this));
        
        assertEq(wethBalBefore, wethBalAfter - 1e18);
        assertEq(daiBalAfter, daiBalBefore + 1e18); // should fail since it should be + amount of dai bought
    }
}
