import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Product } from "../shared/checkout/interfaces/product.interface";

export const productsAdapter = createEntityAdapter<Product>();

export const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState(),
  reducers: {
    productAdded: productsAdapter.addOne,
    productRemoved: productsAdapter.removeOne,
    productsReceived(state, action) {
      productsAdapter.setAll(state, action.payload.products);
    },
  },
});
