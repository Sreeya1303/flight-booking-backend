const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Flight = require("../models/Flight");
const Booking = require("../models/Booking");

// 🧾 BOOK FLIGHT
router.post("/book", async (req, res) => {
  try {
    const { flight_id, passenger, seat } = req.body;

    const flight = await Flight.findOne({ flight_id });
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    const booking = new Booking({
      passenger,
      flight_id,
      airline: flight.airline,
      route: `${flight.departure_city} → ${flight.arrival_city}`,
      seat,
      amount: flight.current_price || flight.base_price,
      pnr: uuidv4().slice(0, 8).toUpperCase()
    });

    await booking.save();
    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});


// 📜 BOOKING HISTORY
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});
module.exports = router;
