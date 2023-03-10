require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-mainnet.g.alchemy.com/v2/2DGiplmsHcMRwrOR4GC1ooOF_QjEHXvG"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "12c7e3648ffe7884677ce2d519045a448d21cde8de91767dfefb62bca292dc74"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //solidity: "0.8.18",
  solidity: {
    compilers:[
      {version: "0.8.18"},
      {version: "0.6.6"}

    ]
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        goerli: {
          url: GOERLI_RPC_URL,
          accounts: [PRIVATE_KEY],
          chainId: 5,
          blockConfirmations: 6,
      },
    },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
  },
  }
};
