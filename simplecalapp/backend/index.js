const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB using .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/events", eventRoutes);

// Use PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
