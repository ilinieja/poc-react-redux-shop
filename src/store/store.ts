import { configureStore } from "@reduxjs/toolkit";

import { productsSlice } from "./products.slice";
import { rulesSlice } from "./rules.slice";
import { cartProductsSlice } from "./cartProducts.slice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    rules: rulesSlice.reducer,
    cartProducts: cartProductsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
