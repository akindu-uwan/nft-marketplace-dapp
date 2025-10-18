import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}


async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log("Connected with signer:", await signer.getAddress());
  }
}