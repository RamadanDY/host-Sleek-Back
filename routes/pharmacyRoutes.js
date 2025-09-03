const express = require("express");
const router = express.Router();
const { createPharmacy, getPharmacies } = require("../controllers/pharmacyController");

// Create a new pharmacy
router.post("/", createPharmacy);

// Get all pharmacies
router.get("/", getPharmacies);

module.exports = router;











