const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = function generateTicket(booking) {
  const doc = new PDFDocument();
  const fileName = `ticket_${booking.pnr}.pdf`;

  doc.pipe(fs.createWriteStream(fileName));
  doc.fontSize(18).text("Flight Ticket", { align: "center" });
  doc.moveDown();

  doc.text(`PNR: ${booking.pnr}`);
  doc.text(`Passenger: ${booking.passenger}`);
  doc.text(`Flight ID: ${booking.flight_id}`);
  doc.text(`Route: ${booking.route}`);
  doc.text(`Amount Paid: ₹${booking.price}`);
  doc.text(`Booking Date: ${booking.date}`);

  doc.end();
  return fileName;
};
