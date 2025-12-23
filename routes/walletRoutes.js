const express = require("express");
const router = express.Router();

let walletBalance = 50000;

router.get("/", (req, res) => {
  res.json({ wallet: walletBalance });
});

router.post("/deduct", (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (walletBalance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  walletBalance -= amount;
  res.json({ wallet: walletBalance });
});

module.exports = router;
