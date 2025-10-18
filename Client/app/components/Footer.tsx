'use client'

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";



const Footer = () => (
  <footer className="border-t border-zinc-900/80 bg-black/40">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400/30 via-indigo-400/20 to-pink-400/20 border border-zinc-800">
              <Sparkles className="h-4 w-4"/>
            </div>
            <span className="font-semibold">Echelon</span>
          </div>
          <p className="mt-3 text-sm text-zinc-400">
            Where creators and collectors meet. Built for speed, trust, and community.
          </p>
        </div>

        
        <div>
          <h4 className="mb-3 text-sm font-semibold text-zinc-200">Marketplace</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Explore</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Collections</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Creators</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="mb-3 text-sm font-semibold text-zinc-200">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="#" className="hover:text-zinc-200 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Blog</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="mb-3 text-sm font-semibold text-zinc-200">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Status</a></li>
            <li><a href="#" className="hover:text-zinc-200 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-zinc-900/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Echelon. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </motion.div>
  </footer>
);

export default Footer;