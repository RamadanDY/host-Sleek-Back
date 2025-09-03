const mongoose = require("mongoose");
const Order = require("./models/Order");
const User = require("./models/User");
const Pharmacy = require("./models/Pharmacy");
const Medicine = require("./models/Medicine");

const MONGO_URI = "mongodb://127.0.0.1:27017/testdb";

async function runTest() {
  try {
    // Connect
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Step 1: Create dummy User
    const user = new User({ name: "John Doe", email: "john@example.com", password: "123456" });
    await user.save();

    // Step 2: Create dummy Pharmacy
    const pharmacy = new Pharmacy({ name: "Central Pharmacy", address: "123 Main St", phone: "123-456-7890" });
    await pharmacy.save();

    // Step 3: Create dummy Medicine
    const medicine = new Medicine({ name: "Aspirin", price: 10, stock: 50, pharmacy: pharmacy._id });
    await medicine.save();

    // Step 4: Create Order
    const order = new Order({
      user: user._id,
      pharmacy: pharmacy._id,
      medicines: [{ medicine: medicine._id, quantity: 2 }],
      totalPrice: 20,
    });

    await order.save();
    console.log("✅ Order saved:", order);

    // Step 5: Fetch Order with populated refs
    const foundOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("pharmacy", "name address")
      .populate("medicines.medicine", "name price");
    console.log("📦 Populated Order:", JSON.stringify(foundOrder, null, 2));

    // Disconnect
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

runTest();
