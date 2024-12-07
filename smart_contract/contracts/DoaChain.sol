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
    }

    function donate(bytes32 campaignId) public payable {
        checkActiveCampaign(campaignId);
        require(campaigns[campaignId].active == true, "Campaign is no longer active");
        require(msg.value > 0, "Your donation must be greater than zero");

        campaigns[campaignId].totalRaised += msg.value;

        campaignDonors[campaignId].push(msg.sender);
        refundBalances[campaignId][msg.sender] += msg.value;
    }

    function returnDonation(bytes32 campaignId) public isTheCreator {
        checkActiveCampaign(campaignId);
        Campaign memory campaign = campaigns[campaignId];

        require(block.timestamp > campaign.endDate, "Campaign in progress");
        require(campaign.goalBalance < campaign.totalRaised, "The campaign reached its goal");

        for (uint i = 0; i < campaignDonors[campaignId].length; i++) {
            address donorAddress = campaignDonors[campaignId][i];
            if (!refundedDonors[campaignId][donorAddress]) {
                refundedDonors[campaignId][donorAddress] = true;
                refundBalances[campaignId][donorAddress] += campaigns[campaignId].totalRaised;
            }
        }
    }

    function withdrawDonation(bytes32 campaignId) public {
        uint256 refundAmount = refundBalances[campaignId][msg.sender];
        require(refundAmount > 0, "You have no funds to withdraw");

        refundBalances[campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(refundAmount);
    }

    function withdrawCampaignFunds(bytes32 campaignId) public canWithdraw(campaignId) {
        require(campaigns[campaignId].active == true, "Campaign is no longer active");

        campaigns[campaignId].active = false;
        uint256 raisedCampaign = campaigns[campaignId].totalRaised - campaignFee;

        campaigns[campaignId].goalBalance = 0;
        campaigns[campaignId].totalRaised = 0;

        payable(campaigns[campaignId].authorWallet).transfer(raisedCampaign);
        theCreator.transfer(campaignFee);
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
}
