import Web3 from "web3";

export async function login() {

    if(!window.ethereum) throw new Error("Metamask plugin not found");

    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.requestAccounts();

    if(accounts.length === 0) throw new Error("No account found or not allowed to connect");

    return accounts[0];

}