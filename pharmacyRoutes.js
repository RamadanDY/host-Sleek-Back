const express = require("express");
const router = express.Router();
const { createPharmacy, getPharmacies } = require("../controllers/pharmacyController");
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes if needed

// @route   POST /api/pharmacy
// @desc    Add a new pharmacy
// @access  Private
router.post("/", authMiddleware, createPharmacy);

// @route   GET /api/pharmacy
// @desc    Get all pharmacies
// @access  Public
router.get("/", getPharmacies);

module.exports = router;

