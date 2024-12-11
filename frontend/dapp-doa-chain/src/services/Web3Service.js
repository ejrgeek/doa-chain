import Web3 from "web3";
import contractAbi from "./DoaChainABI.json";


const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

if (!CONTRACT_ADDRESS) {
    console.error("Contract address not found. Please check your .env file.");
}

export async function login() {
    if (typeof window === "undefined") throw new Error("Metamask plugin not available in server environment");

    if (!window.ethereum) throw new Error("Metamask plugin not found");

    const web3 = new Web3(window.ethereum);
    /* const web3 = new Web3("http://127.0.0.1:8545"); */

    const accounts = await web3.eth.requestAccounts();

    if (accounts.length === 0) throw new Error("No account found or not allowed to connect");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];

}

function getContract() {
    const web3 = new Web3(window.ethereum);
    /* const web3 = new Web3("http://127.0.0.1:8545"); */

    const from = localStorage.getItem("wallet");

    return new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS, { from })

}

export async function createCampaign(campaign) {
    if (campaign.authorName.length < 3) {
        return "Author Name must be longer than three characters";
    }

    if (campaign.title.length < 10) {
        return "Title must be longer than ten characters";
    }

    if (campaign.description.length < 50) {
        return "Description must be longer than fifty characters";
    }



    if (parseFloat(campaign.goalBalance) <= 0) {
        return "Goal must be greater than zero";
    }

    if (parseInt(campaign.endDate) <= 0) {
        return "Campaign end date must be greater than zero";
    }

    const currentDate = Math.floor(Date.now() / 1000);
    const campaignEndDate = currentDate + (parseInt(campaign.endDate) * 86400);
    if (campaignEndDate <= currentDate) {
        return "Campaign end date must be later than current date";
    }

    const contract = getContract();
    const result = await contract.methods.createCampaign(campaign.authorName, campaign.title, campaign.description, campaign.videoUrl, campaign.image, campaign.goalBalance, campaign.endDate).send();
    return result;
}


export async function listenToCampaignCreatedEvent(callback) {
    const contract = getContract();

    contract.events.CampaignCreatedEvent({
        fromBlock: 'latest'
    })
        .on('data', event => {
            callback(event);
        });
}

export async function getLastCampaignByAuthor() {
    const contract = getContract();

    const from = localStorage.getItem("wallet");

    return await contract.methods.getLastCampaignIdByAuthor(from).call();
}

export async function getCampaignById(campaignId) {
    if (!campaignId) throw new Error("Campaign ID is required");
    const contract = getContract();

    return await contract.methods.campaigns(campaignId).call();
}

export async function donate(campaignId, donateValue) {
    if (!campaignId) throw new Error("Campaign ID is required");

    if (!donateValue || isNaN(donateValue) || Number(donateValue) <= 0) {
        throw new Error("Donation value must be greater than zero");
    }

    const valueInWei = Web3.utils.toWei(donateValue.toString(), "ether");

    const contract = getContract();

    const result = await contract.methods.donate(campaignId).send({ value: Number(valueInWei) });

    return result;
}

export async function listenToDonationMadeEvent(callback, campaignId) {
    const contract = getContract();

    contract.events.DonationMadeEvent({
        filter: { campaignId: campaignId },
        fromBlock: 0,
        toBlock: 'latest'
    })
        .on('data', (event) => {
            callback(event);
        });
}


export async function withdrawDonation(campaignId) {
    if (!campaignId) throw new Error("Campaign ID is required");

    const contract = getContract();

    const result = await contract.methods.withdrawDonation(campaignId).send();

    return result;
}

export async function listenToRefundIssuedEvent(callback, campaignId) {
    const contract = getContract();

    contract.events.RefundIssuedEvent({
        filter: { campaignId: campaignId },
        fromBlock: 0,
        toBlock: 'latest'
    })
        .on('data', event => {
            callback(event)
        });
}


export async function withdrawCampaignFunds(campaignId) {
    if (!campaignId) throw new Error("Campaign ID is required");

    const contract = getContract();

    const result = await contract.methods.withdrawCampaignFunds(campaignId).send();

    return result;
}

export async function listenToFundsWithdrawnEvent(callback, campaignId) {
    const contract = getContract();

    contract.events.FundsWithdrawnEvent({
        filter: { campaignId: campaignId },
        fromBlock: 'latest'
    })
        .on('data', event => {
            callback(event);
        });
}


export async function getAllCampaigns() {

    const contract = getContract();

    return await contract.methods.getCampaigns().call();

}
