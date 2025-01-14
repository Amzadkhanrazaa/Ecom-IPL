const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct 
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin Protected Routes
router.post('/', authMiddleware, createProduct);

module.exports = router;