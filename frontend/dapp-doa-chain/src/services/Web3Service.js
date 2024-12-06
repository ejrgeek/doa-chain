import Web3 from "web3";
import contractAbi from "./DoaChainABI.json";


const CONTRACT_ADDRESS = "0x9fa6e40c08d66342366047b6299fe9ba4b04a6b3";

export async function login() {
    if (typeof window === "undefined") throw new Error("Metamask plugin not available in server environment");

    if(!window.ethereum) throw new Error("Metamask plugin not found");

    const web3 = new Web3(window.ethereum);
    /* const web3 = new Web3("http://127.0.0.1:8545"); */

    const accounts = await web3.eth.requestAccounts();

    if(accounts.length === 0) throw new Error("No account found or not allowed to connect");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];

}

function getContract(){
    const web3 = new Web3(window.ethereum);
    /* const web3 = new Web3("http://127.0.0.1:8545"); */

    const from = localStorage.getItem("wallet");

    return new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS, {from})

}

export function createCampaign(campaign){
    const contract = getContract();
    return contract.methods.createCampaign(campaign.authorName, campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl, campaign.goalBalance, campaign.endDate).send();
}

export function getLastCampaignByAuthor(){
    const contract = getContract();

    const from = localStorage.getItem("wallet");

    return contract.methods.getLastCampaignIdByAuthor(from).call();
}

export function getCampaignById(campaignId){
    if (!campaignId) throw new Error("Campaign ID is required");
    const contract = getContract();

    return contract.methods.campaigns(campaignId).call();
}

export function donate(campaignId, donateValue){
    if (!campaignId) throw new Error("Campaign ID is required");
    
    if (!donateValue || isNaN(donateValue) || Number(donateValue) <= 0) {
        throw new Error("Donation value must be greater than zero");
    }
    
    const valueInWei = Web3.utils.toWei(donateValue.toString(), "ether");
    console.log(typeof Number(valueInWei), Number(valueInWei));
    
    const contract = getContract();
    
    const result = contract.methods.donate(campaignId).send({ value: Number(valueInWei) });

    return result;
}