'use client'

import { Card, CardHeader, CardContent, CardTitle } from "./ui/Card";
import { motion } from "framer-motion";
import { Flame, Shield, Sparkles } from "lucide-react";



const FeaturesSection = () => (
  <section className="mx-auto max-w-7xl px-6 pb-6">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid gap-4 md:grid-cols-3"
    >
      <Card className="border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Shield className="h-5 w-5 text-cyan-400" /> 
            Verified & Secure
          </CardTitle>
        </CardHeader>
        <CardContent className="text-zinc-400">
          Multi-sig escrow, collection verification, and fraud detection to protect your trades.
        </CardContent>
      </Card>
      
      <Card className="border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Sparkles className="h-5 w-5 text-purple-400" /> 
            Creator-first Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="text-zinc-400">
          Mint in minutes, manage drops, and reward your community with on-chain perks.
        </CardContent>
      </Card>
      
      <Card className="border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Flame className="h-5 w-5 text-pink-400" /> 
            Low Fees, High Speed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-zinc-400">
          Optimized for L2 networks with gas-friendly contracts and instant indexing.
        </CardContent>
      </Card>
    </motion.div>
  </section>
);
export default FeaturesSection;