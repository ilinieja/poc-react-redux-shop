import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Product } from "shared/interfaces/product.interface";
import { MOCK_PRODUCTS } from "mock_data";

export const productsAdapter = createEntityAdapter<Product>();

/*
 * Prepopulating products with mock data to simplify the initial version.
 * In real-world scenario they would be received from an API on page init.
 */
const initialState = productsAdapter.getInitialState();
const prepopulatedState = productsAdapter.upsertMany(
  initialState,
  MOCK_PRODUCTS
);

export const productsSlice = createSlice({
  name: "products",
  initialState: prepopulatedState,
  reducers: {
    productAdded: productsAdapter.addOne,
    productUpdated: productsAdapter.updateOne,
    productRemoved: productsAdapter.removeOne,
  },
});

export const { productAdded, productUpdated, productRemoved } =
  productsSlice.actions;
