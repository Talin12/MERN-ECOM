import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // For the list of products
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  // For a single product's details
  product: null,
  statusDetails: 'idle',
  errorDetails: null,
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get('/api/products');
    return data;
  }
);

// --- NEW --- Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Cases for fetching all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // --- NEW --- Cases for fetching a single product
      .addCase(fetchProductById.pending, (state) => {
        state.statusDetails = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.statusDetails = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.statusDetails = 'failed';
        state.errorDetails = action.error.message;
      });
  },
});

export default productsSlice.reducer;