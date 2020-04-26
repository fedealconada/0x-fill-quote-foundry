// libraries
import * as qs from 'qs';
import * as fetch from 'node-fetch';

// utils
import { baseUnitAmount, setUpWeb3GanacheAsync, fetchERC20BalanceFactory } from './utils';
import { simpleTokenSwapMigrationAsync } from '../migrations/migration';
import { ASSET_ADDRESSES } from './utils/addresses';

// wrappers
import { SimpleTokenSwapContract } from '../generated-wrappers/simple_token_swap';

// constants
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL;
const MNEMONIC = process.env.MNEMONIC;

(async () => {
    // initialize ganache fork and deploy contracts
    const { web3Wrapper, provider } = await setUpWeb3GanacheAsync(MNEMONIC, ETHEREUM_RPC_URL);
    const { simpleTokenSwapAddress } = await simpleTokenSwapMigrationAsync(provider, web3Wrapper);

    // handy util to check address balance of DAI
    const fetchDAIBalanceAsync = fetchERC20BalanceFactory(provider, ASSET_ADDRESSES.dai);

    // 1. call 0x api for a quote for one dollar of DAI.
    // TODO: fetch a quote from 0x API

    // 2. send response from 0x api to your smart contract
    // TODO: add web3 code to interact with a smart contract with 0x API response
})()