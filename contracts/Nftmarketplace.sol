// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Nftmarketplace {
    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) private sellerEarnings;

    event itemListed(
        address seller,
        address nftAddress,
        uint256 tokenId,
        uint256 price
    );
    event itemCancelled(address nftAddress, uint256 tokenId, address seller);
    event nftBought(
        address buyer,
        address nftAddress,
        uint256 tokenId,
        uint256 price
    );

    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        external
        ownership(nftAddress, tokenId)
        notListed(nftAddress, tokenId, msg.sender)
    {
        require(price > 0, "Price must be greater than 0");
        IERC721 nft = IERC721(nftAddress);
        //nft.approve(address(this), tokenId); this function cant use in contract
        require(nft.getApproved(tokenId) == address(this), "This marketplace not have approve to list that NFT");
        listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit itemListed(msg.sender, nftAddress, tokenId, price);
    }

    modifier ownership(
        address nftAddress,
        uint256 tokenId
    ) {
        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == msg.sender, "This is not owner of NFT");
        _;
    }

    modifier notListed(
        address nftAddress,
        uint256 tokenId,
        address owner
    ) {
        Listing memory list = listings[nftAddress][tokenId];
        require(list.price == 0, "This is already listed");
        _;
    }

    modifier isListed(
        address nftAddress,
        uint256 tokenId,
        address owner
    ) {
        Listing memory list = listings[nftAddress][tokenId];
        require(list.price != 0, "This is already listed");
        _;
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        ownership(nftAddress, tokenId)
        isListed(nftAddress, tokenId, msg.sender)
    {
        delete listings[nftAddress][tokenId];
        emit itemCancelled(nftAddress, tokenId, msg.sender);
    }

    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    )
        external
        isListed(nftAddress, tokenId, msg.sender)
        ownership(nftAddress, tokenId)
    {
        require(newPrice > 0, "Price must be greater than 0");
        listings[nftAddress][tokenId] = Listing(newPrice, msg.sender);
        emit itemListed(msg.sender, nftAddress, tokenId, newPrice);
    }

    function buyNFT(address nftAddress, uint256 tokenId)
        external
        payable
        isListed(nftAddress, tokenId, msg.sender)
    {
        Listing memory listing = listings[nftAddress][tokenId];
        require(msg.value >= listing.price, "Price must be greater than 0");
        require(
            msg.sender != listing.seller,
            "Seller cannot buy their own NFT"
        );

        sellerEarnings[listing.seller] += listing.price;

        IERC721 nft = IERC721(nftAddress);
        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        emit nftBought(msg.sender, nftAddress, tokenId, listing.price);
        delete listings[nftAddress][tokenId];
    }

    function getListing(address nftAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return listings[nftAddress][tokenId];
    }

    function withdrawEarnings() external {
        uint256 amount = sellerEarnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");
        sellerEarnings[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
