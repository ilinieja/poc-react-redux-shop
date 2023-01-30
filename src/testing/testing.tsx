import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import type { AppStore, RootState } from "../store/store";
import { setupStore } from "../store/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = MOCK_STATE,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const MOCK_STATE = {
  products: {
    ids: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    entities: {
      A: {
        id: "A",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      B: {
        id: "B",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
      C: {
        id: "C",
        price: 20,
        description: "Awesome letter, I use it a lot and recommend",
      },
      D: {
        id: "D",
        price: 15,
        description: "Awesome letter, I use it a lot and recommend",
      },
      E: {
        id: "E",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      F: {
        id: "F",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
      G: {
        id: "G",
        price: 20,
        description: "Awesome letter, I use it a lot and recommend",
      },
      H: {
        id: "H",
        price: 15,
        description: "Awesome letter, I use it a lot and recommend",
      },
      I: {
        id: "I",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      J: {
        id: "J",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
      K: {
        id: "K",
        price: 20,
        description: "Awesome letter, I use it a lot and recommend",
      },
      L: {
        id: "L",
        price: 15,
        description: "Awesome letter, I use it a lot and recommend",
      },
      M: {
        id: "M",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      N: {
        id: "N",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
      O: {
        id: "O",
        price: 20,
        description: "Awesome letter, I use it a lot and recommend",
      },
      P: {
        id: "P",
        price: 15,
        description: "Awesome letter, I use it a lot and recommend",
      },
      Q: {
        id: "Q",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      R: {
        id: "R",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
      S: {
        id: "S",
        price: 20,
        description: "Awesome letter, I use it a lot and recommend",
      },
      T: {
        id: "T",
        price: 15,
        description: "Awesome letter, I use it a lot and recommend",
      },
      U: {
        id: "U",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      V: {
        id: "V",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
      W: {
        id: "W",
        price: 20,
        description: "Awesome letter, I use it a lot and recommend",
      },
      X: {
        id: "X",
        price: 15,
        description: "Awesome letter, I use it a lot and recommend",
      },
      Y: {
        id: "Y",
        price: 50,
        description: "Awesome letter, I use it a lot and recommend",
      },
      Z: {
        id: "Z",
        price: 30,
        description: "Awesome letter, I use it a lot and recommend",
      },
    },
  },
  rules: {
    ids: ["A", "B"],
    entities: {
      A: {
        productId: "A",
        quantity: 3,
        price: 130,
      },
      B: {
        productId: "B",
        quantity: 2,
        price: 45,
      },
    },
  },
  cartProducts: {
    ids: ["C", "A", "D", "F", "V"],
    entities: {
      C: {
        productId: "C",
        quantity: 5,
      },
      A: {
        productId: "A",
        quantity: 3,
      },
      D: {
        productId: "D",
        quantity: 1,
      },
      F: {
        productId: "F",
        quantity: 2,
      },
      V: {
        productId: "V",
        quantity: 3,
      },
    },
  },
};

export enum TEST_IDS {
  productLetterTitle = "productLetterTitle",
  productLetterBoughtQuantity = "productLetterBoughtQuantity",
  cartTotal = "cartTotal",
  productDecrementButton = "productDecrementButton",
  productIncrementButton = "productIncrementButton",
  productBuyButton = "productBuyButton",
  productFormSubmitButton = "productFormSubmitButton",
  productFormLetterInput = "productFormLetterInput",
  productFormDescriptionInput = "productFormDescriptionInput",
  productFormPriceInput = "productFormPriceInput",
  productFormRuleQuantityInput = "productFormRuleQuantityInput",
  productFormRulePriceInput = "productFormRulePriceInput",
}
