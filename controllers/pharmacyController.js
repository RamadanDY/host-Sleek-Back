const Pharmacy = require("../models/Pharmacy");

// Create new pharmacy
const createPharmacy = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name || !location || !location.coordinates) {
      return res
        .status(400)
        .json({ msg: "Name and location.coordinates are required:" });
    }

    const pharmacy = await Pharmacy.create({ name, location });
    res.status(201).json(pharmacy);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all pharmacies
const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createPharmacy, getPharmacies };
