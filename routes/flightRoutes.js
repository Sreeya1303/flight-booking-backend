const express = require("express");
const Flight = require("../models/Flight");
const router = express.Router();

router.get("/", async (req, res) => {
  const { from, to } = req.query;
  const flights = await Flight.find({
    departure_city: from,
    arrival_city: to
  });
  res.json(flights);
});

module.exports = router;
