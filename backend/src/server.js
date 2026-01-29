const http = require("http");
const app = require("./app");
const setupSocket = require("./socket");

const server = http.createServer(app);
setupSocket(server);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});