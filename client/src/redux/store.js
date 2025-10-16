import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer, // Add the order reducer
  },
});

export default store;