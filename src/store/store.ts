import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";

import { productsSlice } from "./products.slice";
import { rulesSlice } from "./rules.slice";
import { cartProductsSlice } from "./cartProducts.slice";

const rootReducer = combineReducers({
  products: productsSlice.reducer,
  rules: rulesSlice.reducer,
  cartProducts: cartProductsSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
