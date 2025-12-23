const express = require("express");
const cors = require("cors");

const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

/* ✅ REQUIRED */
app.use(cors({
  origin: "*"
}));
app.use(express.json());

/* ✅ ROUTES */
app.use("/api/flights", flightRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api/wallet", walletRoutes);

/* ✅ HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
