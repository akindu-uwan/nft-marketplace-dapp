'use client';

import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Sparkles, Search, Wallet } from "lucide-react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { connect } from "@/app/lib/connect";
import { ethers } from "ethers";


const Navbar = () => {

    const user = useContext(UserContext);

    console.log(user.address);
        
        // const [connecting, setConnecting] = useState(false);

        

        // const onConnect = async () => {
        //     try {
        //         setConnecting(true);
        //         const res = await connect();
        //         if (res?.address) setAddress(res.address);
        //         if (res?.provider) setProvider(res.provider);
        //         if (res?.address) setSigner(res.signer);
        //     } catch (e) {
        //         console.error(e);
        //         alert("Failed to connect. Check the console for details.");
        //     } finally {
        //         setConnecting(false);
        //     }
        // };

        // const short = (addr: string) => addr.slice(0, 6) + "…" + addr.slice(-4);


    return (
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
                <span className="text-lg font-semibold tracking-tight">Echelon</span>
            </div>

            <nav className="hidden items-center gap-6 md:flex">
                {[
                    ["Explore", "#explore"],
                    ["Collections", "#collections"],
                    ["Creators", "#creators"],
                    ["Stats", "#stats"],
                ].map(([label, href]) => (
                    <a key={label} href={href} className="text-zinc-300 hover:text-white transition-colors">
                        {label}
                    </a>
                ))}
            </nav>

            <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 pr-2 mr-2 border-r border-zinc-800">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <Input placeholder="Search items, collections" />
                </div>

                {/* Use your Button; if onClick still doesn't fire, test with a plain <button> */}
                <Button
                    variant="outline"
                    className="hidden sm:inline-flex"
                    // onClick={onConnect}
                    // disabled={connecting}
                >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect
                    {/* {address ? short(address) : (connecting ? "Connecting…" : "Connect")} */}
                </Button>

                <Button>Create</Button>
            </div>
        </header>
    );
};

export default Navbar;
