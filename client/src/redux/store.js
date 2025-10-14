import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice'; // Import the new cart reducer

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, // Add the cart reducer to the store
  },
});

export default store;