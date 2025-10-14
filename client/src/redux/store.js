import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice'; // --- NEW --- Import auth reducer

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer, // --- NEW --- Add auth reducer
  },
});

export default store;