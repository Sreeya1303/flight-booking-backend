let walletBalance = 50000;

module.exports = {
  getBalance: () => walletBalance,
  deduct: (amount) => {
    if (walletBalance < amount) return false;
    walletBalance -= amount;
    return true;
  }
};
