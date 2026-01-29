const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Connected to server");

  socket.emit("BID_PLACED", {
    itemId: "1",
    amount: 510,
    bidderId: "user-1"
  });
});

socket.on("UPDATE_BID", (data) => {
  console.log("🟢 UPDATE_BID:", data);
});

socket.on("OUTBID", (msg) => {
  console.log("🔴 OUTBID:", msg);
});

socket.on("BID_ERROR", (msg) => {
  console.log("❌ ERROR:", msg);
});
