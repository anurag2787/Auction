const { handleBid } = require("./services/auction.service");

module.exports = function setupSocket(server) {
  const io = require("socket.io")(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    socket.on("BID_PLACED", (payload) => {
      handleBid(io, socket, payload);
    });
  });
};