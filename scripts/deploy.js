const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CreditSystem = await hre.ethers.getContractFactory("CreditSystem");
  const creditSystem = await CreditSystem.deploy();

  await creditSystem.deployed();

  console.log("CreditSystem deployed to:", creditSystem.address);

  const provider = hre.ethers.getDefaultProvider();
  const { chainId } = await provider.getNetwork();

  console.log("Front-end configuration:");
  console.log(`REACT_APP_CONTRACT_ADDRESS=${creditSystem.address}`);
  console.log(`REACT_APP_CHAIN_ID=${chainId}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });








// const hre = require("hardhat");

// async function main() {
//   // Retrieve the contract factory and signers from the Hardhat environment
//   const CreditSystem = await hre.ethers.getContractFactory("CreditSystem");
//   const [deployer] = await hre.ethers.getSigners();

//   // Deploy the contract
//   console.log("Deploying CreditSystem...");
//   const creditSystem = await CreditSystem.deploy();
//   await creditSystem.deployed();

//   // Print contract address and deployer address
//   console.log("CreditSystem deployed to:", creditSystem.address);
//   console.log("Deployed by:", deployer.address);

//   // Perform additional actions if needed, e.g., minting initial credits
//   if (hre.network.name === "hardhat") {
//     // Mint some initial credits
//     await creditSystem.mint(deployer.address, 1000);
//     console.log("Minted 1000 credits to the deployer.");
//   }
// }

// // Run the deployment
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
