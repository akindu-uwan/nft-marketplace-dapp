'use client'

import { motion } from "framer-motion";
import Button from "./ui/Button";
import { Flame, ChevronRight, Play } from "lucide-react";
import NFTCard from "./NFTCard";
import Stat from "./Stat";
import { UserContext } from "@/app/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Contract } from "ethers";

export default function HeroSection() {

  const web3 = useContext(UserContext);
  const [listings, setListings] = useState<string | null>(null);

  useEffect(() => {
    if (!web3?.contract) return;

    const fetchListings = async () => {
      try {
        const data = await web3.contract.getListings(0, 4);
        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };

    fetchListings();
  }, [web3]);


  return (
    <section className="mx-auto max-w-7xl px-6 pt-6 pb-10">
      <div className="grid items-center gap-10 md:grid-cols-2">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TrendingBadge />
          <MainHeading />
          <Description />
          <ActionButtons />
          <StatsGrid />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/50 p-4 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <NFTCard seed={1} title="Spectrum Bloom #047" price="0.82 ETH" user="@luna" />
              <NFTCard seed={2} title="Circuit Dreams #311" price="2.10 ETH" user="@ryu" />
              <NFTCard seed={3} title="Void Runner #992" price="0.33 ETH" user="@sol" />
              <NFTCard seed={4} title="Glitch Muse #204" price="1.75 ETH" user="@nova" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const TrendingBadge = () => (
  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300">
    <Flame className="h-3.5 w-3.5" /> Trending now: <span className="text-zinc-100">Chromatic Realms</span>
  </div>
);

const MainHeading = () => (
  <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
    Discover, collect & sell
    <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent"> digital art</span>
  </h1>
);

const Description = () => (
  <p className="mt-4 max-w-xl text-zinc-400">
    A premium NFT marketplace with low fees, verified collections, and lightning-fast trades. Built for creators and collectors.
  </p>
);

const ActionButtons = () => (
  <div className="mt-6 flex flex-wrap items-center gap-3">
    <Button size="lg" className="rounded-2xl px-6">
      Explore marketplace <ChevronRight className="ml-1 h-4 w-4" />
    </Button>
    <Button size="lg" variant="outline" className="rounded-2xl">
      <Play className="mr-2 h-4 w-4" /> Watch demo
    </Button>
  </div>
);

const StatsGrid = () => (
  <div className="mt-8 grid grid-cols-3 gap-6">
    <Stat label="Active users" value="128k+" />
    <Stat label="Total volume" value="$84M" />
    <Stat label="Collections" value="9.7k" />
  </div>
);
