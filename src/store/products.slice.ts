import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import axios from "axios";

import { Product } from "shared/interfaces/product.interface";
import { getInitialLoadingState, LoadingState, LoadingStatus } from "./loading";

export const productsAdapter = createEntityAdapter<Product>();

const productsApiUrl = `${process.env.REACT_APP_API_URL}/products`;
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(productsApiUrl);
    return res.data;
  }
);

/*
 * Prepopulating products with mock data to simplify the initial version.
 * In real-world scenario they would be received from an API on page init.
 */
const initialState = {
  ...productsAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export type ProductsSliceState = EntityState<Product> & LoadingState;

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    productAdded: productsAdapter.addOne,
    productUpdated: productsAdapter.updateOne,
    productRemoved: productsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        productsAdapter.upsertMany(state, payload);
      })
      .addCase(fetchProducts.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      });
  },
});

export const { productAdded, productUpdated, productRemoved } =
  productsSlice.actions;
