const express = require("express");
const router = express.Router();
const { auctions } = require("../store/auction.store");

router.get("/", (req, res) => {
  const items = Array.from(auctions.values()).map(
    ({ lock, ...safeItem }) => safeItem
  );

  res.json({
    serverTime: Date.now(),
    items
  });
});

module.exports = router;