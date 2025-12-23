const express = require("express");
const router = express.Router();

// In-memory wallet (simple & works)
let walletBalance = 50000;

// GET WALLET
router.get("/", (req, res) => {
  res.json({ wallet: walletBalance });
});

// DEDUCT WALLET
router.post("/deduct", (req, res) => {
  const { amount } = req.body;

  if (walletBalance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  walletBalance -= amount;
  res.json({ wallet: walletBalance });
});

module.exports = router;
