/**
 * This file contains the actual express app that connects our frontend to our database
 */

require("dotenv").config();
require('./cfg/passport');

const express = require("express");
const mongoose = require("mongoose");
const inventoryRoutes = require("./routes/staff/inventory");
const userRoutes = require("./routes/users/user");
const employeeRoutes = require("./routes/staff/employee");
const shbracketRoutes = require("./routes/staff/shbrackets");
const profileRoutes = require("./routes/users/profiles");
const adminRoutes = require("./routes/staff/admin");
const orderRoutes = require("./routes/users/order");
const partsRoutes = require("./routes/external/parts");
const creditRoutes = require("./routes/external/credit");


// Suppress strict query warning
mongoose.set('strictQuery', true);

// Create Express App
const app = express();

// Logging -- Useful for testing backend requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Tell the app to parse incoming requests as JSON
app.use(express.json());

// Routes
app.use("/api/credit/", creditRoutes);
app.use("/api/parts/", partsRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/inventory/", inventoryRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/staff/", employeeRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/shbrackets/", shbracketRoutes);
app.use("/api/profiles/", profileRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // If connected, listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to Database. Listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
