const { auctions } = require("../store/auction.store");

async function handleBid(io, socket, { itemId, amount, bidderId }) {
  const auction = auctions.get(itemId);

  if (!auction) {
    return socket.emit("BID_ERROR", "Invalid item");
  }

  if (Date.now() > auction.endsAt) {
    return socket.emit("BID_ERROR", "Auction ended");
  }

  // 🔒 Lock (simple mutex)
  if (auction.lock) {
    return socket.emit("OUTBID", "Another bid just won");
  }

  auction.lock = true;

  try {
    if (amount <= auction.currentBid) {
      socket.emit("OUTBID", "Bid too low");
      return;
    }

    auction.currentBid = amount;
    auction.highestBidder = bidderId;

    io.emit("UPDATE_BID", {
      itemId,
      currentBid: amount,
      highestBidder: bidderId
    });
  } finally {
    auction.lock = false;
  }
}

module.exports = { handleBid };