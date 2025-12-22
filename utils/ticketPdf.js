const PDFDocument = require("pdfkit");

module.exports = function generateTicket(res, booking) {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ticket_${booking.pnr}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(22).text("✈ Flight Ticket", { align: "center" });
  doc.moveDown();

  doc.fontSize(14);
  doc.text(`Passenger: ${booking.passenger}`);
  doc.text(`Airline: ${booking.airline}`);
  doc.text(`Flight ID: ${booking.flight_id}`);
  doc.text(`Route: ${booking.route}`);
  doc.text(`Seat: ${booking.seat}`);
  doc.text(`Amount Paid: ₹${booking.amount}`);
  doc.text(`PNR: ${booking.pnr}`);
  doc.text(
    `Booking Time: ${new Date(booking.date).toLocaleString()}`
  );

  doc.end();
};
