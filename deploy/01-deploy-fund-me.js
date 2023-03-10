//import

//main function

//calling of main function

// function deployFunc() {
//     console.log("hi")
// }

const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const {network} = require("hardhat")

// module.exports.default = deployFunc // same as below
module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.names)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }


    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    //if contract doesn't exist, we deploy a minimal version of it
    //when going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put price feed address
        logs: true,
    })
    log("--------------------------------------")

}

module.exports.tags = ["all", "fundme"]