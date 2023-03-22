/**
 * This file contains the actual express app that connects our frontend to our database
 */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const inventoryRoutes = require("./routes/inventory");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profiles");
require('./cfg/passport');

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
app.use("/api/inventory/", inventoryRoutes);
app.use("/api/", userRoutes);
app.use("/api/admin/", adminRoutes);
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
