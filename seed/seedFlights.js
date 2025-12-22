const mongoose = require("mongoose");
const Flight = require("../models/Flight");

mongoose.connect(
  "mongodb+srv://flightuser:flight123@cluster0.jkpdpsd.mongodb.net/flightdb"
);

const cities = [
  "Hyderabad",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Goa",
  "Ahmedabad",
  "Ballari"
];

const airlines = ["Air India", "IndiGo", "Vistara", "Akasa", "SpiceJet"];

const flights = [];
let id = 1;

for (let from of cities) {
  for (let to of cities) {
    if (from !== to) {
      flights.push({
        flight_id: `FL${id++}`,
        airline: airlines[id % airlines.length],
        departure_city: from,
        arrival_city: to,
        base_price: 2000 + Math.floor(Math.random() * 1000),
        current_price: 2000 + Math.floor(Math.random() * 1000)
      });
    }
  }
}

(async () => {
  await Flight.deleteMany();      // 🔥 clear old data
  await Flight.insertMany(flights);
  console.log("✅ Flights seeded for ALL cities");
  process.exit();
})();
