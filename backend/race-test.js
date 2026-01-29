const { io } = require("socket.io-client");

function placeBid(user) {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    socket.emit("BID_PLACED", {
      itemId: "1",
      amount: 600,
      bidderId: user
    });
  });

  socket.on("UPDATE_BID", (data) => {
    if (data.highestBidder === user) {
      console.log(`🟢 ${user} WON`, data);
    } else {
      console.log(`🔴 ${user} LOST (outbid)`, data);
    }
    socket.disconnect();
  });

  socket.on("OUTBID", (msg) => {
    console.log(`🔴 ${user} LOST`, msg);
    socket.disconnect();
  });
}

placeBid("user-A");
placeBid("user-B");
