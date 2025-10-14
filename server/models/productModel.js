const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Product name is required
    },
    image: {
      type: String,
      required: true, // Product image URL is required
    },
    description: {
      type: String,
      required: true, // Product description is required
    },
    brand: {
      type: String,
      required: true, // Product brand is required
    },
    category: {
      type: String,
      required: true, // Product category is required
    },
    price: {
      type: Number,
      required: true,
      default: 0, // Default price is 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0, // Default stock count is 0
    },
    rating: {
      type: Number,
      required: true,
      default: 0, // Default rating is 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0, // Default number of reviews is 0
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
