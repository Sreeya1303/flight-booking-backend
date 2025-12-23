Project Overview

This is the backend REST API for the Flight Booking Application.
It handles flight search, booking, wallet management, and ticket generation.

Tech Stack
Node.js
Express.js
MongoDB (Atlas)
Mongoose
UUID
CORS
Render (Deployment)

Project Structure
backend/
│── models/
│   ├── Flight.js
│   └── Booking.js
│── routes/
│   ├── flightRoutes.js
│   ├── bookingRoutes.js
│   └── walletRoutes.js
│── seed/
│   └── seedFlights.js
│── server.js
│── package.json
│── Dockerfile

Environment Variables
Set the following in Render → Environment Variables
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.mongodb.net/flightdb
PORT = 5000

Run Locally
npm install
node server.js


Server runs at:
http://localhost:5000

API Endpoints
Search Flights
GET /api/flights?from=Pune&to=Delhi

Book Flight
POST /api/book

{
  "flight_id": "FL12",
  "passenger": "Sreeya",
  "seat": "Window"
}

Booking History
GET /api/bookings

Wallet
GET  /api/wallet
POST /api/wallet/deduct
POST /api/wallet/reset

Seed Database
Run once to insert flights:
node seed/seedFlights.js

Deployment
Deployed on Render
Build Command: npm install
Start Command: node server.js

Features
Flight search
Ticket booking with PNR
Wallet deduction

MongoDB persistence

Error-safe API responses
