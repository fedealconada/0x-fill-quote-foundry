// libraries
import * as qs from 'qs';
import * as fetch from 'node-fetch';
import { Web3Wrapper } from '@0x/web3-wrapper';

// utils
import { baseUnitAmount, setUpWeb3 } from './utils';
import { marginTradingMigrationAsync } from '../migrations/migration';
import { ASSET_ADDRESSES } from './utils/addresses';

// wrappers
import { SimpleMarginTradingContract } from '../generated-wrappers/simple_margin_trading';

// constants
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL;
const MNEMONIC = process.env.MNEMONIC;

const openAsync = async (web3Wrapper: Web3Wrapper, contract: SimpleMarginTradingContract) => {
    // user address interacting with margin contract
    const userAddresses = await web3Wrapper.getAvailableAddressesAsync();
    const takerAddress = userAddresses[0];

    // 1. perform some calculations for the contract
    // TODO: calculations for leverage

    // 2. fetch a quote from 0x API
    // TODO: fetch quote from 0x API 

    // TODO: convert quote to the contract quote format 

    // 3. execute a smart contract call to open a margin position
    // TODO: interact with the margin trading contract
};

const closeAsync = async (web3Wrapper: Web3Wrapper, contract: SimpleMarginTradingContract) => {
    // user address interacting with margin contract
    const userAddresses = await web3Wrapper.getAvailableAddressesAsync();
    const takerAddress = userAddresses[0];

    // 1. get the amount of DAI to be repayed by contract when closing position
    // TODO: add snippet to callAsync the contract for dai borrow balance

    // 2. fetch 0x API quote to buy DAI for repayment
    // TODO: fetch quote from 0x API 

    // TODO: convert quote to the contract quote format ;

    // 3. calculate and provide an extra buffer of WETH to pay interest accrued.
    // TODO: calculate value

    // 4. execute a smart contract call to open a margin position
    // TODO: interact with the margin trading contract
};

((async () => {
    const { web3Wrapper, provider } = await setUpWeb3(MNEMONIC, ETHEREUM_RPC_URL);
    const { simpleMarginTradingAddress } = await marginTradingMigrationAsync(provider, web3Wrapper);

    const contract = new SimpleMarginTradingContract(simpleMarginTradingAddress, provider);
    
    // open a position
    await openAsync(web3Wrapper, contract);

    // immediately close the position
    await closeAsync(web3Wrapper, contract);
})())