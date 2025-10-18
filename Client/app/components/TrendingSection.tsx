'use client'

import Button from "./ui/Button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import NFTCard from "./NFTCard";


const TrendingSection = () => (
  <section id="explore" className="mx-auto max-w-7xl px-6 py-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Trending collections</h2>
          <p className="text-zinc-400">Hand-picked drops curated by our editors.</p>
        </div>
        <Button variant="ghost" className="text-zinc-400 hover:text-zinc-100">
          View all <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + (i * 0.05) }}
          >
            <NFTCard 
              seed={i + 10} 
              title={`Aurora Pulse #${i + 1}`} 
              price={`${(0.3 + i * 0.05).toFixed(2)} ETH`} 
              user="@artist" 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default TrendingSection;
