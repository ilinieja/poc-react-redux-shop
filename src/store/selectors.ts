import { RootState } from "./store";
import { productsAdapter } from "./products.slice";
import { rulesAdapter } from "./rules.slice";
import { cartProductsAdapter } from "./cartProducts.slice";
import { EntityId } from "@reduxjs/toolkit";

export const getProductsState = (rootState: RootState) => rootState.products;
export const getRulesState = (rootState: RootState) => rootState.rules;
export const getCartProductsState = (rootState: RootState) =>
  rootState.cartProducts;

export const productsSelectors =
  productsAdapter.getSelectors<RootState>(getProductsState);
export const rulesSelectors =
  rulesAdapter.getSelectors<RootState>(getRulesState);
export const cartProductsSelectors =
  cartProductsAdapter.getSelectors<RootState>(getCartProductsState);

export const selectProductById = (id: EntityId) => (state: RootState) =>
  productsSelectors.selectById(state, id);

export const selectRuleById = (id: EntityId) => (state: RootState) =>
  rulesSelectors.selectById(state, id);

export const selectCartProductById = (id: EntityId) => (state: RootState) =>
  cartProductsSelectors.selectById(state, id);
