import { Sparkles, Search, Wallet } from "lucide-react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import React, { useState } from "react";

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
    { label: "Explore", href: "#explore" },
    { label: "Collection", href: "#collections" },
    { label: "Creators", href: "#creators" },
    { label: "Stats", href: "#stats" },
];


const Navbar = () => (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
            {/* <div className="grid place-items-center rounded-xl bg-gradient-to-br from-cyan-400/30 via-indigo-400/20 to-pink-400/20 border border-zinc-800">
                <img
                    src="/echelon-icon.png.png"
                    alt="Echelon Icon"
                    className="h-5 w-5 object-contain"
                />
            </div> */}

            <span className="text-lg font-semibold tracking-tight">Echelon</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
            {[
                ["Explore", "#explore"],
                ["Collections", "#collections"],
                ["Creators", "#creators"],
                ["Stats", "#stats"],
            ].map(([label, href]) => (
                <a key={label} href={href} className="text-zinc-300 hover:text-white transition-colors">{label}</a>
            ))}
        </nav>
        <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 pr-2 mr-2 border-r border-zinc-800">
                <Search className="h-4 w-4 text-zinc-400" />
                <Input placeholder="Search items, collections" />
            </div>
            <Button variant="outline" className="hidden sm:inline-flex"><Wallet className="mr-2 h-4 w-4" /> Connect</Button>
            <Button>Create</Button>
        </div>
    </header>

)

export default Navbar;