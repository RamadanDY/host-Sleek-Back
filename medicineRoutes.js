const express = require('express');
const router = express.Router();

// Import controller functions (replace with your actual controller functions)
const {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicinesByPharmacy
} = require('../controllers/medicineController');

// GET /api/medicines - Get all medicines
router.get('/', getMedicines);

// GET /api/medicines/:id - Get single medicine by ID
router.get('/:id', getMedicineById);

// GET /api/medicines/pharmacy/:pharmacyId - Get medicines by pharmacy
router.get('/pharmacy/:pharmacyId', getMedicinesByPharmacy);

// POST /api/medicines - Create new medicine
router.post('/', createMedicine);

// PUT /api/medicines/:id - Update medicine
router.put('/:id', updateMedicine);

// DELETE /api/medicines/:id - Delete medicine
router.delete('/:id', deleteMedicine);

module.exports = router;
