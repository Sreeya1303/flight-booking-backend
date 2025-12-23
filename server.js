const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

/* ✅ MIDDLEWARE */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* ✅ MONGODB CONNECTION (THIS WAS MISSING) */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

/* ✅ ROUTES */
app.use("/api/flights", flightRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api/wallet", walletRoutes);

/* ✅ HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ✅ PORT */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
