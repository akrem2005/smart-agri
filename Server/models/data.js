const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  humidity: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
  },
  moisture: {
    type: String,
  },
  pressure: {
    type: String,
  },
  altitude: {
    type: String,
  },
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
