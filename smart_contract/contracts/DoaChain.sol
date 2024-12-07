// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;

struct Donor {
    bytes32 campaignId;
    address payable donorWallet;
    uint256 value;
    uint donateIn;
}

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
    uint256 public campaignFee = 15000000000000000; // wei

    mapping(bytes32 => Campaign) public campaigns;
    Donor[] public donors;
    bytes32[] public campaignIds;

    address payable theCreator;

    modifier isTheCreator(){
        require(msg.sender == theCreator, "You are not allowed");
        _;
    }

    modifier canWithdraw(bytes32 campaignId){
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
    ){
        require(bytes(authorName).length >= 3, "Author Name must be longer than three characters");
        require(bytes(title).length >= 10, "Title must be longer than ten characters");
        require(bytes(description).length >= 50, "Description must be longer than three characters");
        require(goalBalance > 0, "Goal must be greater than zero");
        require(endDate > 0, "Campaign end date must be greater than zero");
        require(block.timestamp + (endDate * 1 days) > block.timestamp, "Campaign end date must be later than current date");
        _;
    }

    constructor(){
        theCreator = payable(msg.sender);
    }

    function generateCampaignId() private view returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                block.timestamp,
                block.prevrandao,
                msg.sender
            )
        );
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
        require(msg.value > 0, "Your donation must be greater than zero");
        require(campaigns[campaignId].active == true, "Only active campaigns can receive donations");

        campaigns[campaignId].totalRaised  += msg.value;

        Donor memory donor = Donor({
            campaignId: campaignId,
            donorWallet: payable(msg.sender),
            value: msg.value,
            donateIn: block.timestamp
        });

        donors.push(donor);

    }
    
    function returnDonation(bytes32 campaignId) public isTheCreator {
        checkActiveCampaign(campaignId);
        Campaign memory campaign = campaigns[campaignId];

        require(block.timestamp > campaign.endDate, "Campaign in progress");
        require(campaign.goalBalance < campaign.totalRaised, "The campaign reached its goal");

        for (uint i = 0; i < donors.length; i++){
            donors[i].donorWallet.transfer(donors[i].value);
        }
                
    }


    function withdraw(bytes32 campaignId) public canWithdraw(campaignId) {

        checkActiveCampaign(campaignId);

        Campaign memory campaign = campaigns[campaignId];

        campaigns[campaignId].active = false;

        address payable recipient = payable(address(uint160(campaign.authorWallet)));

        uint256 raisedCampaign = campaign.totalRaised - campaignFee;

        recipient.transfer(raisedCampaign);
        theCreator.transfer(campaignFee);

    }

    function checkActiveCampaign(bytes32 id) private {      
        require(campaigns[id].startDate != 0);

        if (campaigns[id].active && campaigns[id].endDate <= block.timestamp){
            campaigns[id].active = false;
        }

    } 

    function getCampaign(bytes32 id) public view returns (Campaign memory){
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
