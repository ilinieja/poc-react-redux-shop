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
    cartProductRemoved: (
      state,
      { payload: { productId, currentQuantity } }
    ) => {
      if (!currentQuantity) {
        cartProductsAdapter.removeOne(state, productId);
      }

      return cartProductsAdapter.upsertOne(state, {
        productId,
        quantity: currentQuantity - 1,
      });
    },
  },
});

export const { cartProductAdded, cartProductRemoved } =
  cartProductsSlice.actions;
