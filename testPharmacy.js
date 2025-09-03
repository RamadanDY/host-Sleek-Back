const mongoose = require("mongoose");
const Pharmacy = require("./Pharmacy"); // import your model

// Replace with your MongoDB connection string if needed
const MONGO_URI = "mongodb://127.0.0.1:27017/testdb";

async function runTest() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Create a new pharmacy document
    const newPharmacy = new Pharmacy({
      name: "Central Pharmacy",
      address: "123 Main St",
      latitude: 40.7128,
      longitude: -74.0060,
      phone: "123-456-7890",
    });

    // Save to database
    const savedPharmacy = await newPharmacy.save();
    console.log("✅ Saved pharmacy:", savedPharmacy);

    // Fetch from database
    const foundPharmacy = await Pharmacy.findOne({ name: "Central Pharmacy" });
    console.log("✅ Found pharmacy:", foundPharmacy);

    // Close connection
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

runTest();
