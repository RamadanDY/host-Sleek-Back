const Order = require("../models/Order");

exports.getAll = async (req, res, next) => {
  try {
    const data = await Order.find()
      .populate("user", "name email")
      .populate("medicines.medicine");
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { user, medicines, total } = req.body || {};
    if (!user || !Array.isArray(medicines) || total == null)
      return res.status(400).json({ msg: "Missing required fields" });

    const doc = await Order.create({ user, medicines, total });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};
