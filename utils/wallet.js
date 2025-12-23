const express = require("express");
const router = express.Router();

// In-memory wallet (you can later move this to DB)
let walletBalance = 50000;

// GET wallet balance
router.get("/", (req, res) => {
  res.json({
    balance: walletBalance
  });
});

// DEDUCT wallet balance
router.post("/deduct", (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (walletBalance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  walletBalance -= amount;

  res.json({
    balance: walletBalance
  });
});

// RESET wallet (optional)
router.post("/reset", (req, res) => {
  walletBalance = 50000;
  res.json({ balance: walletBalance });
});

module.exports = router;
