import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "shared/interfaces/cartProduct.interface";

export const cartProductsAdapter = createEntityAdapter<CartProduct>({
  selectId: ({ productId }) => productId,
});

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState: cartProductsAdapter.getInitialState(),
  reducers: {
    cartProductAdded: (state, { payload: { productId, currentQuantity } }) => {
      return cartProductsAdapter.upsertOne(state, {
        productId,
        quantity: currentQuantity ? currentQuantity + 1 : 1,
      });
    },
    cartProductOneRemoved: (
      state,
      { payload: { productId, currentQuantity } }
    ) => {
      if (currentQuantity <= 1) {
        return cartProductsAdapter.removeOne(state, productId);
      }

      return cartProductsAdapter.upsertOne(state, {
        productId,
        quantity: currentQuantity - 1,
      });
    },
    cartProductAllRemoved: cartProductsAdapter.removeOne,
  },
});

export const {
  cartProductAdded,
  cartProductOneRemoved,
  cartProductAllRemoved,
} = cartProductsSlice.actions;
