const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

async function deployTokenFixture() {

    const [nftOwner, buyer1, buyer2] = await ethers.getSigners();

    const myNFT = await ethers.deployContract("MyToken", [nftOwner.address]);
    await myNFT.waitForDeployment();

    const nftMarketplace = await ethers.deployContract("Nftmarketplace");
    await nftMarketplace.waitForDeployment();

    let tx;
    tx = await myNFT.safeMint(nftOwner.address, 0, "testnft01");
    await tx.wait();
    tx = await myNFT.safeMint(nftOwner.address, 1, "testnft02");
    await tx.wait();
    tx = await myNFT.safeMint(nftOwner.address, 2, "testnft03");
    await tx.wait();
    tx = await myNFT.safeMint(nftOwner.address, 3, "testnft04");
    await tx.wait();

    const marketplaceAddress = await nftMarketplace.getAddress();
    const nftAddress = await myNFT.getAddress();

    tx = await myNFT.connect(nftOwner).approve(marketplaceAddress, 0);
    await tx.wait();

    tx = await myNFT.connect(nftOwner).approve(marketplaceAddress, 1);
    await tx.wait();

    tx = await myNFT.connect(nftOwner).approve(marketplaceAddress, 2);
    await tx.wait();

    tx = await myNFT.connect(nftOwner).approve(marketplaceAddress, 3);
    await tx.wait();


    return { myNFT, nftMarketplace, nftOwner, buyer1, buyer2, marketplaceAddress, nftAddress };
}


describe("Deploy MyToken NFT and Contract", function () {

    it("Should NFT #0 tokenId owner match to nftOwner", async function () {
        const { myNFT, nftOwner } = await loadFixture(deployTokenFixture);
        expect(await myNFT.ownerOf(0)).to.equal(nftOwner.address);
    });

    it("Should NFT #1 tokenId owner match to nftOwner", async function () {
        const { myNFT, nftOwner } = await loadFixture(deployTokenFixture);
        expect(await myNFT.tokenURI(1)).to.equal("testnft02");
    });

    it("Should NFT #2 tokenId owner match to nftOwner", async function () {
        const { myNFT, nftOwner } = await loadFixture(deployTokenFixture);
        expect(await myNFT.ownerOf(3)).to.equal(nftOwner.address);
    });

    it("Should NFT #3 tokenId owner match to nftOwner", async function () {
        const { myNFT, nftOwner } = await loadFixture(deployTokenFixture);
        expect(await myNFT.tokenURI(3)).to.equal("testnft04");
    });
})

describe("List NFTs", function () {
    it("Should item is listed correctly", async function () {
        const { myNFT, nftMarketplace, nftOwner, marketplaceAddress, nftAddress } = await loadFixture(deployTokenFixture);

        const tokenId = 0
        const price = 2599;

        const tx = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price);
        await tx.wait();

        const Listing = await nftMarketplace.listings(nftAddress, tokenId);

        expect(await Listing.price).to.equal(2599);
    });

    it("Should not allow duplicate listing", async function () {
        const { myNFT, nftMarketplace, nftOwner, marketplaceAddress, nftAddress } = await loadFixture(deployTokenFixture);

        const tokenId = 0
        const price1 = 2599;

        const tx1 = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price1);
        await tx1.wait();

        expect(nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price1)).to.be.revertedWith("This is already listed");

    });
})

describe("Cancel and Update Listings", function () {
    it("Should NFT listing update Correctly", async function () {
        const { myNFT, nftMarketplace, nftOwner, marketplaceAddress, nftAddress } = await loadFixture(deployTokenFixture);

        const tokenId = 0
        const price = 2599;

        const tx = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price);
        await tx.wait();

        const newPrice = 5000;
        const txUpdate = await nftMarketplace.connect(nftOwner).updateListing(nftAddress, tokenId, newPrice);
        await tx.wait();

        const Listing = await nftMarketplace.listings(nftAddress, tokenId);

        expect(await Listing.price).to.equal(5000);
    });

    it("Should NFT listing cancel correctly", async function () {
        const { myNFT, nftMarketplace, nftOwner, marketplaceAddress, nftAddress } = await loadFixture(deployTokenFixture);

        const tokenId = 0;
        const price = 2599;

        const tx = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price);
        await tx.wait()

        const txDelete = await nftMarketplace.connect(nftOwner).cancelListing(nftAddress, tokenId);
        await tx.wait();

        const Listing = await nftMarketplace.listings(nftAddress, tokenId);

        expect(Listing.price).to.equal(0);
    })
})

describe("Buy NFT", function () {
    it("Should NFT ownership transfer correctly", async function () {
        const { myNFT, nftMarketplace, buyer1, marketplaceAddress, nftAddress, nftOwner } = await loadFixture(deployTokenFixture);

        const tokenId = 0;
        const price = 2599;

        const tx = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price);
        await tx.wait()

        const buyingPrice = ethers.parseEther("0.1");

        const txBuy = await nftMarketplace.connect(buyer1).buyNFT(nftAddress, tokenId, { value: buyingPrice });
        await txBuy.wait();

        const newNftOwner = await myNFT.connect(nftOwner).ownerOf(tokenId);

        expect(newNftOwner).to.equal(buyer1.address);
    });

    it("Should NFT owner's money transfer successfully", async function () {
        const { myNFT, nftMarketplace, buyer1, marketplaceAddress, nftAddress, nftOwner } = await loadFixture(deployTokenFixture);

        const tokenId = 0;
        const price = 2599;

        const tx = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price);
        await tx.wait()

        const buyingPrice = ethers.parseEther("0.1");

        const txBuy = await nftMarketplace.connect(buyer1).buyNFT(nftAddress, tokenId, { value: buyingPrice });
        await txBuy.wait();


        const contractBalance = await ethers.provider.getBalance(marketplaceAddress);
        expect(contractBalance).to.equal(buyingPrice);
    })
})

// describe("Withdraw Earnings", function () {
//     it("Should NFT owner's money withdraw successfully", async function () {
//         const { myNFT, nftMarketplace, buyer1, marketplaceAddress, nftAddress, nftOwner } = await loadFixture(deployTokenFixture);

//         const tokenId = 0;
//         const price = 2599;

//         const txList = await nftMarketplace.connect(nftOwner).listItem(nftAddress, tokenId, price);
//         await txList.wait();

//         const buyingPrice = ethers.parseEther("0.1");
//         const txBuy = await nftMarketplace.connect(buyer1).buyNFT(nftAddress, tokenId, { value: buyingPrice });
//         await txBuy.wait();

//         const contractBalance = await ethers.provider.getBalance(nftMarketplace);

//         const sellerBalance1 = ethers.formatEther(await ethers.provider.getBalance(nftOwner.address));

//         console.log(`NFT owner balance (before): ${sellerBalance1}`);

//         const txWithdraw = await nftMarketplace.connect(nftOwner).withdrawEarnings();
//         await txWithdraw.wait();

//         const sellerBalance2 = ethers.formatEther(await ethers.provider.getBalance(nftOwner.address));
//         console.log(`NFT owner balance (before): ${sellerBalance1}`);

        
//         expect(0.1).to.equal('0.1');
//     })
// })



