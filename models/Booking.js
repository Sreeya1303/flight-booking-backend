const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  passenger: String,
  flight_id: String,
  airline: String,
  route: String,
  seat: String,
  amount: Number,
  pnr: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
