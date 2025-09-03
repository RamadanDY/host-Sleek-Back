const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy", required: true },
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);


