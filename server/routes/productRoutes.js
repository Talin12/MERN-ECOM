const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require('../controllers/productController');

// Route for getting all products
router.route('/').get(getProducts);

// Route for getting a single product by its ID
router.route('/:id').get(getProductById);

module.exports = router;
