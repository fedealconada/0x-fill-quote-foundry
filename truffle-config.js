const HDWalletProvider = require('@truffle/hdwallet-provider');
const { MNEMONIC, RPC_URL } = require('process').env;

module.exports = {
    /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */

    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            network_id: '*',
            weth: '0x0000000000000000000000000000000000000000',
            exchange_proxy: '0x0000000000000000000000000000000000000000',
        },
        'forked-mainnet': {
            host: 'localhost',
            port: 7545,
            network_id: '1',
            skipDryRun: true,
            weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            exchange_proxy: "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
        },
        mainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, RPC_URL),
            network_id: '1',
            weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            exchange_proxy: "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
        },
        goerli: {
            provider: () => new HDWalletProvider(MNEMONIC, RPC_URL),
            network_id: 5,
            weth: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
            exchange_proxy: "0xf91bb752490473b8342a3e964e855b9f9a2a668e",
        },
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: '0.8.4',
        },
    },
};
