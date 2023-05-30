You have to install node module in main directory and into frontend folder using 'npm install'.
You have compile solidity file using 'npx hardhat compile'.
You have deploy the contract using 'npx hardhat run scripts/deploy.js --network <Network>' where you can add your metamask wallet network where you want deploy your contract.
You have to save that deployed address into 'CreditSystemInterface.js'.
You have to change ALCHEMY_key and PRIVATE_Key into 'hardhat.config.js' file.
You have to run code 'npm start' into frontend folder for run frontend.
