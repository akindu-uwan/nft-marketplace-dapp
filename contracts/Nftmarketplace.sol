// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
contract Nftmarketplace{
    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) private sellerEarnings;

    struct Key { address nft; uint256 tokenId; }
    Key[] private _activeKeys;
    mapping(address => mapping(uint256 => uint256)) private _keyIndex;

    event itemListed(address seller, address nftAddress, uint256 tokenId, uint256 price);
    event itemCancelled(address nftAddress, uint256 tokenId, address seller);
    event nftBought(address buyer, address nftAddress, uint256 tokenId, uint256 price);

    modifier ownership(address nftAddress, uint256 tokenId) {
        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the NFT owner");
        _;
    }

    modifier notListed(address nftAddress, uint256 tokenId) {
        require(listings[nftAddress][tokenId].price == 0, "Already listed");
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        require(listings[nftAddress][tokenId].price != 0, "Not listed");
        _;
    }


    function _addActive(address nftAddress, uint256 tokenId) internal {
        _activeKeys.push(Key(nftAddress, tokenId));
        _keyIndex[nftAddress][tokenId] = _activeKeys.length;
    }

    function _removeActive(address nftAddress, uint256 tokenId) internal {
        uint256 idxPlus1 = _keyIndex[nftAddress][tokenId];
        if (idxPlus1 == 0) return;
        uint256 idx = idxPlus1 - 1;
        uint256 last = _activeKeys.length - 1;

        if (idx != last) {
            Key memory lastKey = _activeKeys[last];
            _activeKeys[idx] = lastKey;
            _keyIndex[lastKey.nft][lastKey.tokenId] = idx + 1;
        }
        _activeKeys.pop();
        _keyIndex[nftAddress][tokenId] = 0;
    }

    function listItem(address nftAddress, uint256 tokenId, uint256 price)
        external
        ownership(nftAddress, tokenId)
        notListed(nftAddress, tokenId)
    {
        require(price > 0, "Price = 0");
        listings[nftAddress][tokenId] = Listing(price, msg.sender);
        _addActive(nftAddress, tokenId);
        emit itemListed(msg.sender, nftAddress, tokenId, price);
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        ownership(nftAddress, tokenId)
        isListed(nftAddress, tokenId)
    {
        delete listings[nftAddress][tokenId];
        _removeActive(nftAddress, tokenId);
        emit itemCancelled(nftAddress, tokenId, msg.sender);
    }

    function updateListing(address nftAddress, uint256 tokenId, uint256 newPrice)
        external
        isListed(nftAddress, tokenId)
        ownership(nftAddress, tokenId)
    {
        require(newPrice > 0, "Price = 0");
        listings[nftAddress][tokenId] = Listing(newPrice, msg.sender);
        emit itemListed(msg.sender, nftAddress, tokenId, newPrice);
    }

    function buyNFT(address nftAddress, uint256 tokenId)
        external
        payable
        isListed(nftAddress, tokenId)
    {
        Listing memory listing = listings[nftAddress][tokenId];
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Seller can't buy");

        sellerEarnings[listing.seller] += listing.price;

        IERC721(nftAddress).safeTransferFrom(listing.seller, msg.sender, tokenId);

        emit nftBought(msg.sender, nftAddress, tokenId, listing.price);

        delete listings[nftAddress][tokenId];
        _removeActive(nftAddress, tokenId);

    }

    function getListing(address nftAddress, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return listings[nftAddress][tokenId];
    }

    function totalActiveListings() external view returns (uint256) {
        return _activeKeys.length;
    }

    function getListings(uint256 offset, uint256 limit)
        external
        view
        returns (
            address[] memory nfts,
            uint256[] memory tokenIds,
            uint256[] memory prices,
            address[] memory sellers
        )
    {
        uint256 total = _activeKeys.length;
        if (offset > total) offset = total;

        uint256 end = offset + limit;
        if (end > total) end = total;

        uint256 size = end - offset;
        nfts = new address[](size);
        tokenIds = new uint256[](size);
        prices = new uint256[](size);
        sellers = new address[](size);

        for (uint256 i = 0; i < size; i++) {
            Key memory k = _activeKeys[offset + i];
            Listing memory L = listings[k.nft][k.tokenId];
            nfts[i] = k.nft;
            tokenIds[i] = k.tokenId;
            prices[i] = L.price;
            sellers[i] = L.seller;
        }
    }

    function withdrawEarnings() external {
        uint256 amount = sellerEarnings[msg.sender];
        require(amount > 0, "No earnings");
        sellerEarnings[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
