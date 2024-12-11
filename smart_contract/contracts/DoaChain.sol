// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;

struct Campaign {
    bytes32 id;
    string authorName;
    address authorWallet;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 goalBalance;
    uint256 totalRaised;
    uint startDate;
    uint endDate;
    bool active;
}

contract DoaChain {
    uint256 public campaignFee = 15000000000000000; // 0.015 ETH

    mapping(bytes32 => Campaign) public campaigns;
    mapping(bytes32 => address[]) private campaignDonors;
    mapping(bytes32 => mapping(address => uint256)) private refundBalances;
    mapping(bytes32 => mapping(address => bool)) private refundedDonors;
    bytes32[] public campaignIds;

    address payable theCreator;

    event CampaignCreatedEvent(bytes32 indexed id, string title, address authorWallet, uint timestamp);
    event DonationMadeEvent(bytes32 indexed campaignId, uint256 amount, address donor, address authorWallet, uint timestamp);
    event FundsWithdrawnEvent(bytes32 indexed campaignId, address authorWallet, uint256 amount, uint timestamp);
    event RefundIssuedEvent(bytes32 indexed campaignId, address donor, uint256 amount, uint timestamp);

    modifier isTheCreator() {
        require(msg.sender == theCreator, "You are not allowed");
        _;
    }

    modifier canWithdraw(bytes32 campaignId) {
        Campaign memory campaign = campaigns[campaignId];
        require(campaign.authorWallet == msg.sender, "You are not allowed to withdraw");
        require(campaign.totalRaised >= campaign.goalBalance, "You have no balance");
        require(campaign.totalRaised >= campaign.goalBalance + campaignFee, "You don't have enough balance yet");
        require(address(this).balance >= campaign.totalRaised, "ERROR");
        _;
    }

    modifier createCampaignValidate(
        string calldata authorName, 
        string calldata title, 
        string calldata description, 
        string calldata videoUrl, 
        string calldata imageUrl, 
        uint256 goalBalance, 
        uint endDate
    ) {
        require(bytes(authorName).length >= 3, "Author Name must be longer than three characters");
        require(bytes(title).length >= 10, "Title must be longer than ten characters");
        require(bytes(description).length >= 50, "Description must be longer than three characters");
        require(goalBalance > 0, "Goal must be greater than zero");
        require(endDate > 0, "Campaign end date must be greater than zero");
        require(block.timestamp + (endDate * 1 days) > block.timestamp, "Campaign end date must be later than current date");
        _;
    }

    constructor() {
        theCreator = payable(msg.sender);
    }

    function generateCampaignId() private view returns (bytes32) {
        return keccak256(abi.encodePacked(block.timestamp, block.number, msg.sender));
    }

    function createCampaign(
        string calldata authorName,
        string calldata title,
        string calldata description,
        string calldata videoUrl,
        string calldata imageUrl,
        uint256 goalBalance,
        uint endDate
    ) public createCampaignValidate(authorName, title, description, videoUrl, imageUrl, goalBalance, endDate) {
        bytes32 idCampaign = generateCampaignId();
        
        Campaign memory newCampaign = Campaign({
            id: idCampaign,
            authorName: authorName,
            authorWallet: msg.sender,
            title: title,
            description: description,
            videoUrl: videoUrl,
            imageUrl: imageUrl,
            startDate: block.timestamp,
            endDate: block.timestamp + (endDate * 1 days),
            goalBalance: goalBalance,
            totalRaised: 0,
            active: true
        });

        campaigns[idCampaign] = newCampaign;
        campaignIds.push(idCampaign);

        emit CampaignCreatedEvent(idCampaign, title, msg.sender, block.timestamp);
    }

    function donate(bytes32 campaignId) public payable {
        checkActiveCampaign(campaignId);
        require(campaigns[campaignId].active == true, "Campaign is no longer active");
        require(msg.value > 0, "Your donation must be greater than zero");

        campaigns[campaignId].totalRaised += msg.value;

        campaignDonors[campaignId].push(msg.sender);
        refundBalances[campaignId][msg.sender] += msg.value;

        emit DonationMadeEvent(campaignId, msg.value, msg.sender, campaigns[campaignId].authorWallet, block.timestamp);
    }

    function withdrawDonation(bytes32 campaignId) public {
        uint256 refundAmount = refundBalances[campaignId][msg.sender];
        
        require(refundAmount > 0, "You have no funds to withdraw");

        Campaign storage campaign = campaigns[campaignId];
        
        require(!refundedDonors[campaignId][msg.sender], "You have already withdrawn your funds");

        refundedDonors[campaignId][msg.sender] = true;
        
        refundBalances[campaignId][msg.sender] = 0;
        
        campaign.totalRaised -= refundAmount;

        (bool success, ) = msg.sender.call{value: refundAmount}("");
        require(success, "Transfer failed");

        emit RefundIssuedEvent(campaignId, msg.sender, refundAmount, block.timestamp);
    }

    function withdrawCampaignFunds(bytes32 campaignId) public canWithdraw(campaignId) {
        require(campaigns[campaignId].active == true, "Campaign is no longer active");

        campaigns[campaignId].active = false;
        uint256 raisedCampaign = campaigns[campaignId].totalRaised - campaignFee;

        campaigns[campaignId].goalBalance = 0;
        campaigns[campaignId].totalRaised = 0;

        payable(campaigns[campaignId].authorWallet).transfer(raisedCampaign);
        theCreator.transfer(campaignFee);
        emit FundsWithdrawnEvent(campaignId, msg.sender, raisedCampaign, block.timestamp);
    }

    function checkActiveCampaign(bytes32 id) private {
        require(campaigns[id].startDate != 0);
        if (campaigns[id].active && campaigns[id].endDate <= block.timestamp) {
            campaigns[id].active = false;
        }
    }

    function getCampaign(bytes32 id) public view returns (Campaign memory) {
        return campaigns[id];
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignIds.length);
        for (uint256 i = 0; i < campaignIds.length; i++) {
            allCampaigns[i] = campaigns[campaignIds[i]];
        }
        return allCampaigns;
    }

    function getLastCampaignIdByAuthor(address authorWallet) public view returns (bytes32) {
        Campaign memory campaignByAuthor;
        for (uint256 i = 0; i < campaignIds.length; i++) {
            if (campaigns[campaignIds[i]].authorWallet == authorWallet){
                campaignByAuthor = campaigns[campaignIds[i]];
            }
        }
        return campaignByAuthor.id;
    }
}
