const express = require('express');
const router = express.Router();

// Import controller functions (replace with your actual controller functions)
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  updateOrderStatus
} = require('../controllers/orderController');

// GET /api/orders - Get all orders (admin only)
router.get('/', getOrders);

// GET /api/orders/:id - Get single order by ID
router.get('/:id', getOrderById);

// GET /api/orders/user/:userId - Get orders by user
router.get('/user/:userId', getUserOrders);

// POST /api/orders - Create new order
router.post('/', createOrder);

// PUT /api/orders/:id - Update order
router.put('/:id', updateOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', updateOrderStatus);

// DELETE /api/orders/:id - Delete order
router.delete('/:id', deleteOrder);

module.exports = router;


