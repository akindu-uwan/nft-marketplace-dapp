
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("MyTokenModule", (m) => {
  const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  
  const myToken = m.contract("MyToken", [owner], {
    id: "MyTokenContract"
  });

  // If safeMint signature is: safeMint(address to, uint256 tokenId, string memory tokenURI)
  m.call(myToken, "safeMint", [owner, 1, "https://example.com/token1.json"], {
    id: "mintToken1"
  });

  m.call(myToken, "safeMint", [owner, 2, "https://example.com/token2.json"], {
    id: "mintToken2"
  });

  m.call(myToken, "safeMint", [owner, 3, "https://example.com/token3.json"], {
    id: "mintToken3"
  });

  return { myToken };
});