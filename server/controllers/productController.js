// We are temporarily importing the raw data file
const products = require('../data/products.js');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  // We send the raw product data directly as a JSON response
  res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  // Find the product that matches the ID from the URL parameter
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
};

module.exports = { getProducts, getProductById };

