'use client';

import { createContext } from "react";
import { ethers } from "ethers";

export type Web3Context = {
  address: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
};

export const UserContext = createContext<Web3Context>({
  address: null,
  provider: null,
  signer: null,
  contract: null,
});
