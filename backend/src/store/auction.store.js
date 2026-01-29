const auctions = new Map();

function seedAuctions() {
  auctions.set("1", {
    id: "1",
    title: "MacBook Pro",
    startingPrice: 10,
    currentBid: 10,
    highestBidder: null,
    endsAt: Date.now() + 1000 * 60 * 1000,
    lock: false
  });
}

seedAuctions();
module.exports = { auctions };