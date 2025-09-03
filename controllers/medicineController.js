const Medicine = require("../models/Medicine");

exports.getAll = async (req, res, next) => {
  try {
    const data = await Medicine.find().populate("pharmacy");
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, price, pharmacy, description } = req.body || {};
    if (!name || price == null || !pharmacy)
      return res.status(400).json({ msg: "Missing required fields" });

    const doc = await Medicine.create({ name, price, pharmacy, description });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};
