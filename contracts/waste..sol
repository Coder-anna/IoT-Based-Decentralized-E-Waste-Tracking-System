// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Registration {
    mapping(address => bool) public registeredUsers;
    mapping(address => uint256) public reputation;

    event UserRegistered(address indexed user);

    function registerUser() external {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
        reputation[msg.sender] = 100; // Initialize reputation
        emit UserRegistered(msg.sender);
    }

    function updateReputation(address _user, uint256 _reputationChange) external {
        require(registeredUsers[msg.sender], "Caller must be a registered user");
        reputation[_user] += _reputationChange;
    }
}

contract WasteHandler {
    struct Waste {
        address sender;
        string description;
        uint256 weight;
        uint256 timestamp;
    }

    mapping(uint256 => Waste) public wastes;
    uint256 public wasteCount;

    event WasteAdded(uint256 indexed wasteId, address indexed sender, string description, uint256 weight);

    function addWaste(string memory _description, uint256 _weight) external {
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_weight > 0, "Weight must be greater than zero");
        wasteCount++;
        wastes[wasteCount] = Waste(msg.sender, _description, _weight, block.timestamp);
        emit WasteAdded(wasteCount, msg.sender, _description, _weight);
    }
}

contract BidHandler {
    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Bid) public bids;
    uint256 public bidCount;

    event BidPlaced(uint256 indexed bidId, address indexed bidder, uint256 amount);

    function placeBid(uint256 _amount) external {
        require(_amount > 0, "Bid amount must be greater than zero");
        bidCount++;
        bids[bidCount] = Bid(msg.sender, _amount, block.timestamp);
        emit BidPlaced(bidCount, msg.sender, _amount);
    }
}

contract DataDestructionManager {
    struct DataDestruction {
        address requester;
        uint256 timestamp;
    }

    mapping(uint256 => DataDestruction) public destructionRequests;
    uint256 public destructionRequestCount;

    event DestructionRequested(uint256 indexed requestId, address indexed requester);

    function requestDestruction() external {
        destructionRequestCount++;
        destructionRequests[destructionRequestCount] = DataDestruction(msg.sender, block.timestamp);
        emit DestructionRequested(destructionRequestCount, msg.sender);
    }
}

contract WasteManagementSystem {
    Registration public registrationContract;
    WasteHandler public wasteHandlerContract;
    BidHandler public bidHandlerContract;
    DataDestructionManager public destructionManagerContract;

    constructor(
        address _registrationAddress,
        address _wasteHandlerAddress,
        address _bidHandlerAddress,
        address _destructionManagerAddress
    ) {
        registrationContract = Registration(_registrationAddress);
        wasteHandlerContract = WasteHandler(_wasteHandlerAddress);
        bidHandlerContract = BidHandler(_bidHandlerAddress);
        destructionManagerContract = DataDestructionManager(_destructionManagerAddress);
    }

    // Registration functions
    function registerUser() external {
        registrationContract.registerUser();
    }

    // Waste handling functions
    function addWaste(string memory _description, uint256 _weight) external {
        wasteHandlerContract.addWaste(_description, _weight);
    }

    // Bid handling functions
    function placeBid(uint256 _amount) external {
        bidHandlerContract.placeBid(_amount);
    }

    // Data destruction functions
    function requestDestruction() external {
        destructionManagerContract.requestDestruction();
    }
}
