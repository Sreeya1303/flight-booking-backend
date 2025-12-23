const express = require("express");
const Flight = require("../models/Flight");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To are required" });
    }

    const flights = await Flight.find({
      departure_city: from,
      arrival_city: to
    }).limit(10);

    res.json(flights);
  } catch (err) {
    console.error("❌ Flight fetch error:", err);
    res.status(500).json({ message: "Failed to fetch flights" });
  }
});

module.exports = router;
