const hre = require("hardhat");

async function main() {
  // Deploy Registration contract
  let registrationContract = await hre.ethers.deployContract("Registration");
  await registrationContract.waitForDeployment();
  console.log("Registration Contract deployed to:", registrationContract.address);

  // Deploy WasteHandler contract
  let wasteHandlerContract = await hre.ethers.deployContract("WasteHandler");
  await wasteHandlerContract.waitForDeployment();
  console.log("WasteHandler Contract deployed to:", wasteHandlerContract.address);

  // Deploy BidHandler contract
  let bidHandlerContract = await hre.ethers.deployContract("BidHandler");
  await bidHandlerContract.waitForDeployment();
  console.log("BidHandler Contract deployed to:", bidHandlerContract.address);

  // Deploy DataDestructionManager contract
  let destructionManagerContract = await hre.ethers.deployContract("DataDestructionManager");
  await destructionManagerContract.waitForDeployment();
  console.log("DataDestructionManager Contract deployed to:", destructionManagerContract.address);

  // Deploy WasteManagementSystem contract
  // const WasteManagementSystem = await hre.ethers.getContractFactory("WasteManagementSystem");
  // const wasteManagementSystem = await WasteManagementSystem.deploy(
  //   registrationContract.address,
  //   wasteHandlerContract.address,
  //   bidHandlerContract.address,
  //   destructionManagerContract.address
  // );
  // await wasteManagementSystem.deployed();
  // console.log("WasteManagementSystem Contract deployed to:", wasteManagementSystem.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
