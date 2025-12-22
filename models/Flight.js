const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flight_id: String,
  airline: String,
  departure_city: String,
  arrival_city: String,
  base_price: Number,
  current_price: Number,
  bookingAttempts: { type: Number, default: 0 },
  lastBookedAt: Date
});

flightSchema.pre("save", function (next) {
  if (!this.current_price) {
    this.current_price = this.base_price;
  }
  next();
});

module.exports = mongoose.model("Flight", flightSchema);
