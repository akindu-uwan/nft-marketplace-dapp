'use client'

import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TrendingSection from "./components/TrendingSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import {nftMarketplaceABI} from "@/app/lib/nftMarketplaceABI";
import { connect } from "@/app/lib/connect";
import { UserContext } from "@/app/context/UserContext";

export default function Page() {

  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null | any>(null);
  const [signer, setSigner] = useState<string | null | any>(null);
  const [contract, setContract] = useState<string | null | any>(null);


  useEffect(() => {
    const template = async () => {
      const contractAbi: any = nftMarketplaceABI;
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

      const res = await connect();
      if (res?.address) setAddress(res.address);
      if (res?.provider) setProvider(res.provider);
      if (res?.address) setSigner(res.signer);

      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
      setContract(contract);

    }

    template();
  }, [])

  return (
    <div>
      <UserContext.Provider value={{address, provider, signer, contract}}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TrendingSection />
      <CTASection />
      <Footer />
      </UserContext.Provider>
    </div>
  );
}
