const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicines: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
        quantity: { type: Number, default: 1, min: 1 }
      }
    ],
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);



