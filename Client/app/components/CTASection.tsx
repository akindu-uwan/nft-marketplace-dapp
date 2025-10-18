'use client'

import { motion } from "framer-motion";
import Button from "./ui/Button";

const CTASection = () => (
  <section className="mx-auto max-w-7xl px-6 pb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 md:p-12">
        {/* Background Glow Effect */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{
          background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18), rgba(167,139,250,0.14), rgba(244,114,182,0.12) 70%)"
        }}/>
        
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">Join Echelon today</h3>
            <p className="mt-2 text-zinc-400">
              Start collecting rare digital art, follow your favorite creators, and earn rewards for participating.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Button size="lg" className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
              Create an account
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl text-zinc-200 border-zinc-700 hover:bg-zinc-800">
              Connect wallet
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default CTASection;