const express = require("express");
const router = express.Router();
const { auctions } = require("../store/auction.store");

router.get("/", (req, res) => {
  const now = Date.now();
  const items = Array.from(auctions.values()).map(
    ({ lock, ...safeItem }) => ({
      ...safeItem,
      status: safeItem.endsAt <= now ? 'ended' : safeItem.status
    })
  );

  res.json({
    serverTime: now,
    items
  });
});

module.exports = router;