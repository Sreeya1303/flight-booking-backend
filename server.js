const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const walletRoutes = require("./routes/walletRoutes");


const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Routes
app.use("/api/flights", flightRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api/wallet", walletRoutes);


// ✅ Wallet APIs
let WALLET = 50000;

app.get("/api/wallet", (req, res) => {
  res.json({ wallet: WALLET });
});

app.post("/api/wallet/deduct", (req, res) => {
  const { amount } = req.body;
  if (WALLET < amount) {
    return res.status(400).json({ message: "Insufficient wallet balance" });
  }
  WALLET -= amount;
  res.json({ wallet: WALLET });
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(10000, () => {
      console.log("Server running on port 10000");
    });
  })
  .catch(err => console.error(err));
