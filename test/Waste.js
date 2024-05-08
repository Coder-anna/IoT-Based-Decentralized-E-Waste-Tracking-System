const { expect } = require("chai");

describe("WasteManagementSystem", function () {
  let WasteManagementSystem;
  let wasteManagementSystem;
  let registrationContract;
  let wasteHandlerContract;
  let bidHandlerContract;
  let destructionManagerContract;

  beforeEach(async function () {
    WasteManagementSystem = await ethers.getContractFactory("WasteManagementSystem");
    registrationContract = await ethers.getContractFactory("Registration").deploy();
    wasteHandlerContract = await ethers.getContractFactory("WasteHandler").deploy();
    bidHandlerContract = await ethers.getContractFactory("BidHandler").deploy();
    destructionManagerContract = await ethers.getContractFactory("DataDestructionManager").deploy();

    await registrationContract.deployed();
    await wasteHandlerContract.deployed();
    await bidHandlerContract.deployed();
    await destructionManagerContract.deployed();

    wasteManagementSystem = await WasteManagementSystem.deploy(
      registrationContract.address,
      wasteHandlerContract.address,
      bidHandlerContract.address,
      destructionManagerContract.address
    );

    await wasteManagementSystem.deployed();
  });

  it("Should register a user", async function () {
    await wasteManagementSystem.registerUser();
    const isRegistered = await registrationContract.registeredUsers(userAddress);
    expect(isRegistered).to.be.true;
  });

  it("Should add waste", async function () {
    const description = "Old smartphone";
    const weight = 100; // grams
    await wasteManagementSystem.addWaste(description, weight);
    const wasteCount = await wasteHandlerContract.wasteCount();
    expect(wasteCount).to.equal(1);
  });

  it("Should place a bid", async function () {
    const amount = 100; // wei
    await wasteManagementSystem.placeBid(amount);
    const bidCount = await bidHandlerContract.bidCount();
    expect(bidCount).to.equal(1);
  });

  it("Should request data destruction", async function () {
    await wasteManagementSystem.requestDestruction();
    const destructionRequestCount = await destructionManagerContract.destructionRequestCount();
    expect(destructionRequestCount).to.equal(1);
  });
});
