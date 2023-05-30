/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "kELW2_7Gkt06xYebgKiN0JxRqmJ2RuYH";
const GOERLI_PRIVATE_KEY = "caabd8d4d251c20cc30e270b89a49e223d945edf455da4d79e097c73eb7053b7";

module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`]
    },
    // Example network configuration (change as per your requirement)
    // hardhat: {
    //   chainId: 1337
    // }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};

// Deploying contracts with the account: 0x6E023de613138F88ccdA43518EE56B7eeABd5470
