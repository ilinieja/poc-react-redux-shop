import { RootState, store } from "./store";
import { productsAdapter } from "./products.slice";
import { rulesAdapter } from "./rules.slice";

export const rulesSelectors = rulesAdapter.getSelectors<RootState>(
  (state) => state.rules
);

export const allRules = rulesSelectors.selectAll(store.getState());

const productsSelectors = productsAdapter.getSelectors<RootState>(
  (state) => state.products
);
export const allProducts = productsSelectors.selectAll(store.getState());
