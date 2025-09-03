const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

pharmacySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Pharmacy", pharmacySchema);








