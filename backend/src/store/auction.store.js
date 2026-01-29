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
  
  auctions.set("2", {
    id: "2",
    title: "Internship Stipend",
    startingPrice: 300,
    currentBid: 300,
    highestBidder: null,
    endsAt: Date.now() + 10 * 60 * 10,
    lock: false
  });
  
  auctions.set("4", {
    id: "3",
    title: "Sony Wireless Headphones",
    startingPrice: 20,
    currentBid: 20,
    highestBidder: null,
    endsAt: Date.now() + 10 * 60 * 1,
    lock: false
  });
}

seedAuctions();
module.exports = { auctions };