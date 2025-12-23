const PDFDocument = require("pdfkit");

// 🎫 DOWNLOAD TICKET
router.get("/ticket/:pnr", async (req, res) => {
  try {
    const { pnr } = req.params;

    const booking = await Booking.findOne({ pnr });
    if (!booking) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Ticket-${pnr}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("✈️ Flight Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Passenger: ${booking.passenger}`);
    doc.text(`Airline: ${booking.airline}`);
    doc.text(`Route: ${booking.route}`);
    doc.text(`Seat: ${booking.seat}`);
    doc.text(`Amount Paid: ₹${booking.amount}`);
    doc.text(`PNR: ${booking.pnr}`);
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleString()}`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ticket download failed" });
  }
});
