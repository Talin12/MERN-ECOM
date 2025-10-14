import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // --- NEW --- Reducer to update item quantity
    updateCartQuantity: (state, action) => {
        const { _id, qty } = action.payload;
        const itemToUpdate = state.cartItems.find((item) => item._id === _id);
        if (itemToUpdate) {
            itemToUpdate.qty = qty;
        }
        localStorage.setItem('cart', JSON.stringify(state));
    },
    // --- NEW --- Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, updateCartQuantity, removeFromCart , saveShippingAddress, savePaymentMethod} = cartSlice.actions;

export default cartSlice.reducer;